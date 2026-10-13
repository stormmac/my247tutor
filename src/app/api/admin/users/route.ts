import type { NextRequest } from "next/server";
import { listUsers, requireUser } from "@/lib/auth/users";

export async function GET(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  return Response.json({ users: await listUsers(), me: result.user.id });
}
