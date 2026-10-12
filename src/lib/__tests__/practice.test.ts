import { describe, expect, it } from "vitest";
import { SKILLS } from "../curriculum/skills";
import { OUTCOMES } from "../curriculum/outcomes";
import { answerText, checkAnswer, generateQuestion } from "../practice";
import { parseFraction, parseNumber, parseRemainder } from "../practice/checker";
import { formatNumber } from "../practice/format";
import { PASSAGES, WORDWORK, WRITING_TASKS } from "../english/bank";

const SEEDS = Array.from({ length: 300 }, (_, i) => i * 7919 + 1);

describe("curriculum graph", () => {
  it("links every skill to a known outcome and known prerequisites", () => {
    const ids = new Set(SKILLS.map((s) => s.id));
    const codes = new Set(OUTCOMES.map((o) => o.code));
    for (const skill of SKILLS) {
      expect(codes.has(skill.outcome), skill.id).toBe(true);
      for (const p of skill.prerequisites) expect(ids.has(p), `${skill.id} → ${p}`).toBe(true);
    }
  });

  it("has no prerequisite cycles", () => {
    const byId = new Map(SKILLS.map((s) => [s.id, s]));
    const visit = (id: string, path: string[]): void => {
      expect(path.includes(id), [...path, id].join(" → ")).toBe(false);
      for (const p of byId.get(id)!.prerequisites) visit(p, [...path, id]);
    };
    for (const s of SKILLS) visit(s.id, []);
  });

  it("has practice content for every skill", () => {
    for (const skill of SKILLS) {
      if (skill.practice === "writing") expect(WRITING_TASKS[skill.id]?.length, skill.id).toBeGreaterThan(0);
      else expect(() => generateQuestion(skill.id, 1), skill.id).not.toThrow();
    }
  });
});

describe("question generators", () => {
  const autoMarked = SKILLS.filter((s) => s.practice !== "writing");

  it.each(autoMarked.map((s) => s.id))("%s: the stored answer marks as correct across many seeds", (skillId) => {
    for (const seed of SEEDS) {
      const q = generateQuestion(skillId, seed);
      const input = q.answer.kind === "choice" ? String(q.answer.index) : answerText(q.answer);
      expect(checkAnswer(q.answer, input).correct, `${q.prompt} → ${input}`).toBe(true);
      expect(q.hints.length).toBeGreaterThanOrEqual(2);
      expect(q.prompt).not.toMatch(/undefined|NaN/);
      expect(q.solution).not.toMatch(/undefined|NaN/);
      if (q.choices) expect(new Set(q.choices).size, q.prompt).toBe(q.choices.length);
    }
  });

  it("is reproducible for the same seed", () => {
    expect(generateQuestion("ma3-multiply", 42)).toEqual(generateQuestion("ma3-multiply", 42));
  });

  it("produces whole-number answers where students expect them", () => {
    for (const seed of SEEDS) {
      for (const id of [
        "ma2-times-tables",
        "ma2-division-facts",
        "ma2-missing-factor",
        "ma3-fraction-of-quantity",
        "ma3-order-of-operations",
      ]) {
        const q = generateQuestion(id, seed);
        if (q.answer.kind === "number") expect(Number.isInteger(q.answer.value), q.prompt).toBe(true);
      }
    }
  });
});

describe("answer checker", () => {
  it("accepts NSW and everyday number formats", () => {
    expect(parseNumber("12 450")).toBe(12450);
    expect(parseNumber("12\u00a0450")).toBe(12450);
    expect(parseNumber("12,450")).toBe(12450);
    expect(parseNumber("$7.50")).toBe(7.5);
    expect(parseNumber(".5")).toBe(0.5);
    expect(parseNumber("3/4")).toBe(0.75);
    expect(parseNumber("seven")).toBeNull();
  });

  it("treats 0.5 and 0.50 as the same number", () => {
    expect(checkAnswer({ kind: "number", value: 0.5 }, "0.50").correct).toBe(true);
  });

  it("accepts equivalent fractions and mixed numbers", () => {
    expect(parseFraction("1 1/4")).toEqual({ num: 5, den: 4 });
    expect(checkAnswer({ kind: "fraction", num: 5, den: 4 }, "1 1/4").correct).toBe(true);
    expect(checkAnswer({ kind: "fraction", num: 2, den: 4 }, "1/2").correct).toBe(true);
    expect(checkAnswer({ kind: "fraction", num: 2, den: 4 }, "3/4").correct).toBe(false);
  });

  it("asks for the simplest form only when the question requires it", () => {
    const result = checkAnswer({ kind: "fraction", num: 1, den: 2, requireSimplest: true }, "2/4");
    expect(result.correct).toBe(false);
    expect(result.feedback).toMatch(/simplify/);
  });

  it("reads remainders written different ways", () => {
    expect(parseRemainder("45 r 3")).toEqual({ quotient: 45, remainder: 3 });
    expect(parseRemainder("45R3")).toEqual({ quotient: 45, remainder: 3 });
    expect(parseRemainder("45 remainder 3")).toEqual({ quotient: 45, remainder: 3 });
    const forgot = checkAnswer({ kind: "remainder", quotient: 45, remainder: 3 }, "45");
    expect(forgot.correct).toBe(false);
    expect(forgot.feedback).toMatch(/left over/);
  });

  it("rejects empty and unreadable answers with a helpful message", () => {
    expect(checkAnswer({ kind: "number", value: 4 }, " ").feedback).toBeTruthy();
    expect(checkAnswer({ kind: "number", value: 4 }, "four").feedback).toBeTruthy();
  });
});

describe("number formatting", () => {
  it("follows NSW style: no space for four digits, spaces from five", () => {
    expect(formatNumber(4723)).toBe("4723");
    expect(formatNumber(12450)).toBe("12\u00a0450");
    expect(formatNumber(1234567)).toBe("1\u00a0234\u00a0567");
  });
});

describe("English content", () => {
  it("never repeats the correct option among the wrong ones", () => {
    for (const items of Object.values(WORDWORK)) for (const item of items) expect(item.wrong).not.toContain(item.correct);
    for (const passages of Object.values(PASSAGES))
      for (const p of passages) for (const q of p.questions) expect(q.wrong).not.toContain(q.correct);
  });
});
