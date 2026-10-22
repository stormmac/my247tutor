"use client";

/**
 * Suni, the robot bumble bee tutor, cut out of the character video: a glossy yellow head with big
 * cartoon eyes, chrome ear discs, a striped body with a glowing band and badge, chrome robot arms
 * and glowing see-through wings. The animation is the real footage of Suni hovering with wings
 * flapping; a still frame is shown to anyone who prefers reduced motion.
 */
import { useEffect, useState } from "react";
import { SUNI_TALKING } from "@/lib/tutor/speech";

/** What Suni does to celebrate a right answer. */
export type SuniPose = "thumbsUp" | "highFive";

/** Height over width of the Suni footage. */
const RATIO = 1;

export function Suni({
  size = 120,
  animated = true,
  wave = false,
  pose = null,
  talking = false,
  word,
}: {
  size?: number;
  animated?: boolean;
  wave?: boolean;
  pose?: SuniPose | null;
  /** Suni's mouth moves, as Suni speaks. */
  talking?: boolean;
  /** Which word Suni is saying, when reading along: the mouth starts again on each one. */
  word?: number;
}) {
  const height = Math.round(size * RATIO);
  // The mouth sits on the still frame, which bobs while Suni talks; the footage's head moves too much to follow.
  const still = !animated || talking;
  return (
    <span
      className={`suni ${animated ? "suni-animated" : ""} ${wave && !pose ? "suni-waving" : ""} ${talking ? "suni-talking" : ""}`}
      role="img"
      aria-label="Suni, a friendly robot bumble bee"
      data-pose={pose ?? undefined}
      style={{ width: size, height }}
    >
      <picture className="suni-hover">
        {!still && <source srcSet="/suni/still.webp" media="(prefers-reduced-motion: reduce)" />}
        <img src={still ? "/suni/still.webp" : "/suni/hover.webp"} alt="" width={size} height={height} draggable={false} />
      </picture>
      {talking && <span key={word ?? "talk"} className="suni-mouth" aria-hidden />}
      {pose && (
        <span className={`suni-cheer suni-pose-${pose}`} aria-hidden>
          {pose === "thumbsUp" ? "👍" : "✋"}
        </span>
      )}
    </span>
  );
}

/** Whether Suni is speaking anywhere on the page right now. */
export function useSuniTalking(): boolean {
  const [talking, setTalking] = useState(false);
  useEffect(() => {
    const on = (e: Event) => setTalking(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener(SUNI_TALKING, on);
    return () => window.removeEventListener(SUNI_TALKING, on);
  }, []);
  return talking;
}
