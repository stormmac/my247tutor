/**
 * How big the flying Suni can be, and where along the right edge it sits, so it never covers the
 * question. Suni is as big as the screen allows and only shrinks or moves when a question is in the
 * way. Plain geometry, so the page and the tests share it.
 */

export interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface SuniFit {
  /** Suni's width and height, in pixels. */
  size: number;
  /** Gap between Suni and the bottom of the screen. */
  bottom: number;
  /** Whether there's room for Suni to fly about, or it should hover in place. */
  roam: boolean;
}

/** The biggest and smallest Suni. */
export const SUNI_MAX = 180;
export const SUNI_MIN = 72;
/** Gap between Suni and the right and bottom of the screen. */
export const SUNI_EDGE = 16;
/** How far Suni flies to the left and up while roaming. */
export const ROAM_X = 70;
export const ROAM_Y = 60;
/** Suni stays below the top bar. */
const TOP_BAR = 72;
const GAP = 8;
const STEP = 4;

/** The biggest Suni for a screen this size, with nothing in the way: up to 30% of its width. */
export function suniMax(width: number): number {
  return Math.max(SUNI_MIN, Math.min(SUNI_MAX, Math.round((width * 0.3) / STEP) * STEP));
}

function overlaps(a: Box, b: Box): boolean {
  return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
}

/**
 * The biggest Suni that covers none of `avoid` (the question cards on screen, in screen pixels).
 * Suni sits in the bottom right corner when it can, or higher up the right edge, just above or below
 * a question, when that lets it be bigger. When nothing fits, Suni is as small as it gets and hovers
 * in the corner.
 */
export function fitSuni(width: number, height: number, avoid: Box[]): SuniFit {
  const visible = avoid.filter((b) => b.bottom > 0 && b.top < height && b.right > b.left && b.bottom > b.top);
  const right = width - SUNI_EDGE;
  const corner = height - SUNI_EDGE;
  for (let size = suniMax(width); size >= SUNI_MIN; size -= STEP) {
    for (const roam of [true, false]) {
      const tall = size + (roam ? ROAM_Y : 0);
      // Where Suni's bottom edge can go: the corner, then just above or just below each question.
      const spots = [corner, ...visible.flatMap((b) => [b.top - GAP, b.bottom + GAP + tall])];
      for (const spot of spots) {
        if (spot > corner || spot - tall < TOP_BAR) continue;
        const box = { left: right - size - (roam ? ROAM_X : 0), top: spot - tall, right, bottom: spot };
        if (!visible.some((b) => overlaps(box, b))) return { size, bottom: height - spot, roam };
      }
    }
  }
  return { size: SUNI_MIN, bottom: SUNI_EDGE, roam: false };
}
