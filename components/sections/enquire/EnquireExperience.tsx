"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { VSCButton } from "@/components/ui/vsc/VSCButton";
import { PortfolioAnalysisModal } from "@/components/sections/enquire/PortfolioAnalysisModal";
import { PortfolioAnalysisCallout } from "@/components/sections/enquire/PortfolioAnalysisCallout";

/** sessionStorage flag — one auto-open per browser session, ever. */
const PORTFOLIO_OFFER_SESSION_KEY = "vsc:portfolio-analysis-offer-shown";

/**
 * Enquire — The Open Line.
 *
 * One dark cinematic composition, not two chapters: the founder statement
 * and reassurance content sit left, the enquiry form is a light contrasting
 * panel inset on the right, and "after you submit" runs as a horizontal
 * rail beneath both — so headline and form coexist within roughly one
 * desktop viewport, with nothing to scroll into before acting. Supersedes
 * the former DiscussionForm/AfterYouSubmit split; approved via the
 * /design-lab/enquire prototype.
 *
 * Form field names/ids, hidden bot-field + form-name, action/method
 * fallback, and the fetch-to-/__forms.html submission logic are unchanged
 * from the prior production implementation — only presentation and
 * composition changed.
 */

const BEFORE_YOU_WRITE: { q: string; a?: string; email?: boolean }[] = [
  {
    q: "Is this a sales pitch?",
    a: "No. Zero sales pressure — pure process and risk-parameter review.",
  },
  {
    q: "Who reads this?",
    a: "Sudheer, personally. A direct line to the research desk, no hand-off.",
  },
  {
    q: "What happens after?",
    a: "Desk review within 24 hours, then a reply — or a time to talk.",
  },
  {
    q: "Another way in?",
    email: true,
  },
];

const AFTER_SUBMIT = [
  { name: "Enquiry received", detail: "Logged with the research desk immediately." },
  { name: "Desk review", detail: "Read personally, usually within 24 hours." },
  { name: "Response or call", detail: "A direct reply, or a time to talk if useful." },
];

export function EnquireExperience() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioSource, setPortfolioSource] = useState<"homepage" | "enquire" | "portfolio-risk-calculator">(
    "enquire"
  );
  const [portfolioUtm, setPortfolioUtm] = useState({ source: "", medium: "", campaign: "" });
  const portfolioCalloutTriggerRef = useRef<HTMLButtonElement>(null);

  // Captured once on mount for attribution on the portfolio-analysis
  // submission. Deferred into a timer (not called synchronously in the
  // effect body) for the same reason as the auto-open effect below.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      setPortfolioUtm({
        source: params.get("utm_source") ?? "",
        medium: params.get("utm_medium") ?? "",
        campaign: params.get("utm_campaign") ?? "",
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Auto-open once per browser session, on the first /enquire visit only.
  // Manual reopen via the persistent callout always stays available. A
  // ?portfolio=1 link (e.g. the homepage hero CTA) opens immediately
  // instead of waiting on the delayed timer, and marks the offer as shown
  // so the normal delayed path doesn't also fire. An accompanying
  // ?source=portfolio-risk-calculator (from that tool's post-result CTA)
  // is preserved as the attribution source instead of the "homepage"
  // default — everything else about this entry path is unchanged.
  useEffect(() => {
    const url = new URL(window.location.href);
    const isDirectEntry = url.searchParams.has("portfolio");
    const taggedSource = url.searchParams.get("source");

    const markShown = () => {
      try {
        sessionStorage.setItem(PORTFOLIO_OFFER_SESSION_KEY, "1");
      } catch {
        // Ignore — worst case the offer auto-opens again next reload.
      }
    };

    if (isDirectEntry) {
      // All side effects deferred into the timer callback (not run
      // synchronously in the effect body) so React's dev-mode double
      // mount-cleanup-mount cycle can cancel-and-retry this cleanly instead
      // of stripping the query param before the retry gets to read it.
      const openTimer = window.setTimeout(() => {
        markShown();

        // Smallest safe way to drop the params: rewrite the URL in place,
        // no navigation, so a refresh doesn't force the modal open again.
        url.searchParams.delete("portfolio");
        url.searchParams.delete("source");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);

        setPortfolioSource(taggedSource === "portfolio-risk-calculator" ? "portfolio-risk-calculator" : "homepage");
        setIsPortfolioModalOpen(true);
      }, 0);
      return () => window.clearTimeout(openTimer);
    }

    let seen = true;
    try {
      seen = sessionStorage.getItem(PORTFOLIO_OFFER_SESSION_KEY) !== null;
    } catch {
      return;
    }
    if (seen) return;

    const timer = window.setTimeout(() => {
      markShown();
      setIsPortfolioModalOpen(true);
    }, 600);

    return () => window.clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const params = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          params.append(key, value);
        }
      }

      if (!params.has("form-name")) {
        params.set("form-name", "enquiry");
      }

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your enquiry. Please try again, or email sudheer@vsccapital.in directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative w-full">
      {/* ================================================================
          ONE composition: dark cinematic context throughout. The
          conversation statement sits left; the enquiry form is a light
          analytical panel inset on the right, not a separate chapter.
          "After you submit" runs as a horizontal rail beneath both,
          still inside this same section.
         ================================================================ */}
      <section className="relative w-full overflow-hidden bg-[#080F0B] pb-12 pt-24 sm:pb-16 sm:pt-28">
        <ContourField seed={71} layers={3} density={10} strokeColor="#7FB999" baseOpacity={0.85} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 55% 55% at 20% 15%, rgba(63,203,116,0.16) 0%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <Reveal>
            <PortfolioAnalysisCallout
              onOpen={() => {
                setPortfolioSource("enquire");
                setIsPortfolioModalOpen(true);
              }}
              triggerRef={portfolioCalloutTriggerRef}
            />
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12 sm:mt-12">
            {/* LEFT — the conversation */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7FB999]">
                  Start a conversation
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-4 font-sans text-[8vw] font-bold leading-[1.1] tracking-[-0.025em] text-[#F4F7F4] sm:text-[4.2vw] lg:text-[2.5vw]">
                  Every great investment process starts with a conversation.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-4 max-w-[42ch] text-[15.5px] leading-relaxed text-white/60">
                  Tell me what&apos;s on your mind — a specific question, or just curiosity. I read every
                  submission before I say anything back.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <StepRule size="sm" className="shrink-0" />
                  <p className="text-[13px] text-white/45">— Sudheer, Founder</p>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Before you write in
                  </span>
                  <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-white/10 pt-4 sm:grid-cols-2">
                    {BEFORE_YOU_WRITE.map((item) => (
                      <div key={item.q}>
                        <dt className="text-[13px] font-medium text-white/80">{item.q}</dt>
                        <dd className="mt-1 text-[12.5px] leading-snug text-white/45">
                          {item.email ? (
                            <>
                              Email direct —{" "}
                              <a
                                href="mailto:sudheer@vsccapital.in"
                                className="text-[#7FB999] transition-colors hover:text-white"
                              >
                                sudheer@vsccapital.in
                              </a>
                            </>
                          ) : (
                            item.a
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — the enquiry, a light analytical surface on the dark context */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="relative">
                <div aria-hidden="true" className="pointer-events-none absolute -inset-3 -z-10 rounded-vsc-lg bg-growth/10 blur-2xl" />
                <div className="relative rounded-vsc-lg border border-white/10 bg-canvas p-6 shadow-[0_24px_60px_rgba(0,0,0,0.4)] sm:p-8">
                  <AnimatePresence mode="wait" initial={false}>
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: "easeOut" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-growth" aria-hidden="true" />
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-growth">
                            Enquiry received
                          </span>
                        </div>
                        <h2 className="font-editorial mt-4 text-[9vw] italic leading-[1.08] text-ink sm:text-[4.6vw] lg:text-[2.3vw]">
                          Thank you.
                        </h2>
                        <p className="mt-5 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-soft">
                          Your enquiry has been logged with our research desk. I review every submission
                          personally within 24 business hours.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-rule pt-6">
                          <button
                            onClick={() => setIsSubmitted(false)}
                            className="min-h-[44px] font-mono text-[13px] text-ink-soft transition-colors hover:text-growth"
                          >
                            &larr; Submit another enquiry
                          </button>
                          <VSCButton href="/" variant="outline">
                            <span className="inline-flex items-center gap-2">
                              Back to home <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                          </VSCButton>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
                      >
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-growth">
                          The enquiry
                        </span>

                        {/*
                          action MUST be the static Netlify Forms endpoint,
                          not /thank-you. /thank-you is a Next page route
                          with no POST handler: the plugin answered the
                          native POST with a 200 HTML page, so a visitor
                          with JS disabled saw the thank-you screen while
                          Netlify Forms never received the submission — a
                          silent lead loss that confirmed itself as success.
                          Posting to /__forms.html means the no-JS path hits
                          the same endpoint handleSubmit uses, and Netlify
                          redirects to the thank-you page on its own.
                        */}
                        <form
                          id="vsc-form"
                          name="enquiry"
                          action="/__forms.html"
                          method="POST"
                          data-netlify="true"
                          netlify-honeypot="bot-field"
                          onSubmit={handleSubmit}
                          className="mt-5 flex flex-col gap-5"
                        >
                          <p style={{ display: "none" }}>
                            <label>
                              Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                            </label>
                            <input type="hidden" name="form-name" value="enquiry" />
                          </p>

                          <div className="flex flex-col gap-2">
                            <div className="flex items-baseline justify-between gap-4">
                              <label htmlFor="goal" className="text-[14px] font-semibold text-ink">
                                What brings you here?
                              </label>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                                Optional
                              </span>
                            </div>
                            <textarea
                              id="goal"
                              name="goal"
                              rows={2}
                              className="w-full border-b-2 border-rule bg-transparent pb-2.5 font-ui text-[16px] leading-relaxed text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none lg:text-[15px]"
                              placeholder="A specific question, or just curiosity — whatever's on your mind."
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex items-baseline justify-between gap-4">
                              <label htmlFor="name" className="text-[14px] font-semibold text-ink">
                                Your name
                              </label>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-growth">
                                Required
                              </span>
                            </div>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none"
                              placeholder="Full name"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex items-baseline justify-between gap-4">
                              <label htmlFor="email" className="text-[14px] font-semibold text-ink">
                                Email address
                              </label>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-growth">
                                Required
                              </span>
                            </div>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none"
                              placeholder="email@example.com"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex items-baseline justify-between gap-4">
                              <label htmlFor="phone" className="text-[14px] font-semibold text-ink">
                                Phone / WhatsApp
                              </label>
                              <span className="font-mono text-[10px] uppercase tracking-wider text-growth">
                                Required
                              </span>
                            </div>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none"
                              placeholder="+91 98765 43210"
                            />
                          </div>

                          {submitError && (
                            <div role="alert" className="flex items-start gap-3 rounded-vsc-sm border border-clay/30 bg-clay-tint px-4 py-3">
                              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                              <p className="text-[13.5px] leading-relaxed text-clay">{submitError}</p>
                            </div>
                          )}

                          <div className="mt-1">
                            <VSCButton
                              type="submit"
                              variant="growth"
                              disabled={isSubmitting}
                              className="w-full sm:w-auto sm:px-8"
                            >
                              <span className="inline-flex items-center gap-2">
                                {isSubmitting ? "Sending…" : submitError ? "Retry" : "Send your enquiry"}
                                {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                              </span>
                            </VSCButton>

                            <p className="mt-3 text-[12px] text-ink-faint">
                              By submitting, you agree to our{" "}
                              <Link href="/privacy" className="text-ink-muted underline transition-colors hover:text-growth">
                                Privacy Policy
                              </Link>
                              .
                            </p>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ============ AFTER YOU SUBMIT — horizontal rail, same section ============ */}
          <Reveal delay={0.2}>
            <div className="relative mt-9 border-t border-white/10 pt-6 sm:mt-11">
              {/* A real heading, not a span: this rail is a section of the
                  page and its three stage names are h3s under it. As a span
                  the outline jumped h1 -> h3, which reads to a screen reader
                  as a missing parent section. Styling is unchanged. */}
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
                After you submit
              </h2>
              <div className="relative mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
                <div aria-hidden="true" className="absolute left-[16.5%] right-[16.5%] top-[11px] hidden h-px bg-white/10 sm:block" />
                {AFTER_SUBMIT.map((stage, i) => (
                  <div key={stage.name} className="relative flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                    <span
                      aria-hidden="true"
                      className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-[#7FB999]/40 bg-[#080F0B] font-mono text-[11px] text-[#7FB999]"
                    >
                      {i + 1}
                    </span>
                    <div className="sm:mt-2.5">
                      <h3 className="text-[13.5px] font-semibold text-white/85">{stage.name}</h3>
                      <p className="mt-0.5 max-w-[24ch] text-[12.5px] leading-snug text-white/45 sm:mx-auto">
                        {stage.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Secondary distribution link — deliberately quiet, below the
              primary enquiry/portfolio-analysis actions. Not a conversion
              CTA, so no icon, card, or accent treatment beyond the link
              itself. */}
          <Reveal delay={0.25}>
            <p className="mt-7 text-center text-[13px] text-white/40 sm:text-left">
              Prefer market updates on WhatsApp?{" "}
              <a
                href="https://whatsapp.com/channel/0029VbEFHnQKWEKq2I8azp3S"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 underline underline-offset-2 transition-colors duration-200 hover:text-[#7FB999]"
              >
                Follow VSC on WhatsApp &rarr;
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <PortfolioAnalysisModal
        open={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        returnFocusRef={portfolioCalloutTriggerRef}
        source={portfolioSource}
        utm={portfolioUtm}
      />
    </main>
  );
}
