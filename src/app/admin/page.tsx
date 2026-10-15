"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminTabs } from "@/components/AdminTabs";
import { SetupStatus } from "@/components/SetupStatus";
import { logInAs, useAccount } from "@/components/useAccount";
import type { Plan, Role } from "@/lib/auth/rules";

interface Row {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  learners: number;
  /** For a teacher at a tutoring centre: the centre. */
  centreName: string | null;
  freeAccess: boolean;
  plan: Plan;
  paidUntil: number | null;
  trialEndsAt: number | null;
}

const PLAN: Record<Plan, { label: string; pill: string }> = {
  staff: { label: "Staff", pill: "" },
  free: { label: "Free access", pill: "good" },
  paying: { label: "Paying", pill: "good" },
  trial: { label: "Free trial", pill: "warn" },
  unpaid: { label: "Needs to pay", pill: "bad" },
};

const date = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-AU") : "Never");

/** Admins manage accounts: adding them, roles, free access, turning accounts off, and password resets. */
export default function AdminPage() {
  const account = useAccount();
  if (!account.loaded) return <p className="muted">Loading…</p>;
  if (!account.enabled) {
    return (
      <div className="stack" style={{ maxWidth: 720 }}>
        <h1>Admin</h1>
        <SetupStatus />
      </div>
    );
  }
  return <Accounts />;
}

function Accounts() {
  const [users, setUsers] = useState<Row[] | null>(null);
  const [me, setMe] = useState<string | null>(null);
  const [billing, setBilling] = useState(false);
  const [emailOn, setEmailOn] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/users");
    const body = (await res.json().catch(() => ({}))) as { users?: Row[]; me?: string; billing?: boolean; email?: boolean; error?: string };
    if (!res.ok) return setError(body.error ?? "Couldn't load accounts.");
    setUsers(body.users ?? []);
    setMe(body.me ?? null);
    setBilling(Boolean(body.billing));
    setEmailOn(Boolean(body.email));
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function change(user: Row, update: { role?: Role; isActive?: boolean; freeAccess?: boolean }) {
    setError(null);
    setNotice(null);
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    if (!res.ok) setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "That didn't work.");
    await load();
  }

  async function reset(user: Row) {
    setInviteLink(null);
    if (!confirm(`Reset ${user.email}'s password? They'll be logged out everywhere.`)) return;
    setError(null);
    const res = await fetch(`/api/admin/users/${user.id}/reset-password`, { method: "POST" });
    const body = (await res.json().catch(() => ({}))) as { password?: string; error?: string };
    if (res.ok) setNotice(`New temporary password for ${user.email}: ${body.password}. Pass it on privately; it won't be shown again.`);
    else setError(body.error ?? "That didn't work.");
  }

  /** Opens the site as this account, to see what they see. Admin comes back from the banner at the top. */
  async function actAs(user: Row) {
    if (!confirm(`Log in as ${user.name}? You'll see the site as they do until you go back to Admin.`)) return;
    setError(null);
    setNotice(null);
    const failed = await logInAs(user.id);
    if (failed) setError(failed);
  }

  /** Shows what happened to an invite: emailed, or a link to pass on when email isn't working. */
  function invited(r: Invite) {
    setError(null);
    if (r.emailed) {
      setInviteLink(null);
      setNotice(`Invite emailed to ${r.email}. They'll get a link to set their password.`);
    } else {
      setNotice(
        r.emailError
          ? `The email to ${r.email} didn't send (${r.emailError}). Send them this link to set their password instead. It works once, for 7 days.`
          : `Email isn't set up yet, so send ${r.email} this link to set their password. It works once, for 7 days.`,
      );
      setInviteLink(r.link);
    }
  }

  async function resend(user: Row) {
    setNotice(null);
    const res = await fetch(`/api/admin/users/${user.id}/invite`, { method: "POST" });
    const body = (await res.json().catch(() => ({}))) as Invite & { error?: string };
    if (res.ok) invited(body);
    else setError(body.error ?? "That didn't work.");
  }

  if (error && !users) return <div className="feedback bad">{error}</div>;
  if (!users) return <p className="muted">Loading accounts…</p>;

  const q = filter.trim().toLowerCase();
  const shown = q ? users.filter((u) => u.email.includes(q) || u.name.toLowerCase().includes(q)) : users;

  return (
    <div className="stack">
      <AdminTabs current="accounts" />
      <div className="row spread">
        <div>
          <h1>Admin</h1>
          <p className="muted" style={{ margin: 0 }}>
            {users.length} accounts, {users.filter((u) => u.isActive).length} active, {users.reduce((n, u) => n + u.learners, 0)} learners.
          </p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <input
            type="search"
            placeholder="Search name or email"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ maxWidth: 260 }}
            aria-label="Search accounts"
          />
          {!adding && (
            <button className="btn small" onClick={() => setAdding(true)}>
              Add account
            </button>
          )}
        </div>
      </div>
      <SetupStatus compact />
      <PaymentsSetup />
      {adding && (
        <AddAccount
          onCancel={() => setAdding(false)}
          emailOn={emailOn}
          onAdded={(r) => {
            setAdding(false);
            invited(r);
            void load();
          }}
        />
      )}
      {notice && (
        <div className={`feedback ${inviteLink ? "warn" : "good"}`} role="status">
          {notice}
          {inviteLink && (
            <div className="row" style={{ marginTop: 8, flexWrap: "nowrap" }}>
              <input readOnly value={inviteLink} aria-label="Set-password link" onFocus={(e) => e.target.select()} />
              <button className="btn secondary small" onClick={() => void navigator.clipboard?.writeText(inviteLink)}>
                Copy
              </button>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <div className="card table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Role</th>
              <th>Plan</th>
              <th>Learners</th>
              <th>Joined</th>
              <th>Last sign-in</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shown.map((u) => {
              const self = u.id === me;
              return (
                <tr key={u.id} className={u.isActive ? "" : "muted"}>
                  <td>
                    <strong>{u.name}</strong>
                    {self && (
                      <span className="pill" style={{ marginLeft: 6 }}>
                        You
                      </span>
                    )}
                    <div className="small muted">{u.email}</div>
                    {u.centreName && <div className="small muted">Teacher at {u.centreName}</div>}
                    {!u.lastLoginAt && !self && <div className="small muted">Hasn&apos;t set a password yet</div>}
                  </td>
                  <td>
                    <select
                      value={u.role}
                      disabled={self}
                      onChange={(e) => void change(u, { role: e.target.value as Role })}
                      aria-label={`Role for ${u.email}`}
                      style={{ width: "auto" }}
                    >
                      <option value="parent">Parent</option>
                      <option value="centre">Tutoring centre</option> <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <span className={`pill ${PLAN[u.plan].pill}`}>{PLAN[u.plan].label}</span>
                    {u.plan === "paying" && u.paidUntil && (
                      <div className="small muted">Until {date(new Date(u.paidUntil).toISOString())}</div>
                    )}
                    {u.plan === "trial" && u.trialEndsAt && (
                      <div className="small muted">
                        Ends{" "}
                        {new Date(u.trialEndsAt).toLocaleString("en-AU", {
                          day: "numeric",
                          month: "short",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                    {!billing && u.plan !== "staff" && u.plan !== "free" && <div className="small muted">Payments are off</div>}
                  </td>
                  <td>{u.learners}</td>
                  <td>{date(u.createdAt)}</td>
                  <td>{date(u.lastLoginAt)}</td>
                  <td>
                    <span className={`pill ${u.isActive ? "good" : "bad"}`}>{u.isActive ? "Active" : "Turned off"}</span>
                  </td>
                  <td>
                    {!self && (
                      <div className="row" style={{ gap: 6, flexWrap: "wrap", maxWidth: 280 }}>
                        <button className="btn secondary small" onClick={() => void change(u, { isActive: !u.isActive })}>
                          {u.isActive ? "Turn off" : "Turn on"}
                        </button>
                        {u.role !== "admin" && u.isActive && (
                          <button className="btn small" onClick={() => void actAs(u)}>
                            Log in as
                          </button>
                        )}
                        <button className="btn secondary small" onClick={() => void reset(u)}>
                          Reset password
                        </button>
                        {!u.lastLoginAt && (
                          <button className="btn secondary small" onClick={() => void resend(u)}>
                            Send invite again
                          </button>
                        )}
                        {u.plan !== "staff" && (
                          <button className="btn secondary small" onClick={() => void change(u, { freeAccess: !u.freeAccess })}>
                            {u.freeAccess ? "End free access" : "Give free access"}
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="small muted">Every change here is recorded with who made it.</p>
    </div>
  );
}

interface Invite {
  email: string;
  link: string;
  emailed: boolean;
  emailError?: string;
}

/** An admin adds a parent, tutoring centre, teacher or admin account. Its owner is emailed a link to set their password. */
function AddAccount({ onAdded, onCancel, emailOn }: { onAdded: (invite: Invite) => void; onCancel: () => void; emailOn: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("parent");
  const [freeAccess, setFreeAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role, freeAccess: role === "parent" || role === "centre" ? freeAccess : false }),
    });
    const body = (await res.json().catch(() => ({}))) as Partial<Invite> & { user?: { email: string }; error?: string };
    setBusy(false);
    if (res.ok && body.user && body.link)
      onAdded({ email: body.user.email, link: body.link, emailed: Boolean(body.emailed), emailError: body.emailError });
    else setError(body.error ?? "That didn't work.");
  }

  return (
    <form className="card stack" onSubmit={submit} style={{ maxWidth: 560 }}>
      <h2 style={{ margin: 0 }}>Add an account</h2>
      <div className="grid grid-2">
        <div>
          <label htmlFor="new-name">Name</label>
          <input id="new-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
        </div>
        <div>
          <label htmlFor="new-email">Email</label>
          <input id="new-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
      <div className="row">
        <label className="row" style={{ fontWeight: 400, margin: 0 }}>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value as Role)} style={{ width: "auto" }}>
            <option value="parent">Parent</option>
            <option value="centre">Tutoring centre</option> <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {(role === "parent" || role === "centre") && (
          <label className="row" style={{ fontWeight: 400, margin: 0 }}>
            <input type="checkbox" checked={freeAccess} onChange={(e) => setFreeAccess(e.target.checked)} style={{ width: "auto" }} />
            Free access (never asked to pay)
          </label>
        )}
      </div>
      <p className="small muted" style={{ margin: 0 }}>
        {role === "centre" ? "Put the centre's name as the name. They'll add their own teachers, classes and students. " : ""}
        {(role === "parent" || role === "centre") && !freeAccess
          ? "They get the usual free trial, then are asked to add a payment method. "
          : ""}
        {emailOn
          ? "We'll email them to say they have access, with a link to set their password."
          : "Email isn't set up yet, so you'll get a link to send them for setting their password."}
      </p>
      {error && (
        <div className="feedback bad" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        <button className="btn" disabled={busy}>
          {busy ? "Adding…" : "Add account"}
        </button>
        <button type="button" className="btn secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

interface PaymentsStatus {
  enabled: boolean;
  checks: { label: string; ok: boolean; fix: string }[];
  price: { amount: number; currency: string; interval: string | null } | null;
}

/** What's set up for card payments through Stripe, and what's left to do. */
function PaymentsSetup() {
  const [status, setStatus] = useState<PaymentsStatus | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch("/api/billing/setup")
      .then((r) => (r.ok ? (r.json() as Promise<PaymentsStatus>) : null))
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);
  if (!status) return null;
  const done = status.checks.every((c) => c.ok);
  const price = status.price
    ? `${new Intl.NumberFormat("en-AU", { style: "currency", currency: status.price.currency.toUpperCase() }).format(status.price.amount / 100)}${status.price.interval ? ` a ${status.price.interval}` : ""}`
    : null;
  return (
    <div className="card stack">
      <div className="row spread">
        <div>
          <h2 style={{ margin: 0 }}>{status.enabled ? "Card payments are on" : "Card payments are off"}</h2>
          <p className="muted" style={{ margin: "4px 0 0" }}>
            {status.enabled
              ? `Parents pay ${price ?? "the Stripe price"} once their free trial ends.${done ? "" : " Some setup is still missing."}`
              : "Until Stripe is connected, nobody is asked to pay."}
          </p>
        </div>
        <button className="btn secondary small" onClick={() => setOpen((o) => !o)}>
          {open ? "Hide setup" : done ? "Show setup" : "What's left to set up"}
        </button>
      </div>
      {open && (
        <ul className="setup-checks">
          {status.checks.map((c) => (
            <li key={c.label} className={c.ok ? "ok" : ""}>
              <span aria-hidden="true">{c.ok ? "✓" : "✗"}</span>
              <div>
                {c.label}
                {!c.ok && <div className="small muted">{c.fix}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
