import { SKILLS } from "../curriculum/skills";
import { subtopicPath } from "../content/tree";
import type { AttemptRecord } from "./model";

export interface AttemptTopic {
  subject: string;
  /** "Year 4", or empty for adaptive practice that spans years. */
  year: string;
  title: string;
}

const SUBJECT_NAMES: Record<string, string> = { maths: "Maths", english: "English" };

/** The topic an attempt was on, from its key: a subtopic in the topic tree, or a skill. */
export function attemptTopic(key: string): AttemptTopic {
  const path = subtopicPath(key);
  if (path) return { subject: SUBJECT_NAMES[path.subjectKey] ?? path.subject.name, year: path.year.name, title: path.subtopic.title };
  const skill = SKILLS.find((s) => s.id === key);
  if (skill) return { subject: SUBJECT_NAMES[skill.subject] ?? skill.subject, year: "", title: skill.title };
  return { subject: "", year: "", title: key };
}

export type AttemptResult = "first try" | "with hints" | "second try" | "not right";

export function attemptResult(h: AttemptRecord): AttemptResult {
  if (h.correct) return h.hintsUsed > 0 ? "with hints" : "first try";
  return h.secondTry ? "second try" : "not right";
}

export interface TopicResult {
  key: string;
  topic: AttemptTopic;
  answered: number;
  rightFirstTry: number;
  lastAt: number;
}

/** Questions answered and right first try for each topic, most recently practised first. */
export function resultsByTopic(history: AttemptRecord[]): TopicResult[] {
  const byKey = new Map<string, TopicResult>();
  for (const h of history) {
    const r = byKey.get(h.skillId) ?? { key: h.skillId, topic: attemptTopic(h.skillId), answered: 0, rightFirstTry: 0, lastAt: 0 };
    r.answered += 1;
    if (h.correct) r.rightFirstTry += 1;
    r.lastAt = Math.max(r.lastAt, h.at);
    byKey.set(h.skillId, r);
  }
  return [...byKey.values()].sort((a, b) => b.lastAt - a.lastAt);
}
