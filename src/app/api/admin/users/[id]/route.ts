import type { NextRequest } from "next/server";
import { z } from "zod";
import { ASSIGNABLE_ROLES } from "@/lib/auth/rules";
import { requireUser, updateUser } from "@/lib/auth/users";

const ChangeSchema = z.object({
  role: z.enum(ASSIGNABLE_ROLES).optional(),
  isActive: z.boolean().optional(),
  freeAccess: z.boolean().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const { id } = await params;
  const parsed = ChangeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !z.uuid().safeParse(id).success) return Response.json({ error: "Invalid change." }, { status: 400 });
  // Admins can't lock themselves out by mistake.
  if (id === result.user.id) return Response.json({ error: "You can't change your own account here." }, { status: 400 });

  const user = await updateUser(result.user, id, parsed.data);
  return user ? Response.json({ user }) : Response.json({ error: "No such user." }, { status: 404 });
}
