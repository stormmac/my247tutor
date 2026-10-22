import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { describeStep } from "../../components/LessonRunner";
import { screenForPath } from "../../components/SuniCompanion";
import { SUNI_CHAT_SQL } from "../auth/suniChatSchema";
import { buildLesson } from "../phonics/progress";
import { UNITS } from "../phonics/sequence";
import { buildContextPrompt, TUTOR_SYSTEM_PROMPT, TutorContextSchema } from "../tutor/prompt";

const base = { studentName: "Ava", yearLevel: 4 as const, skillId: "general" };

describe("Suni follows what's on screen", () => {
  it("tells Suni what the student is looking at", () => {
    const prompt = buildContextPrompt({ ...base, screen: "Weekly lesson, part 2 (Fractions), question 4 of 10." });
    expect(prompt).toContain("On the student's screen now: Weekly lesson, part 2 (Fractions), question 4 of 10.");
    expect(TUTOR_SYSTEM_PROMPT).toMatch(/what is on the student's screen/);
  });

  it("gives no hints during a check, test or timed game", () => {
    expect(buildContextPrompt({ ...base, screen: "The starting check.", noHelp: true })).toMatch(/Do not give hints, answers/);
    expect(buildContextPrompt({ ...base, screen: "The topics list." })).not.toMatch(/Do not give hints/);
  });

  it("keeps the screen description short enough to send", () => {
    expect(TutorContextSchema.safeParse({ ...base, screen: "x".repeat(1501) }).success).toBe(false);
  });

  it("describes pages that don't describe themselves", () => {
    expect(screenForPath("/learn")).toMatch(/Student page/);
    expect(screenForPath("/learn/english/topics")).toMatch(/English/);
    expect(screenForPath("/learn/maths")).toMatch(/maths/);
    expect(screenForPath("/learn/writing")).toMatch(/writing/);
    expect(screenForPath("/read/sounds")).toMatch(/Learn to Read/);
    expect(screenForPath("/somewhere-else")).toBe("A my247tutor page.");
  });

  it("describes each Learn to Read step, keeping the answer back until it's answered", () => {
    const steps = buildLesson(UNITS[0].id, () => 0.3);
    for (const step of steps) {
      expect(describeStep(step, false).length).toBeGreaterThan(10);
      if (step.kind === "find" || step.kind === "picture" || step.kind === "listen" || step.kind === "gap") {
        expect(describeStep(step, false)).toMatch(/don't tell them/);
        expect(describeStep(step, true)).toMatch(/you can talk about it/);
      }
    }
  });
});

describe("Suni's conversation records", () => {
  it("has a database migration matching the app's schema", () => {
    const sql = readFileSync(join(__dirname, "../../../database/014_my247tutor_suni_chats.sql"), "utf8");
    expect(sql).toContain(SUNI_CHAT_SQL.trim());
  });

  it("only allows the known flags", () => {
    expect(SUNI_CHAT_SQL).toMatch(/flag IN \('wellbeing', 'inappropriate', 'personal_info', 'grown_up'\)/);
  });
});
