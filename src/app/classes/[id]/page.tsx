"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useAccount } from "@/components/useAccount";
import { ProgressReport } from "@/components/ProgressReport";
import { CLASS_SUBJECTS } from "@/lib/auth/rules";
import type { LearnerProfile } from "@/lib/learner/model";
import type { Standing } from "@/lib/learner/report";
import type { StudentSummary } from "@/lib/learner/summary";
import { formatReadingAge, READING_AGE_CUTOFF } from "@/lib/phonics/progress";
import { UNITS } from "@/lib/phonics/sequence";

interface ClassStudent {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
  lastLoginAt: string | null;
  summary: StudentSummary;
}

interface ClassView {
  class: { id: string; name: string; yearLevel: number; subject: keyof typeof CLASS_SUBJECTS; teacherName: string | null };
  students: ClassStudent[];
}

const STANDING: Record<Standing, { label: string; pill: string }> = {
  ahead: { label: "Ahead", pill: "good" },
  "on track": { label: "On track", pill: "good" },
  "needs support": { label: "Needs support", pill: "warn" },
  "not enough evidence": { label: "Not enough practice yet", pill: "" },
};

const when = (at: number | null) =>
  at ? new Date(at).toLocaleString("en-AU", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : "Not yet";

function Level({ level }: { level: StudentSummary["maths"] }) {
  const s = STANDING[level.standing];
  if (level.standing === "not enough evidence") return <span className="muted small">{s.label}</span>;
  return (
    <>
      Year {level.workingAtYear} <span className={`pill ${s.pill}`}>{s.label}</span>
    </>
  );
}

/** One class: how each student is going, and any student's full progress report. */
export default function ClassPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAccount();
  const [view, setView] = useState<ClassView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<{ id: string; profile: LearnerProfile | null; error?: string } | null>(null);

  useEffect(() => {
    void fetch(`/api/classes/${id}`)
      .then(async (r) => {
        const body = await r.json().catch(() => ({}));
        if (r.ok) setView(body);
        else setError(body.error ?? "Couldn't load this class.");
      })
      .catch(() => setError("Couldn't connect. Try again."));
  }, [id]);

  async function show(studentId: string) {
    if (open?.id === studentId) return setOpen(null);
    setOpen({ id: studentId, profile: null });
    const r = await fetch(`/api/students/${studentId}`).catch(() => null);
    const body = (await r?.json().catch(() => ({}))) as { profile?: LearnerProfile; error?: string };
    setOpen({ id: studentId, profile: body?.profile ?? null, error: r?.ok ? undefined : (body?.error ?? "Couldn't load their progress.") });
    requestAnimationFrame(() => document.getElementById("student-report")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  if (error) return <div className="feedback bad">{error}</div>;
  if (!view) return <p className="muted">Loading…</p>;
  const c = view.class;
  const opened = view.students.find((s) => s.id === open?.id);

  return (
    <div className="stack">
      <div className="row spread">
        <div>
          <p className="small no-print" style={{ margin: 0 }}>
            <Link href={user?.role === "centre" ? "/centre" : "/classes"}>{user?.role === "centre" ? "← Centre" : "← Your classes"}</Link>
          </p>
          <h1>{c.name}</h1>
          <p className="muted" style={{ margin: 0 }}>
            Year {c.yearLevel}, {CLASS_SUBJECTS[c.subject]}
            {c.teacherName ? `, with ${c.teacherName}` : ""}. {view.students.length} {view.students.length === 1 ? "student" : "students"}.
          </p>
        </div>
        <button className="btn secondary small no-print" onClick={() => window.print()}>
          Print or save as PDF
        </button>
      </div>

      {view.students.length === 0 ? (
        <div className="card">
          <p style={{ margin: 0 }}>No students in this class yet. The centre adds them from the Centre page.</p>
        </div>
      ) : (
        <div className="card table-scroll">
          <table className="class-table">
            <thead>
              <tr>
                <th>Student</th>
                {c.subject !== "english" && <th>Maths</th>}
                {c.subject !== "maths" && <th>English</th>}
                <th>Reading</th>
                <th>This week</th>
                <th>Last practised</th>
                <th className="no-print" />
              </tr>
            </thead>
            <tbody>
              {view.students.map((s) => (
                <tr key={s.id} className={open?.id === s.id ? "selected" : ""}>
                  <td>
                    <strong>{s.name}</strong>
                    <div className="small muted">
                      Year {s.yearLevel}
                      {s.username ? `, ${s.username}` : ""}
                    </div>
                  </td>
                  {c.subject !== "english" && (
                    <td>
                      <Level level={s.summary.maths} />
                    </td>
                  )}
                  {c.subject !== "maths" && (
                    <td>
                      <Level level={s.summary.english} />
                    </td>
                  )}
                  <td>
                    {s.summary.reading.age === null ? (
                      <span className="muted small">No check yet</span>
                    ) : (
                      <span className={s.summary.reading.age < READING_AGE_CUTOFF ? "warn-text" : ""}>
                        {formatReadingAge(s.summary.reading.age)}
                      </span>
                    )}
                    {s.summary.reading.enrolled && (
                      <div className="small muted">
                        Learn to Read {s.summary.reading.unitsDone}/{UNITS.length}
                      </div>
                    )}
                  </td>
                  <td>
                    {s.summary.questionsThisWeek} {s.summary.questionsThisWeek === 1 ? "question" : "questions"}
                    {s.summary.correctThisWeek !== null && <div className="small muted">{s.summary.correctThisWeek}% right first try</div>}
                  </td>
                  <td>{when(s.summary.lastPractisedAt)}</td>
                  <td className="no-print">
                    <button className="btn secondary small" onClick={() => void show(s.id)}>
                      {open?.id === s.id ? "Hide progress" : "Full progress"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && opened && (
        <div id="student-report" className="stack student-report">
          <div className="row spread">
            <h2 style={{ margin: 0 }}>
              {opened.name}&apos;s progress <span className="muted small">Year {opened.yearLevel}</span>
            </h2>
            <button className="btn secondary small no-print" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
          {open.error && <div className="feedback bad">{open.error}</div>}
          {!open.profile && !open.error && <p className="muted">Loading…</p>}
          {open.profile && <ProgressReport profile={open.profile} />}
        </div>
      )}
    </div>
  );
}
