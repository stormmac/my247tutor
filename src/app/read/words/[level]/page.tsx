"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { LessonRunner } from "@/components/LessonRunner";
import { LearnToReadGate } from "@/components/LearnToReadGate";
import { buildSightLesson, currentSightLevel, isSightOpen, PASS_MARK, readingOf, recordLesson } from "@/lib/phonics/progress";
import { getSightLevel } from "@/lib/phonics/sightWords";

/** One sight word lesson: meet the words, find them, fill gaps in sentences, then read a sentence aloud. */
export default function SightWordsPage() {
  const { level: levelId } = useParams<{ level: string }>();
  const level = getSightLevel(levelId);
  if (!level) return <p>We couldn&apos;t find those words.</p>;
  return (
    <LearnToReadGate open={(reading) => isSightOpen(reading, level.id)} notOpen="Finish the sight words before these first.">
      {({ reading, setProfile }) => (
        <LessonRunner
          key={level.id}
          title={`Sight words: ${level.title}`}
          backHref="/read"
          backLabel="Learn to Read"
          build={() => buildSightLesson(level.id)}
          onComplete={(r) =>
            setProfile((p) => {
              const next = recordLesson(readingOf(p), level.id, r.right, r.total);
              return { ...p, reading: r.readIt ? { ...next, readAloud: next.readAloud + 1 } : next };
            })
          }
          finished={(r, again) => {
            // The profile already has this lesson saved, so the current level is the next one to learn.
            const after = currentSightLevel(reading);
            const nextLevel = r.passed && after && after.id !== level.id ? after : null;
            return (
              <>
                <p style={{ margin: 0 }}>
                  {r.passed ? "These words are done." : `Get ${Math.ceil(PASS_MARK * r.total)} right to finish them.`}
                </p>
                <div className="row" style={{ justifyContent: "center" }}>
                  {nextLevel && (
                    <Link className="btn" href={`/read/words/${nextLevel.id}`}>
                      Next words: {nextLevel.title}
                    </Link>
                  )}
                  <button className={nextLevel ? "btn secondary" : "btn"} onClick={again}>
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
