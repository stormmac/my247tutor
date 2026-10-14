import type { Answer, CheckResult } from "./types";
import { formatDecimal, gcd } from "./format";

const EPS = 1e-9;

/** Parses "4 723", "4,723", "$7.50", "0.5" or "3/4" into a number; null if it can't. */
export function parseNumber(raw: string): number | null {
  const s = raw.trim().replace(/^\$/, "").replace(/[\s,]/g, "");
  if (/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) return Number(s);
  const frac = parseFraction(raw);
  return frac ? frac.num / frac.den : null;
}

/** Parses "3/4", "1 1/4" (mixed number) or a whole number into a fraction. */
export function parseFraction(raw: string): { num: number; den: number } | null {
  const s = raw.trim().replace(/\s+/g, " ");
  let m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (m) {
    const den = Number(m[2]);
    return den === 0 ? null : { num: Number(m[1]), den };
  }
  m = s.match(/^(\d+) (\d+)\s*\/\s*(\d+)$/);
  if (m) {
    const den = Number(m[3]);
    return den === 0 ? null : { num: Number(m[1]) * den + Number(m[2]), den };
  }
  if (/^-?\d+$/.test(s)) return { num: Number(s), den: 1 };
  return null;
}

/** Parses "45 r 3", "45r3", "45 remainder 3" or a plain "45". */
export function parseRemainder(raw: string): { quotient: number; remainder: number } | null {
  const s = raw.trim().toLowerCase().replace(/\s+/g, " ");
  const m = s.match(/^(\d+)\s*(?:r|rem|remainder)\.?\s*(\d+)$/);
  if (m) return { quotient: Number(m[1]), remainder: Number(m[2]) };
  if (/^\d+$/.test(s)) return { quotient: Number(s), remainder: 0 };
  return null;
}

export function checkAnswer(answer: Answer, input: string): CheckResult {
  if (!input.trim()) return { correct: false, feedback: "Type an answer first.", unreadable: true };

  switch (answer.kind) {
    case "number": {
      const value = parseNumber(input);
      if (value === null) return { correct: false, feedback: "Type your answer as a number.", unreadable: true };
      return { correct: Math.abs(value - answer.value) < EPS };
    }
    case "fraction": {
      const given = parseFraction(input);
      if (!given) return { correct: false, feedback: "Type your answer as a fraction, like 3/4.", unreadable: true };
      const equal = given.num * answer.den === answer.num * given.den;
      if (!equal) return { correct: false };
      if (answer.requireSimplest && gcd(given.num, given.den) !== 1) {
        return { correct: false, feedback: "That's equal to the answer. Can you simplify it?" };
      }
      return { correct: true };
    }
    case "remainder": {
      const given = parseRemainder(input);
      if (!given) return { correct: false, feedback: "Write it like 45 r 3.", unreadable: true };
      if (given.quotient === answer.quotient && given.remainder !== answer.remainder && answer.remainder > 0 && given.remainder === 0) {
        return { correct: false, feedback: "Right number of groups. What's left over?" };
      }
      return { correct: given.quotient === answer.quotient && given.remainder === answer.remainder };
    }
    case "choice": {
      const index = Number(input);
      return { correct: Number.isInteger(index) && index === answer.index };
    }
    case "text":
      return { correct: answer.accepted.some((a) => textMatches(a, input)) };
    case "multi": {
      const given = parseIndexList(input);
      if (!given.length) return { correct: false, feedback: "Choose at least one answer.", unreadable: true };
      const want = [...answer.indices].sort((a, b) => a - b);
      const got = [...new Set(given)].sort((a, b) => a - b);
      if (got.length === want.length && got.every((v, i) => v === want[i])) return { correct: true };
      const allRight = got.every((v) => want.includes(v));
      return { correct: false, feedback: allRight ? "Those are right, but there's at least one more." : undefined };
    }
    case "order": {
      const given = parseIndexList(input);
      return { correct: given.length === answer.order.length && given.every((v, i) => v === answer.order[i]) };
    }
  }
}

/** "0,2,3" from a multi-select or ordering answer. */
function parseIndexList(input: string): number[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter(Number.isInteger);
}

function normaliseText(s: string): string {
  return s
    .trim()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

/**
 * Typed answers are forgiving about case, spacing, curly apostrophes and a final full stop.
 * Numbers are compared as numbers, and a unit after them is ignored ("115°", "60 minutes").
 */
export function textMatches(accepted: string, input: string): boolean {
  const want = normaliseText(accepted);
  const got = normaliseText(input);
  if (want === got) return true;
  const expected = parseNumber(want);
  if (expected !== null) {
    const value = parseNumber(got.replace(/\s*(°|%|[a-z]+)\.?$/, ""));
    return value !== null && Math.abs(value - expected) < EPS;
  }
  const strip = (t: string) => t.replace(/[.!?]+$/, "");
  return /\w/.test(want) && strip(want) === strip(got);
}

/** The correct answer as the student would type or see it. */
export function answerText(answer: Answer, choices?: string[]): string {
  switch (answer.kind) {
    case "number":
      return formatDecimal(answer.value);
    case "fraction":
      return `${answer.num}/${answer.den}`;
    case "remainder":
      return answer.remainder ? `${answer.quotient} r ${answer.remainder}` : String(answer.quotient);
    case "choice":
      return choices?.[answer.index] ?? String(answer.index);
    case "text":
      return answer.accepted[0];
    case "multi":
      return answer.indices.map((i) => choices?.[i] ?? String(i)).join(", ");
    case "order":
      return answer.order.map((i) => choices?.[i] ?? String(i)).join(", then ");
  }
}
