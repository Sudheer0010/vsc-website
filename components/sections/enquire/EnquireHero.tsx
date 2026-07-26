import React from "react";
import { motion } from "framer-motion";

export function EnquireHero() {
  const animProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.2, ease: "easeOut" }
  } as const;

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center overflow-hidden z-10 select-none">
      <div className="container max-w-[1200px]">
        <div className="max-w-[850px] flex flex-col items-start text-left mt-12">
          {/* Eyebrow */}
          <motion.span 
            className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-gold uppercase mb-6 block font-semibold"
            {...animProps}
          >
            LET&apos;S DISCUSS
          </motion.span>
          
          {/* Heading */}
          <motion.h1 
            className="font-display text-4xl sm:text-5xl md:text-[56px] leading-[1.1] text-text-primary font-normal tracking-tight mb-8"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.05 }}
          >
            The best investment decisions start with asking the right questions.
          </motion.h1>
          
          {/* Short Supporting Copy */}
          <motion.p 
            className="font-mono text-xs sm:text-sm text-white/50 leading-relaxed max-w-[650px]"
            {...animProps}
            transition={{ ...animProps.transition, delay: 0.1 }}
          >
            Every investor&apos;s journey is different. Before discussing markets, we first understand your goals, experience, and the kind of investor you want to become.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
