"use client";

import Link from "next/link";
import { Suni } from "@/components/Suni";
import { useProfile } from "@/components/useProfile";
import {
  currentSightLevel,
  currentUnit,
  formatReadingAge,
  isOpen,
  isSightOpen,
  openUnits,
  READING_AGE_CUTOFF,
  readingOf,
  sightLevelsDone,
  unitsDone,
} from "@/lib/phonics/progress";
import { SIGHT_LEVELS } from "@/lib/phonics/sightWords";
import { UNITS } from "@/lib/phonics/sequence";

/** The Learn to Read program: the sounds in order, sight words in levels, and Sound It Out practice. */
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
          Learn to Read is our phonics program for students with a reading age below {READING_AGE_CUTOFF}. It teaches letter sounds, how to
          blend them into words, and sight words.
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
  const nextSight = currentSightLevel(reading);
  const sightDone = sightLevelsDone(reading);
  const blending = reading.blending;
  const canBlend = openUnits(reading).length > 0;
  return (
    <div className="stack">
      <div className="row" style={{ gap: 16, flexWrap: "nowrap" }}>
        <Suni size={84} wave />
        <div>
          <h1>Learn to Read</h1>
          <p className="muted" style={{ margin: 0 }}>
            {next ? `Next sounds: ${next.title.replace(/_/g, "–")}.` : "You've learnt every sound!"}{" "}
            {nextSight ? `Next sight words: ${nextSight.title}.` : "You know every sight word!"}
          </p>
        </div>
      </div>
      <div className="progress" aria-label={`${done + sightDone} of ${UNITS.length + SIGHT_LEVELS.length} parts done`}>
        <div style={{ width: `${((done + sightDone) / (UNITS.length + SIGHT_LEVELS.length)) * 100}%` }} />
      </div>
      {next && (
        <Link className="btn big-start" href={`/read/${next.id}`}>
          Start: {next.title.replace(/_/g, "–")}
        </Link>
      )}
      {!next && nextSight && (
        <Link className="btn big-start" href={`/read/words/${nextSight.id}`}>
          Start: sight words {nextSight.title}
        </Link>
      )}
      <section className="stack" style={{ gap: 12 }}>
        <h2>Sounds</h2>
        {[...new Set(UNITS.map((u) => u.group))].map((group) => (
          <section key={group} className="stack" style={{ gap: 8 }}>
            <h3 className="unit-group">{group}</h3>
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
      </section>
      <section className="stack" style={{ gap: 8 }}>
        <h2>Sight words</h2>
        <p className="muted" style={{ margin: 0 }}>
          Words we read on sight, like &ldquo;said&rdquo; and &ldquo;was&rdquo;. {sightDone} of {SIGHT_LEVELS.length} levels done.
        </p>
        <div className="unit-path">
          {SIGHT_LEVELS.map((l) => {
            const progress = reading.units[l.id];
            const preview = l.words
              .slice(0, 3)
              .map((w) => w.word)
              .join(" ");
            return isSightOpen(reading, l.id) ? (
              <Link
                key={l.id}
                href={`/read/words/${l.id}`}
                className={`unit-tile sight-tile ${progress?.mastered ? "done" : ""} ${nextSight?.id === l.id ? "next" : ""}`}
              >
                <span className="unit-sounds">{l.title}</span>
                <span className="unit-words">{preview} …</span>
                <span className="small">{progress?.mastered ? "⭐ Done" : nextSight?.id === l.id ? "Up next" : "Practise"}</span>
              </Link>
            ) : (
              <div key={l.id} className="unit-tile sight-tile locked" aria-label={`Sight words ${l.title}, not open yet`}>
                <span className="unit-sounds">{l.title}</span>
                <span className="small">🔒 Not yet</span>
              </div>
            );
          })}
        </div>
      </section>
      <section className="stack" style={{ gap: 8 }}>
        <h2>Sound It Out</h2>
        <p className="muted" style={{ margin: 0 }}>
          {canBlend
            ? `Sound out words made from every sound learnt so far.${blending.sessions ? ` ${blending.right} of ${blending.asked} words read right in ${blending.sessions} ${blending.sessions === 1 ? "go" : "goes"}.` : ""}`
            : "Learn some sounds first, then practise blending them into words here."}
        </p>
        {canBlend && (
          <div className="row">
            <Link className="btn secondary" href="/read/blend">
              Practise Sound It Out
            </Link>
          </div>
        )}
      </section>
      <div className="row">
        <Link className="btn secondary small" href="/read/check">
          Reading check
        </Link>
        {reading.age !== null && <span className="muted small">Reading age at the last check: {formatReadingAge(reading.age)}</span>}
      </div>
    </div>
  );
}
