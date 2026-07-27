"use client";

import React from "react";

/**
 * VSC Component: ReadingContainer
 * 
 * 1. Purpose: Enforces publication-grade reading line lengths (65–75 characters max) for body paragraphs and thesis copy.
 * 2. Atlas Alignment: Expresses Principle VII ("Respect the reader") and Editorial Quality standards.
 * 3. Signature Behaviour: Strict 680px - 720px max-width container that prevents wide, unreadable text lines.
 * 4. Emotional Outcome: Instantly creates the comfortable reading atmosphere of a physical book or printed journal.
 * 5. Accessibility: Optimal 65-75 characters per line length reduces eye strain and improves comprehension for screen readers and human eyes.
 * 6. Performance: Pure layout CSS wrapper; zero JS runtime overhead.
 */

interface ReadingContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "standard" | "wide";
}

export function ReadingContainer({
  children,
  className = "",
  size = "standard",
}: ReadingContainerProps) {
  const sizeMap = {
    narrow: "max-w-[620px]",
    standard: "max-w-[720px]",
    wide: "max-w-[850px]",
  };

  return (
    <div className={`w-full mx-auto ${sizeMap[size]} ${className}`}>
      {children}
    </div>
  );
}
