import type { NextRequest } from "next/server";
import { listLearnerOwners, requireUser } from "@/lib/auth/users";

/** Every parent and centre with their students, for Admin's Learn picker. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  return Response.json({ owners: await listLearnerOwners() });
}
