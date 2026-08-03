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
    <section id="compliance" className="w-full border-t border-rule bg-canvas-sunk py-12">
      <div className="container mx-auto max-w-[1120px]">
        <div className="mx-auto flex max-w-[70ch] flex-col gap-3 text-center">
          <p className="text-[14px] leading-relaxed text-ink-muted">
            VSC Capital &amp; Advisory is in the process of applying for SEBI
            Research Analyst (RA) registration. Until registration is granted,
            all content, execution setups, and communications are strictly for
            educational and research purposes. Nothing here constitutes
            personalised investment advice or a solicitation to buy or sell any
            security.
          </p>
          <p className="text-[13.5px] font-semibold text-ink-faint">
            MSME registered · UDYAM-AP-17-0067701 · NIC 66190
          </p>
        </div>
      </div>
    </section>
  );
}
