"use client";

import { useCallback, useEffect, useState } from "react";
import type { Role } from "@/lib/auth/rules";

interface Row {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  learners: number;
}

const date = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-AU") : "Never");

/** Admins manage accounts: roles, turning accounts off, and password resets. */
export default function AdminPage() {
  const [users, setUsers] = useState<Row[] | null>(null);
  const [me, setMe] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/users");
    const body = (await res.json().catch(() => ({}))) as { users?: Row[]; me?: string; error?: string };
    if (!res.ok) return setError(body.error ?? "Couldn't load accounts.");
    setUsers(body.users ?? []);
    setMe(body.me ?? null);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function change(user: Row, update: { role?: Role; isActive?: boolean }) {
    setError(null);
    setNotice(null);
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    if (!res.ok) setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "That didn't work.");
    await load();
  }

  async function reset(user: Row) {
    if (!confirm(`Reset ${user.email}'s password? They'll be signed out everywhere.`)) return;
    setError(null);
    const res = await fetch(`/api/admin/users/${user.id}/reset-password`, { method: "POST" });
    const body = (await res.json().catch(() => ({}))) as { password?: string; error?: string };
    if (res.ok) setNotice(`New temporary password for ${user.email}: ${body.password}. Pass it on privately; it won't be shown again.`);
    else setError(body.error ?? "That didn't work.");
  }

  if (error && !users) return <div className="feedback bad">{error}</div>;
  if (!users) return <p className="muted">Loading accounts…</p>;

  const q = filter.trim().toLowerCase();
  const shown = q ? users.filter((u) => u.email.includes(q) || u.name.toLowerCase().includes(q)) : users;

  return (
    <div className="stack">
      <div className="row spread">
        <div>
          <h1>Admin</h1>
          <p className="muted" style={{ margin: 0 }}>
            {users.length} accounts, {users.filter((u) => u.isActive).length} active, {users.reduce((n, u) => n + u.learners, 0)} learners.
          </p>
        </div>
        <input
          type="search"
          placeholder="Search name or email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ maxWidth: 260 }}
          aria-label="Search accounts"
        />
      </div>
      {notice && (
        <div className="feedback good" role="status">
          {notice}
        </div>
      )}
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <div className="card table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Role</th>
              <th>Learners</th>
              <th>Joined</th>
              <th>Last sign-in</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shown.map((u) => {
              const self = u.id === me;
              return (
                <tr key={u.id} className={u.isActive ? "" : "muted"}>
                  <td>
                    <strong>{u.name}</strong>
                    {self && (
                      <span className="pill" style={{ marginLeft: 6 }}>
                        You
                      </span>
                    )}
                    <div className="small muted">{u.email}</div>
                  </td>
                  <td>
                    <select
                      value={u.role}
                      disabled={self}
                      onChange={(e) => void change(u, { role: e.target.value as Role })}
                      aria-label={`Role for ${u.email}`}
                      style={{ width: "auto" }}
                    >
                      <option value="parent">Parent</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>{u.learners}</td>
                  <td>{date(u.createdAt)}</td>
                  <td>{date(u.lastLoginAt)}</td>
                  <td>
                    <span className={`pill ${u.isActive ? "good" : "bad"}`}>{u.isActive ? "Active" : "Turned off"}</span>
                  </td>
                  <td>
                    {!self && (
                      <div className="row" style={{ gap: 6, flexWrap: "nowrap" }}>
                        <button className="btn secondary small" onClick={() => void change(u, { isActive: !u.isActive })}>
                          {u.isActive ? "Turn off" : "Turn on"}
                        </button>
                        <button className="btn secondary small" onClick={() => void reset(u)}>
                          Reset password
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="small muted">Every change here is recorded with who made it.</p>
    </div>
  );
}
