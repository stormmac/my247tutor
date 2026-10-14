import type { NextRequest } from "next/server";
import { SignInSchema } from "@/lib/auth/rules";
import { accountsEnabled, sessionCookie } from "@/lib/auth/session";
import { clientIp, signIn } from "@/lib/auth/users";

export async function POST(request: NextRequest) {
  if (!accountsEnabled()) return Response.json({ error: "Accounts aren't switched on yet." }, { status: 404 });
  const parsed = SignInSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "That email and password don't match." }, { status: 401 });

  const result = await signIn(parsed.data.email, parsed.data.password, clientIp(request));
  if ("error" in result) return Response.json({ error: result.error }, { status: result.status });

  const { user } = result;
  const response = Response.json({ user: { name: user.name, role: user.role } });
  response.headers.append("Set-Cookie", await sessionCookie({ userId: user.id, role: user.role, version: user.sessionVersion }));
  return response;
}
