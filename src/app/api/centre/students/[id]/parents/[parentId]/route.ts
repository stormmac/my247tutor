import type { NextRequest } from "next/server";
import { z } from "zod";
import { unlinkParent } from "@/lib/auth/family";
import { requireUser } from "@/lib/auth/users";

/** A centre stops a parent seeing one of its students. The parent's account stays. */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string; parentId: string }> }) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const { id, parentId } = await params;
  const ok = z.uuid().safeParse(id).success && z.uuid().safeParse(parentId).success && (await unlinkParent(result.user, id, parentId));
  return ok ? Response.json({ ok: true }) : Response.json({ error: "No such parent." }, { status: 404 });
}
