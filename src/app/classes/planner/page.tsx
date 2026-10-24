"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { type SetWork, workTitle, WorkResult } from "@/components/SetWork";
import { practiseable } from "@/lib/content/program";
import { subtopicPath } from "@/lib/content/tree";
import { type Curriculum, curriculumOf, subjectName, yearName } from "@/lib/curriculum/curricula";
import { YEARS, type Subject, type YearLevel } from "@/lib/curriculum/types";
import { CLASS_SUBJECTS, describeTime, homeworkSlot, MAX_SESSION_ACTIVITIES, MAX_SESSION_HOMEWORK, type ClassTime } from "@/lib/auth/rules";
import { autoSlots, type AutoActivity } from "@/lib/learner/autoActivities";
import { addWeeks, dayOfWeek, weekOf } from "@/lib/learner/lesson";
import type { LearnerProfile } from "@/lib/learner/model";

interface PlannerStudent {
  id: string;
  name: string;
  yearLevel: number;
  curriculum: LearnerProfile["curriculum"];
  /** The weekly lessons' activities, added by themselves, in the first boxes. */
  auto: AutoActivity[];
  planned: SetWork[];
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

const SLOTS = Array.from({ length: MAX_SESSION_ACTIVITIES }, (_, i) => i + 1);
/** The homework boxes, after the session's activities. */
const HOMEWORK_SLOTS = Array.from({ length: MAX_SESSION_HOMEWORK }, (_, i) => MAX_SESSION_ACTIVITIES + i + 1);

/** A box's name: "activity 5", or "homework 2" for the boxes after the session's eight. */
const slotName = (slot: number) => (homeworkSlot(slot) ? `homework ${slot - MAX_SESSION_ACTIVITIES}` : `activity ${slot}`);

const shortDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

const inBox = (s: PlannerStudent, slot: number) => s.planned.find((w) => w.slot === slot);
const filled = (s: PlannerStudent, slots: number[]) => slots.filter((slot) => inBox(s, slot)).length;

/** The subtopic's own name, short enough for a box ("Equivalent fractions"), with its topic underneath. */
function boxTitle(w: SetWork, curriculum: Curriculum): { title: string; topic: string | null } {
  const path = w.kind === "topic" ? subtopicPath(w.subtopicId, curriculum) : null;
  if (w.kind === "mistakes") return { title: "Redo wrong", topic: "From class" };
  if (!path) return { title: workTitle(w, curriculum), topic: null };
  return { title: path.subtopic.title, topic: path.topic.title === path.subtopic.title ? null : path.topic.title };
}

/** Sends a change to the planner, giving back the server's error if it didn't work. */
async function send(url: string, method: string, body?: unknown): Promise<string | null> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  }).catch(() => null);
  if (res?.ok) return null;
  const json = (await res?.json().catch(() => ({}))) as { error?: string };
  return json?.error ?? "That didn't work. Try again.";
}

/**
 * The lesson planner: each class's weekly session as a grid, students down the left and their
 * eight activity boxes across, then three homework boxes. Click a box to put an activity in it,
 * change it or delete it; click a student to see their last four weeks and how they went. Homework
 * is an activity, or a redo of the questions the student didn't get right first go.
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
          Click a box to choose, change or delete an activity (ten questions). After the eight activities come up to three pieces of
          homework. Click a student to see their last four weeks.
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
        <ClassGrid key={c.class.id} data={c} week={week} reload={load} />
      ))}
    </div>
  );
}

type Editing = { slot: number; students: PlannerStudent[] };

/** One class's session: when it meets, and the grid of students and boxes. */
function ClassGrid({ data, week, reload }: { data: PlannerClass; week: string; reload: () => Promise<void> }) {
  const { class: c, students } = data;
  const subjects: Subject[] = c.subject === "both" ? ["maths", "english"] : [c.subject];
  const curriculum = curriculumOf(students[0]?.curriculum);
  const [editing, setEditing] = useState<Editing | null>(null);
  // The first boxes are the weekly lessons, which fill themselves.
  const autoCount = autoSlots(c.subject);
  const [history, setHistory] = useState<PlannerStudent | null>(null);

  return (
    <section className="card stack planner-class" aria-labelledby={`class-${c.id}`}>
      <div>
        <h2 id={`class-${c.id}`} style={{ margin: 0 }}>
          {c.name}
        </h2>
        <p className="small muted" style={{ margin: "4px 0 0" }}>
          Year {c.yearLevel}, {CLASS_SUBJECTS[c.subject]}
          {c.teacherName ? `, with ${c.teacherName}` : ""}
          {c.times.map((t) => ` · 🗓 ${shortDate(dayOfWeek(week, t.weekday))}, ${describeTime(t).replace(/^\w+ /, "")}`).join("")}
        </p>
        <p className="small" style={{ margin: "4px 0 0" }}>
          Boxes 1 to {autoCount} fill themselves from each student&apos;s weekly{" "}
          {c.subject === "english" ? "English" : c.subject === "maths" ? "maths" : "maths and English"} lessons. Add your own from box{" "}
          {autoCount + 1}. The 🏠 boxes after them are homework.
        </p>
      </div>
      {students.length === 0 ? (
        <p className="muted" style={{ margin: 0 }}>
          No students in this class yet.
        </p>
      ) : (
        <div className="planner-scroll">
          <table className="planner-grid">
            <thead>
              <tr>
                <th scope="col" className="planner-name">
                  Student
                </th>
                {SLOTS.map((slot) => (
                  <th key={slot} scope="col">
                    {slot <= autoCount ? (
                      <span className="planner-head auto" title="Added by itself each week from the student's weekly lesson">
                        {slot} Auto
                      </span>
                    ) : (
                      <button
                        className="planner-head"
                        title={`Choose activity ${slot} for the whole class`}
                        onClick={() => setEditing({ slot, students })}
                      >
                        {slot} <span aria-hidden>▾</span>
                      </button>
                    )}
                  </th>
                ))}
                {HOMEWORK_SLOTS.map((slot) => (
                  <th key={slot} scope="col">
                    <button
                      className="planner-head homework"
                      title={`Choose ${slotName(slot)} for the whole class`}
                      onClick={() => setEditing({ slot, students })}
                    >
                      🏠 {slot - MAX_SESSION_ACTIVITIES} <span aria-hidden>▾</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <th scope="row" className="planner-name">
                    <button className="planner-student-button" onClick={() => setHistory(s)}>
                      <strong>{s.name}</strong>
                      <span className="small muted">
                        {Math.min(autoCount, s.auto.length) + filled(s, SLOTS)} of {MAX_SESSION_ACTIVITIES}
                        {filled(s, HOMEWORK_SLOTS) > 0 && (
                          <span style={{ display: "block" }} title="Homework">
                            🏠 {filled(s, HOMEWORK_SLOTS)}
                          </span>
                        )}
                      </span>
                    </button>
                  </th>
                  {[...SLOTS, ...HOMEWORK_SLOTS].map((slot) => {
                    if (slot <= autoCount)
                      return (
                        <td key={slot}>
                          <AutoBox activity={s.auto[slot - 1]} curriculum={curriculumOf(s.curriculum)} showSubject={subjects.length > 1} />
                        </td>
                      );
                    const w = inBox(s, slot);
                    return (
                      <td key={slot}>
                        <ActivityBox
                          work={w}
                          curriculum={curriculumOf(s.curriculum)}
                          showSubject={subjects.length > 1}
                          label={`${s.name}, ${slotName(slot)}`}
                          onClick={() => setEditing({ slot, students: [s] })}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editing && (
        <BoxEditor
          classId={c.id}
          week={week}
          slot={editing.slot}
          students={editing.students}
          subjects={subjects}
          yearLevel={editing.students.length === 1 ? editing.students[0].yearLevel : c.yearLevel}
          onClose={async (saved) => {
            setEditing(null);
            if (saved) await reload();
          }}
        />
      )}
      {history && <HistoryDialog student={history} week={week} onClose={() => setHistory(null)} />}
    </section>
  );
}

/** One box in the grid: the activity in it and how the student went, or a + to add one. */
function ActivityBox({
  work,
  curriculum,
  showSubject,
  label,
  onClick,
}: {
  work: SetWork | undefined;
  curriculum: Curriculum;
  showSubject: boolean;
  label: string;
  onClick: () => void;
}) {
  if (!work)
    return (
      <button className="planner-box empty" aria-label={`${label}: add`} onClick={onClick}>
        +
      </button>
    );
  const { title, topic } = boxTitle(work, curriculum);
  return (
    <button
      className={`planner-box filled${work.homework ? " homework" : ""}${work.doneAt ? " done" : ""}`}
      aria-label={`${label}: ${title}`}
      onClick={onClick}
    >
      {showSubject && <span className="planner-box-topic">{subjectName(work.subject, curriculum)}</span>}
      <span className="planner-box-title">{title}</span>
      {topic && <span className="planner-box-topic">{topic}</span>}
      <span className="planner-box-foot">
        {work.homework && <span title="Homework">🏠</span>}
        {work.doneAt ? <Score work={work} /> : <span className="small muted">To do</span>}
      </span>
    </button>
  );
}

/** How a finished activity went: green over 75% right first go, yellow 50 to 75%, red under 50%. */
function band(work: SetWork): "good" | "warn" | "bad" {
  if (!work.total) return "good";
  const score = work.right! / work.total;
  return score > 0.75 ? "good" : score >= 0.5 ? "warn" : "bad";
}

/** How a finished weekly lesson activity went, with the same colours as set work. */
function autoBand(a: AutoActivity): "good" | "warn" | "bad" {
  const score = a.total ? a.right! / a.total : 1;
  return score > 0.75 ? "good" : score >= 0.5 ? "warn" : "bad";
}

/** A box the weekly lesson fills by itself: what it is, and how far the student has got. */
function AutoBox({
  activity,
  curriculum,
  showSubject,
}: {
  activity: AutoActivity | undefined;
  curriculum: Curriculum;
  showSubject: boolean;
}) {
  if (!activity) return <div className="planner-box auto" />;
  const percent = activity.done && activity.total ? Math.round((activity.right! / activity.total) * 100) : null;
  return (
    <div
      className={`planner-box auto${activity.done ? ` ${autoBand(activity)}` : ""}`}
      title="Added by itself each week from the student's weekly lesson"
    >
      {showSubject && <span className="planner-box-topic">{subjectName(activity.subject, curriculum)}</span>}
      <span className="planner-box-title">{activity.title}</span>
      {activity.detail && <span className="planner-box-topic">{activity.detail}</span>}
      <span className="planner-box-foot">
        {activity.done ? (
          <span className={`pill ${autoBand(activity)}`}>
            {activity.detail === "Reading lesson" ? `${percent}%` : `${activity.right}/${activity.total}`}
          </span>
        ) : activity.answered ? (
          <span className="small muted">
            {activity.answered} of {activity.total}
          </span>
        ) : (
          <span className="small muted">Not started</span>
        )}
      </span>
    </div>
  );
}

/** A score as "8/10", coloured by how it went. */
function Score({ work }: { work: SetWork }) {
  if (!work.total)
    return (
      <span className="pill good" title="Everything was right first go">
        Nothing to redo
      </span>
    );
  return (
    <span className={`pill ${band(work)}`} title={`${work.right} of ${work.total} right first go`}>
      {work.right}/{work.total}
    </span>
  );
}

/** A dialog that opens as soon as it's on the page, and tells its parent when it closes. */
function Dialog({
  label,
  onClose,
  children,
  wide = false,
}: {
  wide?: boolean;
  label: string;
  onClose: () => void;
  children: (close: () => void) => React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      className={`preview-dialog planner-dialog ${wide ? "planner-history-dialog" : ""}`.trim()}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      {children(() => ref.current?.close())}
    </dialog>
  );
}

/**
 * Chooses, changes or deletes the activity in one box, for one student or the whole class. A
 * homework box can also redo the questions got wrong in the session.
 */
function BoxEditor({
  classId,
  week,
  slot,
  students,
  subjects,
  yearLevel,
  onClose,
}: {
  classId: string;
  week: string;
  slot: number;
  students: PlannerStudent[];
  subjects: Subject[];
  yearLevel: number;
  onClose: (saved: boolean) => void;
}) {
  const one = students.length === 1 ? students[0] : null;
  const current = one ? inBox(one, slot) : undefined;
  const curriculum = curriculumOf(students[0]?.curriculum);
  const [subject, setSubject] = useState<Subject>(current?.subject ?? subjects[0]);
  const [year, setYear] = useState<YearLevel>(yearLevel as YearLevel);
  const homework = homeworkSlot(slot);
  // A subtopic's id, or "redo:" and a subject for homework redoing the questions got wrong.
  const [picked, setPicked] = useState<string>(current?.kind === "mistakes" ? `redo:${current.subject}` : (current?.subtopicId ?? ""));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saved = useRef(false);
  const topics = practiseable(subject, year, curriculum).filter((t) => t.subtopics.length);
  const done = students.filter((s) => inBox(s, slot)?.doneAt);
  const withWork = students.filter((s) => inBox(s, slot));
  const who = one ? one.name : "the whole class";
  const name = slotName(slot);
  const Name = name[0].toUpperCase() + name.slice(1);
  const closer = useRef<() => void>(() => {});
  const close = (didSave: boolean) => {
    saved.current = didSave;
    closer.current();
  };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const learnerIds = students.map((s) => s.id);
    const err = picked.startsWith("redo:")
      ? await send("/api/planner", "POST", { kind: "mistakes", classId, week, slot, learnerIds, subject: picked.slice(5) })
      : await send("/api/planner", "POST", { kind: "slot", classId, week, slot, learnerIds, subject, subtopicId: picked });
    setBusy(false);
    if (err) return setError(err);
    close(true);
  }
  async function remove() {
    const scored = done.length
      ? ` ${done.map((s) => s.name).join(", ")} ${done.length === 1 ? "has" : "have"} done it, and the score goes too.`
      : "";
    if (!confirm(`Delete ${name} for ${one ? one.name : `${withWork.length} ${withWork.length === 1 ? "student" : "students"}`}?${scored}`))
      return;
    setBusy(true);
    const err = await send("/api/planner", "DELETE", { classId, week, slot, learnerIds: withWork.map((s) => s.id) });
    setBusy(false);
    if (err) return setError(err);
    close(true);
  }

  return (
    <Dialog label={`${Name} for ${who}`} onClose={() => onClose(saved.current)}>
      {(closeDialog) => {
        closer.current = closeDialog;
        return (
          <div className="stack">
            <div className="row spread" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
              <h2 style={{ margin: 0 }}>
                {homework && "🏠 "}
                {Name} for {who}
              </h2>
              <button type="button" className="btn secondary small" onClick={() => close(false)}>
                Close
              </button>
            </div>
            {current?.doneAt ? (
              <>
                <p style={{ margin: 0 }}>
                  <strong>{workTitle(current, curriculum)}</strong>
                  {current.homework ? " (homework)" : ""}
                </p>
                <p style={{ margin: 0 }}>
                  Done: <WorkResult work={current} />
                </p>
                <p className="small muted" style={{ margin: 0 }}>
                  {one!.name} has done this one, so it can&apos;t be changed. Deleting it takes its score away too.
                </p>
                {error && (
                  <div className="feedback bad" role="alert">
                    {error}
                  </div>
                )}
                <div className="row">
                  <button type="button" className="btn secondary" disabled={busy} onClick={() => void remove()}>
                    Delete it
                  </button>
                </div>
              </>
            ) : (
              <form className="stack" onSubmit={save} style={{ gap: 10 }}>
                {current && (
                  <p className="small" style={{ margin: 0 }}>
                    Now: <strong>{workTitle(current, curriculum)}</strong>. Pick another to change it.
                  </p>
                )}
                {!one && done.length > 0 && (
                  <p className="small muted" style={{ margin: 0 }}>
                    {done.map((s) => s.name).join(", ")} {done.length === 1 ? "has" : "have"} done {name}, so changing it leaves theirs as
                    it is.
                  </p>
                )}
                <div className="row" style={{ flexWrap: "wrap" }}>
                  {subjects.length > 1 && (
                    <label className="row" style={{ fontWeight: 400, margin: 0 }}>
                      Subject
                      <select
                        value={subject}
                        style={{ width: "auto" }}
                        onChange={(e) => {
                          setSubject(e.target.value as Subject);
                          setPicked("");
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
                    <select value={year} style={{ width: "auto" }} onChange={(e) => setYear(Number(e.target.value) as YearLevel)}>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {yearName(y, curriculum)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {homework && (
                  <fieldset className="stack" style={{ gap: 4, margin: 0 }}>
                    <legend className="small muted">Redo the questions got wrong in this session&apos;s activities</legend>
                    {subjects.map((s) => (
                      <label key={s} className="row small" style={{ fontWeight: 400, margin: 0, gap: 6 }}>
                        <input
                          type="radio"
                          name={`activity-${slot}`}
                          checked={picked === `redo:${s}`}
                          onChange={() => setPicked(`redo:${s}`)}
                          style={{ width: "auto" }}
                        />
                        Redo {subjects.length > 1 ? `${subjectName(s, curriculum)} ` : ""}questions got wrong
                      </label>
                    ))}
                  </fieldset>
                )}
                <fieldset className="stack planner-topics" style={{ gap: 8, margin: 0 }}>
                  <legend className="small muted">{homework ? "Or choose" : "Choose"} an activity: ten questions, easy to hard</legend>
                  {topics.map(({ topic, subtopics }) => (
                    <div key={topic.id}>
                      <strong className="small">{topic.title}</strong>
                      <div className="row" style={{ gap: "4px 14px", flexWrap: "wrap" }}>
                        {subtopics.map((s) => (
                          <label key={s.id} className="row small" style={{ fontWeight: 400, margin: 0, gap: 6 }}>
                            <input
                              type="radio"
                              name={`activity-${slot}`}
                              checked={picked === s.id}
                              onChange={() => setPicked(s.id)}
                              style={{ width: "auto" }}
                            />
                            {s.title}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </fieldset>
                {error && (
                  <div className="feedback bad" role="alert">
                    {error}
                  </div>
                )}
                <div className="row" style={{ flexWrap: "wrap" }}>
                  <button className="btn" disabled={busy || !picked}>
                    {busy ? "Saving…" : current ? "Change it" : homework ? "Add homework" : "Add activity"}
                  </button>
                  {withWork.length > 0 && (
                    <button type="button" className="btn secondary" disabled={busy} onClick={() => void remove()}>
                      {one ? "Delete it" : `Delete for ${withWork.length === 1 ? withWork[0].name : `all ${withWork.length}`}`}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        );
      }}
    </Dialog>
  );
}

interface HistoryWeek {
  week: string;
  /** The weekly lessons' activities the student finished (this week only: earlier weeks' aren't kept). */
  auto: AutoActivity[];
  work: SetWork[];
}

/** A student's last four weeks: each week's activities and homework, and the score on each. */
function HistoryDialog({ student, week, onClose }: { student: PlannerStudent; week: string; onClose: () => void }) {
  const [weeks, setWeeks] = useState<HistoryWeek[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const curriculum = curriculumOf(student.curriculum);
  useEffect(() => {
    void fetch(`/api/planner/history?learner=${student.id}&week=${week}`)
      .then(async (r) => {
        const body = (await r.json().catch(() => ({}))) as { weeks?: HistoryWeek[]; error?: string };
        if (r.ok && body.weeks) setWeeks(body.weeks);
        else setError(body.error ?? "Couldn't load their weeks.");
      })
      .catch(() => setError("Couldn't connect. Try again."));
  }, [student.id, week]);
  const scored = [
    ...(weeks?.flatMap((w) => w.work).filter((w) => w.doneAt && w.total) ?? []),
    ...(weeks?.flatMap((w) => w.auto).filter((a) => a.total) ?? []),
  ];
  const right = scored.reduce((n, w) => n + w.right!, 0);
  const total = scored.reduce((n, w) => n + w.total!, 0);

  return (
    <Dialog label={`${student.name}'s last four weeks`} onClose={onClose} wide>
      {(close) => (
        <div className="stack">
          <div className="row spread" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
            <div>
              <h2 style={{ margin: 0 }}>{student.name}: last four weeks</h2>
              {total > 0 && (
                <p className="small muted" style={{ margin: "4px 0 0" }}>
                  {Math.round((right / total) * 100)}% right first go across {scored.length}{" "}
                  {scored.length === 1 ? "activity" : "activities"} done
                </p>
              )}
            </div>
            <button type="button" className="btn secondary small" onClick={close}>
              Close
            </button>
          </div>
          {error && <div className="feedback bad">{error}</div>}
          {!weeks && !error && <p className="muted">Loading…</p>}
          {weeks?.map((w) => {
            const done = w.work.filter((x) => x.doneAt);
            const count = done.length + w.auto.length;
            return (
              <div key={w.week} className="planner-history-week">
                <div className="planner-history-label">
                  <strong className="small">{shortDate(w.week)}</strong>
                  <span className="small muted">{count ? `${count} done` : "Nothing done"}</span>
                </div>
                <div className="planner-history-row">
                  {w.auto.map((a, i) => {
                    const percent = a.total ? Math.round((a.right! / a.total) * 100) : 100;
                    return (
                      <div key={`auto-${i}`} className={`planner-history-box ${autoBand(a)}`} title={a.detail ?? undefined}>
                        <span className="planner-box-title">{a.title}</span>
                        <span className="planner-history-score">
                          {percent}% {a.detail !== "Reading lesson" && <small>{`${a.right}/${a.total}`}</small>}
                        </span>
                      </div>
                    );
                  })}
                  {done.map((x) => {
                    const { title } = boxTitle(x, curriculum);
                    return (
                      <div
                        key={x.id}
                        className={`planner-history-box ${band(x)}`}
                        title={x.total ? `${x.right} of ${x.total} right first go` : "Nothing to redo"}
                      >
                        <span className="planner-box-title">{x.kind === "mistakes" ? "Redo wrong" : title}</span>
                        <span className="planner-history-score">
                          {x.homework && <span title="Homework">🏠 </span>}
                          {x.total ? (
                            <>
                              {Math.round((x.right! / x.total) * 100)}% <small>{`${x.right}/${x.total}`}</small>
                            </>
                          ) : (
                            "Nothing to redo"
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Dialog>
  );
}
