import "server-only";
import { ready } from "../auth/db";
import type { User } from "../auth/users";
import { stripeForm, subscriptionFacts } from "./webhook";

/**
 * Card payments through Stripe, using its REST API directly. Payments switch on once
 * STRIPE_SECRET_KEY and STRIPE_PRICE_ID are set; until then nobody is asked to pay.
 */
export function billingEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID);
}

const API = () => process.env.STRIPE_API_BASE || "https://api.stripe.com";

export class StripeError extends Error {}

async function stripe<T>(path: string, params?: Record<string, unknown>, method: "GET" | "POST" = params ? "POST" : "GET"): Promise<T> {
  const query = method === "GET" && params ? `?${stripeForm(params)}` : "";
  const res = await fetch(`${API()}/v1/${path}${query}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      ...(method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: method === "POST" && params ? stripeForm(params) : undefined,
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok) throw new StripeError(body.error?.message ?? `Stripe answered ${res.status}`);
  return body;
}

export interface Price {
  /** In cents. */
  amount: number;
  currency: string;
  interval: string | null;
}

let priceCache: { price: Price; at: number } | null = null;

/** The plan's price, for showing on the payment page. Cached for an hour. */
export async function planPrice(): Promise<Price | null> {
  if (!billingEnabled()) return null;
  if (priceCache && Date.now() - priceCache.at < 3_600_000) return priceCache.price;
  const p = await stripe<{ unit_amount: number; currency: string; recurring?: { interval: string } | null }>(
    `prices/${encodeURIComponent(process.env.STRIPE_PRICE_ID!)}`,
  );
  const price = { amount: p.unit_amount, currency: p.currency, interval: p.recurring?.interval ?? null };
  priceCache = { price, at: Date.now() };
  return price;
}

/** A Stripe Checkout page where the parent adds a card and starts paying. */
export async function checkoutUrl(user: User, origin: string): Promise<string> {
  const session = await stripe<{ url: string }>("checkout/sessions", {
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    client_reference_id: user.id,
    ...(user.stripeCustomerId ? { customer: user.stripeCustomerId } : { customer_email: user.email }),
    metadata: { user_id: user.id },
    subscription_data: { metadata: { user_id: user.id } },
    allow_promotion_codes: true,
    success_url: `${origin}/billing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/billing`,
  });
  return session.url;
}

/** Stripe's page where the parent changes their card, sees invoices or cancels. */
export async function portalUrl(user: User, origin: string): Promise<string> {
  if (!user.stripeCustomerId) throw new StripeError("No card on file yet.");
  const session = await stripe<{ url: string }>("billing_portal/sessions", {
    customer: user.stripeCustomerId,
    return_url: `${origin}/billing`,
  });
  return session.url;
}

type Subscription = Parameters<typeof subscriptionFacts>[0];

/** Saves a subscription's state against the account with that Stripe customer. */
export async function saveSubscription(sub: Subscription): Promise<void> {
  const facts = subscriptionFacts(sub);
  await (
    await ready()
  ).query(`UPDATE users SET subscription_status = $2, paid_until = $3, updated_at = NOW() WHERE stripe_customer_id = $1`, [
    facts.customerId,
    facts.status,
    facts.paidUntil === null ? null : new Date(facts.paidUntil),
  ]);
}

/** Links a finished checkout to the account that started it, and saves its subscription. */
export async function saveCheckout(sessionId: string, expectedUserId?: string): Promise<boolean> {
  const session = await stripe<{
    client_reference_id: string | null;
    customer: string | null;
    subscription: Subscription | string | null;
    status: string;
  }>(`checkout/sessions/${encodeURIComponent(sessionId)}`, { expand: ["subscription"] }, "GET");
  const userId = session.client_reference_id;
  if (!userId || !session.customer || (expectedUserId && userId !== expectedUserId)) return false;
  await (await ready()).query(`UPDATE users SET stripe_customer_id = $2, updated_at = NOW() WHERE id = $1`, [userId, session.customer]);
  if (session.subscription && typeof session.subscription === "object") await saveSubscription(session.subscription);
  return true;
}

/** Fetches the customer's latest subscription from Stripe, in case a webhook was missed. */
export async function refreshCustomer(customerId: string): Promise<void> {
  const list = await stripe<{ data: Subscription[] }>("subscriptions", { customer: customerId, status: "all", limit: 1 }, "GET");
  if (list.data[0]) await saveSubscription(list.data[0]);
}

export interface BillingCheck {
  label: string;
  ok: boolean;
  fix: string;
}

/** What's set up for card payments, for the admin page. Says whether settings exist, never what they are. */
export async function billingSetup(): Promise<{ checks: BillingCheck[]; price: Price | null }> {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  const priceId = process.env.STRIPE_PRICE_ID ?? "";
  const hook = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  let price: Price | null = null;
  let priceError = "";
  let portal = false;
  if (key && priceId) {
    try {
      price = await planPrice();
    } catch (error) {
      priceError = error instanceof Error ? error.message.slice(0, 160) : "unknown error";
    }
    try {
      const configs = await stripe<{ data: { active: boolean }[] }>("billing_portal/configurations", { limit: 1, active: true }, "GET");
      portal = configs.data.length > 0;
    } catch {
      portal = false;
    }
  }
  return {
    price,
    checks: [
      {
        label: "Stripe secret key (STRIPE_SECRET_KEY) is set",
        ok: /^(sk|rk)_/.test(key),
        fix: key
          ? "STRIPE_SECRET_KEY should start with sk_ (or rk_ for a restricted key). Copy it from Stripe → Developers → API keys."
          : "In Stripe, open Developers → API keys and copy the Secret key. In Vercel, add it as STRIPE_SECRET_KEY under Settings → Environment Variables, then redeploy.",
      },
      {
        label: "Price (STRIPE_PRICE_ID) is set and Stripe finds it",
        ok: Boolean(price),
        fix: !priceId
          ? "In Stripe, open Product catalogue, add a product (such as my247tutor) with a recurring monthly price, and copy the price ID (price_…). Add it as STRIPE_PRICE_ID, then redeploy."
          : `Stripe couldn't find that price${priceError ? ` (${priceError})` : ""}. Check STRIPE_PRICE_ID is a price ID (price_…) from the same Stripe account and mode (test or live) as the key.`,
      },
      {
        label: "Customer portal is turned on in Stripe",
        ok: portal,
        fix: "In Stripe, open Settings → Billing → Customer portal and press Save (or Activate). Parents use it to change their card or cancel.",
      },
      {
        label: "Webhook signing secret (STRIPE_WEBHOOK_SECRET) is set",
        ok: hook.startsWith("whsec_"),
        fix: "In Stripe, open Developers → Webhooks → Add endpoint. Use https://<your site>/api/billing/webhook and pick checkout.session.completed, customer.subscription.created, customer.subscription.updated and customer.subscription.deleted. Copy its signing secret (whsec_…) into STRIPE_WEBHOOK_SECRET, then redeploy. Without it, cancellations and failed payments aren't picked up.",
      },
    ],
  };
}
