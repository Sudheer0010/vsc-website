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
    <div className="max-w-[850px] text-left mb-16 select-none animate-fade-in">
      <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-4 block font-semibold">
        THE RESEARCH JOURNAL
      </span>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] font-normal tracking-tight mb-4 text-white">
        Market Letters & Research
      </h1>
      <blockquote className="font-display text-2xl sm:text-3xl text-accent-gold font-normal italic border-l-2 border-accent-gold pl-4 py-1 mb-6">
        &ldquo;We don&apos;t publish news. We publish thinking.&rdquo;
      </blockquote>
      <p className="font-mono text-sm leading-relaxed text-text-secondary max-w-[650px] mb-8">
        A growing collection of research, market letters, investment frameworks and carefully curated resources designed to help investors think independently.
      </p>

      {/* Dynamic Statistics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5 max-w-[760px]">
        <StatCard label="Research Notes" value={notesCount} />
        <StatCard label="Market Letters" value={totalLetters} />
        <StatCard label="Framework Guides" value={frameworksCount} />
        <StatCard label="Curated Readings" value={readingCount} />
      </div>
    </div>
  );
}
