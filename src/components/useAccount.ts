"use client";

import { useEffect, useState } from "react";
import type { Plan, Role } from "@/lib/auth/rules";

export interface Account {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** A child signed in with the username their parent set up. `email` then holds that username. */
  child?: boolean;
  /** Card payments: why this account can use the site ("trial", "paying", "free", "staff"), or "unpaid". */
  plan?: Plan;
  /** Payments are on and the free trial is over without a card added. */
  needsPayment?: boolean;
  /** When the account's free trial ends, while it's on one. */
  trialEndsAt?: number | null;
  /** The admin's name when an admin is logged in as this account from Admin. */
  actingAdmin?: string | null;
}

export interface AccountState {
  loaded: boolean;
  /** False when accounts aren't set up on this site yet; everything then works without signing in. */
  enabled: boolean;
  /** Card payments are switched on. */
  billing: boolean;
  user: Account | null;
  /** When this browser's free trial ends (milliseconds), if it has had one and isn't signed in. */
  trialEndsAt: number | null;
}

let request: Promise<AccountState> | null = null;

function fetchAccount(): Promise<AccountState> {
  request ??= fetch("/api/auth/me")
    .then((r) => r.json() as Promise<{ enabled: boolean; billing?: boolean; user: Account | null; trialEndsAt?: number | null }>)
    .then((b) => ({ loaded: true, enabled: b.enabled, billing: Boolean(b.billing), user: b.user, trialEndsAt: b.trialEndsAt ?? null }))
    .catch(() => ({ loaded: true, enabled: false, billing: false, user: null, trialEndsAt: null }));
  return request;
}

/** Who is signed in, fetched once per page load. */
export function useAccount(): AccountState {
  const [state, setState] = useState<AccountState>({ loaded: false, enabled: false, billing: false, user: null, trialEndsAt: null });
  useEffect(() => {
    let live = true;
    void fetchAccount().then((s) => live && setState(s));
    return () => {
      live = false;
    };
  }, []);
  return state;
}

/** An admin logs in as another account from Admin, then lands where that account would. */
export async function logInAs(userId: string): Promise<string | null> {
  const res = await fetch(`/api/admin/users/${userId}/log-in-as`, { method: "POST" }).catch(() => null);
  const body = (await res?.json().catch(() => ({}))) as { role?: string; error?: string } | undefined;
  if (!res?.ok) return body?.error ?? "That didn't work.";
  // The admin's own browser copy of any children mustn't mix with this account's.
  try {
    localStorage.clear();
  } catch {}
  window.location.assign(body?.role === "student" ? "/learn" : body?.role === "teacher" ? "/" : "/parent");
  return null;
}

/** Ends logging in as someone else and goes back to Admin as yourself. */
export async function backToAdmin() {
  const res = await fetch("/api/auth/back-to-admin", { method: "POST" }).catch(() => null);
  try {
    localStorage.clear();
  } catch {}
  window.location.assign(res?.ok ? "/admin" : "/signin");
}

export async function signOut() {
  await fetch("/api/auth/signout", { method: "POST" }).catch(() => undefined);
  // The next person on this device shouldn't see this child's progress.
  try {
    localStorage.clear();
  } catch {}
  window.location.assign("/");
}
