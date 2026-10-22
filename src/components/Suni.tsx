/**
 * Suni, the robot bumble bee tutor, cut out of the character video: a glossy yellow head with big
 * cartoon eyes, chrome ear discs, a striped body with a glowing band and badge, chrome robot arms
 * and glowing see-through wings. The animation is the real footage of Suni hovering with wings
 * flapping; a still frame is shown to anyone who prefers reduced motion.
 */
/** What Suni does to celebrate a right answer. */
export type SuniPose = "thumbsUp" | "highFive";

/** Height over width of the Suni footage. */
const RATIO = 1;

export function Suni({
  size = 120,
  animated = true,
  wave = false,
  pose = null,
}: {
  size?: number;
  animated?: boolean;
  wave?: boolean;
  pose?: SuniPose | null;
}) {
  const height = Math.round(size * RATIO);
  return (
    <span
      className={`suni ${animated ? "suni-animated" : ""} ${wave && !pose ? "suni-waving" : ""}`}
      role="img"
      aria-label="Suni, a friendly robot bumble bee"
      data-pose={pose ?? undefined}
      style={{ width: size, height }}
    >
      <picture className="suni-hover">
        {animated && <source srcSet="/suni/still.webp" media="(prefers-reduced-motion: reduce)" />}
        <img src={animated ? "/suni/hover.webp" : "/suni/still.webp"} alt="" width={size} height={height} draggable={false} />
      </picture>
      {pose && (
        <span className={`suni-cheer suni-pose-${pose}`} aria-hidden>
          {pose === "thumbsUp" ? "👍" : "✋"}
        </span>
      )}
    </span>
  );
}
