import React from "react";

/**
 * Type A, horizontal — one component, two uses (Learning Hub's six-module
 * curriculum, Inner Circle's four-stage month). Same numbered-circle-and-
 * hairline grammar as Home's Five Gates and About's vertical rail; this is
 * the third place it appears, which is the point — repetition of form is
 * what makes the site's exhibits read as one system instead of six
 * unrelated diagrams that happen to share a colour palette.
 */
export function HorizontalRail({
  steps,
  variant = "light",
}: {
  steps: string[];
  /** "dark" swaps the connecting line, circles, and labels to the vsc-dark
   *  surface tokens. Default "light" is byte-identical to before this prop
   *  existed — Learning Hub's curriculum rail keeps using it unchanged. */
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative flex min-w-[560px] justify-between gap-2">
        <div
          aria-hidden="true"
          className={`absolute left-[20px] right-[20px] top-5 h-px ${isDark ? "bg-vsc-dark-hairline" : "bg-rule"}`}
        />
        {steps.map((label, i) => (
          <div key={label} className="relative z-10 flex flex-1 flex-col items-center text-center">
            <span
              className={
                isDark
                  ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-vsc-dark-accent bg-vsc-dark text-[13px] font-bold tabular-nums text-vsc-dark-accent"
                  : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-growth bg-canvas text-[13px] font-bold tabular-nums text-growth-deep"
              }
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`mt-3 max-w-[12ch] text-[13px] font-medium leading-tight ${isDark ? "text-vsc-dark-ink" : "text-ink"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
