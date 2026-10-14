import type { NextRequest } from "next/server";
import { z } from "zod";
import { removeTeacher } from "@/lib/auth/centres";
import { requireUser } from "@/lib/auth/users";

/** A centre removes a teacher's account. Their classes stay, without a teacher. */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id } = await params;
  const removed = z.uuid().safeParse(id).success && (await removeTeacher(result.user, id));
  return removed ? Response.json({ ok: true }) : Response.json({ error: "No such teacher." }, { status: 404 });
}
