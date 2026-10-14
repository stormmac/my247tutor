import { useId } from "react";

/**
 * Suni, the robot bumble bee tutor, drawn to match the character video: a round glossy yellow
 * head sitting on a bigger striped body, small shiny eyes, chrome ear discs, jointed chrome
 * arms and legs, a glowing name badge and band, and big glassy wings with circuit lines.
 * Drawn in SVG so it stays sharp at any size; it hovers, flutters and waves unless the viewer
 * prefers reduced motion.
 */
export function Suni({ size = 120, animated = true, wave = false }: { size?: number; animated?: boolean; wave?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `suni-${uid}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;

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
        <radialGradient id={id("yellow")} cx="36%" cy="28%" r="80%">
          <stop offset="0" stopColor="#FFF6A8" />
          <stop offset="0.35" stopColor="#FFE135" />
          <stop offset="0.8" stopColor="#F5BE0B" />
          <stop offset="1" stopColor="#D99A00" />
        </radialGradient>
        <radialGradient id={id("stripe")} cx="40%" cy="20%" r="90%">
          <stop offset="0" stopColor="#5A4636" />
          <stop offset="1" stopColor="#2B211B" />
        </radialGradient>
        <linearGradient id={id("chrome")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBFCFD" />
          <stop offset="0.45" stopColor="#B8C0C7" />
          <stop offset="0.7" stopColor="#E6EAED" />
          <stop offset="1" stopColor="#6B747C" />
        </linearGradient>
        <radialGradient id={id("joint")} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#B4BCC3" />
          <stop offset="1" stopColor="#59626A" />
        </radialGradient>
        <radialGradient id={id("wing")} cx="45%" cy="55%" r="75%">
          <stop offset="0" stopColor="#FFFDF0" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#FFF6D6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E9F6FF" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id={id("eye")} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#3A3A40" />
          <stop offset="1" stopColor="#0E0E12" />
        </radialGradient>
        <radialGradient id={id("badge")} cx="50%" cy="50%" r="65%">
          <stop offset="0" stopColor="#FFFDE8" />
          <stop offset="1" stopColor="#FFE680" />
        </radialGradient>
        <filter id={id("glow")} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={id("body")}>
          <ellipse cx="100" cy="152" rx="47" ry="50" />
        </clipPath>
      </defs>

      <g className="suni-hover">
        {/* Wings: big glassy upper wings and smaller lower ones, with glowing circuit lines */}
        <g className="suni-wing suni-wing-left" filter={url("glow")}>
          <path
            d="M70 118 C40 112 6 86 10 58 C14 34 46 40 62 64 C72 80 76 102 70 118 Z"
            fill={url("wing")}
            stroke="#FFF2B8"
            strokeWidth="1.6"
          />
          <path
            d="M22 60 L34 66 L32 80 L44 88 L56 82 L58 96 M34 66 L46 58 L56 68 L56 82 M44 88 L42 102 L56 110"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.85"
            strokeWidth="1.1"
          />
          <path d="M70 128 C46 140 22 136 20 122 C18 108 46 110 70 124 Z" fill={url("wing")} stroke="#FFF2B8" strokeWidth="1.3" />
          <path d="M30 122 L42 126 L52 120 M42 126 L50 132" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1" />
        </g>
        <g className="suni-wing suni-wing-right" filter={url("glow")}>
          <path
            d="M130 118 C160 112 194 86 190 58 C186 34 154 40 138 64 C128 80 124 102 130 118 Z"
            fill={url("wing")}
            stroke="#FFF2B8"
            strokeWidth="1.6"
          />
          <path
            d="M178 60 L166 66 L168 80 L156 88 L144 82 L142 96 M166 66 L154 58 L144 68 L144 82 M156 88 L158 102 L144 110"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.85"
            strokeWidth="1.1"
          />
          <path d="M130 128 C154 140 178 136 180 122 C182 108 154 110 130 124 Z" fill={url("wing")} stroke="#FFF2B8" strokeWidth="1.3" />
          <path d="M170 122 L158 126 L148 120 M158 126 L150 132" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1" />
        </g>

        {/* Legs: short chrome robot legs with round joints */}
        <g>
          <rect x="74" y="194" width="14" height="14" rx="5" fill={url("chrome")} />
          <rect x="112" y="194" width="14" height="14" rx="5" fill={url("chrome")} />
          <ellipse cx="81" cy="211" rx="10" ry="5" fill="#5C656E" />
          <ellipse cx="119" cy="211" rx="10" ry="5" fill="#5C656E" />
          <circle cx="81" cy="196" r="4" fill={url("joint")} />
          <circle cx="119" cy="196" r="4" fill={url("joint")} />
        </g>

        {/* Left arm, reaching out: upper arm, elbow, forearm and a jointed hand */}
        <g strokeLinecap="round" fill="none">
          <path d="M58 128 L40 140" stroke={url("chrome")} strokeWidth="9" />
          <path d="M40 140 L30 160" stroke={url("chrome")} strokeWidth="8" />
          <path d="M30 160 l-7 5 M30 160 l-2 9 M30 160 l4 8 M30 160 l8 3" stroke="#59626A" strokeWidth="3.2" />
        </g>
        <circle cx="40" cy="140" r="5" fill={url("joint")} />
        <circle cx="30" cy="160" r="4" fill="#4A5259" />

        {/* Right arm, waving */}
        <g className="suni-arm-right">
          <g strokeLinecap="round" fill="none">
            <path d="M142 128 L162 118" stroke={url("chrome")} strokeWidth="9" />
            <path d="M162 118 L172 98" stroke={url("chrome")} strokeWidth="8" />
            <path d="M172 98 l-8 -4 M172 98 l-2 -9 M172 98 l5 -8 M172 98 l9 -2" stroke="#59626A" strokeWidth="3.2" />
          </g>
          <circle cx="162" cy="118" r="5" fill={url("joint")} />
          <circle cx="172" cy="98" r="4" fill="#4A5259" />
        </g>

        {/* Body: a big glossy egg with two broad stripes */}
        <ellipse cx="100" cy="152" rx="47" ry="50" fill={url("yellow")} />
        <g clipPath={url("body")}>
          <path d="M50 158 Q100 170 150 158 L150 174 Q100 186 50 174 Z" fill={url("stripe")} />
          <path d="M50 184 Q100 196 150 184 L150 200 Q100 212 50 200 Z" fill={url("stripe")} />
        </g>
        <ellipse cx="80" cy="124" rx="12" ry="7" fill="#FFFFFF" opacity="0.35" transform="rotate(-25 80 124)" />
        {/* Glowing band around the middle */}
        <path d="M58 146 Q100 158 142 146" fill="none" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="2" filter={url("glow")} />
        {/* Name badge */}
        <rect x="104" y="118" width="30" height="16" rx="6" fill={url("badge")} filter={url("glow")} />
        <text x="119" y="129.5" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#8A6200" fontFamily="system-ui, sans-serif">
          Suni
        </text>

        {/* Shoulder joints */}
        <circle cx="58" cy="128" r="8" fill={url("joint")} />
        <circle cx="142" cy="128" r="8" fill={url("joint")} />

        {/* Collar where the head sits on the body */}
        <ellipse cx="100" cy="104" rx="26" ry="6" fill="#2E2A26" />

        {/* Antennae: thin, nearly straight, with round tips */}
        <g fill="none" stroke="var(--suni-antenna, #1E1A17)" strokeWidth="2.4" strokeLinecap="round">
          <path d="M88 30 C86 22 82 14 76 8" />
          <path d="M112 30 C114 22 118 14 124 8" />
        </g>
        <circle cx="75" cy="7" r="5" fill="var(--suni-antenna, #1E1A17)" />
        <circle cx="125" cy="7" r="5" fill="var(--suni-antenna, #1E1A17)" />

        {/* Head */}
        <ellipse cx="100" cy="66" rx="44" ry="40" fill={url("yellow")} />
        <ellipse cx="84" cy="40" rx="14" ry="7" fill="#FFFFFF" opacity="0.5" transform="rotate(-22 84 40)" />

        {/* Chrome ear discs */}
        <circle cx="57" cy="70" r="10" fill={url("chrome")} />
        <circle cx="57" cy="70" r="6" fill="#DCE1E5" stroke="#5F6870" strokeWidth="2" />
        <circle cx="143" cy="70" r="10" fill={url("chrome")} />
        <circle cx="143" cy="70" r="6" fill="#DCE1E5" stroke="#5F6870" strokeWidth="2" />

        {/* Face: small glossy eyes, rosy cheeks and a little smile */}
        <g className="suni-eyes">
          <circle cx="84" cy="65" r="10" fill={url("eye")} stroke="#FFFFFF" strokeWidth="1.6" />
          <circle cx="116" cy="65" r="10" fill={url("eye")} stroke="#FFFFFF" strokeWidth="1.6" />
          <circle cx="87.5" cy="61" r="3" fill="#FFFFFF" />
          <circle cx="119.5" cy="61" r="3" fill="#FFFFFF" />
          <circle cx="80.5" cy="69.5" r="1.3" fill="#FFFFFF" opacity="0.7" />
          <circle cx="112.5" cy="69.5" r="1.3" fill="#FFFFFF" opacity="0.7" />
        </g>
        <ellipse cx="72" cy="80" rx="6" ry="3.5" fill="#FF9E7A" opacity="0.4" />
        <ellipse cx="128" cy="80" rx="6" ry="3.5" fill="#FF9E7A" opacity="0.4" />
        <path d="M93 82 Q100 88 107 82" fill="none" stroke="#2A2522" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
