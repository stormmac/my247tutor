"use client";

import { doesSubject, sessionTimes } from "@/lib/learner/plan";
import Link from "next/link";
import { useState } from "react";
import { AdminLearnPicker } from "@/components/AdminLearnPicker";
import { ClassLearnPicker } from "@/components/ClassLearnPicker";
import { useAccount } from "@/components/useAccount";
import { switchChild, useChildren, useProfile } from "@/components/useProfile";
import { currentLesson, lessonProgress } from "@/lib/learner/lesson";
import { MAX_CHILDREN, newProfile, skillState, type LearnerProfile } from "@/lib/learner/model";
import { CURRICULA, CURRICULUM_NAMES, type Curriculum, curriculumOf, subjectName, yearName, yearWord } from "@/lib/curriculum/curricula";
import { skillsFor } from "@/lib/curriculum/skills";
import { hasSkillPath, YEARS, type Subject, type YearLevel } from "@/lib/curriculum/types";
import { currentSightLevel, currentUnit, readingOf, readingYear, sightLevelsDone, unitsDone } from "@/lib/phonics/progress";
import { SIGHT_LEVELS } from "@/lib/phonics/sightWords";
import { UNITS } from "@/lib/phonics/sequence";
import { describeTables, tablesOf } from "@/lib/tables/game";

export default function LearnPage() {
  const { profile, setProfile, loaded } = useProfile();
  const account = useAccount();
  const [self, setSelf] = useState(false);
  if (!loaded || !account.loaded) return null;
  // An admin picks a family or centre, then a student, to learn as.
  if (account.user?.role === "admin" && !self) return <AdminLearnPicker onSelf={() => setSelf(true)} />;
  // A teacher or centre picks one of their students.
  if ((account.user?.role === "teacher" || account.user?.role === "centre") && !self)
    return <ClassLearnPicker onSelf={() => setSelf(true)} />;
  if (!profile)
    return (
      <Setup
        startOn={account.user?.curriculum ?? undefined}
        onCreate={(name, year, curriculum) => setProfile(newProfile(name, year, Date.now(), curriculum))}
      />
    );
  const curriculum = curriculumOf(profile.curriculum);
  // A grown-up's plan can leave out a subject; Learn to Read and writing are English, times tables are Maths.
  const maths = doesSubject(profile.plan, "maths");
  const english = doesSubject(profile.plan, "english");
  const session = profile.plan?.session;

  return (
    <div className="stack">
      <div className="row" style={{ gap: 16, flexWrap: "nowrap" }}>
        <div style={{ flex: 1 }}>
          <h1>Hi {profile.name}! What shall we learn?</h1>
          <p className="muted" style={{ margin: 0 }}>
            {yearName(profile.yearLevel, curriculum)}. Pick a subject to keep going, and ask Suni if you get stuck.
          </p>
          {session && (
            <p className="small" style={{ margin: "4px 0 0" }}>
              🧑‍🏫 Learning with {session.teacherName ?? "your teacher"}: {sessionTimes(session)}
            </p>
          )}
        </div>
        {account.user && profile.id && (
          <Link href="/rewards" className="btn rewards-link">
            🏆 Rewards
          </Link>
        )}
      </div>
      {english && readingYear(profile.yearLevel) && <ReadingCard profile={profile} />}
      <div className={maths && english ? "grid grid-2" : "grid"}>
        {maths && <SubjectCard profile={profile} subject="maths" title={subjectName("maths", curriculum)} />}
        {english && <SubjectCard profile={profile} subject="english" title="English" />}
      </div>
      {maths && <TablesCard profile={profile} />}
      {english && (
        <div className="card">
          <div className="row spread">
            <div>
              <h2>Writing</h2>
              <p className="muted" style={{ margin: 0 }}>
                Write a story, an argument or a report, and get feedback on it.
              </p>
            </div>
            <Link href="/learn/writing" className="btn secondary">
              Start writing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Learn to Read, the phonics program, comes first for a student in it. Everyone else up to Year 5 is
 * asked to do the reading check once, which puts them in the program if their reading age is below 9.5.
 * From Year 6 on there's no card at all.
 */
function ReadingCard({ profile }: { profile: LearnerProfile }) {
  const reading = readingOf(profile);
  if (reading.enrolled) {
    const next = currentUnit(reading);
    const done = unitsDone(reading);
    const nextSight = currentSightLevel(reading);
    const sightDone = sightLevelsDone(reading);
    return (
      <div className="card stack reading-card">
        <div className="row spread">
          <h2 style={{ margin: 0 }}>📖 Learn to Read</h2>
          <span className="pill good">
            {done} of {UNITS.length} sounds · {sightDone} of {SIGHT_LEVELS.length} word levels
          </span>
        </div>
        <div className="progress" aria-label={`${done + sightDone} of ${UNITS.length + SIGHT_LEVELS.length} parts done`}>
          <div style={{ width: `${((done + sightDone) / (UNITS.length + SIGHT_LEVELS.length)) * 100}%` }} />
        </div>
        <p className="muted" style={{ margin: 0 }}>
          {next || nextSight
            ? [next && `Next sounds: ${next.title.replace(/_/g, "–")}.`, nextSight && `Next sight words: ${nextSight.title}.`]
                .filter(Boolean)
                .join(" ")
            : "You've learnt every sound and sight word! Do the reading check again to see how far you've come."}
        </p>
        <div className="row">
          {next || !nextSight ? (
            <Link href={next ? `/read/${next.id}` : "/read/check"} className="btn">
              {next ? "Practise sounds" : "Reading check"}
            </Link>
          ) : null}
          {nextSight && (
            <Link href={`/read/words/${nextSight.id}`} className={next ? "btn secondary" : "btn"}>
              Sight words
            </Link>
          )}
          <Link href="/read" className="btn secondary">
            All of Learn to Read
          </Link>
        </div>
      </div>
    );
  }
  if (reading.age !== null) return null;
  return (
    <div className="card">
      <div className="row spread">
        <div>
          <h2>Reading check</h2>
          <p className="muted" style={{ margin: 0 }}>
            A quick word game with Suni that works out your reading age. It takes about three minutes.
          </p>
        </div>
        <Link href="/read/check" className="btn secondary">
          Start
        </Link>
      </div>
    </div>
  );
}

function TablesCard({ profile }: { profile: LearnerProfile }) {
  const games = tablesOf(profile).games;
  const last = games.at(-1);
  return (
    <div className="card">
      <div className="row spread">
        <div>
          <h2>✖️ Times tables game</h2>
          <p className="muted" style={{ margin: 0 }}>
            {last
              ? `Last game: ${last.right} right on ${describeTables(last.tables)}. Can you beat it?`
              : "Answer as many as you can in 2 minutes. Pick your tables and speed."}
          </p>
        </div>
        <Link href="/tables" className="btn secondary">
          Play
        </Link>
      </div>
    </div>
  );
}

function SubjectCard({ profile, subject, title }: { profile: LearnerProfile; subject: Subject; title: string }) {
  // Years 1–2 and 7–8 have no skill map; they practise their year's topics.
  if (!hasSkillPath(profile.yearLevel)) return <TopicsCard profile={profile} subject={subject} title={title} />;
  const skills = skillsFor(subject).filter((s) => s.practice !== "writing");
  const mastered = skills.filter((s) => skillState(profile, s.id).mastered).length;
  const placed = profile.placementDone[subject];
  return (
    <div className="card stack">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <span className="pill good">
          {mastered} of {skills.length} skills
        </span>
      </div>
      <div className="progress" aria-label={`${mastered} of ${skills.length} skills mastered`}>
        <div style={{ width: `${(mastered / skills.length) * 100}%` }} />
      </div>
      <p className="muted" style={{ margin: 0 }}>
        {placed ? lessonLine(profile, subject) : "Start with a short check. It begins easy and gets harder, so we know where to begin."}
      </p>
      <div className="row">
        <Link href={`/learn/${subject}`} className="btn">
          {placed ? "This week's lesson" : "Start the check"}
        </Link>
        {placed && (
          <Link href={`/learn/${subject}?mode=practice`} className="btn secondary">
            Free practice
          </Link>
        )}
        <Link href={`/learn/${subject}/topics`} className="btn secondary">
          Browse topics
        </Link>
      </div>
    </div>
  );
}

/** Where the child is up to in this week's lesson. */
function lessonLine(profile: LearnerProfile, subject: Subject): string {
  const lesson = currentLesson(profile, subject);
  if (!lesson) return "Your new lesson for this week is ready.";
  const { done, total } = lessonProgress(lesson);
  if (done >= total) return "This week's lesson is finished. A new one is ready on Monday.";
  return done ? `This week's lesson: ${done} of ${total} questions done.` : `This week's lesson is ready: ${total} questions.`;
}

/** A Year 1–2 or 7–8 learner's subject: the weekly lesson, and their year's topics to practise. */
function TopicsCard({ profile, subject, title }: { profile: LearnerProfile; subject: Subject; title: string }) {
  const placed = profile.placementDone[subject];
  return (
    <div className="card stack">
      <h2 style={{ margin: 0 }}>{title}</h2>
      <p className="muted" style={{ margin: 0 }}>
        {placed ? lessonLine(profile, subject) : "Start with a short check. It begins easy and gets harder, so we know where to begin."}
      </p>
      <div className="row">
        <Link href={`/learn/${subject}`} className="btn">
          {placed ? "This week's lesson" : "Start the check"}
        </Link>
        <Link href={`/learn/${subject}/topics?year=${profile.yearLevel}`} className="btn secondary">
          Choose a topic
        </Link>
      </div>
    </div>
  );
}

function Setup({
  startOn,
  onCreate,
}: {
  /** The curriculum Admin chose for the family, if any. */
  startOn?: Curriculum;
  onCreate: (name: string, year: YearLevel, curriculum: Curriculum) => void;
}) {
  const [name, setName] = useState("");
  const plan = useAccount().user?.plan;
  // No year is picked for them: the starting check is set from it, so a grown-up has to choose.
  const [year, setYear] = useState<YearLevel | null>(null);
  const { children } = useChildren();
  // A brother or sister usually learns the same curriculum.
  const [picked, setPicked] = useState<Curriculum | null>(null);
  const curriculum = picked ?? startOn ?? curriculumOf(children[0]?.curriculum);
  const ready = name.trim() !== "" && year !== null;
  return (
    <form
      className="card narrow stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) onCreate(name.trim().slice(0, 20), year, curriculum);
      }}
    >
      <h1>{children.length ? "Add a child" : "Let's get started"}</h1>
      <p className="muted">
        A grown-up should help with this step. We only need a first name or nickname and their school year.
        {children.length > 0 && ` You can have up to ${MAX_CHILDREN} children.`}
      </p>
      {plan === "centre" && (
        <div className="feedback warn">
          Your child&apos;s tutoring centre pays for them, and they learn with the sign-in the centre gave them. You can see their progress
          on the <Link href="/parent">Family page</Link>. A child you add here is yours, so they need a plan of their own.
        </div>
      )}
      <div>
        <label htmlFor="name">First name or nickname</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={20} autoComplete="off" />
      </div>
      <fieldset className="year-picker">
        <legend>Which curriculum do they follow at school?</legend>
        <div className="tabs">
          {CURRICULA.map((c) => (
            <button
              key={c}
              type="button"
              className={`tab${curriculum === c ? " active" : ""}`}
              aria-pressed={curriculum === c}
              onClick={() => setPicked(c)}
            >
              {CURRICULUM_NAMES[c]}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="year-picker">
        <legend>What {yearWord(curriculum)} are they in at school now?</legend>
        <div className="tabs">
          {YEARS.map((y) => (
            <button
              key={y}
              type="button"
              className={`tab${year === y ? " active" : ""}`}
              aria-pressed={year === y}
              onClick={() => setYear(y)}
            >
              {yearName(y, curriculum)}
            </button>
          ))}
        </div>
        <p className="muted small" style={{ margin: "8px 0 0" }}>
          {year === null
            ? "Their first check starts two years below this, then moves up to find their level."
            : `Their first check starts at ${yearName(Math.max(1, year - 2), curriculum)} and moves up to find their level.`}
        </p>
      </fieldset>
      <button className="btn" disabled={!ready}>
        Continue
      </button>
      {children.length > 0 && (
        <button type="button" className="btn secondary" onClick={() => children[0].id && switchChild(children[0].id)}>
          Cancel
        </button>
      )}
    </form>
  );
}
