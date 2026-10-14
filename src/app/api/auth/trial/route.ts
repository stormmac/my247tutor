import type { NextRequest } from "next/server";
import { accountsEnabled, TRIAL_COOKIE, TRIAL_MINUTES, trialCookie, verifyTrial } from "@/lib/auth/session";

/** Starts this browser's free hour. A trial already started, or used up, isn't restarted. */
export async function POST(request: NextRequest) {
  if (!accountsEnabled()) return Response.json({ error: "Accounts aren't switched on." }, { status: 404 });
  const existing = await verifyTrial(request.cookies.get(TRIAL_COOKIE)?.value);
  if (existing !== null) return Response.json({ endsAt: existing });
  const now = Date.now();
  const response = Response.json({ endsAt: now + TRIAL_MINUTES * 60_000 });
  response.headers.append("Set-Cookie", await trialCookie(now));
  return response;
}
