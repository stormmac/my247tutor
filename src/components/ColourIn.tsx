"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

/**
 * A line drawing to colour in: pick a colour, then tap a part of the picture to fill it.
 * The finished picture can be printed with its story underneath.
 */
export function ColourIn({ regions, title, sentences }: { regions: Region[]; title: string; sentences: string[] }) {
  const [colour, setColour] = useState(PALETTE[2].value);
  const [fills, setFills] = useState<Record<string, string>>({});
  // The printed page is drawn straight into <body>, so printing can hide everything else.
  const [body, setBody] = useState<HTMLElement | null>(null);
  useEffect(() => setBody(document.body), []);

  function print() {
    document.body.classList.add("printing-picture");
    const done = () => {
      document.body.classList.remove("printing-picture");
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    window.print();
  }

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
      <Drawing regions={regions} fills={fills} title={title} onFill={(id) => setFills((f) => ({ ...f, [id]: colour }))} />
      <div className="row" style={{ justifyContent: "center" }}>
        <button type="button" className="btn secondary small" onClick={() => setFills({})}>
          Start again
        </button>
        <button type="button" className="btn secondary small" onClick={print}>
          🖨️ Print my picture
        </button>
      </div>
      {body &&
        createPortal(
          <div className="print-sheet">
            <h1>{title}</h1>
            <Drawing regions={regions} fills={fills} title={title} />
            <div className="print-story">
              {sentences.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>,
          body,
        )}
    </div>
  );
}

/** The picture with its colours; parts can be tapped when onFill is given. */
function Drawing({
  regions,
  fills,
  title,
  onFill,
}: {
  regions: Region[];
  fills: Record<string, string>;
  title: string;
  onFill?: (id: string) => void;
}) {
  return (
    <svg
      viewBox={`0 0 ${PICTURE_WIDTH} ${PICTURE_HEIGHT}`}
      className="colour-picture"
      role="img"
      aria-label={onFill ? `A picture of ${title} to colour in` : `A picture of ${title}`}
    >
      {regions.map((r) => {
        const fill = r.fixed === "ink" ? "#222" : r.fixed === "line" ? "none" : (fills[r.id] ?? "#fff");
        const tappable = onFill && !r.fixed;
        const props = {
          fill,
          stroke: "#222",
          strokeWidth: r.fixed ? 1.5 : 2,
          strokeLinejoin: "round" as const,
          ...(onFill ? { "data-region": r.id } : {}),
          onClick: tappable ? () => onFill(r.id) : undefined,
          style: tappable ? { cursor: "pointer" } : { pointerEvents: "none" as const },
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
  );
}
