/**
 * Checks a sound a child says against the recorded sounds, on the device. Each recording is turned
 * into MFCCs (how the sound's energy spreads across pitches, frame by frame, the usual way to
 * compare speech), lined up with dynamic time warping so a longer or shorter sound still matches,
 * and the nearest recording wins. It tells different sounds apart well (s from m), close ones
 * (t from d) less well, so it's used to encourage, never to mark a child down.
 */

const FRAME = 0.025;
const HOP = 0.01;
const FILTERS = 26;
const COEFFS = 13;

function fft(re: Float64Array, im: Float64Array) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const angle = (-2 * Math.PI) / len;
    for (let i = 0; i < n; i += len) {
      for (let k = 0; k < len / 2; k++) {
        const wr = Math.cos(angle * k);
        const wi = Math.sin(angle * k);
        const a = i + k;
        const b = a + len / 2;
        const tr = re[b] * wr - im[b] * wi;
        const ti = re[b] * wi + im[b] * wr;
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
      }
    }
  }
}

const mel = (hz: number) => 2595 * Math.log10(1 + hz / 700);
const hzOf = (m: number) => 700 * (10 ** (m / 2595) - 1);

/** MFCCs for each 10 ms of the sound. */
export function mfcc(samples: Float32Array, rate: number): number[][] {
  const size = Math.round(FRAME * rate);
  const hop = Math.round(HOP * rate);
  let n = 1;
  while (n < size) n <<= 1;
  const top = Math.min(8000, rate / 2);
  const points = Array.from({ length: FILTERS + 2 }, (_, i) => Math.floor(((n + 1) * hzOf((mel(top) * i) / (FILTERS + 1))) / rate));
  const frames: number[][] = [];
  for (let start = 0; start + size <= samples.length; start += hop) {
    const re = new Float64Array(n);
    const im = new Float64Array(n);
    for (let i = 0; i < size; i++) {
      const emphasised = samples[start + i] - 0.97 * (start + i > 0 ? samples[start + i - 1] : 0);
      re[i] = emphasised * (0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (size - 1)));
    }
    fft(re, im);
    const power = Array.from({ length: n / 2 + 1 }, (_, k) => (re[k] ** 2 + im[k] ** 2) / n);
    const energies = Array.from({ length: FILTERS }, (_, f) => {
      let sum = 0;
      for (let k = points[f]; k < points[f + 2]; k++) {
        const w =
          k < points[f + 1]
            ? (k - points[f]) / Math.max(1, points[f + 1] - points[f])
            : (points[f + 2] - k) / Math.max(1, points[f + 2] - points[f + 1]);
        sum += w * (power[k] ?? 0);
      }
      return Math.log(sum + 1e-10);
    });
    frames.push(
      Array.from({ length: COEFFS }, (_, c) => energies.reduce((s, e, f) => s + e * Math.cos((Math.PI * c * (f + 0.5)) / FILTERS), 0)),
    );
  }
  // The first coefficient is loudness, which says more about the microphone than the sound. The
  // average isn't taken off, as is usual for words: a single sound barely changes, so that would
  // leave nothing to compare.
  return frames.map((f) => f.slice(1));
}

/** How far apart two sounds are, after stretching them to line up. Smaller is closer. */
export function distance(a: number[][], b: number[][]): number {
  if (!a.length || !b.length) return Infinity;
  const cost = (i: number, j: number) => Math.sqrt(a[i].reduce((s, v, c) => s + (v - b[j][c]) ** 2, 0));
  let prev = new Float64Array(b.length + 1).fill(Infinity);
  prev[0] = 0;
  for (let i = 1; i <= a.length; i++) {
    const row = new Float64Array(b.length + 1).fill(Infinity);
    for (let j = 1; j <= b.length; j++) row[j] = cost(i - 1, j - 1) + Math.min(prev[j], row[j - 1], prev[j - 1]);
    prev = row;
  }
  return prev[b.length] / (a.length + b.length);
}

/** The recordings ranked nearest first. */
export function rank(said: number[][], templates: Map<string, number[][]>): { ipa: string; distance: number }[] {
  return [...templates].map(([ipa, features]) => ({ ipa, distance: distance(said, features) })).sort((x, y) => x.distance - y.distance);
}

/** Whether the child said `target`: it's the nearest recording, or as good as. */
export function saidSound(target: string, ranking: { ipa: string; distance: number }[]): boolean {
  const best = ranking[0];
  const mine = ranking.find((r) => r.ipa === target);
  if (!best || !mine || !Number.isFinite(mine.distance)) return false;
  return mine.ipa === best.ipa || mine.distance <= best.distance * 1.08;
}
