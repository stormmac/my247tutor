import type { NextRequest } from "next/server";
import { createClass } from "@/lib/auth/centres";
import { ClassSchema } from "@/lib/auth/rules";
import { requireUser } from "@/lib/auth/users";

/** A centre creates a class. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request, "centre");
  if ("response" in result) return result.response;
  const parsed = ClassSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const created = await createClass(result.user, parsed.data);
  return "error" in created ? Response.json(created, { status: 400 }) : Response.json(created);
}
