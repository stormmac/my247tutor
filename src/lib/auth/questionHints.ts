import "server-only";
import { createHash } from "node:crypto";
import { ready } from "./db";
import type { HintRequest } from "../tutor/hints";

/** Which written hints a question gets: the same question, answer and English always get the same ones. */
export function hintKey(req: HintRequest): string {
  const question = [req.curriculum ?? "nsw", req.prompt, req.choices ?? [], req.correctAnswer, req.passage ?? "", req.picture ?? ""];
  return createHash("sha256").update(JSON.stringify(question)).digest("hex");
}

export async function cachedHints(key: string): Promise<string[] | null> {
  const { rows } = await (await ready()).query(`SELECT hints FROM question_hints WHERE question_key = $1`, [key]);
  return (rows[0]?.hints as string[] | undefined) ?? null;
}

export async function cacheHints(key: string, hints: string[]) {
  await (
    await ready()
  ).query(`INSERT INTO question_hints (question_key, hints) VALUES ($1, $2) ON CONFLICT (question_key) DO NOTHING`, [
    key,
    JSON.stringify(hints),
  ]);
}
