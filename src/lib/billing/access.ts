import "server-only";
import type { NextRequest } from "next/server";
import { accountPlan, type Plan } from "../auth/rules";
import { SESSION_COOKIE, verifySession } from "../auth/session";
import { getUser, type User } from "../auth/users";
import { billingEnabled } from "./stripe";

export function planFor(user: User, now = Date.now()): Plan {
  return accountPlan(user, now);
}

/** True when payments are on and this account's free trial is over without a card added. */
export function needsPayment(user: User, now = Date.now()): boolean {
  return billingEnabled() && planFor(user, now) === "unpaid";
}

/**
 * For routes that cost money to run (the AI tutor, writing feedback): a 402 response when the
 * signed-in account needs to pay first. Visitors on the free hour are let through by the proxy.
 */
export async function paymentRequired(request: NextRequest): Promise<Response | null> {
  if (!billingEnabled()) return null;
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value).catch(() => null);
  if (!session) return null;
  const user = await getUser(session.userId);
  if (user && needsPayment(user)) {
    return Response.json({ error: "Your free trial has ended. Please add a payment method to keep going." }, { status: 402 });
  }
  return null;
}
