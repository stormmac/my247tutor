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

function write(profile: LearnerProfile | null) {
  try {
    if (profile) localStorage.setItem(KEY, JSON.stringify(profile));
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked (private mode): progress lasts for this visit only.
  }
}

export function useProfile() {
  const [profile, setProfileState] = useState<LearnerProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfileState(read());
    setLoaded(true);
  }, []);

  const setProfile = useCallback((update: LearnerProfile | null | ((p: LearnerProfile) => LearnerProfile)) => {
    setProfileState((prev) => {
      const next = typeof update === "function" ? (prev ? update(prev) : prev) : update;
      write(next);
      return next;
    });
  }, []);

  return { profile, setProfile, loaded };
}
