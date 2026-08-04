import React from "react";
import { Exhibit } from "@/components/ui/vsc/Exhibit";

interface BlogHeroProps {
  notesCount: number;
  totalLetters: number;
  frameworksCount: number;
  readingCount: number;
}

/**
 * The four stats used to be a small bordered card floating below the
 * headline — real numbers, demoted to decoration. They're the hero's
 * visual now: a Type E treatment, large enough to read as the point of
 * this half of the page rather than a footnote to it.
 */
export function BlogHero({
  notesCount,
  totalLetters,
  frameworksCount,
  readingCount,
}: BlogHeroProps) {
  const stats = [
    { value: notesCount, label: "Research notes" },
    { value: totalLetters, label: "Market letters" },
    { value: frameworksCount, label: "Framework guides" },
    { value: readingCount, label: "Curated readings" },
  ];

  return (
    <section className="relative w-full min-h-[80vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-24 -mt-32 sm:-mt-40 mb-16 overflow-hidden select-none border-b border-rule z-10">
      {/* Paper grain, not a photo — vsc_blog_library_hero.jpg was a stock
          bookshelf shot that didn't say anything the headline and quote
          weren't already saying, and it competed with the stats for
          attention. Same treatment as the other reworked heroes. */}
      <div
        aria-hidden="true"
        className="paper-texture pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 75% at 68% 40%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 68% 40%, #000 20%, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 z-0 h-[560px] w-[560px] -translate-y-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(15,122,64,0.10) 0%, transparent 70%)" }}
      />

      <div className="container relative z-20 mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* --- The claim --------------------------------------------- */}
          <div className="lg:col-span-6">
            <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-4 block font-bold">
              THE RESEARCH JOURNAL
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.06] font-normal tracking-tight mb-5 text-ink">
              Market Letters & Research
            </h1>
            <blockquote className="font-display text-xl sm:text-2xl text-accent-gold font-normal italic border-l-2 border-accent-gold pl-4 py-1 mb-6">
              &ldquo;I don&apos;t publish news. I publish thinking.&rdquo;
            </blockquote>
            <p className="font-mono text-sm sm:text-base leading-relaxed text-ink-soft max-w-[560px]">
              A growing collection of research, market letters, investment frameworks and carefully curated resources designed to help investors think independently.
            </p>
          </div>

          {/* --- The evidence -------------------------------------------
              Exhibit 01: four numbers, large enough to be the visual. */}
          <div className="lg:col-span-6">
            <Exhibit
              number={1}
              label="Research output"
              caption="Counts reflect what's published on this site today, not a target or a promise of future output."
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-2 sm:p-8"
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-[clamp(48px,7vw,88px)] font-semibold leading-none tracking-tight text-growth tabular-nums">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[13.5px] font-medium text-ink-soft">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Exhibit>
          </div>
        </div>
      </div>
    </section>
  );
}
