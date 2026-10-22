import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PHONICS_CLIPS_SQL } from "../auth/phonicsClipSchema";
import { encodeWav, halve, isPhoneme, normalise, PHONEMES, phonemeOf, trimSilence } from "../phonics/clips";
import { UNITS } from "../phonics/sequence";

describe("recorded phonics sounds", () => {
  it("has one recording for each of the 44 sounds, shared by their spellings", () => {
    expect(PHONEMES).toHaveLength(44);
    expect(new Set(PHONEMES.map((p) => p.ipa)).size).toBe(44);
    expect(PHONEMES.find((p) => p.ipa === "kə")?.graphemes).toEqual(["c", "k", "ck"]);
    for (const sound of UNITS.flatMap((u) => u.sounds)) expect(phonemeOf(sound)?.graphemes).toContain(sound.grapheme);
  });

  it("only knows the taught sounds", () => {
    expect(isPhoneme("æ")).toBe(true);
    expect(isPhoneme("<break/>")).toBe(false);
    expect(isPhoneme("")).toBe(false);
  });

  it("cuts the quiet off either end, keeping a little margin", () => {
    const samples = new Float32Array(1000);
    samples.fill(0.5, 400, 600);
    const trimmed = trimSilence(samples, 1000, 0.02, 0.01);
    expect(trimmed.length).toBe(220);
    expect(trimSilence(new Float32Array(100), 1000)).toHaveLength(0);
  });

  it("evens out the volume and halves the sample rate", () => {
    expect(Math.max(...normalise(Float32Array.from([0.1, -0.3, 0.2])))).toBeCloseTo(0.6);
    expect(Math.min(...normalise(Float32Array.from([0.1, -0.3, 0.2])))).toBeCloseTo(-0.9);
    expect([...halve(Float32Array.from([0, 1, 0.5, 0.5]))]).toEqual([0.5, 0.5]);
  });

  it("writes a playable WAV", () => {
    const wav = encodeWav(Float32Array.from([0, 1, -1]), 22050);
    const view = new DataView(wav.buffer);
    expect(String.fromCharCode(...wav.slice(0, 4))).toBe("RIFF");
    expect(String.fromCharCode(...wav.slice(8, 12))).toBe("WAVE");
    expect(view.getUint32(24, true)).toBe(22050);
    expect(view.getUint32(40, true)).toBe(6);
    expect(view.getInt16(46, true)).toBe(0x7fff);
    expect(view.getInt16(48, true)).toBe(-0x7fff);
  });

  it("keeps the database file the same as the app's", () => {
    expect(readFileSync(join(__dirname, "../../../database/020_my247tutor_phonics_clips.sql"), "utf8")).toContain(PHONICS_CLIPS_SQL);
  });
});
