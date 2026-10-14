import type { NextRequest } from "next/server";
import { z } from "zod";
import { classForViewer } from "@/lib/auth/centres";
import { requireUser } from "@/lib/auth/users";

/** One class and how each student in it is going. */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const { id } = await params;
  const found = z.uuid().safeParse(id).success ? await classForViewer(result.user, id) : null;
  return found ? Response.json(found) : Response.json({ error: "No such class." }, { status: 404 });
}
