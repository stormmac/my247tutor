import { skillsFor } from "../curriculum/skills";
import type { Subject } from "../curriculum/types";
import type { LearnerProfile } from "./model";
import { skillState } from "./model";

/**
 * Placement check: a short binary search over the subject's auto-marked skills,
 * ordered from easiest to hardest. One question per probe, at most MAX_PROBES probes.
 * Everything at or below the highest passed probe is marked as placed-mastered.
 */
export const MAX_PROBES = 5;

export interface PlacementState {
  subject: Subject;
  order: string[];
  lo: number;
  hi: number;
  /** Highest index answered correctly, or -1. */
  passed: number;
  probes: { skillId: string; correct: boolean }[];
}

export function startPlacement(subject: Subject): PlacementState {
  const order = skillsFor(subject)
    .filter((s) => s.practice !== "writing")
    .sort((a, b) => a.stage - b.stage)
    .map((s) => s.id);
  return { subject, order, lo: 0, hi: order.length - 1, passed: -1, probes: [] };
}

export function placementDone(state: PlacementState): boolean {
  return state.lo > state.hi || state.probes.length >= MAX_PROBES;
}

export function nextProbe(state: PlacementState): string | null {
  if (placementDone(state)) return null;
  return state.order[Math.floor((state.lo + state.hi) / 2)];
}

export function recordProbe(state: PlacementState, correct: boolean): PlacementState {
  const mid = Math.floor((state.lo + state.hi) / 2);
  const probes = [...state.probes, { skillId: state.order[mid], correct }];
  return correct ? { ...state, probes, lo: mid + 1, passed: Math.max(state.passed, mid) } : { ...state, probes, hi: mid - 1 };
}

/** Placed skills are checked again a few days later, in case the placement was lucky. */
const PLACEMENT_REVIEW_DAYS = 3;

export function applyPlacement(profile: LearnerProfile, state: PlacementState, now = Date.now()): LearnerProfile {
  const skills = { ...profile.skills };
  state.order.forEach((id, i) => {
    if (i <= state.passed && !skillState(profile, id).mastered) {
      skills[id] = {
        ...skillState(profile, id),
        mastery: 0.85,
        mastered: true,
        placed: true,
        reviewIntervalDays: PLACEMENT_REVIEW_DAYS,
        nextReview: now + PLACEMENT_REVIEW_DAYS * 86_400_000,
      };
    }
  });
  return { ...profile, skills, placementDone: { ...profile.placementDone, [state.subject]: true } };
}
