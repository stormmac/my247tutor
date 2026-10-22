"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ReadAloud } from "@/components/ReadAloud";
import { SayTheSound } from "@/components/SayTheSound";
import { Suni } from "@/components/Suni";
import { useSuniScreen } from "@/components/SuniCompanion";
import { useSuniVoice } from "@/components/useSuniVoice";
import { PASS_MARK, SCORED, type LessonStep, type Syllable } from "@/lib/phonics/progress";
import { ColourIn } from "@/components/ColourIn";
import { graphemesOf, soundAt, type Sound } from "@/lib/phonics/sequence";
import { inSentence, type SpeechPart } from "@/lib/tutor/speech";

const PRAISE = ["Yes!", "Great!", "Well done!", "That's it!", "Brilliant!"];

export interface LessonResult {
  right: number;
  total: number;
  passed: boolean;
  /** They read the sentence at the end aloud. */
  readIt: boolean;
}

/** A phonics sound on its own, said as the sound it makes rather than the letter's name. */
const soundPart = (s: Sound): SpeechPart => ({ text: s.say, ipa: s.ipa, word: true });
const syllablePart = (s: Syllable): SpeechPart => ({ text: s.say, ipa: s.ipa, word: true });
const wordPart = (word: string): SpeechPart => ({ text: word, word: true });

/** A blending drill said the way a teacher says it: f, a, fa, fat, fa, fan. */
function drillSpeech(step: Extract<LessonStep, { kind: "drill" }>): SpeechPart[] {
  return [
    ...step.parts.map(soundPart),
    syllablePart(step.syllable),
    ...step.words.flatMap((w, i) => [...(i ? [syllablePart(step.syllable)] : []), wordPart(w)]),
  ];
}

/** What Suni says as each step appears. */
function instruction(step: LessonStep): [string | SpeechPart[], boolean] {
  switch (step.kind) {
    case "meet":
      return ["Let's learn some sounds. Tap each one to hear it.", false];
    case "say":
      return ["Now you say them! Hold the microphone, say the sound, then let go.", false];
    case "meetWords":
      return ["Let's learn some new words. Tap each one to hear it.", false];
    case "find":
      return [[{ text: "Find the sound" }, soundPart(step.sound)], true];
    case "picture":
      return ["Sound out the word, then find its picture.", false];
    case "listen":
      return [[{ text: "Find the word." }, { text: step.word.word, word: true }], true];
    case "gap":
      return [step.sentence.replace("___", step.word), true];
    case "read":
      return ["Now read this sentence out loud.", false];
    case "soundWords":
      return ["Here are some words with our new sounds. Tap each one to hear it.", false];
    case "drill":
      return [[{ text: "Listen, then say it with me." }, ...drillSpeech(step)], false];
    case "story":
      return ["Story time! Read the story, or tap to hear me read it.", false];
    case "question":
      return [step.question, true];
    case "colour":
      return ["Now colour in the picture from the story.", false];
  }
}

/** What's on screen at a step, for Suni. The answer is included so Suni can guide without telling it. */
export function describeStep(step: LessonStep, answered: boolean): string {
  const reveal = answered
    ? "They have answered, so you can talk about it."
    : "They haven't answered yet: help them sound it out, don't tell them.";
  switch (step.kind) {
    case "meet":
      return `Meeting new sounds: ${step.sounds.map((s) => `"${s.grapheme}" as in ${s.example}`).join(", ")}.`;
    case "say":
      return `Saying the new sounds into the microphone, holding the button down: ${step.sounds.map((s) => `"${s.grapheme}" as in ${s.example}`).join(", ")}. Encourage them; it isn't marked.`;
    case "meetWords":
      return `Meeting new sight words: ${step.words.join(", ")}.`;
    case "find":
      return `Finding how the sound "${step.sound.grapheme}" (as in ${step.sound.example}) is written, from: ${step.options.join(", ")}. ${reveal}`;
    case "picture":
      return `Sounding out the word "${step.word.word}" (${step.parts.join("-")}) and picking its picture. ${reveal}`;
    case "listen":
      return `Suni said the word "${step.word.word}"; they pick it from: ${step.options.join(", ")}. ${reveal}`;
    case "gap":
      return `Filling the gap in "${step.sentence}" from: ${step.options.join(", ")}. The missing word is "${step.word}". ${reveal}`;
    case "read":
      return `Reading this sentence out loud: "${step.sentence}".`;
    case "soundWords":
      return `Hearing words with the new sounds: ${step.groups.map((g) => `${g.sound.grapheme} (${g.words.map((w) => w.word).join(", ")})`).join("; ")}.`;
    case "drill":
      return `Blending practice: ${step.parts.map((p) => p.grapheme).join(" + ")} makes "${step.syllable.shown}", in ${step.words.join(", ")}.`;
    case "story":
      return `Reading the story "${step.story.title}": ${step.story.sentences.join(" ")}`;
    case "question":
      return `A question about the story "${step.story.title}" (${step.story.sentences.join(" ")}): ${step.question} Choices: ${step.options.join(", ")}. The answer is "${step.answer}". ${reveal}`;
    case "colour":
      return `Colouring in the picture for the story "${step.story.title}".`;
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
  const total = steps.filter((s) => SCORED.includes(s.kind)).length;
  useSuniScreen(
    step && !result
      ? { screen: `Learn to Read: ${title}, step ${index + 1} of ${steps.length}. ${describeStep(step, picked !== null)}` }
      : result
        ? { screen: `Learn to Read: ${title}, finished with ${result.right} of ${result.total} right.` }
        : null,
  );

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
  say: (text: string | SpeechPart[], force?: boolean) => void;
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
                onClick={() => say([soundPart(s), soundPart(s), { text: `as in ${s.example}` }], true)}
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
    case "say":
      return <SayTheSound sounds={step.sounds} compare={step.compare} say={say} onDone={() => onNext()} />;
    case "find":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Which sound?</h1>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn secondary" onClick={() => say([soundPart(step.sound)], true)}>
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
              const sound = soundAt(step.word.word, i, step.parts);
              return (
                <button
                  key={i}
                  className={`blend-tile ${sound ? "" : "silent"}`}
                  onClick={() => sound && say([soundPart(sound)], true)}
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
              <button className="btn secondary small" onClick={() => say([{ text: step.word.word, word: true }], true)}>
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
            <button className="btn secondary" onClick={() => say([{ text: step.word.word, word: true }], true)}>
              🔊 Hear the word
            </button>
            {step.sentence && (
              <button className="btn secondary" onClick={() => say(inSentence(step.word.word, step.sentence!), true)}>
                💬 Hear it in a sentence
              </button>
            )}
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
              <button
                key={w}
                className="sound-card word-card"
                onClick={() => say([{ text: w, word: true }], true)}
                aria-label={`${w}. Tap to hear it.`}
              >
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
    case "soundWords":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Words with our sounds</h1>
          <div className="sound-words">
            {step.groups.map((g, i) => (
              <div key={`${g.sound.grapheme}-${i}`} className="sound-word-row">
                <button
                  className="sound-chip"
                  onClick={() => say([soundPart(g.sound)], true)}
                  aria-label={`Hear the sound ${g.sound.grapheme}`}
                >
                  {g.sound.grapheme.replace("_", "–")}
                </button>
                {g.words.map((w) => (
                  <button key={w.word} className="word-chip" onClick={() => say([wordPart(w.word)], true)}>
                    {w.emoji && <span aria-hidden>{w.emoji} </span>}
                    <Highlighted word={w.word} grapheme={g.sound.grapheme} />
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="muted" style={{ textAlign: "center", margin: 0 }}>
            Tap a word to hear it, then read it with Suni.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn" onClick={() => onNext()}>
              Next
            </button>
          </div>
        </>
      );
    case "drill":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Blend it</h1>
          <div className="drill">
            <div className="row" style={{ justifyContent: "center", gap: 8 }}>
              {step.parts.map((p, i) => (
                <button key={i} className="blend-tile" onClick={() => say([soundPart(p)], true)} aria-label={`Hear ${p.grapheme}`}>
                  {p.grapheme.replace("_e", "")}
                </button>
              ))}
              <span className="drill-arrow" aria-hidden>
                →
              </span>
              <button className="blend-tile drill-syllable" onClick={() => say([syllablePart(step.syllable)], true)}>
                {step.syllable.shown}
              </button>
            </div>
            <div className="row" style={{ justifyContent: "center", gap: 8 }}>
              {step.words.map((w) => (
                <button key={w} className="word-chip big" onClick={() => say([syllablePart(step.syllable), wordPart(w)], true)}>
                  {w}
                </button>
              ))}
            </div>
          </div>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn secondary" onClick={() => say(drillSpeech(step), true)}>
              🔊 Hear it all again
            </button>
            <button className="btn" onClick={() => onNext()}>
              Next
            </button>
          </div>
        </>
      );
    case "story":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>{step.story.title}</h1>
          <div className="story-text">
            {step.story.sentences.map((line, i) => (
              <p key={i} className="read-sentence">
                {line}
              </p>
            ))}
          </div>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn secondary" onClick={() => say(step.story.sentences.join(" "), true)}>
              🔊 Read it to me
            </button>
            <button className="btn" onClick={() => onNext()}>
              I&apos;ve read it
            </button>
          </div>
        </>
      );
    case "question":
      return (
        <>
          <details className="story-peek">
            <summary>Read the story again</summary>
            {step.story.sentences.map((line, i) => (
              <p key={i} style={{ margin: "4px 0" }}>
                {line}
              </p>
            ))}
          </details>
          <h1 style={{ margin: 0, textAlign: "center" }}>{step.question}</h1>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn secondary small" onClick={() => say(step.question, true)}>
              🔊 Hear the question
            </button>
          </div>
          <div className="tile-choices words answers">
            {step.options.map((o) => (
              <button key={o} className={choiceClass(o, step.answer)} onClick={() => onAnswer(o, step.answer)} disabled={!!picked}>
                {o}
              </button>
            ))}
          </div>
          {nextButton}
        </>
      );
    case "colour":
      return (
        <>
          <h1 style={{ margin: 0, textAlign: "center" }}>Colour it in</h1>
          <ColourIn regions={step.story.picture} title={step.story.title} />
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn" onClick={() => onNext()}>
              I&apos;m finished
            </button>
          </div>
        </>
      );
  }
}

/** A word with the letters for a sound in bold, like the "sh" in "ship". */
function Highlighted({ word, grapheme }: { word: string; grapheme: string }) {
  const parts = graphemesOf(word);
  const split = grapheme.includes("_");
  return (
    <>
      {parts.map((p, i) => {
        const strong = split ? i === 1 || (i === parts.length - 1 && p === "e") : p === grapheme;
        return strong ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>;
      })}
    </>
  );
}
