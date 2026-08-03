"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NextStepCTAProps {
  service?: "learning-hub" | "advantage" | "inner-circle";
}

export function NextStepCTA({ service }: NextStepCTAProps) {
  const animProps = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  const enquireUrl = service ? `/enquire?service=${service}` : "/enquire";

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden z-10">
      <div className="container max-w-[1200px]">
        <div className="max-w-[600px] mx-auto text-center flex flex-col items-center">
          
          {/* Label */}
          <motion.span 
            className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-6"
            {...animProps}
          >
            NEXT STEP
          </motion.span>
          
          {/* Headline */}
          <motion.h2 
            className="font-display text-4xl sm:text-[44px] leading-[1.2] text-ink font-normal tracking-tight mb-8"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            Ready to begin?
          </motion.h2>
          
          {/* Action Button */}
          <motion.div 
            className="flex"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            <Link 
              href={enquireUrl}
              className="btn btn-gold"
              style={{ padding: "14px 32px", fontSize: "12px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
            >
              ENQUIRE NOW
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
