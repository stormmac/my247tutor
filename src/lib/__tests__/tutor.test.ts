import { describe, expect, it } from "vitest";
import { hasWellbeingConcern, redactPersonalInfo } from "../tutor/safety";
import { buildContextPrompt } from "../tutor/prompt";

describe("wellbeing check", () => {
  it.each(["i want to hurt myself", "Nobody loves me", "I'm being bullied at school", "my brother hits me", "I don't want to be alive"])(
    "flags: %s",
    (msg) => expect(hasWellbeingConcern(msg)).toBe(true),
  );

  it.each(["what is 7 times 8", "this question is killing me lol", "the bully in the story was mean", "can you help me with fractions"])(
    "does not flag ordinary learning chat: %s",
    (msg) => expect(hasWellbeingConcern(msg)).toBe(false),
  );
});

describe("personal information", () => {
  it("removes phone numbers, emails and street addresses", () => {
    const { text, found } = redactPersonalInfo("call me on 0412 345 678 or mia@example.com, I live at 12 Wattle Street");
    expect(text).not.toMatch(/0412|example\.com|12 Wattle/);
    expect(found).toEqual(["phone number", "email address", "street address"]);
  });

  it("leaves maths alone", () => {
    expect(redactPersonalInfo("is 4723 + 1000 = 5723").found).toEqual([]);
  });
});

describe("tutor context", () => {
  const base = { studentName: "Ava", yearLevel: 4 as const, skillId: "ma2-times-tables" };

  it("names the skill and its NESA outcome", () => {
    const prompt = buildContextPrompt(base);
    expect(prompt).toContain("Times tables to 10 × 10");
    expect(prompt).toContain("MA2-MR-01");
  });

  it("tells the tutor not to reveal an unanswered question's answer", () => {
    const prompt = buildContextPrompt({ ...base, question: { prompt: "7 × 8 = ?", correctAnswer: "56", answered: false, hintsShown: 1 } });
    expect(prompt).toMatch(/NOT answered yet, so do not reveal it/);
  });

  it("allows a full explanation once the student has answered", () => {
    const prompt = buildContextPrompt({ ...base, question: { prompt: "7 × 8 = ?", correctAnswer: "56", answered: true, hintsShown: 0 } });
    expect(prompt).toMatch(/may now explain it fully/);
  });
});
