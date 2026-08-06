"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A 2px rule at the very top of the viewport that fills left-to-right with
 * scroll position. Only mounted on long-form pages (letters, frameworks,
 * notes) — on short pages it would finish before it could tell a reader
 * anything, which is the line between this being informational and being
 * decorative.
 *
 * `useScroll` without a target tracks whole-document scroll, which is a
 * reasonable proxy for "how much of this article is left" on pages that
 * are a single column with no separate scroll containers. `useSpring`
 * smooths the tick-by-tick scroll signal into something that doesn't
 * visibly stutter; it's a stock framer-motion hook, not hand-tuned motion.
 */
export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[1001] h-[2px] w-full origin-left bg-growth"
      style={{ scaleX: reduce ? scrollYProgress : smoothed }}
    />
  );
}
