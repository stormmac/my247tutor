import type { NextRequest } from "next/server";
import { z } from "zod";
import { setChatFlag } from "@/lib/auth/suniChats";
import { requireUser } from "@/lib/auth/users";

const Body = z.object({ flagged: z.boolean() });

/** A grown-up flags a message to Suni for a closer look, or clears its flag. */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const id = z.uuid().safeParse((await params).id);
  const body = Body.safeParse(await request.json().catch(() => null));
  if (!id.success || !body.success) return Response.json({ error: "Invalid request" }, { status: 400 });
  const chat = await setChatFlag(result.user, id.data, body.data.flagged);
  return chat ? Response.json({ chat }) : Response.json({ error: "We couldn't find that message." }, { status: 404 });
}
