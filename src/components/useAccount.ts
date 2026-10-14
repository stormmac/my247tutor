"use client";

import { useEffect, useState } from "react";
import type { Role } from "@/lib/auth/rules";

export interface Account {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AccountState {
  loaded: boolean;
  /** False when accounts aren't set up on this site yet; everything then works without signing in. */
  enabled: boolean;
  user: Account | null;
  /** When this browser's free trial ends (milliseconds), if it has had one and isn't signed in. */
  trialEndsAt: number | null;
}

let request: Promise<AccountState> | null = null;

function fetchAccount(): Promise<AccountState> {
  request ??= fetch("/api/auth/me")
    .then((r) => r.json() as Promise<{ enabled: boolean; user: Account | null; trialEndsAt?: number | null }>)
    .then((b) => ({ loaded: true, enabled: b.enabled, user: b.user, trialEndsAt: b.trialEndsAt ?? null }))
    .catch(() => ({ loaded: true, enabled: false, user: null, trialEndsAt: null }));
  return request;
}

/** Who is signed in, fetched once per page load. */
export function useAccount(): AccountState {
  const [state, setState] = useState<AccountState>({ loaded: false, enabled: false, user: null, trialEndsAt: null });
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
