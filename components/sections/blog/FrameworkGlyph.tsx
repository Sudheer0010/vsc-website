import React from "react";

/**
 * Type D, six variations on one shape language — not six icons picked
 * from a library. The base grammar is bars on a horizontal reference
 * line, which is the same DNA as the site's own signature mark
 * (StepRule): measured, stepwise structure. Each framework varies the
 * arrangement, not the style — same stroke weight, same colours, every
 * time.
 *
 * Five variants sit on a baseline (bars grow up from the bottom). One —
 * "balanced," for Trading Psychology — sits on a centre line instead,
 * because variance around a mean is what that framework is actually
 * about; forcing it onto the baseline grammar would have meant drawing
 * a different concept with the same shape and calling it consistent.
 */

export type FrameworkGlyphVariant =
  | "ascending" // Stage Analysis — three rising bars: progression through stages
  | "capped" // Risk Management — bars under a ceiling line: a defined limit
  | "sized" // Position Sizing — bars of varying width: proportional allocation
  | "balanced" // Trading Psychology — variance narrowing around a centre line
  | "linked" // Execution Framework — bars joined at the top: a connected sequence
  | "marked"; // Business Analysis — one bar singled out with a node: the one that matters

const GROWTH = "var(--growth)";
const MUTED = "var(--ink-faint)";
const CLAY = "var(--clay-bright)";

function BaselineBars({
  heights,
  widths,
  fills,
}: {
  heights: number[];
  widths: number[];
  fills: string[];
}) {
  const baseline = 38;
  const xs = widths.reduce<number[]>((acc, w, i) => {
    const prev = i === 0 ? 6 : acc[i - 1] + widths[i - 1] + 6;
    acc.push(prev);
    return acc;
  }, []);
  return (
    <>
      {heights.map((h, i) => (
        <rect key={i} x={xs[i]} y={baseline - h} width={widths[i]} height={h} rx="1.5" fill={fills[i]} />
      ))}
    </>
  );
}

export function FrameworkGlyph({
  variant,
  size = 48,
  className = "",
}: {
  variant: FrameworkGlyphVariant;
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className={className}>
      {variant !== "balanced" && (
        <line x1="4" y1="38.5" x2="44" y2="38.5" stroke="var(--rule)" strokeWidth="1" />
      )}

      {variant === "ascending" && (
        <BaselineBars heights={[10, 18, 26]} widths={[7, 7, 7]} fills={[MUTED, GROWTH, GROWTH]} />
      )}

      {variant === "capped" && (
        <>
          <line x1="6" y1="10" x2="42" y2="10" stroke={MUTED} strokeWidth="1.5" strokeDasharray="2 3" />
          <BaselineBars heights={[22, 28, 22]} widths={[7, 7, 7]} fills={[GROWTH, GROWTH, GROWTH]} />
        </>
      )}

      {variant === "sized" && (
        <BaselineBars heights={[14, 26, 18]} widths={[6, 13, 8]} fills={[MUTED, GROWTH, GROWTH]} />
      )}

      {variant === "balanced" && (
        <>
          <line x1="4" y1="24" x2="44" y2="24" stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 3" />
          <rect x="9" y="17" width="7" height="14" rx="1.5" fill={CLAY} opacity="0.55" />
          <rect x="21" y="21" width="7" height="6" rx="1.5" fill={GROWTH} />
          <rect x="33" y="14" width="7" height="20" rx="1.5" fill={CLAY} opacity="0.55" />
        </>
      )}

      {variant === "linked" && (
        <>
          <path d="M 9.5 16 L 24.5 12 L 39.5 16" fill="none" stroke={GROWTH} strokeWidth="1.5" strokeLinecap="round" />
          <BaselineBars heights={[22, 26, 22]} widths={[7, 7, 7]} fills={[GROWTH, GROWTH, GROWTH]} />
        </>
      )}

      {variant === "marked" && (
        <>
          <BaselineBars heights={[16, 27, 20]} widths={[7, 7, 7]} fills={[MUTED, GROWTH, MUTED]} />
          {/* circle sits above the tallest (middle) bar's top edge at y=38-27=11 */}
          <circle cx="22.5" cy="6.5" r="3" fill="none" stroke={GROWTH} strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}
