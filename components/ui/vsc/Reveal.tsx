"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Physical reveal — the replacement for `.fade-up`.
 *
 * The difference is not cosmetic. A fade is a dissolve: the element was
 * never anywhere, then it is at full opacity. A spring is an arrival: the
 * element has mass, travels a short distance, overshoots slightly, settles.
 * Reading a page built on springs feels like moving through a space.
 * Reading a page built on fades feels like advancing slides.
 *
 * Distance is deliberately small (14px). Motion should be felt, not watched.
 *
 * Reduced motion is handled by swapping the *target*, never the element.
 * The earlier version returned a plain `<div>` instead of a `motion.div`
 * when reduce was set, which silently broke the page: `useReducedMotion`
 * reads `useState(prefersReducedMotion.current)`, which is `false` during
 * SSR and `true` on the client's first render, so the server emitted
 * `style="opacity:0;transform:translateY(14px)"` and the client then
 * hydrated that same `<div>` node with a branch that set no style at all.
 * React reuses the node and does not strip the stale attribute, so every
 * revealed block — headlines included — stayed at `opacity: 0` forever.
 * Keeping one element type and driving it with `animate` means framer
 * still owns the style and writes the visible state on mount.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 14,
  as = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  as?: "div" | "section" | "li" | "span";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: distance }}
      // Reduced motion: arrive immediately, on mount, regardless of
      // viewport. Scroll-triggered reveals are the thing being opted out of.
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={reduce ? undefined : { once: true, margin: "-12% 0px -8% 0px" }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 140,
              damping: 20,
              mass: 0.7,
              delay,
              opacity: { duration: 0.34, ease: [0.22, 1, 0.36, 1], delay },
            }
      }
    >
      {children}
    </Tag>
  );
}
