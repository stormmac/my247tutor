"use client";

import { useEffect, useState } from "react";
import { learnAs } from "@/components/useAccount";

interface Learner {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
}

interface Owner {
  id: string;
  name: string;
  email: string;
  role: "parent" | "centre";
  isActive: boolean;
  learners: Learner[];
}

/**
 * Admin's Learn page: pick a parent or a tutoring centre, then one of their students, and learn as
 * them. Like logging in as an account, with the way back to Admin across the top.
 */
export function AdminLearnPicker({ onSelf }: { onSelf: () => void }) {
  const [owners, setOwners] = useState<Owner[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState<Owner["role"]>("parent");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/admin/learners")
      .then(async (r) => {
        const body = await r.json().catch(() => ({}));
        if (r.ok) setOwners(body.owners);
        else setError(body.error ?? "Couldn't load the students.");
      })
      .catch(() => setError("Couldn't connect. Try again."));
  }, []);

  async function pick(learner: Learner) {
    setBusy(learner.id);
    setError(await learnAs(learner.id));
    setBusy(null);
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
      <div>
        <h1>Learn as a student</h1>
        <p className="muted" style={{ margin: 0 }}>
          Choose a family or a tutoring centre, then a student, to see and use the site as they do.
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
              onClick={() => {
                setKind(role);
                setOpen(null);
              }}
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
        <div className="stack owner-list" style={{ gap: 10 }}>
          {shown.map((o) => {
            const expanded = open === o.id || (term !== "" && shown.length <= 5);
            const learners =
              term && !o.name.toLowerCase().includes(term) && !o.email.toLowerCase().includes(term)
                ? o.learners.filter((l) => l.name.toLowerCase().includes(term) || l.username?.toLowerCase().includes(term))
                : o.learners;
            return (
              <div key={o.id} className="card owner-card">
                <button className="owner-head" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : o.id)}>
                  <span>
                    <strong>{o.name}</strong> <span className="muted small">{o.email}</span>
                    {!o.isActive && <span className="pill warn small"> Turned off</span>}
                  </span>
                  <span className="muted small">
                    {o.learners.length} {o.learners.length === 1 ? "student" : "students"} {expanded ? "▲" : "▼"}
                  </span>
                </button>
                {expanded &&
                  (learners.length === 0 ? (
                    <p className="muted small" style={{ margin: "10px 0 0" }}>
                      No students yet.
                    </p>
                  ) : (
                    <div className="owner-learners">
                      {learners.map((l) => (
                        <button key={l.id} className="choice owner-learner" disabled={busy !== null} onClick={() => void pick(l)}>
                          <strong>{l.name}</strong>
                          <span className="small muted">
                            Year {l.yearLevel}
                            {l.username ? `, ${l.username}` : ""}
                          </span>
                          <span className="small">{busy === l.id ? "Opening…" : `Learn as ${l.name} →`}</span>
                        </button>
                      ))}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      )}
      <p className="muted small" style={{ margin: 0 }}>
        Or{" "}
        <button className="link-button" onClick={onSelf}>
          practise with your own learner
        </button>
        .
      </p>
    </div>
  );
}
