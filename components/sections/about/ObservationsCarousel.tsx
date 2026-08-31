"use client";

import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * The "Lessons shaped by markets" carousel, lifted out of app/about/page.tsx.
 *
 * This carousel held the only useState on the About page, but living in the
 * page module it forced a top-level "use client" — which dragged
 * data/market-letters.ts (every letter body) into the browser bundle for the
 * sake of a small archive strip the page renders on the server. Keeping the
 * stateful part in a leaf lets /about render as a server component again.
 */

const observationsData = [
  {
    code: "01",
    topic: "Patience",
    title: "Not every opportunity deserves capital.",
    desc: "Waiting is also a decision.",
  },
  {
    code: "02",
    topic: "Risk",
    title: "Know what you can lose before thinking about what you can make.",
    desc: "Risk is defined before return is imagined.",
  },
  {
    code: "03",
    topic: "Drawdowns",
    title: "Every drawdown teaches something profits cannot.",
    desc: "A difficult market can expose weaknesses that a rising market hides.",
  },
  {
    code: "04",
    topic: "Process",
    title: "Good rules matter most when emotions get loud.",
    desc: "A clear process helps stop one bad decision from becoming several.",
  },
];

export function ObservationsCarousel() {
  const [obsIndex, setObsIndex] = useState(0);
  const [obsDirection, setObsDirection] = useState(1);

  const prevObs = useCallback(() => {
    if (obsIndex > 0) {
      setObsDirection(-1);
      setObsIndex((prev) => prev - 1);
    }
  }, [obsIndex]);

  const nextObs = useCallback(() => {
    if (obsIndex < observationsData.length - 1) {
      setObsDirection(1);
      setObsIndex((prev) => prev + 1);
    }
  }, [obsIndex]);

  const setObs = useCallback(
    (idx: number) => {
      setObsDirection(idx > obsIndex ? 1 : -1);
      setObsIndex(idx);
    },
    [obsIndex]
  );

  const handleObsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevObs();
    if (e.key === "ArrowRight") nextObs();
  };

  const currentObs = observationsData[obsIndex];

  return (
        <section
          className="relative w-full overflow-hidden border-b border-vsc-dark-hairline bg-[#050A07] py-24 sm:py-32 focus:outline-none"
          tabIndex={0}
          onKeyDown={handleObsKeyDown}
          aria-label="What the market taught us"
        >
          <ContourField
            seed={71}
            layers={2}
            density={7}
            strokeColor="#0F7A40"
            baseOpacity={1}
            animate
            safeArea={{ x: 0.02, y: 0.1, w: 0.96, h: 0.86 }}
          />

          <div className="relative mx-auto max-w-[1120px] px-6 sm:px-10">
            <Reveal className="max-w-[58ch]">
              <span className="mb-[18px] inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.01em] text-vsc-dark-accent">
                <span aria-hidden="true" className="h-0.5 w-[18px] shrink-0 rounded-full bg-vsc-dark-accent" />
                What the market taught us
              </span>
              <h2 className="font-display text-[10vw] font-normal leading-[1.05] text-vsc-dark-ink sm:text-[4.4vw] lg:text-[2.6vw]">
                Lessons shaped by markets.
              </h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-vsc-dark-ink-muted">
                Experience matters only when it changes the next decision.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-14 sm:mt-16">
              <div className="min-h-[220px] max-w-[820px] sm:min-h-[180px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={obsIndex}
                    initial={{ opacity: 0, x: obsDirection > 0 ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: obsDirection > 0 ? -12 : 12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <span className="inline-block rounded-full bg-vsc-dark-accent/15 px-2.5 py-1 text-[13px] font-medium text-vsc-dark-accent">
                      {currentObs.topic}
                    </span>
                    <h3 className="font-display mb-4 mt-5 text-2xl font-normal leading-snug text-vsc-dark-ink sm:text-4xl">
                      {currentObs.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-vsc-dark-ink-muted sm:text-[15px]">{currentObs.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex max-w-[820px] items-center justify-between border-t border-vsc-dark-hairline pt-6">
                <button
                  onClick={prevObs}
                  disabled={obsIndex === 0}
                  className="inline-flex items-center gap-1.5 text-sm text-vsc-dark-accent transition-colors duration-200 hover:text-white disabled:opacity-30 disabled:hover:text-vsc-dark-accent"
                  aria-label="Previous observation"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {observationsData.map((obs, idx) => (
                    <button
                      key={obs.code}
                      onClick={() => setObs(idx)}
                      className={`rounded border px-2.5 py-1 font-mono text-xs font-semibold transition-colors duration-200 ${
                        obsIndex === idx
                          ? "border-growth bg-growth text-white"
                          : "border-vsc-dark-hairline text-vsc-dark-ink-muted hover:border-vsc-dark-ink-muted hover:text-vsc-dark-ink"
                      }`}
                      aria-label={`Jump to observation ${idx + 1} of ${observationsData.length}`}
                      aria-current={obsIndex === idx ? "true" : undefined}
                    >
                      {obs.code}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextObs}
                  disabled={obsIndex === observationsData.length - 1}
                  className="inline-flex items-center gap-1.5 text-sm text-vsc-dark-accent transition-colors duration-200 hover:text-white disabled:opacity-30 disabled:hover:text-vsc-dark-accent"
                  aria-label="Next observation"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>
  );
}
