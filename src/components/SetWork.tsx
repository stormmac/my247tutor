"use client";

import { useCallback, useEffect, useState } from "react";
import { practiseable } from "@/lib/content/program";
import { subtopicPath } from "@/lib/content/tree";
import { curriculumOf, localeOf, subjectName, yearName } from "@/lib/curriculum/curricula";
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
}

/**
 * The work set for a child, and whether this person can set more. Empty for a child without an
 * account, or someone who can't see them.
 */
export function useSetWork(learnerId: string | undefined) {
  const [work, setWork] = useState<SetWork[]>([]);
  const [canSet, setCanSet] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const load = useCallback(async () => {
    if (!learnerId) return setLoaded(true);
    const res = await fetch(`/api/set-work?learner=${learnerId}`).catch(() => null);
    const body = (await res?.json().catch(() => null)) as { work?: SetWork[]; canSet?: boolean } | null;
    setWork(res?.ok ? (body?.work ?? []) : []);
    setCanSet(Boolean(res?.ok && body?.canSet));
    setLoaded(true);
  }, [learnerId]);
  useEffect(() => {
    void load();
  }, [load]);
  return { work, canSet, loaded, reload: load };
}

/** Tells the server how the child went on a piece of set work. */
export function finishWork(learnerId: string, id: string, right: number, total: number) {
  void fetch(`/api/set-work/${id}`, {
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
  const title = (w: SetWork) => {
    const path = subtopicPath(w.subtopicId, curriculum);
    return path ? (path.topic.title === path.subtopic.title ? path.topic.title : `${path.topic.title}: ${path.subtopic.title}`) : "A topic";
  };
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
                      {w.note && <> · &ldquo;{w.note}&rdquo;</>}
                    </div>
                  </td>
                  <td className="small">
                    {w.setBy ?? "Someone"}, {when(w.createdAt)}
                  </td>
                  <td>
                    {w.doneAt ? (
                      <span className={`pill ${w.right! / w.total! > 0.75 ? "good" : "warn"}`}>
                        {w.right} of {w.total} right first go
                      </span>
                    ) : (
                      <span className="pill">To do</span>
                    )}
                  </td>
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
