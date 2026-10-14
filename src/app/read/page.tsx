"use client";

import Link from "next/link";
import { Suni } from "@/components/Suni";
import { useProfile } from "@/components/useProfile";
import { currentUnit, formatReadingAge, isOpen, READING_AGE_CUTOFF, readingOf, unitsDone } from "@/lib/phonics/progress";
import { UNITS } from "@/lib/phonics/sequence";

/** The Learn to Read program: the sounds in order, with the next one to practise. */
export default function ReadPage() {
  const { profile, loaded } = useProfile();
  if (!loaded) return null;
  if (!profile) {
    return (
      <div className="card narrow stack">
        <h1>Learn to Read</h1>
        <p>Set up a learner first.</p>
        <Link className="btn" href="/learn">
          Set up
        </Link>
      </div>
    );
  }

  const reading = readingOf(profile);
  if (!reading.enrolled) {
    return (
      <div className="card narrow stack">
        <h1>Learn to Read</h1>
        <p>
          Learn to Read is our phonics program for students with a reading age below {READING_AGE_CUTOFF}. It teaches letter sounds and how
          to blend them into words.
        </p>
        <p className="muted" style={{ margin: 0 }}>
          {reading.age === null
            ? `Do the reading check to see if it's right for ${profile.name}.`
            : `${profile.name}'s reading age is ${formatReadingAge(reading.age)}, so they don't need it. A grown-up can still turn it on from the Parents page.`}
        </p>
        <div className="row">
          <Link className="btn" href="/read/check">
            {reading.age === null ? "Do the reading check" : "Do the reading check again"}
          </Link>
          <Link className="btn secondary" href="/learn">
            Back to Learn
          </Link>
        </div>
      </div>
    );
  }

  const next = currentUnit(reading);
  const done = unitsDone(reading);
  return (
    <div className="stack">
      <div className="row" style={{ gap: 16, flexWrap: "nowrap" }}>
        <Suni size={84} wave />
        <div>
          <h1>Learn to Read</h1>
          <p className="muted" style={{ margin: 0 }}>
            {next ? `Next up: ${next.title}.` : "You've learnt every sound! Try the reading check again."} {done} of {UNITS.length} done.
          </p>
        </div>
      </div>
      <div className="progress" aria-label={`${done} of ${UNITS.length} sound groups done`}>
        <div style={{ width: `${(done / UNITS.length) * 100}%` }} />
      </div>
      {next && (
        <Link className="btn big-start" href={`/read/${next.id}`}>
          Start: {next.title}
        </Link>
      )}
      {[...new Set(UNITS.map((u) => u.group))].map((group) => (
        <section key={group} className="stack" style={{ gap: 8 }}>
          <h2 className="unit-group">{group}</h2>
          <div className="unit-path">
            {UNITS.filter((u) => u.group === group).map((u) => {
              const progress = reading.units[u.id];
              const title = u.title.replace(/_/g, "–");
              return isOpen(reading, u.id) ? (
                <Link
                  key={u.id}
                  href={`/read/${u.id}`}
                  className={`unit-tile ${progress?.mastered ? "done" : ""} ${next?.id === u.id ? "next" : ""}`}
                >
                  <span className="unit-sounds">{title}</span>
                  <span className="unit-pics" aria-hidden>
                    {u.sounds.map((x) => x.emoji).join(" ")}
                  </span>
                  <span className="small">{progress?.mastered ? "⭐ Done" : next?.id === u.id ? "Up next" : "Practise"}</span>
                </Link>
              ) : (
                <div key={u.id} className="unit-tile locked" aria-label={`${u.title}, not open yet`}>
                  <span className="unit-sounds">{title}</span>
                  <span className="small">🔒 Not yet</span>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <div className="row">
        <Link className="btn secondary small" href="/read/check">
          Reading check
        </Link>
        {reading.age !== null && <span className="muted small">Reading age at the last check: {formatReadingAge(reading.age)}</span>}
      </div>
    </div>
  );
}
