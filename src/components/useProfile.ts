"use client";

import { useCallback, useEffect, useState } from "react";
import type { LearnerProfile } from "@/lib/learner/model";

/**
 * MVP storage: the learner profile lives in this browser only.
 * Parent accounts and server-side storage come next; see README.
 */
const KEY = "my247tutor.profile.v1";

function read(): LearnerProfile | null {
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
const CHANGED = "my247tutor-profile-changed";

function write(profile: LearnerProfile | null) {
  try {
    if (profile) localStorage.setItem(KEY, JSON.stringify(profile));
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked (private mode): progress lasts for this visit only.
  }
  queueMicrotask(() => window.dispatchEvent(new Event(CHANGED)));
}

export function useProfile() {
  const [profile, setProfileState] = useState<LearnerProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfileState(read());
    setLoaded(true);
    // If storage is blocked, read() is null; keep what we have rather than losing this visit's progress.
    const sync = () => {
      const stored = read();
      if (stored) setProfileState(stored);
    };
    window.addEventListener(CHANGED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setProfile = useCallback((update: LearnerProfile | null | ((p: LearnerProfile) => LearnerProfile)) => {
    setProfileState((prev) => {
      // Functional updates start from the stored profile, so Suni and the page can't undo each other's changes.
      const base = read() ?? prev;
      const next = typeof update === "function" ? (base ? update(base) : base) : update;
      write(next);
      return next;
    });
  }, []);

  return { profile, setProfile, loaded };
}
