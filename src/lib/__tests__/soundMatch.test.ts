import { describe, expect, it } from "vitest";
import { distance, mfcc, rank, saidSound } from "../phonics/match";

const RATE = 16000;

/** A made-up sound: a hum at the given pitches, or a hiss, with a little noise like a real microphone. */
function sound(kind: { tones?: number[]; hiss?: boolean }, seconds: number, seed = 1, gain = 0.5): Float32Array {
  let s = seed;
  const random = () => ((s = (s * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const out = new Float32Array(Math.round(seconds * RATE));
  let last = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / RATE;
    let v = (kind.tones ?? []).reduce((sum, f) => sum + Math.sin(2 * Math.PI * f * t), 0) / Math.max(1, kind.tones?.length ?? 1);
    if (kind.hiss) {
      // Noise with the low pitches taken out, like "sss".
      const n = random();
      v += n - last;
      last = n;
    }
    out[i] = gain * v + 0.01 * random();
  }
  return out;
}

const SOUNDS = {
  m: { tones: [150, 300] },
  s: { hiss: true },
  a: { tones: [700, 1200, 2400] },
  o: { tones: [500, 900] },
};

describe("checking a child's sound", () => {
  const templates = new Map(Object.entries(SOUNDS).map(([k, v]) => [k, mfcc(sound(v, 0.5, 7), RATE)]));

  it("makes a row of numbers every 10 ms", () => {
    const f = mfcc(sound(SOUNDS.m, 0.3), RATE);
    expect(f.length).toBe(28);
    expect(f[0]).toHaveLength(12);
    expect(distance(f, f)).toBe(0);
  });

  it("finds the sound that was said, longer or shorter, louder or quieter", () => {
    for (const [name, kind] of Object.entries(SOUNDS)) {
      for (const [seconds, gain] of [
        [0.3, 0.9],
        [0.8, 0.2],
      ]) {
        const said = mfcc(sound(kind, seconds, 99, gain), RATE);
        const ranking = rank(said, templates);
        expect(ranking[0].ipa, `${name} said for ${seconds}s`).toBe(name);
        expect(saidSound(name, ranking)).toBe(true);
      }
    }
  });

  it("doesn't take one sound for another", () => {
    const said = rank(mfcc(sound(SOUNDS.s, 0.5, 3), RATE), templates);
    expect(saidSound("m", said)).toBe(false);
    expect(saidSound("a", said)).toBe(false);
  });

  it("can't match nothing", () => {
    expect(saidSound("m", rank([], templates))).toBe(false);
    expect(saidSound("m", [])).toBe(false);
  });
});
