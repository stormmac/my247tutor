import type { SuniPose } from "@/components/Suni";

/** The event Suni listens for to celebrate a right answer. */
export const CELEBRATE_EVENT = "suni-celebrate";

let next = 0;

/** After a right answer, Suni gives a thumbs up or a high five, taking turns. */
export function celebrate() {
  if (typeof window === "undefined") return;
  const pose: SuniPose = next++ % 2 ? "highFive" : "thumbsUp";
  window.dispatchEvent(new CustomEvent<SuniPose>(CELEBRATE_EVENT, { detail: pose }));
}
