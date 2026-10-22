import type { NextRequest } from "next/server";
import { paymentRequired } from "@/lib/billing/access";
import Anthropic from "@anthropic-ai/sdk";
import { databaseUrl } from "@/lib/auth/dburl";
import { cachedHints, cacheHints, hintKey } from "@/lib/auth/questionHints";
import { tutorConfigured, writeHints } from "@/lib/tutor/claude";
import { HINT_COUNT, HintRequestSchema, withoutAnswer } from "@/lib/tutor/hints";

/**
 * Hints written for the question on screen. Each question's are written once and kept, so the
 * next child stuck on it gets them straight away. The page falls back to its own hints on any error.
 */
export async function POST(request: NextRequest) {
  const unpaid = await paymentRequired(request);
  if (unpaid) return unpaid;
  const parsed = HintRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });
  const req = parsed.data;

  const key = hintKey(req);
  const kept = databaseUrl() ? await cachedHints(key).catch(() => null) : null;
  if (kept) return Response.json({ hints: kept });
  if (!tutorConfigured()) return Response.json({ error: "Hints aren't switched on yet." }, { status: 503 });

  try {
    const written = await writeHints(req);
    const hints = withoutAnswer(written ?? [], req.correctAnswer).slice(0, HINT_COUNT);
    if (!hints.length) return Response.json({ error: "No hints for this one." }, { status: 422 });
    // Only a full set is kept; a set with hints dropped for giving the answer away is written again next time.
    if (hints.length === HINT_COUNT && databaseUrl()) await cacheHints(key, hints).catch((e) => console.error("Couldn't keep hints", e));
    return Response.json({ hints });
  } catch (err) {
    console.error("Writing hints failed", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
    return Response.json({ error: "Something went wrong." }, { status: 502 });
  }
}
