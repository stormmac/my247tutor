import type { NextRequest } from "next/server";
import { z } from "zod";
import { actAsCookies } from "@/lib/auth/actAs";
import { centreTeacher, learnAsStudent } from "@/lib/auth/centres";
import { ADMIN_RETURN_COOKIE, SESSION_COOKIE, verifySession } from "@/lib/auth/session";
import type { User } from "@/lib/auth/users";
import { audit, findByLogin, getUser, requireUser } from "@/lib/auth/users";

const Body = z.object({ login: z.string().min(1).max(200) });

/**
 * Logs in as someone by their email or username, from the log in page. An admin can be anyone but
 * another admin, even while logged in as someone else. A centre can be its teachers and students,
 * and a teacher their students.
 */
export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Enter their email or username." }, { status: 400 });

  const actorId = (await verifySession(request.cookies.get(SESSION_COOKIE)?.value))?.actorId;
  const startedBy = actorId ? await getUser(actorId) : null;
  const admin = result.user.role === "admin" || (startedBy?.role === "admin" && startedBy.isActive);
  if (!admin && result.user.role !== "centre" && result.user.role !== "teacher")
    return Response.json({ error: "You don't have access to this." }, { status: 403 });

  const target = await findByLogin(parsed.data.login);
  const allowed = target && target.id !== result.user.id && (admin ? target.role !== "admin" : await manages(result.user, target));
  if (!target || !allowed)
    return Response.json({ error: "There's no one with that email or username you can log in as." }, { status: 404 });
  if (!target.isActive) return Response.json({ error: "This account is turned off." }, { status: 400 });

  await audit(result.user.id, "log_in_as", target.id, actorId ? { startedBy: actorId } : {});
  const response = Response.json({ ok: true, role: target.role });
  const cookies = await actAsCookies(
    { session: request.cookies.get(SESSION_COOKIE)!.value, kept: request.cookies.get(ADMIN_RETURN_COOKIE)?.value },
    result.user.id,
    { userId: target.id, role: target.role, version: target.sessionVersion },
  );
  for (const cookie of cookies) response.headers.append("Set-Cookie", cookie);
  return response;
}

/** Whether a centre or teacher looks after this account: a centre's own teachers, and their students. */
async function manages(viewer: User, target: User): Promise<boolean> {
  if (viewer.role === "centre" && target.role === "teacher" && (await centreTeacher(viewer.id, target.id))) return true;
  if (target.role !== "student" || !target.learnerId) return false;
  const student = await learnAsStudent(viewer, target.learnerId);
  return Boolean(student && !("error" in student));
}
