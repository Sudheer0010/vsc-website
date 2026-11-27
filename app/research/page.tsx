import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import {
  marketLetters,
  sortedMonths,
  researchNotes,
  books,
  annualLetters,
  talks,
  newsletterConfig,
} from "@/data";
import { getReadingTime } from "@/lib/reading-time";
import { formatLongDate } from "@/lib/format-date";
import { letterHref } from "@/lib/letter-urls";
import { toolCount } from "@/data/tools";
import { FrameworkLibraryFunnel } from "@/components/sections/research/FrameworkLibraryFunnel";
import { ContentsRail } from "@/components/sections/research/ResearchContentsRail";
import { LetterDeck, type LetterDeckItem } from "@/components/sections/research/LetterDeck";

/**
 * Research — Reading Desk.
 *
 * Same Cinematic Signal / Luminous Editorial language as Home/About/
 * Offerings (ContourField seed 71, Reveal springs, StepRule, font-editorial
 * italic accent) instead of the previous cream-and-card-grid system. Ported
 * from the /design-lab/research prototype.
 *
 * Research is not a decision funnel, it is the index for VSC's actual
 * publishing record — so the page leans on real dates, real counts and real
 * reading times (all read from the same data/ modules the previous page
 * read from) rather than a persuasive narrative arc. Nothing below is
 * invented copy; every number, title and link comes from data/ or lib/.
 *
 * IA change from the previous version: "Risk Tools" and "Reading Desk" —
 * two identical bordered cards — are merged into one two-drawer "Shelf"
 * panel (#shelf, with #tools and #reading-desk anchors inside it) so the
 * utility layer reads as one connected apparatus instead of two unrelated
 * tiles. Everything else keeps its section identity: Letters and Trading
 * Insights stay under "Time-bound — what we observed", Frameworks and the
 * Shelf stay under "Timeless — what we believe".
 */


function monthName(month: string) {
  return month.charAt(0) + month.slice(1).toLowerCase();
}

export default function ResearchHub() {
  const letterDeckItems: LetterDeckItem[] = sortedMonths
    .slice(0, 5)
    .flatMap((key, index) => {
      const letter = marketLetters[key];
      if (!letter) return [];
      return [
        {
          key,
          letterNumber: letter.letterNumber,
          paddedNumber: String(letter.letterNumber).padStart(3, "0"),
          monthName: monthName(letter.month),
          year: letter.year,
          thesis: letter.thesis,
          excerpt: letter.pullQuote ?? letter.thesis,
          formattedDate: formatLongDate(letter.publishedDate),
          readTime: getReadingTime(letter),
          href: letterHref(key),
          isLatest: index === 0,
        },
      ];
    });

  const latestInsights = researchNotes.slice(-3).reverse();
  const leadInsight = latestInsights[0];
  const secondaryInsights = latestInsights.slice(1);
  const readingCount = books.length + annualLetters.length + talks.length;

  return (
    <main className="relative w-full bg-canvas">
      {/* ================================================================
          1. EDITORIAL MASTHEAD — asymmetric, type-led periodical header.
          Full-width dark forest ink canvas with Signal contour lines,
          a top colophon hairline punctuated by the VSC StepRule, a
          dominant Bricolage Grotesque display statement + italic serif
          thesis on the left, and a restrained marginalia manifesto +
          hairline editorial actions on the right.
         ================================================================ */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#080F0B] pb-14 pt-28 sm:pb-16 sm:pt-32">
        <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.82} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 58% 60% at 78% 18%, rgba(63,203,116,0.17) 0%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">
          {/* Masthead colophon bar */}
          <Reveal distance={8}>
            <div className="flex items-center justify-between gap-6 border-b border-white/12 pb-4">
              <div className="flex items-center gap-3">
                <StepRule size="sm" />
                <span className="text-[13px] font-semibold tracking-[0.02em] text-[#7FB999]">
                  The Research Journal
                </span>
              </div>
              <span className="hidden text-[13px] text-white/50 sm:inline">
                Process over prediction &middot; Published unedited
              </span>
            </div>
          </Reveal>

          {/* Main asymmetric masthead composition */}
          <div className="grid gap-8 pt-8 sm:pt-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <Reveal delay={0.05} distance={14}>
                <h1 className="font-display text-[clamp(2.45rem,4.7vw,4.3rem)] font-bold leading-[0.95] tracking-[-0.035em] text-[#F4F7F4]">
                  Where VSC thinks
                  <span className="block">in public.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.11} distance={10}>
                <blockquote className="font-editorial mt-6 max-w-[38ch] text-[20px] leading-snug text-[#7FB999] [font-style:italic] sm:text-[24px]">
                  &ldquo;We don&apos;t publish news. We publish thinking.&rdquo;
                </blockquote>
              </Reveal>
            </div>

            <Reveal
              delay={0.14}
              distance={12}
              className="border-t border-white/10 pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:border-white/12 lg:pl-8 lg:pt-1"
            >
              <p className="max-w-[34ch] text-[16px] leading-relaxed text-white/75">
                Public frameworks, unedited monthly records and decision tools &mdash; documented in real time, before
                outcomes are known.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href="#letters"
                  className="group inline-flex min-h-[44px] items-center gap-2.5 border-b border-[#7FB999]/65 pb-1 font-ui text-[15px] font-semibold text-[#F4F7F4] transition-colors duration-200 hover:border-[#7FB999] hover:text-[#7FB999]"
                >
                  Explore research
                  <ArrowDown
                    className="h-4 w-4 text-[#7FB999] transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
                <Link
                  href="/start"
                  className="group inline-flex min-h-[44px] items-center gap-2 pb-1 text-[14.5px] font-medium text-white/75 transition-colors duration-200 hover:text-[#7FB999]"
                >
                  New to VSC? Start here
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. CONTENTS — a real index, not a tab bar: plain anchors with a
          spring-driven active marker (scrollspy) so a reader always knows
          which chapter of the journal they're currently in.
         ================================================================ */}
      <section className="relative w-full border-b border-rule bg-canvas py-4 sm:py-5">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <ContentsRail />
        </div>
      </section>

      {/* ================================================================
          3. MARKET LETTERS — The Letter Deck: ~60:40 split pairing the
          featured letter preview on the left with a tactile wallet stack
          of the latest five editions on the right. Height stays fixed.
         ================================================================ */}
      <section id="letters" className="relative w-full scroll-mt-24 border-b border-rule bg-canvas py-10 sm:py-11">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-4">
            <div>
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
                Time-bound — what we observed
              </span>
              <h2 className="font-editorial mt-2 text-[clamp(1.85rem,2.8vw,2.5rem)] leading-[1.05] text-ink [font-style:italic]">
                Market Letters
              </h2>
            </div>
            <Link
              href="/letters"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 font-mono text-[13px] font-semibold text-growth transition-colors hover:text-growth-deep"
            >
              Full archive
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-5">
            <LetterDeck items={letterDeckItems} />
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          4. TRADING INSIGHTS — asymmetric editorial presentation: latest
          insight featured prominently on the left, paired with a compact
          ruled index of the next two insights on the right (capped at 3
          total previews, with full archive always accessible in header).
         ================================================================ */}
      <section
        id="trading-insights"
        className="relative w-full scroll-mt-24 border-b border-rule bg-canvas-sunk py-14 sm:py-16"
      >
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5">
            <div>
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
                Time-bound — what we observed
              </span>
              <h2 className="font-editorial mt-2 text-[clamp(1.85rem,2.8vw,2.5rem)] leading-[1.05] text-ink [font-style:italic]">
                Trading Insights
              </h2>
              <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">
                Ideas from the market, distilled into something useful &mdash; shorter and more tactical than a Market
                Letter.
              </p>
            </div>
            <Link
              href="/research/notes"
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 font-mono text-[13px] font-semibold text-growth transition-colors hover:text-growth-deep"
            >
              Browse all Trading Insights
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Reveal>

          {leadInsight && (
            <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:items-stretch">
              <Reveal className={secondaryInsights.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
                <Link
                  href={`/research/notes/${leadInsight.slug}`}
                  className="group flex h-full flex-col justify-between rounded-vsc-xl border border-rule bg-surface p-7 shadow-lift-1 transition-[border-color,box-shadow] duration-200 hover:border-growth/40 hover:shadow-lift-2 sm:p-8"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-growth-tint px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-growth-deep">
                          Latest &middot; Insight {leadInsight.number}
                        </span>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
                          {leadInsight.category}
                        </span>
                      </div>
                      <span className="whitespace-nowrap font-mono text-[11px] text-ink-faint">
                        {leadInsight.publishedDate} &middot; {leadInsight.readingTime}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[clamp(1.4rem,2.1vw,1.8rem)] font-medium leading-[1.15] text-ink transition-colors duration-200 group-hover:text-growth-deep">
                      {leadInsight.title}
                    </h3>

                    <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-ink-soft">
                      {leadInsight.subtitle}
                    </p>

                    {leadInsight.thesis && leadInsight.thesis !== leadInsight.subtitle && (
                      <p className="mt-4 border-l-2 border-growth/40 pl-3.5 font-editorial text-[16.5px] leading-snug text-ink [font-style:italic]">
                        &ldquo;{leadInsight.thesis}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-rule/80 pt-4">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[12.5px] font-semibold text-growth">
                      Read insight
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {secondaryInsights.length > 0 && (
                <Reveal delay={0.06} className="lg:col-span-5">
                  <div className="flex h-full flex-col divide-y divide-rule rounded-vsc-xl border border-rule bg-surface-warm/90 px-6 shadow-lift-1">
                    {secondaryInsights.map((note) => (
                      <Link
                        key={note.slug}
                        href={`/research/notes/${note.slug}`}
                        className="group flex flex-1 flex-col justify-between gap-2 py-5 transition-colors"
                      >
                        <div>
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-growth">
                              Insight {note.number} &middot; {note.category}
                            </span>
                            <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-ink-faint">
                              {note.readingTime}
                            </span>
                          </div>
                          <h3 className="mt-2 font-display text-[18px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep sm:text-[19px]">
                            {note.title}
                          </h3>
                          <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-ink-muted">
                            {note.subtitle}
                          </p>
                        </div>

                        <span className="mt-1 inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[12px] font-semibold text-growth">
                          Read insight
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          5. FRAMEWORK LIBRARY — decision funnel, ported from the
          /design-lab/research-frameworks prototype. See
          FrameworkLibraryFunnel.tsx for the full rationale.
         ================================================================ */}
      <FrameworkLibraryFunnel />

      {/* ================================================================
          6. THE SHELF — Risk Tools and Reading Desk as two drawers of one
          bordered apparatus (shared border, shared shadow, split by an
          internal rule) instead of two identical, separately-floating
          cards.
         ================================================================ */}
      <section id="shelf" className="relative w-full scroll-mt-24 border-b border-rule bg-canvas py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal>
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
              Timeless — what we believe
            </span>
            <h2 className="font-editorial mt-4 max-w-[16ch] text-[11vw] leading-[1.05] text-ink [font-style:italic] sm:text-[5.5vw] lg:text-[2.8vw]">
              The Shelf
            </h2>
            <p className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-ink-soft">
              The practical half of the library — calculators built around the process, and the books, letters and
              talks that shaped it.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-14 sm:mt-16">
            <div className="grid overflow-hidden rounded-vsc-xl border border-rule bg-surface shadow-lift-1 sm:grid-cols-2">
              <Link
                id="tools"
                href="/tools"
                className="group flex scroll-mt-24 flex-col justify-between gap-6 border-b border-rule p-8 transition-colors duration-200 hover:bg-growth-wash sm:border-b-0 sm:border-r sm:p-10"
              >
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                    Shelf 01 &middot; {toolCount} tools
                  </span>
                  <h3 className="mt-3 font-display text-[24px] font-medium text-ink transition-colors duration-200 group-hover:text-growth-deep sm:text-[28px]">
                    Risk Tools
                  </h3>
                  <p className="mt-2 max-w-[36ch] text-[14.5px] leading-relaxed text-ink-muted">
                    Practical calculators built around the VSC process — position sizing, risk and expectancy.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 font-mono text-[12.5px] font-semibold text-growth">
                  Open the tools
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                id="reading-desk"
                href="/reading"
                className="group flex scroll-mt-24 flex-col justify-between gap-6 p-8 transition-colors duration-200 hover:bg-growth-wash sm:p-10"
              >
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                    Shelf 02 &middot; {readingCount} items
                  </span>
                  <h3 className="mt-3 font-display text-[24px] font-medium text-ink transition-colors duration-200 group-hover:text-growth-deep sm:text-[28px]">
                    Reading Desk
                  </h3>
                  <p className="mt-2 max-w-[36ch] text-[14.5px] leading-relaxed text-ink-muted">
                    {books.length} books, {annualLetters.length} annual letters and {talks.length} talks that shaped
                    the framework.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 font-mono text-[12.5px] font-semibold text-growth">
                  Browse the desk
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          7. CLOSE — the newsletter as the journal's single primary signup
          and its natural closing action: real newsletterConfig copy,
          centered under the same StepRule mark the rest of the site uses
          to sign a section. The site footer omits its own newsletter form
          on this route (see Footer.tsx's ROUTES_WITH_OWN_SIGNUP) so this
          stays the only subscribe prompt on the page.
         ================================================================ */}
      <section className="relative w-full overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            style={{
              position: "absolute",
              inset: "-15%",
              background:
                "radial-gradient(ellipse 60% 55% at 80% 30%, rgba(15,122,64,0.12) 0%, transparent 62%)," +
                "radial-gradient(ellipse 55% 60% at 15% 80%, rgba(63,203,116,0.09) 0%, transparent 60%)",
              filter: "blur(10px)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[700px] px-6 text-center sm:px-10">
          <Reveal className="flex items-center justify-center gap-3">
            <StepRule size="md" />
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
              {newsletterConfig.label}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-editorial mt-6 text-[10vw] leading-[1.1] text-ink [font-style:italic] sm:text-[5vw] lg:text-[2.8vw]">
              {newsletterConfig.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{newsletterConfig.description}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-9">
            <EmailCapture variant="centered-wide" className="w-full" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
