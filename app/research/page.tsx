import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

import { frameworkLibrary, books, annualLetters, talks, newsletterConfig, researchNotes } from "@/data";

import { BlogHero } from "@/components/sections/blog/BlogHero";
import { FeaturedPublication } from "@/components/sections/blog/FeaturedPublication";
import { RecentLetters } from "@/components/sections/blog/RecentLetters";
import { FrameworkLibrarySection } from "@/components/sections/blog/FrameworkLibrarySection";
import { NewsletterCTA } from "@/components/sections/blog/NewsletterCTA";

/**
 * TIME-BOUND / TIMELESS (Architecture doc §1) — a label, not a navigation
 * layer. It marks which group a section belongs to without adding a click
 * a reader never needed to make.
 */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 select-none">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
        {children}
      </span>
      <div className="h-px flex-1 bg-rule" />
    </div>
  );
}

/**
 * "A hub that introduces and links to all four" (§11) — one paragraph and
 * a link, not a duplicated grid. The full, filterable list lives at its
 * own URL; repeating the cards here would just be the same content twice.
 */
function SectionIntro({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="border-t border-rule py-12 first:border-t-0">
      <h2 className="mb-3 font-display text-2xl font-normal text-ink sm:text-3xl">{title}</h2>
      <p className="mb-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">{description}</p>
      <Link href={href} className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-growth">
        {linkLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export default function ResearchHub() {
  const notesCount = researchNotes.length;
  const totalLetters = sortedMonths.length;
  const frameworksCount = frameworkLibrary.length;
  const readingCount = books.length + annualLetters.length + talks.length;
  const featuredLetter = marketLetters[sortedMonths[0]];

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[50%] top-[1000px] scale-[1.4]" />

      <main className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="container max-w-[1200px]">

          <BlogHero
            notesCount={notesCount}
            totalLetters={totalLetters}
            frameworksCount={frameworksCount}
            readingCount={readingCount}
          />

          {/* New here? A quiet pointer to the guided path, not a full-width panel. */}
          <div className="mb-16">
            <Link
              href="/start"
              className="group inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors duration-200 hover:text-growth"
            >
              New to VSC? Start here
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* TIME-BOUND — what we observed: Market Letters, Notes */}
          <GroupLabel>Time-bound — what we observed</GroupLabel>

          {featuredLetter && (
            <FeaturedPublication
              featuredLetter={featuredLetter}
              latestMonthKey={sortedMonths[0]}
            />
          )}

          <RecentLetters
            monthKeys={sortedMonths.slice(1, 5)}
            marketLetters={marketLetters}
          />

          <div className="pb-4 pt-2 text-right">
            <Link
              href="/letters"
              className="font-mono text-xs font-semibold text-accent-gold transition-colors duration-200 hover:text-accent-gold-light"
            >
              View the full letter archive &rarr;
            </Link>
          </div>

          <SectionIntro
            title="Trading Insights"
            description="Trading ideas you can actually use — one market behaviour at a time, with evidence and limits."
            href="/research/notes"
            linkLabel="Browse notes"
          />

          {/* TIMELESS — what we believe: Frameworks, Reading */}
          <GroupLabel>Timeless — what we believe</GroupLabel>

          <FrameworkLibrarySection frameworks={frameworkLibrary} />

          <SectionIntro
            title="Reading Desk"
            description="Books, annual letters, and talks that shaped the framework — hand-picked, not generated."
            href="/reading"
            linkLabel="Open the reading desk"
          />

          <div className="pt-8">
            <NewsletterCTA newsletterConfig={newsletterConfig} />
          </div>

        </div>
      </main>
    </div>
  );
}
