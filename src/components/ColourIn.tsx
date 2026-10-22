"use client";

import { useState } from "react";
import { PICTURE_HEIGHT, PICTURE_WIDTH, type Region } from "@/lib/phonics/pictures";

const PALETTE = [
  { name: "red", value: "#e5484d" },
  { name: "orange", value: "#f76b15" },
  { name: "yellow", value: "#ffd23f" },
  { name: "green", value: "#46a758" },
  { name: "blue", value: "#3e90f0" },
  { name: "purple", value: "#8e4ec6" },
  { name: "pink", value: "#f28bb8" },
  { name: "brown", value: "#a0703c" },
  { name: "grey", value: "#9aa1a6" },
  { name: "black", value: "#2b2b2b" },
  { name: "white", value: "#ffffff" },
];

/** A line drawing to colour in: pick a colour, then tap a part of the picture to fill it. */
export function ColourIn({ regions, title }: { regions: Region[]; title: string }) {
  const [colour, setColour] = useState(PALETTE[2].value);
  const [fills, setFills] = useState<Record<string, string>>({});

  return (
    <div className="stack colour-in" style={{ gap: 10 }}>
      <div className="palette" role="radiogroup" aria-label="Colours">
        {PALETTE.map((c) => (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={colour === c.value}
            aria-label={c.name}
            className={`swatch${colour === c.value ? " picked" : ""}`}
            style={{ background: c.value }}
            onClick={() => setColour(c.value)}
          />
        ))}
      </div>
      <svg
        viewBox={`0 0 ${PICTURE_WIDTH} ${PICTURE_HEIGHT}`}
        className="colour-picture"
        role="img"
        aria-label={`A picture of ${title} to colour in`}
      >
        {regions.map((r) => {
          const fill = r.fixed === "ink" ? "#222" : r.fixed === "line" ? "none" : (fills[r.id] ?? "#fff");
          const props = {
            fill,
            stroke: "#222",
            strokeWidth: r.fixed ? 1.5 : 2,
            strokeLinejoin: "round" as const,
            "data-region": r.id,
            onClick: r.fixed ? undefined : () => setFills((f) => ({ ...f, [r.id]: colour })),
            style: r.fixed ? { pointerEvents: "none" as const } : { cursor: "pointer" },
          };
          const s = r.shape;
          switch (s.el) {
            case "circle":
              return <circle key={r.id} cx={s.cx} cy={s.cy} r={s.r} {...props} />;
            case "ellipse":
              return <ellipse key={r.id} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} {...props} />;
            case "rect":
              return <rect key={r.id} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx} {...props} />;
            case "polygon":
              return <polygon key={r.id} points={s.points} {...props} />;
            case "path":
              return <path key={r.id} d={s.d} {...props} />;
          }
        })}
      </svg>
      <div className="row" style={{ justifyContent: "center" }}>
        <button type="button" className="btn secondary small" onClick={() => setFills({})}>
          Start again
        </button>
      </div>
    </div>
  );
}
