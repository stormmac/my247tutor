import { describe, expect, it } from "vitest";
import { fitSuni, ROAM_X, ROAM_Y, SUNI_EDGE, SUNI_MAX, SUNI_MIN, suniMax } from "./suniFit";

const box = (left: number, top: number, right: number, bottom: number) => ({ left, top, right, bottom });
const overlaps = (a: ReturnType<typeof box>, b: ReturnType<typeof box>) =>
  a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
/** Where Suni can be, counting how far it flies about. */
function suniBox(width: number, height: number, fit: ReturnType<typeof fitSuni>) {
  const right = width - SUNI_EDGE;
  const bottom = height - fit.bottom;
  const extra = fit.roam ? 1 : 0;
  return box(right - fit.size - extra * ROAM_X, bottom - fit.size - extra * ROAM_Y, right, bottom);
}

describe("fitSuni", () => {
  it("is as big as it gets, flying about, with nothing in the way", () => {
    expect(fitSuni(1280, 800, [])).toEqual({ size: SUNI_MAX, bottom: SUNI_EDGE, roam: true });
  });

  it("is smaller on a phone", () => {
    expect(suniMax(390)).toBe(116);
    expect(fitSuni(390, 800, []).size).toBe(116);
    expect(suniMax(200)).toBe(SUNI_MIN);
  });

  it("never covers the question", () => {
    const cases: [number, number, ReturnType<typeof box>][] = [
      [1280, 800, box(100, 100, 1180, 700)],
      [1280, 800, box(100, 100, 1180, 500)],
      [1024, 768, box(16, 300, 1008, 760)],
      [390, 800, box(16, 120, 374, 520)],
      [390, 800, box(16, 400, 374, 900)],
    ];
    for (const [w, h, q] of cases) {
      const fit = fitSuni(w, h, [q]);
      expect(overlaps(suniBox(w, h, fit), q), JSON.stringify({ w, h, q, fit })).toBe(false);
      expect(fit.size).toBeGreaterThanOrEqual(SUNI_MIN);
    }
  });

  it("stays big in the corner below a question that ends higher up", () => {
    expect(fitSuni(1280, 800, [box(100, 100, 1180, 400)])).toEqual({ size: SUNI_MAX, bottom: SUNI_EDGE, roam: true });
  });

  it("hovers in place when flying about would cover the question", () => {
    // A question ending just above where a roaming Suni would reach.
    const q = box(100, 100, 1180, 800 - SUNI_EDGE - SUNI_MAX - 20);
    const fit = fitSuni(1280, 800, [q]);
    expect(fit.size).toBe(SUNI_MAX);
    expect(fit.roam).toBe(false);
  });

  it("moves up beside the gap above a question low on the screen", () => {
    const q = box(16, 500, 1008, 768);
    const fit = fitSuni(1024, 768, [q]);
    expect(fit.bottom).toBeGreaterThan(768 - 500);
    expect(overlaps(suniBox(1024, 768, fit), q)).toBe(false);
  });

  it("ignores questions scrolled off the screen", () => {
    expect(fitSuni(1280, 800, [box(100, -900, 1180, -10)]).size).toBe(SUNI_MAX);
  });

  it("is as small as it gets when the question fills the screen", () => {
    expect(fitSuni(390, 800, [box(0, 0, 390, 800)])).toEqual({ size: SUNI_MIN, bottom: SUNI_EDGE, roam: false });
  });
});
