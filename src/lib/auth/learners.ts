import "server-only";
import { z } from "zod";
import { db } from "./db";

/** Enough checking to keep junk out; the profile's inner details are the app's own data. */
export const StoredProfileSchema = z
  .object({
    version: z.literal(1),
    name: z.string().trim().min(1).max(60),
    yearLevel: z.union([z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
  })
  .loose();

export const MAX_PROFILE_BYTES = 512 * 1024;

/** The parent's learner profile. One child per account for now. */
export async function getLearnerProfile(parentId: string): Promise<{ profile: unknown; updatedAt: string } | null> {
  const { rows } = await db().query(`SELECT profile, updated_at FROM learners WHERE parent_id = $1 ORDER BY created_at LIMIT 1`, [
    parentId,
  ]);
  return rows[0] ? { profile: rows[0].profile, updatedAt: new Date(rows[0].updated_at).toISOString() } : null;
}

export async function saveLearnerProfile(parentId: string, profile: z.infer<typeof StoredProfileSchema> | null): Promise<void> {
  if (!profile) {
    await db().query(`DELETE FROM learners WHERE parent_id = $1`, [parentId]);
    return;
  }
  const json = JSON.stringify(profile);
  const updated = await db().query(
    `UPDATE learners SET profile = $2, name = $3, year_level = $4, updated_at = NOW()
     WHERE id = (SELECT id FROM learners WHERE parent_id = $1 ORDER BY created_at LIMIT 1)`,
    [parentId, json, profile.name, profile.yearLevel],
  );
  if (!updated.rowCount) {
    await db().query(`INSERT INTO learners (parent_id, name, year_level, profile) VALUES ($1, $3, $4, $2)`, [
      parentId,
      json,
      profile.name,
      profile.yearLevel,
    ]);
  }
}
