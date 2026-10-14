"use client";

import { useMemo, useState } from "react";
import { QuestionView, type QuestionOutcome } from "@/components/QuestionView";
import { questionFocus, useSuniFocus, useSuniSay } from "@/components/SuniCompanion";
import type { useProfile } from "@/components/useProfile";
import { practiceOrder, progressKey, toPracticeQuestion } from "@/lib/content/practice";
import { questionsOf } from "@/lib/content/tree";
import type { Subtopic } from "@/lib/content/types";
import { getOutcome } from "@/lib/curriculum/outcomes";
import { getSkill } from "@/lib/curriculum/skills";
import { recordAttempt, skillState, type LearnerProfile } from "@/lib/learner/model";
import { answerText, generateQuestion } from "@/lib/practice";
import { Rng, randomSeed } from "@/lib/practice/rng";

/** Practice on one subtopic the student picked from the topic tree. */
export function FocusedPractice({
  subtopic,
  profile,
  setProfile,
}: {
  subtopic: Subtopic;
  profile: LearnerProfile;
  setProfile: ReturnType<typeof useProfile>["setProfile"];
}) {
  const key = progressKey(subtopic);
  const skill = subtopic.skill_id ? getSkill(subtopic.skill_id) : null;
  const written = useMemo(() => questionsOf(subtopic.id), [subtopic.id]);

  const [seed, setSeed] = useState(randomSeed);
  // Written questions come first, easiest to hardest, and all of them before any repeats.
  // A subtopic with a skill then carries on with fresh generated questions.
  const [order, setOrder] = useState(() => practiceOrder(written, new Rng(randomSeed())));
  const [position, setPosition] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [session, setSession] = useState({ done: 0, correct: 0 });
  const [justMastered, setJustMastered] = useState(false);

  const question = useMemo(
    () => (position < order.length ? toPracticeQuestion(written[order[position]], seed) : generateQuestion(skill!.id, seed)),
    [skill, written, order, position, seed],
  );
  const state = skillState(profile, key);
  const say = useSuniSay();
  useSuniFocus(
    questionFocus({
      profile,
      setProfile,
      progressKey: key,
      title: subtopic.title,
      question,
      correctAnswer: answerText(question.answer, question.choices),
      answered,
      hintsShown,
    }),
  );

  function onDone(o: QuestionOutcome) {
    const wasMastered = skillState(profile, key).mastered;
    // As in adaptive practice, only a first-try answer counts towards mastery.
    const updated = recordAttempt(profile, key, o.correct && o.firstTry, o.hintsUsed);
    setProfile(updated);
    setSession((s) => ({ done: s.done + 1, correct: s.correct + (o.correct ? 1 : 0) }));
    if (!wasMastered && skillState(updated, key).mastered) {
      setJustMastered(true);
      say(`Buzz-tastic! You've mastered ${subtopic.title.charAt(0).toLowerCase() + subtopic.title.slice(1)}!`);
    } else if (!o.correct) say("That one was tricky. Tap me and we can go through it together.");
  }

  function next() {
    setJustMastered(false);
    setHintsShown(0);
    setAnswered(false);
    setSeed(randomSeed());
    if (position + 1 < order.length || skill) setPosition(position + 1);
    else {
      // Start a new round, without repeating the question that was just shown.
      let fresh = practiceOrder(written, new Rng(randomSeed()));
      if (fresh.length > 1 && fresh[0] === order[position]) fresh = [...fresh.slice(1), fresh[0]];
      setOrder(fresh);
      setPosition(0);
    }
  }

  const outcome = skill ? getOutcome(skill.outcome) : null;

  return (
    <div className="stack">
      <div className="row spread">
        <div>
          {outcome && (
            <span className="pill" title={outcome.codeVerified ? "" : "Outcome code still to be confirmed against the syllabus"}>
              {outcome.code}
            </span>
          )}
          <h1 style={{ marginTop: outcome ? 8 : 0 }}>{subtopic.title}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {subtopic.description}
          </p>
        </div>
        <div className="small muted" aria-label="Session progress">
          This session: {session.correct} of {session.done} correct
          <div className="progress" style={{ width: 160, marginTop: 6 }}>
            <div style={{ width: `${Math.round(state.mastery * 100)}%` }} />
          </div>
          {state.mastered ? "Mastered" : `Strength ${Math.round(state.mastery * 100)}%`}
        </div>
      </div>

      {justMastered && (
        <div className="feedback good">
          <strong>You've mastered {subtopic.title}!</strong> Keep going, or pick another topic.
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
    </div>
  );
}
