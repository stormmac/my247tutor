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

/** An Australian voice if the device has one, then British, then any English voice. */
export function pickVoice<V extends { lang: string; name: string; localService?: boolean }>(voices: V[]): V | null {
  const english = voices.filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith("en"));
  const rank = (v: V) => {
    const lang = v.lang.toLowerCase().replace("_", "-");
    const region = lang === "en-au" ? 0 : lang === "en-gb" ? 1 : lang === "en-nz" ? 2 : 3;
    // Female-sounding voices tend to suit a friendly bee; named ones vary by device.
    const friendly = /karen|catherine|female|samantha|serena|kate|libby|natasha/i.test(v.name) ? 0 : 1;
    return region * 2 + friendly;
  };
  return english.sort((a, b) => rank(a) - rank(b))[0] ?? null;
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

/** Reads the text aloud, cutting off anything Suni was already saying. */
export function speak(text: string) {
  if (!speechSupported()) return;
  const words = speakableText(text);
  window.speechSynthesis.cancel();
  if (!words) return;
  const utterance = new SpeechSynthesisUtterance(words);
  const voice = pickVoice(window.speechSynthesis.getVoices());
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang ?? "en-AU";
  utterance.rate = 0.95;
  utterance.pitch = 1.15;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (speechSupported()) window.speechSynthesis.cancel();
}
