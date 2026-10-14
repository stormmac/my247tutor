"use client";

import { useEffect, useState } from "react";
import type { Plan, Role } from "@/lib/auth/rules";

export interface Account {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** Card payments: why this account can use the site ("trial", "paying", "free", "staff"), or "unpaid". */
  plan?: Plan;
  /** Payments are on and the free trial is over without a card added. */
  needsPayment?: boolean;
  /** When the account's free trial ends, while it's on one. */
  trialEndsAt?: number | null;
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

export async function signOut() {
  await fetch("/api/auth/signout", { method: "POST" }).catch(() => undefined);
  // The next person on this device shouldn't see this child's progress.
  try {
    localStorage.clear();
  } catch {}
  window.location.assign("/");
}
