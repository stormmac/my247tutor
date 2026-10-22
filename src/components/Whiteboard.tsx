"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Suni } from "@/components/Suni";
import { MAX_BOARD_IMAGE } from "@/lib/tutor/board";
import { TUTOR_NAME } from "@/lib/tutor/persona";

const WIDTH = 900;
const HEIGHT = 560;
const PENS = [
  { name: "black", value: "#1f2328" },
  { name: "blue", value: "#2f6fde" },
  { name: "red", value: "#d93a3a" },
  { name: "green", value: "#2e9a4b" },
];

export interface WhiteboardHandle {
  /** A picture of the student's drawing, when they've drawn since the last one was taken. */
  takePicture: () => string | undefined;
}

/**
 * The whiteboard Suni and the student share, as a pop-up. Suni's working is written across the top in
 * Suni's handwriting; the student draws or writes underneath with a pen, and "Show Suni" sends a picture.
 */
export const Whiteboard = forwardRef<
  WhiteboardHandle,
  { sections: string[][]; busy: boolean; onShow: () => void; onClose: () => void; onClear: () => void }
>(function Whiteboard({ sections, busy, onShow, onClose, onClear }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pen, setPen] = useState(PENS[0].value);
  const [erasing, setErasing] = useState(false);
  const drawing = useRef<{ x: number; y: number } | null>(null);
  // Whether the student has drawn since Suni last saw the board.
  const changed = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  useImperativeHandle(ref, () => ({
    takePicture() {
      const c = canvas.current;
      if (!c || !changed.current) return undefined;
      changed.current = false;
      // White behind the ink, at half size: plenty for Suni to read, and small to send.
      const out = document.createElement("canvas");
      out.width = WIDTH / 2;
      out.height = HEIGHT / 2;
      const g = out.getContext("2d");
      if (!g) return undefined;
      g.fillStyle = "#fff";
      g.fillRect(0, 0, out.width, out.height);
      g.drawImage(c, 0, 0, out.width, out.height);
      const url = out.toDataURL("image/png");
      return url.length <= MAX_BOARD_IMAGE ? url : undefined;
    },
  }));

  function point(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * WIDTH, y: ((e.clientY - r.top) / r.height) * HEIGHT };
  }

  function stroke(from: { x: number; y: number }, to: { x: number; y: number }) {
    const g = canvas.current?.getContext("2d");
    if (!g) return;
    g.globalCompositeOperation = erasing ? "destination-out" : "source-over";
    g.strokeStyle = pen;
    g.lineWidth = erasing ? 28 : 4;
    g.lineCap = "round";
    g.lineJoin = "round";
    g.beginPath();
    g.moveTo(from.x, from.y);
    g.lineTo(to.x, to.y);
    g.stroke();
    changed.current = true;
    if (!erasing) setHasInk(true);
  }

  function clear() {
    canvas.current?.getContext("2d")?.clearRect(0, 0, WIDTH, HEIGHT);
    changed.current = false;
    setHasInk(false);
    onClear();
  }

  return (
    <div className="whiteboard-backdrop">
      <div className="whiteboard" role="dialog" aria-label={`Whiteboard with ${TUTOR_NAME}`}>
        <div className="whiteboard-header">
          <Suni size={40} />
          <strong>Whiteboard with {TUTOR_NAME}</strong>
          <button type="button" className="suni-close" onClick={onClose} aria-label="Close the whiteboard">
            ×
          </button>
        </div>
        <div className="whiteboard-tools" role="toolbar" aria-label="Pens">
          {PENS.map((p) => (
            <button
              key={p.name}
              type="button"
              className={`swatch${!erasing && pen === p.value ? " picked" : ""}`}
              style={{ background: p.value }}
              aria-label={`${p.name} pen`}
              aria-pressed={!erasing && pen === p.value}
              onClick={() => {
                setPen(p.value);
                setErasing(false);
              }}
            />
          ))}
          <button
            type="button"
            className={`btn small secondary${erasing ? " active" : ""}`}
            aria-pressed={erasing}
            onClick={() => setErasing(true)}
          >
            🧽 Rubber
          </button>
          <button type="button" className="btn small secondary" onClick={clear}>
            Clear the board
          </button>
          <button type="button" className="btn small" disabled={busy || !hasInk} onClick={onShow}>
            👀 Show {TUTOR_NAME}
          </button>
        </div>
        <div className="whiteboard-surface">
          <div className="whiteboard-suni" aria-live="polite">
            {sections.length === 0 ? (
              <p className="whiteboard-hint">Draw or write here. {TUTOR_NAME} will write on the board too.</p>
            ) : (
              sections.map((lines, i) => (
                <div key={i} className="whiteboard-section">
                  {lines.map((l, j) => (
                    <div key={j}>{l}</div>
                  ))}
                </div>
              ))
            )}
          </div>
          <canvas
            ref={canvas}
            width={WIDTH}
            height={HEIGHT}
            aria-label="Your drawing"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              const p = point(e);
              drawing.current = p;
              stroke(p, { x: p.x + 0.1, y: p.y + 0.1 });
            }}
            onPointerMove={(e) => {
              if (!drawing.current) return;
              const p = point(e);
              stroke(drawing.current, p);
              drawing.current = p;
            }}
            onPointerUp={() => (drawing.current = null)}
            onPointerCancel={() => (drawing.current = null)}
          />
        </div>
      </div>
    </div>
  );
});
