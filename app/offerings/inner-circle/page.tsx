"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileText, 
  Globe, 
  Cpu, 
  Code2, 
  Layers, 
  Database, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";
import { SpotlightCard } from "@/components/ui/vsc/SpotlightCard";

const modules = [
  {
    number: "Module 01",
    title: "Institutional Market Letters",
    icon: FileText,
    accentColor: "#5D8B73",
    items: [
      "Full monthly research publications",
      "Macro market environment audits",
      "Sector leadership rankings",
      "Monthly return & trade attribution"
    ]
  },
  {
    number: "Module 02",
    title: "Macro Regime Shift Analysis",
    icon: Globe,
    accentColor: "#38BDF8",
    items: [
      "Early trend transition alerts",
      "Liquidity & FII flow monitoring",
      "Inter-market breadth indicators",
      "Global risk sentiment tracking"
    ]
  },
  {
    number: "Module 03",
    title: "Quantitative Theme Audits",
    icon: Cpu,
    accentColor: "#0F7A40",
    items: [
      "High-conviction sector breakdowns",
      "Stage 2 breakout screenings",
      "Relative strength rankings",
      "Stock candidate shortlists"
    ]
  },
  {
    number: "Module 04",
    title: "Codebase & Parameter Research",
    icon: Code2,
    accentColor: "#EAB308",
    items: [
      "Algorithmic screening logic",
      "Backtested setup statistics",
      "Volatility adjustment matrices",
      "System parameter documentation"
    ]
  },
  {
    number: "Module 05",
    title: "Quarterly Macro Strategy Reviews",
    icon: Layers,
    accentColor: "#A855F7",
    items: [
      "Deep-dive quarterly trend reports",
      "Strategic portfolio positioning",
      "Risk-reward regime outlooks",
      "Institutional Q&A briefings"
    ]
  },
  {
    number: "Module 06",
    title: "Private Research Archive Access",
    icon: Database,
    accentColor: "#6F86B7",
    items: [
      "Complete historical letter vault",
      "Searchable framework index",
      "Downloadable research PDFs",
      "Institutional member Q&A desk"
    ]
  }
];

export default function InnerCirclePage() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink select-none">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Global Matte Charcoal Paper Noise Overlay */}
      <PaperGrain />

      {/* Ambient Lighting Pool */}
      <AmbientLightPool color="rgba(93, 139, 115, 0.05)" className="left-[50%] top-[25%] -translate-x-1/2 scale-[1.5]" />

      <main className="relative w-full z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Back to Offerings Link */}
          <div className="mb-8">
            <Link 
              href="/offerings" 
              className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-accent-gold transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Offerings</span>
            </Link>
          </div>

          {/* Centered Editorial Header Section */}
          <div className="max-w-[850px] mx-auto text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase mb-4 block font-bold"
            >
              OFFERINGS // VSC INNER CIRCLE
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="font-display text-4xl sm:text-6xl md:text-[68px] leading-[1.1] text-ink font-normal tracking-tight mb-8"
            >
              VSC Inner Circle
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="font-mono text-sm sm:text-base md:text-lg text-ink-soft leading-relaxed max-w-[760px] mx-auto"
            >
              VSC Inner Circle is an institutional research membership providing direct access to quantitative market audits, macro regime breakdowns, and proprietary trade desk parameters.
            </motion.p>
          </div>

          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-4xl text-ink font-normal tracking-tight">
              Inner Circle Includes
            </h2>
          </div>

          {/* 6 Modules Grid (3x2 Grid Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1200px] mx-auto mb-20">
            {modules.map((mod, idx) => {
              const IconComponent = mod.icon;
              return (
                <motion.div
                  key={mod.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                >
                  <SpotlightCard
                    className="p-8 h-full flex flex-col justify-between hover:border-rule transition-all duration-300 group"
                    spotlightColor={`${mod.accentColor}1F`}
                    borderColor={`${mod.accentColor}50`}
                  >
                    <div>
                      {/* Top Row: Icon Badge & Module Number */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-rule">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center border bg-canvas-sunk"
                          style={{ borderColor: `${mod.accentColor}40` }}
                        >
                          <IconComponent className="w-5 h-5 stroke-[1.75]" style={{ color: mod.accentColor }} />
                        </div>
                        <span 
                          className="font-mono text-xs tracking-widest font-bold uppercase"
                          style={{ color: mod.accentColor }}
                        >
                          {mod.number}
                        </span>
                      </div>

                      {/* Module Title */}
                      <h3 className="font-display text-xl sm:text-2xl text-ink font-normal mb-6 group-hover:text-accent-gold transition-colors duration-200">
                        {mod.title}
                      </h3>

                      {/* Module Bullet List */}
                      <ul className="space-y-3">
                        {mod.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3 font-mono text-xs sm:text-sm text-ink-soft">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: mod.accentColor }} />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Action Footer CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 pt-12 border-t border-rule text-center select-none">
            <p className="font-mono text-sm sm:text-base text-ink-soft flex items-center gap-2 flex-wrap justify-center">
              <span>Ready to begin?</span>
              <Link 
                href="/enquire" 
                className="text-accent-gold font-semibold hover:underline inline-flex items-center gap-1 transition-all"
              >
                <span>Enquire</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>

            <p className="font-mono text-sm sm:text-base text-ink-soft flex items-center gap-2 flex-wrap justify-center">
              <span>Get your queries answered</span>
              <Link 
                href="/faq" 
                className="text-accent-gold font-semibold hover:underline inline-flex items-center gap-1 transition-all"
              >
                <span>FAQ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>

        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
