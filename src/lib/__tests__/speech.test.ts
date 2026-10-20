import { describe, expect, it, vi } from "vitest";
import { inSentence, pickVoice, speak, speakableText, speechChunks, TALK, WORD } from "../tutor/speech";

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

  it("prefers a natural-sounding voice, but never over the accent", () => {
    expect(pickVoice([v("en-AU", "Microsoft Catherine"), v("en-AU", "Microsoft Natasha Online (Natural)")])?.name).toBe(
      "Microsoft Natasha Online (Natural)",
    );
    expect(pickVoice([v("en-GB", "Google UK English Female (Natural)"), v("en-AU", "Lee")])?.lang).toBe("en-AU");
  });

  it("has no voice when the device has no English voices", () => {
    expect(pickVoice([v("fr-FR"), v("de-DE")])).toBeNull();
  });
});

describe("saying a word", () => {
  it("says the lead-in, then the word on its own, slower and at a natural pitch", () => {
    const spoken: { text: string; rate: number; pitch: number; lang: string }[] = [];
    class Utterance {
      rate = 1;
      pitch = 1;
      lang = "";
      voice: unknown = null;
      constructor(public text: string) {}
    }
    const voices = [
      { lang: "en-US", name: "Samantha" },
      { lang: "en-AU", name: "Karen" },
    ];
    const synth = {
      cancel() {},
      getVoices: () => voices,
      speak: (u: Utterance) => spoken.push(u),
      addEventListener() {},
      removeEventListener() {},
    };
    vi.stubGlobal("window", { speechSynthesis: synth, SpeechSynthesisUtterance: Utterance });
    vi.stubGlobal("SpeechSynthesisUtterance", Utterance);
    try {
      speak([{ text: "Find the word." }, { text: "said", word: true }]);
    } finally {
      vi.unstubAllGlobals();
    }
    expect(spoken.map((u) => u.text)).toEqual(["Find the word.", "said"]);
    expect(spoken[0]).toMatchObject({ ...TALK, lang: "en-AU" });
    expect(spoken[1]).toMatchObject({ ...WORD, lang: "en-AU" });
    expect(WORD.rate).toBeLessThan(TALK.rate);
  });

  it("says a word in a sentence between the word on its own", () => {
    expect(inSentence("cat", "The cat sat.")).toEqual([{ text: "cat", word: true }, { text: "The cat sat." }, { text: "cat", word: true }]);
  });

  it("splits long text for the cloud voice at sentence ends", () => {
    expect(speechChunks("One. Two! Three?", 9)).toEqual(["One. Two!", "Three?"]);
    expect(speechChunks("It costs 3.50 today.", 400)).toEqual(["It costs 3.50 today."]);
    expect(speechChunks("A sentence much too long.", 10)).toBeNull();
  });
});
