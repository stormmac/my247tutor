import { createHmac, timingSafeEqual } from "node:crypto";

/** How old a webhook can be, so a captured one can't be replayed later. */
const TOLERANCE_SECONDS = 300;

/**
 * Checks a Stripe webhook really came from Stripe: the Stripe-Signature header carries a time and
 * an HMAC-SHA256 of "time.body" made with the endpoint's signing secret (whsec_…).
 */
export function verifyStripeSignature(body: string, header: string | null, secret: string, now = Date.now()): boolean {
  if (!header || !secret) return false;
  const parts = header.split(",").map((p) => p.split("=") as [string, string]);
  const time = Number(parts.find(([k]) => k === "t")?.[1]);
  const signatures = parts.filter(([k]) => k === "v1").map(([, v]) => v);
  if (!Number.isFinite(time) || !signatures.length || Math.abs(now / 1000 - time) > TOLERANCE_SECONDS) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${time}.${body}`).digest("hex"));
  return signatures.some((s) => {
    const given = Buffer.from(s);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

/** The subscription fields we keep, from a Stripe subscription object. */
export function subscriptionFacts(sub: {
  customer: string | { id: string };
  status: string;
  current_period_end?: number;
  items?: { data?: { current_period_end?: number }[] };
}): { customerId: string; status: string; paidUntil: number | null } {
  // Newer Stripe API versions keep the period end on each item rather than the subscription.
  const end = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end;
  return {
    customerId: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    status: sub.status,
    paidUntil: end ? end * 1000 : null,
  };
}

/** Form-encodes Stripe's nested parameters: { line_items: [{ price: "p" }] } → line_items[0][price]=p. */
export function stripeForm(params: Record<string, unknown>): URLSearchParams {
  const form = new URLSearchParams();
  const add = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) value.forEach((v, i) => add(`${key}[${i}]`, v));
    else if (typeof value === "object") for (const [k, v] of Object.entries(value)) add(`${key}[${k}]`, v);
    else form.append(key, String(value));
  };
  for (const [k, v] of Object.entries(params)) add(k, v);
  return form;
}
