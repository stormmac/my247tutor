"use client";

import { useMemo, useState } from "react";
import { QuestionView, type QuestionOutcome } from "@/components/QuestionView";
import { TutorChat } from "@/components/TutorChat";
import type { useProfile } from "@/components/useProfile";
import { progressKey, toPracticeQuestion } from "@/lib/content/practice";
import { questionsOf } from "@/lib/content/tree";
import type { Subtopic } from "@/lib/content/types";
import { getOutcome } from "@/lib/curriculum/outcomes";
import { getSkill } from "@/lib/curriculum/skills";
import { recordAttempt, skillState, type LearnerProfile } from "@/lib/learner/model";
import { answerText, generateQuestion } from "@/lib/practice";
import { TUTOR_NAME } from "@/lib/tutor/persona";
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
  // Written question sets go through every question in a shuffled order before any repeats.
  const [order, setOrder] = useState(() => new Rng(randomSeed()).shuffle(written.map((_, i) => i)));
  const [position, setPosition] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [session, setSession] = useState({ done: 0, correct: 0 });
  const [justMastered, setJustMastered] = useState(false);

  const question = useMemo(
    () => (skill ? generateQuestion(skill.id, seed) : toPracticeQuestion(written[order[position]], seed)),
    [skill, written, order, position, seed],
  );
  const state = skillState(profile, key);

  function onDone(o: QuestionOutcome) {
    const wasMastered = skillState(profile, key).mastered;
    // As in adaptive practice, only a first-try answer counts towards mastery.
    const updated = recordAttempt(profile, key, o.correct && o.firstTry, o.hintsUsed);
    setProfile(updated);
    setSession((s) => ({ done: s.done + 1, correct: s.correct + (o.correct ? 1 : 0) }));
    if (!wasMastered && skillState(updated, key).mastered) setJustMastered(true);
  }

  function next() {
    setJustMastered(false);
    setHintsShown(0);
    setAnswered(false);
    setSeed(randomSeed());
    if (!skill) {
      if (position + 1 < order.length) setPosition(position + 1);
      else {
        // Start a new round, without repeating the question that was just shown.
        let fresh = new Rng(randomSeed()).shuffle(written.map((_, i) => i));
        if (fresh.length > 1 && fresh[0] === order[position]) fresh = [...fresh.slice(1), fresh[0]];
        setOrder(fresh);
        setPosition(0);
      }
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
        />
        <TutorChat
          key={subtopic.id}
          greeting={`Hi ${profile.name}! I'm ${TUTOR_NAME}. Stuck on ${subtopic.title.charAt(0).toLowerCase() + subtopic.title.slice(1)}? Ask me and we'll work it out together.`}
          context={{
            studentName: profile.name,
            yearLevel: profile.yearLevel,
            skillId: key,
            question: {
              prompt: question.prompt + (question.choices ? ` Options: ${question.choices.join(" / ")}` : ""),
              correctAnswer: answerText(question.answer, question.choices).slice(0, 200),
              answered,
              hintsShown,
              passage: question.passage ? `${question.passage.title}\n${question.passage.text}` : undefined,
            },
          }}
          onWellbeingConcern={(message) =>
            setProfile((p) => ({ ...p, wellbeingFlags: [...p.wellbeingFlags, { at: Date.now(), message }] }))
          }
        />
      </div>
    </div>
  );
}
