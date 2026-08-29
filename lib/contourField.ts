/**
 * Deterministic contour-line geometry for the Signal Field background
 * family (Hero's structural layer, Five Gates, Risk's transition echo).
 *
 * Seeded PRNG only — never Math.random()/Date.now() during render — so the
 * server-rendered markup and the first client render are byte-identical.
 * A non-deterministic version here would reintroduce a hydration mismatch.
 */

export interface ContourLayer {
  paths: string[];
  opacity: number;
}

export interface SafeArea {
  /** 0–1, left edge of the region contours should thin beneath. */
  x: number;
  /** 0–1, top edge. */
  y: number;
  /** 0–1, width. */
  w: number;
  /** 0–1, height. */
  h: number;
}

const FIELD_WIDTH = 1200;
const FIELD_HEIGHT = 800;
const MARGIN = 80;
const STEP = 80;

/** mulberry32 — tiny, fast, deterministic for a given seed. */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

/** Smooth Catmull-Rom → cubic-bezier path through sampled points. */
function toPath(points: Array<[number, number]>): string {
  if (points.length < 2) return "";
  let d = `M ${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(p2[0])} ${round(p2[1])}`;
  }
  return d;
}

/**
 * Builds `layers` sets of gently wavy horizontal contour lines within a
 * fixed 1200x800 logical field (the SVG scales to any container via
 * `preserveAspectRatio="xMidYMid slice"`). `density` is lines per layer.
 * Same `seed` always produces the same geometry.
 */
export function buildContourField(seed: number, layers: number, density: number): ContourLayer[] {
  const result: ContourLayer[] = [];

  for (let li = 0; li < layers; li++) {
    const rng = makeRng(seed * 2654435761 + li * 40503 + 17);
    const harmonics = Array.from({ length: 3 }, () => ({
      freq: 0.0028 + rng() * 0.0045,
      amp: (6 + rng() * 10) * (1 - li * 0.15),
      phase: rng() * Math.PI * 2,
    }));

    const count = Math.max(4, Math.round(density * (1 - li * 0.1)));
    const spacing = (FIELD_HEIGHT + MARGIN * 2) / count;
    const paths: string[] = [];

    for (let k = 0; k < count; k++) {
      const baseY = -MARGIN + spacing * (k + 0.5) + (rng() - 0.5) * 8;
      const points: Array<[number, number]> = [];
      for (let x = -MARGIN; x <= FIELD_WIDTH + MARGIN; x += STEP) {
        let offset = 0;
        for (const h of harmonics) {
          offset += h.amp * Math.sin(x * h.freq + h.phase + baseY * 0.01);
        }
        points.push([x, baseY + offset]);
      }
      paths.push(toPath(points));
    }

    result.push({ paths, opacity: round(Math.max(0.08, 0.3 - li * 0.1)) });
  }

  return result;
}

export const CONTOUR_FIELD_VIEWBOX = `0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`;
