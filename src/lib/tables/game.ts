/**
 * The times tables game: two minutes of questions from the tables the student picked, with a short
 * pause after each answer (slow, medium or fast) before the next question shows.
 */

export const TABLES = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
/** Each table goes from 1 × to 10 ×, as in the NSW syllabus. */
export const MULTIPLIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const GAME_MS = 2 * 60 * 1000;

export type Speed = "slow" | "medium" | "fast";
/** How long the answer stays on screen before the next question. */
export const SPEEDS: Record<Speed, { label: string; ms: number }> = {
  slow: { label: "Slow", ms: 3000 },
  medium: { label: "Medium", ms: 2000 },
  fast: { label: "Fast", ms: 1000 },
};

export interface TablesQuestion {
  /** The number of the table, e.g. 7 in "3 × 7". */
  table: number;
  times: number;
}

export const answerOf = (q: TablesQuestion) => q.table * q.times;
export const factOf = (q: TablesQuestion) => `${q.times} × ${q.table}`;
/** The answer to a fact written by factOf, like "7 × 8". */
export const answerOfFact = (fact: string) => fact.split("×").reduce((product, n) => product * Number(n), 1);

/** A question from the chosen tables, never the same one twice in a row. */
export function nextQuestion(tables: number[], previous: TablesQuestion | null, random: () => number = Math.random): TablesQuestion {
  const pick = <T>(xs: readonly T[]) => xs[Math.floor(random() * xs.length)];
  for (let i = 0; i < 20; i++) {
    const q = { table: pick(tables), times: pick(MULTIPLIERS) };
    if (!previous || q.table !== previous.table || q.times !== previous.times) return q;
  }
  return { table: tables[0], times: previous?.times === 1 ? 2 : 1 };
}

export interface TablesGame {
  at: number;
  tables: number[];
  speed: Speed;
  right: number;
  asked: number;
  /** The facts answered wrongly, like "7 × 8". */
  missed: string[];
}

export interface TablesRecord {
  games: TablesGame[];
  /** Best score for each choice of tables and speed. */
  best: Record<string, number>;
  /** What was picked last time, to start there next time. */
  last: { tables: number[]; speed: Speed };
}

export const MAX_GAMES = 30;

export const newTables = (): TablesRecord => ({ games: [], best: {}, last: { tables: [...TABLES], speed: "medium" } });

export function tablesOf(profile: { tables?: Partial<TablesRecord> }): TablesRecord {
  const t = profile.tables;
  return { ...newTables(), ...(t ?? {}), best: { ...(t?.best ?? {}) }, games: [...(t?.games ?? [])] };
}

export const bestKey = (tables: number[], speed: Speed) => `${[...tables].sort((a, b) => a - b).join(",")}:${speed}`;

/** Saves a finished game. A new best is a higher score than before on the same tables and speed. */
export function recordGame(record: TablesRecord, game: TablesGame): { record: TablesRecord; newBest: boolean; best: number } {
  const key = bestKey(game.tables, game.speed);
  const before = record.best[key] ?? 0;
  const newBest = game.right > before;
  return {
    record: {
      games: [...record.games, game].slice(-MAX_GAMES),
      best: { ...record.best, [key]: Math.max(before, game.right) },
      last: { tables: game.tables, speed: game.speed },
    },
    newBest,
    best: Math.max(before, game.right),
  };
}

/** "the 7s" or "2s, 3s and 5s", or "all tables". */
export function describeTables(tables: number[]): string {
  const sorted = [...tables].sort((a, b) => a - b);
  if (sorted.length === TABLES.length) return "all tables";
  const names = sorted.map((t) => `${t}s`);
  if (names.length === 1) return `the ${names[0]}`;
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/** The facts missed most across recent games, most missed first. */
export function trickyFacts(record: TablesRecord, count = 5): string[] {
  const tally = new Map<string, number>();
  for (const g of record.games.slice(-10)) for (const f of g.missed) tally.set(f, (tally.get(f) ?? 0) + 1);
  return [...tally.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([f]) => f);
}
