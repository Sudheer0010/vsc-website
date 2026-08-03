import React from "react";

/**
 * Type D — nested structure. Three concentric rings: the outer ring is the
 * broadest entry point, the filled core is the deepest. Hero-only — the
 * "Start where you are" rows now carry their own colour per access tier
 * (open/by application/by invitation, v2.1 §1.2), which is a different
 * axis from depth, so reusing this ring mark there would have conflated
 * two different claims about the same three offerings.
 *
 * Purely decorative (aria-hidden): the concentric-rings shape asserts
 * *increasing depth*, but that relationship and the three tier names are
 * always stated as real, always-visible text next to it in the hero
 * legend — the mark reinforces, it doesn't carry unique information.
 *
 * Colours: charcoal → green → deep green, not blue → green → deep green.
 * The outer ring was `var(--sky)` in the first pass, which reads as blue —
 * prohibited by v2 §8. Fixed in v2.1 §0.2.
 */
export function OfferingsDepthMark({
  size = 44,
  active = "all",
  className = "",
}: {
  size?: number;
  active?: "outer" | "middle" | "inner" | "all";
  className?: string;
}) {
  const on = (ring: "outer" | "middle" | "inner") => active === "all" || active === ring;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="var(--ink-soft)"
        strokeWidth={on("outer") ? 3 : 1.5}
        opacity={on("outer") ? 1 : 0.22}
      />
      <circle
        cx="50"
        cy="50"
        r="29"
        fill="none"
        stroke="var(--growth)"
        strokeWidth={on("middle") ? 3 : 1.5}
        opacity={on("middle") ? 1 : 0.22}
      />
      <circle
        cx="50"
        cy="50"
        r="13"
        fill={on("inner") ? "var(--growth-deep)" : "none"}
        stroke="var(--growth-deep)"
        strokeWidth={on("inner") ? 0 : 1.5}
        opacity={on("inner") ? 1 : 0.22}
      />
    </svg>
  );
}
