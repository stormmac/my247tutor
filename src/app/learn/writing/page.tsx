"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useSuniFocus } from "@/components/SuniCompanion";
import { useProfile } from "@/components/useProfile";
import { getOutcome } from "@/lib/curriculum/outcomes";
import { SKILLS } from "@/lib/curriculum/skills";
import { yearToStage } from "@/lib/curriculum/types";
import { WRITING_TASKS } from "@/lib/english/bank";
import type { WritingFeedback } from "@/lib/tutor/claude";

const LEVEL_LABEL = { beginning: "Beginning", developing: "Developing", secure: "Secure" } as const;

export default function WritingPage() {
  return (
    <Suspense>
      <Writing />
    </Suspense>
  );
}

function Writing() {
  const { profile, setProfile, loaded } = useProfile();
  // A task chosen from the topic tree arrives as ?skill=…
  const requested = useSearchParams().get("skill");
  const [skillId, setSkillId] = useState<string | null>(() =>
    SKILLS.some((s) => s.id === requested && s.practice === "writing") ? requested : null,
  );
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [wellbeing, setWellbeing] = useState<string | null>(null);
  useSuniFocus(
    profile && skillId
      ? {
          greeting: `Need ideas or stuck on a sentence, ${profile.name}? Ask me. I won't write it for you, but I'll help you get going.`,
          context: { studentName: profile.name, yearLevel: profile.yearLevel, skillId, writingTask: WRITING_TASKS[skillId][0].prompt },
          onWellbeingConcern: (message) =>
            setProfile((p) => ({ ...p, wellbeingFlags: [...p.wellbeingFlags, { at: Date.now(), message }] })),
        }
      : null,
  );

  if (!loaded) return null;
  if (!profile) {
    return (
      <div className="card narrow">
        <p>Set up a learner first.</p>
        <Link className="btn" href="/learn">
          Get started
        </Link>
      </div>
    );
  }

  const stage = yearToStage(profile.yearLevel);
  const writingSkills = SKILLS.filter((s) => s.practice === "writing" && s.stage === stage);

  if (!skillId) {
    return (
      <div className="stack">
        <h1>Choose your writing task</h1>
        <div className="grid grid-2">
          {writingSkills.map((s) => (
            <div key={s.id} className="card stack">
              <h2 style={{ margin: 0 }}>{s.title}</h2>
              <p className="muted" style={{ margin: 0 }}>
                {WRITING_TASKS[s.id][0].prompt}
              </p>
              <button className="btn" onClick={() => setSkillId(s.id)}>
                Choose this
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const skill = SKILLS.find((s) => s.id === skillId)!;
  const task = WRITING_TASKS[skillId][0];
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  async function submit() {
    setBusy(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await fetch("/api/writing-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId, taskIndex: 0, yearLevel: profile!.yearLevel, text }),
      });
      const body = (await res.json()) as { feedback?: WritingFeedback; error?: string; wellbeing?: string };
      if (body.wellbeing) {
        setWellbeing(body.wellbeing);
        setProfile((p) => ({ ...p, wellbeingFlags: [...p.wellbeingFlags, { at: Date.now(), message: text.slice(0, 500) }] }));
      } else if (body.feedback) {
        const fb = body.feedback;
        setFeedback(fb);
        setProfile((p) => ({
          ...p,
          writing: [
            ...p.writing,
            {
              skillId: skillId!,
              at: Date.now(),
              summary: fb.nextSteps[0] ?? fb.encouragement,
              levels: Object.fromEntries(fb.criteria.map((c) => [c.criterion, c.level])),
            },
          ].slice(-50),
        }));
      } else setError(body.error ?? "Something went wrong.");
    } catch {
      setError("I couldn't connect just now. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="stack">
      <div>
        <span className="pill">{getOutcome(skill.outcome).code}</span>
        <h1 style={{ marginTop: 8 }}>{skill.title}</h1>
        <p>{task.prompt}</p>
      </div>
      <div className="practice">
        <div className="stack">
          <div className="card stack">
            <label htmlFor="writing">Your writing</label>
            <textarea id="writing" rows={14} value={text} onChange={(e) => setText(e.target.value)} maxLength={8000} />
            <div className="row spread">
              <span className="small muted">{words} words</span>
              <button className="btn" disabled={busy || words < 20} onClick={submit}>
                {busy ? "Reading your work…" : "Get feedback"}
              </button>
            </div>
            {words < 20 && (
              <p className="small muted" style={{ margin: 0 }}>
                Write at least 20 words to get feedback.
              </p>
            )}
            {error && <div className="feedback bad">{error}</div>}
            {wellbeing && <div className="hint">{wellbeing}</div>}
          </div>

          {feedback && (
            <div className="card stack" aria-live="polite">
              <h2>Feedback</h2>
              <p>{feedback.encouragement}</p>
              <div>
                <strong>What you did well</strong>
                <ul>
                  {feedback.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Next steps</strong>
                <ul>
                  {feedback.nextSteps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>What we looked for</th>
                    <th>Level</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.criteria.map((c, i) => (
                    <tr key={i}>
                      <td>{c.criterion}</td>
                      <td>
                        <span className={`pill ${c.level === "secure" ? "good" : c.level === "developing" ? "warn" : ""}`}>
                          {LEVEL_LABEL[c.level]}
                        </span>
                      </td>
                      <td>{c.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {feedback.spelling.length > 0 && (
                <p className="small">Check these spellings: {feedback.spelling.map((s) => `${s.written} → ${s.correct}`).join(", ")}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        className="btn secondary small"
        style={{ alignSelf: "start" }}
        onClick={() => {
          setSkillId(null);
          setFeedback(null);
        }}
      >
        Choose a different task
      </button>
    </div>
  );
}
