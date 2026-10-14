"use client";

import { useEffect, useState } from "react";
import { learnAs } from "@/components/useAccount";

interface Student {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
  canSignIn: boolean;
}

interface Group {
  id: string;
  name: string;
  yearLevel?: number;
  students: Student[];
}

/**
 * A teacher's Learn page: pick one of their students, class by class, and learn as them. A centre
 * sees every class, and students not in a class yet. The way back is across the top.
 */
export function ClassLearnPicker({ onSelf }: { onSelf: () => void }) {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/classes/learn-as")
      .then(async (r) => {
        const body = await r.json().catch(() => ({}));
        if (!r.ok) return setError(body.error ?? "Couldn't load your students.");
        const unassigned: Student[] = body.unassigned ?? [];
        setGroups([...(body.classes ?? []), ...(unassigned.length ? [{ id: "none", name: "Not in a class", students: unassigned }] : [])]);
      })
      .catch(() => setError("Couldn't connect. Try again."));
  }, []);

  async function pick(s: Student) {
    setBusy(s.id);
    setError(await learnAs(s.id, "classes"));
    setBusy(null);
  }

  const term = search.trim().toLowerCase();
  const shown = (groups ?? [])
    .map((g) => ({
      ...g,
      students:
        !term || g.name.toLowerCase().includes(term)
          ? g.students
          : g.students.filter((s) => s.name.toLowerCase().includes(term) || s.username?.toLowerCase().includes(term)),
    }))
    .filter((g) => !term || g.students.length > 0);
  const total = new Set((groups ?? []).flatMap((g) => g.students.map((s) => s.id))).size;

  return (
    <div className="stack">
      <div className="row spread">
        <div>
          <h1>Which student are you learning as?</h1>
          <p className="muted" style={{ margin: 0 }}>
            Choose a student to see and use the site as they do. What they do is saved to their progress.
          </p>
        </div>
        {total > 6 && (
          <input
            type="search"
            aria-label="Search students"
            placeholder="Search by name or username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 280 }}
          />
        )}
      </div>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      {!groups ? (
        !error && <p className="muted">Loading…</p>
      ) : total === 0 ? (
        <div className="card">
          <p style={{ margin: 0 }}>
            No students in your classes yet. Once the centre adds students to your classes, they&apos;ll show here.
          </p>
        </div>
      ) : shown.length === 0 ? (
        <div className="card">
          <p style={{ margin: 0 }}>Nobody matches that search.</p>
        </div>
      ) : (
        <div className="stack" style={{ gap: 10 }}>
          {shown.map((g) => (
            <div key={g.id} className="card owner-card">
              <h2 style={{ margin: 0, fontSize: "1.1rem" }}>
                {g.name}
                {g.yearLevel ? <span className="muted small"> Year {g.yearLevel}</span> : null}
              </h2>
              {g.students.length === 0 ? (
                <p className="muted small" style={{ margin: "10px 0 0" }}>
                  No students in this class yet.
                </p>
              ) : (
                <div className="owner-learners">
                  {g.students.map((s) => (
                    <button
                      key={s.id}
                      className="choice owner-learner"
                      disabled={busy !== null || !s.canSignIn}
                      onClick={() => void pick(s)}
                    >
                      <strong>{s.name}</strong>
                      <span className="small muted">
                        Year {s.yearLevel}
                        {s.username ? `, ${s.username}` : ""}
                      </span>
                      <span className="small">
                        {!s.canSignIn ? "Sign-in is turned off" : busy === s.id ? "Opening…" : `Learn as ${s.name} →`}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="muted small" style={{ margin: 0 }}>
        Or{" "}
        <button className="link-button" onClick={onSelf}>
          try it yourself without a student
        </button>
        .
      </p>
    </div>
  );
}
