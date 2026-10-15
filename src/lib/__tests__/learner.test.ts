import { describe, expect, it } from "vitest";
import { SUBTOPICS } from "../content/tree";
import { MAX_DETAILED_HISTORY, newProfile, outcomeProgress, pickNextSkill, recordAttempt, skillState } from "../learner/model";
import { attemptResult, resultsByTopic } from "../learner/results";

const DAY = 86_400_000;
const T0 = Date.UTC(2027, 1, 1);

function practise(profile: ReturnType<typeof newProfile>, skillId: string, results: boolean[], start = T0) {
  return results.reduce((p, correct, i) => recordAttempt(p, skillId, correct, 0, start + i * 1000), profile);
}

describe("mastery model", () => {
  it("needs several correct answers in a row before a skill counts as mastered", () => {
    let p = newProfile("Ava", 3, T0);
    p = practise(p, "ma2-times-tables", [true, true, true, true]);
    expect(skillState(p, "ma2-times-tables").mastered).toBe(false);
    p = practise(p, "ma2-times-tables", [true]);
    expect(skillState(p, "ma2-times-tables").mastered).toBe(true);
  });

  it("does not count answers found with hints towards the streak", () => {
    let p = newProfile("Ava", 3, T0);
    for (let i = 0; i < 8; i++) p = recordAttempt(p, "ma2-times-tables", true, 2, T0 + i);
    expect(skillState(p, "ma2-times-tables").mastered).toBe(false);
    expect(skillState(p, "ma2-times-tables").streak).toBe(0);
  });

  it("schedules spaced reviews that grow after each successful review", () => {
    let p = practise(newProfile("Ava", 3, T0), "ma2-times-tables", [true, true, true, true, true]);
    const first = skillState(p, "ma2-times-tables");
    expect(first.reviewIntervalDays).toBe(1);
    p = recordAttempt(p, "ma2-times-tables", true, 0, first.nextReview! + 1);
    expect(skillState(p, "ma2-times-tables").reviewIntervalDays).toBe(2);
  });

  it("returns a forgotten skill to regular practice", () => {
    let p = practise(newProfile("Ava", 3, T0), "ma2-times-tables", [true, true, true, true, true]);
    p = practise(p, "ma2-times-tables", [false, false, false], T0 + 2 * DAY);
    expect(skillState(p, "ma2-times-tables").mastered).toBe(false);
  });
});

describe("next-skill picker", () => {
  it("starts a new Year 3 student on a skill with no prerequisites", () => {
    const next = pickNextSkill(newProfile("Ava", 3, T0), "maths", T0)!;
    expect(next.skill.prerequisites).toEqual([]);
    expect(next.reason).toBe("new");
  });

  it("keeps going with a skill already in progress", () => {
    const p = practise(newProfile("Ava", 3, T0), "ma2-times-tables", [true, false]);
    expect(pickNextSkill(p, "maths", T0)!.skill.id).toBe("ma2-times-tables");
  });

  it("puts due reviews first", () => {
    let p = practise(newProfile("Ava", 3, T0), "ma2-times-tables", [true, true, true, true, true]);
    p = practise(p, "ma2-place-value", [true]);
    expect(pickNextSkill(p, "maths", T0 + 2 * DAY)!.reason).toBe("review");
  });

  it("never offers a skill whose prerequisites aren't mastered", () => {
    const p = newProfile("Ava", 3, T0);
    for (let i = 0; i < 3; i++) {
      const next = pickNextSkill(p, "maths", T0)!;
      for (const pre of next.skill.prerequisites) expect(skillState(p, pre).mastered).toBe(true);
    }
  });

  it("keeps a Year 3 student in Stage 2 until Stage 2 is done", () => {
    const p = newProfile("Ava", 3, T0);
    expect(pickNextSkill(p, "maths", T0)!.skill.stage).toBe(2);
  });
});

describe("parent report", () => {
  it("groups skills by NESA outcome", () => {
    const p = practise(newProfile("Ava", 3, T0), "ma2-times-tables", [true, true, true, true, true]);
    const rows = outcomeProgress(p, "maths");
    const mr = rows.find((r) => r.outcome === "MA2-MR-01")!;
    expect(mr.total).toBe(2);
    expect(mr.mastered).toBe(1);
    expect(mr.status).toBe("developing");
  });
});

describe("attempt history for the parents page", () => {
  it("keeps what was asked and answered, and the right answer when it wasn't right first try", () => {
    let p = newProfile("Ava", 3, 0);
    p = recordAttempt(p, "ma2-times-tables", true, 0, 1, { question: "6 × 4 = ?", answer: "24", rightAnswer: "24" });
    p = recordAttempt(p, "ma2-times-tables", false, 1, 2, { question: "7 × 8 = ?", answer: "54", rightAnswer: "56", secondTry: false });
    expect(p.history[0]).toEqual({ skillId: "ma2-times-tables", at: 1, correct: true, hintsUsed: 0, question: "6 × 4 = ?", answer: "24" });
    expect(p.history[1]).toMatchObject({ question: "7 × 8 = ?", answer: "54", rightAnswer: "56" });
    expect(attemptResult(p.history[0])).toBe("first try");
    expect(attemptResult(p.history[1])).toBe("not right");
    expect(attemptResult({ ...p.history[1], secondTry: true })).toBe("second try");
  });

  it("keeps text for recent attempts only, so the saved profile stays small", () => {
    let p = newProfile("Ava", 3, 0);
    for (let i = 0; i < MAX_DETAILED_HISTORY + 5; i++)
      p = recordAttempt(p, "ma2-times-tables", true, 0, i, { question: "x".repeat(500), answer: "1" });
    expect(p.history.filter((h) => h.question !== undefined)).toHaveLength(MAX_DETAILED_HISTORY);
    expect(p.history[0].question).toBeUndefined();
    expect(p.history.at(-1)!.question!.length).toBe(200);
  });

  it("groups results by topic, most recent first, with readable topic names", () => {
    let p = newProfile("Ava", 3, 0);
    p = recordAttempt(p, "ma2-times-tables", true, 0, 1);
    p = recordAttempt(p, "ma2-times-tables", false, 0, 2);
    const sub = SUBTOPICS.find((s) => s.skill_id === null)!;
    p = recordAttempt(p, sub.id, true, 0, 3);
    const results = resultsByTopic(p.history);
    expect(results.map((r) => [r.key, r.answered, r.rightFirstTry])).toEqual([
      [sub.id, 1, 1],
      ["ma2-times-tables", 2, 1],
    ]);
    expect(results[0].topic.title).toBe(sub.title);
    expect(results[0].topic.year).toMatch(/^Year [1-6]$/);
    expect(results[1].topic).toMatchObject({ subject: "Maths", year: "" });
  });
});
