"use client";

import { useCallback, useEffect, useState } from "react";
import { MAX_CHILDREN, newChildId, type LearnerProfile } from "@/lib/learner/model";

/**
 * The learner profile lives in this browser. When a parent is signed in, ProfileSync also keeps
 * it in their account. A parent can have up to three children: the one being used is stored under
 * KEY, which every page reads, and the others wait under OTHERS_KEY until the parent switches.
 */
const KEY = "my247tutor.profile.v1";
const OTHERS_KEY = "my247tutor.others.v1";
/** Set while a new child is being set up, so loading the account doesn't put another child back on screen. */
const ADDING_KEY = "my247tutor.adding-child";

function addingChild(): boolean {
  try {
    return localStorage.getItem(ADDING_KEY) === "1";
  } catch {
    return false;
  }
}

function setAddingChild(on: boolean) {
  try {
    if (on) localStorage.setItem(ADDING_KEY, "1");
    else localStorage.removeItem(ADDING_KEY);
  } catch {}
}

export function readOtherProfiles(): LearnerProfile[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(OTHERS_KEY) ?? "[]") as LearnerProfile[];
    return Array.isArray(parsed) ? parsed.filter((p) => p?.version === 1) : [];
  } catch {
    return [];
  }
}

function writeOthers(others: LearnerProfile[]) {
  try {
    if (others.length) localStorage.setItem(OTHERS_KEY, JSON.stringify(others));
    else localStorage.removeItem(OTHERS_KEY);
  } catch {}
}

/** Gives a profile an id if it was saved before children had them. */
export function withId(profile: LearnerProfile): LearnerProfile {
  return profile.id ? profile : { ...profile, id: newChildId() };
}

/** Every child in this browser, the current one first. */
export function readAllProfiles(): LearnerProfile[] {
  const active = readStoredProfile();
  return [...(active ? [active] : []), ...readOtherProfiles()].slice(0, MAX_CHILDREN);
}

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
    if (profile) {
      localStorage.setItem(KEY, JSON.stringify(profile));
      setAddingChild(false);
    } else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked (private mode): progress lasts for this visit only.
  }
  queueMicrotask(() => window.dispatchEvent(new Event(notify)));
}

/** Fired when the saved copy arrives from the account, so pages update without saving it straight back. */
const PROFILE_LOADED = "my247tutor-profile-loaded";

/** Replaces this browser's children with the ones from the parent's account, keeping the same child on screen if possible. */
export function replaceAllProfiles(profiles: LearnerProfile[]) {
  const current = readStoredProfile()?.id;
  const keepEmpty = !current && addingChild() && profiles.length < MAX_CHILDREN;
  const active = keepEmpty ? null : (profiles.find((p) => p.id === current) ?? profiles[0] ?? null);
  writeOthers(profiles.filter((p) => p !== active));
  write(active, PROFILE_LOADED);
}

/** Puts another child on screen. A full page load, so every page starts fresh for them. */
export function switchChild(id: string) {
  const all = readAllProfiles();
  const next = all.find((p) => p.id === id);
  if (!next) return;
  writeOthers(all.filter((p) => p !== next));
  // Nothing about the child changed, so nothing is saved: the account's copy may be newer (they may have practised on their own sign-in).
  write(next, PROFILE_LOADED);
  setAddingChild(false);
  window.location.assign(window.location.pathname.startsWith("/parent") ? "/parent" : "/learn");
}

/** Makes room to set up another child (up to three), then goes to the set-up page. */
export function addChild(): boolean {
  const all = readAllProfiles();
  if (all.length >= MAX_CHILDREN) return false;
  writeOthers(all);
  setAddingChild(true);
  write(null);
  window.location.assign("/learn");
  return true;
}

/** Deletes the child on screen; the next one, if any, takes their place. */
export function removeCurrentChild() {
  const others = readOtherProfiles();
  writeOthers(others.slice(1));
  write(others[0] ?? null);
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

/** Every child in this browser, oldest first so the order stays put when switching, kept up to date as they change. */
export function useChildren() {
  const [children, setChildren] = useState<LearnerProfile[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => {
      setChildren(readAllProfiles().sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0)));
      setCurrent(readStoredProfile()?.id ?? null);
    };
    sync();
    window.addEventListener(PROFILE_CHANGED, sync);
    window.addEventListener(PROFILE_LOADED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROFILE_CHANGED, sync);
      window.removeEventListener(PROFILE_LOADED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return { children, current, canAdd: children.length < MAX_CHILDREN };
}
