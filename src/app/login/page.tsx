"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { safeNextPath } from "@/lib/auth/sitePassword";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        // A full page load so the new cookie is sent with every request.
        window.location.assign(safeNextPath(params.get("next")));
        return;
      }
      setError(((await res.json()) as { error?: string }).error ?? "Something went wrong.");
    } catch {
      setError("Couldn't connect. Try again.");
    }
    setBusy(false);
  }

  return (
    <form className="card narrow stack" style={{ margin: "40px auto" }} onSubmit={submit}>
      <h1>my247tutor is in private testing</h1>
      <p className="muted">Enter the password you were given to continue.</p>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
        />
      </div>
      {error && <div className="feedback bad">{error}</div>}
      <button className="btn" disabled={busy || !password}>
        {busy ? "Checking…" : "Continue"}
      </button>
    </form>
  );
}
