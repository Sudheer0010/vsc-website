import React from "react";
import { Reveal } from "@/components/ui/vsc/Reveal";

/**
 * Type A, three stages — what actually happens after the button is
 * clicked. The space below the form used to be empty once the form
 * itself got shorter (five required fields down to three). This isn't
 * decoration for the gap; "what happens next" is a real question anyone
 * about to submit a form to a stranger has, and answering it here is
 * cheaper than making them wonder.
 */

const STAGES = [
  { name: "Enquiry received", detail: "Logged with the research desk immediately." },
  { name: "Desk review", detail: "Read personally, usually within 24 hours." },
  { name: "Response or call", detail: "A direct reply, or a time to talk if useful." },
];

export function AfterYouSubmit() {
  return (
    <Reveal delay={0.1} className="mt-8">
      <div className="rounded-vsc-xl border border-rule bg-surface p-6 shadow-lift-1 sm:p-7">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
          After you submit
        </span>

        <div className="relative mt-6 grid grid-cols-3 gap-3">
          <div
            aria-hidden="true"
            className="absolute left-[16.5%] right-[16.5%] top-[15px] h-px bg-rule"
          />
          {STAGES.map((stage, i) => (
            <div key={stage.name} className="relative flex flex-col items-center text-center">
              <span
                aria-hidden="true"
                className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-growth bg-canvas text-[13px] font-bold tabular-nums text-growth-deep"
              >
                {i + 1}
              </span>
              <span className="mt-3 text-[13.5px] font-semibold leading-tight text-ink">
                {stage.name}
              </span>
              <span className="mt-1 max-w-[16ch] text-[12px] leading-snug text-ink-faint">
                {stage.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
