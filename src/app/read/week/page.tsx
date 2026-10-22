"use client";

import Link from "next/link";
import { LessonRunner } from "@/components/LessonRunner";
import { LearnToReadGate } from "@/components/LearnToReadGate";
import { buildWeeklyLesson, formatReadingAge, LESSONS_PER_MONTH, recordWeekly, readingOf, weeklyReading } from "@/lib/phonics/progress";
import { getUnit } from "@/lib/phonics/sequence";

/** This week's reading lesson: the sounds, the sight words, then a story with questions and a picture to colour. */
export default function WeeklyReadingPage() {
  return (
    <LearnToReadGate
      open={(reading) => weeklyReading(reading) !== null}
      notOpen="Do the reading check first, so the lesson is at the right level."
    >
      {({ reading, setProfile }) => {
        const weekly = weeklyReading(reading)!;
        const unit = getUnit(weekly.unitId)!;
        return (
          <LessonRunner
            key={weekly.week}
            title={`This week: ${unit.title.replace(/_/g, "–")}`}
            backHref="/read"
            backLabel="Learn to Read"
            build={() => buildWeeklyLesson(weekly)}
            onComplete={(r) => setProfile((p) => ({ ...p, reading: recordWeekly(readingOf(p), r.right, r.total) }))}
            finished={(r, again) => {
              // The profile already has this lesson saved.
              const toward = reading.toward ?? 0;
              return (
                <>
                  <p style={{ margin: 0 }}>
                    {r.passed
                      ? toward === 0 && reading.age !== null
                        ? `Your reading age went up to ${formatReadingAge(reading.age)}!`
                        : `${LESSONS_PER_MONTH - toward} more ${LESSONS_PER_MONTH - toward === 1 ? "lesson" : "lessons"} like this to move up a month.`
                      : "Have another go to get even more right."}
                  </p>
                  <div className="row" style={{ justifyContent: "center" }}>
                    <button className={r.passed ? "btn secondary" : "btn"} onClick={again}>
                      Do it again
                    </button>
                    <Link className={r.passed ? "btn" : "btn secondary"} href="/read">
                      Learn to Read
                    </Link>
                  </div>
                </>
              );
            }}
          />
        );
      }}
    </LearnToReadGate>
  );
}
