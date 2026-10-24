"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { type SetWork, workTitle, WorkResult } from "@/components/SetWork";
import { practiseable } from "@/lib/content/program";
import { type Curriculum, curriculumOf, subjectName, yearName } from "@/lib/curriculum/curricula";
import { YEARS, type Subject, type YearLevel } from "@/lib/curriculum/types";
import { CLASS_SUBJECTS, describeTime, MAX_SESSION_ACTIVITIES, type ClassTime } from "@/lib/auth/rules";
import { addWeeks, dayOfWeek, weekOf } from "@/lib/learner/lesson";
import type { LearnerProfile } from "@/lib/learner/model";

interface OwnPart {
  subject: Subject;
  title: string;
  done: number;
  total: number;
}

interface PlannerStudent {
  id: string;
  name: string;
  yearLevel: number;
  curriculum: LearnerProfile["curriculum"];
  planned: SetWork[];
  otherOpen: SetWork[];
  ownLesson: OwnPart[];
}

interface PlannerClass {
  class: {
    id: string;
    name: string;
    yearLevel: number;
    subject: keyof typeof CLASS_SUBJECTS;
    teacherName: string | null;
    times: ClassTime[];
  };
  students: PlannerStudent[];
}

const shortDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

const activities = (s: PlannerStudent) => s.planned.filter((w) => w.kind === "topic");

/**
 * The lesson planner: each class's weekly session, its students, and what each one has to do. The
 * teacher adds up to eight activities per student for the session, and homework: one of the
 * activities, or a redo of the questions the student didn't get right first go.
 */
export default function PlannerPage() {
  const [week, setWeek] = useState(() => weekOf());
  const [classes, setClasses] = useState<PlannerClass[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    const res = await fetch(`/api/planner?week=${week}`).catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { classes?: PlannerClass[]; error?: string };
    if (res?.ok && body.classes) {
      setClasses(body.classes);
      setError(null);
    } else setError(body?.error ?? "Couldn't load the planner. Try again.");
  }, [week]);
  useEffect(() => {
    void load();
  }, [load]);

  const thisWeek = weekOf();
  return (
    <div className="stack planner">
      <div>
        <Link href="/classes" className="small">
          ← Your classes
        </Link>
        <h1 style={{ margin: "6px 0 0" }}>Lesson planner</h1>
        <p className="muted" style={{ margin: 0 }}>
          Plan each student&apos;s weekly session: up to {MAX_SESSION_ACTIVITIES} activities of ten questions, and homework. They show on
          the student&apos;s page under Teacher lessons.
        </p>
      </div>
      <div className="row planner-week" role="group" aria-label="Week">
        <button className="btn secondary small" onClick={() => setWeek((w) => addWeeks(w, -1))}>
          ← Last week
        </button>
        <strong className="planner-week-label">
          Week of {shortDate(week)}
          {week === thisWeek ? " (this week)" : ""}
        </strong>
        <button className="btn secondary small" onClick={() => setWeek((w) => addWeeks(w, 1))}>
          Next week →
        </button>
        {week !== thisWeek && (
          <button className="link-button small" onClick={() => setWeek(thisWeek)}>
            Back to this week
          </button>
        )}
      </div>
      {error && <div className="feedback bad">{error}</div>}
      {!classes && !error && <p className="muted">Loading…</p>}
      {classes?.length === 0 && (
        <div className="card">
          <p style={{ margin: 0 }}>You don&apos;t have any classes yet. Your tutoring centre gives you classes from their Centre page.</p>
        </div>
      )}
      {classes?.map((c) => (
        <ClassSession key={c.class.id} data={c} week={week} reload={load} />
      ))}
    </div>
  );
}

/** One class's session this week: when it is, and each student's plan. */
function ClassSession({ data, week, reload }: { data: PlannerClass; week: string; reload: () => Promise<void> }) {
  const { class: c, students } = data;
  const [planning, setPlanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subjects: Subject[] = c.subject === "both" ? ["maths", "english"] : [c.subject];
  const curriculum = curriculumOf(students[0]?.curriculum);
  // Students with an activity in the subject and no redo homework in it yet.
  const canRedo = (subject: Subject) =>
    students.filter(
      (s) => activities(s).some((w) => w.subject === subject) && !s.planned.some((w) => w.kind === "mistakes" && w.subject === subject),
    );
  async function redoForClass(subject: Subject) {
    setError(null);
    const res = await fetch("/api/planner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "mistakes", classId: c.id, week, learnerIds: canRedo(subject).map((s) => s.id), subject }),
    }).catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { error?: string };
    if (!res?.ok) return setError(body?.error ?? "That didn't work.");
    await reload();
  }
  return (
    <section className="card stack planner-class" aria-labelledby={`class-${c.id}`}>
      <div className="row spread" style={{ flexWrap: "wrap" }}>
        <div>
          <h2 id={`class-${c.id}`} style={{ margin: 0 }}>
            {c.name}
          </h2>
          <p className="small muted" style={{ margin: "4px 0 0" }}>
            Year {c.yearLevel}, {CLASS_SUBJECTS[c.subject]}
            {c.teacherName ? `, with ${c.teacherName}` : ""}
          </p>
          {c.times.map((t) => (
            <p key={`${t.weekday} ${t.start}`} className="small" style={{ margin: "2px 0 0" }}>
              🗓 {shortDate(dayOfWeek(week, t.weekday))}: {describeTime(t)}
            </p>
          ))}
        </div>
        {students.length > 0 && !planning && (
          <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
            <button className="btn small" onClick={() => setPlanning(true)}>
              Plan for the whole class
            </button>
            {subjects.map((subject) =>
              canRedo(subject).length > 1 ? (
                <button key={subject} className="btn secondary small" onClick={() => void redoForClass(subject)}>
                  🏠 Homework for everyone: redo {subjects.length > 1 ? `${subjectName(subject, curriculum)} ` : ""}questions got wrong
                </button>
              ) : null,
            )}
          </div>
        )}
      </div>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      {planning && (
        <PlanForm
          classId={c.id}
          week={week}
          subjects={subjects}
          students={students}
          yearLevel={c.yearLevel}
          onDone={async (saved) => {
            setPlanning(false);
            if (saved) await reload();
          }}
        />
      )}
      {students.length === 0 ? (
        <p className="muted" style={{ margin: 0 }}>
          No students in this class yet.
        </p>
      ) : (
        <div className="stack" style={{ gap: 10 }}>
          {students.map((s) => (
            <StudentPlan key={s.id} student={s} classId={c.id} week={week} subjects={subjects} reload={reload} />
          ))}
        </div>
      )}
    </section>
  );
}

/** One student's plan for the session: their activities, homework, and what else they're doing. */
function StudentPlan({
  student,
  classId,
  week,
  subjects,
  reload,
}: {
  student: PlannerStudent;
  classId: string;
  week: string;
  subjects: Subject[];
  reload: () => Promise<void>;
}) {
  const curriculum = curriculumOf(student.curriculum);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const count = activities(student).length;
  const full = count >= MAX_SESSION_ACTIVITIES;

  async function send(url: string, init: RequestInit) {
    setError(null);
    const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...init }).catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { error?: string };
    if (!res?.ok) return setError(body?.error ?? "That didn't work.");
    await reload();
  }
  const redoHomework = (subject: Subject) =>
    send("/api/planner", { method: "POST", body: JSON.stringify({ kind: "mistakes", classId, week, learnerIds: [student.id], subject }) });

  return (
    <div className="planner-student stack" style={{ gap: 8 }}>
      <div className="row spread" style={{ flexWrap: "wrap" }}>
        <div>
          <strong>{student.name}</strong> <span className="small muted">{yearName(student.yearLevel as YearLevel, curriculum)}</span>
        </div>
        <span className={`pill ${full ? "warn" : ""}`}>
          {count} of {MAX_SESSION_ACTIVITIES} activities
        </span>
      </div>
      {student.planned.length > 0 ? (
        <ul className="planner-items">
          {student.planned.map((w) => (
            <li key={w.id} className="row spread">
              <div>
                <span className="small muted">{subjectName(w.subject, curriculum)}</span> {workTitle(w, curriculum)}
                {w.homework && <span className="pill homework">🏠 Homework</span>}
              </div>
              <div className="row" style={{ gap: 10 }}>
                {w.doneAt ? <WorkResult work={w} /> : <span className="pill">To do</span>}
                {w.kind === "topic" && !w.doneAt && (
                  <button
                    className="link-button small"
                    onClick={() => send("/api/planner", { method: "PATCH", body: JSON.stringify({ id: w.id, homework: !w.homework }) })}
                  >
                    {w.homework ? "Do in class" : "Make homework"}
                  </button>
                )}
                {!w.doneAt && (
                  <button
                    className="link-button small"
                    onClick={() => {
                      if (confirm(`Take "${workTitle(w, curriculum)}" off ${student.name}'s plan?`))
                        void send(`/api/set-work/${w.id}?learner=${student.id}`, { method: "DELETE" });
                    }}
                  >
                    Take off
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="small muted" style={{ margin: 0 }}>
          Nothing planned for this session yet.
        </p>
      )}
      {adding ? (
        <PlanForm
          classId={classId}
          week={week}
          subjects={subjects}
          students={[student]}
          yearLevel={student.yearLevel}
          onDone={async (saved) => {
            setAdding(false);
            if (saved) await reload();
          }}
        />
      ) : (
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
          <button className="btn secondary small" disabled={full} onClick={() => setAdding(true)}>
            + Add activities
          </button>
          {subjects.map((subject) => {
            const has = activities(student).some((w) => w.subject === subject);
            const set = student.planned.some((w) => w.kind === "mistakes" && w.subject === subject);
            if (!has || set) return null;
            return (
              <button key={subject} className="btn secondary small" onClick={() => void redoHomework(subject)}>
                🏠 Homework: redo {subjects.length > 1 ? `${subjectName(subject, curriculum)} ` : ""}questions got wrong
              </button>
            );
          })}
        </div>
      )}
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <AlsoDoing student={student} curriculum={curriculum} />
    </div>
  );
}

/** What else the student has this week: their own lesson, and work set elsewhere. */
function AlsoDoing({ student, curriculum }: { student: PlannerStudent; curriculum: Curriculum }) {
  if (!student.ownLesson.length && !student.otherOpen.length) return null;
  return (
    <details className="small">
      <summary className="muted">Also this week</summary>
      <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
        {student.ownLesson.map((p) => (
          <li key={`${p.subject} ${p.title}`}>
            Their own {subjectName(p.subject, curriculum)} lesson: {p.title}, {p.done} of {p.total} done
          </li>
        ))}
        {student.otherOpen.map((w) => (
          <li key={w.id}>
            {workTitle(w, curriculum)}, set by {w.setBy ?? "someone"}
            {w.week ? ` for the week of ${shortDate(w.week)}` : ""}, still to do
          </li>
        ))}
      </ul>
    </details>
  );
}

/** Picks activities (subtopics) for one student or the whole class, and whether they're homework. */
function PlanForm({
  classId,
  week,
  subjects,
  students,
  yearLevel,
  onDone,
}: {
  classId: string;
  week: string;
  subjects: Subject[];
  students: PlannerStudent[];
  yearLevel: number;
  onDone: (saved: boolean) => void;
}) {
  const curriculum = curriculumOf(students[0]?.curriculum);
  const [subject, setSubject] = useState<Subject>(subjects[0]);
  const [year, setYear] = useState<YearLevel>(yearLevel as YearLevel);
  const [picked, setPicked] = useState<string[]>([]);
  const [homework, setHomework] = useState(false);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const room = Math.max(0, MAX_SESSION_ACTIVITIES - Math.max(...students.map((s) => activities(s).length)));
  const topics = practiseable(subject, year, curriculum).filter((t) => t.subtopics.length);
  const who = students.length === 1 ? students[0].name : "the whole class";

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/planner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "topic",
        classId,
        week,
        learnerIds: students.map((s) => s.id),
        subject,
        subtopicIds: picked,
        homework,
        note: note.trim() || undefined,
      }),
    }).catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { error?: string };
    setBusy(false);
    if (!res?.ok) return setError(body?.error ?? "That didn't work.");
    onDone(true);
  }

  return (
    <form className="stack planner-form" onSubmit={save} style={{ gap: 10 }}>
      <strong>Add activities for {who}</strong>
      <div className="row" style={{ flexWrap: "wrap" }}>
        {subjects.length > 1 && (
          <label className="row" style={{ fontWeight: 400, margin: 0 }}>
            Subject
            <select
              value={subject}
              style={{ width: "auto" }}
              onChange={(e) => {
                setSubject(e.target.value as Subject);
                setPicked([]);
              }}
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {subjectName(s, curriculum)}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="row" style={{ fontWeight: 400, margin: 0 }}>
          From
          <select
            value={year}
            style={{ width: "auto" }}
            onChange={(e) => {
              setYear(Number(e.target.value) as YearLevel);
              setPicked([]);
            }}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {yearName(y, curriculum)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="stack" style={{ gap: 8, margin: 0 }}>
        <legend className="small muted">
          {room
            ? `Choose up to ${room} more ${room === 1 ? "activity" : "activities"}. Each is ten questions, easy to hard.`
            : "This session is full."}
        </legend>
        {topics.map(({ topic, subtopics }) => (
          <div key={topic.id}>
            <strong className="small">{topic.title}</strong>
            <div className="row" style={{ gap: "4px 14px", flexWrap: "wrap" }}>
              {subtopics.map((s) => (
                <label key={s.id} className="row small" style={{ fontWeight: 400, margin: 0, gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={picked.includes(s.id)}
                    disabled={!picked.includes(s.id) && picked.length >= room}
                    onChange={(e) => setPicked((p) => (e.target.checked ? [...p, s.id] : p.filter((id) => id !== s.id)))}
                    style={{ width: "auto" }}
                  />
                  {s.title}
                </label>
              ))}
            </div>
          </div>
        ))}
      </fieldset>
      <label className="row small" style={{ fontWeight: 400, margin: 0, gap: 6 }}>
        <input type="checkbox" checked={homework} onChange={(e) => setHomework(e.target.checked)} style={{ width: "auto" }} />
        🏠 Make {picked.length === 1 ? "it" : "these"} homework
      </label>
      <label className="stack" style={{ fontWeight: 400, margin: 0, gap: 4 }}>
        A note (optional)
        <input
          value={note}
          maxLength={200}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Such as: We'll go over these on Tuesday"
        />
      </label>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        <button className="btn" disabled={busy || !picked.length}>
          {busy ? "Adding…" : `Add ${picked.length || ""} ${picked.length === 1 ? "activity" : "activities"}`.replace("  ", " ")}
        </button>
        <button type="button" className="btn secondary" onClick={() => onDone(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
