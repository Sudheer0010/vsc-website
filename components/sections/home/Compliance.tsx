import React from "react";

/**
 * Regulatory strip.
 *
 * Set at 14px in the reading face rather than 10px mono at 30% opacity.
 * A disclosure nobody can read is not a disclosure, and shrinking it to
 * near-invisibility signals that the firm would rather it weren't there.
 * Stating it plainly costs nothing and reads as confidence.
 */
export function Compliance() {
  return (
    <section
      id="compliance"
      className="relative w-full overflow-hidden border-t border-rule bg-canvas-sunk py-14"
    >
      <div className="relative container mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="mx-auto flex max-w-[70ch] flex-col gap-3 text-center">
          <div className="text-[14px] leading-relaxed text-ink-muted">
            VSC Capital &amp; Advisory is in the process of applying for SEBI
            Research Analyst (RA) registration. Until registration is granted,
            all content, execution setups, and communications are strictly for
            educational and research purposes. Nothing here constitutes
            personalised investment advice or a solicitation to buy or sell any
            security.
          </div>
          <div className="text-[13.5px] font-semibold text-ink-muted">
            MSME registered · UDYAM-AP-17-0067701 · NIC 66190
          </div>
        </div>
      </div>
    </section>
  );
}
