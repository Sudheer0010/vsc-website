"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Byline } from "@/components/ui/vsc/Byline";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";
import { ReadingProgress } from "@/components/ui/vsc/ReadingProgress";
import { formatLongDate } from "@/lib/format-date";
import { PipelineStrip } from "./PipelineStrip";
import { TradeLifecycleExhibit, TwoPathsExhibit, WhatEarnsWhatExhibit, TheLoopExhibit } from "./TradeManagementExhibits";

/**
 * Framework 05 — Trade Management, the last stage, closing the loop back
 * to Framework 01. Ported onto the editorial reading system established at
 * Frameworks 01–04. Every word, heading and link is unchanged. The page's
 * own spine — three phases, Commit / Manage / Exit — is this framework's
 * natural top-level chapter sequence, the same structural role Framework
 * 01's three factors, Framework 03's three layers, and Framework 04's
 * three questions play, so they get the same GhostNumeral treatment.
 * "Where Evidence Comes From" precedes the phases as foundational prose
 * (the same role Framework 01's Method section plays) and is kept intact
 * per the original file's own note that it is load-bearing. There is no
 * Handoff section here — Framework 05 has no Framework 06 to hand off to —
 * so "The Close" replaces it verbatim, exactly as production already had it.
 */

const PUBLISHED_DATE = "2026-08-07";
const CANONICAL = "/frameworks/trade-management";

const SECTIONS = [
  { n: "00", id: "identity", label: "Identity" },
  { n: "01", id: "lifecycle", label: "The lifecycle" },
  { n: "02", id: "pipeline", label: "Pipeline" },
  { n: "03", id: "evidence", label: "Evidence" },
  { n: "04", id: "commit", label: "Commit" },
  { n: "05", id: "manage", label: "Manage" },
  { n: "06", id: "exit", label: "Exit" },
  { n: "07", id: "principle", label: "Principle" },
  { n: "08", id: "not-this", label: "Not this" },
  { n: "09", id: "loop", label: "The loop" },
  { n: "10", id: "close", label: "The close" },
  { n: "11", id: "version", label: "Version log" },
] as const;

/** Same IntersectionObserver scrollspy pattern as Frameworks 01–04. */
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
        Trade Management — Framework 05
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

/** Reserved for the three phases — Commit, Manage, Exit — this page's
 *  top-level chapters. */
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
            Framework 05 · Trade Management
          </span>

          <h1
            className="mt-5 font-display font-bold text-ink"
            style={{ fontSize: "clamp(48px, 10vw, 132px)", lineHeight: 0.9, letterSpacing: "-0.035em" }}
          >
            Trade Management
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-ink-muted lg:hidden">
            <span>v0.1</span>
            <span aria-hidden="true">·</span>
            <span>{formatLongDate(PUBLISHED_DATE)}</span>
            <span aria-hidden="true">·</span>
            <span>~7 min read</span>
            <span aria-hidden="true">·</span>
            <Byline variant="compact" />
          </div>

          <div className="mt-10 lg:mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
              <div className="hidden lg:col-span-2 lg:flex lg:flex-col lg:gap-2.5">
                <span className="font-mono text-[11px] text-ink-muted">v0.1</span>
                <span className="font-mono text-[11px] text-ink-muted">{formatLongDate(PUBLISHED_DATE)}</span>
                <span className="font-mono text-[11px] text-ink-muted">~7 min read</span>
                <Byline variant="full" className="mt-2" />
              </div>

              <div className="lg:col-span-7 lg:col-start-3">
                <p
                  className="font-editorial text-ink"
                  style={{ fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em" }}
                >
                  Now what?
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================
            01 — THE LIFECYCLE. Big idea, then the hero Exhibit 01.
           ================================================================ */}
        <section id="lifecycle" className="mb-32 flex flex-col gap-14">
          <AnnotatedBlock>
            <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
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
            </div>
          </AnnotatedBlock>

          <AnnotatedBlock span={10}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <figure className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                  <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    Exhibit 01 — The Trade Lifecycle
                  </figcaption>
                </div>
                <div className="mt-8">
                  <ExhibitScroll minWidth={700}>
                    <TradeLifecycleExhibit />
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
              <p>Three phases. Inside management, two modes — one defensive, one offensive.</p>
              <p>Absent evidence, neither fires.</p>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            02 — PIPELINE. Shared PipelineStrip, unchanged.
           ================================================================ */}
        <section id="pipeline" className="mb-32">
          <AnnotatedBlock span={10} gloss="Pipeline">
            <PipelineStrip activeIndex={4} />
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            03 — WHERE EVIDENCE COMES FROM. Foundational prose ahead of the
            three phases — the same role Framework 01's Method section
            plays. Load-bearing per the original file's own note; kept
            intact.
           ================================================================ */}
        <section id="evidence" className="mb-32">
          <AnnotatedBlock>
            <div className="flex flex-col gap-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(32px, 4.4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                Where Evidence Comes From
              </h2>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>Every adjustment requires evidence. That evidence arrives from two directions.</p>
                <p>
                  The first is the trade itself — what this position has already done, and
                  whether it has advanced far enough to justify carrying less risk or
                  committing more capital. The second is the environment. Framework 01
                  classifies conditions as aggressive, neutral, or defensive, and those
                  conditions change how much room a trade should be given. Neither source is
                  me. Both are the market.
                </p>
              </div>
              <PrincipleBlock>
                Evidence comes from the position or from the environment. Never from how I
                feel about either.
              </PrincipleBlock>
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            04 — COMMIT.
           ================================================================ */}
        <section id="commit" className="relative mt-32">
          <GhostNumeral>1</GhostNumeral>

          <AnnotatedBlock gloss="Phase 1 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(56px, 8vw, 108px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}
              >
                Commit
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  Framework 03 decided this setup deserves capital. Framework 04 decided how
                  much. Commit is the moment that capital actually moves.
                </p>
                <p>
                  Three things happen together and none of them happen afterwards: the
                  trigger fires, the stop goes in, and the risk becomes real. A stop placed
                  after entry is not a stop — it is a decision deferred to the worst possible
                  moment, when the position is already moving against me and my judgement is
                  least reliable.
                </p>
                <p>
                  Different setups need different room. A tight base and a wide-swinging flag
                  do not deserve the same distance, and forcing one number onto both either
                  strangles the trade or overpays for it. What stays constant is the
                  discipline: every setup gets enough room to work and no more, the distance
                  is decided before entry, and it is never widened afterwards.
                </p>
              </div>
              <div className="mt-6">
                <PrincipleBlock>The risk is defined before the trade begins, not during it.</PrincipleBlock>
              </div>
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            05 — MANAGE.
           ================================================================ */}
        <section id="manage" className="relative mt-32">
          <GhostNumeral>2</GhostNumeral>

          <AnnotatedBlock gloss="Phase 2 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(56px, 8vw, 108px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}
              >
                Manage
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14 flex flex-col gap-10">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  Stop movement, adding to a position, and taking partial profits look like
                  three separate techniques. They are one question asked three ways: has the
                  trade earned more freedom, or more capital, or neither?
                </p>
                <p>
                  The answer never comes from me. It comes from what the position has already
                  done, and from the conditions it is trading in.
                </p>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 02 — Two Paths
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={600}>
                      <TwoPathsExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>
                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">02</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock span={10}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                <figure className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                    <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      Exhibit 03 — What Earns What
                    </figcaption>
                  </div>
                  <div className="mt-8">
                    <ExhibitScroll minWidth={600}>
                      <WhatEarnsWhatExhibit />
                    </ExhibitScroll>
                  </div>
                </figure>
                <div aria-hidden="true" className="hidden shrink-0 border-t-2 border-ink pt-4 lg:block lg:w-[110px]">
                  <span className="font-display text-[64px] font-bold leading-none text-rule-strong">03</span>
                </div>
              </div>
            </AnnotatedBlock>

            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
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
            </AnnotatedBlock>
          </div>
        </section>

        {/* ================================================================
            06 — EXIT.
           ================================================================ */}
        <section id="exit" className="relative mt-32">
          <GhostNumeral>3</GhostNumeral>

          <AnnotatedBlock gloss="Phase 3 of 3">
            <div className="relative border-t-2 border-ink pt-6">
              <h2
                className="font-display font-bold text-ink"
                style={{ fontSize: "clamp(56px, 8vw, 108px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}
              >
                Exit
              </h2>
            </div>
          </AnnotatedBlock>

          <div className="mt-14">
            <AnnotatedBlock>
              <div className="flex flex-col gap-6 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  Every trade rests on a reason. The exit question is simply whether that
                  reason still holds.
                </p>
                <p>
                  A thesis can end several ways. The stop is hit and the setup is
                  invalidated. The target is reached and the move is complete. The structure
                  that justified the trade breaks down. Or enough time passes without
                  progress that the capital is better used elsewhere. All four are the same
                  event: the reason for holding has expired.
                </p>
              </div>
              <div className="mt-6">
                <PrincipleBlock>
                  I exit when the thesis ends, not when the P&amp;L is uncomfortable.
                </PrincipleBlock>
              </div>
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
                The market earns every adjustment.
              </p>
              <div className="mt-6 flex flex-col gap-4 text-[19px] leading-[1.75] text-ink-soft">
                <p>
                  A trade&apos;s default state is unchanged. Compounding must be earned by
                  the market proving me right. Protecting must be earned by conditions
                  turning, or by the remaining reward no longer justifying the remaining
                  risk.
                </p>
              </div>
              <p className="mt-6 font-display text-2xl font-bold text-ink">
                Nothing changes because I feel like changing it.
              </p>
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
            </div>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            09 — THE LOOP. Not a phase — no ghost numeral — the pipeline is
            a cycle, not a line.
           ================================================================ */}
        <section id="loop" className="mt-32">
          <AnnotatedBlock span={10}>
            <figure>
              <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-4">
                <figcaption className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                  Exhibit 04 — The Process Repeats
                </figcaption>
              </div>
              <div className="mt-8">
                <ExhibitScroll minWidth={600}>
                  <TheLoopExhibit />
                </ExhibitScroll>
              </div>
            </figure>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            10 — THE CLOSE. Replaces the Handoff pattern — there is no
            Framework 06 — exactly as production already had it.
           ================================================================ */}
        <section id="close" className="mt-32">
          <AnnotatedBlock>
            <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Framework 05 answered
            </span>
            <p className="mt-2 font-display text-[22px] font-medium leading-snug text-ink sm:text-[24px]">
              &ldquo;Now what?&rdquo;
            </p>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-faint">There is no Framework 06.</p>
            <p className="mt-4 text-[19px] leading-relaxed text-ink">
              The trade closes. The market changes. The process begins again.
            </p>
          </AnnotatedBlock>
        </section>

        {/* ================================================================
            11 — VERSION NOTE + EMAIL CAPTURE.
           ================================================================ */}
        <section id="version" className="mt-32">
          <AnnotatedBlock gloss="Version log">
            <div className="border-t-2 border-ink pt-8">
              <p className="font-mono text-[13px] leading-relaxed text-ink-faint">
                Version 0.1 — This framework will be refined as the process evolves.
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
