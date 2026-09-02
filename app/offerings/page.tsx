import Link from "next/link";
import { OfferingsHero } from "@/components/sections/offerings/OfferingsHero";
import { StartWhereYouAre } from "@/components/sections/offerings/StartWhereYouAre";
import { ContourField } from "@/components/ui/vsc/ContourField";
import { Reveal } from "@/components/ui/vsc/Reveal";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

/**
 * Offerings — Cinematic Signal / Luminous Editorial.
 *
 * Same visual language as the redesigned homepage and About (ContourField
 * seed 71 in the hero, Reveal springs, StepRule, font-editorial italic
 * accent) instead of the previous separate cream/dot-grid system. Ported
 * from the /design-lab/offerings prototype — see OfferingsHero and
 * StartWhereYouAre for the two largest, self-contained sections.
 */
export default function OfferingsGateway() {
  return (
    <main className="relative w-full bg-canvas">
      <OfferingsHero />

      <StartWhereYouAre />

      {/* ================================================================
          OPERATING PRINCIPLE — folded into the narrative as a dark
          editorial quote beat (About's "Clarity compounds" treatment),
          not a detached uppercase banner. Same ContourField grammar, a
          different seed — the second dark beat, not a new effect.
         ================================================================ */}
      <section className="relative w-full overflow-hidden bg-[#080F0B] py-28 sm:py-40">
        <ContourField seed={34} layers={2} density={6} strokeColor="#3FCB74" baseOpacity={0.5} animate />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 65% 60% at 50% 45%, rgba(63,203,116,0.18) 0%, transparent 72%)",
          }}
        />
        <span
          aria-hidden="true"
          className="font-editorial pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[60vw] [font-style:italic] leading-none text-white/[0.03] sm:text-[30vw]"
        >
          &rdquo;
        </span>

        <div className="relative mx-auto max-w-[900px] px-6 text-center sm:px-10">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.01em] text-[#7FB999]">
              <span aria-hidden="true" className="h-0.5 w-[18px] shrink-0 rounded-full bg-[#7FB999]" />
              The operating principle
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-editorial mx-auto max-w-[16ch] text-[13vw] [font-style:italic] leading-[1.06] text-[#E9E4D2] sm:text-[7vw] lg:text-[4.4vw]">
              Discipline beats emotion.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 font-mono text-[13px] uppercase tracking-[0.14em] text-white/40">
              Process first. Results follow.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          CLOSE — asymmetric, matching the homepage/About closing rhythm:
          statement large and left, action right and low, against the
          same luminous mesh wash used at the homepage's own close.
         ================================================================ */}
      <section className="relative w-full overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="home-cta-mesh"
            style={{
              position: "absolute",
              inset: "-15%",
              background:
                "radial-gradient(ellipse 60% 55% at 80% 30%, rgba(15,122,64,0.14) 0%, transparent 62%)," +
                "radial-gradient(ellipse 55% 60% at 15% 80%, rgba(63,203,116,0.10) 0%, transparent 60%)",
              filter: "blur(10px)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Reveal className="flex items-center gap-3">
                <StepRule size="md" />
                <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-growth">
                  Ready when you are
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-editorial mt-6 max-w-[14ch] text-[13vw] [font-style:italic] leading-[1.05] text-ink sm:text-[6vw] lg:text-[3.6vw]">
                  Let&apos;s find your fit.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-ink-soft">
                  No pitch and no obligation — a conversation about whether this is the right fit.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lg:col-span-4 lg:text-right">
              <VSCButton href="/enquire" variant="growth" className="min-h-[52px] px-9 text-[17px]">
                Enquire <span aria-hidden="true">&rarr;</span>
              </VSCButton>
              <div className="mt-5">
                <Link href="/faq" className="font-mono text-[13px] text-ink-muted hover:text-growth">
                  Or get your questions answered in the FAQ &rarr;
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
