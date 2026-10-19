import type { NextRequest } from "next/server";
import { z } from "zod";
import { setLearnerCurriculum } from "@/lib/auth/learners";
import { audit, requireUser } from "@/lib/auth/users";
import { CURRICULA } from "@/lib/curriculum/curricula";

const ChangeSchema = z.object({ curriculum: z.enum(CURRICULA) });

/** Admin changes one student's curriculum. */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const { id } = await params;
  const parsed = ChangeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !z.uuid().safeParse(id).success) return Response.json({ error: "Invalid change." }, { status: 400 });
  if (!(await setLearnerCurriculum(id, parsed.data.curriculum))) return Response.json({ error: "No such student." }, { status: 404 });
  await audit(result.user.id, "set_curriculum", id, parsed.data);
  return Response.json({ ok: true });
}
