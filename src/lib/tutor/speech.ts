/**
 * Suni's voice: the browser's own text-to-speech, so talking aloud is free and works offline.
 * Kept free of React so the text clean-up can be tested.
 */

/** Turns a chat message into something that sounds right read aloud. */
export function speakableText(text: string): string {
  return (
    text
      // Emoji would be read out by name ("smiling face with smiling eyes").
      .replace(/[\p{Extended_Pictographic}\p{Emoji_Modifier}\u{FE0F}\u{200D}]/gu, "")
      // Markdown marks and bullets aren't words.
      .replace(/[*_`#>]+/g, "")
      .replace(/^\s*[-•]\s+/gm, "")
      // Maths symbols children see in questions.
      .replace(/(\d)\s*×\s*(\d)/g, "$1 times $2")
      .replace(/(\d)\s*÷\s*(\d)/g, "$1 divided by $2")
      .replace(/(\d)\s*−\s*(\d)/g, "$1 minus $2")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * An Australian voice if the device has one, then British, then any English voice. Within a country,
 * natural-sounding voices (Edge's "Natural" ones, iPhone's "Enhanced" ones) come before robotic ones.
 */
export function pickVoice<V extends { lang: string; name: string; localService?: boolean }>(voices: V[]): V | null {
  const english = voices.filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith("en"));
  const rank = (v: V) => {
    const lang = v.lang.toLowerCase().replace("_", "-");
    const region = lang === "en-au" ? 0 : lang === "en-gb" ? 1 : lang === "en-nz" ? 2 : 3;
    // Female-sounding voices tend to suit a friendly bee; named ones vary by device.
    const friendly = /karen|catherine|female|samantha|serena|kate|libby|natasha/i.test(v.name) ? 0 : 1;
    const natural = /natural|neural|online|enhanced|premium/i.test(v.name) ? 0 : 1;
    return region * 4 + natural * 2 + friendly;
  };
  return english.sort((a, b) => rank(a) - rank(b))[0] ?? null;
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

/**
 * Something to say. A word on its own (`word: true`), such as one a child has to find or read, is
 * said more slowly and at Suni's natural pitch so every sound is clear.
 */
export interface SpeechPart {
  text: string;
  word?: boolean;
}

let waitedForVoices = false;
/** Counts what Suni is asked to say, so something newer replaces a line still waiting for voices. */
let latest = 0;

/** Reads the text aloud, cutting off anything Suni was already saying. Parts are said one after another. */
export function speak(text: string | SpeechPart[]) {
  if (!speechSupported()) return;
  const words = (typeof text === "string" ? [{ text }] : text).map((p) => ({ ...p, text: speakableText(p.text) })).filter((p) => p.text);
  const turn = ++latest;
  window.speechSynthesis.cancel();
  if (!words.length) return;
  // Chrome loads its voices after the page, so the first thing Suni says could be in the default
  // (often American) voice. Wait for them, briefly, the first time only.
  if (!waitedForVoices && !window.speechSynthesis.getVoices().length) {
    waitedForVoices = true;
    let spoken = false;
    const go = () => {
      if (spoken) return;
      spoken = true;
      window.speechSynthesis.removeEventListener("voiceschanged", go);
      if (turn === latest) say(words);
    };
    window.speechSynthesis.addEventListener("voiceschanged", go);
    setTimeout(go, 500);
    return;
  }
  say(words);
}

/** A word, a sentence using it, then the word again, as a teacher reads a spelling word. */
export function inSentence(word: string, sentence: string): SpeechPart[] {
  return [{ text: word, word: true }, { text: sentence }, { text: word, word: true }];
}

/** Speaking rate and pitch for talking, and for a word on its own. */
export const TALK = { rate: 0.95, pitch: 1.15 };
export const WORD = { rate: 0.7, pitch: 1 };

function say(parts: SpeechPart[]) {
  const voice = pickVoice(window.speechSynthesis.getVoices());
  for (const part of parts) {
    const utterance = new SpeechSynthesisUtterance(part.text);
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang ?? "en-AU";
    Object.assign(utterance, part.word ? WORD : TALK);
    window.speechSynthesis.speak(utterance);
  }
}

export function stopSpeaking() {
  latest++;
  if (speechSupported()) window.speechSynthesis.cancel();
}
