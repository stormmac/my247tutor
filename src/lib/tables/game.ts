/**
 * The times tables game: one or two minutes of questions from the tables the student picked, with
 * a short pause after each answer (slow, medium or fast) before the next question shows.
 */

export const TABLES = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
/** Each table goes from 1 × to 10 ×, as in the NSW syllabus. */
export const MULTIPLIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/** How long a game can last, in minutes. */
export const GAME_MINUTES = [1, 2] as const;
export type Minutes = (typeof GAME_MINUTES)[number];
/** Games saved before there was a choice were two minutes. */
export const minutesOf = (game: { minutes?: Minutes }): Minutes => game.minutes ?? 2;
export const gameMs = (minutes: Minutes) => minutes * 60 * 1000;

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
  /** How long it lasted. Missing on games from before there was a choice, which were two minutes. */
  minutes?: Minutes;
  right: number;
  asked: number;
  /** The facts answered wrongly, like "7 × 8". */
  missed: string[];
}

export interface TablesRecord {
  games: TablesGame[];
  /** Best score for each choice of tables, speed and length. */
  best: Record<string, number>;
  /** What was picked last time, to start there next time. */
  last: { tables: number[]; speed: Speed; minutes?: Minutes };
}

export const MAX_GAMES = 30;

export const newTables = (): TablesRecord => ({ games: [], best: {}, last: { tables: [...TABLES], speed: "medium" } });

export function tablesOf(profile: { tables?: Partial<TablesRecord> }): TablesRecord {
  const t = profile.tables;
  return { ...newTables(), ...(t ?? {}), best: { ...(t?.best ?? {}) }, games: [...(t?.games ?? [])] };
}

/** Where a best score is kept. Two-minute games keep the key they had before there was a choice. */
export const bestKey = (tables: number[], speed: Speed, minutes: Minutes = 2) =>
  `${[...tables].sort((a, b) => a - b).join(",")}:${speed}${minutes === 2 ? "" : `:${minutes}m`}`;

/** The tables, speed and length a best score is for, from its key. */
export function parseBestKey(key: string): { tables: number[]; speed: Speed; minutes: Minutes } | null {
  const [tables, speed, minutes] = key.split(":");
  if (!tables || !(speed in SPEEDS)) return null;
  return { tables: tables.split(",").map(Number), speed: speed as Speed, minutes: minutes === "1m" ? 1 : 2 };
}

/** Saves a finished game. A new best is a higher score than before on the same tables, speed and length. */
export function recordGame(record: TablesRecord, game: TablesGame): { record: TablesRecord; newBest: boolean; best: number } {
  const key = bestKey(game.tables, game.speed, minutesOf(game));
  const before = record.best[key] ?? 0;
  const newBest = game.right > before;
  return {
    record: {
      games: [...record.games, game].slice(-MAX_GAMES),
      best: { ...record.best, [key]: Math.max(before, game.right) },
      last: { tables: game.tables, speed: game.speed, minutes: minutesOf(game) },
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

/** A row of the best scores table: one choice of tables, and the best at each speed. */
export interface BestRow {
  tables: number[];
  best: Partial<Record<Speed, number>>;
}

/**
 * The best scores for games of this length: a row for each single table, then each mix of tables
 * played, with the best at each speed.
 */
export function bestScores(record: TablesRecord, minutes: Minutes): BestRow[] {
  const rows = new Map<string, BestRow>(TABLES.map((t) => [String(t), { tables: [t], best: {} }]));
  for (const [key, score] of Object.entries(record.best)) {
    const parsed = parseBestKey(key);
    if (!parsed || parsed.minutes !== minutes || !score) continue;
    const id = parsed.tables.join(",");
    const row = rows.get(id) ?? { tables: parsed.tables, best: {} };
    row.best[parsed.speed] = Math.max(row.best[parsed.speed] ?? 0, score);
    rows.set(id, row);
  }
  const single = [...rows.values()].filter((r) => r.tables.length === 1);
  const mixed = [...rows.values()].filter((r) => r.tables.length > 1).sort((a, b) => b.tables.length - a.tables.length);
  return [...single, ...mixed];
}
