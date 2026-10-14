import type { NextRequest } from "next/server";
import { z } from "zod";
import { getLearnerProfiles, MAX_PROFILE_BYTES, saveLearnerProfiles, saveOwnProfile, StoredProfileSchema } from "@/lib/auth/learners";
import { requireUser } from "@/lib/auth/users";
import { MAX_CHILDREN } from "@/lib/learner/model";

/** The signed-in parent's children and their saved progress, or a signed-in child's own. */
export async function GET(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const { user } = result;
  if (user.role === "student" && !(user.parentId && user.learnerId)) return Response.json({ profiles: [], profile: null });
  const profiles = user.role === "student" ? await getLearnerProfiles(user.parentId!, user.learnerId!) : await getLearnerProfiles(user.id);
  return Response.json({ profiles, profile: profiles[0] ?? null });
}

const Ids = z.array(z.uuid()).max(MAX_CHILDREN);

/**
 * `{changed, ids}` saves the child that changed and keeps the children listed (the usual save);
 * `{profiles}` replaces all of them (moving a browser's children into a new account);
 * `{profile}` is the older one-child form.
 */
const SaveSchema = z.union([
  z.object({ changed: StoredProfileSchema.nullable(), ids: Ids }),
  z.object({ profiles: z.array(StoredProfileSchema).max(MAX_CHILDREN) }),
  z.object({ profile: StoredProfileSchema.nullable() }),
]);

export async function PUT(request: NextRequest) {
  const result = await requireUser(request);
  if ("response" in result) return result.response;
  const { user } = result;
  const text = await request.text();
  if (text.length > MAX_PROFILE_BYTES * MAX_CHILDREN) return Response.json({ error: "Too much data." }, { status: 413 });
  let body: unknown = null;
  try {
    body = JSON.parse(text);
  } catch {}
  const parsed = SaveSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "That doesn't look like a learner profile." }, { status: 400 });
  const data = parsed.data;

  if (user.role === "student") {
    // A child can only save their own progress, never add or remove children.
    const own = "changed" in data ? data.changed : "profile" in data ? data.profile : data.profiles[0];
    if (!own || !user.parentId || !user.learnerId) return Response.json({ ok: true });
    if (own.id && own.id !== user.learnerId) return Response.json({ error: "That isn't your profile." }, { status: 403 });
    await saveOwnProfile(user.parentId, user.learnerId, own);
    return Response.json({ ok: true });
  }

  if ("changed" in data) {
    if (data.changed && !(data.changed.id && data.ids.includes(data.changed.id)))
      return Response.json({ error: "The child being saved must be in the list." }, { status: 400 });
    await saveLearnerProfiles(user.id, data.changed ? [data.changed] : [], { keep: data.ids });
    return Response.json({ ok: true });
  }
  if ("profile" in data) {
    // A page from before there were several children: it only knows the first child.
    const { profile } = data;
    if (!profile) return Response.json({ ok: true });
    const first = (await getLearnerProfiles(user.id))[0];
    const id = profile.id ?? (first?.id as string | undefined);
    await saveLearnerProfiles(user.id, [{ ...profile, id }], { keep: "all" });
    return Response.json({ ok: true });
  }
  const { profiles } = data;
  if (new Set(profiles.map((p) => p.id).filter(Boolean)).size < profiles.filter((p) => p.id).length)
    return Response.json({ error: "Two children have the same id." }, { status: 400 });
  const saved = await saveLearnerProfiles(user.id, profiles);
  return Response.json({ ok: true, ids: saved.map((p) => p.id) });
}
