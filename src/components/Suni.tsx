import { useId } from "react";

/**
 * Suni, the robot bumble bee tutor: glossy yellow head, big shiny eyes, chrome arms and
 * glowing see-through wings. Drawn in SVG so it stays sharp at any size; it hovers, flutters
 * and waves unless the viewer prefers reduced motion.
 */
export function Suni({ size = 120, animated = true, wave = false }: { size?: number; animated?: boolean; wave?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `suni-${uid}-${name}`;

  return (
    <svg
      className={`suni ${animated ? "suni-animated" : ""} ${wave ? "suni-waving" : ""}`}
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      role="img"
      aria-label="Suni, a friendly robot bumble bee"
    >
      <defs>
        <radialGradient id={id("yellow")} cx="38%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFF27A" />
          <stop offset="0.55" stopColor="#FFD21F" />
          <stop offset="1" stopColor="#E9A400" />
        </radialGradient>
        <linearGradient id={id("chrome")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F6F8" />
          <stop offset="0.5" stopColor="#A9B2BA" />
          <stop offset="1" stopColor="#6E7882" />
        </linearGradient>
        <radialGradient id={id("wing")} cx="40%" cy="40%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#DDF3FF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#B9E6FF" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id={id("badge")} cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#FFFBD6" />
          <stop offset="1" stopColor="#FFE77A" />
        </radialGradient>
        <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={id("body")}>
          <ellipse cx="100" cy="166" rx="40" ry="40" />
        </clipPath>
      </defs>

      <g className="suni-hover">
        {/* Wings, behind the body */}
        <g transform="translate(-14 -22) scale(1.18)">
          <g className="suni-wing suni-wing-left" filter={`url(#${id("glow")})`}>
            <path d="M70 128 C30 120 8 92 18 72 C30 52 62 70 80 118 Z" fill={`url(#${id("wing")})`} stroke="#BEEBFF" strokeWidth="1.5" />
            <path
              d="M28 76 L44 86 L40 102 M44 86 L60 84 L68 104 M60 84 L58 70"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.8"
              strokeWidth="1.2"
            />
            <path
              d="M72 140 C44 150 26 140 28 126 C30 112 54 116 76 132 Z"
              fill={`url(#${id("wing")})`}
              stroke="#BEEBFF"
              strokeWidth="1.2"
            />
          </g>
        </g>
        <g transform="translate(-21.6 -22) scale(1.18)">
          <g className="suni-wing suni-wing-right" filter={`url(#${id("glow")})`}>
            <path
              d="M130 128 C170 120 192 92 182 72 C170 52 138 70 120 118 Z"
              fill={`url(#${id("wing")})`}
              stroke="#BEEBFF"
              strokeWidth="1.5"
            />
            <path
              d="M172 76 L156 86 L160 102 M156 86 L140 84 L132 104 M140 84 L142 70"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.8"
              strokeWidth="1.2"
            />
            <path
              d="M128 140 C156 150 174 140 172 126 C170 112 146 116 124 132 Z"
              fill={`url(#${id("wing")})`}
              stroke="#BEEBFF"
              strokeWidth="1.2"
            />
          </g>
        </g>

        {/* Legs */}
        <g stroke={`url(#${id("chrome")})`} strokeWidth="7" strokeLinecap="round" fill="none">
          <path d="M86 202 L82 214" />
          <path d="M114 202 L118 214" />
        </g>

        {/* Left arm, reaching out */}
        <g stroke={`url(#${id("chrome")})`} strokeLinecap="round" fill="none">
          <path d="M64 150 L44 160 L32 178" strokeWidth="8" />
          <path d="M32 178 l-6 6 M32 178 l0 9 M32 178 l6 6" strokeWidth="3.5" stroke="#6E7882" />
        </g>
        <circle cx="64" cy="150" r="7" fill={`url(#${id("chrome")})`} />
        <circle cx="44" cy="160" r="4.5" fill="#5C656E" />

        {/* Right arm, waving */}
        <g className="suni-arm-right">
          <g stroke={`url(#${id("chrome")})`} strokeLinecap="round" fill="none">
            <path d="M136 150 L158 140 L170 120" strokeWidth="8" />
            <path d="M170 120 l-7 -5 M170 120 l1 -9 M170 120 l8 -4" strokeWidth="3.5" stroke="#6E7882" />
          </g>
          <circle cx="158" cy="140" r="4.5" fill="#5C656E" />
        </g>
        <circle cx="136" cy="150" r="7" fill={`url(#${id("chrome")})`} />

        {/* Body with stripes */}
        <ellipse cx="100" cy="166" rx="40" ry="40" fill={`url(#${id("yellow")})`} />
        <g clipPath={`url(#${id("body")})`} fill="#2A2522">
          <rect x="50" y="170" width="100" height="10" />
          <rect x="50" y="188" width="100" height="10" />
        </g>
        <path
          d="M64 140 Q100 150 136 140"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.85"
          strokeWidth="2"
          filter={`url(#${id("glow")})`}
        />
        <rect x="84" y="148" width="32" height="15" rx="7" fill={`url(#${id("badge")})`} filter={`url(#${id("glow")})`} />
        <text x="100" y="159" textAnchor="middle" fontSize="10" fontWeight="800" fill="#8A6200" fontFamily="system-ui, sans-serif">
          Suni
        </text>

        {/* Neck */}
        <rect x="82" y="118" width="36" height="10" rx="5" fill="#3A3F45" />

        {/* Antennae */}
        <g fill="none" stroke="var(--suni-antenna, #2A2522)" strokeWidth="3" strokeLinecap="round">
          <path d="M86 36 C82 24 76 16 68 12" />
          <path d="M114 36 C118 24 124 16 132 12" />
        </g>
        <circle cx="67" cy="11" r="6" fill="var(--suni-antenna, #2A2522)" />
        <circle cx="133" cy="11" r="6" fill="var(--suni-antenna, #2A2522)" />

        {/* Head */}
        <circle cx="100" cy="78" r="46" fill={`url(#${id("yellow")})`} />
        <ellipse cx="82" cy="50" rx="16" ry="8" fill="#FFFFFF" opacity="0.45" transform="rotate(-20 82 50)" />

        {/* Silver ear discs */}
        <circle cx="54" cy="82" r="10" fill={`url(#${id("chrome")})`} />
        <circle cx="54" cy="82" r="5" fill="#E6EAED" stroke="#7D8790" strokeWidth="1.5" />
        <circle cx="146" cy="82" r="10" fill={`url(#${id("chrome")})`} />
        <circle cx="146" cy="82" r="5" fill="#E6EAED" stroke="#7D8790" strokeWidth="1.5" />

        {/* Face */}
        <g className="suni-eyes">
          <ellipse cx="82" cy="78" rx="11" ry="13" fill="#1B1A1A" />
          <ellipse cx="118" cy="78" rx="11" ry="13" fill="#1B1A1A" />
          <circle cx="86" cy="72" r="4" fill="#FFFFFF" />
          <circle cx="122" cy="72" r="4" fill="#FFFFFF" />
          <circle cx="79" cy="84" r="1.8" fill="#FFFFFF" opacity="0.8" />
          <circle cx="115" cy="84" r="1.8" fill="#FFFFFF" opacity="0.8" />
        </g>
        <ellipse cx="68" cy="96" rx="7" ry="4" fill="#FF9E7A" opacity="0.45" />
        <ellipse cx="132" cy="96" rx="7" ry="4" fill="#FF9E7A" opacity="0.45" />
        <path d="M90 100 Q100 109 110 100" fill="none" stroke="#2A2522" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
