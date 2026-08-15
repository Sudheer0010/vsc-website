import React from "react";

/**
 * The numbered-exhibit wrapper — "the single highest-leverage move" in the
 * v2 visual-language brief. Wrapping a diagram in a labelled, captioned
 * frame is what makes a page read as a research publication instead of a
 * website with some SVGs in it.
 *
 * Deliberately not styled to match the site's `.eyebrow` convention
 * (sentence case, no letter-spacing — see DESIGN_PRINCIPLES.md §2). The
 * exhibit label is a narrower, more literal borrowing from an actual
 * printed-report convention (McKinsey exhibits, Bloomberg figures), used
 * only directly above a diagram — not as a general section tag. Using
 * tracked-out uppercase mono as the *default* label style everywhere was
 * the exact "AI-generated finance site" tell this project moved away from;
 * using it here, sparingly, for something that is genuinely mimicking a
 * report's figure numbering, is a different and narrower claim.
 *
 * `number` is supplied by the caller rather than auto-incremented — each
 * page has only a handful of exhibits, added deliberately, so explicit
 * numbering is simpler and more legible than a counting context.
 */
export function Exhibit({
  number,
  label,
  caption,
  children,
  className = "",
  variant = "light",
}: {
  number: number;
  label: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * "dark" swaps the label/caption to the vsc-dark surface tokens instead
   * of the shared .exhibit__label / .exhibit__caption CSS — that CSS is
   * hardcoded to var(--growth) / var(--ink-faint) outside any Tailwind
   * layer, so a className override can't reach it. Default "light" is
   * byte-identical to before this prop existed.
   */
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <figure className={`exhibit ${className}`}>
      <div
        className={
          isDark
            ? "mb-4 border-b border-vsc-dark-hairline pb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-vsc-dark-accent"
            : "exhibit__label"
        }
      >
        Exhibit {String(number).padStart(2, "0")} · {label}
      </div>
      <div className="exhibit__art">{children}</div>
      {caption && (
        <figcaption
          className={isDark ? "mt-3.5 font-mono text-[12px] leading-[1.6] text-vsc-dark-ink-muted" : "exhibit__caption"}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
