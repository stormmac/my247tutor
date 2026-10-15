"use client";

import { useCallback, useEffect, useState } from "react";
import { MIN_CHILD_PASSWORD_LENGTH } from "@/lib/auth/rules";

interface Login {
  learnerId: string;
  username: string;
  isActive: boolean;
  lastLoginAt: string | null;
}

/** A first guess at a username: their name in lower case, letters and numbers only. */
function suggestUsername(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 30);
}

/**
 * On the parents page: the child's own sign-in, so they can learn on their own device.
 * The parent sets it up, changes the username or password, or removes it.
 */
export function ChildLogin({ learnerId, name }: { learnerId: string; name: string }) {
  const [login, setLogin] = useState<Login | null | undefined>(undefined);
  const [editing, setEditing] = useState<"new" | "password" | "username" | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ good: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/children").catch(() => null);
    if (!res?.ok) return setLogin(null);
    const { logins } = (await res.json()) as { logins: Login[] };
    setLogin(logins.find((l) => l.learnerId === learnerId) ?? null);
  }, [learnerId]);

  useEffect(() => {
    setEditing(null);
    setMessage(null);
    void load();
  }, [load]);

  function start(mode: "new" | "password" | "username") {
    setEditing(mode);
    setMessage(null);
    setPassword("");
    setUsername(mode === "username" ? (login?.username ?? "") : suggestUsername(name));
  }

  async function send(method: "POST" | "PATCH" | "DELETE", body?: object): Promise<boolean> {
    setBusy(true);
    setMessage(null);
    const res = await fetch(`/api/children/${learnerId}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    }).catch(() => null);
    const error = res?.ok
      ? null
      : (((await res?.json().catch(() => ({}))) as { error?: string } | undefined)?.error ?? "That didn't work. Try again.");
    setBusy(false);
    if (error) setMessage({ good: false, text: error });
    return !error;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok =
      editing === "new"
        ? await send("POST", { username, password })
        : editing === "password"
          ? await send("PATCH", { password })
          : await send("PATCH", { username });
    if (!ok) return;
    const done =
      editing === "new"
        ? `Done. ${name} can now log in with the username "${username.trim().toLowerCase()}" and the password you chose.`
        : editing === "password"
          ? `Password changed. ${name} will need the new one next time they log in.`
          : `Username changed to "${username.trim().toLowerCase()}".`;
    setEditing(null);
    setPassword("");
    await load();
    setMessage({ good: true, text: done });
  }

  async function remove() {
    if (!confirm(`Remove ${name}'s sign-in? Their progress stays on your account.`)) return;
    if (await send("DELETE")) {
      await load();
      setMessage({ good: true, text: `${name}'s sign-in has been removed. Their progress is still here.` });
    }
  }

  if (login === undefined) return null;

  return (
    <div className="card no-print stack child-login">
      <h2 style={{ margin: 0 }}>{name}'s own sign-in</h2>
      {login ? (
        <p className="muted" style={{ margin: 0 }}>
          {name} signs in with the username <strong>{login.username}</strong>.{" "}
          {login.lastLoginAt
            ? `Last logged in ${new Date(login.lastLoginAt).toLocaleDateString("en-AU", { day: "numeric", month: "long" })}.`
            : "They haven't logged in yet."}{" "}
          They only see their learning pages, not this page or billing.
        </p>
      ) : (
        <p className="muted" style={{ margin: 0 }}>
          Give {name} a username and password so they can log in on their own device. Their progress stays on your account, and they only
          see their learning pages, not this page or billing.
        </p>
      )}

      {editing ? (
        <form className="stack" onSubmit={submit} style={{ maxWidth: 360 }}>
          {editing !== "password" && (
            <div>
              <label htmlFor="child-username">Username</label>
              <input
                id="child-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={30}
                required
              />
              <div className="small muted">Letters and numbers. It can't be an email address.</div>
            </div>
          )}
          {editing !== "username" && (
            <div>
              <label htmlFor="child-password">{editing === "new" ? "Password" : "New password"}</label>
              <input
                id="child-password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                minLength={MIN_CHILD_PASSWORD_LENGTH}
                required
              />
              <div className="small muted">
                At least {MIN_CHILD_PASSWORD_LENGTH} characters. Shown here so you can write it down for them.
              </div>
            </div>
          )}
          <div className="row">
            <button className="btn small" disabled={busy}>
              {editing === "new" ? "Create sign-in" : "Save"}
            </button>
            <button type="button" className="btn secondary small" onClick={() => setEditing(null)} disabled={busy}>
              Cancel
            </button>
          </div>
        </form>
      ) : login ? (
        <div className="row">
          <button className="btn secondary small" onClick={() => start("password")}>
            Change password
          </button>
          <button className="btn secondary small" onClick={() => start("username")}>
            Change username
          </button>
          <button className="btn secondary small" onClick={() => void remove()} disabled={busy}>
            Remove sign-in
          </button>
        </div>
      ) : (
        <div className="row">
          <button className="btn small" onClick={() => start("new")}>
            Set up a sign-in for {name}
          </button>
        </div>
      )}

      {message && (
        <div className={`feedback ${message.good ? "good" : "bad"}`} role={message.good ? "status" : "alert"}>
          {message.text}
        </div>
      )}
    </div>
  );
}
