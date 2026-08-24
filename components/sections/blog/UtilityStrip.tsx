import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface UtilityStripProps {
  readingCount: number;
}

/**
 * Risk Tools and Reading Desk used to be two identical "paragraph + link"
 * blocks stacked vertically — the same pattern repeated for content that
 * isn't actually similar in shape. A compact 2-up strip gives each its own
 * clearly bordered destination without escalating into a card grid.
 */
export function UtilityStrip({ readingCount }: UtilityStripProps) {
  const tiles = [
    {
      id: "tools",
      meta: "5 tools",
      title: "Risk Tools",
      description: "Practical calculators built around the VSC process.",
      href: "/tools",
      cue: "5 practical tools",
    },
    {
      id: "reading-desk",
      meta: `${readingCount} items`,
      title: "Reading Desk",
      description: "Books, letters and talks that shaped the framework.",
      href: "/reading",
      cue: "Curated reading",
    },
  ];

  return (
    <div className="border-t border-rule py-12">
      <div className="grid gap-4 sm:grid-cols-2">
        {tiles.map((tile) => (
          <Link
            key={tile.id}
            id={tile.id}
            href={tile.href}
            className="group flex scroll-mt-24 flex-col rounded-vsc-lg border border-rule bg-surface p-5 transition-colors duration-200 hover:border-growth/40 sm:p-6"
          >
            <span className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {tile.meta}
            </span>
            <h3 className="font-display text-xl font-medium text-ink transition-colors duration-200 group-hover:text-growth-deep sm:text-2xl">
              {tile.title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{tile.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-semibold text-growth">
              {tile.cue}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
