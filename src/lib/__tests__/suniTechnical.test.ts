import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { forGrownUps } = await import("../auth/suniChats");

const chat = {
  id: "1",
  conversationId: "c",
  learnerId: "l",
  studentName: "Rod",
  yearLevel: 5,
  screen: null,
  question: "hello",
  reply: "",
  flag: "technical" as const,
  flagReason: "Suni couldn't answer. 401 response: invalid x-api-key",
  createdAt: "2026-10-22T00:00:00.000Z",
};

describe("technical problems with Suni", () => {
  it("are left out for parents and teachers when Suni didn't answer", () => {
    expect(forGrownUps(chat)).toBeNull();
  });

  it("hide the flag when Suni answered part of it", () => {
    expect(forGrownUps({ ...chat, reply: "Let's look at" })).toMatchObject({ reply: "Let's look at", flag: null, flagReason: null });
  });

  it("leave other flags alone", () => {
    const wellbeing = { ...chat, reply: "Talk to a grown-up you trust.", flag: "wellbeing" as const, flagReason: "Upset" };
    expect(forGrownUps(wellbeing)).toBe(wellbeing);
  });
});

describe("Suni's notes for grown-ups", async () => {
  const { addGrownUpNotes, notesForGrownUps, technicalTalk } = await import("../tutor/memory");
  const { SUNI_ERROR_REPLY } = await import("../tutor/claude");

  it("spot talk of the app or Suni going wrong", () => {
    for (const text of [
      "Rod had some technical difficulties with Suni today.",
      "Suni couldn't answer several of Rod's questions.",
      "Rod's chat kept not responding, so he asked again.",
      "There was an error with the app during the lesson.",
      "Rod saw an error message when he asked for help.",
      "The app crashed while Rod was practising.",
      "Rod couldn't get an answer from Suni about fractions.",
      "A glitch stopped Rod finishing his lesson.",
    ])
      expect(technicalTalk(text), text).toBe(true);
  });

  it("leave learning notes alone", () => {
    for (const text of [
      "Rod keeps making errors when carrying in addition.",
      "Rod loved reading about bugs and built a bug hotel.",
      "Rod wrote a story about a car crash and was proud of it.",
      "Rod found fractions hard but kept going.",
      "Rod told Suni they were feeling worried when they started.",
    ])
      expect(technicalTalk(text), text).toBe(false);
  });

  it("are never kept, and older ones are hidden", () => {
    const notes = addGrownUpNotes(
      [],
      [
        { kind: "concern", text: "Suni couldn't answer Rod's questions because of a technical problem." },
        { kind: "learning", text: "Rod is finding subtraction hard." },
      ],
    );
    expect(notes.map((n) => n.text)).toEqual(["Rod is finding subtraction hard."]);
    const old = [{ at: 1, kind: "concern" as const, text: "The app had an error during Rod's lesson." }, ...notes];
    expect(notesForGrownUps(old)).toEqual(notes);
  });

  it("chats lose Suni's trouble messages, and drop out when that was all", () => {
    const plain = { ...chat, flag: null, flagReason: null };
    expect(forGrownUps({ ...plain, reply: SUNI_ERROR_REPLY })).toBeNull();
    expect(forGrownUps({ ...plain, reply: `Let's look at\n\n${SUNI_ERROR_REPLY}` })).toMatchObject({ reply: "Let's look at" });
    expect(forGrownUps({ ...plain, reply: "Hi!", flag: "grown_up", flagReason: "Suni couldn't answer." })).toMatchObject({
      flag: null,
      flagReason: null,
    });
  });
});
