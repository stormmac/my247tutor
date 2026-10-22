/**
 * Hints written for each question by Suni's model, instead of the same few for every question of a
 * kind: a nudge, then a strategy, then a step that nearly gets there. Shared by the server and tests.
 */
import { z } from "zod";
import { CURRICULA } from "../curriculum/curricula";

export const HintRequestSchema = z.object({
  prompt: z.string().min(1).max(2000),
  choices: z.array(z.string().max(300)).max(12).optional(),
  correctAnswer: z.string().min(1).max(300),
  solution: z.string().max(2000).default(""),
  passage: z.string().max(5000).optional(),
  /** The drawing that goes with the question, as its data (a clock's time, a graph's bars). */
  picture: z.string().max(3000).optional(),
  yearLevel: z.number().int().min(0).max(12),
  curriculum: z.enum(CURRICULA).optional(),
});

export type HintRequest = z.infer<typeof HintRequestSchema>;

/** How many hints each question gets, as before. */
export const HINT_COUNT = 3;

// Words with spaces around them, so matches are whole words. A full stop counts only inside a number (2.5).
const words = (text: string) =>
  ` ${text
    .toLowerCase()
    .replace(/\.(?!\d)/g, " ")
    .replace(/[^\p{L}\p{N}./]+/gu, " ")
    .trim()} `;

/**
 * Drops any hint that gives the answer away by saying it outright. For an answer in parts (pick
 * several, or put in order) a hint may name some of them, but not all. A one-character answer (a
 * digit, a letter) is too common to check for, so those are left to the model's instructions.
 */
export function withoutAnswer(hints: string[], correctAnswer: string): string[] {
  const parts = correctAnswer
    .split(/, then |, /)
    .map((p) => words(p).trim())
    .filter((p) => p.replace(/\s/g, "").length >= 2);
  const givesAway = (hint: string) => parts.length > 0 && parts.every((p) => words(hint).includes(` ${p} `));
  return hints.map((h) => h.trim()).filter((h) => h && !givesAway(h));
}

/** The hints to show: the written ones first, topped up with the question's own when too few survive. */
export function hintLadder(written: string[], fallback: string[]): string[] {
  return [...written, ...fallback].slice(0, Math.max(HINT_COUNT, written.length)).slice(0, HINT_COUNT);
}
