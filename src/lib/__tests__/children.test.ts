import { beforeEach, describe, expect, it, vi } from "vitest";
import { addChild, readAllProfiles, readStoredProfile, removeCurrentChild, replaceAllProfiles, switchChild } from "@/components/useProfile";
import { MAX_CHILDREN, newProfile } from "@/lib/learner/model";

const store = new Map<string, string>();
const assign = vi.fn();

beforeEach(() => {
  store.clear();
  assign.mockClear();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
  vi.stubGlobal("window", { location: { pathname: "/parent", assign }, dispatchEvent: () => true });
});

const names = () => readAllProfiles().map((p) => p.name);

describe("several children in one browser", () => {
  const mia = newProfile("Mia", 5);
  const tom = newProfile("Tom", 3);
  const ava = newProfile("Ava", 6);

  it("gives every new child their own id", () => {
    expect(mia.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(mia.id).not.toBe(tom.id);
  });

  it("keeps the same child on screen when the account's copy arrives", () => {
    replaceAllProfiles([mia, tom]);
    switchChild(tom.id!);
    replaceAllProfiles([mia, tom, ava]);
    expect(readStoredProfile()?.name).toBe("Tom");
    expect(names()).toEqual(["Tom", "Mia", "Ava"]);
  });

  it("switches child and reloads the page they were on", () => {
    replaceAllProfiles([mia, tom]);
    switchChild(tom.id!);
    expect(readStoredProfile()?.name).toBe("Tom");
    expect(names()).toEqual(["Tom", "Mia"]);
    expect(assign).toHaveBeenCalledWith("/parent");
  });

  it(`adds up to ${MAX_CHILDREN} children and no more`, () => {
    replaceAllProfiles([mia, tom]);
    expect(addChild()).toBe(true);
    expect(readStoredProfile()).toBeNull();
    expect(assign).toHaveBeenCalledWith("/learn");
    // Loading the account while the new child is being set up leaves the set-up page alone.
    replaceAllProfiles([mia, tom]);
    expect(readStoredProfile()).toBeNull();
    expect(names()).toEqual(["Mia", "Tom"]);
    replaceAllProfiles([ava, mia, tom]);
    // Ava has now been saved from another device: there's no room, so the account's first child shows.
    expect(readStoredProfile()?.name).toBe("Ava");
    expect(addChild()).toBe(false);
  });

  it("puts the next child on screen when one is deleted", () => {
    replaceAllProfiles([mia, tom, ava]);
    removeCurrentChild();
    expect(names()).toEqual(["Tom", "Ava"]);
    removeCurrentChild();
    removeCurrentChild();
    expect(names()).toEqual([]);
  });
});
