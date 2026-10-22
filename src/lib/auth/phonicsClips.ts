import "server-only";
import { ready } from "./db";
import { audit } from "./users";

export interface ClipInfo {
  ipa: string;
  /** When it was recorded, in milliseconds: part of the clip's address, so a new recording isn't hidden by the cache. */
  version: number;
}

/** The sounds that have a recording. */
export async function listClips(): Promise<ClipInfo[]> {
  const { rows } = await (await ready()).query(`SELECT ipa, updated_at FROM phonics_clips ORDER BY ipa`);
  return rows.map((r) => ({ ipa: r.ipa as string, version: new Date(r.updated_at as string).getTime() }));
}

export async function getClip(ipa: string): Promise<{ mime: string; audio: Buffer } | null> {
  const { rows } = await (await ready()).query(`SELECT mime, audio FROM phonics_clips WHERE ipa = $1`, [ipa]);
  return rows.length ? { mime: rows[0].mime as string, audio: rows[0].audio as Buffer } : null;
}

/** Saves a recording, replacing any earlier one of the same sound. */
export async function saveClip(adminId: string, ipa: string, mime: string, audio: Buffer): Promise<ClipInfo> {
  const { rows } = await (
    await ready()
  ).query(
    `INSERT INTO phonics_clips (ipa, mime, audio, updated_by) VALUES ($1, $2, $3, $4)
     ON CONFLICT (ipa) DO UPDATE SET mime = EXCLUDED.mime, audio = EXCLUDED.audio, updated_by = EXCLUDED.updated_by, updated_at = NOW()
     RETURNING updated_at`,
    [ipa, mime, audio, adminId],
  );
  await audit(adminId, "record_sound", adminId, { ipa, bytes: audio.length });
  return { ipa, version: new Date(rows[0].updated_at as string).getTime() };
}

export async function removeClip(adminId: string, ipa: string): Promise<boolean> {
  const { rowCount } = await (await ready()).query(`DELETE FROM phonics_clips WHERE ipa = $1`, [ipa]);
  if (rowCount) await audit(adminId, "remove_sound", adminId, { ipa });
  return Boolean(rowCount);
}
