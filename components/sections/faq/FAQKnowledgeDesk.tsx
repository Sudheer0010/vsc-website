"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus, Search, X } from "lucide-react";
import { faqCategories, iconComponents } from "@/data/faq";
import { VSCButton } from "@/components/ui/vsc/VSCButton";
import { cn } from "@/lib/utils";

/**
 * FAQ — Knowledge Desk.
 *
 * Arranged in a compact max-w-[1200px] two-column grid with instant topic
 * filtering and live search so all 16 questions scan in ~3 rows instead of
 * stretching across a narrow single-column scroll. Preserves /faq#q-<cat>-<idx>
 * and /faq#<cat> deep links.
 */

const SCROLL_MARGIN = "scroll-mt-28";

type SearchHit = {
  qId: string;
  catId: string;
  catTitle: string;
  question: string;
  answer: string;
  hasComparison?: boolean;
};

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
    <div id={id} className={SCROLL_MARGIN}>
      <button
        id={`${id}-trigger`}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        className="group flex min-h-[52px] w-full items-start justify-between gap-4 py-3.5 text-left"
      >
        <span
          className={cn(
            "font-display text-[16px] leading-snug transition-colors duration-200",
            isOpen ? "font-semibold text-ink" : "font-medium text-ink-soft group-hover:text-ink"
          )}
        >
          {question}
        </span>
        <motion.span
          aria-hidden="true"
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
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-4 pr-8">
          <p className="text-[15px] leading-[1.68] text-ink-soft">{answer}</p>

          {hasComparison && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-vsc-md border border-growth/20 bg-growth-wash p-3.5">
                <h3 className="text-[12.5px] font-semibold text-growth-deep">Trading business</h3>
                <ul className="mt-2 flex flex-col gap-1 text-[13px] text-ink-soft">
                  {["Defined process", "Defined risk", "Repeatable edge", "Position sizing", "Capital preservation"].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-growth" />
                        {t}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="rounded-vsc-md border border-clay/20 bg-clay-tint/60 p-3.5">
                <h3 className="text-[12.5px] font-semibold text-clay">Gambling</h3>
                <ul className="mt-2 flex flex-col gap-1 text-[13px] text-ink-soft">
                  {["Outcome driven", "No process", "No edge", "Emotional decisions", "Uncontrolled risk"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                      {t}
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
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const hasHandledHash = useRef(false);

  const totalQuestions = useMemo(
    () => faqCategories.reduce((acc, c) => acc + c.questions.length, 0),
    []
  );

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery !== "";

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
          hits.push({
            qId: `q-${cat.id}-${idx}`,
            catId: cat.id,
            catTitle: cat.title,
            question: q.question,
            answer: q.answer,
            hasComparison: q.hasComparison,
          });
        }
      });
    });
    return hits;
  }, [normalizedQuery, isSearching]);

  const visibleCategories = useMemo(
    () => (selectedCat === "all" ? faqCategories : faqCategories.filter((c) => c.id === selectedCat)),
    [selectedCat]
  );

  const visibleQuestionIds = useMemo(() => {
    const ids: string[] = [];
    visibleCategories.forEach((cat) => {
      cat.questions.forEach((_, idx) => ids.push(`q-${cat.id}-${idx}`));
    });
    return ids;
  }, [visibleCategories]);

  // Deep-link: /faq#q-risk-1 opens and scrolls to that exact question.
  useEffect(() => {
    if (hasHandledHash.current) return;
    hasHandledHash.current = true;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    if (hash.startsWith("q-")) {
      requestAnimationFrame(() => {
        setOpenIds((prev) => new Set(prev).add(hash));
        document.getElementById(hash)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      });
    } else if (faqCategories.some((c) => c.id === hash)) {
      requestAnimationFrame(() => {
        setSelectedCat(hash);
      });
    }
  }, [reduce]);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allVisibleExpanded =
    visibleQuestionIds.length > 0 && visibleQuestionIds.every((id) => openIds.has(id));

  function toggleAllVisible() {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (allVisibleExpanded) {
        visibleQuestionIds.forEach((id) => next.delete(id));
      } else {
        visibleQuestionIds.forEach((id) => next.add(id));
      }
      return next;
    });
  }

  return (
    <main id="main-content" className="min-h-screen w-full bg-canvas pb-20 pt-28 sm:pt-32 md:pb-24 md:pt-34">
      <div className="container mx-auto max-w-[1200px] px-6 sm:px-10">
        {/* Compact 2-column header: title + search side-by-side */}
        <header className="grid gap-6 border-b border-rule pb-9 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <span className="eyebrow">Knowledge Desk</span>
            <h1 className="font-display mt-3 text-[clamp(2.25rem,3.9vw,3.35rem)] font-bold leading-[1.03] tracking-[-0.03em] text-ink">
              Answers before you invest.
            </h1>
            <p className="mt-3 max-w-[54ch] text-[16.5px] leading-[1.6] text-ink-soft">
              <span className="font-mono tabular-nums">{totalQuestions}</span> questions across{" "}
              <span className="font-mono tabular-nums">{faqCategories.length}</span> topics &mdash; philosophy, risk,
              VSC Learn, advisory, and strategic discussions.
            </p>
          </div>

          <div className="lg:col-span-5">
            <label htmlFor="faq-search" className="mb-2 block text-[13px] font-semibold text-ink-muted">
              Search questions
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-ink-faint">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                id="faq-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “risk”, “stop-loss”, “tips”…"
                className="min-h-[48px] w-full rounded-vsc-md border border-rule bg-surface py-2.5 pl-10 pr-28 text-[15.5px] text-ink placeholder-ink-faint shadow-lift-1 transition-colors focus:border-growth focus:outline-none"
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-2.5 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums",
                      searchResults.length > 0
                        ? "border-growth/30 bg-growth-tint text-growth-deep"
                        : "border-clay/30 bg-clay-tint text-clay"
                    )}
                  >
                    {searchResults.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas-sunk text-ink-muted transition-colors hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Filter bar + expand toggle */}
        {!isSearching && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Filter FAQ by topic" className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                aria-pressed={selectedCat === "all"}
                onClick={() => setSelectedCat("all")}
                className={cn(
                  "inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors",
                  selectedCat === "all"
                    ? "border-growth bg-growth text-white"
                    : "border-rule bg-surface text-ink-soft hover:border-growth/50 hover:text-ink"
                )}
              >
                <span>All topics</span>
                <span className="font-mono text-[12px] tabular-nums opacity-85">{totalQuestions}</span>
              </button>

              {faqCategories.map((cat) => {
                const isSelected = selectedCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCat(cat.id)}
                    className={cn(
                      "inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors",
                      isSelected
                        ? "border-growth bg-growth text-white"
                        : "border-rule bg-surface text-ink-soft hover:border-growth/50 hover:text-ink"
                    )}
                  >
                    <span>{cat.title}</span>
                    <span className="font-mono text-[12px] tabular-nums opacity-80">{cat.questions.length}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={toggleAllVisible}
              className="inline-flex min-h-[40px] items-center text-[13.5px] font-semibold text-growth underline decoration-growth/35 underline-offset-4 transition-colors hover:text-growth-deep"
            >
              {allVisibleExpanded ? "Collapse all" : "Expand all"}
            </button>
          </div>
        )}

        {/* Main content: Search results OR 2-column category grid */}
        <section id="faq-content" className="mt-7">
          {isSearching ? (
            <div className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-8">
              <div className="mb-4 text-[13.5px] font-semibold text-ink-muted">
                <span className="font-mono tabular-nums">{searchResults.length}</span>{" "}
                {searchResults.length === 1 ? "result" : "results"} for &ldquo;{query.trim()}&rdquo;
              </div>

              {searchResults.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <p className="text-[16px] font-medium text-ink">No matching questions found.</p>
                  <p className="mt-2 max-w-[44ch] text-[14.5px] text-ink-soft">
                    Try another keyword, or ask directly in a Strategic Discussion.
                  </p>
                  <div className="mt-5">
                    <VSCButton href="/enquire" variant="growth">
                      Enquire now
                    </VSCButton>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-rule border-t border-rule">
                  {searchResults.map((hit) => (
                    <div key={hit.qId} className="pt-2">
                      <span className="mt-2 block text-[12px] font-semibold text-growth">{hit.catTitle}</span>
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
            <div className={cn("grid gap-6", selectedCat === "all" ? "lg:grid-cols-2" : "max-w-[820px]")}>
              {visibleCategories.map((cat) => {
                const Icon = iconComponents[cat.iconName];
                return (
                  <section
                    key={cat.id}
                    id={cat.id}
                    aria-labelledby={`${cat.id}-heading`}
                    className={`${SCROLL_MARGIN} flex flex-col rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-7`}
                  >
                    <div className="flex items-start gap-3 border-b border-rule pb-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-vsc-md bg-growth-wash text-growth">
                        <Icon className="h-[18px] w-[18px] stroke-[1.75]" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h2
                            id={`${cat.id}-heading`}
                            className="font-display text-[20px] font-semibold leading-tight text-ink"
                          >
                            {cat.title}
                          </h2>
                          <span className="shrink-0 font-mono text-[12px] tabular-nums text-ink-faint">
                            {cat.questions.length} {cat.questions.length === 1 ? "Q" : "Qs"}
                          </span>
                        </div>
                        <p className="mt-1 text-[13.5px] leading-snug text-ink-muted">{cat.description}</p>
                      </div>
                    </div>

                    <div className="divide-y divide-rule">
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

                    {cat.id === "discussions" && (
                      <div className="mt-auto border-t border-rule pt-4">
                        <Link
                          href="/enquire"
                          className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-growth hover:text-growth-deep"
                        >
                          Schedule a 1:1 discussion <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </section>

        {/* Compact horizontal closing strip */}
        <section
          aria-labelledby="faq-close-heading"
          className="mt-10 rounded-vsc-xl border border-rule bg-canvas-sunk p-6 sm:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <span className="eyebrow">Still looking for an answer?</span>
              <h2
                id="faq-close-heading"
                className="font-editorial mt-2 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.12] text-ink [font-style:italic]"
              >
                Bring it to a Strategic Discussion.
              </h2>
              <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-ink-soft">
                A 1:1 conversation about your capital, your risk philosophy, and whether VSC&apos;s framework fits how
                you think &mdash; not a pitch.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
              <VSCButton href="/enquire" variant="growth">
                <span className="inline-flex items-center gap-2">
                  Enquire
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </VSCButton>
              <Link
                href="/offerings"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-semibold text-ink transition-colors hover:text-growth"
              >
                See what VSC offers <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
