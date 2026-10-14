import { describe, expect, it } from "vitest";
import {
  answerOf,
  answerOfFact,
  bestKey,
  describeTables,
  factOf,
  MAX_GAMES,
  newTables,
  nextQuestion,
  recordGame,
  SPEEDS,
  tablesOf,
  trickyFacts,
  type TablesGame,
} from "../tables/game";

function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

const game = (over: Partial<TablesGame> = {}): TablesGame => ({
  at: 1,
  tables: [7],
  speed: "medium",
  right: 10,
  asked: 12,
  missed: [],
  ...over,
});

describe("times tables questions", () => {
  it("only asks the chosen tables, from 1 × to 10 ×, never the same twice in a row", () => {
    const random = seeded(7);
    let q = nextQuestion([3, 7], null, random);
    for (let i = 0; i < 500; i++) {
      const next = nextQuestion([3, 7], q, random);
      expect([3, 7]).toContain(next.table);
      expect(next.times).toBeGreaterThanOrEqual(1);
      expect(next.times).toBeLessThanOrEqual(10);
      expect(next.table === q.table && next.times === q.times).toBe(false);
      q = next;
    }
  });

  it("writes and works out each fact", () => {
    const q = { table: 8, times: 7 };
    expect(factOf(q)).toBe("7 × 8");
    expect(answerOf(q)).toBe(56);
    expect(answerOfFact("7 × 8")).toBe(56);
  });

  it("waits 3, 2 or 1 seconds between questions", () => {
    expect([SPEEDS.slow.ms, SPEEDS.medium.ms, SPEEDS.fast.ms]).toEqual([3000, 2000, 1000]);
  });
});

describe("times tables scores", () => {
  it("keeps the best score for each choice of tables and speed", () => {
    let r = recordGame(newTables(), game({ right: 10 }));
    expect(r.newBest).toBe(true);
    r = recordGame(r.record, game({ right: 8 }));
    expect(r.newBest).toBe(false);
    expect(r.best).toBe(10);
    r = recordGame(r.record, game({ right: 9, speed: "fast" }));
    expect(r.newBest).toBe(true);
    expect(r.record.best).toEqual({ [bestKey([7], "medium")]: 10, [bestKey([7], "fast")]: 9 });
    expect(bestKey([7, 3], "slow")).toBe(bestKey([3, 7], "slow"));
    expect(r.record.last).toEqual({ tables: [7], speed: "fast" });
  });

  it("keeps the last 30 games, and old profiles start with none", () => {
    let record = tablesOf({});
    expect(record.last.tables).toHaveLength(9);
    for (let i = 0; i < MAX_GAMES + 5; i++) record = recordGame(record, game({ at: i })).record;
    expect(record.games).toHaveLength(MAX_GAMES);
    expect(record.games[0].at).toBe(5);
  });

  it("finds the facts missed most", () => {
    const record = [game({ missed: ["7 × 8", "6 × 7"] }), game({ missed: ["7 × 8"] })].reduce(
      (r, g) => recordGame(r, g).record,
      newTables(),
    );
    expect(trickyFacts(record)).toEqual(["7 × 8", "6 × 7"]);
  });

  it("names the tables picked", () => {
    expect(describeTables([7])).toBe("the 7s");
    expect(describeTables([5, 2, 3])).toBe("2s, 3s and 5s");
    expect(describeTables([2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe("all tables");
  });
});
