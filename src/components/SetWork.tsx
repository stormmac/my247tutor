"use client";

import { useCallback, useEffect, useState } from "react";
import { practiseable } from "@/lib/content/program";
import { subtopicPath } from "@/lib/content/tree";
import { type Curriculum, curriculumOf, localeOf, subjectName, yearName } from "@/lib/curriculum/curricula";
import { YEARS, type Subject, type YearLevel } from "@/lib/curriculum/types";
import type { LearnerProfile } from "@/lib/learner/model";

/** Work set for a child, as the server sends it. */
export interface SetWork {
  id: string;
  subject: Subject;
  subtopicId: string;
  note: string | null;
  setBy: string | null;
  createdAt: string;
  doneAt: string | null;
  right: number | null;
  total: number | null;
  /** A topic the child is doing at school now, added by a parent. */
  atSchool: boolean;
  /** Whether this person added it. */
  mine?: boolean;
  /** Planned for one weekly session of a class: the class, and the session's Monday as yyyy-mm-dd. */
  classId: string | null;
  week: string | null;
  /** To do at home after the session. */
  homework: boolean;
  /** Which of the session's boxes it's in, 1 to 8, left to right. */
  slot: number | null;
  /** "mistakes": redo the session's questions that weren't right first go. */
  kind: "topic" | "mistakes";
}

/** Work that's open now: not for a session in a later week. */
export const openNow = (w: SetWork, week: string) => !w.week || w.week <= week;

/** The pieces of set work a "mistakes" homework redoes: the session's activities in its subject. */
export const redoOf = (w: SetWork, all: SetWork[]) =>
  all.filter((a) => a.kind === "topic" && a.classId === w.classId && a.week === w.week && a.subject === w.subject).map((a) => a.id);

/**
 * The work set for a child, and whether this person can set more. Empty for a child without an
 * account, or someone who can't see them.
 */
export function useSetWork(learnerId: string | undefined) {
  const [work, setWork] = useState<SetWork[]>([]);
  const [canSet, setCanSet] = useState(false);
  const [canAddSchool, setCanAddSchool] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const load = useCallback(async () => {
    if (!learnerId) return setLoaded(true);
    const res = await fetch(`/api/set-work?learner=${learnerId}`).catch(() => null);
    const body = (await res?.json().catch(() => null)) as { work?: SetWork[]; canSet?: boolean; canAddSchool?: boolean } | null;
    setWork(res?.ok ? (body?.work ?? []) : []);
    setCanSet(Boolean(res?.ok && body?.canSet));
    setCanAddSchool(Boolean(res?.ok && body?.canAddSchool));
    setLoaded(true);
  }, [learnerId]);
  useEffect(() => {
    void load();
  }, [load]);
  return { work, canSet, canAddSchool, loaded, reload: load };
}

/** What a piece of set work is called: its topic, or the homework redoing the mistakes. */
export function workTitle(w: SetWork, curriculum: Curriculum): string {
  if (w.kind === "mistakes") return "Redo the questions got wrong";
  const path = subtopicPath(w.subtopicId, curriculum);
  return path ? (path.topic.title === path.subtopic.title ? path.topic.title : `${path.topic.title}: ${path.subtopic.title}`) : "A topic";
}

/** How the child went on a finished piece of set work. */
export function WorkResult({ work }: { work: SetWork }) {
  if (!work.total) return <span className="pill good">Nothing to redo</span>;
  return (
    <span className={`pill ${work.right! / work.total > 0.75 ? "good" : "warn"}`}>
      {work.right} of {work.total} right first go
    </span>
  );
}

/** Tells the server how the child went on a piece of set work. */
export function finishWork(learnerId: string, id: string, right: number, total: number): Promise<unknown> {
  return fetch(`/api/set-work/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ learnerId, right, total }),
  }).catch(() => undefined);
}

/**
 * Work set for a child, for the grown-ups who can see their work: what's set, how they went, and
 * (for their parent, teacher or centre) a form to set more. Each topic picked becomes ten
 * questions, easy to hard, in the child's weekly lesson.
 */
export function SetWorkCard({ profile }: { profile: LearnerProfile }) {
  const { work, canSet, loaded, reload } = useSetWork(profile.id);
  const [open, setOpen] = useState(false);
  if (!loaded || !profile.id || (!canSet && !work.length)) return null;
  const curriculum = curriculumOf(profile.curriculum);
  const title = (w: SetWork) => workTitle(w, curriculum);
  const when = (iso: string) => new Date(iso).toLocaleDateString(localeOf(curriculum), { day: "numeric", month: "short" });

  return (
    <div className="card stack">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>Set work</h2>
        {canSet && !open && (
          <button className="btn small no-print" onClick={() => setOpen(true)}>
            Set work
          </button>
        )}
      </div>
      <p className="small muted" style={{ margin: 0 }}>
        Each topic is ten questions, easy to hard, added to {profile.name}&apos;s weekly lesson.
      </p>
      {open && (
        <SetWorkForm
          profile={profile}
          onDone={async (set) => {
            setOpen(false);
            if (set) await reload();
          }}
        />
      )}
      {work.length > 0 && (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Set by</th>
                <th>Result</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {work.map((w) => (
                <tr key={w.id}>
                  <td>
                    {title(w)}
                    <div className="small muted">
                      {subjectName(w.subject, curriculum)}
                      {w.atSchool && " · doing at school"}
                      {w.homework && " · homework"}
                      {w.note && <> · &ldquo;{w.note}&rdquo;</>}
                    </div>
                  </td>
                  <td className="small">
                    {w.setBy ?? "Someone"}, {when(w.createdAt)}
                  </td>
                  <td>{w.doneAt ? <WorkResult work={w} /> : <span className="pill">To do</span>}</td>
                  <td>
                    {canSet && !w.doneAt && (
                      <button
                        className="link-button small no-print"
                        style={{ textDecoration: "underline" }}
                        onClick={async () => {
                          if (!confirm(`Take back "${title(w)}"?`)) return;
                          await fetch(`/api/set-work/${w.id}?learner=${profile.id}`, { method: "DELETE" }).catch(() => null);
                          await reload();
                        }}
                      >
                        Take back
                      </button>
                    )}
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

function SetWorkForm({ profile, onDone }: { profile: LearnerProfile; onDone: (set: boolean) => void }) {
  const curriculum = curriculumOf(profile.curriculum);
  const [subject, setSubject] = useState<Subject>("maths");
  const [year, setYear] = useState<YearLevel>(profile.yearLevel);
  const [picked, setPicked] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const topics = practiseable(subject, year, curriculum).filter((t) => t.subtopics.length);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/set-work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ learnerId: profile.id, subject, subtopicIds: picked, note: note.trim() || undefined }),
    }).catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { error?: string };
    setBusy(false);
    if (!res?.ok) return setError(body?.error ?? "That didn't work.");
    onDone(true);
  }

  return (
    <form className="stack" onSubmit={save} style={{ gap: 10 }}>
      <div className="row">
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
            <option value="maths">{subjectName("maths", curriculum)}</option>
            <option value="english">{subjectName("english", curriculum)}</option>
          </select>
        </label>
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
        <legend className="small muted">Choose up to 5 topics</legend>
        {topics.map(({ topic, subtopics }) => (
          <div key={topic.id}>
            <strong className="small">{topic.title}</strong>
            <div className="row" style={{ gap: "4px 14px", flexWrap: "wrap" }}>
              {subtopics.map((s) => (
                <label key={s.id} className="row small" style={{ fontWeight: 400, margin: 0, gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={picked.includes(s.id)}
                    disabled={!picked.includes(s.id) && picked.length >= 5}
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
      <label className="stack" style={{ fontWeight: 400, margin: 0, gap: 4 }}>
        A note for {profile.name} (optional)
        <input value={note} maxLength={200} onChange={(e) => setNote(e.target.value)} placeholder="Such as: Practise these before Friday" />
      </label>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        <button className="btn" disabled={busy || !picked.length}>
          {busy ? "Setting…" : `Set ${picked.length || ""} ${picked.length === 1 ? "topic" : "topics"}`.replace("  ", " ")}
        </button>
        <button type="button" className="btn secondary" onClick={() => onDone(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
