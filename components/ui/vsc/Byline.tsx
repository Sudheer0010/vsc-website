import React from "react";

/**
 * "A research publication whose pieces are unsigned is the one format
 * convention this site has not yet adopted" (v2.2 §3). One component so
 * every market letter and research note carries the same author line,
 * scaled to context — full form on the letter itself, compact on the
 * preview cards that point to it.
 */
export function Byline({
  variant = "compact",
  className = "",
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  if (variant === "full") {
    return (
      <p className={`text-left font-mono text-[11px] text-ink-muted ${className}`}>
        Written by Sudheer Vobhilineni · Founder, VSC Capital &amp; Advisory
      </p>
    );
  }

  return (
    <span className={`font-mono text-[10px] text-ink-faint ${className}`}>
      By Sudheer Vobhilineni
    </span>
  );
}
