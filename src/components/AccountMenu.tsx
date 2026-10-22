"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOut, useAccount } from "@/components/useAccount";

/** The Family link in the top bar, or a centre's, teacher's or admin's own pages. A child signed in on their own gets none. */
export function ParentsLink() {
  const { user, loaded, enabled } = useAccount();
  // Logged out, Log in and Sign up say where parents go.
  if (loaded && enabled && !user) return null;
  if (user?.child) return null;
  if (user?.role === "centre") return <Link href="/centre">Centre</Link>;
  if (user?.role === "teacher") return <Link href="/classes">Classes</Link>;
  if (user?.role === "admin") return <Link href="/admin">Super admin</Link>;
  return <Link href="/parent">Family</Link>;
}

/** Which kind of account someone is logged into, as the top bar shows it. */
export const ACCOUNT_NAMES: Record<string, { icon: string; name: string }> = {
  admin: { icon: "⭐", name: "Super admin" },
  parent: { icon: "👪", name: "Family account" },
  centre: { icon: "🏫", name: "Centre admin" },
  teacher: { icon: "🧑‍🏫", name: "Teacher account" },
  student: { icon: "🎒", name: "Student" },
};

/**
 * The right-hand end of the top bar. Logged out: Log in and Sign up (with any free-trial time left).
 * Logged in: the person's name, opening a menu with who they are, their account and Log out.
 */
export function AccountMenu() {
  const { loaded, enabled, billing, user, trialEndsAt } = useAccount();
  const menu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  // The menu closes when the page changes or on a click anywhere else.
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menu.current?.open && !menu.current.contains(e.target as Node)) menu.current.open = false;
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  if (!loaded || !enabled) return null;
  if (!user)
    return (
      <>
        {trialEndsAt !== null && trialEndsAt > Date.now() && <TrialTimer endsAt={trialEndsAt} />}
        <Link href="/login" className="nav-signin">
          Log in
        </Link>
        <Link href="/signup" className="btn small nav-signup">
          Sign up
        </Link>
      </>
    );
  // "Ms Lee" shows as Ms Lee, not Ms.
  const words = user.name.split(/\s+/);
  const titled = words.length > 1 && /^(mr|mrs|ms|miss|mx|dr)\.?$/i.test(words[0]);
  const firstName = (titled ? words.slice(0, 2).join(" ") : words[0]) || user.name;
  const initial = (titled ? words[1] : firstName).charAt(0).toUpperCase();
  const kind = ACCOUNT_NAMES[user.role] ?? { icon: "👤", name: user.role };
  return (
    <>
      <span className={`account-kind account-kind-${user.role}`} title={`You're logged into a ${kind.name.toLowerCase()}`}>
        <span aria-hidden="true">{kind.icon}</span> {kind.name}
      </span>
      {user.trialEndsAt && !user.child && !user.actingAdmin && <TrialTimer endsAt={user.trialEndsAt} account />}
      <details className="account-menu" ref={menu}>
        <summary aria-label={`Account menu for ${user.name}`}>
          <span className="avatar" aria-hidden="true">
            {initial}
          </span>
          <span className="account-name">{firstName}</span>
        </summary>
        <div className="account-menu-list">
          <div className="account-who">
            <strong>{user.name}</strong>
            <span className="small muted">{user.email}</span>
            <span className="small muted">
              {kind.icon} {kind.name}
            </span>
          </div>
          <Link href="/account">My account</Link>
          {billing && (user.role === "parent" || user.role === "centre") && <Link href="/billing">Billing</Link>}
          {user.role !== "student" && !user.child && <Link href="/curriculum">Curriculum</Link>}
          {user.role === "admin" && <Link href="/admin">Admin</Link>}
          <button type="button" className="link-button" onClick={() => void signOut()}>
            Log out
          </button>
        </div>
      </details>
    </>
  );
}

/** Pages a visitor can stay on after the free hour. */
const OPEN_PAGES = ["/", "/start", "/login", "/signup", "/forgot-password", "/billing"];

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
