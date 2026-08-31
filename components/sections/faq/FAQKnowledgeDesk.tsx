"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import { faqCategories, iconComponents } from "@/data/faq";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

/**
 * FAQ — Knowledge Desk. Ported from the /design-lab/faq prototype.
 *
 * Unlike Offerings/Research, this is deliberately NOT a Cinematic Signal
 * hero page — FAQ is a utility page first. It borrows the same tokens
 * (ink/growth-green, font-display/mono/editorial, Reveal) but skips
 * ContourField, dark sections and scroll-triggered drama entirely: the
 * whole point is fast scanning, not a cinematic arrival.
 *
 * IA change from the previous version: the six categories no longer live
 * behind a tab switcher with a sidebar sub-list that duplicated each
 * question's title (once as a scrollspy link, once as the accordion
 * itself). Here every category is one continuous, anchorable section; a
 * sticky pill rail scrollspies across them instead of gating content
 * behind a click. All copy is read from data/faq.ts.
 */

const NAV_TOP_OFFSET = "top-[64px] sm:top-[72px]";
const SCROLL_MARGIN = "scroll-mt-[128px] sm:scroll-mt-[140px]";

type SearchHit = {
  qId: string;
  catId: string;
  catTitle: string;
  question: string;
  answer: string;
  hasComparison?: boolean;
};

function useActiveTopic(enabled: boolean): string {
  const [active, setActive] = useState<string>(faqCategories[0].id);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    faqCategories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

function TopicRail({ active }: { active: string }) {
  return (
    <nav
      aria-label="FAQ topics"
      className={`sticky ${NAV_TOP_OFFSET} z-30 w-full border-b border-rule bg-canvas/95 backdrop-blur-sm`}
    >
      <div className="mx-auto flex max-w-[820px] items-center gap-1 overflow-x-auto px-6 py-2.5 sm:px-10">
        {faqCategories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[12.5px] transition-colors duration-200 ${
                isActive
                  ? "bg-growth-tint font-semibold text-growth-deep"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {cat.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

interface DisclosureItemProps {
  id: string;
  question: string;
  answer: string;
  hasComparison?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

function DisclosureItem({ id, question, answer, hasComparison, isOpen, onToggle }: DisclosureItemProps) {
  return (
    <div id={id} className={`${SCROLL_MARGIN} py-1`}>
      <button
        id={`${id}-trigger`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        className="group flex w-full items-start justify-between gap-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-growth focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        <span
          className={`font-display text-[16px] leading-snug transition-colors duration-200 sm:text-[17px] ${
            isOpen ? "font-semibold text-ink" : "text-ink-soft group-hover:text-ink"
          }`}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-growth/25 bg-growth-tint text-growth-deep"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
        </motion.span>
      </button>

      <motion.div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="max-w-[68ch] pb-5 pr-9">
          <p className="text-[15px] leading-[1.75] text-ink-soft">{answer}</p>

          {hasComparison && (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-vsc-md border border-growth/20 bg-growth-wash p-4">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-growth-deep">
                  Trading business
                </h3>
                <ul className="mt-2.5 flex flex-col gap-1.5 text-[13px] text-ink-muted">
                  {["Defined process", "Defined risk", "Repeatable edge", "Position sizing", "Capital preservation"].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-growth" /> {t}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="rounded-vsc-md border border-rose-500/15 bg-canvas-sunk p-4">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-rose-500/80">
                  Gambling
                </h3>
                <ul className="mt-2.5 flex flex-col gap-1.5 text-[13px] text-ink-muted">
                  {["Outcome driven", "No process", "No edge", "Emotional decisions", "Uncontrolled risk"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-rose-400/50" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function FAQKnowledgeDesk() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const hasHandledHash = useRef(false);

  const totalQuestions = useMemo(
    () => faqCategories.reduce((acc, c) => acc + c.questions.length, 0),
    []
  );

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery !== "";
  const activeTopic = useActiveTopic(!isSearching);

  const searchResults: SearchHit[] = useMemo(() => {
    if (!isSearching) return [];
    const hits: SearchHit[] = [];
    faqCategories.forEach((cat) => {
      cat.questions.forEach((q, idx) => {
        if (
          q.question.toLowerCase().includes(normalizedQuery) ||
          q.answer.toLowerCase().includes(normalizedQuery) ||
          cat.title.toLowerCase().includes(normalizedQuery)
        ) {
          hits.push({ qId: `q-${cat.id}-${idx}`, catId: cat.id, catTitle: cat.title, question: q.question, answer: q.answer, hasComparison: q.hasComparison });
        }
      });
    });
    return hits;
  }, [normalizedQuery, isSearching]);

  // Deep-link: /faq#q-risk-1 opens and scrolls to that exact question.
  useEffect(() => {
    if (hasHandledHash.current) return;
    hasHandledHash.current = true;
    const hash = window.location.hash.replace("#", "");
    if (!hash || !hash.startsWith("q-")) return;
    requestAnimationFrame(() => {
      setOpenIds((prev) => new Set(prev).add(hash));
      document.getElementById(hash)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    });
  }, [reduce]);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allExpanded = openIds.size === totalQuestions;
  function toggleAll() {
    if (allExpanded) {
      setOpenIds(new Set());
    } else {
      const all = new Set<string>();
      faqCategories.forEach((cat) => cat.questions.forEach((_, i) => all.add(`q-${cat.id}-${i}`)));
      setOpenIds(all);
    }
  }

  return (
    <main className="relative w-full bg-canvas">
      {/* ================================================================
          1. OPENING — compact editorial masthead, search is the primary
          action directly under the headline (not a separate hero section
          the reader has to scroll past to reach it).
         ================================================================ */}
      <section className="relative w-full border-b border-rule bg-surface-warm pb-9 pt-28 sm:pb-11 sm:pt-32">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          <Reveal>
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-growth">
              Knowledge Desk
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-4 max-w-[22ch] font-display text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[42px]">
              Answers before you invest.
            </h1>
          </Reveal>

          <Reveal delay={0.09}>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft sm:text-[16px]">
              {totalQuestions} questions across {faqCategories.length} topics — philosophy, risk, the learning hub,
              advisory, and how a strategic discussion works.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="mt-7">
            <label
              htmlFor="faq-search"
              className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint"
            >
              Search the FAQ
            </label>
            <div className="relative max-w-[560px] select-none">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-ink-faint">
                <Search className="h-4 w-4" />
              </div>
              <input
                id="faq-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “risk”, “stop-loss”, “strategic discussion”…"
                className="w-full rounded-vsc-md border border-rule bg-surface py-3.5 pl-11 pr-28 text-[14px] text-ink placeholder-ink-faint shadow-lift-1 transition-all duration-200 focus:border-growth/60 focus:outline-none focus:ring-1 focus:ring-growth/40"
              />
              {query.trim() !== "" && (
                <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold ${
                      searchResults.length > 0
                        ? "border-growth/30 bg-growth-tint text-growth-deep"
                        : "border-rose-500/30 bg-rose-500/10 text-rose-500"
                    }`}
                  >
                    {searchResults.length} {searchResults.length === 1 ? "match" : "matches"}
                  </span>
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="relative flex h-6 w-6 items-center justify-center rounded-full bg-canvas-sunk text-ink-muted transition-colors hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          2. STICKY TOPIC RAIL — scrollspies the six sections below.
          Hidden while searching, since there's nothing to jump to.
         ================================================================ */}
      {!isSearching && <TopicRail active={activeTopic} />}

      {/* ================================================================
          3. CONTENT — one continuous, anchorable list. Search flattens it
          into a results view with topic labels and a real no-results state.
         ================================================================ */}
      <section id="faq-content" className="relative w-full py-10 sm:py-14">
        <div className="mx-auto max-w-[820px] px-6 sm:px-10">
          {isSearching ? (
            <div>
              <div className="mb-6 font-mono text-[12px] uppercase tracking-wider text-ink-faint">
                {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for &ldquo;{query.trim()}&rdquo;
              </div>

              {searchResults.length === 0 ? (
                <div className="flex flex-col items-center py-14 text-center">
                  <p className="text-[15px] text-ink-soft">No matching questions found.</p>
                  <p className="mt-2 max-w-[40ch] text-[13.5px] text-ink-faint">
                    Try a different keyword, or ask us directly — a Strategic Discussion covers anything not answered
                    here.
                  </p>
                  <div className="mt-6">
                    <VSCButton href="/enquire" variant="growth">
                      Enquire now
                    </VSCButton>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-rule border-t border-rule">
                  {searchResults.map((hit) => (
                    <div key={hit.qId} className="pt-1">
                      <span className="mt-4 block font-mono text-[10.5px] font-semibold uppercase tracking-wider text-growth-deep">
                        {hit.catTitle}
                      </span>
                      <DisclosureItem
                        id={`search-${hit.qId}`}
                        question={hit.question}
                        answer={hit.answer}
                        hasComparison={hit.hasComparison}
                        isOpen={openIds.has(hit.qId)}
                        onToggle={() => toggle(hit.qId)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[12px] text-ink-faint">{totalQuestions} questions</span>
                <button
                  onClick={toggleAll}
                  className="font-mono text-[12px] font-semibold text-growth-deep underline decoration-growth/40 underline-offset-4 transition-colors hover:text-growth"
                >
                  {allExpanded ? "Collapse all" : "Expand all"}
                </button>
              </div>

              {faqCategories.map((cat, catIdx) => {
                const Icon = iconComponents[cat.iconName];
                return (
                  <div key={cat.id} id={cat.id} className={`${SCROLL_MARGIN} ${catIdx > 0 ? "mt-12" : ""}`}>
                    <div className="flex items-start gap-3 border-b border-rule pb-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 stroke-[1.5] text-growth-deep" />
                      <div>
                        <h2 className="font-display text-[20px] font-semibold leading-tight text-ink sm:text-[22px]">
                          {cat.title}
                        </h2>
                        <p className="mt-1 max-w-[56ch] text-[13.5px] leading-relaxed text-ink-soft">
                          {cat.description}
                        </p>
                      </div>
                      <span className="ml-auto shrink-0 whitespace-nowrap font-mono text-[11px] text-ink-faint">
                        {cat.questions.length} {cat.questions.length === 1 ? "Q" : "Qs"}
                      </span>
                    </div>

                    <div className="flex flex-col divide-y divide-rule">
                      {cat.questions.map((q, idx) => {
                        const qId = `q-${cat.id}-${idx}`;
                        return (
                          <DisclosureItem
                            key={qId}
                            id={qId}
                            question={q.question}
                            answer={q.answer}
                            hasComparison={q.hasComparison}
                            isOpen={openIds.has(qId)}
                            onToggle={() => toggle(qId)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          4. STILL LOOKING — an integrated close, not a generic support
          banner: same editorial-italic device the homepage/About/Offerings
          use at their own close, kept light (utility page, not a set
          piece) with one real path forward.
         ================================================================ */}
      <section className="relative w-full border-t border-rule bg-surface-warm py-14 sm:py-18">
        <div className="mx-auto max-w-[820px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
              Still looking for an answer?
            </span>
            <h2 className="font-editorial mx-auto mt-4 max-w-[20ch] text-[28px] leading-[1.15] text-ink [font-style:italic] sm:text-[32px]">
              Bring it to a Strategic Discussion.
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
              A 1:1 conversation about your capital, your risk philosophy, and whether VSC&apos;s framework actually
              fits how you think — not a pitch.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <VSCButton href="/enquire" variant="growth" className="min-h-[48px] px-8 text-[15px]">
                Enquire <span aria-hidden="true">&rarr;</span>
              </VSCButton>
              <Link href="/offerings" className="font-mono text-[13px] text-ink-muted hover:text-growth">
                Or see what VSC offers &rarr;
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
