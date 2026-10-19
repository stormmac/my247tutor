"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAccount } from "@/components/useAccount";
import { ChildLogin } from "@/components/ChildLogin";
import { ChildTabs } from "@/components/ChildSwitcher";
import { ProgressReport } from "@/components/ProgressReport";
import { removeCurrentChild, useProfile } from "@/components/useProfile";
import type { LearnerProfile } from "@/lib/learner/model";
import { CURRICULA, CURRICULUM_NAMES, type Curriculum, curriculumOf, localeOf, outcomesName, yearName } from "@/lib/curriculum/curricula";
import { YEARS } from "@/lib/curriculum/types";

export default function ParentPage() {
  const { profile, setProfile, loaded } = useProfile();
  const account = useAccount();
  const [unlocked, setUnlocked] = useState(false);

  if (!loaded || !account.loaded) return null;
  // Signed-in parents have already proved who they are; the check is only for guests on a shared browser.
  if (!unlocked && (!account.user || account.user.role === "student")) return <ParentGate onPass={() => setUnlocked(true)} />;
  if (!profile) {
    return (
      <div className="card narrow stack">
        <ChildTabs />
        <h1>No learner yet</h1>
        <p>Set up your child's learner profile to start. You can add up to three children.</p>
        <Link className="btn" href="/learn">
          Set up
        </Link>
      </div>
    );
  }

  const curriculum = curriculumOf(profile.curriculum);
  return (
    <div className="stack">
      <ChildTabs />
      <div className="row spread">
        <div>
          <h1>{profile.name}'s progress</h1>
          <p className="muted" style={{ margin: 0 }}>
            {yearName(profile.yearLevel, curriculum)}. Shown against the {outcomesName(curriculum)}, as of{" "}
            {new Date().toLocaleDateString(localeOf(curriculum))}.
          </p>
        </div>
        <button className="btn secondary small no-print" onClick={() => window.print()}>
          Print or save as PDF
        </button>
      </div>

      <ProgressReport profile={profile} onChange={setProfile} />

      {account.user && profile.id && <ChildLogin key={profile.id} learnerId={profile.id} name={profile.name} />}

      <div className="card no-print">
        <h2>Settings</h2>
        <p className="muted small">
          {account.user
            ? `Logged in as ${account.user.email}. ${profile.name}'s progress is saved to your account.`
            : "Progress is saved in this browser only."}
        </p>
        <div className="row">
          <label className="row" style={{ fontWeight: 400, margin: 0 }}>
            Name
            <input
              key={profile.id}
              defaultValue={profile.name}
              maxLength={20}
              style={{ width: 160 }}
              aria-label="Child's name"
              onBlur={(e) => {
                const name = e.target.value.trim().slice(0, 20);
                if (name && name !== profile.name) setProfile((p) => ({ ...p, name }));
                else e.target.value = profile.name;
              }}
            />
          </label>
          <label className="row" style={{ fontWeight: 400, margin: 0 }}>
            School year
            <select
              value={profile.yearLevel}
              style={{ width: "auto" }}
              onChange={(e) => setProfile((p) => ({ ...p, yearLevel: Number(e.target.value) as LearnerProfile["yearLevel"] }))}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {yearName(y, curriculum)}
                </option>
              ))}
            </select>
          </label>
          {account.user ? (
            <span className="small">
              Curriculum: <strong>{CURRICULUM_NAMES[curriculum]}</strong>
            </span>
          ) : (
            // Without an account there's no Admin to set it, so the grown-up chooses here.
            <label className="row" style={{ fontWeight: 400, margin: 0 }}>
              Curriculum
              <select
                value={curriculum}
                style={{ width: "auto" }}
                onChange={(e) => setProfile((p) => ({ ...p, curriculum: e.target.value as Curriculum }))}
              >
                {CURRICULA.map((c) => (
                  <option key={c} value={c}>
                    {CURRICULUM_NAMES[c]}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button
            className="btn secondary small"
            onClick={() => {
              if (confirm(`Delete all of ${profile.name}'s progress?`)) removeCurrentChild();
            }}
          >
            Delete learner
          </button>
        </div>
        {account.user && (
          <p className="small muted" style={{ marginBottom: 0 }}>
            To change your password or details, go to <Link href="/account">My account</Link>.
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
