"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { WeekCalendar } from "@/components/WeekCalendar";
import { CLASS_SUBJECTS as SUBJECTS, describeTime, formatDuration, WEEKDAYS, type ClassTime } from "@/lib/auth/rules";
import { YEARS } from "@/lib/curriculum/types";
import { dateOfBirthProblem, describeBirth, today } from "@/lib/learner/birth";

interface Teacher {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  lastLoginAt: string | null;
}

type Subject = "maths" | "english" | "both";

interface CentreClass {
  id: string;
  name: string;
  yearLevel: number;
  subject: Subject;
  teacherId: string | null;
  teacherName: string | null;
  students: number;
  times: ClassTime[];
}

interface Student {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
  lastLoginAt: string | null;
  classIds: string[];
  learnToRead: boolean;
  /** "YYYY-MM-DD", when entered. */
  dateOfBirth: string | null;
  /** Parents who can see this student's work. */
  parents: { id: string; name: string; email: string; lastLoginAt: string | null }[];
}

interface Centre {
  name: string;
  teachers: Teacher[];
  classes: CentreClass[];
  students: Student[];
  maxStudents: number;
  email: boolean;
}

interface Invite {
  email: string;
  link: string;
  emailed: boolean;
  emailError?: string;
}

/** A parent linked to a student: an existing account, or a new one with a set-password link. */
type ParentInvite = { email: string; existing: true } | (Invite & { existing: false });

const date = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short" }) : "Never");

/** Sends a JSON request and returns the error to show, or null when it worked. */
async function send(url: string, method: string, body?: unknown): Promise<{ error: string | null; data: Record<string, unknown> }> {
  const res = await fetch(url, {
    method,
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  }).catch(() => null);
  const data = ((await res?.json().catch(() => ({}))) ?? {}) as Record<string, unknown>;
  return { error: res?.ok ? null : ((data.error as string | undefined) ?? "That didn't work."), data };
}

/**
 * A tutoring centre's own page: its teachers, its classes (like myteacher's courses) and its
 * students, each with a username and password to sign in with.
 */
export default function CentrePage() {
  const [centre, setCentre] = useState<Centre | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/centre").catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as Centre & { error?: string };
    if (!res?.ok) return setLoadError(body?.error ?? "Couldn't load your centre.");
    setCentre(body);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /** Runs a change, then shows what happened and reloads. */
  async function run(work: Promise<{ error: string | null; data: Record<string, unknown> }>, done?: string): Promise<boolean> {
    setError(null);
    setNotice(null);
    setInviteLink(null);
    const { error } = await work;
    if (error) setError(error);
    else if (done) setNotice(done);
    await load();
    return !error;
  }

  function invited(r: Invite) {
    setError(null);
    if (r.emailed) {
      setInviteLink(null);
      setNotice(`We've emailed ${r.email} a link to set their password.`);
    } else {
      setNotice(
        r.emailError
          ? `The email to ${r.email} didn't send (${r.emailError}). Send them this link to set their password instead. It works once, for 7 days.`
          : `Email isn't set up yet, so send ${r.email} this link to set their password. It works once, for 7 days.`,
      );
      setInviteLink(r.link);
    }
  }

  if (loadError) return <div className="feedback bad">{loadError}</div>;
  if (!centre) return <p className="muted">Loading…</p>;

  return (
    <div className="stack">
      <div>
        <h1>{centre.name}</h1>
        <p className="muted" style={{ margin: 0 }}>
          {centre.classes.length} {centre.classes.length === 1 ? "class" : "classes"}, {centre.teachers.length}{" "}
          {centre.teachers.length === 1 ? "teacher" : "teachers"} and {centre.students.length}{" "}
          {centre.students.length === 1 ? "student" : "students"}.
        </p>
      </div>

      {notice && (
        <div className={`feedback ${inviteLink ? "warn" : "good"}`} role="status">
          {notice}
          {inviteLink && (
            <div className="row" style={{ marginTop: 8, flexWrap: "nowrap" }}>
              <input readOnly value={inviteLink} aria-label="Set-password link" onFocus={(e) => e.target.select()} />
              <button className="btn secondary small" onClick={() => void navigator.clipboard?.writeText(inviteLink)}>
                Copy
              </button>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}

      <div className="card stack">
        <h2 style={{ margin: 0 }}>Timetable</h2>
        <WeekCalendar classes={centre.classes} />
      </div>
      <Classes centre={centre} run={run} />
      <Students centre={centre} run={run} onInvited={invited} />
      <Teachers centre={centre} run={run} onInvited={invited} />
    </div>
  );
}

type Run = (work: Promise<{ error: string | null; data: Record<string, unknown> }>, done?: string) => Promise<boolean>;

function YearSelect({ id, value, onChange }: { id?: string; value: number; onChange: (year: number) => void }) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {YEARS.map((y) => (
        <option key={y} value={y}>
          Year {y}
        </option>
      ))}
    </select>
  );
}

function Classes({ centre, run }: { centre: Centre; run: Run }) {
  const [editing, setEditing] = useState<string | "new" | null>(null);
  return (
    <div className="card stack">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>Classes</h2>
        {editing !== "new" && (
          <button className="btn small" onClick={() => setEditing("new")}>
            Add a class
          </button>
        )}
      </div>
      {editing === "new" && (
        <ClassForm
          teachers={centre.teachers}
          onCancel={() => setEditing(null)}
          onSave={async (c) => {
            if (await run(send("/api/centre/classes", "POST", c), `Added the class ${c.name}.`)) setEditing(null);
          }}
        />
      )}
      {centre.classes.length === 0 ? (
        <p className="muted" style={{ margin: 0 }}>
          No classes yet. Add one, give it a teacher, then put students in it.
        </p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Year</th>
                <th>Subject</th>
                <th>When</th>
                <th>Teacher</th>
                <th>Students</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {centre.classes.map((c) =>
                editing === c.id ? (
                  <tr key={c.id}>
                    <td colSpan={7}>
                      <ClassForm
                        initial={c}
                        teachers={centre.teachers}
                        onCancel={() => setEditing(null)}
                        onSave={async (next) => {
                          if (await run(send(`/api/centre/classes/${c.id}`, "PATCH", next), `Saved ${next.name}.`)) setEditing(null);
                        }}
                      />
                    </td>
                  </tr>
                ) : (
                  <tr key={c.id}>
                    <td>
                      <Link href={`/classes/${c.id}`}>
                        <strong>{c.name}</strong>
                      </Link>
                    </td>
                    <td>Year {c.yearLevel}</td>
                    <td>{SUBJECTS[c.subject]}</td>
                    <td className="small">
                      {c.times.length ? (
                        c.times.map((t) => <div key={`${t.weekday} ${t.start}`}>{describeTime(t)}</div>)
                      ) : (
                        <span className="muted">Not set</span>
                      )}
                    </td>
                    <td>{c.teacherName ?? <span className="muted">No teacher yet</span>}</td>
                    <td>{c.students}</td>
                    <td>
                      <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                        <Link className="btn secondary small" href={`/classes/${c.id}`}>
                          Progress
                        </Link>
                        <button className="btn secondary small" onClick={() => setEditing(c.id)}>
                          Edit
                        </button>
                        <button
                          className="btn secondary small"
                          onClick={() => {
                            if (confirm(`Delete the class ${c.name}? Its students stay at your centre.`))
                              void run(send(`/api/centre/classes/${c.id}`, "DELETE"), `Deleted ${c.name}.`);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

type ClassDetails = { name: string; yearLevel: number; subject: Subject; teacherId: string | null; times: ClassTime[] };

const DURATIONS = [30, 45, 60, 75, 90, 120, 150, 180];

/** The weekly times a class meets: a day, a start time and how long, as many as it needs. */
function TimesEditor({ times, onChange }: { times: ClassTime[]; onChange: (times: ClassTime[]) => void }) {
  const set = (i: number, change: Partial<ClassTime>) => onChange(times.map((t, j) => (j === i ? { ...t, ...change } : t)));
  const last = times.at(-1);
  return (
    <fieldset className="class-picker class-times">
      <legend>When it meets each week</legend>
      {times.length === 0 && (
        <p className="small muted" style={{ margin: 0 }}>
          No times yet. Add one to show the class on the timetable.
        </p>
      )}
      {times.map((t, i) => (
        <div key={i} className="class-time-row">
          <select aria-label="Day" value={t.weekday} onChange={(e) => set(i, { weekday: Number(e.target.value) })}>
            {WEEKDAYS.map((d, n) => (
              <option key={d} value={n + 1}>
                {d}
              </option>
            ))}
          </select>
          <input
            aria-label="Start time"
            type="time"
            step={300}
            value={t.start}
            required
            onChange={(e) => set(i, { start: e.target.value })}
          />
          <select aria-label="How long" value={t.minutes} onChange={(e) => set(i, { minutes: Number(e.target.value) })}>
            {[...new Set([...DURATIONS, t.minutes])]
              .sort((a, b) => a - b)
              .map((m) => (
                <option key={m} value={m}>
                  {formatDuration(m)}
                </option>
              ))}
          </select>
          <button
            type="button"
            className="btn secondary small"
            onClick={() => onChange(times.filter((_, j) => j !== i))}
            aria-label="Remove this time"
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <button
          type="button"
          className="btn secondary small"
          onClick={() =>
            onChange([...times, last ? { ...last, weekday: (last.weekday % 7) + 1 } : { weekday: 1, start: "16:00", minutes: 60 }])
          }
        >
          Add a time
        </button>
      </div>
    </fieldset>
  );
}

function ClassForm({
  initial,
  teachers,
  onSave,
  onCancel,
}: {
  initial?: ClassDetails;
  teachers: Teacher[];
  onSave: (c: ClassDetails) => Promise<void>;
  onCancel: () => void;
}) {
  const [c, setC] = useState<ClassDetails>(
    initial ?? {
      name: "",
      yearLevel: 4,
      subject: "both",
      teacherId: teachers[0]?.id ?? null,
      times: [{ weekday: 1, start: "16:00", minutes: 60 }],
    },
  );
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="stack class-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await onSave({ name: c.name, yearLevel: c.yearLevel, subject: c.subject, teacherId: c.teacherId, times: c.times });
        setBusy(false);
      }}
    >
      <div className="grid grid-2">
        <div>
          <label htmlFor="class-name">Class name</label>
          <input
            id="class-name"
            value={c.name}
            onChange={(e) => setC({ ...c, name: e.target.value })}
            maxLength={100}
            placeholder="Year 4 Saturday Maths"
            required
          />
        </div>
        <div>
          <label htmlFor="class-teacher">Teacher</label>
          <select id="class-teacher" value={c.teacherId ?? ""} onChange={(e) => setC({ ...c, teacherId: e.target.value || null })}>
            <option value="">No teacher yet</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="class-year">Year</label>
          <YearSelect id="class-year" value={c.yearLevel} onChange={(yearLevel) => setC({ ...c, yearLevel })} />
        </div>
        <div>
          <label htmlFor="class-subject">Subject</label>
          <select id="class-subject" value={c.subject} onChange={(e) => setC({ ...c, subject: e.target.value as Subject })}>
            {Object.entries(SUBJECTS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <TimesEditor times={c.times} onChange={(times) => setC({ ...c, times })} />
      <div className="row">
        <button className="btn" disabled={busy}>
          {busy ? "Saving…" : initial ? "Save class" : "Add class"}
        </button>
        <button type="button" className="btn secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function ClassPicker({ classes, value, onChange }: { classes: CentreClass[]; value: string[]; onChange: (ids: string[]) => void }) {
  if (!classes.length) return <p className="small muted">Add a class first to put students in it.</p>;
  return (
    <fieldset className="class-picker">
      <legend>Classes</legend>
      {classes.map((c) => (
        <label key={c.id} className="row" style={{ fontWeight: 400, margin: 0, gap: 6 }}>
          <input
            type="checkbox"
            style={{ width: "auto" }}
            checked={value.includes(c.id)}
            onChange={(e) => onChange(e.target.checked ? [...value, c.id] : value.filter((id) => id !== c.id))}
          />
          {c.name}
        </label>
      ))}
    </fieldset>
  );
}

function Students({ centre, run, onInvited }: { centre: Centre; run: Run; onInvited: (r: Invite) => void }) {
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [linking, setLinking] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const className = (id: string) => centre.classes.find((c) => c.id === id)?.name;
  const shown = centre.students.filter((s) => `${s.name} ${s.username ?? ""}`.toLowerCase().includes(filter.trim().toLowerCase()));
  return (
    <div className="card stack">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>Students</h2>
        <div className="row" style={{ gap: 8 }}>
          {centre.students.length > 8 && (
            <input
              type="search"
              placeholder="Search students"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ maxWidth: 200 }}
              aria-label="Search students"
            />
          )}
          {editing !== "new" && centre.students.length < centre.maxStudents && (
            <button className="btn small" onClick={() => setEditing("new")}>
              Add a student
            </button>
          )}
        </div>
      </div>
      {editing === "new" && (
        <StudentForm
          classes={centre.classes}
          onCancel={() => setEditing(null)}
          onSave={async (s) => {
            const ok = await run(
              send("/api/centre/students", "POST", s),
              `Added ${s.name}. They log in with the username ${s.username} and the password you set.`,
            );
            if (ok) setEditing(null);
          }}
        />
      )}
      {centre.students.length === 0 ? (
        <p className="muted" style={{ margin: 0 }}>
          No students yet. Each student gets a username and password to log in with, and their own progress.
        </p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Year</th>
                <th>Username</th>
                <th>Classes</th>
                <th>Parents</th>
                <th>Last sign-in</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shown.map((s) =>
                editing === s.id ? (
                  <tr key={s.id}>
                    <td colSpan={7}>
                      <StudentForm
                        initial={s}
                        classes={centre.classes}
                        onCancel={() => setEditing(null)}
                        onSave={async (next) => {
                          if (await run(send(`/api/centre/students/${s.id}`, "PATCH", next), `Saved ${next.name ?? s.name}.`))
                            setEditing(null);
                        }}
                      />
                    </td>
                  </tr>
                ) : (
                  <tr key={s.id}>
                    <td>
                      <strong>{s.name}</strong>
                      {s.dateOfBirth && <div className="small muted">{describeBirth(s.dateOfBirth)}</div>}
                    </td>
                    <td>Year {s.yearLevel}</td>
                    <td>{s.username ?? <span className="muted">None</span>}</td>
                    <td>
                      {s.classIds.map(className).filter(Boolean).join(", ") || <span className="muted">None</span>}
                      {s.learnToRead && <div className="small">📖 Learn to Read</div>}
                    </td>
                    <td>
                      <Parents
                        student={s}
                        linking={linking === s.id}
                        onLink={() => setLinking(s.id)}
                        onDone={async (invite) => {
                          setLinking(null);
                          if (!invite) return;
                          const message = invite.existing
                            ? `${invite.email} already has an account, so ${s.name} is now on their Parents page.`
                            : undefined;
                          await run(Promise.resolve({ error: null, data: {} }), message);
                          if (!invite.existing) onInvited(invite);
                        }}
                        onRemove={(p) => {
                          if (confirm(`Stop ${p.name} seeing ${s.name}'s work? Their account stays.`))
                            void run(
                              send(`/api/centre/students/${s.id}/parents/${p.id}`, "DELETE"),
                              `${p.name} can no longer see ${s.name}.`,
                            );
                        }}
                      />
                    </td>
                    <td>{date(s.lastLoginAt)}</td>
                    <td>
                      <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                        <button className="btn secondary small" onClick={() => setEditing(s.id)}>
                          Edit
                        </button>
                        <button
                          className="btn secondary small"
                          onClick={() => {
                            if (confirm(`Delete ${s.name}? Their sign-in and all their progress are deleted too.`))
                              void run(send(`/api/centre/students/${s.id}`, "DELETE"), `Deleted ${s.name}.`);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** A student's parents, who see their work for free, and a form to add one. */
function Parents({
  student,
  linking,
  onLink,
  onDone,
  onRemove,
}: {
  student: Student;
  linking: boolean;
  onLink: () => void;
  onDone: (invite: ParentInvite | null) => void;
  onRemove: (parent: Student["parents"][number]) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error, data } = await send(`/api/centre/students/${student.id}/parents`, "POST", { name, email });
    setBusy(false);
    if (error) return setError(error);
    setName("");
    setEmail("");
    onDone(data as unknown as ParentInvite);
  }

  return (
    <div className="stack" style={{ gap: 4 }}>
      {student.parents.map((p) => (
        <div key={p.id} className="small">
          {p.name} <span className="muted">({p.email})</span>{" "}
          <button className="link-button small" style={{ textDecoration: "underline" }} onClick={() => onRemove(p)}>
            Remove
          </button>
        </div>
      ))}
      {linking ? (
        <form className="stack" style={{ gap: 6 }} onSubmit={add}>
          <input aria-label="Parent's name" placeholder="Parent's name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input
            aria-label="Parent's email"
            placeholder="Parent's email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="small muted" style={{ margin: 0 }}>
            They&apos;ll see {student.name}&apos;s progress on their Parents page. You pay for {student.name}, so they don&apos;t.
          </p>
          {error && (
            <div className="feedback bad small" role="alert">
              {error}
            </div>
          )}
          <div className="row" style={{ gap: 6 }}>
            <button className="btn small" disabled={busy}>
              {busy ? "Adding…" : "Add parent"}
            </button>
            <button type="button" className="btn secondary small" onClick={() => onDone(null)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="btn secondary small" onClick={onLink}>
          Add a parent
        </button>
      )}
    </div>
  );
}

interface StudentChange {
  name?: string;
  yearLevel?: number;
  username?: string;
  password?: string;
  classIds?: string[];
  learnToRead?: boolean;
  /** Null clears it. */
  dateOfBirth?: string | null;
}

function StudentForm({
  initial,
  classes,
  onSave,
  onCancel,
}: {
  initial?: Student;
  classes: CentreClass[];
  onSave: (s: StudentChange & { name: string; username: string }) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [yearLevel, setYearLevel] = useState(initial?.yearLevel ?? 4);
  const [username, setUsername] = useState(initial?.username ?? "");
  const [password, setPassword] = useState("");
  const [classIds, setClassIds] = useState<string[]>(initial?.classIds ?? []);
  const [learnToRead, setLearnToRead] = useState(initial?.learnToRead ?? false);
  const [dateOfBirth, setDateOfBirth] = useState(initial?.dateOfBirth ?? "");
  const [dobError, setDobError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="stack student-form"
      onSubmit={async (e) => {
        e.preventDefault();
        const problem = dateOfBirth ? dateOfBirthProblem(dateOfBirth) : null;
        setDobError(problem);
        if (problem) return;
        setBusy(true);
        // Only what changed, and a password only when one was typed.
        await onSave({
          name,
          yearLevel,
          username: username.trim().toLowerCase(),
          ...(password ? { password } : {}),
          classIds,
          learnToRead,
          // An empty date clears one that was there; a new student without one just has none.
          ...(dateOfBirth ? { dateOfBirth } : initial?.dateOfBirth ? { dateOfBirth: null } : {}),
        });
        setBusy(false);
      }}
    >
      <div className="grid grid-2">
        <div>
          <label htmlFor="student-name">Student&apos;s name</label>
          <input id="student-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={20} required />
        </div>
        <div>
          <label htmlFor="student-year">Year</label>
          <YearSelect id="student-year" value={yearLevel} onChange={setYearLevel} />
        </div>
        <div>
          <label htmlFor="student-username">Username</label>
          <input
            id="student-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={30}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="e.g. mia.k"
            required
          />
        </div>
        <div>
          <label htmlFor="student-password">{initial ? "New password (leave empty to keep)" : "Password"}</label>
          <input
            id="student-password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            maxLength={200}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            required={!initial}
          />
        </div>
        <div>
          <label htmlFor="student-dob">Date of birth (optional)</label>
          <input
            id="student-dob"
            type="date"
            value={dateOfBirth}
            max={today()}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
              setDobError(null);
            }}
            aria-invalid={Boolean(dobError)}
          />
          {dobError && (
            <div className="small" role="alert" style={{ color: "var(--bad)" }}>
              {dobError}
            </div>
          )}
        </div>
      </div>
      <ClassPicker classes={classes} value={classIds} onChange={setClassIds} />
      <label className="row" style={{ fontWeight: 400, margin: 0, gap: 8 }}>
        <input type="checkbox" style={{ width: "auto" }} checked={learnToRead} onChange={(e) => setLearnToRead(e.target.checked)} />
        Learn to Read (phonics, for a reading age below 7.5). Students are also put in it by the reading check on their Learn page.
      </label>
      <div className="row">
        <button className="btn" disabled={busy}>
          {busy ? "Saving…" : initial ? "Save student" : "Add student"}
        </button>
        <button type="button" className="btn secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Teachers({ centre, run, onInvited }: { centre: Centre; run: Run; onInvited: (r: Invite) => void }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error, data } = await send("/api/centre/teachers", "POST", { name, email });
    setBusy(false);
    if (error) return setError(error);
    setAdding(false);
    setName("");
    setEmail("");
    await run(Promise.resolve({ error: null, data: {} }));
    onInvited(data as unknown as Invite);
  }

  /** Logs in as the teacher to see their classes as they do. The banner at the top comes back here. */
  async function logInAs(t: Teacher) {
    const { error, data } = await send(`/api/centre/teachers/${t.id}/log-in-as`, "POST");
    if (error) return run(Promise.resolve({ error, data }));
    try {
      localStorage.clear();
    } catch {}
    window.location.assign("/classes");
  }

  async function resend(t: Teacher) {
    const { error, data } = await send(`/api/centre/teachers/${t.id}/invite`, "POST");
    if (error) await run(Promise.resolve({ error, data }));
    else onInvited(data as unknown as Invite);
  }

  return (
    <div className="card stack">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>Teachers</h2>
        {!adding && (
          <button className="btn small" onClick={() => setAdding(true)}>
            Add a teacher
          </button>
        )}
      </div>
      {adding && (
        <form className="stack teacher-form" onSubmit={add}>
          <div className="grid grid-2">
            <div>
              <label htmlFor="teacher-name">Name</label>
              <input id="teacher-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
            </div>
            <div>
              <label htmlFor="teacher-email">Email</label>
              <input id="teacher-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <p className="small muted" style={{ margin: 0 }}>
            {centre.email
              ? "We'll email them a link to set their password. They'll see the classes you give them and how each student is going."
              : "Email isn't set up yet, so you'll get a link to send them for setting their password."}
          </p>
          {error && (
            <div className="feedback bad" role="alert">
              {error}
            </div>
          )}
          <div className="row">
            <button className="btn" disabled={busy}>
              {busy ? "Adding…" : "Add teacher"}
            </button>
            <button type="button" className="btn secondary" onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {centre.teachers.length === 0 ? (
        <p className="muted" style={{ margin: 0 }}>
          No teachers yet. Teachers see the classes you give them and how each student is going.
        </p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Classes</th>
                <th>Last sign-in</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {centre.teachers.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.name}</strong>
                    <div className="small muted">{t.email}</div>
                    {!t.lastLoginAt && <div className="small muted">Hasn&apos;t set a password yet</div>}
                  </td>
                  <td>
                    {centre.classes
                      .filter((c) => c.teacherId === t.id)
                      .map((c) => c.name)
                      .join(", ") || <span className="muted">None</span>}
                  </td>
                  <td>{date(t.lastLoginAt)}</td>
                  <td>
                    <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                      {!t.lastLoginAt && (
                        <button className="btn secondary small" onClick={() => void resend(t)}>
                          Send invite again
                        </button>
                      )}
                      <button className="btn secondary small" onClick={() => void logInAs(t)}>
                        Log in as
                      </button>
                      <button
                        className="btn secondary small"
                        onClick={() => {
                          if (confirm(`Remove ${t.name}? Their classes stay, without a teacher, until you pick another.`))
                            void run(send(`/api/centre/teachers/${t.id}`, "DELETE"), `Removed ${t.name}.`);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
