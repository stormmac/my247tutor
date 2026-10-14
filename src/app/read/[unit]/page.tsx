"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ReadAloud } from "@/components/ReadAloud";
import { Suni } from "@/components/Suni";
import { useProfile } from "@/components/useProfile";
import { useSuniVoice } from "@/components/useSuniVoice";
import { buildLesson, currentUnit, isOpen, PASS_MARK, readingOf, recordLesson, type LessonStep } from "@/lib/phonics/progress";
import { getUnit, soundFor, type Sound } from "@/lib/phonics/sequence";

const PRAISE = ["Yes!", "Great!", "Well done!", "That's it!", "Brilliant!"];

/** One Learn to Read lesson: meet the sounds, find them, read words, then read a sentence aloud. */
export default function LessonPage() {
  const { unit: unitId } = useParams<{ unit: string }>();
  const unit = getUnit(unitId);
  const { profile, setProfile, loaded } = useProfile();
  const voice = useSuniVoice();
  const { say } = voice;
  const [round, setRound] = useState(0);
  // A new set of questions each time round.
  const steps = useMemo(() => (unit ? buildLesson(unit.id) : []), [unit, round]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [finished, setFinished] = useState<{ right: number; total: number; passed: boolean } | null>(null);
  const step = steps[index];
  const questions = steps.filter((s) => s.kind !== "meet" && s.kind !== "read").length;

  // Suni gives each step's instruction aloud as it appears.
  useEffect(() => {
    if (!step || finished) return;
    if (step.kind === "meet") say(`Let's learn some sounds. Tap each one to hear it.`);
    if (step.kind === "find") say(`Find the sound ${step.sound.say}`, true);
    if (step.kind === "picture") say("Sound out the word, then find its picture.");
    if (step.kind === "listen") say(`Find the word ${step.word.word}`, true);
    if (step.kind === "read") say("Now read this sentence out loud.");
  }, [step, finished, say]);

  if (!unit) return <p>We couldn&apos;t find those sounds.</p>;
  if (!loaded) return null;
  if (!profile) {
    return (
      <div className="card narrow stack">
        <p>Set up a learner first.</p>
        <Link className="btn" href="/learn">
          Set up
        </Link>
      </div>
    );
  }
  const reading = readingOf(profile);
  if (!reading.enrolled || !isOpen(reading, unit.id)) {
    return (
      <div className="card narrow stack">
        <p>{reading.enrolled ? "Finish the sounds before these first." : "Learn to Read isn't turned on for you yet."}</p>
        <Link className="btn" href="/read">
          Back to Learn to Read
        </Link>
      </div>
    );
  }

  function answer(choice: string, correct: string) {
    if (picked) return;
    setPicked(choice);
    const ok = choice === correct;
    if (ok) setRight((r) => r + 1);
    say(ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : `Not quite. It's ${correct}.`, true);
  }

  function next(extra?: { readIt: boolean }) {
    setPicked(null);
    if (index + 1 < steps.length) return setIndex(index + 1);
    const total = questions;
    setProfile((p) => {
      const r = recordLesson(readingOf(p), unit!.id, right, total);
      return { ...p, reading: extra?.readIt ? { ...r, readAloud: r.readAloud + 1 } : r };
    });
    const passed = right / total >= PASS_MARK;
    setFinished({ right, total, passed });
    say(passed ? `Amazing, ${profile!.name}! You know these sounds.` : "Good practice! Let's try these sounds again to get even better.");
  }

  function again() {
    setRound((r) => r + 1);
    setIndex(0);
    setRight(0);
    setPicked(null);
    setFinished(null);
  }

  if (finished) {
    // The profile already has this lesson saved, so the current unit is the next one to learn.
    const after = currentUnit(reading);
    const nextUnit = finished.passed && after && after.id !== unit.id ? after : null;
    const stars = Math.round((finished.right / finished.total) * 3);
    return (
      <div className="card narrow stack" style={{ textAlign: "center" }}>
        <div style={{ display: "grid", placeItems: "center" }}>
          <Suni size={110} wave />
        </div>
        <div className="stars" aria-label={`${stars} of 3 stars`}>
          {"⭐".repeat(stars)}
          <span className="muted">{"☆".repeat(3 - stars)}</span>
        </div>
        <h1>{finished.passed ? "You did it!" : "Good practice!"}</h1>
        <p style={{ margin: 0 }}>
          {finished.right} out of {finished.total} right.
          {finished.passed ? " These sounds are done." : ` Get ${Math.ceil(PASS_MARK * finished.total)} right to finish them.`}
        </p>
        <div className="row" style={{ justifyContent: "center" }}>
          {nextUnit ? (
            <Link className="btn" href={`/read/${nextUnit.id}`} onClick={again}>
              Next sounds: {nextUnit.title.replace(/_/g, "–")}
            </Link>
          ) : null}
          <button className={nextUnit ? "btn secondary" : "btn"} onClick={again}>
            Practise again
          </button>
          <Link className="btn secondary" href="/read">
            All sounds
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="stack lesson">
      <div className="row spread">
        <Link href="/read" className="small">
          ← Learn to Read
        </Link>
        <span className="muted small">
          {unit.title.replace(/_/g, "–")} · step {index + 1} of {steps.length}
        </span>
      </div>
      <div className="progress" aria-hidden>
        <div style={{ width: `${(index / steps.length) * 100}%` }} />
      </div>
      <div className="card stack lesson-card">{step && <Step step={step} picked={picked} onAnswer={answer} onNext={next} say={say} />}</div>
      {!voice.supported && (
        <p className="muted small">This device can&apos;t speak, so a grown-up will need to say the sounds and words.</p>
      )}
    </div>
  );
}

function Step({
  step,
  picked,
  onAnswer,
  onNext,
  say,
}: {
  step: LessonStep;
  picked: string | null;
  onAnswer: (choice: string, correct: string) => void;
  onNext: (extra?: { readIt: boolean }) => void;
  say: (text: string, force?: boolean) => void;
}) {
  const nextButton = picked && (
    <div className="row" style={{ justifyContent: "center" }}>
      <button className="btn" onClick={() => onNext()} autoFocus>
        Next
      </button>
    </div>
  );
  const choiceClass = (option: string, correct: string) =>
    `choice tile-choice ${picked ? (option === correct ? "right" : option === picked ? "wrong" : "") : ""}`;

  switch (step.kind) {
    case "meet":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>New sounds</h1>
          <div className="sound-cards">
            {step.sounds.map((s: Sound, i) => (
              <button
                key={`${s.grapheme}-${i}`}
                className="sound-card"
                onClick={() => say(`${s.say}. ${s.say}, as in ${s.example}`, true)}
                aria-label={`${s.grapheme}, as in ${s.example}. Tap to hear it.`}
              >
                <span className="sound-grapheme">{s.grapheme.replace("_", "–")}</span>
                <span className="sound-emoji" aria-hidden>
                  {s.emoji}
                </span>
                <span className="small muted">{s.example}</span>
              </button>
            ))}
          </div>
          <p className="muted" style={{ textAlign: "center", margin: 0 }}>
            Tap each sound to hear it, and say it with Suni.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn" onClick={() => onNext()}>
              I know them
            </button>
          </div>
        </>
      );
    case "find":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Which sound?</h1>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn secondary" onClick={() => say(step.sound.say, true)}>
              🔊 Hear the sound
            </button>
          </div>
          <div className="tile-choices">
            {step.options.map((o) => (
              <button
                key={o}
                className={choiceClass(o, step.sound.grapheme)}
                onClick={() => onAnswer(o, step.sound.grapheme)}
                disabled={!!picked}
              >
                {o.replace("_", "–")}
              </button>
            ))}
          </div>
          {picked && (
            <p className="muted" style={{ textAlign: "center", margin: 0 }}>
              {step.sound.emoji} {step.sound.grapheme.replace("_", "–")} as in {step.sound.example}
            </p>
          )}
          {nextButton}
        </>
      );
    case "picture":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Sound it out</h1>
          <div className="blend-tiles" aria-label={`The word ${step.word.word}`}>
            {step.parts.map((part, i) => {
              const sound = soundFor(step.word.word, i, step.parts);
              return (
                <button
                  key={i}
                  className={`blend-tile ${sound ? "" : "silent"}`}
                  onClick={() => sound && say(sound, true)}
                  aria-label={sound ? `Hear ${part}` : `${part} is silent`}
                >
                  {part}
                </button>
              );
            })}
          </div>
          <p className="muted" style={{ textAlign: "center", margin: 0 }}>
            Tap each sound, then blend them together. Which picture is it?
          </p>
          <div className="picture-choices">
            {step.options.map((o) => (
              <button
                key={o.word}
                className={`${choiceClass(o.word, step.word.word)} picture-choice`}
                onClick={() => {
                  onAnswer(o.word, step.word.word);
                }}
                disabled={!!picked}
                aria-label={picked ? o.word : "A picture"}
              >
                <span aria-hidden>{o.emoji}</span>
                {picked && <span className="small">{o.word}</span>}
              </button>
            ))}
          </div>
          {picked && (
            <div className="row" style={{ justifyContent: "center" }}>
              <button className="btn secondary small" onClick={() => say(step.word.word, true)}>
                🔊 Hear {step.word.word}
              </button>
            </div>
          )}
          {nextButton}
        </>
      );
    case "listen":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Find the word</h1>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn secondary" onClick={() => say(step.word.word, true)}>
              🔊 Hear the word
            </button>
          </div>
          <div className="tile-choices words">
            {step.options.map((o) => (
              <button key={o} className={choiceClass(o, step.word.word)} onClick={() => onAnswer(o, step.word.word)} disabled={!!picked}>
                {o}
              </button>
            ))}
          </div>
          {nextButton}
        </>
      );
    case "read":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Read it out loud</h1>
          <ReadAloud sentence={step.sentence} onDone={(readIt) => onNext({ readIt })} />
        </>
      );
  }
}
