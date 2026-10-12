"use client";

import Link from "next/link";
import { useState } from "react";
import { useProfile } from "@/components/useProfile";
import { newProfile, pickNextSkill, skillState, type LearnerProfile } from "@/lib/learner/model";
import { skillsFor } from "@/lib/curriculum/skills";
import type { Subject, YearLevel } from "@/lib/curriculum/types";

export default function LearnPage() {
  const { profile, setProfile, loaded } = useProfile();
  if (!loaded) return null;
  if (!profile) return <Setup onCreate={(name, year) => setProfile(newProfile(name, year))} />;

  return (
    <div className="stack">
      <h1>Hi {profile.name}! What shall we learn?</h1>
      <p className="muted">Year {profile.yearLevel}. Pick a subject to keep going.</p>
      <div className="grid grid-2">
        <SubjectCard profile={profile} subject="maths" title="Maths" />
        <SubjectCard profile={profile} subject="english" title="English" />
      </div>
      <div className="card">
        <div className="row spread">
          <div>
            <h2>Writing</h2>
            <p className="muted" style={{ margin: 0 }}>
              Write a story, an argument or a report, and get feedback on it.
            </p>
          </div>
          <Link href="/learn/writing" className="btn secondary">
            Start writing
          </Link>
        </div>
      </div>
    </div>
  );
}

function SubjectCard({ profile, subject, title }: { profile: LearnerProfile; subject: Subject; title: string }) {
  const skills = skillsFor(subject).filter((s) => s.practice !== "writing");
  const mastered = skills.filter((s) => skillState(profile, s.id).mastered).length;
  const placed = profile.placementDone[subject];
  const next = placed ? pickNextSkill(profile, subject) : null;
  return (
    <div className="card stack">
      <div className="row spread">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <span className="pill good">
          {mastered} of {skills.length} skills
        </span>
      </div>
      <div className="progress" aria-label={`${mastered} of ${skills.length} skills mastered`}>
        <div style={{ width: `${(mastered / skills.length) * 100}%` }} />
      </div>
      <p className="muted" style={{ margin: 0 }}>
        {placed
          ? next
            ? `Next up: ${next.skill.title}`
            : "You've mastered everything here!"
          : "Start with a quick five-question check so we know where to begin."}
      </p>
      <Link href={`/learn/${subject}`} className="btn">
        {placed ? "Practise" : "Start the check"}
      </Link>
    </div>
  );
}

function Setup({ onCreate }: { onCreate: (name: string, year: YearLevel) => void }) {
  const [name, setName] = useState("");
  const [year, setYear] = useState<YearLevel>(3);
  return (
    <form
      className="card narrow stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) onCreate(name.trim().slice(0, 20), year);
      }}
    >
      <h1>Let's get started</h1>
      <p className="muted">A grown-up should help with this step. We only need a first name or nickname.</p>
      <div>
        <label htmlFor="name">First name or nickname</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={20} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="year">School year</label>
        <select id="year" value={year} onChange={(e) => setYear(Number(e.target.value) as YearLevel)}>
          {[3, 4, 5, 6].map((y) => (
            <option key={y} value={y}>
              Year {y}
            </option>
          ))}
        </select>
      </div>
      <button className="btn" disabled={!name.trim()}>
        Continue
      </button>
    </form>
  );
}
