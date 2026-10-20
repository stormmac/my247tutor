import type { NextRequest } from "next/server";
import { z } from "zod";
import { learnAsStudent } from "@/lib/auth/centres";
import { adminReturnCookie, SESSION_COOKIE, sessionCookie, verifySession } from "@/lib/auth/session";
import { audit, requireUser } from "@/lib/auth/users";

/**
 * A teacher or centre learns as one of their students, logged in as the student's own sign-in. Their
 * own session is kept for the way back, as when an admin logs in as someone.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  if (result.user.role !== "teacher" && result.user.role !== "centre")
    return Response.json({ error: "This is for tutoring centres and their teachers." }, { status: 403 });
  // Only one way back is kept, so someone already logged in as another account goes back first.
  if ((await verifySession(request.cookies.get(SESSION_COOKIE)?.value))?.actorId)
    return Response.json({ error: "You're already logged in as someone else. Go back to your own account first." }, { status: 400 });
  const { id } = await params;
  const student = z.uuid().safeParse(id).success ? await learnAsStudent(result.user, id) : null;
  if (!student) return Response.json({ error: "No such student." }, { status: 404 });
  if ("error" in student) return Response.json(student, { status: 400 });

  await audit(result.user.id, "learn_as", student.id, { learnerId: id });
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", adminReturnCookie(request.cookies.get(SESSION_COOKIE)!.value));
  response.headers.append(
    "Set-Cookie",
    await sessionCookie({ userId: student.id, role: student.role, version: student.sessionVersion, actorId: result.user.id }),
  );
  return response;
}
