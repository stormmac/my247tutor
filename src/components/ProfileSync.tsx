"use client";

import { useEffect } from "react";
import { useAccount } from "@/components/useAccount";
import { PROFILE_CHANGED, readAllProfiles, readStoredProfile, replaceAllProfiles, withId } from "@/components/useProfile";
import type { LearnerProfile } from "@/lib/learner/model";

const OWNER_KEY = "my247tutor.owner";
const SAVE_DELAY_MS = 1500;

/**
 * Keeps the children's progress in the parent's account, so it follows them to any device. A child
 * signed in on their own gets just their own progress, and saves only that.
 * The browser copy is still what the pages use; this loads it on sign-in and saves changes back.
 */
export function ProfileSync() {
  const { user } = useAccount();

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let ready = false;

    const put = (body: object) =>
      void fetch("/api/learner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true,
      });

    // The usual save: the child on screen (the only one a page can change) and which children to keep.
    const send = () => {
      timer = undefined;
      let profiles = readAllProfiles();
      if (profiles.some((p) => !p.id)) {
        // Children saved before they had ids get one now, kept in the browser so the next save matches.
        profiles = profiles.map(withId);
        replaceAllProfiles(profiles);
      }
      const changed = readStoredProfile();
      put({ changed: changed && (profiles.find((p) => p.id === changed.id) ?? withId(changed)), ids: profiles.map((p) => p.id) });
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

    const load = async () => {
      const res = await fetch("/api/learner").catch(() => null);
      if (cancelled || !res?.ok) return null;
      return ((await res.json()) as { profiles?: LearnerProfile[] }).profiles ?? [];
    };
    // Coming back to the tab picks up practice done elsewhere, such as on the child's own sign-in.
    const refresh = async () => {
      if (!ready || document.visibilityState !== "visible" || timer !== undefined) return;
      const profiles = await load();
      if (profiles?.length && timer === undefined) replaceAllProfiles(profiles);
    };
    const onVisible = () => void refresh();
    document.addEventListener("visibilitychange", onVisible);

    void (async () => {
      const profiles = await load();
      if (profiles === null) return;
      let owner: string | null = null;
      try {
        owner = localStorage.getItem(OWNER_KEY);
        localStorage.setItem(OWNER_KEY, user.id);
      } catch {}
      const local = readAllProfiles();
      if (profiles.length) replaceAllProfiles(profiles);
      else if (local.length && (owner === null || owner === user.id) && !user.child) {
        // Progress made in this browser before signing up moves into the account.
        const moving = local.map(withId);
        replaceAllProfiles(moving);
        put({ profiles: moving });
      } else replaceAllProfiles([]);
      ready = true;
    })();

    return () => {
      cancelled = true;
      flush();
      window.removeEventListener(PROFILE_CHANGED, onChange);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [user]);

  return null;
}
