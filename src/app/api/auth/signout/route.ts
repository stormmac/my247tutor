import { clearedSessionCookie } from "@/lib/auth/session";

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", clearedSessionCookie());
  return response;
}
