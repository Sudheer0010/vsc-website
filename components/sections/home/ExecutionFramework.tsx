import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function ExecutionFramework() {
  const comparisons = [
    {
      feature: "Investment Style",
      mutualFunds: "Passive benchmark tracking",
      vsc: "Active Opportunity Selection"
    },
    {
      feature: "Market Participation",
      mutualFunds: "Always invested",
      vsc: "Invests only when conditions justify risk"
    },
    {
      feature: "Cash Allocation",
      mutualFunds: "Normally fully invested",
      vsc: "Can remain in cash during weak environments"
    },
    {
      feature: "Risk Management",
      mutualFunds: "Diversification",
      vsc: "Defined stop-losses & protection"
    },
    {
      feature: "Opportunity Selection",
      mutualFunds: "Broad allocation",
      vsc: "Selective high-conviction positions"
    },
    {
      feature: "Decision Speed",
      mutualFunds: "Slower mandate-driven adjustments",
      vsc: "Rapid structural market shifts"
    },
    {
      feature: "Objective",
      mutualFunds: "Outperform benchmark",
      vsc: "Protect capital first. Compound second."
    }
  ];

  return (
    <SectionContainer id="vsc-vs-funds" className="py-28 md:py-36 select-none bg-transparent">
      <div className="max-w-[1050px] mx-auto bg-[#0B0F1E] border border-white/5 rounded-2xl p-8 sm:p-12 text-left">
        
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-4 block font-semibold">
            COMPARATIVE PERSPECTIVE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] leading-[1.2] text-white font-normal tracking-tight mb-5">
            Mutual Funds vs VSC
          </h2>
          <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[620px]">
            We do not compete with mutual funds. We solve a fundamentally different problem. Mutual funds provide broad, long-term market beta. VSC is designed for active, systematic capital compounders.
          </p>
        </div>

        {/* Tabular Grid */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 pb-4">
                <th className="font-mono text-xs text-white/40 uppercase tracking-widest pb-4 w-[25%] font-bold">Feature</th>
                <th className="font-mono text-xs text-white/40 uppercase tracking-widest pb-4 w-[37.5%] font-bold">Traditional Mutual Funds</th>
                <th className="font-mono text-xs text-accent-gold uppercase tracking-widest pb-4 w-[37.5%] font-bold">VSC Capital</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01] transition-colors duration-150">
                  {/* Feature Parameter */}
                  <td className="py-5 pr-4 font-mono text-xs text-accent-gold uppercase tracking-wider font-semibold">
                    {row.feature}
                  </td>
                  
                  {/* Mutual Funds */}
                  <td className="py-5 pr-4 font-mono text-xs sm:text-sm text-white/50 leading-relaxed">
                    {row.mutualFunds}
                  </td>
                  
                  {/* VSC Capital */}
                  <td className="py-5 font-mono text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                    {row.vsc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </SectionContainer>
  );
}
