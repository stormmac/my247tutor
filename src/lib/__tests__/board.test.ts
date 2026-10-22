import { describe, expect, it } from "vitest";
import { splitBoard, wantsHelp } from "../tutor/board";

describe("whiteboard", () => {
  it("takes Suni's board lines out of the chat", () => {
    expect(splitBoard("Let's do it together!\n<board>\n24 + 18\n= 20 + 10 + 4 + 8\n</board>\nWhat's 4 + 8?")).toEqual({
      say: "Let's do it together!\n\nWhat's 4 + 8?",
      board: ["24 + 18", "= 20 + 10 + 4 + 8"],
    });
  });

  it("hides a board block that is still arriving", () => {
    expect(splitBoard("Look at this.\n<board>\n3 × 4")).toEqual({ say: "Look at this.", board: ["3 × 4"] });
  });

  it("leaves a reply without a board alone", () => {
    expect(splitBoard("Great job!")).toEqual({ say: "Great job!", board: [] });
  });

  it("opens the board when a student asks for help", () => {
    for (const m of ["Can you help me?", "I'm stuck", "how do I do this", "I don't get it", "explain fractions"])
      expect(wantsHelp(m)).toBe(true);
    for (const m of ["hello", "I got it!", "what's your name"]) expect(wantsHelp(m)).toBe(false);
  });
});
