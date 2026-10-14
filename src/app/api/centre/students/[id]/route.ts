import type { NextRequest } from "next/server";
import { z } from "zod";
import { removeStudent, updateStudent } from "@/lib/auth/centres";
import { StudentChangeSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

type Context = { params: Promise<{ id: string }> };
const noSuchStudent = () => Response.json({ error: "No such student." }, { status: 404 });

/** A centre changes a student's name, year, username, password or classes. */
export async function PATCH(request: NextRequest, { params }: Context) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) return noSuchStudent();
  const parsed = StudentChangeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const updated = await updateStudent(result.user, id, parsed.data);
  return "error" in updated ? Response.json({ error: updated.error }, { status: updated.status }) : Response.json(updated);
}

/** Deletes a student, their sign-in and their progress. */
export async function DELETE(request: NextRequest, { params }: Context) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id } = await params;
  return z.uuid().safeParse(id).success && (await removeStudent(result.user, id)) ? Response.json({ ok: true }) : noSuchStudent();
}
