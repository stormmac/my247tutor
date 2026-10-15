import type { NextRequest } from "next/server";
import { recentChats } from "@/lib/auth/suniChats";
import { requireUser } from "@/lib/auth/users";

/** Every student's chats with Suni, newest first, or only the flagged ones. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request, "admin");
  if ("response" in result) return result.response;
  const flaggedOnly = request.nextUrl.searchParams.get("flagged") === "1";
  return Response.json({ chats: await recentChats({ flaggedOnly }) });
}
