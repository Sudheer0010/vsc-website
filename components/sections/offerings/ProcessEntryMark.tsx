import React from "react";

/**
 * The hero's "Exhibit 01 · Structure" mark. Three outer nodes at
 * identical size and stroke weight (no hierarchy among them) each lead
 * into one shared, brand-coloured core — three equal entry points into
 * one process, not three tiers of one thing. Replaces the previous
 * concentric-rings mark (OfferingsDepthMark), which visually claimed
 * "each ring is a deeper level of engagement" — the escalating-tier
 * reading this exhibit is deliberately avoiding.
 */
export function ProcessEntryMark({ size = 140, className = "" }: { size?: number; className?: string }) {
  const nodes = [
    { cx: 22, cy: 24 },
    { cx: 50, cy: 12 },
    { cx: 78, cy: 24 },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={className}>
      {nodes.map((n, i) => (
        <line
          key={`line-${i}`}
          x1={n.cx}
          y1={n.cy}
          x2={50}
          y2={72}
          stroke="var(--ink-soft)"
          strokeWidth={1.5}
          strokeOpacity={0.3}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={`node-${i}`}
          cx={n.cx}
          cy={n.cy}
          r={7}
          fill="var(--canvas)"
          stroke="var(--ink-soft)"
          strokeWidth={2.5}
        />
      ))}
      <circle cx={50} cy={72} r={9} fill="var(--growth)" />
    </svg>
  );
}
