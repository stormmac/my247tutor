"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { QuestionView, type QuestionOutcome } from "@/components/QuestionView";
import { questionFocus, useSuniFocus, useSuniSay } from "@/components/SuniCompanion";
import { useProfile } from "@/components/useProfile";
import { getOutcome } from "@/lib/curriculum/outcomes";
import type { Subject } from "@/lib/curriculum/types";
import { pickNextSkill, recordAttempt, skillState, type LearnerProfile, type NextReason } from "@/lib/learner/model";
import {
  applyPlacement,
  MAX_PROBES,
  nextProbe,
  placementDone,
  recordProbe,
  startPlacement,
  type PlacementState,
} from "@/lib/learner/placement";
import { answerText, generateQuestion } from "@/lib/practice";
import { randomSeed } from "@/lib/practice/rng";

const REASON_LABEL: Record<NextReason, string> = {
  review: "Quick review",
  continue: "Keep going",
  new: "New skill",
  stretch: "Challenge",
  revise: "Revision",
};

export default function SubjectPage() {
  const { subject } = useParams<{ subject: string }>();
  const { profile, setProfile, loaded } = useProfile();

  if (subject !== "maths" && subject !== "english") return <p>Unknown subject.</p>;
  if (!loaded) return null;
  if (!profile) {
    return (
      <div className="card narrow">
        <p>Set up a learner first.</p>
        <Link className="btn" href="/learn">
          Get started
        </Link>
      </div>
    );
  }
  if (!profile.placementDone[subject]) {
    return <Placement subject={subject} onFinish={(state) => setProfile((p) => applyPlacement(p, state))} />;
  }
  return <Practice subject={subject} profile={profile} setProfile={setProfile} />;
}

function Placement({ subject, onFinish }: { subject: Subject; onFinish: (s: PlacementState) => void }) {
  const [state, setState] = useState(() => startPlacement(subject));
  const [seed, setSeed] = useState(randomSeed);
  // The probe on screen stays put until the student presses Next, even after the check has finished.
  const [probe, setProbe] = useState(() => nextProbe(state));
  const question = useMemo(() => (probe ? generateQuestion(probe, seed) : null), [probe, seed]);

  return (
    <div className="narrow stack" style={{ margin: "0 auto" }}>
      <h1>Quick check: {subject === "maths" ? "Maths" : "English"}</h1>
      <p className="muted">
        Question {Math.min(state.probes.length + 1, MAX_PROBES)} of up to {MAX_PROBES}. Just do your best. Some questions might be tricky,
        and that's fine.
      </p>
      {question && (
        <QuestionView
          key={question.id}
          question={question}
          placement
          onDone={(o) => setState((s) => recordProbe(s, o.correct))}
          onNext={() => {
            if (placementDone(state)) return onFinish(state);
            setProbe(nextProbe(state));
            setSeed(randomSeed());
          }}
        />
      )}
    </div>
  );
}

function Practice({
  subject,
  profile,
  setProfile,
}: {
  subject: Subject;
  profile: LearnerProfile;
  setProfile: ReturnType<typeof useProfile>["setProfile"];
}) {
  const [current, setCurrent] = useState(() => pickNextSkill(profile, subject));
  const [seed, setSeed] = useState(randomSeed);
  const [hintsShown, setHintsShown] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [session, setSession] = useState({ done: 0, correct: 0 });
  const [justMastered, setJustMastered] = useState<string | null>(null);

  const question = useMemo(() => (current ? generateQuestion(current.skill.id, seed) : null), [current, seed]);
  const say = useSuniSay();
  useSuniFocus(
    current && question
      ? questionFocus({
          profile,
          setProfile,
          progressKey: current.skill.id,
          title: current.skill.title,
          question,
          correctAnswer: answerText(question.answer, question.choices),
          answered,
          hintsShown,
        })
      : null,
  );

  if (!current || !question) {
    return (
      <div className="card narrow">
        <h1>Amazing work!</h1>
        <p>You've finished everything here for now.</p>
        <Link className="btn" href="/learn">
          Back
        </Link>
      </div>
    );
  }

  const skill = current.skill;
  const outcome = getOutcome(skill.outcome);
  const state = skillState(profile, skill.id);

  function onDone(o: QuestionOutcome) {
    const wasMastered = skillState(profile, skill.id).mastered;
    // Only the first try counts towards mastery; a second-try success still helps learning.
    const updated = recordAttempt(profile, skill.id, o.correct && o.firstTry, o.hintsUsed);
    setProfile(updated);
    setSession((s) => ({ done: s.done + 1, correct: s.correct + (o.correct ? 1 : 0) }));
    if (!wasMastered && skillState(updated, skill.id).mastered) {
      setJustMastered(skill.title);
      say(`Buzz-tastic! You've mastered ${skill.title.charAt(0).toLowerCase() + skill.title.slice(1)}!`);
    } else if (!o.correct) say("That one was tricky. Tap me and we can go through it together.");
  }

  function next() {
    setJustMastered(null);
    setHintsShown(0);
    setAnswered(false);
    setCurrent(pickNextSkill(profile, subject));
    setSeed(randomSeed());
  }

  return (
    <div className="stack">
      <div className="row spread">
        <div>
          <span className="pill">{REASON_LABEL[current.reason]}</span>{" "}
          <span className="pill" title={outcome.codeVerified ? "" : "Outcome code still to be confirmed against the syllabus"}>
            {outcome.code}
          </span>
          <h1 style={{ marginTop: 8 }}>{skill.title}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {skill.description}
          </p>
        </div>
        <div className="small muted" aria-label="Session progress">
          This session: {session.correct} of {session.done} correct
          <div className="progress" style={{ width: 160, marginTop: 6 }}>
            <div style={{ width: `${Math.round(state.mastery * 100)}%` }} />
          </div>
          Skill strength {Math.round(state.mastery * 100)}%
        </div>
      </div>

      {justMastered && (
        <div className="feedback good">
          <strong>You've mastered {justMastered}!</strong> We'll check back on it in a day or two so it sticks.
        </div>
      )}

      <div className="practice">
        <QuestionView
          key={question.id}
          question={question}
          onDone={onDone}
          onNext={next}
          onHintsChange={setHintsShown}
          onAnsweredChange={setAnswered}
          onTryAgain={() => say("Not quite! Have another go, or tap me for a clue.")}
        />
      </div>
      <p className="small muted">
        Skill from the NSW syllabus, {outcome.focusArea}: {outcome.summary}. <Link href="/learn">Change subject</Link>
      </p>
    </div>
  );
}
