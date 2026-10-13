import type { NextRequest } from "next/server";
import { z } from "zod";
import { getLearnerProfile, MAX_PROFILE_BYTES, saveLearnerProfile, StoredProfileSchema } from "@/lib/auth/learners";
import { requireUser } from "@/lib/auth/users";

/** The signed-in parent's child's saved progress. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  return Response.json((await getLearnerProfile(result.user.id)) ?? { profile: null });
}

const SaveSchema = z.object({ profile: StoredProfileSchema.nullable() });

export async function PUT(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const text = await request.text();
  if (text.length > MAX_PROFILE_BYTES) return Response.json({ error: "Too much data." }, { status: 413 });
  let body: unknown = null;
  try {
    body = JSON.parse(text);
  } catch {}
  const parsed = SaveSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "That doesn't look like a learner profile." }, { status: 400 });
  await saveLearnerProfile(result.user.id, parsed.data.profile);
  return Response.json({ ok: true });
}
