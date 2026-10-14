import type { NextRequest } from "next/server";
import { z } from "zod";
import { centreTeacher } from "@/lib/auth/centres";
import { sendInvite } from "@/lib/auth/invites";
import { audit, requireUser } from "@/lib/auth/users";

/** Emails one of the centre's teachers a fresh set-password link. */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id } = await params;
  const teacher = z.uuid().safeParse(id).success ? await centreTeacher(result.user.id, id) : null;
  if (!teacher) return Response.json({ error: "No such teacher." }, { status: 404 });
  const invite = await sendInvite(teacher, request.nextUrl.origin, result.user.name);
  await audit(result.user.id, "send_invite", teacher.id, { emailed: invite.emailed });
  return Response.json({ email: teacher.email, ...invite });
}
