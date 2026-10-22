"use client";

import { useRef, useState } from "react";
import { readAllProfiles, replaceAllProfiles } from "@/components/useProfile";
import { type LearningPlan, PLAN_SUBJECTS, type PlanSession, type PlanSubjects, sessionTimes, subjectsName } from "@/lib/learner/plan";

type Choices = { name: string; plan: LearningPlan; sessions: PlanSession[] };

/**
 * The "Learning plan" button: a grown-up chooses whether a child does Maths, English or both, and
 * whether they learn on their own or with a teacher. A teacher comes with one of their sessions, so
 * that choice only opens once a centre has set up a session with a teacher and a time.
 */
export function PlanButton({
  learnerId,
  className = "btn secondary small",
  onSaved,
}: {
  learnerId: string;
  className?: string;
  onSaved?: (plan: LearningPlan) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [choices, setChoices] = useState<Choices | null>(null);
  const [subjects, setSubjects] = useState<PlanSubjects>("both");
  const [withTeacher, setWithTeacher] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function open() {
    setMessage(null);
    setChoices(null);
    dialog.current?.showModal();
    const res = await fetch(`/api/plan?learner=${learnerId}`).catch(() => null);
    const body = (await res?.json().catch(() => null)) as (Choices & { error?: string }) | null;
    if (!res?.ok || !body) return setMessage({ ok: false, text: body?.error ?? "The plan couldn't be loaded." });
    setChoices(body);
    setSubjects(body.plan.subjects);
    setWithTeacher(Boolean(body.plan.session));
    setSessionId(body.plan.session?.id ?? body.sessions[0]?.id ?? "");
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/plan", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ learnerId, subjects, sessionId: withTeacher ? sessionId : null }),
    }).catch(() => null);
    const body = (await res?.json().catch(() => null)) as { plan?: LearningPlan; error?: string } | null;
    setSaving(false);
    if (!res?.ok || !body?.plan) return setMessage({ ok: false, text: body?.error ?? "The plan couldn't be saved. Try again." });
    const plan = body.plan;
    // A child kept in this browser shows the new plan straight away.
    const local = readAllProfiles();
    if (local.some((p) => p.id === learnerId)) replaceAllProfiles(local.map((p) => (p.id === learnerId ? { ...p, plan } : p)));
    setChoices((c) => c && { ...c, plan });
    onSaved?.(plan);
    setMessage({ ok: true, text: "Saved." });
  }

  const sessions = choices?.sessions ?? [];
  const chosen = sessions.find((s) => s.id === sessionId);
  return (
    <>
      <button type="button" className={className} onClick={() => void open()}>
        📋 Learning plan
      </button>
      <dialog
        ref={dialog}
        className="preview-dialog plan-dialog"
        aria-label="Learning plan"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <div className="stack">
          <div className="row spread" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
            <h2 style={{ margin: 0 }}>Learning plan{choices ? ` for ${choices.name}` : ""}</h2>
            <button type="button" className="btn secondary small" onClick={() => dialog.current?.close()}>
              Close
            </button>
          </div>
          {!choices && !message && <p className="muted">Loading…</p>}
          {choices && (
            <>
              <fieldset className="plan-choice">
                <legend>Subjects</legend>
                <div className="tabs">
                  {PLAN_SUBJECTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`tab${subjects === s ? " active" : ""}`}
                      aria-pressed={subjects === s}
                      onClick={() => setSubjects(s)}
                    >
                      {s === "both" ? "Both" : subjectsName(s)}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="plan-choice">
                <legend>Teacher</legend>
                <div className="tabs">
                  <button
                    type="button"
                    className={`tab${!withTeacher ? " active" : ""}`}
                    aria-pressed={!withTeacher}
                    onClick={() => setWithTeacher(false)}
                  >
                    On their own
                  </button>
                  <button
                    type="button"
                    className={`tab${withTeacher ? " active" : ""}`}
                    aria-pressed={withTeacher}
                    disabled={!sessions.length}
                    onClick={() => setWithTeacher(true)}
                  >
                    With a teacher
                  </button>
                </div>
                {!sessions.length ? (
                  <p className="small muted" style={{ margin: "8px 0 0" }}>
                    Learning with a teacher opens once a tutoring centre has set up a session with a teacher and a time.
                  </p>
                ) : (
                  withTeacher && (
                    <label className="stack" style={{ gap: 4, marginTop: 8 }}>
                      <span className="small">Session</span>
                      <select value={sessionId} onChange={(e) => setSessionId(e.target.value)}>
                        {sessions.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                            {s.teacherName ? ` with ${s.teacherName}` : ""}
                          </option>
                        ))}
                      </select>
                      {chosen && <span className="small muted">🗓 {sessionTimes(chosen)}</span>}
                    </label>
                  )
                )}
              </fieldset>
              <div className="row">
                <button type="button" className="btn" disabled={saving} onClick={() => void save()}>
                  {saving ? "Saving…" : "Save plan"}
                </button>
              </div>
            </>
          )}
          {message && <p className={`feedback ${message.ok ? "good" : "bad"}`}>{message.text}</p>}
        </div>
      </dialog>
    </>
  );
}

/** One line saying what a child's plan is, like "Maths and English, with Ms Lee: Tuesday 4:30pm (60 min)". */
export function PlanSummary({ plan }: { plan?: LearningPlan }) {
  if (!plan) return null;
  const s = plan.session;
  return (
    <p className="small muted plan-summary" style={{ margin: "4px 0 0" }}>
      📋 {subjectsName(plan.subjects)}, {s ? `with ${s.teacherName ?? "a teacher"} in ${s.name}: ${sessionTimes(s)}` : "on their own"}.
    </p>
  );
}
