import type { NextRequest } from "next/server";
import { z } from "zod";
import { requireUser, resetPassword } from "@/lib/auth/users";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) return Response.json({ error: "No such user." }, { status: 404 });
  const password = await resetPassword(result.user, id);
  return password ? Response.json({ password }) : Response.json({ error: "No such user." }, { status: 404 });
}
