"use client";

import { useEffect } from "react";
import { useAccount } from "@/components/useAccount";
import { PROFILE_CHANGED, readStoredProfile, replaceStoredProfile } from "@/components/useProfile";
import type { LearnerProfile } from "@/lib/learner/model";

const OWNER_KEY = "my247tutor.owner";
const SAVE_DELAY_MS = 1500;

/**
 * Keeps the child's progress in the parent's account, so it follows them to any device.
 * The browser copy is still what the pages use; this loads it on sign-in and saves changes back.
 */
export function ProfileSync() {
  const { user } = useAccount();

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let ready = false;

    const save = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        void fetch("/api/learner", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: readStoredProfile() }),
          keepalive: true,
        });
      }, SAVE_DELAY_MS);
    };
    const onChange = () => ready && save();
    window.addEventListener(PROFILE_CHANGED, onChange);

    void (async () => {
      const res = await fetch("/api/learner").catch(() => null);
      if (cancelled || !res?.ok) return;
      const { profile } = (await res.json()) as { profile: LearnerProfile | null };
      let owner: string | null = null;
      try {
        owner = localStorage.getItem(OWNER_KEY);
        localStorage.setItem(OWNER_KEY, user.id);
      } catch {}
      const local = readStoredProfile();
      if (profile) replaceStoredProfile(profile);
      else if (local && (owner === null || owner === user.id)) {
        // Progress made in this browser before signing up moves into the account.
        ready = true;
        save();
      } else replaceStoredProfile(null);
      ready = true;
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener(PROFILE_CHANGED, onChange);
    };
  }, [user]);

  return null;
}
