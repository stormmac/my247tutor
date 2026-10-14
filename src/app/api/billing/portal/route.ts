import type { NextRequest } from "next/server";
import { requireUser } from "@/lib/auth/users";
import { billingEnabled, portalUrl } from "@/lib/billing/stripe";

/** Sends the parent to Stripe's page to change their card, see receipts or cancel. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  if (!billingEnabled() || !result.user.stripeCustomerId) return Response.json({ error: "No card on file yet." }, { status: 404 });
  try {
    return Response.json({ url: await portalUrl(result.user, request.nextUrl.origin) });
  } catch {
    return Response.json({ error: "Couldn't reach the payment service. Please try again." }, { status: 502 });
  }
}
