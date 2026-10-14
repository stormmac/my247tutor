"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/rules";

export default function SetPasswordPage() {
  return (
    <Suspense>
      <SetPassword />
    </Suspense>
  );
}

/** Where the link in a new account's welcome email lands: choose a password, then straight in. */
function SetPassword() {
  const token = useSearchParams().get("token") ?? "";
  const [who, setWho] = useState<{ name: string; email: string } | null>(null);
  const [gone, setGone] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [again, setAgain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`/api/auth/set-password?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const body = (await r.json().catch(() => ({}))) as { name?: string; email?: string; error?: string };
        if (r.ok && body.name && body.email) setWho({ name: body.name, email: body.email });
        else setGone(body.error ?? "This link doesn't work.");
      })
      .catch(() => setGone("Couldn't connect. Refresh the page to try again."));
  }, [token]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== again) return setError("The two passwords don't match.");
    setBusy(true);
    setError(null);
    const res = await fetch("/api/auth/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    }).catch(() => null);
    const body = (await res?.json().catch(() => ({}))) as { role?: string; error?: string } | undefined;
    // A full page load so every part of the page sees the new session.
    if (res?.ok) return window.location.assign(body?.role === "admin" ? "/admin" : "/learn");
    setError(body?.error ?? "Couldn't connect. Try again.");
    setBusy(false);
  }

  if (gone)
    return (
      <div className="card narrow stack" style={{ margin: "40px auto" }}>
        <h1>This link doesn&apos;t work any more</h1>
        <p className="muted" style={{ margin: 0 }}>
          {gone}
        </p>
        <Link className="btn secondary" href="/signin">
          Sign in instead
        </Link>
      </div>
    );
  if (!who) return <p className="muted">Checking your link…</p>;

  return (
    <form className="card narrow stack" style={{ margin: "40px auto" }} onSubmit={submit}>
      <h1>Welcome, {who.name}</h1>
      <p className="muted" style={{ margin: 0 }}>
        Choose a password for your my247tutor account. You&apos;ll sign in with <strong>{who.email}</strong> and this password.
      </p>
      <input type="email" value={who.email} autoComplete="username" readOnly hidden />
      <div>
        <label htmlFor="password">New password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          required
        />
        <div className="small muted">At least {MIN_PASSWORD_LENGTH} characters.</div>
      </div>
      <div>
        <label htmlFor="again">Type it again</label>
        <input
          id="again"
          type="password"
          value={again}
          onChange={(e) => setAgain(e.target.value)}
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          required
        />
      </div>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <button className="btn" disabled={busy}>
        {busy ? "Just a moment…" : "Set password and continue"}
      </button>
    </form>
  );
}
