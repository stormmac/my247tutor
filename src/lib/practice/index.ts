import { getSkill } from "../curriculum/skills";
import type { Question } from "./types";
import { generateMathsQuestion } from "./maths";
import { generateEnglishQuestion } from "./english";

export * from "./types";
export { answerText, checkAnswer } from "./checker";

/** Returns a practice question for any skill that has auto-marked practice. */
export function generateQuestion(skillId: string, seed: number): Question {
  const skill = getSkill(skillId);
  if (skill.practice === "generated") return generateMathsQuestion(skillId, seed);
  if (skill.practice === "wordwork" || skill.practice === "comprehension") return generateEnglishQuestion(skillId, seed);
  throw new Error(`${skillId} is a writing skill; it has no auto-marked questions`);
}
