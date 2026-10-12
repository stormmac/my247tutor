import { describe, expect, it } from "vitest";
import { newProfile, outcomeProgress, pickNextSkill, recordAttempt, skillState } from "../learner/model";
import { applyPlacement, MAX_PROBES, nextProbe, placementDone, recordProbe, startPlacement } from "../learner/placement";

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

describe("placement", () => {
  it("finishes within the probe limit", () => {
    let s = startPlacement("maths");
    while (!placementDone(s)) s = recordProbe(s, true);
    expect(s.probes.length).toBeLessThanOrEqual(MAX_PROBES);
  });

  it("places a student who gets everything right past the earlier skills", () => {
    let s = startPlacement("maths");
    while (!placementDone(s)) s = recordProbe(s, true);
    const p = applyPlacement(newProfile("Leo", 6, T0), s, T0);
    expect(skillState(p, s.order[0]).mastered).toBe(true);
    expect(skillState(p, s.order[0]).placed).toBe(true);
    expect(p.placementDone.maths).toBe(true);
  });

  it("places nothing when every probe is wrong", () => {
    let s = startPlacement("english");
    while (!placementDone(s)) s = recordProbe(s, false);
    const p = applyPlacement(newProfile("Leo", 3, T0), s, T0);
    expect(Object.values(p.skills).filter((x) => x.mastered)).toHaveLength(0);
  });

  it("probes the middle of the range first", () => {
    const s = startPlacement("maths");
    expect(nextProbe(s)).toBe(s.order[Math.floor((s.order.length - 1) / 2)]);
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
