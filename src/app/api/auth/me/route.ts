import type { NextRequest } from "next/server";
import { accountsEnabled, SESSION_COOKIE, TRIAL_COOKIE, verifySession, verifyTrial } from "@/lib/auth/session";
import { getUser, requireUser } from "@/lib/auth/users";
import { needsPayment, planFor } from "@/lib/billing/access";
import { billingEnabled } from "@/lib/billing/stripe";

/** Who is signed in. `enabled: false` means accounts aren't set up, so the site runs without them. */
export async function GET(request: NextRequest) {
  if (!accountsEnabled()) return Response.json({ enabled: false, user: null });
  const result = await requireUser(request);
  if ("response" in result) {
    const trialEndsAt = await verifyTrial(request.cookies.get(TRIAL_COOKIE)?.value);
    return Response.json({ enabled: true, billing: billingEnabled(), user: null, trialEndsAt });
  }
  const { id, name, role, trialEndsAt, username } = result.user;
  // A child has no email of their own; they see the username they sign in with.
  const email = username ?? result.user.email;
  const plan = planFor(result.user);
  // An admin logged in as this account from Admin.
  const actorId = (await verifySession(request.cookies.get(SESSION_COOKIE)?.value))?.actorId;
  const actor = actorId ? await getUser(actorId) : null;
  return Response.json({
    enabled: true,
    billing: billingEnabled(),
    user: {
      id,
      name,
      email,
      role,
      child: role === "student",
      plan,
      needsPayment: needsPayment(result.user),
      trialEndsAt: plan === "trial" ? trialEndsAt : null,
      actingAdmin: actor ? actor.name : null,
    },
  });
}
