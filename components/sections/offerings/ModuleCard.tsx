import React from "react";
import { LucideIcon, CheckCircle2 } from "lucide-react";

/**
 * One accent system, enforced structurally (v2.1 §2.1) — this component
 * takes no colour prop. The six-hue-per-module system it replaces (blue,
 * cyan, yellow, purple, magenta, green, one per module, on three separate
 * pages) made every sub-page look like a different product designed by a
 * different team. There is now exactly one way to colour a module card,
 * so a future edit can't accidentally reintroduce per-module hues — the
 * component simply has nowhere to put one.
 *
 * Card chrome uses the site's shared card token (border-rule, shadow-
 * lift-1, rounded-vsc-lg) instead of SpotlightCard's heavier drop shadow
 * and larger radius — the specific "cards look heavier here than
 * elsewhere" complaint from v2.1 §2.4.
 */
export function ModuleCard({
  number,
  title,
  icon: Icon,
  items,
}: {
  number: string;
  title: string;
  icon: LucideIcon;
  items: string[];
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-vsc-lg border border-rule bg-surface p-7 shadow-lift-1 transition-[box-shadow,border-color,transform] duration-200 ease-physical hover:-translate-y-1 hover:border-rule-strong hover:shadow-lift-2 sm:p-8">
      <div>
        <div className="mb-6 flex items-center justify-between border-b border-rule pb-4">
          <Icon className="h-6 w-6 stroke-[1.5] text-ink" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-faint">
            {number}
          </span>
        </div>

        <h3 className="mb-5 font-display text-xl font-medium text-ink sm:text-2xl">
          {title}
        </h3>

        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-ink-soft">
              <CheckCircle2 className="mt-0.5 h-[14px] w-[14px] shrink-0 text-growth" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
