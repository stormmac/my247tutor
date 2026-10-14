"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ReadAloud } from "@/components/ReadAloud";
import { Suni } from "@/components/Suni";
import { useSuniVoice } from "@/components/useSuniVoice";
import { PASS_MARK, type LessonStep } from "@/lib/phonics/progress";
import { soundFor, type Sound } from "@/lib/phonics/sequence";

const PRAISE = ["Yes!", "Great!", "Well done!", "That's it!", "Brilliant!"];

export interface LessonResult {
  right: number;
  total: number;
  passed: boolean;
  /** They read the sentence at the end aloud. */
  readIt: boolean;
}

/** What Suni says as each step appears. */
function instruction(step: LessonStep): [string, boolean] {
  switch (step.kind) {
    case "meet":
      return ["Let's learn some sounds. Tap each one to hear it.", false];
    case "meetWords":
      return ["Let's learn some new words. Tap each one to hear it.", false];
    case "find":
      return [`Find the sound ${step.sound.say}`, true];
    case "picture":
      return ["Sound out the word, then find its picture.", false];
    case "listen":
      return [`Find the word ${step.word.word}`, true];
    case "gap":
      return [step.sentence.replace("___", step.word), true];
    case "read":
      return ["Now read this sentence out loud.", false];
  }
}

/**
 * Runs a Learn to Read lesson: one step at a time, with Suni saying what to do, then a score with
 * stars. Used for the sound lessons, sight words and Sound It Out.
 */
export function LessonRunner({
  title,
  backHref,
  backLabel,
  build,
  onComplete,
  finished: renderFinished,
}: {
  title: string;
  backHref: string;
  backLabel: string;
  build: () => LessonStep[];
  /** Saves the result. Called once, when the last step is done. */
  onComplete: (result: LessonResult) => void;
  /** What to show after the score: next steps. `again` starts a fresh lesson. */
  finished: (result: LessonResult, again: () => void) => React.ReactNode;
}) {
  const voice = useSuniVoice();
  const { say } = voice;
  const [round, setRound] = useState(0);
  // A new set of questions each time round.
  const steps = useMemo(() => build(), [round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [result, setResult] = useState<LessonResult | null>(null);
  const step = steps[index];
  const total = steps.filter((s) => s.kind !== "meet" && s.kind !== "meetWords" && s.kind !== "read").length;

  useEffect(() => {
    if (!step || result) return;
    const [text, always] = instruction(step);
    say(text, always);
  }, [step, result, say]);

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
    const passed = total > 0 && right / total >= PASS_MARK;
    const done = { right, total, passed, readIt: Boolean(extra?.readIt) };
    onComplete(done);
    setResult(done);
    say(passed ? "Amazing! You did it!" : "Good practice! Let's try again to get even better.");
  }

  function again() {
    setRound((r) => r + 1);
    setIndex(0);
    setRight(0);
    setPicked(null);
    setResult(null);
  }

  if (!steps.length) return <p>There&apos;s nothing to practise here yet.</p>;

  if (result) {
    const stars = result.total ? Math.round((result.right / result.total) * 3) : 0;
    return (
      <div className="card narrow stack" style={{ textAlign: "center" }}>
        <div style={{ display: "grid", placeItems: "center" }}>
          <Suni size={110} wave />
        </div>
        <div className="stars" aria-label={`${stars} of 3 stars`}>
          {"⭐".repeat(stars)}
          <span className="muted">{"☆".repeat(3 - stars)}</span>
        </div>
        <h1>{result.passed ? "You did it!" : "Good practice!"}</h1>
        <p style={{ margin: 0 }}>
          {result.right} out of {result.total} right.
        </p>
        {renderFinished(result, again)}
      </div>
    );
  }

  return (
    <div className="stack lesson">
      <div className="row spread">
        <Link href={backHref} className="small">
          ← {backLabel}
        </Link>
        <span className="muted small">
          {title} · step {index + 1} of {steps.length}
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
    case "meetWords":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>New words</h1>
          <div className="sound-cards">
            {step.words.map((w) => (
              <button key={w} className="sound-card word-card" onClick={() => say(w, true)} aria-label={`${w}. Tap to hear it.`}>
                <span className="sound-grapheme">{w}</span>
              </button>
            ))}
          </div>
          <p className="muted" style={{ textAlign: "center", margin: 0 }}>
            These words are tricky to sound out, so we learn them by sight. Tap each one to hear it, and say it with Suni.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn" onClick={() => onNext()}>
              I know them
            </button>
          </div>
        </>
      );
    case "gap":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Fill the gap</h1>
          <p className="read-sentence gap-sentence">
            {step.sentence.split("___").map((part, i, all) => (
              <span key={i}>
                {part}
                {i < all.length - 1 && <span className="gap">{picked ? step.word : "\u00a0"}</span>}
              </span>
            ))}
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn secondary" onClick={() => say(step.sentence.replace("___", step.word), true)}>
              🔊 Hear the sentence
            </button>
          </div>
          <div className="tile-choices words">
            {step.options.map((o) => (
              <button key={o} className={choiceClass(o, step.word)} onClick={() => onAnswer(o, step.word)} disabled={!!picked}>
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
