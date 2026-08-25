"use client";

import { useEffect, useState } from "react";
import { motion, animate, useReducedMotion } from "framer-motion";

/**
 * Ticks a metric's numeric portion up from zero once it scrolls into
 * view, then holds. Only the digits move — sign and unit (%, x, etc.)
 * stay put — and it only fires for values that actually parse as a
 * number; text metrics like "Selective Themes" render as plain text,
 * untouched, rather than being coerced into something they aren't.
 */
const NUMERIC = /^([+-]?)(\d+(?:\.\d+)?)(.*)$/;

export function AnimatedMetric({ value, className }: { value: string; className?: string }) {
  const match = value.match(NUMERIC);
  // useReducedMotion() reads matchMedia synchronously during render, so on
  // the client's very first (hydrating) render it can already differ from
  // the server's value. Ignore it until after mount so that first render
  // is always identical server vs. client, then respect it from then on.
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [display, setDisplay] = useState(!match ? value : `${match[1]}0${match[3]}`);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!match || (mounted && reduce)) {
    return <div className={className}>{value}</div>;
  }

  const [, sign, digits, suffix] = match;
  const target = parseFloat(digits);
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;

  return (
    <motion.div
      className={className}
      viewport={{ once: true, margin: "-10%" }}
      onViewportEnter={() => {
        animate(0, target, {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (v) => setDisplay(`${sign}${v.toFixed(decimals)}${suffix}`),
        });
      }}
    >
      {display}
    </motion.div>
  );
}
