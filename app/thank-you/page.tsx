"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

export default function ThankYou() {
  const animProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: "easeOut" }
  } as const;

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Background Colored Ambient Light Pool */}
      <AmbientLightPool color="rgba(15, 122, 64, 0.02)" className="left-[70%] top-[25%] scale-[1.2]" />

      <main className="relative w-full flex items-center justify-center pt-40 pb-28 md:pt-48 md:pb-36 z-10">
        <div className="container max-w-[1200px]">
          <div className="max-w-[650px] mx-auto text-center flex flex-col items-center select-none">
            
            {/* Serif Title */}
            <motion.h1 
              className="font-display text-5xl sm:text-6xl md:text-7xl font-normal leading-tight text-ink mb-6"
              {...animProps}
            >
              Thank you.
            </motion.h1>
            
            {/* Supporting Copy */}
            <motion.p 
              className="font-mono text-sm leading-relaxed text-ink-soft mb-16 max-w-[500px]"
              {...animProps}
              transition={{ ...animProps.transition, delay: 0.05 }}
            >
              Your enquiry has been received. We&apos;ll review it personally and get back to you if we believe VSC is the right fit for your journey.
            </motion.p>
            
            {/* Continue Section */}
            <motion.div 
              className="w-full border-t border-rule pt-10 text-center flex flex-col items-center"
              {...animProps}
              transition={{ ...animProps.transition, delay: 0.1 }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-ink-faint block mb-6">
                Continue Exploring
              </span>
              
              <ul className="flex flex-col font-mono text-sm">
                <li>
                  <Link 
                    href="/research"
                    className="flex min-h-[44px] items-center text-ink-soft hover:text-accent-gold transition-colors duration-200"
                  >
                    → Read the research
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="flex min-h-[44px] items-center text-ink-soft hover:text-accent-gold transition-colors duration-200"
                  >
                    → Learn More About VSC
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq" 
                    className="flex min-h-[44px] items-center text-ink-soft hover:text-accent-gold transition-colors duration-200"
                  >
                    → Frequently Asked Questions
                  </Link>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
