/**
 * What Suni says about the week's program once a child has said how they feel: where they're up to in
 * each subject's weekly lesson, and what to do next.
 */
import { curriculumOf, subjectName } from "../curriculum/curricula";
import type { Subject } from "../curriculum/types";
import { currentLesson, lessonProgress } from "../learner/lesson";
import type { LearnerProfile } from "../learner/model";
import { doesSubject } from "../learner/plan";
import type { Mood } from "./memory";

const SUBJECTS: Subject[] = ["maths", "english"];

/** How a child rates their feeling, from 1 (sad) to 5 (happy). */
export const MOOD_RATING: Record<Mood, number> = { sad: 1, worried: 2, tired: 3, okay: 4, happy: 5 };

/** One subject still to do this week, with a button to start it. */
export interface ProgramStep {
  subject: Subject;
  label: string;
  /** What Suni suggests, like "do the Maths check". */
  suggest: string;
  href: string;
}

export interface ProgramAhead {
  /** What Suni says, one line per subject. */
  lines: string[];
  /** The subjects with work still to do, the one to start first at the top. */
  steps: ProgramStep[];
}

/** This week's program for a child: each subject's lesson, how far they are, and what's next. */
export function programAhead(profile: LearnerProfile, now = Date.now()): ProgramAhead {
  const curriculum = curriculumOf(profile.curriculum);
  const lines: string[] = [];
  const started: ProgramStep[] = [];
  const fresh: ProgramStep[] = [];
  for (const subject of SUBJECTS.filter((s) => doesSubject(profile.plan, s))) {
    const name = subjectName(subject, curriculum);
    const step = { subject, href: `/learn/${subject}` };
    if (!profile.placementDone[subject]) {
      lines.push(`${name}: a short starting check, so I know where to begin.`);
      fresh.push({ ...step, label: `${name} check`, suggest: `do the ${name} check` });
      continue;
    }
    const lesson = currentLesson(profile, subject, now);
    const { done, total } = lesson ? lessonProgress(lesson) : { done: 0, total: 0 };
    if (lesson && done >= total) {
      lines.push(`${name}: this week's lesson is all done. Great work!`);
    } else if (done) {
      lines.push(`${name}: ${done} of ${total} questions done, ${total - done} to go.`);
      started.push({ ...step, label: `Keep going with ${name}`, suggest: `keep going with ${name}` });
    } else {
      lines.push(`${name}: this week's lesson is ready${total ? ` with ${total} questions` : ""}.`);
      fresh.push({ ...step, label: `Start ${name}`, suggest: `start ${name}` });
    }
  }
  // Finish what's started before beginning something new.
  return { lines, steps: [...started, ...fresh] };
}

/** What Suni says about the program, after replying to how they feel. */
export function programText(program: ProgramAhead): string {
  if (!program.lines.length) return "What would you like to work on today?";
  const next = program.steps[0];
  const intro = "Here's your program this week.";
  const end = next
    ? `Shall we ${next.suggest}? Or is there something else you'd like to do?`
    : "You've finished this week's lessons! Would you like to practise something?";
  return [intro, ...program.lines, end].join(" ");
}
