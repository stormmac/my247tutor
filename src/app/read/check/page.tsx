"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Suni } from "@/components/Suni";
import { useSuniScreen } from "@/components/SuniCompanion";
import { useProfile } from "@/components/useProfile";
import { useSuniVoice } from "@/components/useSuniVoice";
import { inSentence } from "@/lib/tutor/speech";
import {
  answerCheck,
  CHECK_WORDS,
  formatReadingAge,
  READING_AGE_CUTOFF,
  readingOf,
  recordCheck,
  startCheck,
  type ReadingProgress,
} from "@/lib/phonics/progress";

function shuffled(options: string[]): string[] {
  const out = [...options];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The reading check: Suni says a word, the student finds it. It works out their reading age. */
export default function ReadingCheckPage() {
  const { profile, setProfile, loaded } = useProfile();
  const voice = useSuniVoice();
  const [started, setStarted] = useState(false);
  const [state, setState] = useState(startCheck);
  const [result, setResult] = useState<ReadingProgress | null>(null);
  const item = CHECK_WORDS[state.index];
  const options = useMemo(() => (item ? shuffled(item.options) : []), [item]);

  const { sayWord } = voice;
  useSuniScreen(
    started && item && !state.done
      ? { screen: `The reading check: Suni says a word and they tap it. Word ${state.index + 1} of ${CHECK_WORDS.length}.`, noHelp: true }
      : { screen: result ? "The reading check, finished, showing their reading age." : "The start of the reading check." },
  );
  useEffect(() => {
    if (started && item && !state.done) sayWord(item.word, "Find the word.");
  }, [started, item, state.done, sayWord]);

  if (!loaded) return null;
  if (!profile) {
    return (
      <div className="card narrow stack">
        <h1>Reading check</h1>
        <p>Set up a learner first.</p>
        <Link className="btn" href="/learn">
          Set up
        </Link>
      </div>
    );
  }

  function answer(choice: string) {
    if (!item) return;
    const next = answerCheck(state, choice === item.word);
    setState(next);
    if (next.done) {
      const reading = recordCheck(readingOf(profile!), next.right);
      setProfile((p) => ({ ...p, reading: recordCheck(readingOf(p), next.right) }));
      setResult(reading);
      voice.stop();
    }
  }

  if (result && result.age !== null) {
    const joining = result.age < READING_AGE_CUTOFF;
    return (
      <div className="card narrow stack" style={{ textAlign: "center" }}>
        <div style={{ display: "grid", placeItems: "center" }}>
          <Suni size={110} wave />
        </div>
        <h1>{joining ? `Well done, ${profile.name}!` : `Great reading, ${profile.name}!`}</h1>
        <p style={{ fontSize: 20, margin: 0 }}>
          Reading age: <strong>{formatReadingAge(result.age)}</strong>
        </p>
        <p className="muted" style={{ margin: 0 }}>
          {joining
            ? "Learn to Read will help you with letter sounds and blending them into words. Let's start!"
            : result.enrolled
              ? "A grown-up has kept Learn to Read on for you, so you can keep practising sounds."
              : "You're reading well, so you can keep going with Maths and English."}
        </p>
        <div className="row" style={{ justifyContent: "center" }}>
          {result.enrolled ? (
            <Link className="btn" href="/read">
              Start Learn to Read
            </Link>
          ) : (
            <Link className="btn" href="/learn">
              Back to Learn
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (!started) {
    const before = readingOf(profile);
    return (
      <div className="card narrow stack">
        <div className="row" style={{ gap: 14, flexWrap: "nowrap" }}>
          <Suni size={80} wave />
          <h1 style={{ margin: 0 }}>Reading check</h1>
        </div>
        <p>
          Suni will say a word. Find it and tap it. The words start easy and get harder, and it stops when they get too tricky. It takes
          about three minutes.
        </p>
        <p className="muted small" style={{ margin: 0 }}>
          For grown-ups: this estimates {profile.name}&apos;s reading age. Below {READING_AGE_CUTOFF} years, {profile.name} joins Learn to
          Read, our phonics program for learning to read.
          {before.age !== null && ` Last time: ${formatReadingAge(before.age)}.`}
          {voice.supported ? " Turn the sound up." : " This device can't speak, so a grown-up will need to read each word out."}
        </p>
        <button className="btn" onClick={() => setStarted(true)}>
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="card narrow stack" style={{ textAlign: "center" }}>
      <p className="muted small" style={{ margin: 0 }}>
        Word {state.index + 1}
      </p>
      <h1 style={{ margin: 0 }}>Find the word</h1>
      {!voice.supported && <p style={{ fontSize: 22, margin: 0 }}>Grown-up, say: &ldquo;{item?.word}&rdquo;</p>}
      <div className="row" style={{ justifyContent: "center" }}>
        <button className="btn secondary" onClick={() => item && voice.sayWord(item.word)} aria-label="Hear the word again">
          🔊 Hear it again
        </button>
        <button className="btn secondary" onClick={() => item && voice.say(inSentence(item.word, item.sentence), true)}>
          💬 Hear it in a sentence
        </button>
      </div>
      <div className="word-choices">
        {options.map((o) => (
          <button key={o} className="choice word-choice" onClick={() => answer(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
