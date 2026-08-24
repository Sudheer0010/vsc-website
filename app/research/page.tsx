import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

import { frameworkLibrary, books, annualLetters, talks, newsletterConfig, researchNotes } from "@/data";

import { BlogHero } from "@/components/sections/blog/BlogHero";
import { FeaturedPublication } from "@/components/sections/blog/FeaturedPublication";
import { RecentLetters } from "@/components/sections/blog/RecentLetters";
import { LatestInsight } from "@/components/sections/blog/LatestInsight";
import { FrameworkLibrarySection } from "@/components/sections/blog/FrameworkLibrarySection";
import { UtilityStrip } from "@/components/sections/blog/UtilityStrip";
import { NewsletterCTA } from "@/components/sections/blog/NewsletterCTA";

const JUMP_LINKS = [
  { href: "#letters", label: "Letters" },
  { href: "#trading-insights", label: "Trading Insights" },
  { href: "#framework-library", label: "Frameworks" },
  { href: "#tools", label: "Tools" },
  { href: "#reading-desk", label: "Reading Desk" },
];

/**
 * A wayfinding strip, not a tab bar — plain text separated by middle dots,
 * relying on the page's own anchor ids and the site-wide smooth scroll
 * (html { scroll-behavior: smooth }, see app/globals.css) to move the
 * reader without any client-side JS.
 */
function SectionJumpNav() {
  return (
    <nav
      aria-label="Jump to section"
      className="mb-16 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-y border-rule py-4 font-mono text-[13px]"
    >
      {JUMP_LINKS.map((item, i) => (
        <React.Fragment key={item.href}>
          {i > 0 && (
            <span aria-hidden="true" className="text-ink-faint">
              &middot;
            </span>
          )}
          <a href={item.href} className="text-ink-muted transition-colors duration-200 hover:text-growth">
            {item.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
}

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

export default function ResearchHub() {
  const notesCount = researchNotes.length;
  const totalLetters = sortedMonths.length;
  const frameworksCount = frameworkLibrary.length;
  const readingCount = books.length + annualLetters.length + talks.length;
  const featuredLetter = marketLetters[sortedMonths[0]];
  const latestNote = researchNotes[researchNotes.length - 1];

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

          <SectionJumpNav />

          {/* TIME-BOUND — what we observed: Market Letters, Trading Insights */}
          <GroupLabel>Time-bound — what we observed</GroupLabel>

          <div id="letters" className="scroll-mt-24">
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
          </div>

          {latestNote && <LatestInsight note={latestNote} />}

          {/* TIMELESS — what we believe: Frameworks, Tools, Reading */}
          <GroupLabel>Timeless — what we believe</GroupLabel>

          <FrameworkLibrarySection frameworks={frameworkLibrary} />

          <UtilityStrip readingCount={readingCount} />

          <div className="pt-6">
            <NewsletterCTA newsletterConfig={newsletterConfig} />
          </div>

        </div>
      </main>
    </div>
  );
}
