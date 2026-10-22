import type { Question } from "./types";
import { Rng } from "./rng";
import { PASSAGES, WORDWORK } from "../english/bank";

/** Multiple-choice English practice: spelling, vocabulary and comprehension. */
export function generateEnglishQuestion(skillId: string, seed: number): Question {
  const rng = new Rng(seed);
  const id = `${skillId}:${seed}`;

  const words = WORDWORK[skillId];
  if (words) {
    const item = rng.pick(words);
    const choices = rng.shuffle([item.correct, ...item.wrong]);
    return {
      id,
      skillId,
      prompt: item.prompt,
      choices,
      answer: { kind: "choice", index: choices.indexOf(item.correct) },
      writeHints: true,
      hints: skillId.includes("spelling")
        ? [
            "Say each option slowly and listen for each sound.",
            "Think about the base word and any prefix or suffix.",
            "Look for a spelling rule you know, like dropping the e or doubling a letter.",
          ]
        : [
            "Read the sentence again and think about what is happening.",
            "Try putting each option into the sentence. Which makes sense?",
            "Is the question asking for the same meaning or the opposite?",
          ],
      solution: item.explanation,
    };
  }

  const passages = PASSAGES[skillId];
  if (passages) {
    const passage = rng.pick(passages);
    const q = rng.pick(passage.questions);
    const choices = rng.shuffle([q.correct, ...q.wrong]);
    const hintByType = {
      literal: "The answer is written in the text. Find the sentence that talks about it.",
      inferential: "The answer isn't written directly. Look for clues in what characters do or say.",
      vocabulary: "Read the sentences around the word. What would make sense there?",
      purpose: "Ask yourself: is the writer telling a story, giving facts, or trying to convince you?",
    } as const;
    return {
      id: `${id}:${passage.title}:${passage.questions.indexOf(q)}`,
      skillId,
      prompt: q.prompt,
      choices,
      answer: { kind: "choice", index: choices.indexOf(q.correct) },
      writeHints: true,
      hints: [
        hintByType[q.type],
        "Reread the paragraph that is most about this question.",
        "Rule out the options that don't match the text.",
      ],
      solution: q.explanation,
      passage: { title: passage.title, text: passage.text },
    };
  }

  throw new Error(`No English practice for ${skillId}`);
}
