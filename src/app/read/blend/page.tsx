"use client";

import Link from "next/link";
import { LessonRunner } from "@/components/LessonRunner";
import { LearnToReadGate } from "@/components/LearnToReadGate";
import { buildBlendPractice, openUnits, readingOf, recordBlending } from "@/lib/phonics/progress";

/** Sound It Out: practise blending words made from every sound learnt so far. */
export default function SoundItOutPage() {
  return (
    <LearnToReadGate open={(reading) => openUnits(reading).length > 0} notOpen="Learn some sounds first.">
      {({ reading, setProfile }) => (
        <LessonRunner
          title="Sound It Out"
          backHref="/read"
          backLabel="Learn to Read"
          build={() => buildBlendPractice(reading)}
          onComplete={(r) =>
            setProfile((p) => {
              const next = recordBlending(readingOf(p), r.right, r.total);
              return { ...p, reading: r.readIt ? { ...next, readAloud: next.readAloud + 1 } : next };
            })
          }
          finished={(_r, again) => (
            <div className="row" style={{ justifyContent: "center" }}>
              <button className="btn" onClick={again}>
                More words
              </button>
              <Link className="btn secondary" href="/read">
                Learn to Read
              </Link>
            </div>
          )}
        />
      )}
    </LearnToReadGate>
  );
}
