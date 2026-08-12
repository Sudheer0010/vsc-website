import React from "react";
import { PaperGrain } from "./OfferingsBackground";

interface OfferingsLayoutProps {
  children: React.ReactNode;
}

/**
 * No longer auto-renders a closing CTA (it used to, via NextStepCTA —
 * "Ready to begin? ENQUIRE NOW" in the old uppercase-mono button style).
 * The page now places <ClosingCTA /> explicitly in its own content, same
 * as every sub-page, so there's one shared component instead of a layout
 * silently adding a second, differently-styled one behind the page's back.
 */
export function OfferingsLayout({ children }: OfferingsLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden">
      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Dynamic Content */}
      <main className="relative w-full">
        {children}
      </main>
    </div>
  );
}
