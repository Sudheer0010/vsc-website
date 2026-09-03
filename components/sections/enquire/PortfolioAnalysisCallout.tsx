"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { StepRule } from "@/components/ui/vsc/StepRule";

/**
 * Permanent reopen point for the portfolio-analysis offer. The auto-open
 * modal only shows once per session, so this stays on the page as the
 * always-available way back into the same flow — never a second modal.
 */
export interface PortfolioAnalysisCalloutProps {
  onOpen: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function PortfolioAnalysisCallout({ onOpen, triggerRef }: PortfolioAnalysisCalloutProps) {
  return (
    <div className="relative overflow-hidden rounded-vsc-lg border border-white/10 bg-white/[0.03] px-6 py-6 sm:px-8 sm:py-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div>
          <div className="flex items-center gap-3">
            <StepRule size="sm" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7FB999]">
              Free portfolio strength analysis
            </span>
          </div>
          <h2 className="mt-3 text-[19px] font-semibold leading-snug text-[#F4F7F4] sm:text-[21px]">
            Want a second look at your portfolio?
          </h2>
          <p className="mt-1.5 max-w-[52ch] text-[14.5px] leading-relaxed text-white/55">
            Get a structured view of how your portfolio is positioned before the market tests it.
          </p>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={onOpen}
          className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-vsc-md border border-[#7FB999]/40 bg-[#7FB999]/10 px-6 py-3 font-ui text-[15px] font-semibold text-[#7FB999] transition-colors duration-200 hover:border-[#7FB999] hover:bg-[#7FB999]/15"
        >
          Get my free analysis <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
