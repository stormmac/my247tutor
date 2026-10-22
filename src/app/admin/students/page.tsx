"use client";

import { PlanButton } from "@/components/PlanButton";
import { RewardsButton } from "@/components/RewardsButton";
import { useCallback, useEffect, useState } from "react";
import { AdminTabs } from "@/components/AdminTabs";
import { SetupStatus } from "@/components/SetupStatus";
import { useAccount } from "@/components/useAccount";
import { CURRICULA, CURRICULUM_NAMES, type Curriculum, yearName } from "@/lib/curriculum/curricula";

interface Learner {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
  curriculum: Curriculum;
}

interface Owner {
  id: string;
  name: string;
  email: string;
  role: "parent" | "centre";
  isActive: boolean;
  curriculum: Curriculum;
  learners: Learner[];
}

/** Admins choose which curriculum each family, centre and student learns. */
export default function StudentsAdminPage() {
  const account = useAccount();
  if (!account.loaded) return <p className="muted">Loading…</p>;
  if (!account.enabled) {
    return (
      <div className="stack" style={{ maxWidth: 720 }}>
        <h1>Admin</h1>
        <SetupStatus />
      </div>
    );
  }
  return <Students />;
}

function CurriculumSelect({ value, label, onChange }: { value: Curriculum; label: string; onChange: (c: Curriculum) => void }) {
  return (
    <select value={value} aria-label={label} onChange={(e) => onChange(e.target.value as Curriculum)} style={{ width: "auto" }}>
      {CURRICULA.map((c) => (
        <option key={c} value={c}>
          {CURRICULUM_NAMES[c]}
        </option>
      ))}
    </select>
  );
}

function Students() {
  const [owners, setOwners] = useState<Owner[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [kind, setKind] = useState<Owner["role"]>("parent");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/learners").catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { owners?: Owner[]; error?: string };
    if (res?.ok) setOwners(body.owners ?? []);
    else setError(body?.error ?? "Couldn't load the students.");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save(url: string, curriculum: Curriculum, done: string) {
    setError(null);
    setNotice(null);
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ curriculum }),
    }).catch(() => null);
    if (res?.ok) setNotice(done);
    else setError(((await res?.json().catch(() => ({}))) as { error?: string } | undefined)?.error ?? "That didn't work.");
    await load();
  }

  function setOwner(o: Owner, curriculum: Curriculum) {
    const n = o.learners.length;
    if (n && !confirm(`Change ${o.name} and all ${n} of their ${n === 1 ? "student" : "students"} to ${CURRICULUM_NAMES[curriculum]}?`))
      return;
    void save(
      `/api/admin/users/${o.id}`,
      curriculum,
      `${o.name} ${n ? `and their ${n === 1 ? "student" : "students"} ` : ""}now learn ${CURRICULUM_NAMES[curriculum]}.`,
    );
  }

  const term = search.trim().toLowerCase();
  const matches = (o: Owner) =>
    !term ||
    o.name.toLowerCase().includes(term) ||
    o.email.toLowerCase().includes(term) ||
    o.learners.some((l) => l.name.toLowerCase().includes(term) || l.username?.toLowerCase().includes(term));
  const shown = (owners ?? []).filter((o) => o.role === kind && matches(o));
  const count = (role: Owner["role"]) => (owners ?? []).filter((o) => o.role === role).length;

  return (
    <div className="stack">
      <AdminTabs current="students" />
      <div>
        <h1>Students</h1>
        <p className="muted" style={{ margin: 0 }}>
          Choose which curriculum each family, tutoring centre and student learns. A family&apos;s or centre&apos;s choice changes all their
          students and is used for new ones; a student can then be changed on their own.
        </p>
      </div>
      <div className="row spread">
        <div className="tabs" role="tablist">
          {(["parent", "centre"] as const).map((role) => (
            <button
              key={role}
              role="tab"
              aria-selected={kind === role}
              className={`btn small ${kind === role ? "" : "secondary"}`}
              onClick={() => setKind(role)}
            >
              {role === "parent" ? "Families" : "Tutoring centres"} ({count(role)})
            </button>
          ))}
        </div>
        <input
          type="search"
          aria-label="Search"
          placeholder="Search by name, email or student"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 320 }}
        />
      </div>
      {notice && <div className="feedback good">{notice}</div>}
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      {!owners ? (
        !error && <p className="muted">Loading…</p>
      ) : shown.length === 0 ? (
        <div className="card">
          <p style={{ margin: 0 }}>
            {term ? "Nobody matches that search." : kind === "parent" ? "No parents yet." : "No tutoring centres yet."}
          </p>
        </div>
      ) : (
        <div className="card table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{kind === "parent" ? "Family" : "Centre"} and students</th>
                <th>Year</th>
                <th>Curriculum</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              {shown.flatMap((o) => [
                <tr key={o.id} className={o.isActive ? "" : "muted"}>
                  <td>
                    <strong>{o.name}</strong>
                    <div className="small muted">{o.email}</div>
                  </td>
                  <td />
                  <td>
                    <CurriculumSelect value={o.curriculum} label={`Curriculum for ${o.name}`} onChange={(c) => setOwner(o, c)} />
                  </td>
                  <td />
                </tr>,
                ...o.learners.map((l) => (
                  <tr key={l.id}>
                    <td style={{ paddingLeft: 28 }}>
                      {l.name}
                      {l.username && <span className="small muted"> · {l.username}</span>}
                    </td>
                    <td>{yearName(l.yearLevel, l.curriculum)}</td>
                    <td>
                      <CurriculumSelect
                        value={l.curriculum}
                        label={`Curriculum for ${l.name}`}
                        onChange={(c) => void save(`/api/admin/learners/${l.id}`, c, `${l.name} now learns ${CURRICULUM_NAMES[c]}.`)}
                      />
                    </td>
                    <td>
                      <PlanButton learnerId={l.id} />
                      <RewardsButton learnerId={l.id} />
                    </td>
                  </tr>
                )),
              ])}
            </tbody>
          </table>
        </div>
      )}
      <p className="small muted">
        Every change here is recorded with who made it. A student sees the change the next time their page loads.
      </p>
    </div>
  );
}
