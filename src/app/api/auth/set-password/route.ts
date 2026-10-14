import type { NextRequest } from "next/server";
import { z } from "zod";
import { inviteFor, setPasswordWithInvite } from "@/lib/auth/invites";
import { PasswordSchema } from "@/lib/auth/rules";
import { accountsEnabled, sessionCookie } from "@/lib/auth/session";

const Token = z.string().min(20).max(100);
const GONE = "This link has already been used or has run out. Ask my247tutor to send a new one.";

/** Whose account a set-password link is for, so the page can greet them. */
export async function GET(request: NextRequest) {
  if (!accountsEnabled()) return Response.json({ error: "Accounts aren't switched on." }, { status: 404 });
  const token = Token.safeParse(request.nextUrl.searchParams.get("token"));
  const user = token.success ? await inviteFor(token.data) : null;
  if (!user) return Response.json({ error: GONE }, { status: 410 });
  return Response.json({ name: user.name, email: user.email });
}

const SetSchema = z.object({ token: Token, password: PasswordSchema });

/** Sets the password from the link, then signs the person in. */
export async function POST(request: NextRequest) {
  if (!accountsEnabled()) return Response.json({ error: "Accounts aren't switched on." }, { status: 404 });
  const parsed = SetSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check your password." }, { status: 400 });
  const user = await setPasswordWithInvite(parsed.data.token, parsed.data.password);
  if (!user) return Response.json({ error: GONE }, { status: 410 });
  const response = Response.json({ role: user.role });
  response.headers.append("Set-Cookie", await sessionCookie({ userId: user.id, role: user.role, version: user.sessionVersion }));
  return response;
}
