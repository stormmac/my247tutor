import "server-only";
import { MAX_PRAISE_PHRASES } from "@/lib/tutor/praise";
import { ready } from "./db";
import { audit } from "./users";

export interface PraisePhrase {
  id: string;
  text: string;
  createdAt: string;
}

/** The phrases admins have added, oldest first. */
export async function listPraise(): Promise<PraisePhrase[]> {
  const { rows } = await (
    await ready()
  ).query(`SELECT id, phrase, created_at FROM praise_phrases ORDER BY created_at LIMIT $1`, [MAX_PRAISE_PHRASES]);
  return rows.map((r) => ({ id: r.id as string, text: r.phrase as string, createdAt: new Date(r.created_at as string).toISOString() }));
}

/** Adds a phrase, unless the list is full or already has it. */
export async function addPraise(adminId: string, text: string): Promise<PraisePhrase | { error: string }> {
  const pool = await ready();
  const existing = await listPraise();
  if (existing.length >= MAX_PRAISE_PHRASES) return { error: `There are already ${MAX_PRAISE_PHRASES} phrases. Remove one first.` };
  if (existing.some((p) => p.text.toLowerCase() === text.toLowerCase())) return { error: "Suni already says that." };
  const { rows } = await pool.query(`INSERT INTO praise_phrases (phrase, created_by) VALUES ($1, $2) RETURNING id, created_at`, [
    text,
    adminId,
  ]);
  const id = rows[0].id as string;
  await audit(adminId, "add_praise", id, { text });
  return { id, text, createdAt: new Date(rows[0].created_at as string).toISOString() };
}

export async function removePraise(adminId: string, id: string): Promise<boolean> {
  const { rows } = await (await ready()).query(`DELETE FROM praise_phrases WHERE id = $1 RETURNING phrase`, [id]);
  if (rows.length) await audit(adminId, "remove_praise", id, { text: rows[0].phrase });
  return rows.length > 0;
}
