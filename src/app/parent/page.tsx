"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useProfile } from "@/components/useProfile";
import { getOutcome } from "@/lib/curriculum/outcomes";
import { getSkill, skillsFor } from "@/lib/curriculum/skills";
import type { Skill, Subject } from "@/lib/curriculum/types";
import { SUBTOPICS } from "@/lib/content/tree";
import { recentAccuracy, skillState, type LearnerProfile } from "@/lib/learner/model";
import { COMPETENCY_LABELS, competency, recommendedPlan, subjectLevel, type Competency, type Standing } from "@/lib/learner/report";

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
      <div className="row spread">
        <div>
          <h1>{profile.name}'s progress</h1>
          <p className="muted" style={{ margin: 0 }}>
            Year {profile.yearLevel}. Shown against the NSW (NESA) syllabus outcomes, as of {new Date().toLocaleDateString("en-AU")}.
          </p>
        </div>
        <button className="btn secondary small no-print" onClick={() => window.print()}>
          Print or save as PDF
        </button>
      </div>

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

      <SubjectReport profile={profile} subject="maths" title="Mathematics" />
      <SubjectReport profile={profile} subject="english" title="English" />

      <p className="muted small">
        Levels and plans are estimates from {profile.name}'s practice in my247tutor, not a school assessment. They get more accurate the
        more {profile.name} practises.
      </p>

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

      <div className="card no-print">
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

const STANDING: Record<Standing, { label: (year: number) => string; pill: string }> = {
  ahead: { label: (y) => `Ahead of Year ${y}`, pill: "good" },
  "on track": { label: (y) => `On track for Year ${y}`, pill: "good" },
  "needs support": { label: (y) => `Working towards Year ${y}`, pill: "warn" },
  "not enough evidence": { label: () => "Needs more practice to tell", pill: "" },
};

const COMPETENCY_PILL: Record<Competency, string> = {
  "not started": "",
  beginning: "bad",
  developing: "warn",
  competent: "good",
  mastered: "good",
};

/** Where to practise a skill: its page in the topic tree, or the writing page. */
function practiceHref(skill: Skill): string {
  if (skill.practice === "writing") return `/learn/writing?skill=${skill.id}`;
  const sub = SUBTOPICS.find((s) => s.skill_id === skill.id);
  return sub ? `/learn/${skill.subject}/topics/${sub.id}` : `/learn/${skill.subject}`;
}

function SubjectReport({ profile, subject, title }: { profile: LearnerProfile; subject: Subject; title: string }) {
  const level = subjectLevel(profile, subject);
  const plan = recommendedPlan(profile, subject);
  const standing = STANDING[level.standing];
  const skills = skillsFor(subject);

  return (
    <div className="card stack report">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <span className={`pill ${standing.pill}`}>{standing.label(profile.yearLevel)}</span>
      </div>

      <div>
        <div className="muted small">Curriculum level</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>
          {level.standing === "not enough evidence"
            ? "Not enough practice yet"
            : level.beyondYear6
              ? "Working beyond Year 6"
              : `Working at about Year ${level.workingAtYear} level`}
        </div>
        <div className="grid grid-2" style={{ marginTop: 12 }}>
          {level.stages.map((s) => (
            <div key={s.stage}>
              <div className="small">
                Stage {s.stage} (Years {s.stage === 2 ? "3–4" : "5–6"}): {s.secure} of {s.total} skills competent or better
              </div>
              <div className="progress" style={{ marginTop: 6 }}>
                <div style={{ width: `${Math.round((s.secure / s.total) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Recommended plan</h3>
        {plan.length ? (
          <ol className="plan">
            {plan.map((step) => (
              <li key={step.skill.id}>
                <div className="row spread">
                  <div>
                    <strong>{step.skill.title}</strong> <span className="muted small">{getOutcome(step.skill.outcome).code}</span>
                    <div className="small muted">{step.why}</div>
                  </div>
                  <Link className="btn secondary small no-print" href={practiceHref(step.skill)}>
                    Practise
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="muted">Nothing to recommend yet.</p>
        )}
        <p className="small muted">
          About 10 questions on the first step, a few times a week, works well. The practice page follows this plan automatically.
        </p>
      </div>

      <div>
        <h3>Competency in each skill</h3>
        <div className="table-scroll">
          <table className="skill-table">
            <thead>
              <tr>
                <th>Outcome</th>
                <th>Skill</th>
                <th>Competency</th>
                <th className="accuracy">Recent accuracy</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => {
                const o = getOutcome(skill.outcome);
                const c = competency(profile, skill);
                const accuracy = recentAccuracy(profile, skill.id);
                return (
                  <tr key={skill.id}>
                    <td>
                      <strong>{o.code}</strong>
                      {!o.codeVerified && <span className="muted small"> *</span>}
                      <div className="muted small">Stage {skill.stage}</div>
                    </td>
                    <td>
                      {skill.title}
                      <div className="muted small skill-desc">{skill.description}</div>
                    </td>
                    <td>
                      <span className={`pill ${COMPETENCY_PILL[c]}`}>{COMPETENCY_LABELS[c]}</span>
                      {skillState(profile, skill.id).placed && <div className="muted small">From the starting check</div>}
                    </td>
                    <td className="accuracy">
                      {skill.practice === "writing" ? "–" : accuracy === null ? "–" : `${Math.round(accuracy * 100)}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {skills.some((s) => !getOutcome(s.outcome).codeVerified) && (
          <p className="muted small" style={{ marginTop: 8 }}>
            * Outcome code still being confirmed against the NESA syllabus.
          </p>
        )}
      </div>
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
