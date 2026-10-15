"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PasswordField } from "@/components/PasswordField";
import { homeFor, signOut, useAccount } from "@/components/useAccount";
import { MIN_PASSWORD_LENGTH, safeNextPath } from "@/lib/auth/rules";

type SignUpAs = "parent" | "centre";

/** The log in and sign up forms. One log in form for everyone: email for grown-ups, username for students. */
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const params = useSearchParams();
  // Only a page the person was sent away from; otherwise each account goes to its own home page.
  const asked = params.get("next");
  const next = asked ? safeNextPath(asked) : null;
  const [signUpAs, setSignUpAs] = useState<SignUpAs>(params.get("as") === "centre" ? "centre" : "parent");
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
      const res = await fetch(`/api/auth/${signup ? "signup" : "signin"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup ? { name, email, password, role: signUpAs } : { email, password }),
      });
      if (res.ok) {
        const { user } = (await res.json().catch(() => ({}))) as { user?: { role?: string } };
        // A full page load so every part of the page sees the new session.
        window.location.assign(next ?? homeFor(user?.role));
        return;
      }
      setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Something went wrong.");
    } catch {
      setError("Couldn't connect. Try again.");
    }
    setBusy(false);
  }

  const keepNext = asked ? `?next=${encodeURIComponent(asked)}` : "";

  // Already logged in: say who as, rather than showing a form that would quietly switch accounts.
  if (account.user)
    return (
      <div className="card narrow stack" style={{ margin: "40px auto" }}>
        <h1>You&apos;re logged in</h1>
        <p className="muted" style={{ margin: 0 }}>
          You&apos;re logged in as <strong>{account.user.name}</strong> ({account.user.email}).
        </p>
        <Link className="btn" href={next ?? homeFor(account.user.role)}>
          Continue
        </Link>
        <button type="button" className="btn secondary" onClick={() => void signOut(signup ? "/signup" : "/login")}>
          Log out and use a different account
        </button>
      </div>
    );

  return (
    <form className="card narrow stack" style={{ margin: "40px auto" }} onSubmit={submit}>
      <h1>{signup ? "Create your account" : "Log in"}</h1>
      {account.loaded && !account.enabled && (
        <div className="feedback warn">
          Logins aren&apos;t switched on for this site yet. <Link href="/admin">See what&apos;s left to set up</Link>.
        </div>
      )}
      {signup && params.get("trial") === "over" && (
        <div className="feedback warn">
          Your free hour is up. Create {account.billing ? "an account" : "a free account"} to keep going. Everything done so far is kept.
        </div>
      )}
      {signup ? (
        <fieldset className="stack" style={{ border: 0, padding: 0, margin: 0, gap: 8 }}>
          <legend style={{ fontWeight: 600, marginBottom: 8, padding: 0 }}>I&apos;m signing up as</legend>
          <div className="account-type">
            {(
              [
                ["parent", "A parent or carer", "For my own children"],
                ["centre", "A tutoring centre", "For our teachers, classes and students"],
              ] as const
            ).map(([value, title, detail]) => (
              <label key={value} className={signUpAs === value ? "selected" : ""}>
                <input type="radio" name="as" value={value} checked={signUpAs === value} onChange={() => setSignUpAs(value)} />
                <strong>{title}</strong>
                <span className="small muted">{detail}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <p className="muted" style={{ margin: 0 }}>
          Parents, tutoring centres and teachers: use your email. Students: use the username you were given.
        </p>
      )}
      {signup && (
        <div>
          <label htmlFor="name">{signUpAs === "centre" ? "Centre name" : "Your name"}</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete={signUpAs === "centre" ? "organization" : "name"}
            maxLength={100}
            required
          />
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
      <PasswordField
        id="password"
        label="Password"
        value={password}
        onChange={setPassword}
        autoComplete={signup ? "new-password" : "current-password"}
        minLength={signup ? MIN_PASSWORD_LENGTH : undefined}
        hint={signup ? `At least ${MIN_PASSWORD_LENGTH} characters.` : undefined}
        extra={
          !signup && (
            <Link href="/forgot-password" className="small">
              Forgot password?
            </Link>
          )
        }
      />
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <button className="btn" disabled={busy}>
        {busy ? "Just a moment…" : signup ? "Create account" : "Log in"}
      </button>
      <p className="small muted" style={{ margin: 0, textAlign: "center" }}>
        {signup ? "Already have an account? " : "New to my247tutor? "}
        <Link href={`/${signup ? "login" : "signup"}${keepNext}`}>{signup ? "Log in" : "Sign up"}</Link>
      </p>
    </form>
  );
}
