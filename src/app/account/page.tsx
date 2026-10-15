"use client";

import Link from "next/link";
import { ChangePassword } from "@/components/ChangePassword";
import { homeFor, signOut, useAccount } from "@/components/useAccount";

const ACCOUNT_TYPES: Record<string, string> = {
  admin: "Admin",
  parent: "Parent or carer",
  centre: "Tutoring centre",
  teacher: "Teacher",
  student: "Student",
};

/** Everyone's own account page: who they're logged in as, their password, and logging out. */
export default function AccountPage() {
  const { loaded, user, billing } = useAccount();
  if (!loaded) return <p className="muted">Loading…</p>;
  if (!user)
    return (
      <div className="card narrow stack" style={{ margin: "40px auto" }}>
        <h1>My account</h1>
        <p className="muted" style={{ margin: 0 }}>
          You&apos;re not logged in.
        </p>
        <Link className="btn" href="/login?next=/account">
          Log in
        </Link>
      </div>
    );

  return (
    <div className="stack narrow" style={{ margin: "0 auto" }}>
      <h1 style={{ marginBottom: 0 }}>My account</h1>
      <div className="card stack">
        <h2 style={{ margin: 0 }}>Your details</h2>
        <dl className="details-list">
          <dt>{user.role === "centre" ? "Centre" : "Name"}</dt>
          <dd>{user.name}</dd>
          <dt>{user.child ? "Username" : "Email"}</dt>
          <dd>{user.email}</dd>
          <dt>Account type</dt>
          <dd>{ACCOUNT_TYPES[user.role] ?? user.role}</dd>
        </dl>
        <p className="small muted" style={{ margin: 0 }}>
          {user.child
            ? "You log in with your username. To change your name or username, ask your parent or teacher."
            : "You log in with your email. To change your name or email, contact my247tutor."}
        </p>
        <div className="row">
          <Link className="btn secondary small" href={homeFor(user.role)}>
            Go to my home page
          </Link>
          {billing && (user.role === "parent" || user.role === "centre") && (
            <Link className="btn secondary small" href="/billing">
              Billing
            </Link>
          )}
        </div>
      </div>
      <div className="card">
        {user.child ? (
          <div className="stack">
            <h2 style={{ margin: 0 }}>Password</h2>
            <p className="muted" style={{ margin: 0 }}>
              Forgotten your password, or want a new one? Ask your parent or teacher to set a new one for you.
            </p>
          </div>
        ) : (
          <ChangePassword />
        )}
      </div>
      <div className="card row spread">
        <div>
          <h2 style={{ margin: 0 }}>Log out</h2>
          <p className="small muted" style={{ margin: 0 }}>
            On a shared computer, log out when you&apos;re done.
          </p>
        </div>
        <button className="btn secondary" onClick={() => void signOut()}>
          Log out
        </button>
      </div>
    </div>
  );
}
