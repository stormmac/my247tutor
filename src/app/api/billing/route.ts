import type { NextRequest } from "next/server";
import { z } from "zod";
import { planFor } from "@/lib/billing/access";
import { billingEnabled, planPrice, refreshCustomer, saveCheckout } from "@/lib/billing/stripe";
import { getUser, requireUser, type User } from "@/lib/auth/users";

async function summary(user: User) {
  const enabled = billingEnabled();
  return {
    enabled,
    plan: planFor(user),
    trialEndsAt: user.trialEndsAt,
    paidUntil: user.paidUntil,
    subscriptionStatus: user.subscriptionStatus,
    hasCard: Boolean(user.stripeCustomerId),
    price: enabled ? await planPrice().catch(() => null) : null,
  };
}

/** The signed-in account's plan, trial and payment state. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  return Response.json(await summary(result.user));
}

const SyncSchema = z.object({ sessionId: z.string().max(255).optional() });

/** Back from Stripe: picks up the finished checkout (or the latest state) without waiting for the webhook. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = SyncSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success || !billingEnabled()) return Response.json(await summary(result.user));
  try {
    if (parsed.data.sessionId) await saveCheckout(parsed.data.sessionId, result.user.id);
    else if (result.user.stripeCustomerId) await refreshCustomer(result.user.stripeCustomerId);
  } catch {
    // Stripe unreachable: show what we have; the webhook will catch up.
  }
  return Response.json(await summary((await getUser(result.user.id)) ?? result.user));
}
