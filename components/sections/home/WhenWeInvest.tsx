import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function WhenWeInvest() {
  const steps = [
    "Weak Market",
    "Stay Patient",
    "Quality Opportunity Appears",
    "Deploy Capital",
    "Ride Trend",
    "Exit",
    "Protect Capital",
    "Repeat"
  ];

  return (
    <SectionContainer 
      id="when-we-invest" 
      className="pt-20 pb-12 overflow-hidden select-none border-t border-white/[0.02]"
    >
      <div className="max-w-[1100px] mx-auto text-left px-4">
        
        {/* Eyebrow & Title */}
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-4 block font-semibold">
            EXECUTION TIMELINE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] leading-[1.2] text-white font-normal tracking-tight mb-5">
            When We Invest
          </h2>
          <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[500px]">
            Traditional models stay fully invested through all cycles. VSC scales exposure dynamically based on leadership success rates.
          </p>
        </div>

        {/* Continuous Horizontal Lifecycle Diagram */}
        <div className="relative w-full py-6">
          
          {/* Horizontal Connecting Gold Line for Desktop */}
          <div className="hidden lg:block absolute left-4 right-4 top-[6px] h-[1px] bg-gradient-to-r from-accent-gold/20 via-accent-gold/70 to-accent-gold/20"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:justify-between gap-y-8 gap-x-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-start lg:items-center text-left lg:text-center group flex-1 relative">
                
                {/* Visual Node Dot on the line */}
                <div className="w-3 h-3 rounded-full bg-accent-gold mb-5 transition-all duration-300 shadow-[0_0_12px_rgba(201,168,76,0.6)] group-hover:scale-125 lg:mx-auto"></div>
                
                {/* Step text */}
                <span className="font-display text-xs sm:text-sm font-medium tracking-tight text-white max-w-[110px] lg:mx-auto leading-tight">
                  {step}
                </span>

                {/* Arrow connector for step flows */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1.5 w-4 h-[1px] bg-accent-gold/20"></div>
                )}
                
              </div>
            ))}
          </div>

        </div>

      </div>
    </SectionContainer>
  );
}
