import type { NextRequest } from "next/server";
import { z } from "zod";
import { canSeeChats, chatsFor } from "@/lib/auth/suniChats";
import { requireUser } from "@/lib/auth/users";

/** A child's chats with Suni, newest first, for their parent, centre or teacher (or an admin). */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const learner = z.uuid().safeParse(request.nextUrl.searchParams.get("learner"));
  if (!learner.success) return Response.json({ error: "Which child?" }, { status: 400 });
  if (!(await canSeeChats(result.user, learner.data))) return Response.json({ error: "You don't have access to this." }, { status: 403 });
  return Response.json({ chats: await chatsFor(learner.data, result.user) });
}
