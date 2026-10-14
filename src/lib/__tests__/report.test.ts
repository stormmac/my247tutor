import { describe, expect, it } from "vitest";
import { getSkill, skillsFor } from "../curriculum/skills";
import { newProfile, recordAttempt, type LearnerProfile } from "../learner/model";
import { competency, recommendedPlan, subjectLevel } from "../learner/report";

const T0 = Date.UTC(2027, 1, 1);

function practise(profile: LearnerProfile, skillId: string, results: boolean[]) {
  return results.reduce((p, correct, i) => recordAttempt(p, skillId, correct, 0, T0 + i * 1000), profile);
}

function masterAll(profile: LearnerProfile, stage: 2 | 3) {
  return skillsFor("maths")
    .filter((s) => s.stage === stage)
    .reduce((p, s) => practise(p, s.id, [true, true, true, true, true]), profile);
}

describe("parent report", () => {
  it("describes competency in each skill", () => {
    let p = newProfile("Ava", 4, T0);
    const skill = getSkill("ma2-times-tables");
    expect(competency(p, skill)).toBe("not started");
    p = practise(p, skill.id, [false, false]);
    expect(competency(p, skill)).toBe("beginning");
    p = practise(p, skill.id, [true, true, true]);
    expect(competency(p, skill)).toBe("developing");
    p = practise(p, skill.id, [true, true]);
    expect(competency(p, skill)).toBe("mastered");
  });

  it("judges writing by the latest piece's criteria", () => {
    const skill = getSkill("en2-imaginative");
    const p = newProfile("Ava", 4, T0);
    const write = (levels: Record<string, string>) => ({ ...p, writing: [{ skillId: skill.id, at: T0, summary: "", levels }] });
    expect(competency(write({ ideas: "secure", structure: "secure" }), skill)).toBe("competent");
    expect(competency(write({ ideas: "secure", structure: "beginning" }), skill)).toBe("beginning");
    expect(competency(write({ ideas: "secure", structure: "developing" }), skill)).toBe("developing");
  });

  it("places the student against their school year", () => {
    const fresh = newProfile("Ava", 5, T0);
    expect(subjectLevel(fresh, "maths").standing).toBe("not enough evidence");

    const stage2Done = masterAll(fresh, 2);
    const level = subjectLevel(stage2Done, "maths");
    expect(level.workingAtYear).toBe(5);
    expect(level.standing).toBe("on track");
    expect(level.stages[0]).toMatchObject({ secure: level.stages[0].total });

    expect(subjectLevel({ ...stage2Done, yearLevel: 3 }, "maths").standing).toBe("ahead");
    const all = masterAll(stage2Done, 3);
    expect(subjectLevel(all, "maths").beyondYear6).toBe(true);

    const struggling = practise(newProfile("Ava", 6, T0), "ma2-place-value", Array(10).fill(false));
    expect(subjectLevel(struggling, "maths")).toMatchObject({ workingAtYear: 3, standing: "needs support" });
  });

  it("recommends next steps, putting struggling skills first", () => {
    let p = newProfile("Ava", 3, T0);
    expect(recommendedPlan(p, "maths")[0]).toMatchObject({ reason: "new", skill: { id: "ma2-place-value" } });

    p = practise(p, "ma2-place-value", [true, true, true, true, true]);
    p = practise(p, "ma2-add-sub", [false, false, true, false, false, false]);
    const plan = recommendedPlan(p, "maths");
    expect(plan[0]).toMatchObject({ reason: "support", skill: { id: "ma2-add-sub" } });
    expect(plan.length).toBe(4);
    expect(new Set(plan.map((s) => s.skill.id)).size).toBe(4);
  });
});

describe("recommended plan reviews", () => {
  it("uses only one step for reviews that are due", () => {
    let p = newProfile("Ava", 3, T0);
    for (const id of ["ma2-place-value", "ma2-add-sub", "ma2-missing-addend"]) p = practise(p, id, [true, true, true, true, true]);
    const plan = recommendedPlan(p, "maths", 4, T0 + 3 * 86_400_000);
    expect(plan.filter((s) => s.reason === "review")).toHaveLength(1);
    expect(plan[0].why).toContain("2 other skills are also due");
    expect(plan).toHaveLength(4);
  });
});
