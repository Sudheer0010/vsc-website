import React from "react";
import Link from "next/link";
import { Framework } from "@/types/framework";
import { frameworkHref } from "@/lib/framework-urls";

interface FrameworkLibrarySectionProps {
  frameworks: Framework[];
}

/**
 * The dark surface standard (Five Gates, About, Offerings, Inner Circle)
 * applied here as a self-contained panel rather than a full-bleed section
 * — this page keeps every section inside one max-w-[1200px] container, so
 * a full-bleed break-out would be a layout change this task doesn't ask
 * for. Same tokens either way.
 *
 * Can't reuse the shared `.eyebrow` class for "Evergreen systems": its
 * colour is hardcoded to var(--growth) outside any Tailwind layer, so it
 * always wins over a text-vsc-dark-accent utility regardless of source
 * order. Reproduced locally at the same size/weight/spacing instead —
 * the same fix already used for the other dark-surface rollouts.
 *
 * This is now the ONLY framework listing on the site — the old
 * /frameworks index page (and its "Browse the framework library" link)
 * is gone, redirected here. The five rows below are the library; there's
 * nowhere further to browse to.
 */
export function FrameworkLibrarySection({ frameworks }: FrameworkLibrarySectionProps) {
  return (
    <div id="framework-library" className="my-8 scroll-mt-24 sm:my-10">
      <div className="rounded-2xl bg-vsc-dark px-6 py-10 sm:px-10 sm:py-12">
        <span className="mb-3 inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.01em] text-vsc-dark-accent">
          <span aria-hidden="true" className="h-0.5 w-[18px] shrink-0 rounded-full bg-vsc-dark-accent" />
          Evergreen systems
        </span>

        <h2 className="mb-3 font-display text-2xl font-normal text-vsc-dark-ink sm:text-3xl">
          Framework Library
        </h2>

        <p className="mb-1.5 max-w-[58ch] text-[16px] leading-relaxed text-vsc-dark-ink">
          Five frameworks, in order. Each one answers one question. The output of each becomes the input for the next.
        </p>
        <p className="mb-8 max-w-[58ch] text-[14px] leading-relaxed text-vsc-dark-ink-muted">
          Versioned and dated — when a framework changes, the old version stays reachable and the page says what changed and why.
        </p>

        <div className="divide-y divide-vsc-dark-hairline border-t border-vsc-dark-hairline">
          {frameworks.map((fw, i) => (
            <Link
              key={fw.slug}
              href={frameworkHref(fw)}
              className="group flex items-start gap-4 py-5 sm:gap-6"
            >
              <span className="shrink-0 font-mono text-sm text-vsc-dark-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-display text-lg font-medium text-vsc-dark-ink transition-colors duration-200 group-hover:text-white sm:text-xl">
                  {fw.title}
                </div>
                <p className="mt-1 text-[15px] leading-snug text-vsc-dark-ink-muted">
                  {fw.question}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
