import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The related-reading block for calculator pages.
 *
 * Every tool page previously had exactly one outbound internal link — the
 * "All tools" back-link — so the calculators sat as leaves with no path into
 * the framework that explains the decision each one supports, and no path
 * between calculators used in the same workflow. That left the site's most
 * linkable pages contributing nothing to internal link structure.
 */
export type RelatedLink = { href: string; label: string; note: string };

export function RelatedLinks({
  frameworks,
  tools,
}: {
  frameworks: RelatedLink[];
  tools: RelatedLink[];
}) {
  return (
    <section className="mt-12 border-t border-rule pt-8">
      <h2 className="text-step-2">Related reading</h2>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            The framework behind it
          </h3>
          <ul className="mt-3 flex flex-col gap-3">
            {frameworks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-baseline gap-1.5 text-[15px] font-semibold text-growth hover:text-growth-deep"
                >
                  {l.label}
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 self-center transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <p className="mt-1 max-w-[46ch] text-[14px] leading-relaxed text-ink-muted">{l.note}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            Use with
          </h3>
          <ul className="mt-3 flex flex-col gap-3">
            {tools.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-baseline gap-1.5 text-[15px] font-semibold text-growth hover:text-growth-deep"
                >
                  {l.label}
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 self-center transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <p className="mt-1 max-w-[46ch] text-[14px] leading-relaxed text-ink-muted">{l.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Shared "what the number means" block. */
export function ReadTheResult({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-step-2">How to read the result</h2>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

export function ReadItem({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="rounded-vsc-lg border border-rule bg-surface p-5 shadow-lift-1">
      <dt className="text-[15px] font-semibold text-ink">{term}</dt>
      <dd className="mt-2 text-[14px] leading-relaxed text-ink-muted">{children}</dd>
    </div>
  );
}
