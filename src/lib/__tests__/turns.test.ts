import { describe, expect, it } from "vitest";
import { chatTurns, MAX_TURN_LENGTH } from "../tutor/turns";

describe("chatTurns", () => {
  it("starts with the student", () => {
    expect(
      chatTurns([
        { role: "assistant", content: "Hi!" },
        { role: "user", content: "How are you?" },
      ]),
    ).toEqual([{ role: "user", content: "How are you?" }]);
  });

  it("joins back-to-back messages from the same side", () => {
    expect(
      chatTurns([
        { role: "user", content: "How are you?" },
        { role: "user", content: "Hello?" },
        { role: "assistant", content: "I'm buzzing!" },
      ]),
    ).toEqual([
      { role: "user", content: "How are you?\n\nHello?" },
      { role: "assistant", content: "I'm buzzing!" },
    ]);
  });

  it("drops blank turns and shortens long ones", () => {
    const turns = chatTurns([
      { role: "user", content: "Hi" },
      { role: "assistant", content: "  " },
      { role: "assistant", content: "x".repeat(MAX_TURN_LENGTH + 50) },
      { role: "user", content: "Thanks" },
    ]);
    expect(turns.map((t) => t.role)).toEqual(["user", "assistant", "user"]);
    expect(turns[1].content).toHaveLength(MAX_TURN_LENGTH);
  });
});
