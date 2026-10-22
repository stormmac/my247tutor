"use client";

import { useEffect, useState } from "react";
import { AdminTabs } from "@/components/AdminTabs";
import { learnAs, logInAs, useAccount } from "@/components/useAccount";
import { yearName } from "@/lib/curriculum/curricula";

interface Account {
  id: string;
  name: string;
  email: string;
  role: "admin" | "parent" | "centre" | "teacher" | "student";
  isActive: boolean;
  centreId: string | null;
}

interface Learner {
  id: string;
  name: string;
  yearLevel: number;
  username: string | null;
}

interface Owner {
  id: string;
  learners: Learner[];
}

/**
 * Everyone, the way they belong together: each tutoring centre with its teachers and students, then
 * each family with its children. One tap logs Admin in as any of them, with the way back across the top.
 */
export default function PeoplePage() {
  const account = useAccount();
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [learners, setLearners] = useState<Map<string, Learner[]>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!account.loaded || !account.enabled) return;
    void Promise.all([fetch("/api/admin/users"), fetch("/api/admin/learners")])
      .then(async ([u, l]) => {
        if (!u.ok || !l.ok) return setError("Couldn't load everyone. Try again.");
        setAccounts(((await u.json()) as { users: Account[] }).users);
        setLearners(new Map(((await l.json()) as { owners: Owner[] }).owners.map((o) => [o.id, o.learners])));
      })
      .catch(() => setError("Couldn't connect. Try again."));
  }, [account.loaded, account.enabled]);

  async function go(id: string, run: () => Promise<string | null>) {
    setBusy(id);
    setError(null);
    const failed = await run();
    if (failed) {
      setError(failed);
      setBusy(null);
    }
  }

  const term = search.trim().toLowerCase();
  const hit = (...texts: (string | null | undefined)[]) => !term || texts.some((t) => t?.toLowerCase().includes(term));
  const all = accounts ?? [];
  const kids = (ownerId: string) => learners.get(ownerId) ?? [];

  const asAccount = (a: Account) => (
    <button type="button" className="btn small" disabled={!!busy || !a.isActive} onClick={() => void go(a.id, () => logInAs(a.id))}>
      {busy === a.id ? "Opening…" : a.isActive ? "Log in as" : "Turned off"}
    </button>
  );
  const asStudent = (l: Learner) => (
    <li key={l.id} className="people-row">
      <span>
        <strong>{l.name}</strong> <span className="small muted">{yearName(l.yearLevel)}</span>
        {l.username && <span className="small muted"> · {l.username}</span>}
      </span>
      <button type="button" className="btn small secondary" disabled={!!busy} onClick={() => void go(l.id, () => learnAs(l.id))}>
        {busy === l.id ? "Opening…" : "Log in as"}
      </button>
    </li>
  );

  const centres = all
    .filter((a) => a.role === "centre")
    .map((c) => {
      const teachers = all.filter((t) => t.role === "teacher" && t.centreId === c.id);
      const students = kids(c.id);
      const whole = hit(c.name, c.email);
      return {
        c,
        teachers: whole ? teachers : teachers.filter((t) => hit(t.name, t.email)),
        students: whole ? students : students.filter((s) => hit(s.name, s.username)),
        shown: whole || teachers.some((t) => hit(t.name, t.email)) || students.some((s) => hit(s.name, s.username)),
      };
    })
    .filter((x) => x.shown);
  const families = all
    .filter((a) => a.role === "parent")
    .map((p) => {
      const children = kids(p.id);
      const whole = hit(p.name, p.email);
      return {
        p,
        children: whole ? children : children.filter((s) => hit(s.name, s.username)),
        shown: whole || children.some((s) => hit(s.name, s.username)),
      };
    })
    .filter((x) => x.shown);
  const others = all.filter((a) => (a.role === "admin" || (a.role === "teacher" && !a.centreId)) && hit(a.name, a.email));

  return (
    <div className="stack">
      <AdminTabs current="people" />
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ margin: 0 }}>Log in as anyone</h1>
          <p className="muted" style={{ margin: 0 }}>
            Centres with their teachers and students, then families. You come back with Back to Admin at the top.
          </p>
        </div>
        <input
          type="search"
          placeholder="Search a name, email or username"
          aria-label="Search people"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 320 }}
        />
      </div>
      {error && <p className="feedback bad">{error}</p>}
      {!accounts && !error && <p className="muted">Loading…</p>}

      {accounts && (
        <>
          <h2 style={{ marginBottom: 0 }}>Tutoring centres</h2>
          {!centres.length && <p className="muted">No tutoring centres{term ? " match" : " yet"}.</p>}
          {centres.map(({ c, teachers, students }) => (
            <section key={c.id} className="card stack people-card">
              <div className="people-row people-head">
                <span>
                  <strong>{c.name}</strong> <span className="small muted">{c.email}</span>
                </span>
                {asAccount(c)}
              </div>
              <div className="people-columns">
                <div>
                  <h3>Teachers</h3>
                  {teachers.length ? (
                    <ul className="people-list">
                      {teachers.map((t) => (
                        <li key={t.id} className="people-row">
                          <span>
                            <strong>{t.name}</strong> <span className="small muted">{t.email}</span>
                          </span>
                          {asAccount(t)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="small muted">No teachers yet.</p>
                  )}
                </div>
                <div>
                  <h3>Students</h3>
                  {students.length ? (
                    <ul className="people-list">{students.map(asStudent)}</ul>
                  ) : (
                    <p className="small muted">No students yet.</p>
                  )}
                </div>
              </div>
            </section>
          ))}

          <h2 style={{ marginBottom: 0 }}>Families</h2>
          {!families.length && <p className="muted">No families{term ? " match" : " yet"}.</p>}
          {families.map(({ p, children }) => (
            <section key={p.id} className="card stack people-card">
              <div className="people-row people-head">
                <span>
                  <strong>{p.name}</strong> <span className="small muted">{p.email}</span>
                </span>
                {asAccount(p)}
              </div>
              {children.length ? (
                <ul className="people-list">{children.map(asStudent)}</ul>
              ) : (
                <p className="small muted">No children yet.</p>
              )}
            </section>
          ))}

          {others.length > 0 && (
            <>
              <h2 style={{ marginBottom: 0 }}>Admins</h2>
              <div className="card">
                <ul className="people-list">
                  {others.map((a) => (
                    <li key={a.id} className="people-row">
                      <span>
                        <strong>{a.name}</strong> <span className="small muted">{a.email}</span>
                      </span>
                      {a.role === "admin" ? <span className="small muted">Admin</span> : asAccount(a)}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
