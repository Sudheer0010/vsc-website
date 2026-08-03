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
}: {
  number: number;
  label: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`exhibit ${className}`}>
      <div className="exhibit__label">
        Exhibit {String(number).padStart(2, "0")} · {label}
      </div>
      <div className="exhibit__art">{children}</div>
      {caption && <figcaption className="exhibit__caption">{caption}</figcaption>}
    </figure>
  );
}
