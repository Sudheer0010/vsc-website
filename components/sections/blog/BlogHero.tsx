import React from "react";
import { StatCard } from "@/components/ui/StatCard";

interface BlogHeroProps {
  notesCount: number;
  totalLetters: number;
  frameworksCount: number;
  readingCount: number;
}

export function BlogHero({
  notesCount,
  totalLetters,
  frameworksCount,
  readingCount,
}: BlogHeroProps) {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-24 -mt-32 sm:-mt-40 mb-16 overflow-hidden select-none border-b border-rule z-10">
      {/* Paper grain, not a photo — vsc_blog_library_hero.jpg was a stock
          bookshelf shot that didn't say anything the headline and quote
          weren't already saying, and it competed with the stats row for
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
        className="pointer-events-none absolute -right-32 top-1/2 z-0 h-[620px] w-[620px] -translate-y-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(15,122,64,0.12) 0%, transparent 70%)" }}
      />

      <div className="container relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-[850px] text-left">
          <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-4 block font-bold">
            THE RESEARCH JOURNAL
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.06] font-normal tracking-tight mb-5 text-ink">
            Market Letters & Research
          </h1>
          <blockquote className="font-display text-2xl sm:text-3xl text-accent-gold font-normal italic border-l-2 border-accent-gold pl-4 py-1 mb-6">
            &ldquo;We don&apos;t publish news. We publish thinking.&rdquo;
          </blockquote>
          <p className="font-mono text-sm sm:text-base leading-relaxed text-ink-soft max-w-[650px] mb-10">
            A growing collection of research, market letters, investment frameworks and carefully curated resources designed to help investors think independently.
          </p>

          {/* Dynamic Statistics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-rule max-w-[760px] bg-surface  p-6 rounded-xl border border-rule">
            <StatCard label="Research Notes" value={notesCount} />
            <StatCard label="Market Letters" value={totalLetters} />
            <StatCard label="Framework Guides" value={frameworksCount} />
            <StatCard label="Curated Readings" value={readingCount} />
          </div>
        </div>
      </div>
    </section>
  );
}
