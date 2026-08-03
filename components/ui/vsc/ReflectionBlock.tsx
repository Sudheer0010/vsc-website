"use client";

import React from "react";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * A single question, given a whole band of the page.
 *
 * The only section on the site that asks rather than tells. It gets the
 * green wash and nothing else — no icon, no glow dot, no caption — because
 * the pause is the design. Anything added here would be something to look
 * at instead of something to think about.
 */
export function ReflectionBlock({
  question,
  className = "",
}: {
  question: string;
  className?: string;
}) {
  return (
    <section className={`w-full border-b border-rule bg-growth-wash py-20 sm:py-28 ${className}`}>
      <div className="container mx-auto max-w-[1120px]">
        <Reveal className="mx-auto max-w-[24ch] text-center">
          <blockquote className="font-display text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em] text-growth-deep">
            {question}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
