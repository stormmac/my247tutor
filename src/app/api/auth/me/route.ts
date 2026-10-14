import type { NextRequest } from "next/server";
import { accountsEnabled, TRIAL_COOKIE, verifyTrial } from "@/lib/auth/session";
import { requireUser } from "@/lib/auth/users";

/** Who is signed in. `enabled: false` means accounts aren't set up, so the site runs without them. */
export async function GET(request: NextRequest) {
  if (!accountsEnabled()) return Response.json({ enabled: false, user: null });
  const result = await requireUser(request);
  if ("response" in result) {
    const trialEndsAt = await verifyTrial(request.cookies.get(TRIAL_COOKIE)?.value);
    return Response.json({ enabled: true, user: null, trialEndsAt });
  }
  const { id, name, email, role } = result.user;
  return Response.json({ enabled: true, user: { id, name, email, role } });
}
