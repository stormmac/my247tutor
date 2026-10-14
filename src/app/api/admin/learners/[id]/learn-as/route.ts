import type { NextRequest } from "next/server";
import { z } from "zod";
import { adminReturnCookie, SESSION_COOKIE, sessionCookie } from "@/lib/auth/session";
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
  response.headers.append("Set-Cookie", adminReturnCookie(request.cookies.get(SESSION_COOKIE)!.value));
  response.headers.append(
    "Set-Cookie",
    await sessionCookie({ userId: target.user.id, role: target.user.role, version: target.user.sessionVersion, actorId: result.user.id }),
  );
  return response;
}
