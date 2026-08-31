"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * The scroll-spy contents rail, lifted out of app/research/page.tsx.
 *
 * This twenty-line IntersectionObserver was the only client-side behaviour
 * on the whole Research page, but because it lived in the page module the
 * page needed a top-level "use client" — which pulled the entire `@/data`
 * barrel into the browser bundle. /research was shipping a ~303KB chunk
 * carrying every market letter body, the FAQ and the reading-desk data,
 * none of which it renders. Keeping the interactive part in a leaf lets
 * the page render on the server again.
 */

const SECTIONS = [
  { id: "letters", label: "Letters" },
  { id: "trading-insights", label: "Trading Insights" },
  { id: "framework-library", label: "Frameworks" },
  { id: "shelf", label: "The Shelf" },
] as const;

/**
 * Scrollspy for the contents rail — the one piece of motion in this page
 * that exists to orient, not decorate. A reader scrolling through a long
 * index should always see which chapter they're in without hunting for a
 * heading.
 */
function useActiveSection(): string {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export function ContentsRail() {
  const active = useActiveSection();
  return (
    <nav
      aria-label="Research contents"
      className="flex flex-wrap items-center gap-x-1 gap-y-2"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="relative rounded-full px-4 py-2 font-mono text-[13px]"
          >
            {isActive && (
              <motion.span
                layoutId="researchContentsActive"
                className="absolute inset-0 rounded-full bg-growth-tint"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span
              className={
                isActive
                  ? "relative font-semibold text-growth-deep"
                  : "relative text-ink-muted transition-colors duration-200 hover:text-ink"
              }
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
