import type { NextRequest } from "next/server";
import { paymentRequired } from "@/lib/billing/access";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { getSkill } from "@/lib/curriculum/skills";
import { getOutcome } from "@/lib/curriculum/outcomes";
import { WRITING_TASKS } from "@/lib/english/bank";
import { hasWellbeingConcern, redactPersonalInfo, WELLBEING_REPLY } from "@/lib/tutor/safety";
import { markWriting, tutorConfigured } from "@/lib/tutor/claude";

const RequestSchema = z.object({
  skillId: z.string(),
  taskIndex: z.number().int().min(0),
  yearLevel: z.number().int().min(1).max(6),
  text: z.string().min(1).max(8000),
});

export async function POST(request: NextRequest) {
  const unpaid = await paymentRequired(request);
  if (unpaid) return unpaid;
  const parsed = RequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });
  const { skillId, taskIndex, yearLevel, text } = parsed.data;

  const task = WRITING_TASKS[skillId]?.[taskIndex];
  if (!task) return Response.json({ error: "Unknown writing task" }, { status: 400 });

  const words = text.trim().split(/\s+/).length;
  if (words < 20) return Response.json({ error: "Write at least 20 words, then ask for feedback." }, { status: 400 });
  if (hasWellbeingConcern(text)) return Response.json({ wellbeing: WELLBEING_REPLY });
  if (!tutorConfigured())
    return Response.json({ error: "Writing feedback isn't switched on yet. Ask a grown-up to add the API key." }, { status: 503 });

  const skill = getSkill(skillId);
  const outcome = getOutcome(skill.outcome);
  try {
    const feedback = await markWriting({
      yearLevel,
      task: task.prompt,
      criteria: task.criteria,
      outcome: `${outcome.code} ${outcome.summary}`,
      text: redactPersonalInfo(text).text,
    });
    if (!feedback) return Response.json({ error: "I couldn't give feedback on that piece. Try a different topic." }, { status: 422 });
    return Response.json({ feedback });
  } catch (err) {
    console.error("Writing feedback failed", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
    return Response.json({ error: "Something went wrong. Try again in a moment." }, { status: 502 });
  }
}
