"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePraise } from "@/components/usePraise";
import { QuestionView, attemptDetails, type QuestionOutcome } from "@/components/QuestionView";
import { questionFocus, useSuniFocus, useSuniSay } from "@/components/SuniCompanion";
import type { useProfile } from "@/components/useProfile";
import { buildLesson } from "@/lib/content/lesson";
import { progressKey, toPracticeQuestion } from "@/lib/content/practice";
import { QUESTIONS, SUBTOPICS } from "@/lib/content/tree";
import type { Subject } from "@/lib/curriculum/types";
import { currentLesson, lessonProgress, nextPart, recordLessonAnswer, saveLesson, type LessonPart } from "@/lib/learner/lesson";
import { recordAttempt, type LearnerProfile } from "@/lib/learner/model";
import { answerText } from "@/lib/practice";
import { randomSeed } from "@/lib/practice/rng";

type SetProfile = ReturnType<typeof useProfile>["setProfile"];

const questionById = (id: string) => QUESTIONS.find((q) => q.id === id);
const subtopicById = (id: string) => SUBTOPICS.find((s) => s.id === id);

function describe(part: LessonPart): string {
  return part.kind === "review"
    ? `${part.questionIds.length} questions from Year ${part.year} to keep earlier skills sharp.`
    : `${part.questionIds.length} questions, easy to hard, on something to work on.`;
}

/** This week's lesson in a subject: the plan, then one part at a time. */
export function WeeklyLesson({ subject, profile, setProfile }: { subject: Subject; profile: LearnerProfile; setProfile: SetProfile }) {
  const lesson = currentLesson(profile, subject);
  // The part being worked on. Fixed while it runs, so the last answer's feedback stays on screen.
  const [running, setRunning] = useState<number | null>(null);

  // A new week (or a first visit) makes a new lesson from how the child is going now.
  useEffect(() => {
    if (!lesson) setProfile((p) => (currentLesson(p, subject) ? p : saveLesson(p, subject, buildLesson(p, subject))));
  }, [lesson, subject, setProfile]);

  if (!lesson) return null;
  const part = nextPart(lesson);
  if (running !== null)
    return (
      <LessonPartView
        key={running}
        subject={subject}
        part={running}
        profile={profile}
        setProfile={setProfile}
        onStop={() => setRunning(null)}
      />
    );

  const title = subject === "maths" ? "Maths" : "English";
  const { done, total } = lessonProgress(lesson);
  const finished = part < 0;
  const monday = new Date(`${lesson.week}T00:00:00`).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="card narrow stack" style={{ margin: "0 auto" }}>
      <h1 style={{ margin: 0 }}>This week&apos;s {title} lesson</h1>
      <p className="muted" style={{ margin: 0 }}>
        For the week starting {monday}. A new lesson is ready every Monday.
      </p>
      <div className="progress" aria-label={`${done} of ${total} questions done`}>
        <div style={{ width: `${Math.round((done / Math.max(1, total)) * 100)}%` }} />
      </div>
      <ol className="stack" style={{ margin: 0, paddingLeft: 20 }}>
        {lesson.parts.map((p, i) => {
          const answered = p.results.length;
          const right = p.results.filter(Boolean).length;
          const complete = answered >= p.questionIds.length;
          return (
            <li key={i}>
              <div className="row spread">
                <strong>{p.title}</strong>
                <span className={`pill${complete ? " good" : ""}`}>
                  {complete ? `Done: ${right} of ${p.questionIds.length} right` : `${answered} of ${p.questionIds.length}`}
                </span>
              </div>
              <div className="small muted">{describe(p)}</div>
            </li>
          );
        })}
      </ol>
      {finished ? (
        <div className="feedback good">
          <strong>Lesson finished, {profile.name}!</strong> Come back on Monday for next week&apos;s lesson.
        </div>
      ) : (
        <button className="btn" onClick={() => setRunning(part)}>
          {done ? "Keep going" : "Start the lesson"}
        </button>
      )}
      <div className="row small">
        <Link href={profile.yearLevel < 3 ? `/learn/${subject}/topics?year=${profile.yearLevel}` : `/learn/${subject}?mode=practice`}>
          Free practice
        </Link>
        <Link href={`/learn/${subject}/topics`}>Browse topics</Link>
      </div>
    </div>
  );
}

/** One part of the lesson, a question at a time. Goes back to the plan when the part is done. */
function LessonPartView({
  subject,
  part,
  profile,
  setProfile,
  onStop,
}: {
  subject: Subject;
  part: number;
  profile: LearnerProfile;
  setProfile: SetProfile;
  onStop: () => void;
}) {
  const lessonPart = currentLesson(profile, subject)!.parts[part];
  // The position shown stays put while the child reads the feedback, even though the answer is already saved.
  const [index, setIndex] = useState(lessonPart.results.length);
  const [seed, setSeed] = useState(randomSeed);
  const [hintsShown, setHintsShown] = useState(0);
  const [answered, setAnswered] = useState(false);

  const content = questionById(lessonPart.questionIds[index]);
  const subtopic = content ? subtopicById(content.subtopic_id) : undefined;
  const question = useMemo(() => (content ? toPracticeQuestion(content, seed) : null), [content, seed]);
  const say = useSuniSay();
  const praise = usePraise();
  useSuniFocus(
    question && subtopic
      ? questionFocus({
          profile,
          setProfile,
          progressKey: progressKey(subtopic),
          title: subtopic.title,
          question,
          correctAnswer: answerText(question.answer, question.choices),
          answered,
          hintsShown,
        })
      : null,
  );

  // A question missing from the bank (removed since the lesson was made) is skipped as not right.
  const missing = !content || !subtopic;
  useEffect(() => {
    if (!missing) return;
    if (index >= lessonPart.questionIds.length) return onStop();
    setProfile((p) => recordLessonAnswer(p, subject, part, index, false));
    setIndex(index + 1);
  }, [missing, index, lessonPart.questionIds.length, part, subject, setProfile, onStop]);

  if (!question || !subtopic) return null;

  function onDone(o: QuestionOutcome) {
    const firstTry = o.correct && o.firstTry;
    // Lesson answers count towards the subtopic's strength, just like other practice.
    const updated = recordAttempt(profile, progressKey(subtopic!), firstTry, o.hintsUsed, Date.now(), attemptDetails(question!, o));
    setProfile(recordLessonAnswer(updated, subject, part, index, firstTry));
    if (o.correct) say(praise(o, profile.name));
    else say("That one was tricky. Tap me and we can go through it together.");
  }

  function next() {
    setHintsShown(0);
    setAnswered(false);
    setSeed(randomSeed());
    if (index + 1 >= lessonPart.questionIds.length) {
      say(`That's ${lessonPart.kind === "review" ? "the review" : "that activity"} done. Great work, ${profile.name}!`);
      onStop();
    } else setIndex(index + 1);
  }

  return (
    <div className="stack">
      <div className="row spread">
        <div>
          <span className="pill">
            Part {part + 1}: {lessonPart.kind === "review" ? "Review" : "Activity"}
          </span>
          <h1 style={{ marginTop: 8 }}>{lessonPart.title}</h1>
          {lessonPart.kind === "review" && (
            <p className="muted" style={{ margin: 0 }}>
              {subtopic.title}
            </p>
          )}
        </div>
        <div className="small muted" aria-label="Lesson progress">
          Question {index + 1} of {lessonPart.questionIds.length}
          <div className="progress" style={{ width: 160, marginTop: 6 }}>
            <div style={{ width: `${Math.round((index / lessonPart.questionIds.length) * 100)}%` }} />
          </div>
          <button className="link-button small" style={{ textDecoration: "underline" }} onClick={onStop}>
            Back to the lesson plan
          </button>
        </div>
      </div>
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
