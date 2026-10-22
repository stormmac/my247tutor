import type { NextRequest } from "next/server";
import { z } from "zod";
import { actAsCookies } from "@/lib/auth/actAs";
import { ADMIN_RETURN_COOKIE, SESSION_COOKIE } from "@/lib/auth/session";
import { audit, learnAsTarget, requireUser } from "@/lib/auth/users";

/**
 * An admin learns as one student: logged in as the student's own sign-in, or as their parent with
 * that child picked when they have none. The admin's session is kept for "Back to Admin", as with
 * logging in as an account.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const { id } = await params;
  const target = z.uuid().safeParse(id).success ? await learnAsTarget(id) : null;
  if (!target) return Response.json({ error: "No such student." }, { status: 404 });
  if ("error" in target) return Response.json(target, { status: 400 });

  await audit(result.user.id, "learn_as", target.user.id, { learnerId: id });
  const response = Response.json({ ok: true, pick: target.pick });
  const cookies = await actAsCookies(
    { session: request.cookies.get(SESSION_COOKIE)!.value, kept: request.cookies.get(ADMIN_RETURN_COOKIE)?.value },
    result.user.id,
    { userId: target.user.id, role: target.user.role, version: target.user.sessionVersion },
  );
  for (const cookie of cookies) response.headers.append("Set-Cookie", cookie);
  return response;
}
