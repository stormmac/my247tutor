"use client";

import { useState } from "react";
import { PasswordField } from "@/components/PasswordField";
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
      <h2 style={{ margin: 0 }}>Change password</h2>
      <PasswordField id="current-password" label="Current password" value={current} onChange={setCurrent} autoComplete="current-password" />
      <PasswordField
        id="new-password"
        label="New password"
        value={next}
        onChange={setNext}
        autoComplete="new-password"
        minLength={MIN_PASSWORD_LENGTH}
        hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}
      />
      {message && (
        <div className={`feedback ${message.good ? "good" : "bad"}`} role="status">
          {message.text}
        </div>
      )}
      <button className="btn" disabled={busy}>
        Change password
      </button>
    </form>
  );
}
