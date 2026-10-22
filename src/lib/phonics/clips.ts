/**
 * Recorded phonics sounds. A computer voice can't say a pure sound (it says "tuh" for t), so an
 * admin records each of the 44 sounds once and Suni plays the recording wherever that sound is
 * said. Sounds spelt different ways (c, k and ck) share one recording, found by its IPA.
 */
import { UNITS, type Sound } from "./sequence";

export interface Phoneme {
  ipa: string;
  /** Every way it's written, in the order taught, like ["c", "k", "ck"]. */
  graphemes: string[];
  /** An example word for each spelling. */
  examples: string[];
  /** The respelling a computer voice reads, like "kuh". */
  say: string;
}

/** The 44 sounds in the order they're taught. */
export const PHONEMES: Phoneme[] = (() => {
  const out = new Map<string, Phoneme>();
  for (const sound of UNITS.flatMap((u) => u.sounds)) {
    const p = out.get(sound.ipa) ?? { ipa: sound.ipa, graphemes: [], examples: [], say: sound.say };
    p.graphemes.push(sound.grapheme);
    p.examples.push(sound.example);
    out.set(sound.ipa, p);
  }
  return [...out.values()];
})();

export function isPhoneme(ipa: string): boolean {
  return PHONEMES.some((p) => p.ipa === ipa);
}

/** The phoneme a taught sound belongs to. */
export function phonemeOf(sound: Sound): Phoneme | undefined {
  return PHONEMES.find((p) => p.ipa === sound.ipa);
}

/** A recording is a second or two of audio: anything bigger than this is turned away. */
export const MAX_CLIP_BYTES = 400_000;

export const CLIP_TYPES = ["audio/wav", "audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg"];

/** Leading and trailing quiet is cut from a recording, keeping a little either side so the sound isn't clipped. */
export function trimSilence(samples: Float32Array, rate: number, threshold = 0.02, pad = 0.04): Float32Array {
  let start = 0;
  while (start < samples.length && Math.abs(samples[start]) < threshold) start++;
  let end = samples.length - 1;
  while (end > start && Math.abs(samples[end]) < threshold) end--;
  if (start >= samples.length) return new Float32Array(0);
  const margin = Math.round(pad * rate);
  return samples.slice(Math.max(0, start - margin), Math.min(samples.length, end + 1 + margin));
}

/** Scales a recording so its loudest point is at `peak`, so every sound plays at the same volume. */
export function normalise(samples: Float32Array, peak = 0.9): Float32Array {
  let max = 0;
  for (const s of samples) max = Math.max(max, Math.abs(s));
  if (!max) return samples;
  const gain = peak / max;
  return samples.map((s) => s * gain);
}

/** Mono 16-bit WAV, which every browser can play. */
export function encodeWav(samples: Float32Array, rate: number): Uint8Array {
  const bytes = new Uint8Array(44 + samples.length * 2);
  const view = new DataView(bytes.buffer);
  const text = (at: number, s: string) => [...s].forEach((c, i) => view.setUint8(at + i, c.charCodeAt(0)));
  text(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  text(8, "WAVE");
  text(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, "data");
  view.setUint32(40, samples.length * 2, true);
  samples.forEach((s, i) => view.setInt16(44 + i * 2, Math.round(Math.max(-1, Math.min(1, s)) * 0x7fff), true));
  return bytes;
}

/** Takes every other sample, for a smaller file when the microphone records at 44 or 48 kHz. */
export function halve(samples: Float32Array): Float32Array {
  const out = new Float32Array(Math.floor(samples.length / 2));
  for (let i = 0; i < out.length; i++) out[i] = (samples[i * 2] + samples[i * 2 + 1]) / 2;
  return out;
}
