import { Fragment } from "react";
import { frameworkLibrary } from "@/data/frameworks";

/**
 * Compact horizontal wayfinding strip — where this page sits in the
 * five-stage pipeline, nothing more. Deliberately lighter than an Exhibit
 * (no number, no label, thinner chrome): the pipeline is navigation, not
 * payoff, and shouldn't compete with a framework's own hero exhibit for
 * visual weight. Every framework page from 02 onward uses this same strip;
 * only `activeIndex` changes.
 *
 * Stage titles come from `frameworkLibrary` rather than being duplicated
 * here, so the strip can't drift out of sync with the library itself.
 */
export function PipelineStrip({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="rounded-vsc-lg border border-rule bg-canvas-sunk px-5 py-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2.5">
        {frameworkLibrary.map((fw, i) => {
          const isActive = i === activeIndex;
          return (
            <Fragment key={fw.slug}>
              <span
                className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                  isActive ? "text-growth" : "text-ink-faint"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                    isActive
                      ? "bg-growth text-canvas"
                      : "border border-rule-strong text-ink-faint"
                  }`}
                >
                  {i + 1}
                </span>
                {fw.title}
              </span>
              {i < frameworkLibrary.length - 1 && (
                <span className="text-ink-faint" aria-hidden="true">
                  →
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
