"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useHydratedReducedMotion } from "@/components/ui/vsc/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

export interface LetterDeckItem {
  key: string;
  letterNumber: number;
  paddedNumber: string;
  monthName: string;
  year: number;
  thesis: string;
  excerpt: string;
  formattedDate: string;
  readTime: number;
  href: string;
  isLatest: boolean;
}

interface LetterDeckProps {
  items: LetterDeckItem[];
}

const subscribeDesktop = (callback: () => void) => {
  const mql = window.matchMedia("(min-width: 1024px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => true
  );
}

// 45px step leaves > half of each 86px card exposed while hiding inactive card
// theses behind the overlapping card; active card spreads +44px (89px clear)
// so its full height, thesis, and Read cue stay unclipped inside the 312px track.
const DESKTOP_STEP = 45;
const DESKTOP_ACTIVE_SPREAD = 44;
const DESKTOP_CARD_HEIGHT = 86;
const HOVER_INTENT_MS = 110;

/**
 * The Letter Deck — two-column (~60:40) editorial preview + tactile wallet
 * stack of the latest five Market Letters. Hovering previews in the left panel
 * and reveals the active card's thesis + direct "Read" action; clicking any
 * card in the stack navigates straight to that letter's route. On touch viewports,
 * first tap previews an inactive card and second tap (or "Read") opens it.
 */
export function LetterDeck({ items }: LetterDeckProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduce = useHydratedReducedMotion();
  const isDesktop = useIsDesktop();
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const lastPointerTypeRef = useRef<string>("mouse");

  const clearHoverTimer = () => {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  useEffect(() => clearHoverTimer, []);

  if (items.length === 0) return null;

  const displayedIndex = hoveredIndex ?? selectedIndex;
  const activeItem = items[displayedIndex] ?? items[0];

  const scheduleHover = (index: number) => {
    clearHoverTimer();
    hoverTimerRef.current = setTimeout(() => {
      setHoveredIndex(index);
      hoverTimerRef.current = null;
    }, HOVER_INTENT_MS);
  };

  const handleCardPointerMove = (index: number, e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const prev = lastPointerRef.current;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };

    if (index === displayedIndex) {
      clearHoverTimer();
      return;
    }

    // Preserve the displayed card when moving leftward across neighbouring
    // cards toward the featured preview and its "Read the letter" link.
    if (prev) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      if (dx < -3 && Math.abs(dx) >= Math.abs(dy) * 0.55) {
        clearHoverTimer();
        return;
      }
    }

    scheduleHover(index);
  };

  const handleDeckMouseLeave = () => {
    clearHoverTimer();
    lastPointerRef.current = null;
    setHoveredIndex(null);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowDown: selectedIndex + 1,
      ArrowRight: selectedIndex + 1,
      ArrowUp: selectedIndex - 1,
      ArrowLeft: selectedIndex - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    clearHoverTimer();
    const next = (moves[e.key] + items.length) % items.length;
    setSelectedIndex(next);
    setHoveredIndex(null);
    itemRefs.current[next]?.focus();
  };

  const stackTransition = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.75 };

  const crossfadeTransition = reduce
    ? { duration: 0 }
    : { duration: 0.14, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      onMouseLeave={handleDeckMouseLeave}
      className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-7"
    >
      {/* Left (~60%): Featured Market Letter Preview */}
      <div className="min-w-0 lg:col-span-7">
        <div
          id="letter-deck-preview"
          aria-live="polite"
          className="relative h-[308px] overflow-hidden rounded-vsc-xl border border-rule bg-surface-warm shadow-lift-1 sm:h-[324px] lg:h-[336px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.key}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={crossfadeTransition}
              className="relative flex h-full flex-col justify-between px-6 py-7 sm:px-9 sm:py-8"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-3 select-none font-display font-bold leading-none text-growth/[0.07]"
                style={{ fontSize: "clamp(150px, 16vw, 230px)" }}
              >
                {activeItem.paddedNumber}
              </span>

              <div className="relative flex max-w-[580px] flex-col gap-3">
                <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-growth">
                  {activeItem.isLatest ? "Current issue" : "Archive issue"} &middot; Letter {activeItem.paddedNumber}
                </span>

                <h3 className="font-display text-[clamp(1.65rem,2.6vw,2.25rem)] font-semibold leading-[1.06] tracking-tight text-ink">
                  {activeItem.monthName} {activeItem.year}
                </h3>

                <p className="font-editorial line-clamp-3 max-w-[48ch] text-[18px] leading-snug text-ink [font-style:italic] sm:text-[20px]">
                  {activeItem.excerpt}
                </p>
              </div>

              <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule/80 pt-4">
                <span className="font-mono text-[12px] text-ink-muted">
                  Sudheer Vobhilineni &middot; {activeItem.formattedDate} &middot; {activeItem.readTime} min read
                </span>

                <Link
                  href={activeItem.href}
                  className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-semibold text-growth transition-colors hover:text-growth-deep"
                >
                  Read the letter
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right (~40%): Tactile Wallet Stack of Latest 5 Editions */}
      <div className="min-w-0 lg:col-span-5">
        <div className="rounded-vsc-xl border border-rule bg-canvas-sunk/75 p-2.5 lg:h-[336px] lg:p-3">
          <nav
            aria-label="Latest five Market Letters"
            onKeyDown={onKeyDown}
            className="relative flex flex-col gap-2 lg:block lg:h-full"
          >
            {items.map((item, i) => {
              const isSelected = i === selectedIndex;
              const isHighlighted = i === displayedIndex;

              let yOffset = 0;
              let xOffset = 0;

              if (isDesktop) {
                const baseTop = i * DESKTOP_STEP;
                if (i === displayedIndex) {
                  yOffset = baseTop;
                  xOffset = -6;
                } else if (i > displayedIndex) {
                  yOffset = baseTop + DESKTOP_ACTIVE_SPREAD;
                } else {
                  yOffset = baseTop;
                }
              }

              return (
                <motion.div
                  key={item.key}
                  initial={false}
                  animate={isDesktop ? { y: yOffset, x: xOffset } : { y: 0, x: 0 }}
                  transition={stackTransition}
                  style={isDesktop ? { height: DESKTOP_CARD_HEIGHT, zIndex: i + 1 } : undefined}
                  className="lg:absolute lg:inset-x-0 lg:top-0"
                >
                  <Link
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    id={`letter-deck-item-${item.key}`}
                    href={item.href}
                    aria-current={isSelected ? "true" : undefined}
                    onPointerDown={(e) => {
                      lastPointerTypeRef.current = e.pointerType;
                    }}
                    onPointerEnter={(e) => {
                      lastPointerTypeRef.current = e.pointerType;
                      if (e.pointerType === "mouse") handleCardPointerMove(i, e);
                    }}
                    onPointerMove={(e) => handleCardPointerMove(i, e)}
                    onMouseLeave={clearHoverTimer}
                    onFocus={() => {
                      setSelectedIndex(i);
                      setHoveredIndex(null);
                    }}
                    onClick={(e) => {
                      clearHoverTimer();
                      // On touch devices (no hover), first tap previews an inactive
                      // card and reveals its thesis + Read cue; tapping again opens it.
                      if (!isDesktop && lastPointerTypeRef.current !== "mouse" && !isSelected) {
                        e.preventDefault();
                        setSelectedIndex(i);
                        setHoveredIndex(null);
                      }
                    }}
                    className={cn(
                      "group flex h-full min-h-[52px] w-full flex-col justify-start gap-1.5 rounded-vsc-lg border px-4 py-2.5 text-left transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-growth focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                      isSelected
                        ? "border-growth/60 bg-surface shadow-lift-2"
                        : isHighlighted
                          ? "border-rule-strong bg-surface shadow-lift-2"
                          : "border-rule bg-surface-warm shadow-lift-1 hover:border-rule-strong"
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <div className="flex min-w-0 items-baseline gap-2.5">
                        <span
                          className={cn(
                            "shrink-0 font-mono text-[12px] font-semibold tabular-nums",
                            isSelected || isHighlighted ? "text-growth" : "text-ink-faint"
                          )}
                        >
                          {item.paddedNumber}
                        </span>
                        <span className="truncate font-display text-[15.5px] font-semibold text-ink">
                          {item.monthName} {item.year}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {item.isLatest && (
                          <span className="rounded-full bg-growth-tint px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-growth-deep">
                            Latest
                          </span>
                        )}
                        <span className="whitespace-nowrap font-mono text-[11px] tabular-nums text-ink-faint">
                          {item.readTime} min
                        </span>
                      </div>
                    </div>

                    {isHighlighted && (
                      <div className="mt-1 flex items-center justify-between gap-3 lg:mt-0">
                        <p className="line-clamp-1 min-w-0 text-[13px] leading-snug text-ink-soft">
                          {item.thesis}
                        </p>
                        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-mono text-[11px] font-semibold text-growth">
                          Read
                          <ArrowRight
                            className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
