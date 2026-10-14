"use client";

import { useState } from "react";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/rules";

export function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [message, setMessage] = useState<{ good: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/auth/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current, next }),
    }).catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { error?: string } | undefined;
    setMessage(res?.ok ? { good: true, text: "Password changed." } : { good: false, text: body?.error ?? "That didn't work." });
    if (res?.ok) {
      setCurrent("");
      setNext("");
    }
    setBusy(false);
  }

  return (
    <form className="stack" onSubmit={submit} style={{ maxWidth: 360 }}>
      <h3 style={{ margin: 0 }}>Change password</h3>
      <div>
        <label htmlFor="current-password">Current password</label>
        <input
          id="current-password"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      <div>
        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          required
        />
      </div>
      {message && <div className={`feedback ${message.good ? "good" : "bad"}`}>{message.text}</div>}
      <button className="btn secondary small" disabled={busy}>
        Change password
      </button>
    </form>
  );
}
