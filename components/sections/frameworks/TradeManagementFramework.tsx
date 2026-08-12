import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { Exhibit } from "@/components/ui/vsc/Exhibit";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { PipelineStrip } from "./PipelineStrip";
import {
  TradeLifecycleExhibit,
  TwoPathsExhibit,
  WhatEarnsWhatExhibit,
  TheLoopExhibit,
} from "./TradeManagementExhibits";

const PUBLISHED_DATE = "2026-08-07";
const CANONICAL = "/frameworks/trade-management";
const PROSE = "max-w-[62ch]";

/**
 * Same left-bordered, italic, non-mono treatment used on Frameworks 02–04
 * for a short statement of intent, set off from surrounding prose.
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
 * Framework 05 of the VSC Decision Pipeline — the last stage, closing the
 * loop back to Framework 01. Reuses the shell and simplification
 * discipline established through Framework 04 v0.2: hero exhibit shows
 * the whole framework at a glance, section headings are plain questions
 * or plain phrases rather than technical labels, and prose stays tight
 * because the exhibits carry the definitions.
 *
 * The page's spine is three phases (Commit, Manage, Exit) with two
 * parallel modes inside Manage (Protect, Compound) — never sequential,
 * never a fourth phase. "Where Evidence Comes From" is placed early and
 * kept intact because without it, regime-dependent management inside
 * Manage would look like it contradicts the core principle that the
 * market — not me — earns every adjustment.
 */
export function TradeManagementFramework() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Trade Management — Framework 05, the VSC Decision Pipeline",
    description:
      "The fifth and final stage of the VSC Decision Pipeline: what happens after capital is committed — when stops move, when positions grow, when they shrink, and when the trade ends. The market earns every adjustment.",
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
            href="/frameworks"
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to the framework library
          </Link>

          {/* 1. Header */}
          <header className="mb-14">
            <span className="mb-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-growth">
              Framework 05 · Trade Management
            </span>
            <h1 className="mb-8 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
              Trade Management
            </h1>
            <p className="max-w-[600px] font-display text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              Now what?
            </p>
          </header>

          <div className="flex flex-col gap-14">
            {/* 2. The big idea */}
            <section className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
              <p>
                Frameworks 01 through 04 all answer one question in different ways: should
                I enter?
              </p>
              <p>This one answers what happens after commitment.</p>
              <p>
                Once capital is in a trade, the trade will ask to be changed. Move the
                stop. Add more. Take something off. Get out.
              </p>
              <p>The market earns every adjustment.</p>
            </section>

            {/* 3. EXHIBIT 1 — The Trade Lifecycle. The hero. */}
            <div className="flex flex-col gap-6">
              <Exhibit
                number={1}
                label="The Trade Lifecycle"
                className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
              >
                <TradeLifecycleExhibit />
              </Exhibit>

              <div className={`${PROSE} flex flex-col gap-3 text-[17px] leading-relaxed text-ink-soft`}>
                <p>Three phases. Inside management, two modes — one defensive, one offensive.</p>
                <p>Absent evidence, neither fires.</p>
              </div>
            </div>

            {/* 4. Pipeline map — compact wayfinding strip, stage 5 active */}
            <PipelineStrip activeIndex={4} />

            {/* 5. Where Evidence Comes From — load-bearing, do not cut */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">
                Where Evidence Comes From
              </h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Every adjustment requires evidence. That evidence arrives from two
                directions.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                The first is the trade itself — what this position has already done, and
                whether it has advanced far enough to justify carrying less risk or
                committing more capital. The second is the environment. Framework 01
                classifies conditions as aggressive, neutral, or defensive, and those
                conditions change how much room a trade should be given. Neither source is
                me. Both are the market.
              </p>
              <PrincipleBlock>
                Evidence comes from the position or from the environment. Never from how I
                feel about either.
              </PrincipleBlock>
            </section>

            {/* 6. Commit */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">Commit</h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Framework 03 decided this setup deserves capital. Framework 04 decided how
                much. Commit is the moment that capital actually moves.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Three things happen together and none of them happen afterwards: the
                trigger fires, the stop goes in, and the risk becomes real. A stop placed
                after entry is not a stop — it is a decision deferred to the worst possible
                moment, when the position is already moving against me and my judgement is
                least reliable.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Different setups need different room. A tight base and a wide-swinging flag
                do not deserve the same distance, and forcing one number onto both either
                strangles the trade or overpays for it. What stays constant is the
                discipline: every setup gets enough room to work and no more, the distance
                is decided before entry, and it is never widened afterwards.
              </p>
              <PrincipleBlock>
                The risk is defined before the trade begins, not during it.
              </PrincipleBlock>
            </section>

            {/* 7. Manage */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">Manage</h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Stop movement, adding to a position, and taking partial profits look like
                three separate techniques. They are one question asked three ways: has the
                trade earned more freedom, or more capital, or neither?
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                The answer never comes from me. It comes from what the position has already
                done, and from the conditions it is trading in.
              </p>
            </section>

            {/* EXHIBIT 2 — Two Paths */}
            <Exhibit
              number={2}
              label="Two Paths"
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <TwoPathsExhibit />
            </Exhibit>

            {/* EXHIBIT 3 — What Earns What */}
            <Exhibit
              number={3}
              label="What Earns What"
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <WhatEarnsWhatExhibit />
            </Exhibit>

            <div className={`${PROSE} flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft`}>
              <p>
                <strong className="font-semibold text-ink">On stops:</strong> Stops move in
                one direction only. A stop that widens is not a stop that was adjusted — it
                is a stop that was abandoned, usually at the moment it was about to do its
                job.
              </p>
              <p>
                <strong className="font-semibold text-ink">On adding:</strong> Adding to a
                winner is the only kind of adding. Adding to a loser has a different name,
                and it is not compounding — it is the sizing decision from Framework 04
                being overruled after the fact by someone with worse information than the
                person who made it.
              </p>
              <p>
                <strong className="font-semibold text-ink">On partials:</strong> A partial
                is a risk decision, not a profit decision. It is also what makes holding
                possible: taking something off converts an uncomfortable position into one
                I can actually keep. Partial first, stop second — then if the stop is hit
                the trade concludes, and if the trend continues I am still in it.
              </p>
            </div>

            {/* 8. Exit */}
            <section className={`${PROSE} flex flex-col gap-5`}>
              <h2 className="font-display text-2xl font-normal text-ink sm:text-3xl">Exit</h2>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                Every trade rests on a reason. The exit question is simply whether that
                reason still holds.
              </p>
              <p className="text-[17px] leading-relaxed text-ink-soft">
                A thesis can end several ways. The stop is hit and the setup is
                invalidated. The target is reached and the move is complete. The structure
                that justified the trade breaks down. Or enough time passes without
                progress that the capital is better used elsewhere. All four are the same
                event: the reason for holding has expired.
              </p>
              <PrincipleBlock>
                I exit when the thesis ends, not when the P&amp;L is uncomfortable.
              </PrincipleBlock>
            </section>

            {/* 9. The Core Principle — the emotional centre of the page */}
            <div className="rounded-vsc-xl bg-growth-tint p-8 sm:p-12">
              <p className="font-display text-[24px] font-medium leading-snug text-ink sm:text-[28px]">
                The market earns every adjustment.
              </p>
              <div className="mt-6 flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
                <p>
                  A trade&apos;s default state is unchanged. Compounding must be earned by
                  the market proving me right. Protecting must be earned by conditions
                  turning, or by the remaining reward no longer justifying the remaining
                  risk.
                </p>
              </div>
              <p className="mt-6 font-display text-[22px] font-medium text-ink">
                Nothing changes because I feel like changing it.
              </p>
            </div>

            {/* 10. What This Framework Is Not */}
            <section className={PROSE}>
              <h2 className="mb-4 font-display text-2xl font-normal text-ink sm:text-3xl">
                What This Framework Is Not
              </h2>
              <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
                <p>
                  <strong className="font-semibold text-ink">It Is Not Prediction.</strong>{" "}
                  The framework responds to what the trade and the environment have already
                  done, never to what either might do next.
                </p>
                <p>
                  <strong className="font-semibold text-ink">It Is Not Hope.</strong> A
                  position held past its thesis is not a trade being managed. It is a trade
                  being avoided.
                </p>
                <p>
                  <strong className="font-semibold text-ink">It Is Not P&amp;L Management.</strong>{" "}
                  The number on the screen is an outcome, not evidence. It changes every
                  second and it knows nothing about whether the setup is still working.
                </p>
              </div>
            </section>

            {/* 11. EXHIBIT 4 — The Loop. The pipeline is a cycle, not a line. */}
            <Exhibit
              number={4}
              label="The Process Repeats"
              className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8"
            >
              <TheLoopExhibit />
            </Exhibit>

            {/* 12. The Close — replaces the handoff pattern; there is no Framework 06 */}
            <section className={PROSE}>
              <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Framework 05 answered
              </span>
              <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
                “Now what?”
              </p>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-faint">There is no Framework 06.</p>
              <p className="mt-4 text-[19px] leading-relaxed text-ink">
                The trade closes. The market changes. The process begins again.
              </p>
            </section>

            {/* 13. Version note */}
            <div className="border-t border-rule pt-8">
              <p className="font-mono text-[13px] leading-relaxed text-ink-faint">
                Version 0.1 — This framework will be refined as the process evolves.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
