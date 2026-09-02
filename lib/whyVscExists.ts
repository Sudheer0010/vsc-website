/**
 * Static data for the "Why VSC exists" scroll chapter (home, between the
 * arrival hero and BeliefSection). Everything here is computed once at
 * module load from a fixed seed — never per-render, never per-frame — so
 * the server-rendered markup and the first client render stay identical
 * (same discipline as lib/contourField.ts).
 */

export const CHART_VIEW_W = 800;
export const CHART_VIEW_H = 420;

interface Vec {
  x: number;
  y: number;
}

/** mulberry32 — same generator lib/contourField.ts uses. */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/**
 * The narrative spine: base → run-up → sharp pullback → higher low →
 * stronger leg up. Vertices are never jittered, so named x-positions below
 * (HIGHER_LOW_X, ENTRY_X, RING_X…) always land exactly where intended.
 */
const SPINE: Vec[] = [
  { x: 0, y: 338 },
  { x: 55, y: 352 },
  { x: 100, y: 322 },
  { x: 150, y: 344 },
  { x: 195, y: 330 }, // end of base
  { x: 235, y: 295 },
  { x: 275, y: 248 },
  { x: 315, y: 205 },
  { x: 350, y: 172 },
  { x: 378, y: 150 }, // run-up top
  { x: 402, y: 188 },
  { x: 424, y: 222 },
  { x: 444, y: 246 }, // pullback low
  { x: 462, y: 236 }, // small bounce
  { x: 478, y: 248 }, // HIGHER LOW (higher than the base's ~350 low)
  { x: 498, y: 224 }, // ENTRY — just after the higher low
  { x: 522, y: 196 },
  { x: 548, y: 168 },
  { x: 576, y: 198 }, // jagged pullback inside the strong leg
  { x: 600, y: 150 },
  { x: 626, y: 118 },
  { x: 652, y: 100 },
  { x: 678, y: 124 }, // small dip
  { x: 704, y: 96 }, // RING — later in the strong leg
  { x: 730, y: 76 },
  { x: 756, y: 60 },
  { x: 780, y: 70 },
  { x: 800, y: 50 },
];

export const HIGHER_LOW_X = 478;
export const ENTRY_X = 498;
export const RING_X = 704;
export const STRENGTH_START_X = 478;
export const STRENGTH_END_X = 652;
export const STOP_Y = 240; // higher low (248) minus 8 — the invalidation level
export const REGIME_Y = 0; // top 14px of the chart box itself, not above it
export const REGIME_BAND_H = 14;
export const REGIME_X_START = 20;
export const REGIME_X_END = 780;
// The stop line now spans the same full width as the regime band (revision
// 2) rather than a short stub under the entry — it reads as "the invalidation
// level for the whole setup," not a local tick mark.
export const STOP_X_START = REGIME_X_START;
export const STOP_X_END = REGIME_X_END;

/** Interpolate the spine at fine resolution with small deterministic jag. */
function buildPricePoints(): Vec[] {
  const rng = makeRng(48173);
  const points: Vec[] = [{ x: SPINE[0].x, y: SPINE[0].y }];
  const SUBDIVS = 3;

  for (let i = 0; i < SPINE.length - 1; i++) {
    const a = SPINE[i];
    const b = SPINE[i + 1];
    for (let s = 1; s <= SUBDIVS; s++) {
      const t = s / SUBDIVS;
      const x = a.x + (b.x - a.x) * t;
      const y = a.y + (b.y - a.y) * t;
      const isVertex = s === SUBDIVS;
      const jag = isVertex ? 0 : (rng() - 0.5) * 9;
      points.push({ x: round1(x), y: round1(y + jag) });
    }
  }
  return points;
}

export const PRICE_POINTS = buildPricePoints();

export function pathFromPoints(points: Vec[]): string {
  if (points.length === 0) return "";
  return points.reduce(
    (d, p, i) => d + `${i === 0 ? "M" : "L"} ${p.x} ${p.y} `,
    ""
  ).trim();
}

export const PRICE_PATH_D = pathFromPoints(PRICE_POINTS);

/** Sum of Euclidean segment lengths — feeds stroke-dasharray/-dashoffset. */
function pathLength(points: Vec[]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return len;
}

export const PRICE_PATH_LENGTH = round1(pathLength(PRICE_POINTS));

/**
 * Cumulative arc length at each point, so `t` (0–1) can be sampled by
 * distance travelled rather than by array index. The spine's segments span
 * very different pixel widths (16px to 55px) but all get the same fixed
 * subdivision count, so an index-fraction `t` would bunch anchors together
 * wherever segments happen to be short — arc length keeps them spread
 * across the whole visual path instead.
 */
const CUMULATIVE_LENGTHS: number[] = (() => {
  const lens = [0];
  for (let i = 1; i < PRICE_POINTS.length; i++) {
    lens.push(lens[i - 1] + Math.hypot(PRICE_POINTS[i].x - PRICE_POINTS[i - 1].x, PRICE_POINTS[i].y - PRICE_POINTS[i - 1].y));
  }
  return lens;
})();

const nearestIndex = (targetX: number) => {
  let best = 0;
  let bestDist = Infinity;
  PRICE_POINTS.forEach((p, i) => {
    const d = Math.abs(p.x - targetX);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
};

/** The "strength" segment (mark 2) as its own path, same coordinate space. */
export const STRENGTH_PATH_D = pathFromPoints(
  PRICE_POINTS.slice(nearestIndex(STRENGTH_START_X), nearestIndex(STRENGTH_END_X) + 1)
);
export const STRENGTH_PATH_LENGTH = round1(
  pathLength(PRICE_POINTS.slice(nearestIndex(STRENGTH_START_X), nearestIndex(STRENGTH_END_X) + 1))
);

export const ENTRY_POINT = PRICE_POINTS[nearestIndex(ENTRY_X)];
export const RING_POINT = PRICE_POINTS[nearestIndex(RING_X)];

/** --- Beat copy (final — see brief §2, do not rewrite) ------------------- */
export const EYEBROW = "Exhibit 00 · Why VSC exists";
export const BEAT_A = "Markets get messy.";
export const BEAT_B = "Every move had a reason. None told you what to do.";
export const BEAT_C = "The missing piece is structure.";
export const BEAT_D = {
  headline: "Why VSC exists.",
  statement: "To bridge the gap between understanding markets and acting in them.",
  support: "Research. Frameworks. Tools. A repeatable process.",
};

/** --- The five marks, in reading order ----------------------------------- */
export const QUESTIONS = [
  "What market are we in?",
  "Where is strength already?",
  "Is this a setup?",
  "How much, and where am I wrong?",
  "What does the market have to earn?",
] as const;

/**
 * First-reading statements — the strongest 22 of the brief's original list,
 * in order (revision 3: no label may ever overlap another, so density now
 * comes from crowding tight to the line and, on mobile, from turnover
 * rather than from more simultaneous text).
 */
export const STATEMENTS = [
  "Fed holds",
  "CPI hot",
  "FII selling",
  "Tariff headline",
  "Crude spikes",
  "RBI pause",
  "Rupee 86",
  "Budget day",
  "Earnings miss",
  "Nifty ATH",
  "Bond yields up",
  "Dollar strength",
  "Sector rotation",
  "Global cues weak",
  "Block deal",
  "Q2 guidance cut",
  "Rate cut hopes",
  "VIX 18",
  "DII buying",
  "Geopolitics",
  "Oil below 70",
  "Breadth narrow",
] as const;

/**
 * Mobile's 14, shown 2 at a time (see ANNOTATIONS_MOBILE — pairIndex drives
 * the streaming fade in the component). Reuses the same strongest-first
 * order as STATEMENTS plus enough of the brief's list to reach 14.
 */
export const STATEMENTS_MOBILE = [
  "Fed holds",
  "CPI hot",
  "FII selling",
  "Tariff headline",
  "Crude spikes",
  "RBI pause",
  "Rupee 86",
  "Budget day",
  "Earnings miss",
  "Nifty ATH",
  "Bond yields up",
  "Dollar strength",
  "Sector rotation",
  "Global cues weak",
] as const;

export interface Annotation {
  label: string;
  t: number; // 0–1 fraction along PRICE_POINTS
  dx: number; // px offset from the anchor, in the 800×420 chart space
  dy: number;
  group: number; // stagger group, 0-indexed (mobile: pair index)
}

interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const boxesOverlap = (a: Box, b: Box) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

const arcLengthPointAt = (t: number): Vec => {
  const target = Math.min(1, Math.max(0, t)) * PRICE_PATH_LENGTH;
  let idx = 0;
  while (idx < CUMULATIVE_LENGTHS.length - 1 && CUMULATIVE_LENGTHS[idx + 1] < target) idx++;
  return PRICE_POINTS[idx];
};

/**
 * Places labels with a real collision pass, computed once here from static
 * data (never at runtime): each label gets a padded bounding box in real
 * pixels at the given scale; a candidate that overlaps an already-placed
 * box tries the other side of the line, then walks outward along its own
 * direction in fixed steps until clear. Returns offsets back in SVG units
 * so the caller can use them exactly like any other (t, dx, dy).
 */
function placeLabels(
  items: readonly string[],
  opts: { scale: number; charWidthPx: number; lineHeightPx: number; initialDistPx: number; padPx: number; stepPx: number }
): Array<{ t: number; dx: number; dy: number }> {
  const { scale, charWidthPx, lineHeightPx, initialDistPx, padPx, stepPx } = opts;
  const placed: Box[] = [];

  return items.map((label, i) => {
    const t = items.length === 1 ? 0.5 : 0.05 + (i / (items.length - 1)) * (0.98 - 0.05);
    const anchor = arcLengthPointAt(t);
    const anchorPx = { x: anchor.x * scale, y: anchor.y * scale };
    const halfW = (label.length * charWidthPx) / 2 + padPx;
    const halfH = lineHeightPx / 2 + padPx;

    const boxAt = (dxPx: number, dyPx: number): Box => {
      const cx = anchorPx.x + dxPx;
      const cy = anchorPx.y + dyPx;
      return { left: cx - halfW, right: cx + halfW, top: cy - halfH, bottom: cy + halfH };
    };

    const above = i % 2 === 0;
    const startDx = ((i % 3) - 1) * 4; // -4/0/4, a slight angle so "outward" isn't purely vertical
    let dxPx = startDx;
    let dyPx = above ? -initialDistPx : initialDistPx;
    let box = boxAt(dxPx, dyPx);

    if (placed.some((p) => boxesOverlap(box, p))) {
      dyPx = -dyPx; // try the other side of the line first
      box = boxAt(dxPx, dyPx);
    }

    let iterations = 0;
    while (placed.some((p) => boxesOverlap(box, p)) && iterations < 60) {
      const mag = Math.hypot(dxPx, dyPx) || 1;
      const dist = mag + stepPx;
      dxPx = (dxPx / mag) * dist;
      dyPx = (dyPx / mag) * dist;
      box = boxAt(dxPx, dyPx);
      iterations++;
    }

    // Keep the box within the chart's own pixel bounds — the push-outward
    // loop above only avoids other labels, so one near either end of the
    // path can otherwise walk its box past the chart edge (and, since the
    // chart sits close to the viewport edge on desktop, off-screen).
    const chartWpx = scale * CHART_VIEW_W;
    const chartHpx = scale * CHART_VIEW_H;
    if (box.left < 0) dxPx += -box.left;
    else if (box.right > chartWpx) dxPx -= box.right - chartWpx;
    if (box.top < 0) dyPx += -box.top;
    else if (box.bottom > chartHpx) dyPx -= box.bottom - chartHpx;
    box = boxAt(dxPx, dyPx);

    placed.push(box);
    return { t, dx: round1(dxPx / scale), dy: round1(dyPx / scale) };
  });
}

// Desktop reference scale: the chart caps at 1100px wide (min(58vw,1100px)),
// which is the actual rendered width at any viewport ≥1897px and is also
// this chapter's specified verification width (1920). Label font is a fixed
// 12px CSS size — it does not scale with the SVG — so collision-avoidance
// has to be run in real pixels at a specific scale, not in abstract SVG
// units; 1920 is that scale.
const DESKTOP_SCALE = 1100 / CHART_VIEW_W;
const DESKTOP_PLACEMENTS = placeLabels(STATEMENTS, {
  scale: DESKTOP_SCALE,
  charWidthPx: 12 * 0.62,
  lineHeightPx: 12 * 1.375,
  initialDistPx: 10,
  padPx: 6,
  stepPx: 12,
});

export const ANNOTATIONS: Annotation[] = STATEMENTS.map((label, i) => ({
  label,
  ...DESKTOP_PLACEMENTS[i],
  group: Math.floor(i / 4),
}));

// Mobile reference scale: chart is w-full inside the padded copy column
// (~342px at a 390px viewport, this chapter's other verification width),
// so width — not the 42vh cap — is what actually determines its rendered
// size at 360–430px. Font drops to 11px there too.
const MOBILE_SCALE = 342 / CHART_VIEW_W;
const MOBILE_PLACEMENTS = placeLabels(STATEMENTS_MOBILE, {
  scale: MOBILE_SCALE,
  charWidthPx: 11 * 0.62,
  lineHeightPx: 11 * 1.375,
  initialDistPx: 8,
  padPx: 6,
  stepPx: 10,
});

/** pairIndex: which of the 7 streamed pairs (0–6) this label belongs to. */
export const ANNOTATIONS_MOBILE: Annotation[] = STATEMENTS_MOBILE.map((label, i) => ({
  label,
  ...MOBILE_PLACEMENTS[i],
  group: Math.floor(i / 2),
}));

export const pointAtT = arcLengthPointAt;

/** Nearest point on the drawn path to a given x — used to anchor mark labels. */
export function pointAtX(x: number): Vec {
  return PRICE_POINTS[nearestIndex(x)];
}
