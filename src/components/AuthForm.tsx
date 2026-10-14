"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAccount } from "@/components/useAccount";
import { MIN_PASSWORD_LENGTH, safeNextPath } from "@/lib/auth/rules";

/** The sign-in and sign-up forms, which differ only in a name field and where they post. */
export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const params = useSearchParams();
  const next = safeNextPath(params.get("next") ?? "/parent");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const signup = mode === "signup";
  const account = useAccount();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup ? { name, email, password } : { email, password }),
      });
      if (res.ok) {
        const { user } = (await res.json().catch(() => ({}))) as { user?: { role?: string } };
        // A full page load so every part of the page sees the new session. Children go to their learning pages.
        window.location.assign(user?.role === "student" && next.startsWith("/parent") ? "/learn" : next);
        return;
      }
      setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Something went wrong.");
    } catch {
      setError("Couldn't connect. Try again.");
    }
    setBusy(false);
  }

  const otherHref = `/${signup ? "signin" : "signup"}${params.get("next") ? `?next=${encodeURIComponent(next)}` : ""}`;

  return (
    <form className="card narrow stack" style={{ margin: "40px auto" }} onSubmit={submit}>
      <h1>{signup ? "Create a parent account" : "Sign in"}</h1>
      {account.loaded && !account.enabled && (
        <div className="feedback warn">
          Logins aren't switched on for this site yet. <Link href="/admin">See what's left to set up</Link>.
        </div>
      )}
      {signup && params.get("trial") === "over" && (
        <div className="feedback warn">
          Your free hour is up. Create {account.billing ? "an account" : "a free account"} to keep going. Everything done so far is kept.
        </div>
      )}
      <p className="muted" style={{ margin: 0 }}>
        {signup
          ? "Your child's progress is saved to your account, so you can see it on any device."
          : "Parents sign in with their email. Children sign in with the username their parent set up for them."}
      </p>
      {signup && (
        <div>
          <label htmlFor="name">Your name</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={100} required />
        </div>
      )}
      <div>
        <label htmlFor="email">{signup ? "Email" : "Email or username"}</label>
        <input
          id="email"
          type={signup ? "email" : "text"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete={signup ? "email" : "username"}
          autoCapitalize="none"
          spellCheck={false}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={signup ? "new-password" : "current-password"}
          minLength={signup ? MIN_PASSWORD_LENGTH : undefined}
          required
        />
        {signup && <div className="small muted">At least {MIN_PASSWORD_LENGTH} characters.</div>}
      </div>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <button className="btn" disabled={busy}>
        {busy ? "Just a moment…" : signup ? "Create account" : "Sign in"}
      </button>
      <p className="small muted" style={{ margin: 0 }}>
        {signup ? "Already have an account? " : "New to my247tutor? "}
        <Link href={otherHref}>{signup ? "Sign in" : "Create an account"}</Link>
        {!signup && " Forgotten your password? Contact my247tutor and we'll reset it."}
      </p>
    </form>
  );
}
