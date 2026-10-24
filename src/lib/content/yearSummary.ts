import type { Curriculum } from "../curriculum/curricula";
import type { Subject, YearLevel } from "../curriculum/types";
import { subtopicsOf, topicsFor } from "./tree";

/** One area of a subject in a year, and what a child should be able to do in it by the end of the year. */
export interface YearArea {
  topic: string;
  /** What the area covers, in a line. */
  about: string;
  /** "Reads, writes and partitions numbers up to tens of thousands.", one for each thing they learn. */
  canDo: string[];
}

/**
 * What a child should know by the end of a year in a subject, for parents: each of the year's topics
 * with what they should be able to do in it, in the curriculum's own order.
 */
export function yearSummary(subject: Subject, year: YearLevel, curriculum: Curriculum): YearArea[] {
  return topicsFor(subject, year, curriculum)
    .map((t) => ({
      topic: t.title,
      about: t.description,
      canDo: [
        ...new Set(
          subtopicsOf(t.id)
            .map((s) => s.description.trim())
            .filter(Boolean),
        ),
      ],
    }))
    .filter((a) => a.canDo.length > 0);
}
