import type { NextRequest } from "next/server";
import { z } from "zod";
import { getLearnerProfiles, MAX_PROFILE_BYTES, saveLearnerProfiles, StoredProfileSchema } from "@/lib/auth/learners";
import { requireUser } from "@/lib/auth/users";
import { MAX_CHILDREN } from "@/lib/learner/model";

/** The signed-in parent's children and their saved progress. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const profiles = await getLearnerProfiles(result.user.id);
  return Response.json({ profiles, profile: profiles[0] ?? null });
}

/** `{profiles}` replaces the account's children; `{profile}` is the older one-child form. */
const SaveSchema = z.union([
  z.object({ profiles: z.array(StoredProfileSchema).max(MAX_CHILDREN) }),
  z.object({ profile: StoredProfileSchema.nullable() }),
]);

export async function PUT(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const text = await request.text();
  if (text.length > MAX_PROFILE_BYTES * MAX_CHILDREN) return Response.json({ error: "Too much data." }, { status: 413 });
  let body: unknown = null;
  try {
    body = JSON.parse(text);
  } catch {}
  const parsed = SaveSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "That doesn't look like a learner profile." }, { status: 400 });
  if (!("profiles" in parsed.data)) {
    // A page from before there were several children: it only knows the first child.
    const { profile } = parsed.data;
    if (!profile) return Response.json({ ok: true });
    const first = (await getLearnerProfiles(result.user.id))[0];
    const id = profile.id ?? (first?.id as string | undefined);
    await saveLearnerProfiles(result.user.id, [{ ...profile, id }], { keepOthers: true });
    return Response.json({ ok: true });
  }
  const { profiles } = parsed.data;
  if (new Set(profiles.map((p) => p.id).filter(Boolean)).size < profiles.filter((p) => p.id).length)
    return Response.json({ error: "Two children have the same id." }, { status: 400 });
  const saved = await saveLearnerProfiles(result.user.id, profiles);
  return Response.json({ ok: true, ids: saved.map((p) => p.id) });
}
