"use client";

import { useEffect, useState } from "react";
import { ParentSummary } from "@/components/ParentSummary";
import { FullReport, WellbeingAlert } from "@/components/ProgressReport";
import { SuniChatsButton } from "@/components/SuniChats";
import type { LearnerProfile } from "@/lib/learner/model";

/**
 * A student's progress for their centre or teacher, laid out like the Parents page: what's still
 * to do, work completed, what needs attention and what they're doing at school, with the full
 * report folded away underneath.
 */
export function StudentReport({
  studentId,
  name,
  yearLevel,
  onClose,
}: {
  studentId: string;
  name: string;
  yearLevel: number;
  onClose: () => void;
}) {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    setProfile(null);
    setError(null);
    void fetch(`/api/students/${studentId}`)
      .then(async (r) => {
        const body = (await r.json().catch(() => ({}))) as { profile?: LearnerProfile; error?: string };
        if (!live) return;
        if (r.ok && body.profile) setProfile(body.profile);
        else setError(body.error ?? "Couldn't load their progress.");
      })
      .catch(() => live && setError("Couldn't connect. Try again."));
    requestAnimationFrame(() => document.getElementById("student-report")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    return () => {
      live = false;
    };
  }, [studentId]);

  return (
    <div id="student-report" className="stack student-report">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>
          {name}&apos;s progress <span className="muted small">Year {yearLevel}</span>
        </h2>
        <div className="row no-print" style={{ gap: 8 }}>
          <SuniChatsButton learnerId={studentId} name={name} />
          <button className="btn secondary small" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      {error && <div className="feedback bad">{error}</div>}
      {!profile && !error && <p className="muted">Loading…</p>}
      {profile && (
        <>
          <WellbeingAlert profile={profile} />
          <ParentSummary profile={profile} />
          <FullReport profile={profile} />
        </>
      )}
    </div>
  );
}
