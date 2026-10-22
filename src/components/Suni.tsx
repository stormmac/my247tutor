"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useState } from "react";

/**
 * Suni, the robot bumble bee tutor, drawn to match the character art: a big glossy orange head
 * with large black eyes and a small smile, thin antennae with ball tips, chrome ear discs, a round
 * golden body with two dark stripes, gunmetal robot arms with claw hands, short legs with dark
 * boots, and long amber see-through wings. Drawn in SVG so it stays sharp at any size; it hovers
 * up and down while its wings flap, and can give a thumbs up or a high five.
 */
/** What Suni does with the right arm to celebrate a right answer. */
export type SuniPose = "thumbsUp" | "highFive";

interface SuniProps {
  size?: number;
  animated?: boolean;
  wave?: boolean;
  pose?: SuniPose | null;
}

// The 3D model needs WebGL and three.js, so it loads in the browser after the drawing shows.
const Suni3D = dynamic(() => import("@/components/Suni3D"), { ssr: false });

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Suni as a 3D model where the browser can draw one, and as the drawing until it is ready or
 * where it can't.
 */
export function Suni({ size = 120, animated = true, wave = false, pose = null }: SuniProps) {
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setWebgl(canUseWebGL()), []);

  return (
    <span
      className="suni-holder"
      data-pose={pose ?? undefined}
      data-render={ready ? "3d" : "drawing"}
      role="img"
      aria-label="Suni, a friendly robot bumble bee"
      style={{ width: size, height: Math.round(size * 1.1) }}
    >
      {!ready && <SuniDrawing size={size} animated={animated} wave={wave} pose={pose} />}
      {webgl && <Suni3D size={size} animated={animated} wave={wave} pose={pose ?? null} onReady={() => setReady(true)} />}
    </span>
  );
}

function SuniDrawing({ size = 120, animated = true, wave = false, pose = null }: SuniProps) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `suni-${uid}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;

  const wing = (side: "left" | "right") => {
    // Drawn for the left; the right is its mirror image.
    const flip = side === "right" ? "translate(200 0) scale(-1 1)" : undefined;
    return (
      <g className={`suni-wing suni-wing-${side}`}>
        <g transform={flip}>
          {/* Fore wing: long and narrow, swept up and out from the shoulder */}
          <path
            d="M84 126 C66 110 30 84 10 56 C2 44 8 32 22 36 C44 44 72 86 88 118 Z"
            fill={url("wing")}
            stroke={url("wingEdge")}
            strokeWidth="1.6"
          />
          <path
            d="M84 120 C64 98 36 70 18 46 M68 104 C54 92 36 84 24 70 M54 88 C48 74 42 60 36 46"
            fill="none"
            stroke="#B9822F"
            strokeOpacity="0.55"
            strokeWidth="0.9"
          />
          {/* Hind wing: smaller, below */}
          <path
            d="M84 130 C66 132 36 126 20 112 C12 104 18 96 30 98 C50 102 74 116 88 126 Z"
            fill={url("wing")}
            stroke={url("wingEdge")}
            strokeWidth="1.3"
          />
          <path d="M84 128 C64 124 42 114 26 104" fill="none" stroke="#B9822F" strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
      </g>
    );
  };

  return (
    <svg
      className={`suni ${animated ? "suni-animated" : ""} ${wave && !pose ? "suni-waving" : ""}`}
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      aria-hidden
    >
      <defs>
        <radialGradient id={id("head")} cx="38%" cy="30%" r="78%">
          <stop offset="0" stopColor="#FFD46B" />
          <stop offset="0.4" stopColor="#F9A928" />
          <stop offset="0.85" stopColor="#E0820E" />
          <stop offset="1" stopColor="#B9650A" />
        </radialGradient>
        <radialGradient id={id("body")} cx="38%" cy="25%" r="85%">
          <stop offset="0" stopColor="#FFE07A" />
          <stop offset="0.45" stopColor="#F6B530" />
          <stop offset="0.9" stopColor="#D88812" />
          <stop offset="1" stopColor="#B06A0A" />
        </radialGradient>
        <radialGradient id={id("stripe")} cx="40%" cy="20%" r="90%">
          <stop offset="0" stopColor="#4A3A2E" />
          <stop offset="1" stopColor="#1F1814" />
        </radialGradient>
        <linearGradient id={id("metal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9AA1A8" />
          <stop offset="0.5" stopColor="#4D545B" />
          <stop offset="1" stopColor="#2A2F34" />
        </linearGradient>
        <linearGradient id={id("chrome")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBFCFD" />
          <stop offset="0.45" stopColor="#B8C0C7" />
          <stop offset="0.7" stopColor="#E6EAED" />
          <stop offset="1" stopColor="#6B747C" />
        </linearGradient>
        <radialGradient id={id("joint")} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#D5DADE" />
          <stop offset="0.55" stopColor="#6B737A" />
          <stop offset="1" stopColor="#30363B" />
        </radialGradient>
        <linearGradient id={id("wing")} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#F7D08A" stopOpacity="0.75" />
          <stop offset="0.6" stopColor="#FBE7C0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FFF6E6" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={id("wingEdge")} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#C88A33" />
          <stop offset="1" stopColor="#E4B46A" />
        </linearGradient>
        <radialGradient id={id("eye")} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#2C2C30" />
          <stop offset="1" stopColor="#050506" />
        </radialGradient>
        <clipPath id={id("bodyClip")}>
          <ellipse cx="100" cy="160" rx="40" ry="42" />
        </clipPath>
      </defs>

      <g className="suni-hover">
        {wing("left")}
        {wing("right")}

        {/* Legs: short metal legs with dark boots */}
        <rect x="80" y="192" width="11" height="13" rx="4" fill={url("chrome")} />
        <rect x="109" y="192" width="11" height="13" rx="4" fill={url("chrome")} />
        <path d="M76 206 Q76 200 85 200 Q94 200 95 206 Q95 212 85 212 Q76 212 76 206 Z" fill="#2B2E32" />
        <path d="M105 206 Q105 200 114 200 Q123 200 124 206 Q124 212 114 212 Q105 212 105 206 Z" fill="#2B2E32" />

        {/* Left arm, reaching out: upper arm, elbow, forearm and a claw hand */}
        <g strokeLinecap="round" fill="none">
          <path d="M66 140 L46 150" stroke={url("metal")} strokeWidth="8" />
          <path d="M46 150 L30 158" stroke={url("metal")} strokeWidth="7" />
          <path
            d="M30 158 C22 156 18 160 16 166 M30 158 C24 162 22 168 23 173 M30 158 C30 164 32 168 35 170"
            stroke="#2A2F34"
            strokeWidth="2.6"
          />
        </g>
        <circle cx="46" cy="150" r="4.5" fill={url("joint")} />
        <circle cx="30" cy="158" r="4" fill="#3A4046" />

        {/* Right arm: waving, a thumbs up, or up for a high five */}
        <g className={`suni-arm-right suni-pose-${pose ?? "wave"}`}>
          {pose === "thumbsUp" ? (
            <>
              <g strokeLinecap="round" fill="none">
                <path d="M134 140 L156 138" stroke={url("metal")} strokeWidth="8" />
                <path d="M156 138 L160 116" stroke={url("metal")} strokeWidth="7" />
              </g>
              <circle cx="156" cy="138" r="4.5" fill={url("joint")} />
              {/* A fist with the thumb up */}
              <rect x="146" y="94" width="30" height="25" rx="9" fill={url("metal")} stroke="#B8C0C7" strokeWidth="1.2" />
              <path d="M150 102 H172 M150 108 H172 M150 114 H172" stroke="#22272B" strokeWidth="1.6" strokeLinecap="round" />
              <rect x="148" y="66" width="12" height="32" rx="6" fill={url("metal")} stroke="#B8C0C7" strokeWidth="1.2" />
            </>
          ) : pose === "highFive" ? (
            <>
              <g strokeLinecap="round" fill="none">
                <path d="M134 140 L152 124" stroke={url("metal")} strokeWidth="8" />
                <path d="M152 124 L160 102" stroke={url("metal")} strokeWidth="7" />
              </g>
              <circle cx="152" cy="124" r="4.5" fill={url("joint")} />
              {/* An open hand, palm out */}
              <g className="suni-palm">
                <g stroke="#3F464C" strokeWidth="8" strokeLinecap="round">
                  <path d="M150 74 L146 50" />
                  <path d="M159 72 L158 45" />
                  <path d="M168 72 L171 46" />
                  <path d="M176 76 L182 55" />
                  <path d="M148 92 L134 82" />
                </g>
                <rect x="144" y="70" width="36" height="32" rx="11" fill={url("metal")} stroke="#B8C0C7" strokeWidth="1.2" />
              </g>
            </>
          ) : (
            <>
              <g strokeLinecap="round" fill="none">
                <path d="M134 140 L152 132" stroke={url("metal")} strokeWidth="8" />
                <path d="M152 132 L164 114" stroke={url("metal")} strokeWidth="7" />
                <path
                  d="M164 114 C162 106 166 101 172 100 M164 114 C168 108 174 107 178 109 M164 114 C170 114 174 117 175 121"
                  stroke="#2A2F34"
                  strokeWidth="2.6"
                />
              </g>
              <circle cx="152" cy="132" r="4.5" fill={url("joint")} />
              <circle cx="164" cy="114" r="4" fill="#3A4046" />
            </>
          )}
        </g>

        {/* Body: a round golden body with two dark stripes */}
        <ellipse cx="100" cy="160" rx="40" ry="42" fill={url("body")} />
        <g clipPath={url("bodyClip")}>
          <path d="M56 162 Q100 174 144 162 L144 176 Q100 188 56 176 Z" fill={url("stripe")} />
          <path d="M56 186 Q100 198 144 186 L144 200 Q100 212 56 200 Z" fill={url("stripe")} />
        </g>
        <ellipse cx="84" cy="136" rx="11" ry="6" fill="#FFFFFF" opacity="0.35" transform="rotate(-25 84 136)" />
        {/* A small badge on the chest */}
        <circle cx="100" cy="144" r="7" fill="#FFE9A8" opacity="0.7" />
        <path
          d="M96 144 L99 147 L104 141"
          fill="none"
          stroke="#B9770F"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Shoulder joints */}
        <circle cx="66" cy="140" r="7" fill={url("joint")} />
        <circle cx="134" cy="140" r="7" fill={url("joint")} />

        {/* Neck */}
        <ellipse cx="100" cy="118" rx="18" ry="5" fill="#2E2A26" />

        {/* Antennae: thin, curving out, with round tips */}
        <g fill="none" stroke="var(--suni-antenna, #1E1A17)" strokeWidth="2.2" strokeLinecap="round">
          <path d="M88 42 C84 32 78 24 70 20" />
          <path d="M112 42 C116 32 122 24 130 20" />
        </g>
        <circle cx="69" cy="19" r="4.5" fill="var(--suni-antenna, #1E1A17)" />
        <circle cx="131" cy="19" r="4.5" fill="var(--suni-antenna, #1E1A17)" />

        {/* Head: big and glossy orange */}
        <ellipse cx="100" cy="80" rx="46" ry="41" fill={url("head")} />
        <ellipse cx="82" cy="54" rx="15" ry="7" fill="#FFFFFF" opacity="0.45" transform="rotate(-20 82 54)" />

        {/* Chrome ear discs */}
        <circle cx="55" cy="84" r="8" fill={url("chrome")} />
        <circle cx="55" cy="84" r="4.5" fill="#DCE1E5" stroke="#5F6870" strokeWidth="1.6" />
        <circle cx="145" cy="84" r="8" fill={url("chrome")} />
        <circle cx="145" cy="84" r="4.5" fill="#DCE1E5" stroke="#5F6870" strokeWidth="1.6" />

        {/* Face: big black eyes and a little smile */}
        <g className="suni-eyes">
          <ellipse cx="83" cy="80" rx="9" ry="11" fill={url("eye")} />
          <ellipse cx="117" cy="80" rx="9" ry="11" fill={url("eye")} />
          <circle cx="86" cy="75" r="2.6" fill="#FFFFFF" opacity="0.9" />
          <circle cx="120" cy="75" r="2.6" fill="#FFFFFF" opacity="0.9" />
        </g>
        <ellipse cx="70" cy="96" rx="6" ry="3.2" fill="#E8603A" opacity="0.28" />
        <ellipse cx="130" cy="96" rx="6" ry="3.2" fill="#E8603A" opacity="0.28" />
        <path d="M93 98 Q100 104 107 98" fill="none" stroke="#3A2414" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
