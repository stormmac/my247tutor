"use client";

import { doesSubject } from "@/lib/learner/plan";
import Link from "next/link";
import { BackToStudent } from "@/components/BackToStudent";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { usePraise } from "@/components/usePraise";
import { QuestionView, attemptDetails, type QuestionOutcome } from "@/components/QuestionView";
import { questionFocus, useSuniFocus, useSuniSay, useSuniScreen } from "@/components/SuniCompanion";
import { useProfile } from "@/components/useProfile";
import { WeeklyLesson } from "@/components/WeeklyLesson";
import { type Curriculum, curriculumOf, localise, skillStandard, standardName, subjectName } from "@/lib/curriculum/curricula";
import { getOutcome } from "@/lib/curriculum/outcomes";
import { hasSkillPath, type Subject, type YearLevel } from "@/lib/curriculum/types";
import { pickNextSkill, recordAttempt, skillState, type LearnerProfile, type NextReason } from "@/lib/learner/model";
import {
  applyAssessment,
  finishAssessment,
  nextQuestion,
  recordAnswer,
  startAssessment,
  type AssessmentRecord,
} from "@/lib/learner/assessment";
import { toPracticeQuestion } from "@/lib/content/practice";
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
  return (
    <Suspense>
      <SubjectLearning />
    </Suspense>
  );
}

function SubjectLearning() {
  const { subject } = useParams<{ subject: string }>();
  // The weekly lesson is the main path; ?mode=practice is open-ended practice from the skill map.
  const search = useSearchParams();
  const freePractice = search.get("mode") === "practice";
  // ?work=<id> opens that piece of set work in the weekly lesson.
  const startWork = search.get("work") ?? undefined;
  const { profile, setProfile, loaded } = useProfile();
  const [thanks, setThanks] = useState<AssessmentRecord | null>(null);

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
  if (!doesSubject(profile.plan, subject))
    return <NotInPlan name={profile.name} subject={subjectName(subject, curriculumOf(profile.curriculum))} />;
  if (thanks) return <AssessmentThanks name={profile.name} record={thanks} onContinue={() => setThanks(null)} />;
  if (!profile.placementDone[subject]) {
    return (
      <Assessment
        subject={subject}
        name={profile.name}
        yearLevel={profile.yearLevel}
        curriculum={curriculumOf(profile.curriculum)}
        onFinish={(record) => {
          // Saved straight away, so the parent sees the report even if the tab is closed now.
          setProfile((p) => applyAssessment(p, record));
          setThanks(record);
        }}
      />
    );
  }
  // Years 1–2 and 7–8 have no skill path, so free practice is their year's topics instead.
  if (freePractice && hasSkillPath(profile.yearLevel)) return <Practice subject={subject} profile={profile} setProfile={setProfile} />;
  return <WeeklyLesson subject={subject} profile={profile} setProfile={setProfile} startWork={startWork} />;
}

/** The starting assessment: random written questions, from very easy two years below up. */
/** Shown once the check is saved, before practice starts. */
function AssessmentThanks({ name, record, onContinue }: { name: string; record: AssessmentRecord; onContinue: () => void }) {
  return (
    <div className="card narrow stack" style={{ margin: "0 auto" }}>
      <BackToStudent />
      <h1>All done, {name}!</h1>
      <p style={{ margin: 0 }}>
        You answered {record.answers.length} questions. Now we know where to start, so your lessons will be just right for you.
      </p>
      <p className="muted" style={{ margin: 0 }}>
        Your grown-up can see how you went on the Family page.
      </p>
      <button className="btn" onClick={onContinue}>
        See this week&apos;s lesson
      </button>
    </div>
  );
}

/** The starting assessment: random written questions, from very easy two years below up. */
/** The check, then a thank-you before practice starts. */
function AssessmentDone({
  subject,
  profile,
  setProfile,
}: {
  subject: Subject;
  profile: LearnerProfile;
  setProfile: ReturnType<typeof useProfile>["setProfile"];
}) {
  const [finished, setFinished] = useState<AssessmentRecord | null>(null);
  if (finished)
    return (
      <div className="card narrow stack" style={{ margin: "0 auto" }}>
        <BackToStudent />
        <h1>All done, {profile.name}!</h1>
        <p style={{ margin: 0 }}>
          You answered {finished.answers.length} questions. Now we know where to start, so your practice will be just right for you.
        </p>
        <p className="muted" style={{ margin: 0 }}>
          Your grown-up can see how you went on the Family page.
        </p>
        <button className="btn" onClick={() => setProfile((p) => applyAssessment(p, finished))}>
          Start practising
        </button>
      </div>
    );
  return (
    <Assessment
      subject={subject}
      name={profile.name}
      yearLevel={profile.yearLevel}
      curriculum={curriculumOf(profile.curriculum)}
      onFinish={setFinished}
    />
  );
}

function Assessment({
  subject,
  name,
  yearLevel,
  curriculum,
  onFinish,
}: {
  subject: Subject;
  name: string;
  yearLevel: YearLevel;
  curriculum: Curriculum;
  onFinish: (r: AssessmentRecord) => void;
}) {
  const [started, setStarted] = useState(false);
  const [state, setState] = useState(() => startAssessment(subject, yearLevel, curriculum));
  const [question, setQuestion] = useState(() => nextQuestion(state));
  const [seed, setSeed] = useState(randomSeed);
  const practice = useMemo(() => (question ? toPracticeQuestion(question, seed) : null), [question, seed]);
  const title = subjectName(subject, curriculum);
  useSuniScreen({
    screen: started
      ? `The ${title} starting check, question ${state.answers.length + 1}. It finds where they should start, so there are no hints.`
      : `The start of the ${title} starting check.`,
    noHelp: started,
  });

  if (!started)
    return (
      <div className="card narrow stack" style={{ margin: "0 auto" }}>
        <BackToStudent />
        <h1>Starting check: {title}</h1>
        <p style={{ margin: 0 }}>
          Hi {name}! Let&apos;s find the right place for you to start. The first questions are easy, and they get harder as you go. When
          they get too tricky, the check stops by itself.
        </p>
        <p className="muted" style={{ margin: 0 }}>
          There are no hints in the check. Just do your best. It&apos;s fine to get some wrong.
        </p>
        <button className="btn" onClick={() => setStarted(true)}>
          Start
        </button>
      </div>
    );

  return (
    <div className="narrow stack" style={{ margin: "0 auto" }}>
      <BackToStudent />
      <div className="row spread">
        <h1 style={{ margin: 0 }}>Starting check: {title}</h1>
        <span className="pill">Question {state.answers.length + (state.done ? 0 : 1)}</span>
      </div>
      <div className="progress" aria-label="How far through the check">
        <div style={{ width: `${Math.round(((state.passed + 1) / Math.max(1, state.steps.length)) * 100)}%` }} />
      </div>
      {practice && question && (
        <QuestionView
          key={practice.id}
          question={practice}
          placement
          onDone={(o) => setState((s) => recordAnswer(s, question, o.correct, attemptDetails(practice, o)))}
          onNext={() => {
            const next = state.done ? null : nextQuestion(state);
            if (!next) return onFinish(finishAssessment({ ...state, done: true }));
            setQuestion(next);
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
  const praise = usePraise();
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
          screen: `Free ${subjectName(subject, curriculumOf(profile.curriculum))} practice: ${current.skill.title}.`,
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
  const asked = question;
  const outcome = getOutcome(skill.outcome);
  const curriculum = curriculumOf(profile.curriculum);
  const standard = skillStandard(skill.id, curriculum);
  const state = skillState(profile, skill.id);

  function onDone(o: QuestionOutcome) {
    const wasMastered = skillState(profile, skill.id).mastered;
    // Only the first try counts towards mastery; a second-try success still helps learning.
    const updated = recordAttempt(profile, skill.id, o.correct && o.firstTry, o.hintsUsed, Date.now(), attemptDetails(asked, o));
    setProfile(updated);
    setSession((s) => ({ done: s.done + 1, correct: s.correct + (o.correct ? 1 : 0) }));
    if (!wasMastered && skillState(updated, skill.id).mastered) {
      setJustMastered(skill.title);
      say(`Buzz-tastic! You've mastered ${skill.title.charAt(0).toLowerCase() + skill.title.slice(1)}!`);
    } else if (o.correct) say(praise(o, profile.name));
    else say("That one was tricky. Tap me and we can go through it together.");
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
          {standard ? (
            <span className="pill" title={standardName(curriculum)}>
              {standard}
            </span>
          ) : (
            <span className="pill" title={outcome.codeVerified ? "" : "Outcome code still to be confirmed against the syllabus"}>
              {outcome.code}
            </span>
          )}
          <h1 style={{ marginTop: 8 }}>{skill.title}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {skill.description}
          </p>
          <div className="row" style={{ marginTop: 8 }}>
            <BackToStudent />
          </div>
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
        {standard
          ? `${standardName(curriculum)} ${standard}: ${localise(outcome.summary, curriculum)}.`
          : `Skill from the NSW syllabus, ${outcome.focusArea}: ${outcome.summary}.`}{" "}
        <Link href="/learn">Change subject</Link>
      </p>
    </div>
  );
}

/** A subject the child's grown-up has left out of their plan. */
function NotInPlan({ name, subject }: { name: string; subject: string }) {
  return (
    <div className="card narrow stack">
      <h1>
        {subject} isn&apos;t in {name}&apos;s plan
      </h1>
      <p style={{ margin: 0 }}>A grown-up can add it with the Learning plan button on their page.</p>
      <Link className="btn" href="/learn">
        Back to the Student page
      </Link>
    </div>
  );
}
