import type { NextRequest } from "next/server";
import { requireUser } from "@/lib/auth/users";
import { checkTutor } from "@/lib/tutor/claude";

/** Admin tests whether Suni can reach the AI service, and why not. */
export async function POST(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  return Response.json(await checkTutor());
}
