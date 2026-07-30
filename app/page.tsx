"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { BeliefSection } from "@/components/sections/home/BeliefSection";
import { Compliance } from "@/components/sections/home/Compliance";
import { HeroLogoReveal } from "@/components/sections/home/HeroLogoReveal";
import { HowWeDoItSection } from "@/components/sections/home/HowWeDoItSection";
import { HowWeHelpSection } from "@/components/sections/home/HowWeHelpSection";
import { ProblemSection } from "@/components/sections/home/ProblemSection";
import { ResearchDeskAndTestimonials } from "@/components/sections/home/ResearchDeskAndTestimonials";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { AcademicMarginNote } from "@/components/ui/vsc/AcademicMarginNote";
import { InstitutionalBriefing } from "@/components/ui/vsc/InstitutionalBriefing";
import { MagneticButton } from "@/components/ui/vsc/MagneticButton";
import { ReadingContainer } from "@/components/ui/vsc/ReadingContainer";
import { ReadingTempo } from "@/components/ui/vsc/ReadingTempo";
import { ReflectionBlock } from "@/components/ui/vsc/ReflectionBlock";
import { ScrollRevealSplitText } from "@/components/ui/vsc/ScrollRevealSplitText";
import { SplitText } from "@/components/ui/vsc/SplitText";
import { SpotlightCard } from "@/components/ui/vsc/SpotlightCard";
import { TextScrambleBadge } from "@/components/ui/vsc/TextScrambleBadge";
import { VSCButton } from "@/components/ui/vsc/VSCButton";
import { Hourglass, Shield, Sliders, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* 3-Mass Balanced Restrained Navigation Capsule */}
      <Navbar />

      <main className="relative w-full bg-[#05070D] text-text-primary min-h-screen overflow-hidden">
        {/* VSC Institutional Gold Radial Ambient Canvas for Lower Sections */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 1100px, rgba(201, 168, 76, 0.04), transparent 70%), #05070D",
          }}
        />

        {/* Signature 05: Background Research Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
        />

        {/* =========================================================================
            MODULE 1: ARRIVAL (FULL BLEED HIGH-IMPACT POSTER HERO - 95-100VH)
            Atmosphere: Full-Bleed Research Desk Photography + Spacious Vertical Breathing Room
           ========================================================================= */}
        <section id="arrival" className="relative w-full min-h-[94vh] lg:min-h-[96vh] xl:min-h-screen flex flex-col justify-between pt-32 sm:pt-36 pb-10 sm:pb-14 select-none overflow-hidden border-b border-white/[0.06]">
          {/* Full-Bleed Background Photography Layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/vsc_research_desk_hero.png"
              alt="VSC Institutional Research Desk Environment"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right lg:object-center filter contrast-[1.06] brightness-[0.88]"
            />
            {/* Multi-stage Scrim Overlay preserving left lamp light glow & high contrast typography */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#05070D] via-[#05070D]/85 via-[38%] to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#05070D]/80 via-transparent to-transparent z-10"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.08),transparent_60%)] z-10 pointer-events-none"
            />
          </div>

          <div className="container relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 my-auto pt-6 sm:pt-10">
            <ReadingTempo delay={0.05}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column (≈60%): Kept 100% intact */}
                <div className="lg:col-span-7 text-left">
                  {/* Live Institutional Ticker Strip with Scramble & Radar Pulse */}
                  <TextScrambleBadge text="RESEARCH DESK ACTIVE • REGIME: RISK-MANAGED ALLOCATION" />

                  <SplitText
                    text="WELCOME TO VSC CAPITAL & ADVISORY"
                    className="font-mono text-xs sm:text-sm tracking-[0.25em] text-accent-gold uppercase font-bold block mb-6 drop-shadow-sm"
                    delay={0.15}
                  />
                  <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[1.04] text-white font-normal tracking-tight mb-8 drop-shadow-md">
                    A Smarter Way to Build and Protect Capital.
                  </h1>
                  <p className="font-mono text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-[640px] mb-12 drop-shadow-sm">
                    We study market structure, trend strength, and risk management to deploy capital with systematic discipline.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <VSCButton href="/enquire" variant="gold">
                      Connect With Us &rarr;
                    </VSCButton>
                    <VSCButton href="/blog" variant="outline">
                      The Research Journal
                    </VSCButton>
                  </div>
                </div>

                {/* Right Column (≈40%): Standalone Frameless Floating Brand Reveal (0 Cards, 0 Frames) */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
                  <HeroLogoReveal />
                </div>
              </div>
            </ReadingTempo>
          </div>

          {/* Bottom Left Scroll Indicator */}
          <div className="container relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase border-l-2 border-accent-gold pl-3.5 py-0.5">
              <span className="text-white/70 font-semibold">01</span>
              <span>SCROLL TO EXPLORE</span>
            </div>
          </div>
        </section>


        {/* Visual Problem Section: Most Investors vs VSC Framework */}
        <ProblemSection />

        {/* Infographic Section 1: How We Help Investors */}
        <HowWeHelpSection />

        {/* Infographic Section 2: How We Do It */}
        <HowWeDoItSection />


        {/* Unboxed & Asymmetric Belief Section: HOW WE THINK */}
        <BeliefSection />


        {/* =========================================================================
            MODULE 4: PROOF (EXECUTIVE BOARDROOM BRIEFING)
            Atmosphere: Sharper Information, 10-Second McKinsey Contrast Matrix
           ========================================================================= */}
        <section id="proof" className="relative w-full py-16 sm:py-24 select-none">
          <div className="container max-w-[1000px] mx-auto px-4 sm:px-6">
            <div className="max-w-[800px] mb-10 sm:mb-12">
              <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-4">
                THE VSC APPROACH
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.12]">
                Mutual funds must stay invested. VSC doesn&apos;t.
              </h2>
            </div>

            {/* Verb-First Executive Briefing Slide Matrix */}
            <InstitutionalBriefing />
          </div>
        </section>

        {/* Clean Reflection Question — Positioned Right After VSC Approach */}
        <ReflectionBlock question="If markets become riskier, should your portfolio stay fully invested?" />


        {/* Side-by-Side Merged Section: Research Desk & Investor Perspectives */}
        <ResearchDeskAndTestimonials />


        {/* =========================================================================
            MODULE 6: ACTION (THE QUIET ROOM — UNHURRIED EXIT)
            Atmosphere: Vast Whitespace, Single Reflection, One Button
           ========================================================================= */}
        <section id="action" className="relative w-full py-24 sm:py-32 select-none">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-[800px] mx-auto flex flex-col items-center">
              <span className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase font-semibold block mb-4">
                CONNECT WITH US
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-white font-normal leading-[1.15] mb-8">
                Build a Better Investment Process. Let&apos;s Start With a Conversation.
              </h2>
              <MagneticButton href="/enquire" variant="gold" className="px-10 py-4 text-sm">
                Enquire Now &rarr;
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Regulatory Strip Disclaimer */}
        <Compliance />
      </main>

      <Footer />
    </>
  );
}
