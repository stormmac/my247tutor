"use client";

import { useEffect, useState } from "react";
import { pickChildOnLoad } from "@/components/useProfile";
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
  /** Who is logged in as this account: an admin, or a teacher or centre learning as their student. */
  actingRole?: Role | null;
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

/** Where each kind of account lands after logging in: its own home page. */
export function homeFor(role: string | undefined): string {
  const home: Record<string, string> = { admin: "/admin", student: "/learn", teacher: "/classes", centre: "/centre" };
  return home[role ?? ""] ?? "/parent";
}

/** An admin logs in as another account from Admin, then lands where that account would. */
export async function logInAs(userId: string): Promise<string | null> {
  const res = await fetch(`/api/admin/users/${userId}/log-in-as`, { method: "POST" }).catch(() => null);
  const body = (await res?.json().catch(() => ({}))) as { role?: string; error?: string } | undefined;
  if (!res?.ok) return body?.error ?? "That didn't work.";
  // The admin's own browser copy of any children mustn't mix with this account's.
  try {
    localStorage.clear();
    sessionStorage.removeItem(RETURN_KEY);
  } catch {}
  window.location.assign(homeFor(body?.role));
  return null;
}

const RETURN_KEY = "my247tutor.admin-return";
const LEARNING_KEY = "my247tutor.learning-as";

/** An admin, teacher or centre learns as one student from the Learn picker, then lands on their Learn page. */
export async function learnAs(learnerId: string, from: "admin" | "classes" = "admin"): Promise<string | null> {
  const url = from === "admin" ? `/api/admin/learners/${learnerId}/learn-as` : `/api/classes/learn-as/${learnerId}`;
  const res = await fetch(url, { method: "POST" }).catch(() => null);
  const body = (await res?.json().catch(() => ({}))) as { pick?: string | null; error?: string } | undefined;
  if (!res?.ok) return body?.error ?? "That didn't work.";
  try {
    localStorage.clear();
    // Kept in every tab, and cleared with the rest of storage when they go back.
    localStorage.setItem(LEARNING_KEY, "1");
    sessionStorage.setItem(RETURN_KEY, "/learn");
  } catch {}
  pickChildOnLoad(body?.pick ?? null);
  window.location.assign("/learn");
  return null;
}

/** Whether this browser is learning as a student picked on the Learn page, rather than logged in as an account from Admin. */
export function learningAsStudent(): boolean {
  try {
    return localStorage.getItem(LEARNING_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Ends logging in as someone else and goes back to where they started: Admin, or the Learn picker
 * to choose another student. `to` sends them somewhere else instead.
 */
export async function backToAdmin(to?: string) {
  const res = await fetch("/api/auth/back-to-admin", { method: "POST" }).catch(() => null);
  const body = (await res?.json().catch(() => ({}))) as { role?: string } | undefined;
  let back = body?.role === "admin" ? "/admin" : "/learn";
  try {
    localStorage.clear();
    back = sessionStorage.getItem(RETURN_KEY) ?? back;
    sessionStorage.removeItem(RETURN_KEY);
  } catch {}
  window.location.assign(res?.ok ? (to ?? back) : "/login");
}

/** Logs out, then goes to `to` (the home page unless asked). */
export async function signOut(to = "/") {
  await fetch("/api/auth/signout", { method: "POST" }).catch(() => undefined);
  // The next person on this device shouldn't see this child's progress.
  try {
    localStorage.clear();
  } catch {}
  window.location.assign(to);
}
