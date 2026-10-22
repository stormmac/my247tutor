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
