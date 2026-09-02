import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

/**
 * VSC Advantage — the service page.
 *
 * A boutique, by-application service page: hero, who it is for, three steps,
 * what you gain, enquiry. Ported verbatim from the approved
 * /design-lab/advantage prototype; that lab route now renders this same
 * component, so the two cannot drift apart.
 *
 * It replaced a version built around an "Exhibit 01 · Risk is decided before
 * the trade" chart. That chart showed VSC's own risk limits as a standard a
 * client's record would be measured against, which framed the service as an
 * audit rather than a one-to-one process review. RiskGatesChart had no other
 * consumer and was deleted with it.
 *
 * Nothing here claims a frequency, a deliverable format or a price, because
 * none of those exist in the source material.
 */

const STEPS = [
  {
    number: "01",
    label: "Understand you",
    body: "Your situation, what you are trying to do with your capital, and the reasoning behind how you enter, size and exit today — including the parts that are habit rather than rule.",
  },
  {
    number: "02",
    label: "Find what repeats",
    body: "The patterns that recur across your own decisions: oversizing, exiting early, holding well past the point you meant to.",
  },
  {
    number: "03",
    label: "Formalise the rules",
    body: "Turn the decisions that currently run on instinct into clear decision and risk rules you apply yourself. Reviews continue after that only where they add something.",
  },
] as const;

export function AdvantageService() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-canvas text-ink">
      <PaperGrain />
      <AmbientLightPool
        color="rgba(15, 122, 64, 0.05)"
        className="left-[50%] top-[18%] -translate-x-1/2 scale-[1.5]"
      />

      <main id="main-content" className="relative z-10 w-full pb-16 pt-32 md:pb-20 md:pt-40">
        <Hero />
        <WhoItIsFor />
        <Process />
        <WhatYouGain />
      </main>

      <ClosingBand />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 1 — Hero
 * ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="container mx-auto max-w-[1200px] px-4 sm:px-6">
      <div className="max-w-[720px]">
        <div className="mb-6 flex items-baseline gap-x-3">
          <Link
            href="/offerings"
            className="group -my-[14px] inline-flex min-h-[44px] items-center gap-2 py-[14px] font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Offerings
          </Link>
        </div>

        <Reveal>
          <h1 className="font-display text-ink">VSC Advantage</h1>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-5 max-w-[56ch] text-[18px] leading-relaxed text-ink-soft">
            A structured one-to-one review of how you make capital decisions, and help turning what
            currently runs on instinct into rules you can apply yourself.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[56ch] border-l-2 border-growth pl-4 text-[15px] leading-relaxed text-ink-soft">
            Your capital stays in your own account and every decision stays yours. Not stock tips, and
            not a way to get rich quickly.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8">
            <VSCButton href="/enquire" variant="growth" className="px-7 text-[16px]">
              Enquire about a review
            </VSCButton>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <dl className="mt-9 grid gap-px overflow-hidden rounded-vsc-lg border border-rule bg-rule sm:grid-cols-3">
            <MetaCell term="Access" desc="By application" />
            <MetaCell term="Capacity" desc="Limited" />
            <MetaCell term="Pricing" desc="Shared once we know the fit" />
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function MetaCell({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="bg-surface px-5 py-4">
      <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
        {term}
      </dt>
      <dd className="mt-1.5 text-[15px] font-medium text-ink">{desc}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 2 — Who it is for
 * ------------------------------------------------------------------ */

function WhoItIsFor() {
  return (
    <section className="container mx-auto mt-16 max-w-[1200px] px-4 sm:mt-20 sm:px-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:gap-12">
        <Reveal>
          <h2 className="flex items-center gap-3 text-[13px] font-semibold text-growth">
            <StepRule size="sm" />
            <span>Who it is for</span>
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="max-w-[54ch] text-[19px] leading-relaxed text-ink">
            Self-directed investors, professionals and business owners who already have capital at
            work, make their own decisions, and want those decisions to follow a clearer process.
          </p>
          <p className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-ink-muted">
            It suits people who want to own the reasoning — not people looking to hand the thinking
            over. If you have not started investing yet, the{" "}
            <Link href="/offerings/learning-hub" className="link-underline font-semibold text-growth">
              Learning Hub
            </Link>{" "}
            is the better starting point.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 3 — The review, in three steps
 * ------------------------------------------------------------------ */

function Process() {
  return (
    <section className="container mx-auto mt-16 max-w-[1200px] px-4 sm:mt-20 sm:px-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:gap-12">
        <Reveal>
          <h2 className="flex items-center gap-3 text-[13px] font-semibold text-growth">
            <StepRule size="sm" />
            <span>How a review works</span>
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <ol className="flex flex-col">
            {STEPS.map((step, i) => (
              <li
                key={step.number}
                className={`flex gap-5 py-6 ${i > 0 ? "border-t border-rule" : "pt-0"}`}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[13px] font-semibold text-growth"
                >
                  {step.number}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[19px] font-semibold leading-snug tracking-tight text-ink">
                    {step.label}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 4 — What you gain
 * ------------------------------------------------------------------ */

function WhatYouGain() {
  return (
    <section className="container mx-auto mt-16 max-w-[1200px] px-4 sm:mt-20 sm:px-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] md:gap-12">
        <Reveal>
          <h2 className="flex items-center gap-3 text-[13px] font-semibold text-growth">
            <StepRule size="sm" />
            <span>What you gain</span>
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="font-display text-[19px] font-semibold leading-snug tracking-tight text-ink">
                Written decision and risk rules
              </dt>
              <dd className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">
                How much goes in, and when it comes out — settled in advance rather than in the
                moment.
              </dd>
            </div>
            <div>
              <dt className="font-display text-[19px] font-semibold leading-snug tracking-tight text-ink">
                A clear view of what repeats
              </dt>
              <dd className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">
                The patterns in your own decisions, named from what you actually did rather than from
                general advice.
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 5 — Close
 * ------------------------------------------------------------------ */

function ClosingBand() {
  return (
    // No top margin: main already carries pb-16/pb-20, and stacking the two
    // opened ~160px of dead canvas above the band.
    <section className="relative w-full bg-vsc-dark py-16 sm:py-20">
      <div className="container mx-auto max-w-[760px] px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-semibold tracking-tight text-vsc-dark-ink">
            Better decisions before better returns.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-[50ch] text-[16.5px] leading-relaxed text-vsc-dark-ink-muted">
            Tell us how you invest today and what you would like to be clearer about. Read personally,
            usually within 24 hours — and if there is no fit, we will say so.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <VSCButton href="/enquire" variant="growth" className="px-8 text-[17px]">
              Enquire about a review
            </VSCButton>
            <Link
              href="/faq"
              className="link-underline inline-flex min-h-11 items-center gap-2 text-[14.5px] font-medium text-vsc-dark-ink-muted transition-colors hover:text-vsc-dark-accent"
            >
              Read the FAQ first
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
