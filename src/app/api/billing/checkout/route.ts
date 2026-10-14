import type { NextRequest } from "next/server";
import { requireUser } from "@/lib/auth/users";
import { billingEnabled, checkoutUrl, portalUrl } from "@/lib/billing/stripe";

/** Sends the parent to Stripe to add a card. If they already pay, to Stripe's page for changing it. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  if (!billingEnabled()) return Response.json({ error: "Card payments aren't switched on." }, { status: 404 });
  const { user } = result;
  const origin = request.nextUrl.origin;
  try {
    const paying = user.stripeCustomerId && ["active", "trialing", "past_due"].includes(user.subscriptionStatus ?? "");
    return Response.json({ url: paying ? await portalUrl(user, origin) : await checkoutUrl(user, origin) });
  } catch {
    return Response.json({ error: "Couldn't reach the payment service. Please try again." }, { status: 502 });
  }
}
