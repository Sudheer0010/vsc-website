import React from "react";

export function MarketTone() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-[#060810] flex items-center justify-center select-none z-10">
      <div className="container max-w-[1000px] text-center px-6">
        
        {/* Large Statement */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-[46px] leading-[1.3] text-white font-normal mb-8 tracking-tight">
          Markets Don&apos;t Reward Activity.<br />
          They Reward <span className="text-accent-gold italic">Better Decisions</span>.
        </h2>
        
        {/* Understated subtext */}
        <p className="font-mono text-xs sm:text-sm text-white/40 max-w-[550px] mx-auto leading-relaxed">
          The goal isn&apos;t to predict markets. It&apos;s to consistently make better decisions within them.
        </p>

      </div>
    </section>
  );
}
