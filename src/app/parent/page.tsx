"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useProfile } from "@/components/useProfile";
import { getOutcome } from "@/lib/curriculum/outcomes";
import { getSkill } from "@/lib/curriculum/skills";
import type { Subject } from "@/lib/curriculum/types";
import { outcomeProgress, type LearnerProfile } from "@/lib/learner/model";

export default function ParentPage() {
  const { profile, setProfile, loaded } = useProfile();
  const [unlocked, setUnlocked] = useState(false);

  if (!loaded) return null;
  if (!unlocked) return <ParentGate onPass={() => setUnlocked(true)} />;
  if (!profile) {
    return (
      <div className="card narrow">
        <h1>No learner yet</h1>
        <p>Set up your child's learner profile to start.</p>
        <Link className="btn" href="/learn">
          Set up
        </Link>
      </div>
    );
  }

  const week = Date.now() - 7 * 86_400_000;
  const thisWeek = profile.history.filter((h) => h.at >= week);

  return (
    <div className="stack">
      <h1>{profile.name}'s progress</h1>
      <p className="muted">Year {profile.yearLevel}. Progress is shown against NSW (NESA) syllabus outcomes.</p>

      {profile.wellbeingFlags.length > 0 && (
        <div className="card" style={{ borderColor: "var(--bad)" }}>
          <h2>Please check in with {profile.name}</h2>
          <p>
            Something {profile.name} wrote suggested they may be upset or unsafe. The tutor responded kindly and shared Kids Helpline (1800
            55 1800).
          </p>
          <ul>
            {profile.wellbeingFlags
              .slice(-5)
              .reverse()
              .map((f, i) => (
                <li key={i}>
                  <span className="muted small">{new Date(f.at).toLocaleString("en-AU")}:</span> "{f.message}"
                </li>
              ))}
          </ul>
          <button className="btn secondary small" onClick={() => setProfile((p) => ({ ...p, wellbeingFlags: [] }))}>
            I've followed up
          </button>
        </div>
      )}

      <div className="grid grid-3">
        <div className="card">
          <div className="muted small">Questions this week</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{thisWeek.length}</div>
        </div>
        <div className="card">
          <div className="muted small">Correct first try this week</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>
            {thisWeek.length ? `${Math.round((thisWeek.filter((h) => h.correct).length / thisWeek.length) * 100)}%` : "–"}
          </div>
        </div>
        <div className="card">
          <div className="muted small">Writing pieces</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{profile.writing.length}</div>
        </div>
      </div>

      <OutcomeTable profile={profile} subject="maths" title="Mathematics" />
      <OutcomeTable profile={profile} subject="english" title="English" />

      {profile.writing.length > 0 && (
        <div className="card">
          <h2>Recent writing feedback</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Task</th>
                <th>Next step</th>
              </tr>
            </thead>
            <tbody>
              {profile.writing
                .slice(-5)
                .reverse()
                .map((w, i) => (
                  <tr key={i}>
                    <td>{new Date(w.at).toLocaleDateString("en-AU")}</td>
                    <td>{getSkill(w.skillId).title}</td>
                    <td>{w.summary}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card">
        <h2>Settings</h2>
        <p className="muted small">In this early version, progress is saved in this browser only.</p>
        <div className="row">
          <label className="row" style={{ fontWeight: 400, margin: 0 }}>
            School year
            <select
              value={profile.yearLevel}
              style={{ width: "auto" }}
              onChange={(e) => setProfile((p) => ({ ...p, yearLevel: Number(e.target.value) as LearnerProfile["yearLevel"] }))}
            >
              {[3, 4, 5, 6].map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>
          </label>
          <button
            className="btn secondary small"
            onClick={() => {
              if (confirm(`Delete all of ${profile.name}'s progress?`)) setProfile(null);
            }}
          >
            Delete learner
          </button>
        </div>
      </div>
    </div>
  );
}

function OutcomeTable({ profile, subject, title }: { profile: LearnerProfile; subject: Subject; title: string }) {
  const rows = outcomeProgress(profile, subject);
  return (
    <div className="card">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Outcome</th>
            <th>What it covers</th>
            <th>Skills mastered</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const o = getOutcome(r.outcome);
            return (
              <tr key={r.outcome}>
                <td>
                  <strong>{o.code}</strong>
                  {!o.codeVerified && <span className="muted small"> *</span>}
                </td>
                <td>
                  {o.summary}
                  <div className="muted small">
                    {o.focusArea}, Stage {o.stage}
                  </div>
                </td>
                <td>
                  {r.mastered} of {r.total}
                </td>
                <td>
                  <span className={`pill ${r.status === "secure" ? "good" : r.status === "developing" ? "warn" : ""}`}>
                    {r.status === "secure" ? "Secure" : r.status === "developing" ? "Developing" : "Not started"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {rows.some((r) => !getOutcome(r.outcome).codeVerified) && (
        <p className="muted small" style={{ marginTop: 8 }}>
          * Outcome code still being confirmed against the NESA syllabus.
        </p>
      )}
    </div>
  );
}

/** A simple grown-up check, common in children's apps, so a child doesn't wander into settings. */
function ParentGate({ onPass }: { onPass: () => void }) {
  const [a, b] = useMemo(() => [11 + Math.floor(Math.random() * 8), 12 + Math.floor(Math.random() * 7)], []);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  return (
    <form
      className="card narrow stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (Number(value) === a * b) onPass();
        else setWrong(true);
      }}
    >
      <h1>For parents</h1>
      <p className="muted">To continue, answer this question.</p>
      <label htmlFor="gate">
        What is {a} × {b}?
      </label>
      <input id="gate" type="text" inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" />
      {wrong && <div className="feedback bad">That's not right. Please ask a parent.</div>}
      <button className="btn">Continue</button>
    </form>
  );
}
