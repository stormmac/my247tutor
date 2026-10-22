"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Suni } from "@/components/Suni";
import { type Algorithm, layoutAlgorithm } from "@/lib/tutor/algorithm";
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

/** How long the student stops drawing before Suni has a look, when "Help as I draw" is on. */
const PAUSE_MS = 4000;
const FONT = '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive';

export interface WhiteboardHandle {
  /**
   * A picture of the board: the written method set out on it and the student's drawing. Only when
   * they've drawn since the last one was taken, unless `always`.
   */
  takePicture: (always?: boolean) => string | undefined;
}

/** Draws a written method in the bottom middle of the board, with boxes for the student to fill in. */
function drawAlgorithm(g: CanvasRenderingContext2D, algorithm: Algorithm) {
  const { cols, rows, marks } = layoutAlgorithm(algorithm);
  const cell = Math.min(64, 860 / cols, 420 / rows);
  const left = (WIDTH - cols * cell) / 2;
  const top = HEIGHT - 14 - rows * cell;
  const x = (col: number) => left + col * cell;
  const y = (row: number) => top + row * cell;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `${Math.round(cell * 0.7)}px ${FONT}`;
  for (const m of marks) {
    if (m.kind === "digit") {
      g.fillStyle = "#2a2f35";
      g.fillText(m.text, x(m.col) + cell / 2, y(m.row) + cell / 2);
    } else if (m.kind === "box") {
      g.strokeStyle = m.small ? "#e0a100" : "#b9c0c9";
      g.lineWidth = 1.5;
      g.setLineDash(m.small ? [] : [5, 4]);
      if (m.small === "top") g.strokeRect(x(m.col) + cell * 0.27, y(m.row) + cell * 0.4, cell * 0.46, cell * 0.5);
      else if (m.small === "corner") g.strokeRect(x(m.col) + 1, y(m.row) + 1, cell * 0.32, cell * 0.36);
      else g.strokeRect(x(m.col) + 4, y(m.row) + 4, cell - 8, cell - 8);
      g.setLineDash([]);
    } else if (m.kind === "rule") {
      g.strokeStyle = "#2a2f35";
      g.lineWidth = 3;
      g.beginPath();
      g.moveTo(x(m.from), y(m.row));
      g.lineTo(x(m.to + 1), y(m.row));
      g.stroke();
    } else {
      // The division bracket curves down the left of the dividend.
      g.strokeStyle = "#2a2f35";
      g.lineWidth = 3;
      g.beginPath();
      g.moveTo(x(m.col), y(m.row));
      g.quadraticCurveTo(x(m.col) + cell * 0.3, y(m.row) + cell / 2, x(m.col), y(m.row + 1));
      g.stroke();
    }
  }
}

/**
 * The whiteboard Suni and the student share, as a pop-up. Suni's working is written across the top in
 * Suni's handwriting, and a written method Suni sets out (column adding, long division and so on) is
 * drawn properly below it. The student draws or writes with a pen. "Check my answer" sends Suni a
 * picture, and with "Help as I draw" on, Suni has a look whenever they stop drawing for a moment.
 */
export const Whiteboard = forwardRef<
  WhiteboardHandle,
  {
    sections: string[][];
    algorithm: Algorithm | null;
    busy: boolean;
    onCheck: () => void;
    onPause: () => void;
    onClose: () => void;
    onClear: () => void;
  }
>(function Whiteboard({ sections, algorithm, busy, onCheck, onPause, onClose, onClear }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pen, setPen] = useState(PENS[0].value);
  const [erasing, setErasing] = useState(false);
  const drawing = useRef<{ x: number; y: number } | null>(null);
  // Whether the student has drawn since Suni last saw the board.
  const changed = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  const guide = useRef<HTMLCanvasElement>(null);
  const [coaching, setCoaching] = useState(true);
  const pause = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Latest props for the pause timer, which outlives the render that set it.
  const latest = useRef({ busy, coaching, onPause });
  useEffect(() => {
    latest.current = { busy, coaching, onPause };
  });
  useEffect(() => () => void (pause.current && clearTimeout(pause.current)), []);

  // The written method is drawn on its own layer under the pen, so the rubber leaves it. A new one
  // replaces the student's drawing on the old one.
  const shown = algorithm ? `${algorithm.op}${algorithm.numbers.join(",")}${algorithm.long}` : "";
  const lastShown = useRef(shown);
  useEffect(() => {
    const g = guide.current?.getContext("2d");
    if (!g) return;
    g.clearRect(0, 0, WIDTH, HEIGHT);
    if (algorithm) drawAlgorithm(g, algorithm);
    if (lastShown.current && lastShown.current !== shown) {
      canvas.current?.getContext("2d")?.clearRect(0, 0, WIDTH, HEIGHT);
      changed.current = false;
      setHasInk(false);
    }
    lastShown.current = shown;
  }, [shown]); // eslint-disable-line react-hooks/exhaustive-deps

  useImperativeHandle(ref, () => ({
    takePicture(always = false) {
      const c = canvas.current;
      if (!c || !(changed.current || (always && hasInk))) return undefined;
      changed.current = false;
      // White behind the ink, at half size: plenty for Suni to read, and small to send.
      const out = document.createElement("canvas");
      out.width = WIDTH / 2;
      out.height = HEIGHT / 2;
      const g = out.getContext("2d");
      if (!g) return undefined;
      g.fillStyle = "#fff";
      g.fillRect(0, 0, out.width, out.height);
      if (guide.current) g.drawImage(guide.current, 0, 0, out.width, out.height);
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
          <label className="whiteboard-coach">
            <input type="checkbox" checked={coaching} onChange={(e) => setCoaching(e.target.checked)} /> 💡 Help as I draw
          </label>
          <button type="button" className="btn small" disabled={busy || !hasInk} onClick={onCheck}>
            ✅ Check my answer
          </button>
        </div>
        <div className="whiteboard-surface">
          <canvas ref={guide} width={WIDTH} height={HEIGHT} className="whiteboard-guide" aria-hidden />
          <div className="whiteboard-suni" aria-live="polite">
            {sections.length === 0 && !algorithm ? (
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
              if (pause.current) clearTimeout(pause.current);
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
            onPointerUp={() => {
              drawing.current = null;
              if (pause.current) clearTimeout(pause.current);
              pause.current = setTimeout(() => {
                const { busy, coaching, onPause } = latest.current;
                if (coaching && !busy && changed.current) onPause();
              }, PAUSE_MS);
            }}
            onPointerCancel={() => (drawing.current = null)}
          />
        </div>
      </div>
    </div>
  );
});
