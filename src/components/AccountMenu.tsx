"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useAccount } from "@/components/useAccount";

/** Sign in (with any free-trial time left), or the signed-in parent's Admin and Sign out, in the top bar. */
export function AccountMenu() {
  const { loaded, enabled, billing, user, trialEndsAt } = useAccount();
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
      {user.trialEndsAt && <TrialTimer endsAt={user.trialEndsAt} account />}
      {billing && user.role === "parent" && <Link href="/billing">Billing</Link>}
      {user.role === "admin" && <Link href="/admin">Admin</Link>}
      <button type="button" className="link-button" onClick={() => void signOut()} title={`Signed in as ${user.email}`}>
        Sign out
      </button>
    </>
  );
}

/** Pages a visitor can stay on after the free hour. */
const OPEN_PAGES = ["/", "/start", "/signin", "/signup", "/billing"];

/**
 * Minutes left of the free hour. When it runs out a visitor goes on to sign-up (progress so far
 * moves into the new account), and a signed-in parent goes on to add a payment method.
 */
function TrialTimer({ endsAt, account = false }: { endsAt: number; account?: boolean }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 30_000);
    const end = setTimeout(() => {
      setNow(Date.now());
      if (OPEN_PAGES.includes(window.location.pathname)) return;
      const next = window.location.pathname + window.location.search;
      window.location.assign(account ? "/billing" : `/signup?trial=over&next=${encodeURIComponent(next)}`);
    }, endsAt - Date.now());
    return () => {
      clearInterval(tick);
      clearTimeout(end);
    };
  }, [endsAt]);
  const minutes = Math.max(0, Math.ceil((endsAt - now) / 60_000));
  if (minutes === 0) return null;
  return (
    <Link
      href={account ? "/billing" : "/signup"}
      className="trial-pill"
      title={
        account
          ? "Free trial time left. Add a payment method to keep going after it."
          : "Free trial time left. Create an account to keep going after it."
      }
    >
      {minutes} min free
    </Link>
  );
}
