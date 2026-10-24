"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { type SetWork, workTitle, WorkResult } from "@/components/SetWork";
import { practiseable } from "@/lib/content/program";
import { subtopicPath } from "@/lib/content/tree";
import { type Curriculum, curriculumOf, subjectName, yearName } from "@/lib/curriculum/curricula";
import { YEARS, type Subject, type YearLevel } from "@/lib/curriculum/types";
import { CLASS_SUBJECTS, describeTime, MAX_SESSION_ACTIVITIES, type ClassTime } from "@/lib/auth/rules";
import { addWeeks, dayOfWeek, weekOf } from "@/lib/learner/lesson";
import type { LearnerProfile } from "@/lib/learner/model";

interface PlannerStudent {
  id: string;
  name: string;
  yearLevel: number;
  curriculum: LearnerProfile["curriculum"];
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

const shortDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

const inBox = (s: PlannerStudent, slot: number) => s.planned.find((w) => w.kind === "topic" && w.slot === slot);
const filled = (s: PlannerStudent) => s.planned.filter((w) => w.kind === "topic" && w.slot).length;

/** The subtopic's own name, short enough for a box ("Equivalent fractions"), with its topic underneath. */
function boxTitle(w: SetWork, curriculum: Curriculum): { title: string; topic: string | null } {
  const path = w.kind === "topic" ? subtopicPath(w.subtopicId, curriculum) : null;
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
 * eight activity boxes across. Click a box to put an activity in it or change it; click a student
 * to see their last four weeks and how they went. Homework is an activity marked 🏠, or a redo of
 * the questions the student didn't get right first go.
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
          Click a box to choose or change an activity (ten questions). Click a student to see their last four weeks.
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
  const [history, setHistory] = useState<PlannerStudent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const redoFor = (s: PlannerStudent, subject: Subject) => s.planned.find((w) => w.kind === "mistakes" && w.subject === subject);
  const canRedo = (s: PlannerStudent, subject: Subject) =>
    !redoFor(s, subject) && s.planned.some((w) => w.kind === "topic" && w.subject === subject);
  async function act(url: string, method: string, body?: unknown) {
    setError(await send(url, method, body));
    await reload();
  }
  const addRedo = (learners: PlannerStudent[], subject: Subject) =>
    act("/api/planner", "POST", { kind: "mistakes", classId: c.id, week, learnerIds: learners.map((s) => s.id), subject });

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
      </div>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
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
                    <button
                      className="planner-head"
                      title={`Choose activity ${slot} for the whole class`}
                      onClick={() => setEditing({ slot, students })}
                    >
                      {slot} <span aria-hidden>▾</span>
                    </button>
                  </th>
                ))}
                <th scope="col" className="planner-redo-head">
                  🏠 Redo wrong
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <th scope="row" className="planner-name">
                    <button className="planner-student-button" onClick={() => setHistory(s)}>
                      <strong>{s.name}</strong>
                      <span className="small muted">
                        {filled(s)} of {MAX_SESSION_ACTIVITIES}
                      </span>
                    </button>
                  </th>
                  {SLOTS.map((slot) => {
                    const w = inBox(s, slot);
                    return (
                      <td key={slot}>
                        <ActivityBox
                          work={w}
                          curriculum={curriculumOf(s.curriculum)}
                          showSubject={subjects.length > 1}
                          label={`${s.name}, activity ${slot}`}
                          onClick={() => setEditing({ slot, students: [s] })}
                        />
                      </td>
                    );
                  })}
                  <td>
                    <div className="stack" style={{ gap: 4 }}>
                      {subjects.map((subject) => {
                        const redo = redoFor(s, subject);
                        const name = subjects.length > 1 ? `${subjectName(subject, curriculum)} ` : "";
                        if (redo)
                          return (
                            <div key={subject} className="planner-box filled homework">
                              <span className="planner-box-title">🏠 Redo {name}wrong</span>
                              {redo.doneAt ? (
                                <Score work={redo} />
                              ) : (
                                <button
                                  className="link-button small"
                                  onClick={() => {
                                    if (confirm(`Take the redo homework off ${s.name}'s plan?`))
                                      void act(`/api/set-work/${redo.id}?learner=${s.id}`, "DELETE");
                                  }}
                                >
                                  Take off
                                </button>
                              )}
                            </div>
                          );
                        return canRedo(s, subject) ? (
                          <button key={subject} className="planner-box empty" onClick={() => void addRedo([s], subject)}>
                            + Redo {name}wrong
                          </button>
                        ) : null;
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {subjects.some((subject) => students.filter((s) => canRedo(s, subject)).length > 1) && (
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
          {subjects.map((subject) => {
            const who = students.filter((s) => canRedo(s, subject));
            return who.length > 1 ? (
              <button key={subject} className="btn secondary small" onClick={() => void addRedo(who, subject)}>
                🏠 Homework for everyone: redo {subjects.length > 1 ? `${subjectName(subject, curriculum)} ` : ""}questions got wrong
              </button>
            ) : null;
          })}
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

/** Chooses or changes the activity in one box, for one student or the whole class. */
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
  const [picked, setPicked] = useState<string>(current?.subtopicId ?? "");
  const [homework, setHomework] = useState(current?.homework ?? false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saved = useRef(false);
  const topics = practiseable(subject, year, curriculum).filter((t) => t.subtopics.length);
  const done = students.filter((s) => inBox(s, slot)?.doneAt);
  const who = one ? one.name : "the whole class";
  const closer = useRef<() => void>(() => {});
  const close = (didSave: boolean) => {
    saved.current = didSave;
    closer.current();
  };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const err = await send("/api/planner", "POST", {
      kind: "slot",
      classId,
      week,
      slot,
      learnerIds: students.map((s) => s.id),
      subject,
      subtopicId: picked,
      homework,
    });
    setBusy(false);
    if (err) return setError(err);
    close(true);
  }
  async function takeOff() {
    if (!current || !one) return;
    setBusy(true);
    const err = await send(`/api/set-work/${current.id}?learner=${one.id}`, "DELETE");
    setBusy(false);
    if (err) return setError(err);
    close(true);
  }

  return (
    <Dialog label={`Activity ${slot} for ${who}`} onClose={() => onClose(saved.current)}>
      {(closeDialog) => {
        closer.current = closeDialog;
        return (
          <div className="stack">
            <div className="row spread" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
              <h2 style={{ margin: 0 }}>
                Activity {slot} for {who}
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
                  {one!.name} has done this one, so it stays as it is.
                </p>
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
                    {done.map((s) => s.name).join(", ")} {done.length === 1 ? "has" : "have"} done activity {slot}, so theirs stays as it
                    is.
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
                <fieldset className="stack planner-topics" style={{ gap: 8, margin: 0 }}>
                  <legend className="small muted">Choose an activity: ten questions, easy to hard</legend>
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
                <label className="row small" style={{ fontWeight: 400, margin: 0, gap: 6 }}>
                  <input type="checkbox" checked={homework} onChange={(e) => setHomework(e.target.checked)} style={{ width: "auto" }} />
                  🏠 Homework (do it at home after class)
                </label>
                {error && (
                  <div className="feedback bad" role="alert">
                    {error}
                  </div>
                )}
                <div className="row" style={{ flexWrap: "wrap" }}>
                  <button className="btn" disabled={busy || !picked}>
                    {busy ? "Saving…" : current ? "Change activity" : "Add activity"}
                  </button>
                  {current && (
                    <button type="button" className="btn secondary" disabled={busy} onClick={() => void takeOff()}>
                      Take it off
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
  const scored = weeks?.flatMap((w) => w.work).filter((w) => w.doneAt && w.total) ?? [];
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
            return (
              <div key={w.week} className="planner-history-week">
                <div className="planner-history-label">
                  <strong className="small">{shortDate(w.week)}</strong>
                  <span className="small muted">{done.length ? `${done.length} done` : "Nothing done"}</span>
                </div>
                <div className="planner-history-row">
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
