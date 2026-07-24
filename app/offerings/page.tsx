"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Offerings() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="grid-overlay"></div>
        <div className="container">
          <div className="fade-up grid-2">
            <h1>Offerings</h1>
            <p style={{ maxWidth: "700px", marginTop: "30px", fontSize: "16px", color: "var(--text-secondary)" }}>
              Educational and research-driven services built around discipline, structure, and long-term capital development.
            </p>
          </div>
        </div>
      </section>

      {/* OFFERINGS SECTION 1: INVESTOR EDUCATION */}
      <section id="education">
        <div className="container">
          <div className="tag fade-up">Service 1</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Investor <span className="italic">Education</span></h2>
          
          <div className="grid-2 fade-up" style={{ gap: "30px", marginBottom: "40px" }}>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM3 11h18M9 11v10M15 11v10" /></svg>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "10px" }}>Market Foundations Program</h3>
              <p className="offering-desc">Comprehensive introduction to market structure, participant types, and execution mechanics. Learn how markets move and why most participants struggle.</p>
              <ul className="offering-items-list" style={{ marginTop: "auto" }}>
                <li>Market structure & participant behavior</li>
                <li>Price action fundamentals</li>
                <li>Trading vs. investing frameworks</li>
                <li>Real-world case studies</li>
              </ul>
            </div>

            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="m3 16 4-4 4 4M13 8l4-4 4 4M3 20h18" /></svg>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "10px" }}>Technical Analysis & Setup Recognition</h3>
              <p className="offering-desc">Master the technical patterns and volume dynamics that signal institutional participation and momentum continuation.</p>
              <ul className="offering-items-list" style={{ marginTop: "auto" }}>
                <li>Breakout identification</li>
                <li>Volume-price correlation</li>
                <li>Trend structure & continuation patterns</li>
                <li>Institutional footprint analysis</li>
              </ul>
            </div>

            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "10px" }}>Risk Management & Position Sizing</h3>
              <p className="offering-desc">The foundation of professional trading. Learn how to size positions mathematically and protect capital at all costs.</p>
              <ul className="offering-items-list" style={{ marginTop: "auto" }}>
                <li>Fixed % risk per trade calculation</li>
                <li>Stop-loss placement methodology</li>
                <li>Portfolio-level risk controls</li>
                <li>Drawdown management</li>
              </ul>
            </div>

            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "10px" }}>Trading Psychology & Discipline</h3>
              <p className="offering-desc">The mental side of execution. Understanding bias, emotional triggers, and how to maintain discipline when capital is on the line.</p>
              <ul className="offering-items-list" style={{ marginTop: "auto" }}>
                <li>Emotional discipline in execution</li>
                <li>Bias recognition & management</li>
                <li>Process vs. outcome thinking</li>
                <li>Rules-based decision making</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: "50px", textAlign: "center" }}>
            <Link href="/enquire" className="btn btn-gold" style={{ padding: "16px 36px" }}>Enquire About Education</Link>
          </div>
        </div>
      </section>

      {/* OFFERINGS SECTION 2: INVESTOR ADVISORY */}
      <section style={{ background: "var(--bg-secondary)" }} id="advisory">
        <div className="container">
          <div className="tag fade-up">Service 2</div>
          <h2 className="fade-up" style={{ marginBottom: "30px" }}>Investor <span className="italic">Advisory</span></h2>
          <p className="fade-up" style={{ maxWidth: "700px", marginBottom: "60px", fontSize: "14.5px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Strategic discussions and research-based frameworks to help you develop your own execution approach and capital allocation strategy.
          </p>

          <div className="grid-2 fade-up" style={{ gap: "30px", marginBottom: "40px" }}>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "10px" }}>Strategic Discussions</h3>
              <p className="offering-desc">One-on-one conversations to understand your capital goals, risk philosophy, and execution preferences. We discuss fit before engagement.</p>
            </div>

            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "10px" }}>Market Frameworks</h3>
              <p className="offering-desc">Custom frameworks tailored to your capital size and market environment. Actionable insights on current market structure and opportunities.</p>
            </div>

            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "10px" }}>Research-Based Insights</h3>
              <p className="offering-desc">Deep-dive research on market themes, sector dynamics, and execution setups. Focus on what's working and why.</p>
            </div>

            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "10px" }}>Capital Allocation Thinking</h3>
              <p className="offering-desc">How to think about deploying capital across timeframes, strategies, and market regimes for balanced portfolio construction.</p>
            </div>
          </div>

          <div style={{ marginTop: "50px", textAlign: "center" }}>
            <Link href="/enquire" className="btn btn-gold" style={{ padding: "16px 36px" }}>Enquire About Advisory</Link>
          </div>
        </div>
      </section>

      {/* INVESTOR LEARNING JOURNEY TIMELINE */}
      <section id="timeline-journey">
        <div className="container">
          <div className="tag fade-up">Roadmap</div>
          <h2 className="fade-up" style={{ marginBottom: "20px" }}>Investor Learning <span className="italic">Journey</span></h2>
          <p className="fade-up" style={{ maxWidth: "600px", fontSize: "13.5px", color: "var(--text-secondary)" }}>
            A structured, step-by-step path to master rules-based trading, develop execution habits, and build compounding capacity.
          </p>

          <div className="learning-timeline fade-up">
            <div className="learning-timeline-node">
              <div className="learning-timeline-dot">01</div>
              <div className="learning-timeline-content">
                <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "15px", color: "var(--accent-gold)", marginBottom: "10px", fontWeight: 700 }}>Establish Foundations</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>Understand market coordinates, volume dynamics, and institutional capital movement. Deconstruct the difference between raw speculation and business trading.</p>
              </div>
            </div>

            <div className="learning-timeline-node">
              <div className="learning-timeline-dot">02</div>
              <div className="learning-timeline-content">
                <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "15px", color: "var(--accent-gold)", marginBottom: "10px", fontWeight: 700 }}>Define the Edge</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>Study high-relative-strength sectors, breakout structures, and trend metrics. Learn to identify and validate high-conviction momentum setups.</p>
              </div>
            </div>

            <div className="learning-timeline-node">
              <div className="learning-timeline-dot">03</div>
              <div className="learning-timeline-content">
                <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "15px", color: "var(--accent-gold)", marginBottom: "10px", fontWeight: 700 }}>Formulate Risk Bounds</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>Master position-sizing models based on portfolio fraction (1% to 1.5% max risk). Establish hard stop losses and exit algorithms before committing any funds.</p>
              </div>
            </div>

            <div className="learning-timeline-node">
              <div className="learning-timeline-dot">04</div>
              <div className="learning-timeline-content">
                <h4 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "15px", color: "var(--accent-gold)", marginBottom: "10px" }}>Execute & Document</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>Apply entry checklists with total objectivity. Keep extensive trade logs, review execution quality monthly, and adjust sizing to match market regimes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS SECTION 3: RESEARCH CIRCLE */}
      <section id="research" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="tag fade-up">Service 3</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Research <span className="italic">Circle</span></h2>
          
          <div className="grid-2 fade-up" style={{ gap: "30px" }}>
            <div className="visual-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <svg className="icon-svg" viewBox="0 0 24 24"><path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z" /><path d="M12 6v6l4 2" /></svg>
                <span className="badge coming">Coming Soon</span>
              </div>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "15px" }}>Market Themes</h3>
              <p className="offering-desc">Curated market themes and sector analysis. What's working in the market now and why certain groups of stocks are leading.</p>
            </div>

            <div className="visual-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <svg className="icon-svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                <span className="badge coming">Coming Soon</span>
              </div>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "15px" }}>Monthly Research Notes</h3>
              <p className="offering-desc">Detailed market letters covering execution quality, lessons learned, and forward-looking insights.</p>
            </div>

            <div className="visual-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <svg className="icon-svg" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                <span className="badge coming">Coming Soon</span>
              </div>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "15px" }}>Execution Reviews</h3>
              <p className="offering-desc">Post-trade analysis and process reviews. Understanding what worked, what didn't, and why.</p>
            </div>

            <div className="visual-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <svg className="icon-svg" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                <span className="badge coming">Coming Soon</span>
              </div>
              <h3 className="offering-title" style={{ color: "var(--accent-gold)", fontSize: "16px", marginTop: "15px" }}>Community Discussions</h3>
              <p className="offering-desc">Connect with other disciplined investors. Share insights, ask questions, and grow your framework together.</p>
            </div>
          </div>

          <div className="fade-up" style={{ marginTop: "60px", padding: "40px", background: "var(--bg-primary)", border: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              The Research Circle is part of our roadmap as we scale. Early participants will get priority access upon launch.
            </p>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="tag fade-up">Next Steps</div>
          <h2 className="fade-up" style={{ marginBottom: "40px" }}>Start a <span className="italic">Conversation</span></h2>
          <p className="fade-up" style={{ maxWidth: "700px", marginBottom: "40px", fontSize: "14px" }}>
            All offerings begin with a strategic discussion. We'll understand your goals, assess fit, and recommend the best path forward.
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
