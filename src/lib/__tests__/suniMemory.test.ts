import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CHECKIN_GREAT_SQL, SUNI_NOTES_SQL } from "../auth/suniNotesSchema";
import {
  addGrownUpNotes,
  checkinDue,
  firstName,
  MAX_GROWN_UP_NOTES,
  memoryPrompt,
  MOOD_FACES,
  moodNote,
  moodReply,
  MOODS,
  RATING_MOODS,
} from "../tutor/memory";

describe("Suni's check-in", () => {
  it("calls a child by their first name", () => {
    expect(firstName("Rod")).toBe("Rod");
    expect(firstName("  Rod  Smith ")).toBe("Rod");
  });

  it("rates feelings with five different faces, worst to best", () => {
    expect(RATING_MOODS).toEqual(["sad", "worried", "okay", "happy", "great"]);
    expect(new Set(RATING_MOODS.map((m) => MOOD_FACES[m].face)).size).toBe(5);
    expect(RATING_MOODS.every((m) => MOODS.includes(m))).toBe(true);
  });

  it("keeps the top face with a migration matching the app's schema", () => {
    expect(readFileSync(join(__dirname, "../../../database/026_my247tutor_checkin_great.sql"), "utf8")).toContain(CHECKIN_GREAT_SQL);
    expect(CHECKIN_GREAT_SQL).toContain(`mood IN (${MOODS.map((m) => `'${m}'`).join(", ")})`);
  });

  it("asks at the start of a visit, and at most once every two hours", () => {
    const now = Date.parse("2026-10-22T09:00:00Z");
    expect(checkinDue(null, now)).toBe(true);
    expect(checkinDue(now - 90 * 60_000, now)).toBe(false);
    expect(checkinDue(now - 121 * 60_000, now)).toBe(true);
  });

  it("has a kind answer for every feeling", () => {
    for (const mood of MOODS) expect(moodReply(mood).length).toBeGreaterThan(10);
    expect(moodReply("sad")).toMatch(/grown-up you trust/);
  });

  it("tells grown-ups when a child is worried or sad, and only then", () => {
    expect(moodNote("Ava", "sad")).toEqual({ kind: "feelings", text: "Ava told Suni they were feeling sad when they started." });
    expect(moodNote("Ava", "worried")?.kind).toBe("feelings");
    expect(moodNote("Ava", "happy")).toBeNull();
    expect(moodNote("Ava", "tired")).toBeNull();
  });
});

describe("Suni's notes", () => {
  it("adds new notes for grown-ups, dropping empty ones and keeping the newest", () => {
    const old = Array.from({ length: MAX_GROWN_UP_NOTES }, (_, i) => ({ at: i, kind: "progress" as const, text: `note ${i}` }));
    const next = addGrownUpNotes(
      old,
      [
        { kind: "learning", text: "  Finds fractions tricky.  " },
        { kind: "progress", text: " " },
      ],
      999,
    );
    expect(next).toHaveLength(MAX_GROWN_UP_NOTES);
    expect(next.at(-1)).toEqual({ at: 999, kind: "learning", text: "Finds fractions tricky." });
    expect(next[0].text).toBe("note 1");
  });

  it("tells Suni what it remembers and how today started", () => {
    const prompt = memoryPrompt({ forSuni: "Loves dinosaurs. Number lines help.", today: { mood: "tired", focus: "Maths" } });
    expect(prompt).toContain("Loves dinosaurs. Number lines help.");
    expect(prompt).toContain("they feel tired");
    expect(prompt).toContain("Today they want to work on: Maths");
    expect(memoryPrompt({ forSuni: "  ", today: null })).toBe("");
  });

  it("keeps the database file in step with the app's own copy", () => {
    expect(readFileSync(join(__dirname, "../../../database/021_my247tutor_suni_notes.sql"), "utf8")).toContain(SUNI_NOTES_SQL);
  });
});
