import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PRAISE_SQL } from "../auth/praiseSchema";
import { cleanPraise, DEFAULT_PRAISE, MAX_PRAISE_LENGTH, pickPraise, praiseLine } from "../tutor/praise";

describe("what Suni says after a right answer", () => {
  it("has the phrases Storm asked for", () => {
    expect(DEFAULT_PRAISE).toEqual(expect.arrayContaining(["Great work!", "Excellent!", "Well done!"]));
  });

  it("never says the same thing twice in a row", () => {
    let last: string | undefined;
    for (let i = 0; i < 200; i++) {
      const next = pickPraise(DEFAULT_PRAISE, last);
      expect(next).not.toBe(last);
      last = next;
    }
  });

  it("uses admins' phrases too", () => {
    const seen = new Set(Array.from({ length: 300 }, () => pickPraise([...DEFAULT_PRAISE, "You're on fire!"])));
    expect(seen.has("You're on fire!")).toBe(true);
  });

  it("says the child's first name", () => {
    expect(praiseLine("Excellent!", "Bob Smith", true)).toBe("Excellent, Bob!");
    expect(praiseLine("You're a star!", "Mia", true)).toBe("You're a star, Mia!");
    expect(praiseLine("Nice one", "Mia", true)).toBe("Nice one, Mia!");
    expect(praiseLine("Go Mia!", "Mia", true)).toBe("Go Mia!");
    expect(praiseLine("Well done!", undefined, true)).toBe("Well done!");
  });

  it("says when it took a second go", () => {
    expect(praiseLine("Well done!", "Bob", false)).toBe("Well done, Bob! You got it on your second go.");
    expect(pickPraise(["Well done!"], "Well done!")).toBe("Well done!");
  });

  it("tidies new phrases and turns away empty or long ones", () => {
    expect(cleanPraise("  You're   on fire! ")).toEqual({ text: "You're on fire!" });
    expect(cleanPraise("   ")).toHaveProperty("error");
    expect(cleanPraise("a".repeat(MAX_PRAISE_LENGTH + 1))).toHaveProperty("error");
  });

  it("keeps the SQL file and the app's copy the same", () => {
    expect(readFileSync(join(__dirname, "../../../database/013_my247tutor_praise.sql"), "utf8")).toContain(PRAISE_SQL);
  });
});
