import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { PipelineStrip } from "./PipelineStrip";
import {
  ThreeQuestionsExhibit,
  StopSizeExhibit,
  GradeCeilingsExhibit,
  EnvironmentRiskBudgetExhibit,
  SmallestNumberWinsExhibit,
} from "./SizingExhibits";

const PUBLISHED_DATE = "2026-08-07";
const CANONICAL = "/frameworks/sizing";
const PROSE = "max-w-[62ch]";

function ProvisionalNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border-l-2 py-1 pl-5 font-mono text-[13px] leading-relaxed text-ink-faint"
      style={{ borderColor: "var(--rule)" }}
    >
      {children}
    </div>
  );
}

/**
 * Same left-bordered, italic, non-mono treatment used on Frameworks 02
 * and 03 for a short statement of intent, set off from surrounding prose.
 */
function PrincipleBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border-l-2 py-1 pl-5 text-[16px] italic leading-relaxed text-ink-muted"
      style={{ borderColor: "var(--rule-strong)" }}
    >
      {children}
    </div>
  );
}

/**
 * The tiny chapter-transition diagram for the Handoff section — same
 * component shape as Frameworks 02 and 03's, relabelled for this handoff.
 */
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

/**
 * Framework 04 of the VSC Decision Pipeline — simplification pass. The
 * original version led with a stop-distance table and labelled its
 * sections "Constraint 1/2/3," which read as a risk-management manual
 * rather than a decision framework. This version leads with the three
 * plain questions the framework actually asks (they replace the old
 * converging-arrows exhibit entirely), uses those questions as section
 * headings, and cuts roughly a third of the prose — the exhibits carry
 * the precision now; the copy just carries the idea.
 */
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
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />
      <PaperGrain />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-[820px] px-4 sm:px-6">
          <Link
            href="/research#framework-library"
            className="group mb-8 inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Research
          </Link>

          {/* 1. Header */}
          <header className="mb-14">
            <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
              Framework 04 · Sizing
            </span>
            <h1 className="mb-8 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
              Sizing
            </h1>
            <p className="max-w-[600px] font-display text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              How much capital does this setup deserve?
            </p>
          </header>

          <div className="flex flex-col gap-14">
            {/* 2. The big idea */}
            <section className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
              <p>Most traders answer &ldquo;how much?&rdquo; with conviction.</p>
              <p>This framework answers it with constraints.</p>
              <p>Three limits apply to every position. The smallest one wins.</p>
            </section>

            {/* 3. EXHIBIT 1 — Three Questions. The hero: the whole framework at a glance. */}
            <div className="flex flex-col gap-6">
              <Exhibit
                number={1}
                label="Three Questions"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <ThreeQuestionsExhibit />
              </Exhibit>

              <div className={`${PROSE} flex flex-col gap-3 text-[17px] leading-relaxed text-ink-soft`}>
                <p>Each question produces a number. Each can produce a different number.</p>
                <p>The position is sized to whichever is smallest.</p>
              </div>
            </div>

            {/* 4. Pipeline map — compact wayfinding strip, stage 4 active */}
            <PipelineStrip activeIndex={3} />

            {/* 5. Question 1 — Can I afford the risk? */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                Can I afford the risk?
              </h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                The stop determines the size. Not conviction, not the story, not how much I
                like the chart.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                If a fixed amount is at risk on every trade, then a wider stop buys fewer
                shares. This is arithmetic, but it runs opposite to instinct — most traders
                reason that a better-looking setup deserves a bigger position, when the
                actual driver is where the stop sits.
              </p>
            </section>

            {/* EXHIBIT 2 — The Stop Determines The Size (demoted from hero) */}
            <div className="flex flex-col gap-6">
              <Exhibit
                number={2}
                label="The Stop Determines The Size"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <StopSizeExhibit />
              </Exhibit>

              <PrincipleBlock>The chart sets the stop. The stop sets the size.</PrincipleBlock>
            </div>

            {/* 6. Question 2 — Does this setup deserve that much capital? */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                Does this setup deserve that much capital?
              </h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Framework 03 ranks opportunities. A ranking that does not change allocation
                is not a ranking — it is a comment.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Each grade carries a maximum. These are hard ceilings, not multipliers
                applied to the number from question 1. If grades multiplied that number, a
                C-grade setup with a tight stop could end up larger than an A-grade setup
                with a wide one — which would defeat the purpose of grading at all.
              </p>
            </section>

            {/* EXHIBIT 3 — Grade Ceilings */}
            <div className="flex flex-col gap-6">
              <Exhibit
                number={3}
                label="Grade Ceilings"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <GradeCeilingsExhibit />
              </Exhibit>

              <div className={`${PROSE} flex flex-col gap-4`}>
                <p className="text-[17px] leading-relaxed text-ink-soft">
                  The A ceiling is also the concentration limit. No single position exceeds
                  it, whatever its grade.
                </p>
                <ProvisionalNote>
                  <em>Ceilings are provisional and will be refined as the framework evolves.</em>
                </ProvisionalNote>
              </div>
            </div>

            {/* 7. Question 3 — Do I still have room? */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                Do I still have room?
              </h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                The first two questions size a position. This one asks whether the
                portfolio can take another position at all.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                It is measured in risk, not in capital deployed. Two portfolios can hold
                identical capital and carry wildly different risk, depending on where the
                stops sit. Capital deployed is not the variable that hurts.
              </p>

              {/* EXHIBIT 4 — Environment Risk Budget */}
              <Exhibit
                number={4}
                label="Environment Risk Budget"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <EnvironmentRiskBudgetExhibit />
              </Exhibit>

              <p className="text-[17px] leading-relaxed text-ink-soft">
                If open risk already sits at the ceiling, no new position opens —
                regardless of how good the setup is.
              </p>
              <ProvisionalNote>
                <em>Budgets are provisional and will be refined as the framework evolves.</em>
              </ProvisionalNote>

              <p className="text-[17px] leading-relaxed text-ink-soft">
                A maximum number of open positions is a useful habit, but it is a proxy —
                four positions risking 1.5% each and two risking 3% each carry identical
                portfolio risk.
              </p>
            </section>

            {/* 8. EXHIBIT 5 — Which Question Binds. The payoff exhibit — full width, not compressed. */}
            <div className="flex flex-col gap-6">
              <Exhibit
                number={5}
                label="Which Question Binds"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <SmallestNumberWinsExhibit />
              </Exhibit>

              <p className={`${PROSE} text-[17px] leading-relaxed text-ink-soft`}>
                Different questions bind in different situations. That is why there are
                three.
              </p>
            </div>

            {/* 9. The Core Principle — the emotional centre of the page */}
            <div className="rounded-vsc-xl bg-growth-tint p-8 sm:p-12">
              <p className="font-display text-[24px] font-medium leading-snug text-ink sm:text-[28px]">
                Position size is determined by constraints, not conviction.
              </p>
              <div className="mt-6 flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
                <p>Three limits apply to every position.</p>
              </div>
              <p className="mt-6 font-display text-[22px] font-medium text-ink">
                The smallest valid number wins.
              </p>
            </div>

            {/* 10. What This Framework Is Not */}
            <section className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                What This Framework Is Not
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
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
            </section>

            {/* 11. The Handoff */}
            <section className={PROSE}>
              <h2 className="mb-6 font-display text-2xl font-normal text-ink sm:text-3xl">The Handoff</h2>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    Framework 04 answered
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    “How much?”
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
                    Framework 05 answers
                  </span>
                  <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                    “Now what?”
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">
                This is the first framework whose output is a number rather than a
                classification.
              </p>
              <div className="mt-8">
                <HandoffArrow />
              </div>
            </section>

            {/* 12. Version note */}
            <div className="border-t border-rule pt-8">
              <p className="font-mono text-[13px] leading-relaxed text-ink-faint">
                Version 0.2 — Ceilings, budgets, and thresholds are provisional and will be
                refined as the framework evolves.
              </p>
            </div>

            <div className={PROSE}>
              <EmailCapture context="Frameworks are revised as the market teaches us something. Subscribers get the revision and the reason." />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
