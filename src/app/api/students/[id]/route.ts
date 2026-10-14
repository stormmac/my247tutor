import type { NextRequest } from "next/server";
import { z } from "zod";
import { studentForViewer } from "@/lib/auth/centres";
import { requireUser } from "@/lib/auth/users";

/** A student's full progress, for their centre or a teacher who has them in a class. */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const { id } = await params;
  const profile = z.uuid().safeParse(id).success ? await studentForViewer(result.user, id) : null;
  return profile ? Response.json({ profile }) : Response.json({ error: "No such student." }, { status: 404 });
}
