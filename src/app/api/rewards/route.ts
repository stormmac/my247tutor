import type { NextRequest } from "next/server";
import { z } from "zod";
import { rewardsFor, setReward } from "@/lib/auth/rewards";
import { requireUser } from "@/lib/auth/users";
import { REWARD_KINDS, validAmount } from "@/lib/learner/rewards";

/** A child's reward program: what's on offer, what they've earned and their totals. For the child and their grown-ups. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const learnerId = request.nextUrl.searchParams.get("learner") ?? result.user.learnerId ?? "";
  const rewards = z.uuid().safeParse(learnerId).success ? await rewardsFor(result.user, learnerId) : null;
  if (!rewards) return Response.json({ error: "No such child." }, { status: 404 });
  return Response.json(rewards);
}

const RewardSchema = z.object({
  learnerId: z.uuid(),
  subject: z.enum(["maths", "english"]),
  /** Null takes this person's reward away. */
  reward: z.object({ kind: z.enum(REWARD_KINDS), amount: z.number() }).nullable(),
});

/** A parent, centre or teacher sets what finishing a subject's weekly lesson is worth. */
export async function PUT(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const parsed = RewardSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Check the reward." }, { status: 400 });
  const { learnerId, subject, reward } = parsed.data;
  if (reward && !validAmount(reward.kind, reward.amount))
    return Response.json(
      { error: reward.kind === "points" ? "Points must be a whole number from 1 to 10 000." : "Money must be from $0.05 to $1000." },
      { status: 400 },
    );
  if (!(await setReward(result.user, learnerId, subject, reward)))
    return Response.json({ error: "You can't set rewards for this child." }, { status: 403 });
  return Response.json(await rewardsFor(result.user, learnerId));
}
