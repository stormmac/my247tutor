"use client";

import Link from "next/link";
import { useState } from "react";

/** "Forgot password?": enter an email and get a link to choose a new password. */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { error?: string } | undefined;
    if (res?.ok) setSentTo(email.trim());
    else setError(body?.error ?? "Couldn't connect. Try again.");
    setBusy(false);
  }

  if (sentTo)
    return (
      <div className="card narrow stack" style={{ margin: "40px auto" }}>
        <h1>Check your email</h1>
        <p style={{ margin: 0 }}>
          If there&apos;s a my247tutor account for <strong>{sentTo}</strong>, we&apos;ve sent it a link to choose a new password. The link
          works for an hour.
        </p>
        <p className="small muted" style={{ margin: 0 }}>
          Nothing there after a few minutes? Check your junk folder, or{" "}
          <button type="button" className="link-button" style={{ textDecoration: "underline" }} onClick={() => setSentTo(null)}>
            try again
          </button>
          .
        </p>
        <Link className="btn secondary" href="/login">
          Back to log in
        </Link>
      </div>
    );

  return (
    <form className="card narrow stack" style={{ margin: "40px auto" }} onSubmit={submit}>
      <h1>Forgot your password?</h1>
      <p className="muted" style={{ margin: 0 }}>
        Enter the email you use for my247tutor and we&apos;ll send you a link to choose a new password.
      </p>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          autoFocus
          required
        />
      </div>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <button className="btn" disabled={busy}>
        {busy ? "Sending…" : "Send reset link"}
      </button>
      <p className="small muted" style={{ margin: 0 }}>
        Students log in with a username, so there&apos;s no email to send to. Ask your parent or teacher to set a new password for you.
      </p>
      <p className="small muted" style={{ margin: 0, textAlign: "center" }}>
        <Link href="/login">Back to log in</Link>
      </p>
    </form>
  );
}
