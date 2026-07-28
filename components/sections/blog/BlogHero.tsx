import React from "react";
import Image from "next/image";
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
    <section className="relative w-full min-h-[80vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-24 -mt-32 sm:-mt-40 mb-16 overflow-hidden select-none border-b border-white/[0.04] z-10">
      {/* Full-Bleed User Library Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/vsc_blog_library_hero.jpg"
          alt="VSC Research Library Bookshelves"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-[1.05] brightness-[0.82]"
        />
        {/* Tuned Scrim Overlay preserving image visibility & high text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#05070D] via-[#05070D]/80 via-[42%] to-[#05070D]/35 z-10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-[#05070D]/60 z-10"
        />
      </div>

      <div className="container relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 my-auto">
        <div className="max-w-[850px] text-left">
          <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-4 block font-bold drop-shadow-sm">
            THE RESEARCH JOURNAL
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.06] font-normal tracking-tight mb-5 text-white drop-shadow-lg">
            Market Letters & Research
          </h1>
          <blockquote className="font-display text-2xl sm:text-3xl text-accent-gold font-normal italic border-l-2 border-accent-gold pl-4 py-1 mb-6 drop-shadow-md">
            &ldquo;We don&apos;t publish news. We publish thinking.&rdquo;
          </blockquote>
          <p className="font-mono text-sm sm:text-base leading-relaxed text-white/80 max-w-[650px] mb-10 drop-shadow-sm">
            A growing collection of research, market letters, investment frameworks and carefully curated resources designed to help investors think independently.
          </p>

          {/* Dynamic Statistics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 max-w-[760px] bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/5">
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
