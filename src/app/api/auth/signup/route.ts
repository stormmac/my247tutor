import type { NextRequest } from "next/server";
import { SignUpSchema, newAccountTrialEnd } from "@/lib/auth/rules";
import { accountsEnabled, sessionCookie, TRIAL_COOKIE, TRIAL_MINUTES, verifyTrial } from "@/lib/auth/session";
import { createUser } from "@/lib/auth/users";

export async function POST(request: NextRequest) {
  if (!accountsEnabled()) return Response.json({ error: "Accounts aren't switched on yet." }, { status: 404 });
  const parsed = SignUpSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check your details." }, { status: 400 });

  // The free trial carries on from this browser's free hour, if it had one.
  const trialEnd = newAccountTrialEnd(await verifyTrial(request.cookies.get(TRIAL_COOKIE)?.value), TRIAL_MINUTES);
  const result = await createUser(parsed.data.name, parsed.data.email, parsed.data.password, trialEnd);
  if ("error" in result) return Response.json({ error: result.error }, { status: 409 });

  const { user } = result;
  const response = Response.json({ user: { name: user.name, role: user.role } });
  response.headers.append("Set-Cookie", await sessionCookie({ userId: user.id, role: user.role, version: user.sessionVersion }));
  return response;
}
