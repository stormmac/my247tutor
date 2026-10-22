import type { NextRequest } from "next/server";
import { z } from "zod";
import { centreTeacher } from "@/lib/auth/centres";
import { actAsCookies } from "@/lib/auth/actAs";
import { ADMIN_RETURN_COOKIE, SESSION_COOKIE } from "@/lib/auth/session";
import { audit, requireUser } from "@/lib/auth/users";

/**
 * A centre logs in as one of its teachers, to see and help with their classes. The centre's own
 * session is kept for the way back, as when an admin logs in as someone.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id } = await params;
  const teacher = z.uuid().safeParse(id).success ? await centreTeacher(result.user.id, id) : null;
  if (!teacher) return Response.json({ error: "No such teacher." }, { status: 404 });
  if (!teacher.isActive) return Response.json({ error: "This teacher's account is turned off." }, { status: 400 });

  await audit(result.user.id, "log_in_as", teacher.id, {});
  const response = Response.json({ ok: true });
  const cookies = await actAsCookies(
    { session: request.cookies.get(SESSION_COOKIE)!.value, kept: request.cookies.get(ADMIN_RETURN_COOKIE)?.value },
    result.user.id,
    { userId: teacher.id, role: teacher.role, version: teacher.sessionVersion },
  );
  for (const cookie of cookies) response.headers.append("Set-Cookie", cookie);
  return response;
}
