"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * An introduction to Research, not a rendering of it. Naming the latest
 * letter/note/framework here duplicated the dedicated /research page — this
 * band's only job is to point there, spaciously, and stop.
 */
export function ResearchDeskSection() {
  return (
    <section id="evidence" className="relative w-full border-b border-rule bg-surface-warm py-20 sm:py-28">
      <div className="container mx-auto max-w-[1120px]">
        <Reveal className="mx-auto max-w-[54ch] text-center">
          <h2 className="font-display text-ink">
            We don&apos;t publish news. We publish thinking.
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed text-ink-soft">
            Research is where the work lives — how we read markets, what we
            learn from them, and how those ideas become a process.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-9 flex justify-center">
          <Link
            href="/research"
            className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-growth"
          >
            Explore Research
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
