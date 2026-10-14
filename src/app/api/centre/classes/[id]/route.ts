import type { NextRequest } from "next/server";
import { z } from "zod";
import { deleteClass, updateClass } from "@/lib/auth/centres";
import { ClassSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

type Context = { params: Promise<{ id: string }> };
const noSuchClass = () => Response.json({ error: "No such class." }, { status: 404 });

/** A centre renames a class or changes its year, subject or teacher. */
export async function PATCH(request: NextRequest, { params }: Context) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) return noSuchClass();
  const parsed = ClassSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const updated = await updateClass(result.user, id, parsed.data);
  return "error" in updated ? Response.json({ error: updated.error }, { status: updated.status }) : Response.json(updated);
}

/** Deletes a class. Its students stay at the centre. */
export async function DELETE(request: NextRequest, { params }: Context) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id } = await params;
  return z.uuid().safeParse(id).success && (await deleteClass(result.user, id)) ? Response.json({ ok: true }) : noSuchClass();
}
