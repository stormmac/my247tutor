"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { LessonRunner } from "@/components/LessonRunner";
import { LearnToReadGate } from "@/components/LearnToReadGate";
import { buildLesson, currentUnit, isOpen, PASS_MARK, readingOf, recordLesson } from "@/lib/phonics/progress";
import { getUnit } from "@/lib/phonics/sequence";

/** One Learn to Read lesson: meet the sounds, find them, read words, then read a sentence aloud. */
export default function LessonPage() {
  const { unit: unitId } = useParams<{ unit: string }>();
  const unit = getUnit(unitId);
  if (!unit) return <p>We couldn&apos;t find those sounds.</p>;
  const title = unit.title.replace(/_/g, "–");
  return (
    <LearnToReadGate open={(reading) => isOpen(reading, unit.id)} notOpen="Finish the sounds before these first.">
      {({ reading, setProfile }) => (
        <LessonRunner
          key={unit.id}
          title={title}
          backHref="/read"
          backLabel="Learn to Read"
          build={() => buildLesson(unit.id)}
          onComplete={(r) =>
            setProfile((p) => {
              const next = recordLesson(readingOf(p), unit.id, r.right, r.total);
              return { ...p, reading: r.readIt ? { ...next, readAloud: next.readAloud + 1 } : next };
            })
          }
          finished={(r, again) => {
            // The profile already has this lesson saved, so the current unit is the next one to learn.
            const after = currentUnit(reading);
            const nextUnit = r.passed && after && after.id !== unit.id ? after : null;
            return (
              <>
                <p style={{ margin: 0 }}>
                  {r.passed ? "These sounds are done." : `Get ${Math.ceil(PASS_MARK * r.total)} right to finish them.`}
                </p>
                <div className="row" style={{ justifyContent: "center" }}>
                  {nextUnit && (
                    <Link className="btn" href={`/read/${nextUnit.id}`}>
                      Next sounds: {nextUnit.title.replace(/_/g, "–")}
                    </Link>
                  )}
                  <button className={nextUnit ? "btn secondary" : "btn"} onClick={again}>
                    Practise again
                  </button>
                  <Link className="btn secondary" href="/read">
                    Learn to Read
                  </Link>
                </div>
              </>
            );
          }}
        />
      )}
    </LearnToReadGate>
  );
}
