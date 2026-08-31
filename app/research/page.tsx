import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import {
  marketLetters,
  sortedMonths,
  researchNotes,
  frameworkLibrary,
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
  const latestMonthKey = sortedMonths[0];
  const featuredLetter = marketLetters[latestMonthKey];
  const archiveMonths = sortedMonths.slice(1);
  const latestNote = researchNotes[researchNotes.length - 1];

  const lettersCount = sortedMonths.length;
  const notesCount = researchNotes.length;
  const frameworksCount = frameworkLibrary.length;
  const readingCount = books.length + annualLetters.length + talks.length;

  return (
    <main className="relative w-full bg-canvas">
      {/* ================================================================
          1. MASTHEAD — Cinematic Signal, same dark register and
          ContourField seed (71) as the homepage/About/Offerings heroes.
          Replaces the previous hero's headline + statistics-card pair:
          the left states what this page is, the right is a real "current
          issue" index (Exhibit 01) — the newest Letter, the newest Insight
          and the Framework Library, each a real link — with the four
          previous stats demoted to a footer line rather than the visual
          centerpiece.
         ================================================================ */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#080F0B] pb-20 pt-32 sm:pb-28 sm:pt-40">
        <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.85} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 55% at 75% 22%, rgba(63,203,116,0.18) 0%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7FB999]">
                  The Research Journal
                </span>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-6 max-w-[15ch] font-sans text-[12vw] font-bold leading-[0.96] tracking-[-0.03em] text-[#F4F7F4] sm:text-[7vw] lg:text-[4.4vw]">
                  Where VSC thinks in public.
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <blockquote className="font-editorial mt-8 max-w-[40ch] text-[20px] leading-snug text-[#7FB999] [font-style:italic] sm:text-[23px]">
                  &ldquo;We don&apos;t publish news. We publish thinking.&rdquo;
                </blockquote>
              </Reveal>

              <Reveal delay={0.17}>
                <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-white/60">
                  Market letters, trading insights and the frameworks behind them — published as they&apos;re used,
                  not rewritten after the fact.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-8">
                  <Link
                    href="/start"
                    className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] text-white/45 transition-colors duration-200 hover:text-[#7FB999]"
                  >
                    New to VSC? Start here
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* --- Exhibit 01 · Current issue — light panel, dark field,
                same deliberate-contrast device as the Offerings/homepage
                hero exhibits: a light analytical card floating on the
                dark ContourField, not a card matching the dark bg. ------ */}
            <Reveal delay={0.18} distance={20} className="lg:col-span-5">
              <Exhibit
                number={1}
                label="Current issue"
                className="mx-auto w-full max-w-[440px] rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-2 sm:p-8 lg:ml-auto lg:mr-0"
              >
                <div className="divide-y divide-rule">
                  {featuredLetter && (
                    <Link href={letterHref(latestMonthKey)} className="group block pb-5">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-growth">
                        Market Letter {String(featuredLetter.letterNumber).padStart(3, "0")}
                      </span>
                      <p className="mt-2 font-display text-[17px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep">
                        {monthName(featuredLetter.month)} {featuredLetter.year} — {featuredLetter.thesis}
                      </p>
                      <span className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-growth">
                        Read the letter
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  )}

                  {latestNote && (
                    <Link href={`/research/notes/${latestNote.slug}`} className="group block py-5">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                        Trading Insight {latestNote.number}
                      </span>
                      <p className="mt-2 font-display text-[17px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep">
                        {latestNote.title}
                      </p>
                      <span className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-ink-muted transition-colors duration-200 group-hover:text-growth">
                        Read the insight
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  )}

                  <Link href="#framework-library" className="group block pt-5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      Framework Library
                    </span>
                    <p className="mt-2 font-display text-[17px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep">
                      Five questions. One decision process.
                    </p>
                    <span className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-ink-muted transition-colors duration-200 group-hover:text-growth">
                      Browse the library
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule pt-4 font-mono text-[11px] text-ink-faint">
                  <span>{lettersCount} letters</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{notesCount} insights</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{frameworksCount} frameworks</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{readingCount} readings</span>
                </div>
              </Exhibit>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. CONTENTS — a real index, not a tab bar: plain anchors with a
          spring-driven active marker (scrollspy) so a reader always knows
          which chapter of the journal they're currently in.
         ================================================================ */}
      <section className="relative w-full border-b border-rule bg-canvas py-6">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <ContentsRail />
        </div>
      </section>

      {/* ================================================================
          3. MARKET LETTERS — the current issue as a masthead spread (not
          a card matching the archive rows below it), then the rest of the
          archive as a scannable ledger: issue number, month, thesis,
          reading time. Real dates via formatLongDate, real reading times
          via getReadingTime.
         ================================================================ */}
      <section id="letters" className="relative w-full scroll-mt-24 border-b border-rule bg-canvas py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-8">
            <div>
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
                Time-bound — what we observed
              </span>
              <h2 className="font-editorial mt-4 text-[11vw] leading-[1.05] text-ink [font-style:italic] sm:text-[5.5vw] lg:text-[2.8vw]">
                Market Letters
              </h2>
            </div>
            <Link
              href="/letters"
              className="inline-flex shrink-0 items-center gap-2 font-mono text-[13px] font-semibold text-growth"
            >
              Full archive
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          {featuredLetter && (
            <Reveal delay={0.06} className="mt-14 sm:mt-16">
              <Link
                href={letterHref(latestMonthKey)}
                className="group relative block overflow-hidden rounded-vsc-xl border border-rule bg-surface-warm px-7 py-10 shadow-lift-1 transition-shadow duration-200 hover:shadow-lift-2 sm:px-12 sm:py-14"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -right-4 select-none font-display font-bold leading-none text-growth/[0.07]"
                  style={{ fontSize: "clamp(180px, 22vw, 280px)" }}
                >
                  {String(featuredLetter.letterNumber).padStart(3, "0")}
                </span>

                <div className="relative flex max-w-[680px] flex-col gap-5">
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-growth">
                    Current issue &middot; Letter {String(featuredLetter.letterNumber).padStart(3, "0")}
                  </span>
                  <h3 className="font-display text-[13vw] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[6vw] lg:text-[2.6vw]">
                    {monthName(featuredLetter.month)} {featuredLetter.year}
                  </h3>
                  <p className="font-editorial max-w-[54ch] text-[21px] leading-snug text-ink [font-style:italic] sm:text-[24px]">
                    {featuredLetter.pullQuote ?? featuredLetter.thesis}
                  </p>
                  <span className="font-mono text-[12.5px] text-ink-muted">
                    Sudheer Vobhilineni &middot; {formatLongDate(featuredLetter.publishedDate)} &middot;{" "}
                    {getReadingTime(featuredLetter)} min read
                  </span>
                  <span className="mt-1 inline-flex w-fit items-center gap-2 font-mono text-[13px] font-semibold text-growth">
                    Read the letter
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <Reveal delay={0.1} className="mt-14 sm:mt-16">
            <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
              <span>Archive</span>
              <span className="hidden sm:inline">Issue &middot; Thesis &middot; Read time</span>
            </div>
            <div className="divide-y divide-rule border-t border-rule">
              {archiveMonths.map((m) => {
                const letter = marketLetters[m];
                if (!letter) return null;
                return (
                  <Link
                    key={m}
                    href={letterHref(m)}
                    className="group grid grid-cols-1 gap-1.5 py-5 sm:grid-cols-[150px_1fr_70px] sm:items-baseline sm:gap-6"
                  >
                    <span className="font-mono text-[12.5px] tabular-nums text-ink-faint">
                      {String(letter.letterNumber).padStart(3, "0")} &middot; {monthName(letter.month)} {letter.year}
                    </span>
                    <span className="text-[16px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep">
                      {letter.thesis}
                    </span>
                    <span className="font-mono text-[12px] text-ink-faint sm:text-right">
                      {getReadingTime(letter)} min
                    </span>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          4. TRADING INSIGHTS — a distinct texture from the Letters ledger:
          bordered index cards on a sunk-canvas chapter, sized for shorter,
          more tactical pieces. Both real notes, newest first.
         ================================================================ */}
      <section
        id="trading-insights"
        className="relative w-full scroll-mt-24 border-b border-rule bg-canvas-sunk py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <Reveal>
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
              Time-bound — what we observed
            </span>
            <h2 className="font-editorial mt-4 max-w-[16ch] text-[11vw] leading-[1.05] text-ink [font-style:italic] sm:text-[5.5vw] lg:text-[2.8vw]">
              Trading Insights
            </h2>
            <p className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-ink-soft">
              Ideas from the market, distilled into something useful — shorter and more tactical than a Market
              Letter.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2">
            {researchNotes
              .slice()
              .reverse()
              .map((note, i) => (
                <Reveal key={note.slug} delay={i * 0.06}>
                  <Link
                    href={`/research/notes/${note.slug}`}
                    className="group flex h-full flex-col rounded-vsc-lg border border-rule bg-surface p-7 transition-[border-color,box-shadow] duration-200 hover:border-growth/40 hover:shadow-lift-1 sm:p-8"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-growth">
                        Insight {note.number}
                      </span>
                      <span className="font-mono text-[11px] text-ink-faint">{note.readingTime}</span>
                    </div>
                    <span className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
                      {note.category}
                    </span>
                    <h3 className="mt-2 font-display text-[21px] font-medium leading-snug text-ink transition-colors duration-200 group-hover:text-growth-deep sm:text-[23px]">
                      {note.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{note.subtitle}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12.5px] font-semibold text-growth">
                      Read insight
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
          </div>

          <Reveal delay={0.14} className="mt-8 text-right">
            <Link
              href="/research/notes"
              className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-growth"
            >
              Browse all Trading Insights
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
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
