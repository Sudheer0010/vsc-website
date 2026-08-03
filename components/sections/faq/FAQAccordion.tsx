import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Plus, X } from "lucide-react";
import { 
  faqCategories, 
  bgGlows, 
  iconComponents 
} from "@/data/faq";
import { AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

export function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState<string>("about");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  // Category switch scroll reset & accordion collapse
  useEffect(() => {
    setExpandedIndex(null);
    const target = document.getElementById("faq-content-area");
    if (target) {
      const yOffset = -140; // Spacing for sticky navigation header
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  }, [activeCategory, shouldReduceMotion]);

  // Scroll Spy Observer logic for desktop sidebar tracking
  useEffect(() => {
    if (searchQuery.trim() !== "") return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveQuestionId(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const questionElements = document.querySelectorAll(".question-item");
    questionElements.forEach(el => observer.observe(el));

    return () => {
      questionElements.forEach(el => observer.unobserve(el));
    };
  }, [activeCategory, searchQuery]);

  const scrollToQuestion = (qId: string) => {
    const target = document.getElementById(qId);
    if (target) {
      const yOffset = -160; // Spacing for sticky header
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  // Deep Search logic
  const getSearchResults = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return faqCategories.map(cat => {
      const filteredQs = cat.questions.filter(q => 
        q.question.toLowerCase().includes(query) || 
        q.answer.toLowerCase().includes(query) || 
        cat.title.toLowerCase().includes(query)
      );
      return {
        ...cat,
        questions: filteredQs
      };
    }).filter(cat => cat.questions.length > 0);
  };

  const searchResults = getSearchResults();
  const totalMatches = searchResults.reduce((acc, cat) => acc + cat.questions.length, 0);

  const activeCategoryData = faqCategories.find(cat => cat.id === activeCategory) || faqCategories[0];
  const activeGlow = bgGlows[activeCategoryData.id as keyof typeof bgGlows] || bgGlows.about;

  return (
    <>
      {/* Dynamic Background Colored Ambient Light Pool */}
      <AmbientLightPool color={activeGlow} className="left-[75%] top-[30%] scale-[1.2] transition-colors duration-500" />

      {/* Instant Search Bar with Live Match Counter & Clear Action */}
      <div className="relative max-w-[600px] mb-16 select-none group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-ink-faint group-focus-within:text-accent-gold transition-colors duration-200">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          placeholder="Search questions (e.g. risk, process, portfolio)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface border border-rule rounded-2xl py-4 pl-12 pr-32 font-mono text-sm text-ink placeholder-ink-faint focus:outline-none focus:border-accent-gold/60 focus:ring-1 focus:ring-accent-gold/40 shadow-lift-1 transition-all duration-300"
        />

        {/* Live Match Counter Pill & Clear Button */}
        {searchQuery.trim() !== "" && (
          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            <span
              className={`font-mono text-[11px] px-2.5 py-1 rounded-full font-bold border ${
                totalMatches > 0
                  ? "bg-accent-gold/15 text-accent-gold border-accent-gold/30"
                  : "bg-rose-500/15 text-rose-400 border-rose-500/30"
              }`}
            >
              {totalMatches} {totalMatches === 1 ? "match" : "matches"}
            </span>

            <button
              onClick={() => setSearchQuery("")}
              className="w-6 h-6 rounded-full bg-canvas-sunk hover:bg-canvas-sunk text-ink-muted hover:text-ink flex items-center justify-center transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <div id="faq-content-area" className="w-full">
        <AnimatePresence mode="wait">
          {searchQuery.trim() !== "" ? (
            /* Search Results Override View */
            <motion.div
              key="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-[800px]"
            >
              <div className="text-ink-faint font-mono text-xs mb-8 uppercase tracking-wider select-none">
                {totalMatches} {totalMatches === 1 ? "Result" : "Results"} Found
              </div>

              {totalMatches === 0 ? (
                /* Search Empty State */
                <div className="py-12 text-center flex flex-col items-center select-none">
                  <p className="font-mono text-sm text-ink-soft mb-3">
                    No matching questions found.
                  </p>
                  <p className="font-mono text-xs text-ink-faint mb-8">
                    Try a different keyword or book a Strategic Discussion.
                  </p>
                  <Link 
                    href="/enquire" 
                    className="btn btn-gold" 
                    style={{ padding: "12px 24px", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
                  >
                    ENQUIRE NOW
                  </Link>
                </div>
              ) : (
                searchResults.map((cat) => (
                  <div key={cat.id} className="mb-12">
                    <div className="flex items-center gap-3 border-b border-rule pb-2 mb-6">
                      <span className="text-ink-faint">
                        {React.createElement(iconComponents[cat.iconName], { className: "w-4 h-4 stroke-[1.5]" })}
                      </span>
                      <span className="text-accent-gold font-mono text-xs uppercase tracking-[0.15em]">
                        {cat.title}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      {cat.questions.map((q, idx) => {
                        const qId = `search-q-${cat.id}-${idx}`;
                        const isExpanded = expandedIndex === (idx + 1000 * faqCategories.findIndex(c => c.id === cat.id));
                        return (
                          <FAQAccordionItem
                            key={idx}
                            question={q.question}
                            answer={q.answer}
                            hasComparison={q.hasComparison}
                            isExpanded={isExpanded}
                            onToggle={() => setExpandedIndex(isExpanded ? null : idx + 1000 * faqCategories.findIndex(c => c.id === cat.id))}
                            qId={qId}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          ) : (
            /* Standard Categories Split View (25/75 Column Ratio) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Category Navigation (Sticky Left Sidebar (25%) / Horizontal Chips on Mobile) */}
              <div className="lg:col-span-3 lg:sticky lg:top-[120px] flex flex-col gap-6 self-start">
                
                {/* Desktop Sidebar Selector — Type D: six topics as one
                    joined structure (a bordered stack of blocks, hairline
                    dividers between them) rather than a plain underlined
                    list. Same buttons, same behaviour — this is the actual
                    table of contents, restyled to read as a diagram of the
                    six-part structure instead of a loose list. */}
                <div className="hidden lg:flex flex-col gap-4 w-full select-none">
                  <span className="font-mono text-xs tracking-wider text-ink-faint uppercase mb-2 block">
                    Browse by Topic
                  </span>
                  <div className="overflow-hidden rounded-vsc-xl border border-rule bg-surface">
                  {faqCategories.map((cat, catIdx) => {
                    const Icon = iconComponents[cat.iconName];
                    const isActive = activeCategory === cat.id;

                    return (
                      <div
                        key={cat.id}
                        className={`flex flex-col pb-3 ${catIdx > 0 ? "border-t border-rule pt-1" : ""}`}
                      >
                        <button
                          onClick={() => setActiveCategory(cat.id)}
                          className={`group text-left flex items-start gap-4 py-3 px-4 rounded-xl transition-all duration-200 border-l-2 ${
                            isActive ? "bg-surface shadow-lift-1 border-accent-gold" : "hover:bg-canvas-sunk border-transparent"
                          }`}
                        >
                          <span
                            className="flex-shrink-0 mt-1 transition-colors duration-200"
                            style={{ color: isActive ? "var(--accent-gold)" : "var(--ink-faint)" }}
                          >
                            <Icon className="w-5 h-5 stroke-[1.5]" />
                          </span>

                          <div className="flex flex-col">
                            <span
                              className="font-display text-base transition-colors duration-200"
                              style={{ color: isActive ? "var(--ink)" : "var(--ink-soft)" }}
                            >
                              {cat.title}
                            </span>
                            <span className="font-mono text-[10px] text-ink-faint mt-1">
                              {cat.questions.length} {cat.questions.length === 1 ? "Question" : "Questions"}
                            </span>
                          </div>
                        </button>

                        {/* Indented Scroll Spy List of active category questions */}
                        {isActive && (
                          <div className="flex flex-col pl-14 pr-2 mt-2 gap-2.5 font-mono text-[11px] border-l border-rule ml-4">
                            {cat.questions.map((q, qIdx) => {
                              const qId = `q-${cat.id}-${qIdx}`;
                              const isQActive = activeQuestionId === qId;
                              return (
                                <button
                                  key={qIdx}
                                  onClick={() => scrollToQuestion(qId)}
                                  className="text-left leading-relaxed py-0.5 hover:text-ink transition-colors duration-200 truncate"
                                  style={{
                                    color: isQActive ? "var(--accent-gold)" : "var(--ink-faint)"
                                  }}
                                >
                                  {q.question}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  </div>
                </div>

                {/* Mobile Scrollable Chips (horizontal scroll row) */}
                <div className="lg:hidden flex overflow-x-auto gap-2 pb-3 whitespace-nowrap scrollbar-hide border-b border-rule select-none -mx-4 px-4">
                  {faqCategories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`inline-flex items-center gap-2 py-2.5 px-4 rounded-full font-mono text-xs transition-colors duration-200 ${
                          isActive
                            ? "bg-accent-gold text-white font-semibold"
                            : "bg-surface text-ink-muted hover:text-ink border border-rule"
                        }`}
                      >
                        {React.createElement(iconComponents[cat.iconName], { className: "w-3.5 h-3.5 stroke-[2]" })}
                        {cat.title}
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Category Contents Panel (75% Width) */}
              <div className="lg:col-span-9 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full flex flex-col"
                  >
                    {/* Category Editorial Introduction Block */}
                    <div className="max-w-[700px] border-b border-rule pb-6 mb-8 text-left">
                      <h2 className="font-display text-3xl font-normal leading-[1.2] mb-3 text-ink">
                        {activeCategoryData.title}
                      </h2>
                      <p className="font-mono text-sm leading-relaxed text-ink-soft mb-4">
                        {activeCategoryData.description}
                      </p>
                      <div className="font-mono text-xs text-ink-faint">
                        {activeCategoryData.questions.length} {activeCategoryData.questions.length === 1 ? "Question" : "Questions"} • Updated July 2026
                      </div>
                    </div>

                    {/* Show Entire Category Immediately */}
                    <div className="flex flex-col gap-4">
                      {activeCategoryData.questions.map((q, idx) => {
                        const qId = `q-${activeCategoryData.id}-${idx}`;
                        const isExpanded = expandedIndex === idx;

                        return (
                          <div key={idx} id={qId} className="question-item">
                            <FAQAccordionItem
                              question={q.question}
                              answer={q.answer}
                              hasComparison={q.hasComparison}
                              isExpanded={isExpanded}
                              onToggle={() => setExpandedIndex(isExpanded ? null : idx)}
                              qId={qId}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

interface FAQAccordionItemProps {
  question: string;
  answer: string;
  hasComparison?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  qId: string;
}

function FAQAccordionItem({
  question,
  answer,
  hasComparison,
  isExpanded,
  onToggle,
  qId
}: FAQAccordionItemProps) {
  return (
    <div 
      id={qId}
      className={`question-item w-full rounded-xl transition-all duration-300 overflow-hidden select-none border ${
        isExpanded
          ? "border-accent-gold/40 bg-surface shadow-lift-2 border-l-4 border-l-accent-gold"
          : "border-rule bg-surface hover:border-rule-strong"
      }`}
    >
      {/* Header Panel */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-6 text-left cursor-pointer focus:outline-none group"
      >
        <span 
          className={`font-display text-base font-medium leading-snug transition-colors duration-200 pr-4 ${
            isExpanded ? "text-ink font-semibold" : "text-ink-soft group-hover:text-ink"
          }`}
        >
          {question}
        </span>
        
        {/* Plus sign rotating into cross */}
        <motion.span 
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 text-accent-gold w-6 h-6 rounded-full bg-accent-gold/10 flex items-center justify-center border border-accent-gold/20"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </motion.span>
      </button>

      {/* Collapsible Answer Body */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-6 px-6 border-t border-rule pt-4 max-w-[760px]">
          <p className="font-mono text-sm leading-[1.8] text-ink-soft">
            {answer}
          </p>

          {/* Gambling comparison grid */}
          {hasComparison && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              
              {/* Trading box */}
              <div className="p-5 rounded-xl border border-rule bg-canvas-sunk">
                <h4 className="font-mono text-xs text-[#6F86B7] uppercase tracking-wider mb-3 font-semibold">
                  Trading Business
                </h4>
                <ul className="flex flex-col gap-2 font-mono text-xs text-ink-muted">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#6F86B7]" /> Defined process
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#6F86B7]" /> Defined risk
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#6F86B7]" /> Repeatable edge
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#6F86B7]" /> Position sizing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#6F86B7]" /> Capital preservation
                  </li>
                </ul>
              </div>
              
              {/* Gambling box */}
              <div className="p-5 rounded-xl border border-rule bg-canvas-sunk" style={{ borderColor: "rgba(248, 113, 113, 0.15)" }}>
                <h4 className="font-mono text-xs text-red-400/80 uppercase tracking-wider mb-3 font-semibold">
                  Gambling
                </h4>
                <ul className="flex flex-col gap-2 font-mono text-xs text-ink-muted">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/30" /> Outcome driven
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/30" /> No process
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/30" /> No edge
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/30" /> Emotional decisions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/30" /> Uncontrolled risk
                  </li>
                </ul>
              </div>

            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
