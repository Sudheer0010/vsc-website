import React from "react";

export function SignatureTransition() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[#FBFAF6] border-y border-rule overflow-hidden select-none z-10 flex items-center justify-center">
      <div className="container max-w-[1000px] text-center px-6">
        
        {/* Understated glowing gold accent light pool background */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-gold/5 blur-[90px] pointer-events-none"></div>
        
        {/* Large Signature Text */}
        <h2 className="relative font-display text-2xl sm:text-3xl md:text-4xl leading-[1.4] text-ink font-light tracking-tight max-w-[750px] mx-auto">
          Capital grows through <span className="text-accent-gold font-normal italic">disciplined decisions</span>,<br className="hidden sm:block" /> not constant activity.
        </h2>

      </div>
    </section>
  );
}
