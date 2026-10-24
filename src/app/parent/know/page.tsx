"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useProfile } from "@/components/useProfile";
import { CURRICULA, type Curriculum, curriculumOf, outcomesName, subjectName, yearName } from "@/lib/curriculum/curricula";
import { YEARS, type Subject, type YearLevel } from "@/lib/curriculum/types";
import { yearSummary } from "@/lib/content/yearSummary";

const SUBJECTS: Subject[] = ["maths", "english"];

/**
 * What should my child know? A parent picks a subject and a year and sees everything a child should
 * be able to do by the end of that year, topic by topic. It starts on the child's own year.
 */
export default function KnowPage() {
  return (
    <Suspense>
      <Know />
    </Suspense>
  );
}

function Know() {
  const { profile, loaded } = useProfile();
  // The Family page links here with the child's year and curriculum, as a child at a centre isn't the one in this browser.
  const search = useSearchParams();
  const asked = search.get("curriculum");
  const curriculum: Curriculum = CURRICULA.includes(asked as Curriculum) ? (asked as Curriculum) : curriculumOf(profile?.curriculum);
  const askedYear = YEARS.find((y) => String(y) === search.get("year"));
  const [subject, setSubject] = useState<Subject>("maths");
  const [year, setYear] = useState<YearLevel | null>(null);
  useEffect(() => {
    if (loaded && year === null) setYear(askedYear ?? (profile?.yearLevel as YearLevel | undefined) ?? 3);
  }, [loaded, profile, year, askedYear]);
  const childYear = askedYear ?? profile?.yearLevel;
  if (!loaded || year === null) return null;
  const areas = yearSummary(subject, year, curriculum);
  const subjectLabel = subjectName(subject, curriculum);

  return (
    <div className="stack know">
      <div className="row no-print">
        <Link href="/parent" className="btn secondary small">
          ← Family page
        </Link>
      </div>
      <div>
        <h1 style={{ margin: 0 }}>What should my child know?</h1>
        <p className="muted" style={{ margin: "4px 0 0" }}>
          Choose a subject and a year to see what a child should be able to do by the end of it, from the {outcomesName(curriculum)}.
        </p>
      </div>
      <div className="card stack no-print">
        <div className="tabs" role="tablist" aria-label="Subject">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={subject === s}
              className={`tab${subject === s ? " active" : ""}`}
              onClick={() => setSubject(s)}
            >
              {subjectName(s, curriculum)}
            </button>
          ))}
        </div>
        <div className="know-years" role="radiogroup" aria-label="Year">
          {YEARS.map((y) => (
            <button
              key={y}
              type="button"
              role="radio"
              aria-checked={year === y}
              className={`choice ${year === y ? "selected" : ""}`}
              onClick={() => setYear(y)}
            >
              {yearName(y, curriculum)}
              {childYear === y && <span className="small muted"> (now)</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="card stack know-summary">
        <div className="row spread">
          <h2 style={{ margin: 0 }}>
            {subjectLabel}: end of {yearName(year, curriculum)}
          </h2>
          <button type="button" className="btn secondary small no-print" onClick={() => window.print()}>
            Print
          </button>
        </div>
        {areas.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            We don&apos;t have {subjectLabel} for {yearName(year, curriculum)} yet.
          </p>
        ) : (
          <>
            <p style={{ margin: 0 }}>
              By the end of {yearName(year, curriculum)}, a child should be able to do these things in {subjectLabel}:
            </p>
            {areas.map((a) => (
              <section key={a.topic} className="know-area">
                <h3 style={{ margin: 0 }}>{a.topic}</h3>
                <p className="small muted" style={{ margin: "2px 0 6px" }}>
                  {a.about}
                </p>
                <ul>
                  {a.canDo.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
