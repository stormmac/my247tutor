/**
 * Suni's voice: Azure's Australian voice when the site has it set up (the same on every device),
 * otherwise the browser's own text-to-speech, which is free and works offline. Kept free of React
 * so the text clean-up can be tested.
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
  /** A phonics sound in IPA. The cloud voice says exactly that sound; a device's voice reads `text`, its respelling. */
  ipa?: string;
}

let waitedForVoices = false;
/** Counts what Suni is asked to say, so something newer replaces a line still waiting. */
let latest = 0;

/** Reads the text aloud, cutting off anything Suni was already saying. Parts are said one after another. */
export function speak(text: string | SpeechPart[]) {
  if (typeof window === "undefined") return;
  const words = (typeof text === "string" ? [{ text }] : text).map((p) => ({ ...p, text: speakableText(p.text) })).filter((p) => p.text);
  const turn = ++latest;
  stopAudio();
  if (speechSupported()) window.speechSynthesis.cancel();
  if (!words.length) return;
  if (cloudOn === false || !("AudioContext" in window)) return speakOnDevice(words, turn);
  void cloudVoice().then(async (on) => {
    if (turn !== latest) return;
    if (on && (await playCloud(words, turn))) return;
    if (turn === latest) speakOnDevice(words, turn);
  });
}

function speakOnDevice(words: SpeechPart[], turn: number) {
  if (!speechSupported()) return;
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

/** The longest line the cloud voice says in one go; longer text is split at sentence ends. */
export const CLOUD_CHUNK = 400;

/** Splits text into pieces of at most `max` characters, at sentence ends. Null if a sentence is longer than that. */
export function speechChunks(text: string, max = CLOUD_CHUNK): string[] | null {
  const chunks: string[] = [];
  for (const sentence of text.match(/[^.!?]+[.!?]*\s*/g) ?? []) {
    const last = chunks.length - 1;
    if (last >= 0 && (chunks[last] + sentence).trim().length <= max) chunks[last] += sentence;
    else chunks.push(sentence);
  }
  const out = chunks.map((c) => c.trim()).filter(Boolean);
  return out.every((c) => c.length <= max) ? out : null;
}

/** Whether the site has the cloud voice set up: null until asked. */
let cloudOn: boolean | null = null;
let cloudAsked: Promise<boolean> | null = null;

/** Asks the site, once, whether the cloud voice is set up. */
export function cloudVoice(): Promise<boolean> {
  cloudAsked ??= fetch("/api/speech")
    .then((res) => (res.ok ? (res.json() as Promise<{ enabled?: boolean }>) : null))
    .then((body) => Boolean(body?.enabled))
    .catch(() => false)
    .then((on) => (cloudOn = on));
  return cloudAsked;
}

let context: AudioContext | null = null;
let playing: AudioBufferSourceNode[] = [];

/**
 * Gets the cloud voice ready: asks whether it's set up, and lets audio play. Phones only play
 * sound after a tap, and Suni often speaks after something loads, so the audio is switched on at
 * the first tap or key press on the page.
 */
export function prepareVoice(): Promise<boolean> {
  if (typeof window === "undefined" || !("AudioContext" in window)) return Promise.resolve(false);
  if (!context) {
    context = new AudioContext();
    const unlock = () => {
      if (context?.state !== "suspended") return;
      void context.resume().catch(() => undefined);
    };
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
  }
  return cloudVoice();
}

/** Plays the parts in the cloud voice, one after another with a short pause. False if it couldn't, so the device's voice can say them. */
async function playCloud(parts: SpeechPart[], turn: number): Promise<boolean> {
  void prepareVoice();
  const ctx = context;
  if (!ctx) return false;
  if (ctx.state === "suspended") await ctx.resume().catch(() => undefined);
  const lines = parts.flatMap((p) => (speechChunks(p.text) ?? [null]).map((text) => ({ ...p, text })));
  if (lines.some((l) => l.text === null)) return false;
  try {
    const buffers = await Promise.all(
      lines.map(async (line) => {
        const ipa = line.ipa ? `&ipa=${encodeURIComponent(line.ipa)}` : "";
        const res = await fetch(`/api/speech?text=${encodeURIComponent(line.text!)}${line.word ? "&word=1" : ""}${ipa}`);
        if (!res.ok) throw new Error(`Speech ${res.status}`);
        return ctx.decodeAudioData(await res.arrayBuffer());
      }),
    );
    if (turn !== latest) return true;
    if (ctx.state !== "running") return false;
    let at = ctx.currentTime + 0.05;
    for (const buffer of buffers) {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(at);
      playing.push(source);
      at += buffer.duration + 0.3;
    }
    return true;
  } catch {
    return false;
  }
}

function stopAudio() {
  for (const source of playing) {
    try {
      source.stop();
    } catch {}
  }
  playing = [];
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
  stopAudio();
  if (speechSupported()) window.speechSynthesis.cancel();
}
