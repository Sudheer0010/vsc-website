import React from "react";

/**
 * The VSC signature mark: three ascending bars.
 *
 * This is the one graphic element that should make the site identifiable
 * with the logo removed. It replaces the gold hairline as the thing that
 * marks a section, punctuates a heading, or stands in for "VSC" inline.
 *
 * It means what the company means — measured, stepwise growth — so it is
 * allowed to appear often. Everything else earns its place individually.
 */
export function StepRule({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const heights = {
    sm: ["5px", "8px", "11px"],
    md: ["7px", "11px", "16px"],
    lg: ["11px", "17px", "24px"],
  }[size];

  const widths = { sm: "2px", md: "3px", lg: "4px" }[size];

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-end gap-[3px] ${className}`}
    >
      {heights.map((h, i) => (
        <span
          key={h}
          className="block rounded-[2px] bg-growth"
          style={{ height: h, width: widths, opacity: [0.4, 0.68, 1][i] }}
        />
      ))}
    </span>
  );
}
