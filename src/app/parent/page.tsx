"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "@/components/useAccount";
import { ChildLogin } from "@/components/ChildLogin";
import { ChildTabs } from "@/components/ChildSwitcher";
import { PlanButton, PlanSummary } from "@/components/PlanButton";
import { ParentSummary } from "@/components/ParentSummary";
import { FullReport, WellbeingAlert } from "@/components/ProgressReport";
import { SuniChatsButton } from "@/components/SuniChats";
import { SuniNotes } from "@/components/SuniNotes";
import { removeCurrentChild, useProfile } from "@/components/useProfile";
import type { LearnerProfile } from "@/lib/learner/model";
import { CURRICULA, CURRICULUM_NAMES, type Curriculum, curriculumOf, localeOf, outcomesName, yearName } from "@/lib/curriculum/curricula";
import { YEARS } from "@/lib/curriculum/types";
import { dateOfBirthProblem, today } from "@/lib/learner/birth";

/** A child at a tutoring centre that this parent is linked to. The centre owns their progress. */
interface CentreChild {
  id: string;
  name: string;
  centreName: string;
  profile: LearnerProfile;
}

function useCentreChildren(parent: boolean): CentreChild[] {
  const [children, setChildren] = useState<CentreChild[]>([]);
  useEffect(() => {
    if (!parent) return;
    void fetch("/api/parent/centre-children")
      .then((r) => r.json() as Promise<{ children?: CentreChild[] }>)
      .then((b) => setChildren(b.children ?? []))
      .catch(() => undefined);
  }, [parent]);
  return children;
}

export default function ParentPage() {
  const { profile, setProfile, loaded } = useProfile();
  const account = useAccount();
  const [unlocked, setUnlocked] = useState(false);
  const centreChildren = useCentreChildren(account.user?.role === "parent");
  const [picked, setPicked] = useState<string | null>(null);

  if (!loaded || !account.loaded) return null;
  // Signed-in parents have already proved who they are; the check is only for guests on a shared browser.
  if (!unlocked && (!account.user || account.user.role === "student")) return <ParentGate onPass={() => setUnlocked(true)} />;
  // A child at a centre: picked, or the first one when the parent has none of their own.
  const atCentre = centreChildren.find((c) => c.id === picked) ?? (profile ? undefined : centreChildren[0]);
  const centreTabs = centreChildren.length > 0 && (
    <div className="tabs no-print" role="tablist" aria-label="Your children at a tutoring centre">
      {centreChildren.map((c) => (
        <button
          key={c.id}
          type="button"
          role="tab"
          aria-selected={c.id === atCentre?.id}
          className={`tab${c.id === atCentre?.id ? " active" : ""}`}
          onClick={() => setPicked(c.id)}
          title={`At ${c.centreName}`}
        >
          {c.name} <span className="muted small">({c.centreName})</span>
        </button>
      ))}
    </div>
  );
  if (atCentre) {
    const curriculum = curriculumOf(atCentre.profile.curriculum);
    return (
      <div className="stack">
        <div className="row" style={{ gap: 8 }}>
          {profile && <ChildTabs elsewhere onSelect={() => setPicked(null)} />}
          {centreTabs}
        </div>
        <div className="row spread">
          <div>
            <h1>{atCentre.name}&apos;s progress</h1>
            <p className="muted" style={{ margin: 0 }}>
              {yearName(atCentre.profile.yearLevel, curriculum)} at {atCentre.centreName}. Shown against the {outcomesName(curriculum)}, as
              of {new Date().toLocaleDateString(localeOf(curriculum))}.
            </p>
            <PlanSummary plan={atCentre.profile.plan} />
          </div>
          <ReportButtons learnerId={atCentre.profile.id} name={atCentre.name} />
        </div>
        <WellbeingAlert profile={atCentre.profile} />
        <SuniNotes learnerId={atCentre.profile.id} name={atCentre.name} />
        <ParentSummary profile={atCentre.profile} />
        <FullReport profile={atCentre.profile} />
        <p className="small muted no-print">
          {atCentre.centreName} pays for {atCentre.name}&apos;s lessons and looks after their sign-in. A child you add yourself
          {profile ? "" : " with + Add a child on the Student page"} needs a plan of their own.
        </p>
      </div>
    );
  }
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
      <div className="row" style={{ gap: 8 }}>
        <ChildTabs />
        {centreTabs}
        {account.user && profile.id && <PlanButton learnerId={profile.id} />}
      </div>
      <div className="row spread">
        <div>
          <h1>{profile.name}'s progress</h1>
          <p className="muted" style={{ margin: 0 }}>
            {yearName(profile.yearLevel, curriculum)}. Shown against the {outcomesName(curriculum)}, as of{" "}
            {new Date().toLocaleDateString(localeOf(curriculum))}.
          </p>
          <PlanSummary plan={profile.plan} />
        </div>
        <ReportButtons learnerId={profile.id} name={profile.name} />
      </div>

      <WellbeingAlert profile={profile} onChange={setProfile} />
      {account.user && <SuniNotes learnerId={profile.id} name={profile.name} />}
      <ParentSummary profile={profile} />
      <FullReport profile={profile} onChange={setProfile} />

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
          <label className="row" style={{ fontWeight: 400, margin: 0 }}>
            Date of birth
            <input
              key={profile.id}
              type="date"
              defaultValue={profile.dateOfBirth ?? ""}
              max={today()}
              style={{ width: "auto" }}
              aria-label="Child's date of birth"
              onBlur={(e) => {
                const dob = e.target.value;
                if (dob === (profile.dateOfBirth ?? "")) return;
                if (dob && dateOfBirthProblem(dob)) {
                  alert(dateOfBirthProblem(dob));
                  e.target.value = profile.dateOfBirth ?? "";
                  return;
                }
                setProfile(({ dateOfBirth: _, ...p }) => (dob ? { ...p, dateOfBirth: dob } : p));
              }}
            />
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
/** The chats with Suni and print buttons beside a child's name. */
function ReportButtons({ learnerId, name }: { learnerId?: string; name: string }) {
  return (
    <div className="row no-print" style={{ gap: 8 }}>
      <SuniChatsButton learnerId={learnerId} name={name} />
      <button className="btn secondary small" onClick={() => window.print()}>
        Print or save as PDF
      </button>
    </div>
  );
}

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
