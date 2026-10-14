import { describe, expect, it } from "vitest";
import { pickVoice, speakableText } from "../tutor/speech";

describe("what Suni reads aloud", () => {
  it("leaves out emoji and markdown", () => {
    expect(speakableText("Great work! 🎉 **You** got it 👍🏽")).toBe("Great work! You got it");
    expect(speakableText("Try this:\n- count the tens\n- then the ones")).toBe("Try this: count the tens then the ones");
  });

  it("says maths symbols as words", () => {
    expect(speakableText("7 × 8 = 56, and 56 ÷ 7 = 8. 10 − 3 = 7")).toBe("7 times 8 = 56, and 56 divided by 7 = 8. 10 minus 3 = 7");
  });
});

describe("Suni's voice", () => {
  const v = (lang: string, name = "Voice") => ({ lang, name });

  it("prefers an Australian voice, then British", () => {
    expect(pickVoice([v("en-US"), v("en-GB"), v("en-AU"), v("fr-FR")])?.lang).toBe("en-AU");
    expect(pickVoice([v("en-US"), v("en_GB")])?.lang).toBe("en_GB");
  });

  it("prefers a friendly named voice within a country", () => {
    expect(pickVoice([v("en-AU", "Lee"), v("en-AU", "Karen")])?.name).toBe("Karen");
  });

  it("has no voice when the device has no English voices", () => {
    expect(pickVoice([v("fr-FR"), v("de-DE")])).toBeNull();
  });
});
