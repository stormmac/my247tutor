import "server-only";
import { z } from "zod";
import { ready } from "./db";
import { type Curriculum, isCurriculum } from "@/lib/curriculum/curricula";
import { MAX_CHILDREN } from "@/lib/learner/model";

/** Enough checking to keep junk out; the profile's inner details are the app's own data. */
export const StoredProfileSchema = z
  .object({
    version: z.literal(1),
    id: z.uuid().optional(),
    name: z.string().trim().min(1).max(60),
    yearLevel: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8)]),
    // Only used when the child is first saved (see saveLearnerProfiles).
    curriculum: z.unknown().optional(),
  })
  .loose();

export type StoredProfile = z.infer<typeof StoredProfileSchema>;

export const MAX_PROFILE_BYTES = 512 * 1024;

/**
 * A child's curriculum, in SQL over `learners l`: their own when it's set, otherwise their parent's
 * or centre's default, otherwise NSW. The account decides it, so a browser's copy can't undo Admin's choice.
 */
export const CHILD_CURRICULUM = `COALESCE(l.curriculum, (SELECT o.curriculum FROM users o WHERE o.id = l.parent_id), 'nsw')`;

/** Every child on the parent's account, oldest first. Each profile carries its row id as its own id, and its curriculum. */
export async function getLearnerProfiles(parentId: string, onlyId?: string): Promise<Record<string, unknown>[]> {
  const { rows } = await (
    await ready()
  ).query(
    `SELECT l.id, l.profile, ${CHILD_CURRICULUM} AS curriculum FROM learners l
     WHERE l.parent_id = $1 AND ($2::uuid IS NULL OR l.id = $2) ORDER BY l.created_at LIMIT ${MAX_CHILDREN}`,
    [parentId, onlyId ?? null],
  );
  return rows.map((r) => ({ ...(r.profile as Record<string, unknown>), id: r.id as string, curriculum: r.curriculum as string }));
}

/**
 * Saves these children to the parent's account. Each child's id is their row id, so a save updates
 * the right child. `keep` says which other children stay: by default only the ones saved here (the
 * rest are deleted), a list of ids to keep, or "all" to delete nobody.
 */
export async function saveLearnerProfiles(
  parentId: string,
  profiles: StoredProfile[],
  { keep }: { keep?: string[] | "all" } = {},
): Promise<StoredProfile[]> {
  const withIds = profiles.slice(0, MAX_CHILDREN).map((p) => ({ ...p, id: p.id ?? crypto.randomUUID() }));
  const client = await (await ready()).connect();
  try {
    await client.query("BEGIN");
    if (keep !== "all") {
      await client.query(`DELETE FROM learners WHERE parent_id = $1 AND NOT (id = ANY($2::uuid[]))`, [
        parentId,
        [...withIds.map((p) => p.id), ...(keep ?? [])],
      ]);
    }
    for (const p of withIds) {
      // Another account's id can't be taken over: the update only applies to this parent's row.
      // The curriculum chosen when the child is set up is kept; after that only Admin changes it.
      await client.query(
        `INSERT INTO learners (id, parent_id, name, year_level, profile, curriculum) VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET profile = EXCLUDED.profile, name = EXCLUDED.name,
           year_level = EXCLUDED.year_level, updated_at = NOW()
         WHERE learners.parent_id = EXCLUDED.parent_id`,
        [p.id, parentId, p.name, p.yearLevel, JSON.stringify(p), isCurriculum(p.curriculum) ? p.curriculum : null],
      );
    }
    // A child's own sign-in greets them by the name their parent gave them.
    for (const p of withIds) {
      await client.query(`UPDATE users SET display_name = $3 WHERE learner_id = $1 AND parent_id = $2 AND display_name <> $3`, [
        p.id,
        parentId,
        p.name,
      ]);
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
  return withIds;
}

/** A child signed in on their own saves their progress. It can only ever change their own profile. */
export async function saveOwnProfile(parentId: string, learnerId: string, profile: StoredProfile): Promise<boolean> {
  const { rowCount } = await (
    await ready()
  ).query(`UPDATE learners SET profile = $3, name = $4, year_level = $5, updated_at = NOW() WHERE id = $2 AND parent_id = $1`, [
    parentId,
    learnerId,
    JSON.stringify({ ...profile, id: learnerId }),
    profile.name,
    profile.yearLevel,
  ]);
  return Boolean(rowCount);
}

/** Admin sets one child's curriculum. */
export async function setLearnerCurriculum(learnerId: string, curriculum: Curriculum): Promise<boolean> {
  const { rowCount } = await (
    await ready()
  ).query(`UPDATE learners SET curriculum = $2, updated_at = NOW() WHERE id = $1`, [learnerId, curriculum]);
  return Boolean(rowCount);
}

/** Admin sets a parent's or centre's curriculum: the default for new children, and every child they have now. */
export async function setOwnerCurriculum(ownerId: string, curriculum: Curriculum): Promise<boolean> {
  const client = await (await ready()).connect();
  try {
    await client.query("BEGIN");
    const { rowCount } = await client.query(
      `UPDATE users SET curriculum = $2, updated_at = NOW() WHERE id = $1 AND role IN ('parent', 'centre')`,
      [ownerId, curriculum],
    );
    if (rowCount) await client.query(`UPDATE learners SET curriculum = $2, updated_at = NOW() WHERE parent_id = $1`, [ownerId, curriculum]);
    await client.query("COMMIT");
    return Boolean(rowCount);
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}
