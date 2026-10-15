"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePraise } from "@/components/usePraise";
import { QuestionView, attemptDetails, type QuestionOutcome } from "@/components/QuestionView";
import { questionFocus, useSuniFocus, useSuniSay } from "@/components/SuniCompanion";
import type { useProfile } from "@/components/useProfile";
import { buildLesson, skillBuilder } from "@/lib/content/lesson";
import { progressKey, toPracticeQuestion } from "@/lib/content/practice";
import { QUESTIONS, SUBTOPICS } from "@/lib/content/tree";
import type { Subject } from "@/lib/curriculum/types";
import {
  LESSON_TRIES,
  currentLesson,
  lessonProgress,
  nextPart,
  recordLessonAnswer,
  resultColour,
  saveLesson,
  type LessonPart,
  type LessonResult,
} from "@/lib/learner/lesson";
import { recordAttempt, type LearnerProfile } from "@/lib/learner/model";
import { answerText } from "@/lib/practice";
import { Rng, randomSeed } from "@/lib/practice/rng";

type SetProfile = ReturnType<typeof useProfile>["setProfile"];

const questionById = (id: string) => QUESTIONS.find((q) => q.id === id);
const subtopicById = (id: string) => SUBTOPICS.find((s) => s.id === id);

const COLOUR_WORDS = { good: "right first go", warn: "right on a later go", bad: "not right" } as const;

function describe(part: LessonPart): string {
  return part.kind === "review"
    ? `${part.questionIds.length} questions from Year ${part.year} to keep earlier skills sharp.`
    : `${part.questionIds.length} questions, easy to hard, on something to work on.`;
}

/** Numbered boxes, one per question: green right first go, yellow right on a later go, red not right. */
function QuestionStrip({
  total,
  results,
  current,
  label,
}: {
  total: number;
  results: (LessonResult | boolean)[];
  current?: number;
  label: string;
}) {
  return (
    <ol className="q-strip" aria-label={label}>
      {Array.from({ length: total }, (_, i) => {
        const colour = i < results.length ? resultColour(results[i]) : "";
        return (
          <li
            key={i}
            className={`${colour}${i === current ? " current" : ""}`}
            aria-current={i === current ? "step" : undefined}
            title={colour ? `Question ${i + 1}: ${COLOUR_WORDS[colour]}` : `Question ${i + 1}`}
          >
            {i + 1}
          </li>
        );
      })}
    </ol>
  );
}

function ColourKey() {
  return (
    <div className="q-key small muted">
      <span className="good">Right first go</span>
      <span className="warn">Right on the 2nd or 3rd go</span>
      <span className="bad">Not right after 3 goes</span>
    </div>
  );
}

/** This week's lesson in a subject: the plan, then whichever part the child picks. */
export function WeeklyLesson({ subject, profile, setProfile }: { subject: Subject; profile: LearnerProfile; setProfile: SetProfile }) {
  const lesson = currentLesson(profile, subject);
  // The part being worked on. Fixed while it runs, so the last answer's feedback stays on screen.
  const [running, setRunning] = useState<number | null>(null);

  // A new week (or a first visit) makes a new lesson from how the child is going now.
  useEffect(() => {
    if (!lesson) setProfile((p) => (currentLesson(p, subject) ? p : saveLesson(p, subject, buildLesson(p, subject))));
  }, [lesson, subject, setProfile]);

  if (!lesson) return null;
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
  const finished = nextPart(lesson) < 0;
  const monday = new Date(`${lesson.week}T00:00:00`).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="card narrow stack" style={{ margin: "0 auto" }}>
      <h1 style={{ margin: 0 }}>This week&apos;s {title} lesson</h1>
      <p className="muted" style={{ margin: 0 }}>
        For the week starting {monday}. Do the parts in any order. A new lesson is ready every Monday.
      </p>
      <div className="progress" aria-label={`${done} of ${total} questions done`}>
        <div style={{ width: `${Math.round((done / Math.max(1, total)) * 100)}%` }} />
      </div>
      <ol className="stack" style={{ margin: 0, paddingLeft: 20 }}>
        {lesson.parts.map((p, i) => {
          const answered = p.results.length;
          const complete = answered >= p.questionIds.length;
          return (
            <li key={i} className="stack" style={{ gap: 6 }}>
              <div className="row spread">
                <strong>{p.title}</strong>
                {complete ? (
                  <span className="pill good">Done</span>
                ) : (
                  <button className="btn small" onClick={() => setRunning(i)}>
                    {answered ? "Keep going" : "Start"}
                  </button>
                )}
              </div>
              <div className="small muted">{describe(p)}</div>
              <QuestionStrip
                total={p.questionIds.length}
                results={p.results}
                label={`${p.title}: ${answered} of ${p.questionIds.length} done`}
              />
            </li>
          );
        })}
      </ol>
      <ColourKey />
      {finished && (
        <div className="feedback good">
          <strong>Lesson finished, {profile.name}!</strong> Come back on Monday for next week&apos;s lesson.
        </div>
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

/** Extra questions like one the child missed on every go. Not part of the lesson's score. */
interface Builder {
  ids: string[];
  position: number;
  results: LessonResult[];
}

/**
 * One part of the lesson, a question at a time, three goes each. A question missed on every go is
 * followed by a skill builder. Goes back to the plan when the part is done.
 */
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
  const total = lessonPart.questionIds.length;
  // The position shown stays put while the child reads the feedback, even though the answer is already saved.
  const [index, setIndex] = useState(lessonPart.results.length);
  const [builder, setBuilder] = useState<Builder | null>(null);
  const [lastResult, setLastResult] = useState<LessonResult | null>(null);
  const [seed, setSeed] = useState(randomSeed);
  const [hintsShown, setHintsShown] = useState(0);
  const [answered, setAnswered] = useState(false);

  const content = questionById(builder ? builder.ids[builder.position] : lessonPart.questionIds[index]);
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
  const missing = !builder && (!content || !subtopic);
  useEffect(() => {
    if (!missing) return;
    if (index >= total) return onStop();
    setProfile((p) => recordLessonAnswer(p, subject, part, index, 0));
    setIndex(index + 1);
  }, [missing, index, total, part, subject, setProfile, onStop]);

  if (!question || !subtopic || !content) return null;

  function onDone(o: QuestionOutcome) {
    const result: LessonResult = o.correct ? o.tries : 0;
    // Lesson and skill builder answers count towards the subtopic's strength, like other practice.
    const updated = recordAttempt(
      profile,
      progressKey(subtopic!),
      o.correct && o.firstTry,
      o.hintsUsed,
      Date.now(),
      attemptDetails(question!, o),
    );
    if (builder) {
      setProfile(updated);
      setBuilder({ ...builder, results: [...builder.results, result] });
    } else {
      setProfile(recordLessonAnswer(updated, subject, part, index, result));
      setLastResult(result);
    }
    if (o.correct) say(praise(o, profile.name));
    else if (!builder) say("That one was tricky. Next, a skill builder: a few more like it to practise.");
    else say("That one was tricky. Tap me and we can go through it together.");
  }

  function nextLessonQuestion() {
    setBuilder(null);
    if (index + 1 >= total) {
      say(`That's ${lessonPart.kind === "review" ? "the review" : "that activity"} done. Great work, ${profile.name}!`);
      onStop();
    } else setIndex(index + 1);
  }

  function next() {
    setHintsShown(0);
    setAnswered(false);
    setSeed(randomSeed());
    if (builder) {
      if (builder.position + 1 < builder.ids.length) setBuilder({ ...builder, position: builder.position + 1 });
      else nextLessonQuestion();
      return;
    }
    if (lastResult === 0) {
      setLastResult(null);
      const ids = skillBuilder(content!, lessonPart.questionIds, new Rng(randomSeed()));
      if (ids.length) return setBuilder({ ids, position: 0, results: [] });
    }
    setLastResult(null);
    nextLessonQuestion();
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
        <button className="link-button small" style={{ textDecoration: "underline" }} onClick={onStop}>
          Back to the lesson plan
        </button>
      </div>
      <div className="stack" style={{ gap: 6 }}>
        <div className="small muted">
          Question {index + 1} of {total}
        </div>
        <QuestionStrip total={total} results={lessonPart.results} current={builder ? undefined : index} label="Lesson questions" />
      </div>
      {builder && (
        <div className="feedback" style={{ background: "var(--warn-tint)" }}>
          <strong>
            Skill builder: question {builder.position + 1} of {builder.ids.length}
          </strong>{" "}
          A few more like question {index + 1}, to help it stick. These don&apos;t change your lesson score.
          <div style={{ marginTop: 8 }}>
            <QuestionStrip
              total={builder.ids.length}
              results={builder.results}
              current={builder.position}
              label="Skill builder questions"
            />
          </div>
        </div>
      )}
      <div className="practice">
        <QuestionView
          key={question.id}
          question={question}
          maxTries={LESSON_TRIES}
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
