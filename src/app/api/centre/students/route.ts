import type { NextRequest } from "next/server";
import { addStudent } from "@/lib/auth/centres";
import { NewStudentSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

/** A centre adds a student with their own username and password. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const parsed = NewStudentSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const added = await addStudent(result.user, parsed.data);
  return "error" in added ? Response.json({ error: added.error }, { status: added.status }) : Response.json(added);
}
