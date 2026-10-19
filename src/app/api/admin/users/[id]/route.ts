import type { NextRequest } from "next/server";
import { z } from "zod";
import { setOwnerCurriculum } from "@/lib/auth/learners";
import { ASSIGNABLE_ROLES } from "@/lib/auth/rules";
import { audit, getUser, requireUser, updateUser } from "@/lib/auth/users";
import { CURRICULA } from "@/lib/curriculum/curricula";

const ChangeSchema = z.object({
  role: z.enum(ASSIGNABLE_ROLES).optional(),
  isActive: z.boolean().optional(),
  freeAccess: z.boolean().optional(),
  /** A parent's or centre's curriculum: also changes every child they have. */
  curriculum: z.enum(CURRICULA).optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const { id } = await params;
  const parsed = ChangeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !z.uuid().safeParse(id).success) return Response.json({ error: "Invalid change." }, { status: 400 });
  // Admins can't lock themselves out by mistake.
  if (id === result.user.id) return Response.json({ error: "You can't change your own account here." }, { status: 400 });

  const { curriculum, ...change } = parsed.data;
  if (curriculum) {
    if (!(await setOwnerCurriculum(id, curriculum)))
      return Response.json({ error: "Only a parent or tutoring centre has a curriculum." }, { status: 400 });
    await audit(result.user.id, "set_curriculum", id, { curriculum });
    if (!Object.keys(change).length) return Response.json({ user: await getUser(id) });
  }
  const user = await updateUser(result.user, id, change);
  return user ? Response.json({ user }) : Response.json({ error: "No such user." }, { status: 404 });
}
