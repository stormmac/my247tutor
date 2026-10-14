import type { NextRequest } from "next/server";
import { listChildLogins, requireUser } from "@/lib/auth/users";

/** The sign-ins a parent has set up for their children. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  if (result.user.role === "centre") return Response.json({ logins: [] });
  if (result.user.role === "student") return Response.json({ error: "Ask your grown-up to do this." }, { status: 403 });
  return Response.json({ logins: await listChildLogins(result.user.id) });
}
