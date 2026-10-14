import type { NextRequest } from "next/server";
import { z } from "zod";
import { removePraise } from "@/lib/auth/praise";
import { requireUser } from "@/lib/auth/users";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) return Response.json({ error: "No such phrase." }, { status: 404 });
  return (await removePraise(result.user.id, id))
    ? Response.json({ ok: true })
    : Response.json({ error: "No such phrase." }, { status: 404 });
}
