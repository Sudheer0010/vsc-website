"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Byline } from "@/components/ui/vsc/Byline";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { formatLongDate } from "@/lib/format-date";
import { PipelineStrip } from "./PipelineStrip";
import {
  ThreeQuestionsExhibit,
  StopSizeExhibit,
  GradeCeilingsExhibit,
  EnvironmentRiskBudgetExhibit,
  SmallestNumberWinsExhibit,
} from "./SizingExhibits";

/**
 * Framework 04 — Sizing. Ported onto the editorial reading system
 * established at Frameworks 01–03: running section rail, AnnotatedBlock
 * margin glosses, GhostNumeral chapter openers, rule-based exhibit chrome.
 * Every word, heading, threshold and link is unchanged from the previous
 * implementation. The three plain questions this framework already leads
 * with — "Can I afford the risk?", "Does this setup deserve that much
 * capital?", "Do I still have room?" — are its natural top-level chapters,
 * the same structural role Framework 01's three factors and Framework 03's
 * three layers play, so they get the same GhostNumeral treatment. Exhibit
 * 05 (the payoff — which question binds) stays un-numbered, the same
 * synthesis role Framework 01's Exposure ladder and Framework 02's
 * Framework Relationship exhibit play.
 */

const PUBLISHED_DATE = "2026-08-07";
const CANONICAL = "/frameworks/sizing";

const SECTIONS = [
  { n: "00", id: "identity", label: "Identity" },
  { n: "01", id: "questions", label: "The questions" },
  { n: "02", id: "pipeline", label: "Pipeline" },
  { n: "03", id: "risk", label: "Question 1" },
  { n: "04", id: "grade", label: "Question 2" },
  { n: "05", id: "room", label: "Question 3" },
  { n: "06", id: "binds", label: "Which binds" },
  { n: "07", id: "principle", label: "Principle" },
  { n: "08", id: "not-this", label: "Not this" },
  { n: "09", id: "handoff", label: "Handoff" },
  { n: "10", id: "closing", label: "Closing" },
] as const;

/** Same IntersectionObserver scrollspy pattern as Frameworks 01–03. */
function useActiveSection(): string {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function RunningRail() {
  const active = useActiveSection();
  return (
    <nav
      aria-label="Framework reading position"
      className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-start gap-10 xl:flex"
    >
      <span
        className="select-none whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-faint"
        style={{ writingMode: "vertical-rl" }}
      >
        Sizing — Framework 04
      </span>

      <ol className="flex flex-col gap-3 border-l border-rule pl-4">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                  isActive ? "font-semibold text-ink" : "text-ink-faint hover:text-ink-muted"
                }`}
              >
                <span className={isActive ? "text-growth" : ""}>{s.n}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function AnnotatedBlock({
  gloss,
  span = 7,
  children,
}: {
  gloss?: string;
  span?: 7 | 10;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
      <div className="hidden lg:col-span-2 lg:block">
        {gloss && (
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {gloss}
          </span>
        )}
      </div>
      <div className={span === 10 ? "lg:col-span-10 lg:col-start-3" : "lg:col-span-7 lg:col-start-3"}>
        {children}
      </div>
    </div>
  );
}

function ExhibitScroll({ minWidth, children }: { minWidth: number; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth }}>{children}</div>
    </div>
  );
}

/** Reserved for the three questions — this page's top-level chapters. */
function GhostNumeral({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-2 -top-8 select-none font-display font-bold leading-none text-transparent sm:-left-6 sm:-top-16 lg:-top-20"
      style={{
        fontSize: "clamp(84px, 22vw, 360px)",
        WebkitTextStroke: "1.5px var(--rule-strong)",
      }}
    >
      {children}
    </span>
  );
}

/** A methodological aside built from a rule instead of a background fill —
 *  replaces the old rounded/tinted ProvisionalNote. */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-ink pl-6">
      <p className="font-mono text-[13px] leading-relaxed text-ink-muted">{children}</p>
    </div>
  );
}

/** A short, aphoristic statement of intent — conviction, not disclaimer. */
function PrincipleBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border-l-2 border-rule-strong pl-5 text-[16px] leading-relaxed text-ink-muted"
      style={{ fontStyle: "italic" }}
    >
      {children}
    </div>
  );
}

/** Chapter-transition diagram for the Handoff — kept un-numbered. */
function HandoffArrow() {
  const width = 320;
  const boxW = 240;
  const boxH = 48;
  const gap = 34;
  const box2Y = boxH + gap;
  const height = box2Y + boxH;
  const cx = width / 2;
  const boxX = (width - boxW) / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby="handoff-arrow-title"
      width="100%"
      style={{ maxWidth: 320, height: "auto", display: "block", margin: "0 auto" }}
    >
      <title id="handoff-arrow-title">Sizing hands off to Trade Management.</title>
      <rect x={boxX} y={0} width={boxW} height={boxH} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text x={cx} y={boxH / 2 + 5} textAnchor="middle" style={{ font: "600 13px var(--font-mono)", fill: "var(--ink)" }}>
        Sizing
      </text>

      <line
        x1={cx}
        y1={boxH}
        x2={cx}
        y2={box2Y}
        stroke="var(--ink-faint)"
        strokeWidth={1.5}
        markerEnd="url(#arrowhead-handoff-sz)"
      />

      <rect x={boxX} y={box2Y} width={boxW} height={boxH} rx={8} fill="var(--canvas-sunk)" stroke="var(--rule)" />
      <text
        x={cx}
        y={box2Y + boxH / 2 + 5}
        textAnchor="middle"
        style={{ font: "600 13px var(--font-mono)", fill: "var(--ink)" }}
      >
        Trade Management
      </text>

      <defs>
        <marker id="arrowhead-handoff-sz" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--ink-faint)" />
        </marker>
      </defs>
    </svg>
  );
}

export function SizingFramework() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Sizing — Framework 04, the VSC Decision Pipeline",
    description:
      "The fourth stage of the VSC Decision Pipeline: three questions determine position size — can I afford the risk, does the setup deserve the capital, and is there room in the portfolio. The smallest number wins.",
    author: { "@type": "Person", name: "Sudheer Vobhilineni" },
    publisher: { "@type": "Organization", name: "VSC Capital & Advisory" },
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    mainEntityOfPage: `https://vsccapital.in${CANONICAL}`,
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-canvas text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ReadingProgress />
      <RunningRail />

      <div className="mx-auto max-w-[1680px] px-6 pb-40 pt-32 sm:px-10 lg:px-20 lg:pt-40 xl:pl-56 xl:pr-20">
        {/* ================================================================
            00 — IDENTITY.
           ================================================================ */}
        <header id="identity" className="mb-32">
          <Link
            href="/research#framework-library"
            className="group mb-16 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-growth">
            Framework 04 · Sizing
          </span>

          <h1
            className="mt-5 font-display font-bold text-ink"
            style={{ fontSize: "clamp(48px, 10vw, 132px)", lineHeight: 0.9, letterSpacing: "-0.035em" }}
          >
            Sizing
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-ink-muted lg:hidden">
            <span>v0.2</span>
            <span aria-hidden="true">·</span>
            <span>{formatLongDate(PUBLISHED_DATE)}</span>
            <span aria-hidden="true">·</span>
            <span>~6 min read</span>
            <span aria-hidden="true">·</span>
            <Byline variant="compact" />
          </div>

          <div className="mt-10 lg:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
              <div className="hidden lg:col-span-2 lg:flex lg:flex-col lg:gap-2.5">
                <span className="font-mono text-[11px] text-ink-muted">v0.2</span>
                <span className="font-mono text-[11px] text-ink-muted">{formatLongDate(PUBLISHED_DATE)}</span>
                <span className="font-mono text-[11px] text-ink-muted">~6 min read</span>
                <Byline variant="full" className="mt-2" />
              </div>

              <div className="lg:col-span-7 lg:col-start-3">
                <p
                  className="font-editorial text-ink"
                  style={{ fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em" }}
                >
                  How much capital does this setup deserve?
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================
            01 — THE QUESTIONS. The big idea, then the hero Exhibit 01.
           ================================================================ */}
        <section id="questions" className="mb-32 flex flex-col gap-14">
          <AnnotatedBlock>
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
              <p>Most traders answer &ldquo;how much?&rdquo; with conviction.</p>
              <p>This framework answers it with constraints.</p>
              <p>Three limits apply to every position. The smallest one wins.</p>
            </div>
          </AnnotatedBlock>

          <AnnotatedBlock span={10}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <figure className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                  <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    Exhibit 01 — Three Questions
                  </figcaption>
                </div>
                <div className="mt-8">
                  <ExhibitScroll minWidth={600}>
                    <ThreeQuestionsExhibit />
                  </ExhibitScroll>
                </div>
              </figure>
              <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                <span className="font-display text-[64px] font-bold leading-none text-rule-strong">01</span>
              </div>
            </div>
          </AnnotatedBlock>

          <AnnotatedBlock>
            <div className="flex flex-col gap-4 text-[19px] leading-[1.75] text-ink-soft">
              <p>Each question produces a number. Each can produce a different number.</p>
              <p>The position is sized to whichever is smallest.</p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            02 — PIPELINE. Shared PipelineStrip, unchanged.
           ================================================================ */}
        <section id="pipeline" className="mb-32">
          <AnnotatedBlock span={10} gloss="Pipeline">
            <PipelineStrip activeIndex={3} />
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            03 — QUESTION 1: CAN I AFFORD THE RISK?
           ================================================================ */}
        <section id="risk" className="relative mt-32">
          <GhostNumeral>1</GhostNumeral>

          <AnnotatedBlock gloss="Question 1 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(36px, 5.6vw, 76px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Can I afford the risk?
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  The stop determines the size. Not conviction, not the story, not how much I
                  like the chart.
                </p>
                <p>
                  If a fixed amount is at risk on every trade, then a wider stop buys fewer
                  shares. This is arithmetic, but it runs opposite to instinct — most traders
                  reason that a better-looking setup deserves a bigger position, when the
                  actual driver is where the stop sits.
                </p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 02 — The Stop Determines The Size
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={600}>
                      <StopSizeExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>
                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">02</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <PrincipleBlock>The chart sets the stop. The stop sets the size.</PrincipleBlock>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            04 — QUESTION 2: DOES THIS SETUP DESERVE THAT MUCH CAPITAL?
           ================================================================ */}
        <section id="grade" className="relative mt-32">
          <GhostNumeral>2</GhostNumeral>

          <AnnotatedBlock gloss="Question 2 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 5vw, 68px)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                Does this setup deserve that much capital?
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  Framework 03 ranks opportunities. A ranking that does not change allocation
                  is not a ranking — it is a comment.
                </p>
                <p>
                  Each grade carries a maximum. These are hard ceilings, not multipliers
                  applied to the number from question 1. If grades multiplied that number, a
                  C-grade setup with a tight stop could end up larger than an A-grade setup
                  with a wide one — which would defeat the purpose of grading at all.
                </p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 03 — Grade Ceilings
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={600}>
                      <GradeCeilingsExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>
                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">03</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Provisional">
              <div className="flex flex-col gap-4">
                <p className="text-[19px] leading-[1.75] text-ink-soft">
                  The A ceiling is also the concentration limit. No single position exceeds
                  it, whatever its grade.
                </p>
                <Note>
                  <em>Ceilings are provisional and will be refined as the framework evolves.</em>
                </Note>
              </div>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            05 — QUESTION 3: DO I STILL HAVE ROOM?
           ================================================================ */}
        <section id="room" className="relative mt-32">
          <GhostNumeral>3</GhostNumeral>

          <AnnotatedBlock gloss="Question 3 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(36px, 5.6vw, 76px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Do I still have room?
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  The first two questions size a position. This one asks whether the
                  portfolio can take another position at all.
                </p>
                <p>
                  It is measured in risk, not in capital deployed. Two portfolios can hold
                  identical capital and carry wildly different risk, depending on where the
                  stops sit. Capital deployed is not the variable that hurts.
                </p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 04 — Environment Risk Budget
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={600}>
                      <EnvironmentRiskBudgetExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>
                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">04</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock gloss="Provisional">
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  If open risk already sits at the ceiling, no new position opens —
                  regardless of how good the setup is.
                </p>
                <Note>
                  <em>Budgets are provisional and will be refined as the framework evolves.</em>
                </Note>
                <p>
                  A maximum number of open positions is a useful habit, but it is a proxy —
                  four positions risking 1.5% each and two risking 3% each carry identical
                  portfolio risk.
                </p>
              </div>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            06 — EXHIBIT 05: WHICH QUESTION BINDS. The payoff — not a
            numbered question — the same synthesis role Framework 01's
            Exposure ladder plays.
           ================================================================ */}
        <section id="binds" className="mt-32">
          <AnnotatedBlock span={10}>
            <figure>
              <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                  Exhibit 05 — Which Question Binds
                </figcaption>
              </div>
              <div className="mt-8">
                <ExhibitScroll minWidth={600}>
                  <SmallestNumberWinsExhibit />
                </ExhibitScroll>
              </div>
            </figure>
          </AnnotatedBlock>

          <div className="mt-8">
            <AnnotatedBlock>
              <p className="text-[19px] leading-[1.75] text-ink-soft">
                Different questions bind in different situations. That is why there are
                three.
              </p>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            07 — THE CORE PRINCIPLE.
           ================================================================ */}
        <section id="principle" className="mt-32">
          <AnnotatedBlock>
            <div className="border-t-2 border-ink pt-8">
              <p
                className="font-editorial text-ink"
                style={{ fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.2 }}
              >
                Position size is determined by constraints, not conviction.
              </p>
              <div className="mt-6 flex flex-col gap-4 text-[19px] leading-[1.75] text-ink-soft">
                <p>Three limits apply to every position.</p>
              </div>
              <p className="mt-6 font-display text-2xl font-bold text-ink">The smallest valid number wins.</p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            08 — WHAT THIS FRAMEWORK IS NOT.
           ================================================================ */}
        <section id="not-this" className="mt-32">
          <AnnotatedBlock gloss="Scope">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                What This Framework Is Not
              </h2>
              <div className="mt-8 flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  <strong className="font-semibold text-ink">It Is Not Equal Position Sizing.</strong>{" "}
                  Buying the same amount every time ignores where the stop sits.
                </p>
                <p>
                  <strong className="font-semibold text-ink">It Is Not Conviction Sizing.</strong>{" "}
                  Conviction already had its say at Framework 03, where it became a grade
                  and a ceiling.
                </p>
                <p>
                  <strong className="font-semibold text-ink">It Is Not Story Sizing.</strong>{" "}
                  Sector narratives and news flow do not appear in any of the three
                  questions.
                </p>
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            09 — THE HANDOFF.
           ================================================================ */}
        <section id="handoff" className="mt-32">
          <AnnotatedBlock gloss="Continuity">
            <div className="border-t border-rule pt-8">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                The Handoff
              </h2>
              <div className="mt-8 flex flex-col gap-6">
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Framework 04 answered
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    &ldquo;How much?&rdquo;
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Framework 05 answers
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    &ldquo;Now what?&rdquo;
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[19px] leading-[1.75] text-ink-soft">
                This is the first framework whose output is a number rather than a
                classification.
              </p>
              <div className="mt-8">
                <HandoffArrow />
              </div>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            10 — VERSION NOTE + EMAIL CAPTURE.
           ================================================================ */}
        <section id="closing" className="mt-32">
          <AnnotatedBlock gloss="Version log">
            <div className="border-t-2 border-ink pt-8">
              <p className="font-mono text-[13px] leading-relaxed text-ink-faint">
                Version 0.2 — Ceilings, budgets, and thresholds are provisional and will be
                refined as the framework evolves.
              </p>
            </div>
          </AnnotatedBlock>

          <div className="mt-14">
            <AnnotatedBlock>
              <EmailCapture context="Frameworks are revised as the market teaches us something. Subscribers get the revision and the reason." />
            </AnnotatedBlock>
          </div>
        </section>
      </div>
    </div>
  );
}
