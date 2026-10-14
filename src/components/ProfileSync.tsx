"use client";

import { useEffect } from "react";
import { useAccount } from "@/components/useAccount";
import { PROFILE_CHANGED, readAllProfiles, replaceAllProfiles, withId } from "@/components/useProfile";
import type { LearnerProfile } from "@/lib/learner/model";

const OWNER_KEY = "my247tutor.owner";
const SAVE_DELAY_MS = 1500;

/**
 * Keeps the children's progress in the parent's account, so it follows them to any device.
 * The browser copy is still what the pages use; this loads it on sign-in and saves changes back.
 */
export function ProfileSync() {
  const { user } = useAccount();

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let ready = false;

    const send = () => {
      timer = undefined;
      let profiles = readAllProfiles();
      if (profiles.some((p) => !p.id)) {
        // Children saved before they had ids get one now, kept in the browser so the next save matches.
        profiles = profiles.map(withId);
        replaceAllProfiles(profiles);
      }
      void fetch("/api/learner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles }),
        keepalive: true,
      });
    };
    const save = () => {
      clearTimeout(timer);
      timer = setTimeout(send, SAVE_DELAY_MS);
    };
    // Leaving the page (switching child, adding one) sends a waiting save straight away.
    const flush = () => {
      if (timer === undefined) return;
      clearTimeout(timer);
      send();
    };
    const onChange = () => ready && save();
    window.addEventListener(PROFILE_CHANGED, onChange);
    window.addEventListener("pagehide", flush);

    void (async () => {
      const res = await fetch("/api/learner").catch(() => null);
      if (cancelled || !res?.ok) return;
      const { profiles } = (await res.json()) as { profiles?: LearnerProfile[] };
      let owner: string | null = null;
      try {
        owner = localStorage.getItem(OWNER_KEY);
        localStorage.setItem(OWNER_KEY, user.id);
      } catch {}
      const local = readAllProfiles();
      if (profiles?.length) replaceAllProfiles(profiles);
      else if (local.length && (owner === null || owner === user.id)) {
        // Progress made in this browser before signing up moves into the account.
        ready = true;
        send();
      } else replaceAllProfiles([]);
      ready = true;
    })();

    return () => {
      cancelled = true;
      flush();
      window.removeEventListener(PROFILE_CHANGED, onChange);
      window.removeEventListener("pagehide", flush);
    };
  }, [user]);

  return null;
}
