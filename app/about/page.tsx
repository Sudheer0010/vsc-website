"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="grid-overlay"></div>
        <div className="container">
          <div className="fade-up">
            <h1>About VSC</h1>
            <p style={{ maxWidth: "700px", marginTop: "30px", fontSize: "16px", color: "var(--text-secondary)" }}>
              A systematic approach to capital development built on discipline, process, and an unwavering commitment to risk management.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: WHO WE ARE */}
      <section id="who-we-are">
        <div className="container">
          <div className="tag fade-up">Firm Profile</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Who We <span className="italic">Are</span></h2>
          
          <div className="grid-2 fade-up" style={{ gap: "80px", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3, color: "var(--text-primary)", marginBottom: "30px" }}>
                An independent, research-oriented firm specializing in systematic market frameworks.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8" }}>
                VSC Capital & Advisory delivers disciplined, process-driven capital development models for serious market learners, working professionals, and business owners. We operate on the boundary between institutional execution and individual transparency, avoiding retail speculation in favor of strict risk management and momentum-based setups.
              </p>
            </div>
            <div>
              <div className="visual-card">
                <h3 style={{ fontFamily: "var(--font-ui)", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, color: "var(--accent-gold)", marginBottom: "15px" }}>Target Objectives</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "12px" }}><strong>Systematic Rules</strong>: Execution setups are checklist-driven, minimizing emotional variance.</p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "12px" }}><strong>Research Baseline</strong>: Continuous mapping of structural capital footprints, sector rotation themes, and relative strength leaders.</p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: 0 }}><strong>Risk Parameters</strong>: Predefined stop coordinates and sizing limits govern every study setup.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR PHILOSOPHY */}
      <section id="philosophy" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="tag fade-up">Core Tenets</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Our <span className="italic">Philosophy</span></h2>
          
          <div className="grid-3 fade-up" style={{ gap: "30px" }}>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
              <h3 style={{ fontSize: "18px", color: "var(--accent-gold)", fontWeight: 300, marginBottom: "10px" }}>Process First</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Every study decision is governed by objective process, not prediction. We follow structural rules across all market environments.</p>
            </div>

            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <h3 style={{ fontSize: "18px", color: "var(--accent-gold)", fontWeight: 300, marginBottom: "10px" }}>Capital Protection</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>We prioritize capital preservation above absolute returns. Surviving unfavorable market regimes forms our execution baseline.</p>
            </div>

            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="m3 16 4-4 4 4M13 8l4-4 4 4M3 20h18" /></svg>
              <h3 style={{ fontSize: "18px", color: "var(--accent-gold)", fontWeight: 300, marginBottom: "10px" }}>Asymmetric Edge</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>We deploy mathematical expectation models. Sizing protocols target high reward-to-risk setups with small defined loss bounds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW WE THINK */}
      <section id="how-we-think">
        <div className="container">
          <div className="tag fade-up">Analytical Framework</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>How We <span className="italic">Think</span></h2>
          
          <div className="grid-2 fade-up" style={{ gap: "40px", alignItems: "flex-start" }}>
            <div className="visual-card">
              <h3 style={{ fontSize: "18px", color: "var(--accent-gold)", fontWeight: 300, marginBottom: "20px" }}>Sizing Protocols</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "15px" }}>
                Active trading often fails due to emotional sizing. We define a strict maximum risk per trade (typically capped at 1.5% of total capital) and calculate precise share allocation coordinates based on the distance to our predefined stop loss.
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                This mathematical alignment ensures that no single adverse event or series of failed breakouts can jeopardize capital sustainability.
              </p>
            </div>
            
            <div className="visual-card">
              <h3 style={{ fontSize: "18px", color: "var(--accent-gold)", fontWeight: 300, marginBottom: "20px" }}>Stage 2 Momentum Screening</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "15px" }}>
                We focus exclusively on stocks displaying high-velocity institutional buying, relative strength outperformance, and structural Stage 2 uptrends. We avoid buying falling knives or bottom-fishing underperforming names.
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                By participating only when a stock is backed by high-volume institutional footprints, we position ourselves in alignment with dominant capital flows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR VISION */}
      <section id="vision" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="tag fade-up">Strategic Roadmap</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Our <span className="italic">Vision</span></h2>
          
          <p className="fade-up" style={{ maxWidth: "700px", marginBottom: "60px", fontSize: "14px" }}>
            VSC is built around three pillars: Discipline, Process, and Independent Thinking. Our vision is to serve as a benchmark of disciplined capital management and professional research in India.
          </p>

          <div className="fade-up">
            <div className="vision-box">
              <h3 style={{ fontSize: "18px", marginBottom: "15px", color: "var(--accent-gold)" }}>Near Term (2025-2026)</h3>
              <ul style={{ listStyle: "none", color: "var(--text-secondary)", fontSize: "13px" }}>
                <li style={{ marginBottom: "10px" }}>✓ Establish VSC as a trusted education and research firm.</li>
                <li style={{ marginBottom: "10px" }}>✓ Deliver consistent, data-backed market letters and execution insights.</li>
                <li style={{ marginBottom: "10px" }}>✓ Finalize SEBI Research Analyst (RA) registration.</li>
              </ul>
            </div>

            <div className="vision-box">
              <h3 style={{ fontSize: "18px", marginBottom: "15px", color: "var(--accent-gold)" }}>Medium Term (2027-2028)</h3>
              <ul style={{ listStyle: "none", color: "var(--text-secondary)", fontSize: "13px" }}>
                <li style={{ marginBottom: "10px" }}>✓ Launch a structured Research Circle for serious practitioners.</li>
                <li style={{ marginBottom: "10px" }}>✓ Build proprietary institutional-grade research and screening tools.</li>
                <li style={{ marginBottom: "10px" }}>✓ Initiate advisory mandates for private capital holders.</li>
              </ul>
            </div>

            <div className="vision-box">
              <h3 style={{ fontSize: "18px", marginBottom: "15px", color: "var(--accent-gold)" }}>Long Term (2029+)</h3>
              <ul style={{ listStyle: "none", color: "var(--text-secondary)", fontSize: "13px" }}>
                <li style={{ marginBottom: "10px" }}>✓ Establish Portfolio Management Services (PMS) for institutional investors.</li>
                <li style={{ marginBottom: "10px" }}>✓ Build a legacy of systematic, transparent, rules-based wealth compounders.</li>
              </ul>
            </div>
          </div>

          <div className="fade-up" style={{ marginTop: "60px", padding: "40px", background: "var(--bg-primary)", border: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontStyle: "italic", marginBottom: "20px" }}>
              "Our goal is not to be the biggest. Our goal is to be the most trusted."
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Trust comes from transparency, consistency, and putting risk-first process above speculation.</p>
          </div>
        </div>
      </section>

      {/* STRATEGIC DISCUSSION CTA */}
      <section id="apply">
        <div className="container">
          <div className="tag fade-up">Next Steps</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Strategic Discussion</h2>
          <p className="fade-up" style={{ maxWidth: "600px", marginBottom: "60px", fontSize: "15px" }}>
            The first conversation is about alignment. We discuss your capital goals, risk philosophy, and expectations. If there's fit, we move forward. If not, we'll recommend alternatives.
          </p>
          <div className="fade-up">
            <Link href="/enquire" className="btn btn-gold" style={{ padding: "18px 32px" }}>Enquire Now →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
