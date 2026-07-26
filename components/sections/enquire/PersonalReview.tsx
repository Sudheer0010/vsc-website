import React from "react";
import { motion } from "framer-motion";

export function PersonalReview() {
  const animProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.2, ease: "easeOut" }
  } as const;

  return (
    <section className="relative w-full pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden border-t border-white/[0.03] select-none z-10">
      <div className="container max-w-[1200px] text-center">
        
        {/* Eyebrow */}
        <motion.span 
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6 block"
          {...animProps}
        >
          PERSONAL REVIEW
        </motion.span>
        
        {/* Message statement */}
        <motion.h3 
          className="font-display text-xl sm:text-2xl text-text-secondary leading-relaxed max-w-[650px] mx-auto font-normal"
          {...animProps}
          transition={{ ...animProps.transition, delay: 0.05 }}
        >
          Every enquiry is reviewed personally.<br />
          If we believe we can genuinely help, we&apos;ll tell you how.<br />
          If another path is better, we&apos;ll tell you that honestly too.
        </motion.h3>

      </div>
    </section>
  );
}
