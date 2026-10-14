"use client";

import { useCallback, useEffect, useState } from "react";
import type { LearnerProfile } from "@/lib/learner/model";

/**
 * The learner profile lives in this browser. When a parent is signed in, ProfileSync also keeps
 * it in their account.
 */
const KEY = "my247tutor.profile.v1";

export function readStoredProfile(): LearnerProfile | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LearnerProfile;
    return parsed.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}

/** Fired when this tab saves the profile, so every part of the page (the page itself, Suni) stays in step. */
export const PROFILE_CHANGED = "my247tutor-profile-changed";

function write(profile: LearnerProfile | null, notify: string = PROFILE_CHANGED) {
  try {
    if (profile) localStorage.setItem(KEY, JSON.stringify(profile));
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked (private mode): progress lasts for this visit only.
  }
  queueMicrotask(() => window.dispatchEvent(new Event(notify)));
}

/** Fired when the saved copy arrives from the account, so pages update without saving it straight back. */
const PROFILE_LOADED = "my247tutor-profile-loaded";

/** Replaces this browser's copy with the one from the parent's account. */
export function replaceStoredProfile(profile: LearnerProfile | null) {
  write(profile, PROFILE_LOADED);
}

export function useProfile() {
  const [profile, setProfileState] = useState<LearnerProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfileState(readStoredProfile());
    setLoaded(true);
    // If storage is blocked, readStoredProfile() is null; keep what we have rather than losing this visit's progress.
    const sync = (e: Event) => {
      const stored = readStoredProfile();
      // A profile loaded from the account can be empty (a new account); local saves never clear it here.
      if (stored || e.type === PROFILE_LOADED) setProfileState(stored);
    };
    window.addEventListener(PROFILE_CHANGED, sync);
    window.addEventListener(PROFILE_LOADED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROFILE_CHANGED, sync);
      window.removeEventListener(PROFILE_LOADED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setProfile = useCallback((update: LearnerProfile | null | ((p: LearnerProfile) => LearnerProfile)) => {
    setProfileState((prev) => {
      // Functional updates start from the stored profile, so Suni and the page can't undo each other's changes.
      const base = readStoredProfile() ?? prev;
      const next = typeof update === "function" ? (base ? update(base) : base) : update;
      write(next);
      return next;
    });
  }, []);

  return { profile, setProfile, loaded };
}
