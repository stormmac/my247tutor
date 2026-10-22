import type { NextRequest } from "next/server";
import { z } from "zod";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";
import { chatLearner } from "@/lib/auth/suniChats";
import { checkinState, learnerName, saveCheckin } from "@/lib/auth/suniNotes";
import { requireUser, type User } from "@/lib/auth/users";
import { MOODS } from "@/lib/tutor/memory";

/**
 * The child Suni checks in with: a child's own sign-in, or the child a parent has picked. Nobody
 * when a grown-up is logged in as the child, so their answers aren't kept as the child's.
 */
async function checkinLearner(request: NextRequest, user: User, claimed: string | null): Promise<string | null> {
  if ((await verifySession(request.cookies.get(SESSION_COOKIE)?.value))?.actorId) return null;
  if (user.role !== "student" && user.role !== "parent") return null;
  return chatLearner(user, claimed ?? undefined);
}

/** Whether Suni should ask the child how they're feeling now. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const learnerId = await checkinLearner(request, result.user, request.nextUrl.searchParams.get("learner"));
  if (!learnerId) return Response.json({ due: false, today: null });
  return Response.json(await checkinState(learnerId));
}

const Body = z.object({
  learnerId: z.uuid().optional(),
  mood: z.enum(MOODS).nullable().optional(),
  focus: z.string().trim().max(300).nullable().optional(),
});

/** Keeps how the child feels and what they'd like to work on (or that they closed the check-in). */
export async function POST(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });
  const learnerId = await checkinLearner(request, result.user, parsed.data.learnerId ?? null);
  if (!learnerId) return Response.json({ ok: true, kept: false });
  await saveCheckin({
    learnerId,
    userId: result.user.id,
    name: await learnerName(learnerId),
    mood: parsed.data.mood ?? null,
    focus: parsed.data.focus || null,
  });
  return Response.json({ ok: true, kept: true });
}
