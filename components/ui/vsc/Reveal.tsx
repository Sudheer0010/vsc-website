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

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 20,
        mass: 0.7,
        delay,
        opacity: { duration: 0.34, ease: [0.22, 1, 0.36, 1], delay },
      }}
    >
      {children}
    </Tag>
  );
}
