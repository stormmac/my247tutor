"use client";

import { doesSubject, sessionTimes } from "@/lib/learner/plan";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminLearnPicker } from "@/components/AdminLearnPicker";
import { ClassLearnPicker } from "@/components/ClassLearnPicker";
import { loadRewards } from "@/components/RewardsButton";
import { type SetWork, useSetWork } from "@/components/SetWork";
import { useAccount } from "@/components/useAccount";
import { switchChild, useChildren, useProfile } from "@/components/useProfile";
import { currentLesson, daysLeftInWeek, daysLeftText, lessonProgress, ownPart, weekOf } from "@/lib/learner/lesson";
import { MAX_CHILDREN, newProfile, skillState, type LearnerProfile } from "@/lib/learner/model";
import { CURRICULA, CURRICULUM_NAMES, type Curriculum, curriculumOf, subjectName, yearName, yearWord } from "@/lib/curriculum/curricula";
import { skillsFor } from "@/lib/curriculum/skills";
import { hasSkillPath, YEARS, type Subject, type YearLevel } from "@/lib/curriculum/types";
import { currentSightLevel, currentUnit, readingOf, readingYear, sightLevelsDone, unitsDone, weeklyReading } from "@/lib/phonics/progress";
import { SIGHT_LEVELS } from "@/lib/phonics/sightWords";
import { getUnit, UNITS } from "@/lib/phonics/sequence";
import { subtopicPath } from "@/lib/content/tree";
import { lessonPoints, REWARD_SUBJECTS, type Rewards, rewardText, totalsText } from "@/lib/learner/rewards";
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
  return <StudentHome profile={profile} signedIn={Boolean(account.user)} />;
}

/**
 * The Student page, in the order to do things: lessons from a teacher this week, the student's own
 * (DIY) lessons this week, practice, then games and rewards. This week's lessons end at midnight on
 * Sunday, so both lesson sections say how many days are left.
 */
function StudentHome({ profile, signedIn }: { profile: LearnerProfile; signedIn: boolean }) {
  const curriculum = curriculumOf(profile.curriculum);
  // A grown-up's plan can leave out a subject; Learn to Read and writing are English, times tables are Maths.
  const subjects = (["maths", "english"] as const).filter((s) => doesSubject(profile.plan, s));
  const english = subjects.includes("english");
  const reading = english && readingYear(profile.yearLevel);
  const setWork = useSetWork(profile.id);
  const teacherWork = setWork.work.filter((w) => subjects.includes(w.subject) && (!w.doneAt || Date.parse(w.doneAt) >= mondayOf()));
  const session = profile.plan?.session;
  const left = daysLeftText();

  return (
    <div className="stack student-home">
      <div>
        <h1>Hi {profile.name}! What shall we learn?</h1>
        <p className="muted" style={{ margin: 0 }}>
          {yearName(profile.yearLevel, curriculum)}. Start with this week&apos;s lessons, and ask Suni if you get stuck.
        </p>
      </div>
      <div className="week-deadline" role="status">
        <strong>⏰ {left}</strong>{" "}
        {daysLeftInWeek() === 1 ? "This week's lessons end at midnight tonight." : "This week's lessons end at midnight on Sunday."}
      </div>

      {(teacherWork.length > 0 || session) && (
        <section className="stack home-section section-teacher" aria-labelledby="teacher-lessons">
          <h2 id="teacher-lessons">
            <span className="section-icon" aria-hidden>
              🧑‍🏫
            </span>{" "}
            Teacher lessons this week
          </h2>
          {session && (
            <p className="small" style={{ margin: 0 }}>
              Learning with {session.teacherName ?? "your teacher"}: {sessionTimes(session)}
            </p>
          )}
          {teacherWork.length ? (
            <div className="stack" style={{ gap: 10 }}>
              {teacherWork.map((w) => (
                <TeacherLessonCard key={w.id} profile={profile} work={w} />
              ))}
            </div>
          ) : (
            <p className="muted" style={{ margin: 0 }}>
              Nothing set this week yet.
            </p>
          )}
        </section>
      )}

      <section className="stack home-section section-diy" aria-labelledby="diy-lessons">
        <h2 id="diy-lessons">
          <span className="section-icon" aria-hidden>
            📅
          </span>{" "}
          My DIY lessons this week
        </h2>
        <div className={subjects.length > 1 ? "grid grid-2" : "grid"}>
          {subjects.map((s) => (
            <LessonCard key={s} profile={profile} subject={s} title={subjectName(s, curriculum)} />
          ))}
        </div>
        {reading && <ReadingWeekCard profile={profile} />}
      </section>

      <section className="stack home-section section-practice" aria-labelledby="practice">
        <h2 id="practice">
          <span className="section-icon" aria-hidden>
            ✏️
          </span>{" "}
          Practice activities
        </h2>
        <div className={subjects.length > 1 ? "grid grid-2" : "grid"}>
          {subjects.map((s) => (
            <PracticeCard key={s} profile={profile} subject={s} title={subjectName(s, curriculum)} />
          ))}
        </div>
        {english && (
          <div className="card">
            <div className="row spread">
              <div>
                <h3 style={{ margin: 0 }}>Writing</h3>
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
        {reading && <ReadingPracticeCard profile={profile} />}
      </section>

      <section className="stack home-section section-games" aria-labelledby="games">
        <h2 id="games">
          <span className="section-icon" aria-hidden>
            🎮
          </span>{" "}
          Games and rewards
        </h2>
        <div className={subjects.includes("maths") ? "grid grid-2" : "grid"}>
          {subjects.includes("maths") && <TablesCard profile={profile} />}
          <RewardsCard profile={profile} signedIn={signedIn} />
        </div>
      </section>
    </div>
  );
}

/** Midnight at the start of this week's Monday, local time. */
function mondayOf(now = Date.now()): number {
  return new Date(`${weekOf(now)}T00:00:00`).getTime();
}

/** One piece of work a teacher (or another grown-up) set: where it's up to, and a button straight into it. */
function TeacherLessonCard({ profile, work }: { profile: LearnerProfile; work: SetWork }) {
  const curriculum = curriculumOf(profile.curriculum);
  const path = subtopicPath(work.subtopicId, curriculum);
  const title = path
    ? path.topic.title === path.subtopic.title
      ? path.topic.title
      : `${path.topic.title}: ${path.subtopic.title}`
    : "Set work";
  const part = currentLesson(profile, work.subject)?.parts.find((p) => p.setWorkId === work.id);
  const answered = part ? Math.min(part.results.length, part.questionIds.length) : 0;
  const total = part?.questionIds.length ?? 0;
  const done = Boolean(work.doneAt) || (total > 0 && answered >= total);
  return (
    <div className="card stack teacher-lesson" style={{ gap: 6 }}>
      <div className="row spread">
        <div>
          <span className="pill">{subjectName(work.subject, curriculum)}</span>
          <h3 style={{ margin: "6px 0 0" }}>{title}</h3>
        </div>
        {done ? (
          <span className="pill good">Done ⭐</span>
        ) : (
          <Link href={`/learn/${work.subject}?work=${work.id}`} className="btn">
            {answered ? "Keep going" : "Start"}
          </Link>
        )}
      </div>
      <p className="small muted" style={{ margin: 0 }}>
        {work.atSchool ? "What you're doing at school now" : `Set by ${work.setBy ?? "your teacher"}`}
        {total > 0 && !done ? `. ${answered} of ${total} questions done.` : "."}
        {work.note ? ` “${work.note}”` : ""}
      </p>
    </div>
  );
}

/** The student's own weekly lesson in a subject (the review and activities), or the starting check before it. */
function LessonCard({ profile, subject, title }: { profile: LearnerProfile; subject: Subject; title: string }) {
  const placed = profile.placementDone[subject];
  const lesson = currentLesson(profile, subject);
  const { done, total } = lesson ? lessonProgress(lesson, ownPart) : { done: 0, total: 0 };
  const finished = total > 0 && done >= total;
  return (
    <div className="card stack">
      <div className="row spread">
        <h3 style={{ margin: 0 }}>{title}</h3>
        {finished && <span className="pill good">Done ⭐</span>}
      </div>
      {total > 0 && (
        <div className="progress" aria-label={`${done} of ${total} questions done`}>
          <div style={{ width: `${(done / total) * 100}%` }} />
        </div>
      )}
      <p className="muted" style={{ margin: 0 }}>
        {!placed
          ? "Start with a short check. It begins easy and gets harder, so we know where to begin."
          : !lesson
            ? "Your new lesson for this week is ready."
            : finished
              ? "This week's lesson is finished. A new one is ready on Monday."
              : done
                ? `${done} of ${total} questions done.`
                : `Ready: ${total} questions.`}
      </p>
      {!finished && (
        <div className="row">
          <Link href={`/learn/${subject}`} className="btn">
            {!placed ? "Start the check" : done ? "Keep going" : "Start this week's lesson"}
          </Link>
        </div>
      )}
    </div>
  );
}

/** Free practice and topics in a subject, with how many skills are mastered. */
function PracticeCard({ profile, subject, title }: { profile: LearnerProfile; subject: Subject; title: string }) {
  const placed = profile.placementDone[subject];
  // Years 1–2 and 7–8 have no skill map; they practise their year's topics.
  if (!hasSkillPath(profile.yearLevel))
    return (
      <div className="card stack">
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p className="muted" style={{ margin: 0 }}>
          Practise any topic from your year.
        </p>
        <div className="row">
          <Link href={`/learn/${subject}/topics?year=${profile.yearLevel}`} className="btn secondary">
            Choose a topic
          </Link>
        </div>
      </div>
    );
  const skills = skillsFor(subject).filter((s) => s.practice !== "writing");
  const mastered = skills.filter((s) => skillState(profile, s.id).mastered).length;
  return (
    <div className="card stack">
      <div className="row spread">
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span className="pill good">
          {mastered} of {skills.length} skills
        </span>
      </div>
      <div className="progress" aria-label={`${mastered} of ${skills.length} skills mastered`}>
        <div style={{ width: `${(mastered / skills.length) * 100}%` }} />
      </div>
      <div className="row">
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

/**
 * This week's reading lesson for a student in Learn to Read, or the reading check for one who
 * hasn't done it. Up to Year 5 only; a student who read well enough doesn't see it.
 */
function ReadingWeekCard({ profile }: { profile: LearnerProfile }) {
  const reading = readingOf(profile);
  if (!reading.enrolled && reading.age !== null) return null;
  const weekly = reading.enrolled ? weeklyReading(reading) : null;
  if (!weekly)
    return (
      <div className="card">
        <div className="row spread">
          <div>
            <h3 style={{ margin: 0 }}>Reading check</h3>
            <p className="muted" style={{ margin: 0 }}>
              A quick word game with Suni that works out your reading age. It takes about three minutes.
            </p>
          </div>
          <Link href="/read/check" className="btn">
            Start
          </Link>
        </div>
      </div>
    );
  const unit = getUnit(weekly.unitId);
  return (
    <div className="card reading-card">
      <div className="row spread">
        <div>
          <h3 style={{ margin: 0 }}>📖 Reading lesson</h3>
          <p className="muted" style={{ margin: 0 }}>
            {weekly.passed
              ? "Done this week! You can do it again for more practice."
              : `Sounds${unit ? ` ${unit.title.replace(/_/g, "–")}` : ""}, sight words and a story.`}
          </p>
        </div>
        {weekly.passed ? (
          <span className="pill good">Done ⭐</span>
        ) : (
          <Link href="/read/week" className="btn">
            {weekly.done ? "Try again" : "Start"}
          </Link>
        )}
      </div>
    </div>
  );
}

/** Learn to Read's extra practice: the next sounds and sight words, and the whole program. */
function ReadingPracticeCard({ profile }: { profile: LearnerProfile }) {
  const reading = readingOf(profile);
  if (!reading.enrolled) return null;
  const next = currentUnit(reading);
  const done = unitsDone(reading);
  const nextSight = currentSightLevel(reading);
  const sightDone = sightLevelsDone(reading);
  return (
    <div className="card stack">
      <div className="row spread">
        <h3 style={{ margin: 0 }}>📖 Learn to Read</h3>
        <span className="pill good">
          {done} of {UNITS.length} sounds · {sightDone} of {SIGHT_LEVELS.length} word levels
        </span>
      </div>
      <div className="progress" aria-label={`${done + sightDone} of ${UNITS.length + SIGHT_LEVELS.length} parts done`}>
        <div style={{ width: `${((done + sightDone) / (UNITS.length + SIGHT_LEVELS.length)) * 100}%` }} />
      </div>
      <div className="row">
        {next && (
          <Link href={`/read/${next.id}`} className="btn secondary">
            Practise sounds
          </Link>
        )}
        {nextSight && (
          <Link href={`/read/words/${nextSight.id}`} className="btn secondary">
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

function TablesCard({ profile }: { profile: LearnerProfile }) {
  const games = tablesOf(profile).games;
  const last = games.at(-1);
  return (
    <div className="card stack">
      <h3 style={{ margin: 0 }}>✖️ Times tables game</h3>
      <p className="muted" style={{ margin: 0 }}>
        {last
          ? `Last game: ${last.right} right on ${describeTables(last.tables)}. Can you beat it?`
          : "Answer as many as you can in 2 minutes. Pick your tables and speed."}
      </p>
      <div className="row">
        <Link href="/tables" className="btn secondary">
          Play
        </Link>
      </div>
    </div>
  );
}

/** The points and rewards earned so far, and this week's lesson points. Kept with an account. */
function RewardsCard({ profile, signedIn }: { profile: LearnerProfile; signedIn: boolean }) {
  const [rewards, setRewards] = useState<Rewards | string | null>(null);
  const learnerId = signedIn ? profile.id : undefined;
  useEffect(() => {
    if (!learnerId) return;
    let live = true;
    void loadRewards(learnerId).then((r) => live && setRewards(r));
    return () => {
      live = false;
    };
  }, [learnerId]);
  const thisWeek = REWARD_SUBJECTS.filter((s) => doesSubject(profile.plan, s)).reduce(
    (n, s) => n + lessonPoints(currentLesson(profile, s) ?? undefined),
    0,
  );
  return (
    <div className="card stack rewards-card">
      <h3 style={{ margin: 0 }}>🏆 Rewards</h3>
      {learnerId ? (
        <>
          <p style={{ margin: 0 }}>
            You&apos;ve earned <strong>{typeof rewards === "object" && rewards ? totalsText(rewards.totals) : "…"}</strong>.
          </p>
          <p className="muted small" style={{ margin: 0 }}>
            ⭐ {rewardText("points", thisWeek)} from this week&apos;s lessons so far.
          </p>
          <div className="row">
            <Link href="/rewards" className="btn secondary">
              See my rewards
            </Link>
          </div>
        </>
      ) : (
        <p className="muted" style={{ margin: 0 }}>
          Rewards are kept with your account. Ask a grown-up to sign in to start earning points.
        </p>
      )}
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
