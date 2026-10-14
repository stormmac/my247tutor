import "server-only";
import { z } from "zod";
import { db } from "./db";
import { MAX_CHILDREN } from "@/lib/learner/model";

/** Enough checking to keep junk out; the profile's inner details are the app's own data. */
export const StoredProfileSchema = z
  .object({
    version: z.literal(1),
    id: z.uuid().optional(),
    name: z.string().trim().min(1).max(60),
    yearLevel: z.union([z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
  })
  .loose();

export type StoredProfile = z.infer<typeof StoredProfileSchema>;

export const MAX_PROFILE_BYTES = 512 * 1024;

/** Every child on the parent's account, oldest first. Each profile carries its row id as its own id. */
export async function getLearnerProfiles(parentId: string): Promise<Record<string, unknown>[]> {
  const { rows } = await db().query(`SELECT id, profile FROM learners WHERE parent_id = $1 ORDER BY created_at LIMIT ${MAX_CHILDREN}`, [
    parentId,
  ]);
  return rows.map((r) => ({ ...(r.profile as Record<string, unknown>), id: r.id as string }));
}

/**
 * Makes the account hold exactly these children (at most three). Each child's id is their row id,
 * so a save updates the right child and a child left out of the list is deleted.
 * With `keepOthers`, children not in the list are left alone (a page from before there were several children).
 */
export async function saveLearnerProfiles(
  parentId: string,
  profiles: StoredProfile[],
  { keepOthers = false } = {},
): Promise<StoredProfile[]> {
  const withIds = profiles.slice(0, MAX_CHILDREN).map((p) => ({ ...p, id: p.id ?? crypto.randomUUID() }));
  const client = await db().connect();
  try {
    await client.query("BEGIN");
    if (!keepOthers) {
      await client.query(`DELETE FROM learners WHERE parent_id = $1 AND NOT (id = ANY($2::uuid[]))`, [parentId, withIds.map((p) => p.id)]);
    }
    for (const p of withIds) {
      // Another account's id can't be taken over: the update only applies to this parent's row.
      await client.query(
        `INSERT INTO learners (id, parent_id, name, year_level, profile) VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE SET profile = EXCLUDED.profile, name = EXCLUDED.name,
           year_level = EXCLUDED.year_level, updated_at = NOW()
         WHERE learners.parent_id = EXCLUDED.parent_id`,
        [p.id, parentId, p.name, p.yearLevel, JSON.stringify(p)],
      );
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
