import type { NextRequest } from "next/server";
import { addTeacher } from "@/lib/auth/centres";
import { sendInvite } from "@/lib/auth/invites";
import { NewTeacherSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

/** A centre adds a teacher, who is emailed a link to set their password. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const parsed = NewTeacherSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const added = await addTeacher(result.user, parsed.data);
  if ("error" in added) return Response.json({ error: added.error }, { status: 409 });
  const invite = await sendInvite(added.user, request.nextUrl.origin, result.user.name);
  return Response.json({ email: added.user.email, ...invite });
}
