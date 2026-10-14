import type { ReactNode } from "react";
import { type Colour, describePicture, type Picture as PictureData, type Solid } from "@/lib/content/picture";

/** Fill colours that read well on both the light and dark themes. */
const FILL: Record<Colour, string> = {
  red: "#e0533f",
  blue: "#3b7dd8",
  green: "#3fa65a",
  yellow: "#f2c230",
  orange: "#f08a2c",
  purple: "#8a5cc7",
};

const polar = (cx: number, cy: number, r: number, turn: number) => [
  cx + r * Math.sin(turn * 2 * Math.PI),
  cy - r * Math.cos(turn * 2 * Math.PI),
];

/** One slice of a circle, from `start` to `end` measured in turns clockwise from 12 o'clock. */
function slice(cx: number, cy: number, r: number, start: number, end: number): string {
  if (end - start >= 1) return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
  const [x1, y1] = polar(cx, cy, r, start);
  const [x2, y2] = polar(cx, cy, r, end);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${end - start > 0.5 ? 1 : 0} 1 ${x2} ${y2} Z`;
}

function Svg({ width, height, label, children }: { width: number; height: number; label: string; children: ReactNode }) {
  return (
    <svg className="picture" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: width }} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

const star = (cx: number, cy: number, r: number) =>
  Array.from({ length: 10 }, (_, i) => polar(cx, cy, i % 2 ? r * 0.45 : r, i / 10).join(",")).join(" ");

/** Picks a gap between the numbers on a graph's side so there are no more than about 6 of them. */
function niceStep(max: number): number {
  return [1, 2, 5, 10, 20, 50, 100].find((s) => max / s <= 6) ?? 100;
}

/** Draws a question's picture. Works in server and client components. */
export function Picture({ picture: p }: { picture: PictureData }) {
  const label = describePicture(p);
  switch (p.kind) {
    case "clock": {
      const minuteTurn = p.minute / 60;
      const hourTurn = ((p.hour % 12) + minuteTurn) / 12;
      const [hx, hy] = polar(100, 100, 38, hourTurn);
      const [mx, my] = polar(100, 100, 56, minuteTurn);
      return (
        <Svg width={200} height={200} label={label}>
          <circle cx={100} cy={100} r={92} className="pic-paper" strokeWidth={4} />
          {Array.from({ length: 60 }, (_, i) => {
            const [x1, y1] = polar(100, 100, 88, i / 60);
            const [x2, y2] = polar(100, 100, i % 5 ? 84 : 79, i / 60);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="pic-ink" strokeWidth={i % 5 ? 1 : 2.5} />;
          })}
          {Array.from({ length: 12 }, (_, i) => {
            const [x, y] = polar(100, 100, 66, (i + 1) / 12);
            return (
              <text key={i} x={x} y={y + 6} textAnchor="middle" className="pic-text" fontSize={17} fontWeight={600}>
                {i + 1}
              </text>
            );
          })}
          <line x1={100} y1={100} x2={hx} y2={hy} className="pic-ink" strokeWidth={7} strokeLinecap="round" />
          <line x1={100} y1={100} x2={mx} y2={my} className="pic-brand" strokeWidth={4} strokeLinecap="round" />
          <circle cx={100} cy={100} r={6} className="pic-ink-fill" />
        </Svg>
      );
    }
    case "fraction": {
      if (p.shape === "circle")
        return (
          <Svg width={180} height={180} label={label}>
            {Array.from({ length: p.parts }, (_, i) => (
              <path
                key={i}
                d={slice(90, 90, 80, i / p.parts, (i + 1) / p.parts)}
                className={i < p.shaded ? "pic-shaded" : "pic-paper"}
                strokeWidth={2.5}
              />
            ))}
          </Svg>
        );
      const w = 280 / p.parts;
      return (
        <Svg width={300} height={70} label={label}>
          {Array.from({ length: p.parts }, (_, i) => (
            <rect
              key={i}
              x={10 + i * w}
              y={10}
              width={w}
              height={50}
              className={i < p.shaded ? "pic-shaded" : "pic-paper"}
              strokeWidth={2.5}
            />
          ))}
        </Svg>
      );
    }
    case "number_line": {
      const x = (k: number) => 25 + (k * 290) / p.jumps;
      const value = (k: number) => {
        if (p.fractions && k !== 0 && k !== p.jumps) return `${k}/${p.jumps}`;
        return String(Math.round((p.from + (k * (p.to - p.from)) / p.jumps) * 1000) / 1000);
      };
      return (
        <Svg width={340} height={80} label={label}>
          <line x1={15} y1={35} x2={325} y2={35} className="pic-ink" strokeWidth={2.5} />
          {Array.from({ length: p.jumps + 1 }, (_, k) => (
            <g key={k}>
              <line x1={x(k)} y1={25} x2={x(k)} y2={45} className="pic-ink" strokeWidth={2} />
              {(p.labelEvery || k === 0 || k === p.jumps) && (
                <text x={x(k)} y={68} textAnchor="middle" className="pic-text" fontSize={16}>
                  {value(k)}
                </text>
              )}
            </g>
          ))}
          {p.dotAt !== undefined && <circle cx={x(p.dotAt)} cy={35} r={8} className="pic-brand-fill" />}
        </Svg>
      );
    }
    case "column_graph": {
      const max = Math.max(...p.columns.map((c) => c.value));
      const step = p.step ?? niceStep(max);
      const top = Math.ceil(max / step) * step;
      const y = (v: number) => 190 - (v * 150) / top;
      const slot = 270 / p.columns.length;
      return (
        <Svg width={330} height={230} label={label}>
          <text x={175} y={22} textAnchor="middle" className="pic-text" fontSize={15} fontWeight={600}>
            {p.title}
          </text>
          {Array.from({ length: top / step + 1 }, (_, i) => (
            <g key={i}>
              <line x1={50} y1={y(i * step)} x2={320} y2={y(i * step)} className="pic-grid" />
              <text x={42} y={y(i * step) + 5} textAnchor="end" className="pic-text" fontSize={13}>
                {i * step}
              </text>
            </g>
          ))}
          {p.columns.map((c, i) => (
            <g key={c.label}>
              <rect
                x={50 + i * slot + slot * 0.2}
                y={y(c.value)}
                width={slot * 0.6}
                height={190 - y(c.value)}
                className="pic-shaded"
                strokeWidth={1.5}
              />
              <text x={50 + i * slot + slot / 2} y={210} textAnchor="middle" className="pic-text" fontSize={13}>
                {c.label}
              </text>
            </g>
          ))}
          <line x1={50} y1={40} x2={50} y2={190} className="pic-ink" strokeWidth={2} />
          <line x1={50} y1={190} x2={320} y2={190} className="pic-ink" strokeWidth={2} />
        </Svg>
      );
    }
    case "dot_plot": {
      const max = Math.max(...p.columns.map((c) => c.count));
      const height = 80 + max * 20;
      const slot = 280 / p.columns.length;
      return (
        <Svg width={320} height={height} label={label}>
          <text x={160} y={22} textAnchor="middle" className="pic-text" fontSize={15} fontWeight={600}>
            {p.title}
          </text>
          <line x1={20} y1={height - 32} x2={300} y2={height - 32} className="pic-ink" strokeWidth={2} />
          {p.columns.map((c, i) => {
            const cx = 20 + i * slot + slot / 2;
            return (
              <g key={c.label}>
                {Array.from({ length: c.count }, (_, k) => (
                  <circle key={k} cx={cx} cy={height - 44 - k * 20} r={7} className="pic-brand-fill" />
                ))}
                <text x={cx} y={height - 12} textAnchor="middle" className="pic-text" fontSize={14}>
                  {c.label}
                </text>
              </g>
            );
          })}
        </Svg>
      );
    }
    case "picture_graph": {
      const height = 70 + p.rows.length * 34;
      return (
        <Svg width={340} height={height} label={label}>
          <text x={170} y={22} textAnchor="middle" className="pic-text" fontSize={15} fontWeight={600}>
            {p.title}
          </text>
          {p.rows.map((r, i) => (
            <g key={r.label}>
              <text x={70} y={56 + i * 34} textAnchor="end" className="pic-text" fontSize={14}>
                {r.label}
              </text>
              {Array.from({ length: r.count }, (_, k) => (
                <polygon key={k} points={star(95 + k * 25, 51 + i * 34, 11)} className="pic-star" />
              ))}
            </g>
          ))}
          <polygon points={star(110, height - 16, 9)} className="pic-star" />
          <text x={126} y={height - 11} className="pic-text" fontSize={14}>
            = {p.each} {p.thing}
          </text>
        </Svg>
      );
    }
    case "table":
      return (
        <table className="picture-table" aria-label={label}>
          <thead>
            <tr>
              <th>{p.headings[0]}</th>
              <th>{p.headings[1]}</th>
            </tr>
          </thead>
          <tbody>
            {p.rows.map(([a, b]) => (
              <tr key={a}>
                <td>{a}</td>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "ruler": {
      const cm = 22;
      const width = p.cm * cm + 40;
      const end = 20 + p.length * cm;
      return (
        <Svg width={width} height={110} label={label}>
          {p.object === "pencil" ? (
            <g>
              <rect x={20} y={14} width={p.length * cm - 18} height={18} fill={FILL.yellow} className="pic-outline" />
              <polygon points={`${end - 18},14 ${end},23 ${end - 18},32`} fill="#f4d9b0" className="pic-outline" />
              <polygon points={`${end - 6},20 ${end},23 ${end - 6},26`} className="pic-ink-fill" />
            </g>
          ) : (
            <rect x={20} y={16} width={p.length * cm} height={14} rx={3} fill={FILL.purple} className="pic-outline" />
          )}
          <rect x={10} y={42} width={width - 20} height={58} rx={4} className="pic-ruler" strokeWidth={2} />
          {Array.from({ length: p.cm * 2 + 1 }, (_, i) => (
            <line
              key={i}
              x1={20 + (i * cm) / 2}
              y1={42}
              x2={20 + (i * cm) / 2}
              y2={i % 2 ? 52 : 60}
              className="pic-ink"
              strokeWidth={i % 2 ? 1 : 1.8}
            />
          ))}
          {Array.from({ length: p.cm + 1 }, (_, i) => (
            <text key={i} x={20 + i * cm} y={78} textAnchor="middle" className="pic-text" fontSize={13}>
              {i}
            </text>
          ))}
          <text x={width - 18} y={94} textAnchor="end" className="pic-text" fontSize={11}>
            cm
          </text>
        </Svg>
      );
    }
    case "rectangle": {
      const scale = Math.min(200 / p.width, 110 / p.height);
      const w = p.width * scale;
      const h = p.height * scale;
      return (
        <Svg width={300} height={170} label={label}>
          <rect x={150 - w / 2} y={95 - h / 2} width={w} height={h} className="pic-shaded" strokeWidth={2.5} />
          <text x={150} y={95 - h / 2 - 10} textAnchor="middle" className="pic-text" fontSize={16}>
            {p.top}
          </text>
          <text x={150 + w / 2 + 10} y={100} className="pic-text" fontSize={16}>
            {p.side}
          </text>
        </Svg>
      );
    }
    case "spinner": {
      const n = p.sections.length;
      const [ax, ay] = polar(100, 100, 62, 0.13);
      return (
        <Svg width={200} height={200} label={label}>
          {p.sections.map((c, i) => (
            <path key={i} d={slice(100, 100, 90, i / n, (i + 1) / n)} fill={FILL[c]} className="pic-outline" strokeWidth={2.5} />
          ))}
          <line x1={100} y1={100} x2={ax} y2={ay} className="pic-ink" strokeWidth={5} strokeLinecap="round" />
          <circle cx={ax} cy={ay} r={4} className="pic-ink-fill" />
          <circle cx={100} cy={100} r={8} className="pic-ink-fill" />
        </Svg>
      );
    }
    case "bag": {
      const dots = p.counters.flatMap((c) => Array.from({ length: c.count }, () => c.colour));
      const perRow = dots.length > 12 ? 6 : 4;
      const rows = Math.ceil(dots.length / perRow);
      const height = 80 + rows * 26;
      return (
        <Svg width={220} height={height} label={label}>
          <path
            d={`M 70 30 Q 55 10 80 14 L 140 14 Q 165 10 150 30 Q 205 50 200 ${height - 30} Q 198 ${height - 6} 170 ${height - 6} L 50 ${height - 6} Q 22 ${height - 6} 20 ${height - 30} Q 15 50 70 30 Z`}
            className="pic-bag"
            strokeWidth={2.5}
          />
          {dots.map((c, i) => (
            <circle
              key={i}
              cx={110 + ((i % perRow) - (perRow - 1) / 2) * 26}
              cy={55 + Math.floor(i / perRow) * 26}
              r={10}
              fill={FILL[c]}
              className="pic-outline"
            />
          ))}
        </Svg>
      );
    }
    case "array":
      return (
        <Svg width={p.columns * 28 + 12} height={p.rows * 28 + 12} label={label}>
          {Array.from({ length: p.rows * p.columns }, (_, i) => (
            <circle key={i} cx={20 + (i % p.columns) * 28} cy={20 + Math.floor(i / p.columns) * 28} r={9} className="pic-brand-fill" />
          ))}
        </Svg>
      );
    case "blocks": {
      const unit = 10;
      const items: ReactNode[] = [];
      let x = 10;
      for (let i = 0; i < p.hundreds; i++, x += 10 * unit + 12)
        items.push(
          <g key={`h${i}`}>
            {Array.from({ length: 100 }, (_, k) => (
              <rect key={k} x={x + (k % 10) * unit} y={10 + Math.floor(k / 10) * unit} width={unit} height={unit} className="pic-block" />
            ))}
          </g>,
        );
      for (let i = 0; i < p.tens; i++, x += unit + 8)
        items.push(
          <g key={`t${i}`}>
            {Array.from({ length: 10 }, (_, k) => (
              <rect key={k} x={x} y={10 + k * unit} width={unit} height={unit} className="pic-block" />
            ))}
          </g>,
        );
      x += 6;
      for (let i = 0; i < p.ones; i++)
        items.push(
          <rect
            key={`o${i}`}
            x={x + (i % 3) * (unit + 4)}
            y={10 + 10 * unit - unit - Math.floor(i / 3) * (unit + 4)}
            width={unit}
            height={unit}
            className="pic-block"
          />,
        );
      x += 3 * (unit + 4);
      return (
        <Svg width={x + 10} height={10 * unit + 20} label={label}>
          {items}
        </Svg>
      );
    }
    case "angle": {
      const rad = (p.degrees * Math.PI) / 180;
      const vx = p.degrees > 90 ? 140 : 40;
      const vy = p.degrees > 180 ? 85 : 135;
      const arm = 110;
      const ex = vx + arm * Math.cos(rad);
      const ey = vy - arm * Math.sin(rad);
      const r = 30;
      const mid = rad / 2;
      return (
        <Svg width={280} height={p.degrees > 180 ? 200 : 160} label={label}>
          {p.degrees === 90 ? (
            <path d={`M ${vx + 18} ${vy} L ${vx + 18} ${vy - 18} L ${vx} ${vy - 18}`} fill="none" className="pic-brand" strokeWidth={2} />
          ) : (
            <path
              d={`M ${vx + r} ${vy} A ${r} ${r} 0 ${p.degrees > 180 ? 1 : 0} 0 ${vx + r * Math.cos(rad)} ${vy - r * Math.sin(rad)}`}
              fill="none"
              className="pic-brand"
              strokeWidth={2.5}
            />
          )}
          <line x1={vx} y1={vy} x2={vx + arm} y2={vy} className="pic-ink" strokeWidth={3} strokeLinecap="round" />
          <line x1={vx} y1={vy} x2={ex} y2={ey} className="pic-ink" strokeWidth={3} strokeLinecap="round" />
          {p.label && (
            <text
              x={vx + 52 * Math.cos(mid)}
              y={vy - 52 * Math.sin(mid) + 6}
              textAnchor="middle"
              className="pic-text"
              fontSize={16}
              fontWeight={600}
            >
              {p.label}
            </text>
          )}
        </Svg>
      );
    }
    case "shape": {
      const u = 26;
      const xs = p.points.map(([x]) => x);
      const ys = p.points.map(([, y]) => y);
      const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
      const pad = 64;
      const X = (x: number) => pad + (x - minX) * u;
      const Y = (y: number) => pad + (maxY - y) * u;
      const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
      const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
      // A label's position just outside the shape, and which way its text should run from there.
      const away = (x: number, y: number, by: number): [number, number, "start" | "middle" | "end"] => {
        const dx = X(x) - X(cx);
        const dy = Y(y) - Y(cy);
        const len = Math.hypot(dx, dy) || 1;
        const anchor = dx / len > 0.5 ? "start" : dx / len < -0.5 ? "end" : "middle";
        return [X(x) + (dx / len) * by, Y(y) + (dy / len) * by + 5, anchor];
      };
      const width = (maxX - minX) * u + pad * 2;
      const height = (maxY - minY) * u + pad * 2;
      return (
        <Svg width={width} height={height} label={label}>
          {p.grid &&
            Array.from({ length: maxX - minX + 1 }, (_, i) => (
              <line key={`v${i}`} x1={X(minX + i)} y1={Y(maxY)} x2={X(minX + i)} y2={Y(minY)} className="pic-grid" />
            ))}
          {p.grid &&
            Array.from({ length: maxY - minY + 1 }, (_, i) => (
              <line key={`h${i}`} x1={X(minX)} y1={Y(minY + i)} x2={X(maxX)} y2={Y(minY + i)} className="pic-grid" />
            ))}
          <polygon
            points={p.points.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}
            className="pic-shaded"
            strokeWidth={2.5}
            fillOpacity={p.grid ? 0.6 : 1}
          />
          {p.sideLabels?.map((text, i) => {
            if (!text) return null;
            const [x1, y1] = p.points[i];
            const [x2, y2] = p.points[(i + 1) % p.points.length];
            const [lx, ly, anchor] = away((x1 + x2) / 2, (y1 + y2) / 2, 12);
            return (
              <text key={`s${i}`} x={lx} y={ly} textAnchor={anchor} className="pic-text" fontSize={15}>
                {text}
              </text>
            );
          })}
          {p.cornerLabels?.map((text, i) => {
            const [lx, ly, anchor] = away(p.points[i][0], p.points[i][1], 12);
            return (
              <text key={`c${i}`} x={lx} y={ly} textAnchor={anchor} className="pic-text" fontSize={15} fontWeight={600}>
                {text}
              </text>
            );
          })}
        </Svg>
      );
    }
    case "grid": {
      const u = 34;
      const left = p.axes || p.map ? 34 : 12;
      const top = 12;
      const X = (x: number) => left + x * u;
      const Y = (y: number) => top + (p.rows - y) * u;
      // Points sit on line crossings, or in the middle of a square on a map.
      const at = (x: number, y: number): [number, number] => (p.map ? [X(x + 0.5), Y(y + 0.5)] : [X(x), Y(y)]);
      return (
        <Svg width={left + p.columns * u + 14} height={top + p.rows * u + (p.axes || p.map ? 30 : 12)} label={label}>
          {(p.cells ?? []).map(([x, y]) => (
            <rect key={`${x},${y}`} x={X(x)} y={Y(y + 1)} width={u} height={u} className="pic-shaded" strokeWidth={0} />
          ))}
          {Array.from({ length: p.columns + 1 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={X(i)}
              y1={Y(0)}
              x2={X(i)}
              y2={Y(p.rows)}
              className={p.axes && i === 0 ? "pic-ink" : "pic-grid"}
              strokeWidth={p.axes && i === 0 ? 2 : 1}
            />
          ))}
          {Array.from({ length: p.rows + 1 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={X(0)}
              y1={Y(i)}
              x2={X(p.columns)}
              y2={Y(i)}
              className={p.axes && i === 0 ? "pic-ink" : "pic-grid"}
              strokeWidth={p.axes && i === 0 ? 2 : 1}
            />
          ))}
          {p.axes &&
            Array.from({ length: p.columns + 1 }, (_, i) => (
              <text key={`xl${i}`} x={X(i)} y={Y(0) + 20} textAnchor="middle" className="pic-text" fontSize={13}>
                {i}
              </text>
            ))}
          {p.axes &&
            Array.from({ length: p.rows + 1 }, (_, i) =>
              i === 0 ? null : (
                <text key={`yl${i}`} x={X(0) - 10} y={Y(i) + 5} textAnchor="end" className="pic-text" fontSize={13}>
                  {i}
                </text>
              ),
            )}
          {p.map &&
            Array.from({ length: p.columns }, (_, i) => (
              <text key={`xl${i}`} x={X(i + 0.5)} y={Y(0) + 20} textAnchor="middle" className="pic-text" fontSize={13} fontWeight={600}>
                {String.fromCharCode(65 + i)}
              </text>
            ))}
          {p.map &&
            Array.from({ length: p.rows }, (_, i) => (
              <text key={`yl${i}`} x={X(0) - 10} y={Y(i + 0.5) + 5} textAnchor="end" className="pic-text" fontSize={13} fontWeight={600}>
                {i + 1}
              </text>
            ))}
          {p.path && (
            <polyline
              points={p.path.map(([x, y]) => at(x, y).join(",")).join(" ")}
              fill="none"
              className="pic-brand"
              strokeWidth={3}
              strokeLinejoin="round"
            />
          )}
          {(p.points ?? []).map((q) => {
            const [px, py] = at(q.x, q.y);
            return (
              <g key={q.label}>
                <circle cx={px} cy={py} r={6} className="pic-brand-fill" />
                <text x={px + 8} y={py - 8} className="pic-text" fontSize={14} fontWeight={700}>
                  {q.label}
                </text>
              </g>
            );
          })}
        </Svg>
      );
    }
    case "line_graph": {
      const max = Math.max(...p.points.map((q) => q.value));
      const step = p.step ?? niceStep(max);
      const topValue = Math.ceil(max / step) * step;
      const y = (v: number) => 190 - (v * 150) / topValue;
      const slot = 270 / p.points.length;
      const x = (i: number) => 50 + i * slot + slot / 2;
      return (
        <Svg width={330} height={230} label={label}>
          <text x={175} y={22} textAnchor="middle" className="pic-text" fontSize={15} fontWeight={600}>
            {p.title}
          </text>
          {Array.from({ length: topValue / step + 1 }, (_, i) => (
            <g key={i}>
              <line x1={50} y1={y(i * step)} x2={320} y2={y(i * step)} className="pic-grid" />
              <text x={42} y={y(i * step) + 5} textAnchor="end" className="pic-text" fontSize={13}>
                {i * step}
              </text>
            </g>
          ))}
          <polyline points={p.points.map((q, i) => `${x(i)},${y(q.value)}`).join(" ")} fill="none" className="pic-brand" strokeWidth={3} />
          {p.points.map((q, i) => (
            <g key={q.label}>
              <circle cx={x(i)} cy={y(q.value)} r={5} className="pic-brand-fill" />
              <text x={x(i)} y={210} textAnchor="middle" className="pic-text" fontSize={13}>
                {q.label}
              </text>
            </g>
          ))}
          <line x1={50} y1={40} x2={50} y2={190} className="pic-ink" strokeWidth={2} />
          <line x1={50} y1={190} x2={320} y2={190} className="pic-ink" strokeWidth={2} />
        </Svg>
      );
    }
    case "scale": {
      const steps = Math.round(p.max / p.step);
      // The dial runs from 8 o'clock round to 4 o'clock.
      const turn = (v: number) => -1 / 3 + (v / p.max) * (2 / 3);
      const every = steps > 10 ? 2 : 1;
      const [nx, ny] = polar(120, 115, 70, turn(p.value));
      return (
        <Svg width={240} height={230} label={label}>
          <rect x={30} y={190} width={180} height={28} rx={6} className="pic-bag" strokeWidth={2} />
          <circle cx={120} cy={115} r={95} className="pic-paper" strokeWidth={4} />
          {Array.from({ length: steps * 2 + 1 }, (_, i) => {
            const v = (i * p.step) / 2;
            const [x1, y1] = polar(120, 115, 90, turn(v));
            const [x2, y2] = polar(120, 115, i % 2 ? 84 : 78, turn(v));
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="pic-ink" strokeWidth={i % 2 ? 1 : 2} />;
          })}
          {Array.from({ length: steps + 1 }, (_, i) => {
            if (i % every) return null;
            const [x, y] = polar(120, 115, 63, turn(i * p.step));
            return (
              <text key={i} x={x} y={y + 5} textAnchor="middle" className="pic-text" fontSize={12}>
                {Math.round(i * p.step * 1000) / 1000}
              </text>
            );
          })}
          <text x={120} y={165} textAnchor="middle" className="pic-text" fontSize={15} fontWeight={600}>
            {p.unit}
          </text>
          <line x1={120} y1={115} x2={nx} y2={ny} stroke={FILL.red} strokeWidth={4} strokeLinecap="round" />
          <circle cx={120} cy={115} r={7} className="pic-ink-fill" />
        </Svg>
      );
    }
    case "jug": {
      const steps = Math.round(p.max / p.step);
      const bottom = 210;
      const height = 170;
      const y = (v: number) => bottom - (v / p.max) * height;
      return (
        <Svg width={240} height={230} label={label}>
          <rect x={60} y={y(p.value)} width={110} height={bottom - y(p.value)} fill={FILL.blue} fillOpacity={0.45} />
          <path
            d={`M 60 ${bottom - height - 15} L 60 ${bottom} L 170 ${bottom} L 170 ${bottom - height - 15}`}
            fill="none"
            className="pic-ink"
            strokeWidth={3}
          />
          <path
            d={`M 60 ${bottom - height + 10} C 20 ${bottom - height + 10} 20 ${bottom - 60} 60 ${bottom - 60}`}
            fill="none"
            className="pic-ink"
            strokeWidth={3}
          />
          {Array.from({ length: steps + 1 }, (_, i) => (
            <g key={i}>
              <line x1={150} y1={y(i * p.step)} x2={170} y2={y(i * p.step)} className="pic-ink" strokeWidth={2} />
              {i > 0 && (
                <text x={178} y={y(i * p.step) + 5} className="pic-text" fontSize={12}>
                  {Math.round(i * p.step * 1000) / 1000} {p.unit}
                </text>
              )}
            </g>
          ))}
        </Svg>
      );
    }
    case "solid":
      return (
        <Svg width={220} height={200} label={label}>
          <SolidDrawing shape={p.shape} />
        </Svg>
      );
    case "cubes": {
      const size = 26;
      const dx = 13;
      const dy = -10;
      const width = 40 + p.length * size + p.width * dx;
      const height = 40 + p.height * size + p.width * -dy;
      const cubes: ReactNode[] = [];
      for (let d = p.width - 1; d >= 0; d--)
        for (let z = 0; z < p.height; z++)
          for (let x = 0; x < p.length; x++) {
            const X = 20 + x * size + d * dx;
            const Y = height - 20 - z * size + d * dy;
            cubes.push(
              <g key={`${x}-${d}-${z}`} className="pic-outline">
                <rect x={X} y={Y - size} width={size} height={size} className="pic-block" />
                <polygon
                  points={`${X},${Y - size} ${X + dx},${Y - size + dy} ${X + size + dx},${Y - size + dy} ${X + size},${Y - size}`}
                  className="pic-shaded"
                  strokeWidth={1}
                />
                <polygon
                  points={`${X + size},${Y} ${X + size},${Y - size} ${X + size + dx},${Y - size + dy} ${X + size + dx},${Y + dy}`}
                  className="pic-block-dark"
                />
              </g>,
            );
          }
      return (
        <Svg width={width} height={height} label={label}>
          {cubes}
        </Svg>
      );
    }
  }
}

/** Simple line drawings of 3D objects, with hidden edges dashed. */
function SolidDrawing({ shape }: { shape: Solid }) {
  const edge = { className: "pic-ink", strokeWidth: 2.5, fill: "none" } as const;
  const hidden = { ...edge, strokeDasharray: "6 5", strokeWidth: 1.5 };
  const face = { className: "pic-shaded", strokeWidth: 2.5, fillOpacity: 0.55 } as const;
  switch (shape) {
    case "cube":
    case "rectangular_prism": {
      const w = shape === "cube" ? 100 : 140;
      const h = shape === "cube" ? 100 : 80;
      const [x, y, dx, dy] = [30, 70, 40, -35];
      return (
        <g>
          <polygon points={`${x},${y} ${x + dx},${y + dy} ${x + w + dx},${y + dy} ${x + w},${y}`} {...face} />
          <polygon points={`${x + w},${y} ${x + w + dx},${y + dy} ${x + w + dx},${y + h + dy} ${x + w},${y + h}`} {...face} />
          <rect x={x} y={y} width={w} height={h} {...face} />
          <path
            d={`M ${x + dx} ${y + dy} L ${x + dx} ${y + h + dy} L ${x + w + dx} ${y + h + dy} M ${x + dx} ${y + h + dy} L ${x} ${y + h}`}
            {...hidden}
          />
        </g>
      );
    }
    case "triangular_prism": {
      const [ax, ay, bx, by, cx, cy] = [30, 170, 120, 170, 75, 90];
      const [dx, dy] = [60, -45];
      return (
        <g>
          <polygon points={`${cx},${cy} ${cx + dx},${cy + dy} ${bx + dx},${by + dy} ${bx},${by}`} {...face} />
          <polygon points={`${ax},${ay} ${bx},${by} ${cx},${cy}`} {...face} />
          <path
            d={`M ${ax} ${ay} L ${ax + dx} ${ay + dy} L ${bx + dx} ${by + dy} M ${ax + dx} ${ay + dy} L ${cx + dx} ${cy + dy}`}
            {...hidden}
          />
        </g>
      );
    }
    case "square_pyramid":
      return (
        <g>
          <polygon points="40,160 140,160 110,20" {...face} />
          <polygon points="140,160 180,125 110,20" {...face} />
          <path d="M 40 160 L 80 125 L 180 125 M 80 125 L 110 20" {...hidden} />
        </g>
      );
    case "triangular_pyramid":
      return (
        <g>
          <polygon points="30,165 150,175 105,25" {...face} />
          <polygon points="150,175 185,120 105,25" {...face} />
          <path d="M 30 165 L 185 120" {...hidden} />
        </g>
      );
    case "cylinder":
      return (
        <g>
          <path d="M 50 40 L 50 160 A 60 18 0 0 0 170 160 L 170 40" {...face} />
          <ellipse cx={110} cy={40} rx={60} ry={18} {...face} />
          <path d="M 50 160 A 60 18 0 0 1 170 160" {...hidden} />
        </g>
      );
    case "cone":
      return (
        <g>
          <path d="M 110 20 L 50 160 A 60 18 0 0 0 170 160 Z" {...face} />
          <path d="M 50 160 A 60 18 0 0 1 170 160" {...hidden} />
        </g>
      );
    case "sphere":
      return (
        <g>
          <circle cx={110} cy={100} r={75} {...face} />
          <path d="M 35 100 A 75 22 0 0 0 185 100" {...edge} strokeWidth={1.5} />
          <path d="M 35 100 A 75 22 0 0 1 185 100" {...hidden} />
        </g>
      );
  }
}
