"use client";

import { useMemo, useRef, useState } from "react";
import { useSetWork } from "@/components/SetWork";
import { practiseable } from "@/lib/content/program";
import { curriculumOf, subjectName, yearName } from "@/lib/curriculum/curricula";
import type { Subject, YearLevel } from "@/lib/curriculum/types";
import type { LearnerProfile } from "@/lib/learner/model";
import { activityLog, completedSummary, focusAreas, stillToDo, topicTitle, type Activity, type ToDo } from "@/lib/learner/parentSummary";

const KIND_ICON: Record<ToDo["kind"], string> = { assessment: "📝", lesson: "📚", set: "📌", school: "🏫" };

/** Sends set work; null when it worked, or the error to show. */
async function addWork(body: Record<string, unknown>): Promise<string | null> {
  const res = await fetch("/api/set-work", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => null);
  if (res?.ok) return null;
  const data = (await res?.json().catch(() => null)) as { error?: string } | null;
  return data?.error ?? "That didn't work. Try again.";
}

/**
 * The Parents page, simply: what's still to do, what's been done and how well, the topics that
 * need attention, and what the child is doing at school now so they can practise it here.
 */
export function ParentSummary({ profile }: { profile: LearnerProfile }) {
  const { work, canSet, canAddSchool, reload } = useSetWork(profile.id);
  const todo = stillToDo(profile, work);
  const done = completedSummary(profile, work);
  const focus = focusAreas(profile);
  const curriculum = curriculumOf(profile.curriculum);
  const [added, setAdded] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pending = new Set(work.filter((w) => !w.doneAt).map((w) => w.subtopicId));

  return (
    <>
      <div className="card stack">
        <div className="row spread">
          <h2 style={{ margin: 0 }}>Still to do</h2>
          <span className={`pill ${todo.length ? "warn" : "good"}`}>{todo.length ? `${todo.length} to do` : "All done"}</span>
        </div>
        {todo.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            {profile.name} is all caught up for this week. 🎉
          </p>
        ) : (
          <ul className="summary-list">
            {todo.map((t) => (
              <li key={t.key}>
                <span aria-hidden="true">{KIND_ICON[t.kind]}</span>
                <div>
                  <strong>{t.title}</strong>
                  <div className="small muted">{t.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card stack">
        <div className="row spread">
          <h2 style={{ margin: 0 }}>Work completed</h2>
          <WorkActivities profile={profile} work={work} />
        </div>
        <div className="grid grid-3">
          <Stat label="Questions answered" value={String(done.allTime.answered)} />
          <Stat label="Right first try" value={done.allTime.percent === null ? "–" : `${done.allTime.percent}%`} />
          <Stat
            label="This week"
            value={`${done.thisWeek.answered}`}
            note={done.thisWeek.percent === null ? "questions" : `questions, ${done.thisWeek.percent}% right`}
          />
        </div>
        {done.bySubject.some((s) => s.tally.answered > 0) && (
          <div className="stack" style={{ gap: 8 }}>
            {done.bySubject
              .filter((s) => s.tally.answered > 0)
              .map((s) => (
                <div key={s.subject}>
                  <div className="row spread small">
                    <strong>{s.name}</strong>
                    <span>
                      {s.tally.rightFirstTry} of {s.tally.answered} right first try ({s.tally.percent}%)
                    </span>
                  </div>
                  <div className="progress" style={{ marginTop: 4 }}>
                    <div style={{ width: `${s.tally.percent}%` }} />
                  </div>
                </div>
              ))}
          </div>
        )}
        {done.workDone.length > 0 && (
          <div>
            <h3 style={{ marginBottom: 6 }}>Set work and school topics finished</h3>
            <ul className="summary-list">
              {done.workDone.slice(0, 6).map((w) => (
                <li key={w.id}>
                  <span aria-hidden="true">{w.atSchool ? "🏫" : "📌"}</span>
                  <div className="row spread" style={{ flex: 1 }}>
                    <span>{w.title}</span>
                    <span className={`pill ${w.right / w.total > 0.75 ? "good" : "warn"}`}>
                      {w.right} of {w.total} right first go
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {done.allTime.answered === 0 && (
          <p className="muted small" style={{ margin: 0 }}>
            Nothing yet. Results show here as soon as {profile.name} starts practising.
          </p>
        )}
      </div>

      <div className="card stack">
        <h2 style={{ margin: 0 }}>Needs attention</h2>
        {focus.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            Nothing stands out yet. Topics show here once {profile.name} has practised enough to tell.
          </p>
        ) : (
          <ul className="summary-list">
            {focus.map((f) => (
              <li key={f.key}>
                <span aria-hidden="true">🎯</span>
                <div className="row spread" style={{ flex: 1 }}>
                  <div>
                    <strong>{f.title}</strong>
                    <div className="small muted">{f.detail}</div>
                  </div>
                  {canSet && f.subtopicId && f.subject && (
                    <button
                      className="btn secondary small no-print"
                      disabled={pending.has(f.subtopicId) || added.includes(f.key)}
                      onClick={async () => {
                        const problem = await addWork({ learnerId: profile.id, subject: f.subject, subtopicIds: [f.subtopicId] });
                        setError(problem);
                        if (problem) return;
                        setAdded((a) => [...a, f.key]);
                        await reload();
                      }}
                    >
                      {pending.has(f.subtopicId) || added.includes(f.key) ? "In this week's lesson" : "Practise this week"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {error && (
          <div className="feedback bad" role="alert">
            {error}
          </div>
        )}
      </div>

      {canAddSchool && profile.id && (
        <SchoolTopics
          profile={profile}
          work={work.filter((w) => w.atSchool)}
          canRemoveAll={canSet}
          reload={reload}
          title={(id) => topicTitle(id, profile)}
          subject={(s) => subjectName(s, curriculum)}
        />
      )}
    </>
  );
}

const ACTIVITY_ICON: Record<Activity["kind"], string> = {
  practice: "✏️",
  assessment: "📝",
  writing: "🖊️",
  tables: "✖️",
  reading: "📖",
  set: "📌",
};

/** The Work completed button: a popup of everything the child did in the last week or month, a day at a time. */
function WorkActivities({ profile, work }: { profile: LearnerProfile; work: ReturnType<typeof useSetWork>["work"] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [days, setDays] = useState<7 | 30>(7);
  const [open, setOpen] = useState(false);
  const log = open ? activityLog(profile, work, days) : null;
  const byDay = new Map<string, Activity[]>();
  for (const a of log?.activities ?? []) {
    const day = new Date(a.at).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
    byDay.set(day, [...(byDay.get(day) ?? []), a]);
  }
  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn secondary small no-print"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        See activities
      </button>
      <dialog
        ref={dialog}
        className="preview-dialog"
        aria-label={`${profile.name}'s activities`}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && close()}
      >
        {log && (
          <div className="stack">
            <div className="row spread">
              <h2 style={{ margin: 0 }}>{profile.name}&apos;s activities</h2>
              <button type="button" className="btn secondary small" onClick={close}>
                Close
              </button>
            </div>
            <div className="tabs" role="tablist" aria-label="How far back">
              {([7, 30] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  role="tab"
                  aria-selected={days === d}
                  className={`tab${days === d ? " active" : ""}`}
                  onClick={() => setDays(d)}
                >
                  {d === 7 ? "Last week" : "Last month"}
                </button>
              ))}
            </div>
            <p className="muted" style={{ margin: 0 }}>
              {log.activities.length} {log.activities.length === 1 ? "activity" : "activities"}, {log.tally.answered}{" "}
              {log.tally.answered === 1 ? "question" : "questions"}
              {log.tally.percent !== null && `, ${log.tally.percent}% right first try`}.
            </p>
            {byDay.size === 0 && <p className="muted">Nothing in the last {days === 7 ? "week" : "month"}.</p>}
            {[...byDay].map(([day, items]) => (
              <div key={day}>
                <h3 style={{ margin: "8px 0 0" }}>{day}</h3>
                <ul className="summary-list">
                  {items.map((a) => (
                    <li key={a.key}>
                      <span aria-hidden="true">{ACTIVITY_ICON[a.kind]}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong>{a.title}</strong>
                        <div className="small muted">{a.detail}</div>
                      </div>
                      <span className="small muted">
                        {new Date(a.at).toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </dialog>
    </>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="stat">
      <div className="muted small">{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800 }}>{value}</div>
      {note && <div className="muted small">{note}</div>}
    </div>
  );
}

interface Pick {
  subject: Subject;
  id: string;
}

/**
 * What the child is doing at school now. The grown-up finds the topics, and each becomes ten
 * questions in the child's weekly lesson, easy to hard, so they practise what they're learning.
 */
function SchoolTopics({
  profile,
  work,
  canRemoveAll,
  reload,
  title,
  subject: name,
}: {
  profile: LearnerProfile;
  work: ReturnType<typeof useSetWork>["work"];
  canRemoveAll: boolean;
  reload: () => Promise<void>;
  title: (subtopicId: string) => string;
  subject: (s: Subject) => string;
}) {
  const curriculum = curriculumOf(profile.curriculum);
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<Pick[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  // Topics from their own year and the year either side, in both subjects.
  const options = useMemo(() => {
    const years = [profile.yearLevel - 1, profile.yearLevel, profile.yearLevel + 1].filter((y) => y >= 1 && y <= 8) as YearLevel[];
    return (["maths", "english"] as const).flatMap((subject) =>
      years.flatMap((year) =>
        practiseable(subject, year, curriculum).flatMap(({ topic, subtopics }) =>
          subtopics.map((s) => ({
            subject,
            year,
            id: s.id,
            label: topic.title === s.title ? topic.title : `${topic.title}: ${s.title}`,
          })),
        ),
      ),
    );
  }, [profile.yearLevel, curriculum]);
  const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = words.length ? options.filter((o) => words.every((w) => o.label.toLowerCase().includes(w))).slice(0, 12) : [];
  const isPicked = (id: string) => picked.some((p) => p.id === id);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    for (const subject of ["maths", "english"] as const) {
      const ids = picked.filter((p) => p.subject === subject).map((p) => p.id);
      if (!ids.length) continue;
      const problem = await addWork({ learnerId: profile.id, subject, subtopicIds: ids, atSchool: true });
      if (problem) {
        setBusy(false);
        return setError(problem);
      }
    }
    setSaved(`Added ${picked.length === 1 ? "it" : `${picked.length} topics`} to ${profile.name}'s weekly lesson.`);
    setPicked([]);
    setSearch("");
    setBusy(false);
    await reload();
  }

  const current = work.filter((w) => !w.doneAt);
  return (
    <div className="card stack">
      <h2 style={{ margin: 0 }}>What {profile.name} is doing at school</h2>
      <p className="muted small" style={{ margin: 0 }}>
        Add what {profile.name}&apos;s class is learning now. Each topic becomes ten questions, easy to hard, in their weekly lesson.
      </p>
      {current.length > 0 && (
        <ul className="summary-list">
          {current.map((w) => (
            <li key={w.id}>
              <span aria-hidden="true">🏫</span>
              <div className="row spread" style={{ flex: 1 }}>
                <div>
                  <strong>{title(w.subtopicId)}</strong>
                  <div className="small muted">
                    {name(w.subject)} · added {new Date(w.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                  </div>
                </div>
                {(canRemoveAll || w.mine) && (
                  <button
                    className="link-button small no-print"
                    style={{ textDecoration: "underline" }}
                    onClick={async () => {
                      await fetch(`/api/set-work/${w.id}?learner=${profile.id}`, { method: "DELETE" }).catch(() => null);
                      await reload();
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <form className="stack no-print" onSubmit={add} style={{ gap: 8 }}>
        <label htmlFor="school-search" style={{ margin: 0 }}>
          Find a topic
        </label>
        <input
          id="school-search"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSaved(null);
          }}
          placeholder="Such as fractions, area, persuasive writing"
          autoComplete="off"
        />
        {words.length > 0 && (
          <div className="stack" style={{ gap: 4 }}>
            {matches.length === 0 && <p className="small muted">No topics match. Try another word.</p>}
            {matches.map((o) => (
              <label key={o.id} className="row small" style={{ fontWeight: 400, margin: 0, gap: 8 }}>
                <input
                  type="checkbox"
                  style={{ width: "auto" }}
                  checked={isPicked(o.id)}
                  disabled={!isPicked(o.id) && picked.length >= 5}
                  onChange={(e) =>
                    setPicked((p) => (e.target.checked ? [...p, { subject: o.subject, id: o.id }] : p.filter((x) => x.id !== o.id)))
                  }
                />
                <span>
                  {o.label}{" "}
                  <span className="muted">
                    · {name(o.subject)}, {yearName(o.year, curriculum)}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
        {picked.length > 0 && <div className="small">Chosen: {picked.map((p) => title(p.id)).join("; ")}</div>}
        {error && (
          <div className="feedback bad" role="alert">
            {error}
          </div>
        )}
        {saved && (
          <div className="feedback good" role="status">
            {saved}
          </div>
        )}
        <div>
          <button className="btn" disabled={busy || !picked.length}>
            {busy ? "Adding…" : picked.length > 1 ? `Add ${picked.length} topics for practice` : "Add for practice"}
          </button>
        </div>
      </form>
    </div>
  );
}
