"use client";

import React from "react";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { DiscussionForm } from "@/components/sections/enquire/DiscussionForm";
import { AfterYouSubmit } from "@/components/sections/enquire/AfterYouSubmit";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Mail, Lock } from "lucide-react";

export default function Enquire() {
  const animProps = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  } as const;

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink select-none flex flex-col justify-between">
      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Ambient Light Glow */}
      <AmbientLightPool color="rgba(15, 122, 64, 0.04)" className="left-[70%] top-[30%] scale-[1.4]" />

      <main className="relative w-full z-10 pt-32 pb-16 sm:pt-36 sm:pb-20 flex-grow flex items-center">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Side-by-Side 2-Column Friction-Free Conversion Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Welcoming Details & Credibility Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <motion.span 
                className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-bold mb-4 block"
                {...animProps}
              >
                CONNECT WITH US
              </motion.span>

              <motion.h1 
                className="font-display text-3xl sm:text-5xl lg:text-[52px] leading-[1.1] text-ink font-normal tracking-tight mb-6"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.05 }}
              >
                Every great investment process starts with a conversation.
              </motion.h1>

              <motion.p
                className="font-mono text-xs sm:text-sm text-ink-soft leading-relaxed mb-8"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.1 }}
              >
                Tell me what&apos;s on your mind — a specific question, or just curiosity. I read every submission before I say anything back.
              </motion.p>

              {/* Institutional Assurance / Credibility Highlights */}
              <motion.div 
                className="space-y-4 pt-6 border-t border-rule mb-8"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.15 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-ink font-semibold uppercase tracking-wider mb-0.5">
                      100% Confidential Discussion
                    </h4>
                    <p className="font-mono text-xs text-ink-muted">
                      Direct alignment with our quantitative research desk.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-ink font-semibold uppercase tracking-wider mb-0.5">
                      24-Hour Desk Response
                    </h4>
                    <p className="font-mono text-xs text-ink-muted">
                      Our desk reviews every inquiry within 24 business hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-ink font-semibold uppercase tracking-wider mb-0.5">
                      Zero Sales Pressure
                    </h4>
                    <p className="font-mono text-xs text-ink-muted">
                      Pure process evaluation and risk parameter reviews.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Direct Desk Contact */}
              <motion.div 
                className="flex items-center gap-2 font-mono text-xs text-ink-faint"
                {...animProps}
                transition={{ ...animProps.transition, delay: 0.2 }}
              >
                <Mail className="w-3.5 h-3.5 text-accent-gold" />
                <span>
                  Direct Research Desk:{" "}
                  <a href="mailto:sudheer@vsccapital.in" className="text-ink-soft font-medium hover:text-accent-gold transition-colors">
                    sudheer@vsccapital.in
                  </a>
                </span>
              </motion.div>
            </div>

            {/* Right Column: Discussion Form Card */}
            <div className="lg:col-span-7">
              <DiscussionForm />
              <AfterYouSubmit />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
