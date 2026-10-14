"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useAccount } from "@/components/useAccount";

/** Sign in (with any free-trial time left), or the signed-in parent's Admin and Sign out, in the top bar. */
export function AccountMenu() {
  const { loaded, enabled, user, trialEndsAt } = useAccount();
  if (!loaded || !enabled) return null;
  if (!user)
    return (
      <>
        {trialEndsAt !== null && trialEndsAt > Date.now() && <TrialTimer endsAt={trialEndsAt} />}
        <Link href="/signin" className="nav-signin">
          Sign in
        </Link>
      </>
    );
  return (
    <>
      {user.role === "admin" && <Link href="/admin">Admin</Link>}
      <button type="button" className="link-button" onClick={() => void signOut()} title={`Signed in as ${user.email}`}>
        Sign out
      </button>
    </>
  );
}

/** Pages a visitor can stay on after the free hour. */
const OPEN_PAGES = ["/", "/start", "/signin", "/signup"];

/** Minutes left of the free hour; when it runs out, on to sign-up (progress so far moves into the new account). */
function TrialTimer({ endsAt }: { endsAt: number }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 30_000);
    const end = setTimeout(() => {
      setNow(Date.now());
      if (OPEN_PAGES.includes(window.location.pathname)) return;
      const next = window.location.pathname + window.location.search;
      window.location.assign(`/signup?trial=over&next=${encodeURIComponent(next)}`);
    }, endsAt - Date.now());
    return () => {
      clearInterval(tick);
      clearTimeout(end);
    };
  }, [endsAt]);
  const minutes = Math.max(0, Math.ceil((endsAt - now) / 60_000));
  if (minutes === 0) return null;
  return (
    <Link href="/signup" className="trial-pill" title="Free trial time left. Create a free account to keep going after it.">
      {minutes} min free
    </Link>
  );
}
