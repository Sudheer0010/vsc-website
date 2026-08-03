import React from "react";
import { motion } from "framer-motion";

export function ProcessTimeline() {
  const animProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.2, ease: "easeOut" }
  } as const;

  return (
    <div className="lg:col-span-4 flex flex-col">
      {/* Eyebrow & Headline */}
      <div className="mb-10 select-none">
        <motion.span 
          className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase mb-4 block"
          {...animProps}
        >
          PROCESS
        </motion.span>
        <motion.h2 
          className="font-display text-3xl text-ink font-normal leading-[1.2]"
          {...animProps}
          transition={{ ...animProps.transition, delay: 0.05 }}
        >
          What happens when you reach out
        </motion.h2>
      </div>

      {/* Vertical Connector Rule Timeline */}
      <div className="relative border-l border-rule pl-8 flex flex-col gap-10 select-none ml-2">
        
        {/* Step 01 */}
        <motion.div 
          className="relative"
          {...animProps}
          transition={{ ...animProps.transition, delay: 0.08 }}
        >
          <span className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-[#FBFAF6] border border-accent-gold/45 flex items-center justify-center font-mono text-[9px] text-accent-gold font-bold">1</span>
          <h3 className="font-display text-base sm:text-lg text-ink font-medium mb-1.5">Share your story</h3>
          <p className="font-mono text-xs sm:text-sm text-ink-muted leading-relaxed">
            Tell us about your goals, experience and where you are today.
          </p>
        </motion.div>

        {/* Step 02 */}
        <motion.div 
          className="relative"
          {...animProps}
          transition={{ ...animProps.transition, delay: 0.12 }}
        >
          <span className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-[#FBFAF6] border border-accent-gold/45 flex items-center justify-center font-mono text-[9px] text-accent-gold font-bold">2</span>
          <h3 className="font-display text-base sm:text-lg text-ink font-medium mb-1.5">We listen</h3>
          <p className="font-mono text-xs sm:text-sm text-ink-muted leading-relaxed">
            Every enquiry is reviewed personally.
          </p>
        </motion.div>

        {/* Step 03 */}
        <motion.div 
          className="relative"
          {...animProps}
          transition={{ ...animProps.transition, delay: 0.16 }}
        >
          <span className="absolute -left-[38px] top-1 w-4 h-4 rounded-full bg-[#FBFAF6] border border-accent-gold/45 flex items-center justify-center font-mono text-[9px] text-accent-gold font-bold">3</span>
          <h3 className="font-display text-base sm:text-lg text-ink font-medium mb-1.5">Determine fit</h3>
          <p className="font-mono text-xs sm:text-sm text-ink-muted leading-relaxed">
            If we&apos;re the right fit, we&apos;ll recommend the most suitable path.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
