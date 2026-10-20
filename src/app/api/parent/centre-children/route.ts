import type { NextRequest } from "next/server";
import { centreChildren } from "@/lib/auth/family";
import { requireUser } from "@/lib/auth/users";

/** The centre students this parent is linked to, with their progress. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request, "parent");
  if ("response" in result) return Response.json({ children: [] });
  return Response.json({ children: await centreChildren(result.user.id) });
}
