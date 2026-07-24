"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketLetterModal from "@/components/cards/MarketLetterModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useScrollReveal();

  const [selectedMonth, setSelectedMonth] = useState<string>("MAY");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const durMul = prefersReduced ? 0.6 : 1;

    // Hero GSAP animations
    gsap.from("#hero h1", { y: 60, opacity: 0, duration: 1.2 * durMul, ease: "power3.out" });
    gsap.from("#hero p", { y: 30, opacity: 0, duration: 1 * durMul, delay: 0.3 * durMul, ease: "power2.out" });
    gsap.from(".btn-container", { y: 20, opacity: 0, duration: 1 * durMul, delay: 0.5 * durMul, ease: "power2.out" });
    gsap.from("#hero-dashboard-container", { opacity: 0, duration: 1.5 * durMul, delay: 0.2 * durMul, ease: "power2.out" });

    // Dashboard numerical count transitions
    const dashboardVals = document.querySelectorAll(".dashboard-val");
    dashboardVals.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const targetVal = parseFloat(htmlEl.dataset.target || "");
      if (!isNaN(targetVal)) {
        const isPercent = htmlEl.innerText.includes("%");
        const isRatio = htmlEl.innerText.includes(":1");
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8 * durMul,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".dashboard-strip",
            start: "top 85%"
          },
          onUpdate: () => {
            if (isPercent) {
              htmlEl.innerText = obj.val.toFixed(1) + "%";
            } else if (isRatio) {
              htmlEl.innerText = Math.floor(obj.val) + ":1";
            }
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const openLetter = (month: string) => {
    setSelectedMonth(month);
    setIsModalOpen(true);
  };

  const closeLetter = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />

      {/* SECTION 1: HERO */}
      <section id="hero">
        <div className="hero-fade-overlay"></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid-2" style={{ alignItems: "center", gap: "60px" }}>
            {/* Left Column */}
            <div className="fade-up">
              <div className="hero-badge">
                Structured Market Framework · Execution-Focused Research
              </div>
              <h1>Systematic Trading.<br /><span className="italic">Disciplined</span> Capital Growth.</h1>
              <p>
                Institutional-grade research and systematic momentum frameworks. We map capital flows, isolate institutional footprints, and execute high-probability setups with strict mathematical risk control.
              </p>
              <div className="btn-container" style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "35px", marginBottom: "40px" }}>
                <Link href="/offerings" className="hero-btn-primary">Explore VSC Philosophy →</Link>
                <Link href="/enquire" className="hero-btn-secondary">Strategic Discussion</Link>
              </div>
              
              {/* Understated Trust Signals */}
              <div className="hero-trust-signals">
                <div className="trust-item">
                  <span className="trust-label">Focus</span>
                  <span className="trust-val">Market Education</span>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-item">
                  <span className="trust-label">Method</span>
                  <span className="trust-val">Systematic Research</span>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-item">
                  <span className="trust-label">Regime</span>
                  <span className="trust-val">Rules-Based</span>
                </div>
              </div>
            </div>
            
            {/* Right Half */}
            <div className="fade-up" style={{ position: "relative" }}>
              <div id="hero-dashboard-container" className="hero-canvas">
                <div className="canvas-glow"></div>
                <svg className="canvas-blueprint" viewBox="0 0 500 400" fill="none" stroke="rgba(255, 255, 255, 0.4)">
                  <line x1="120" y1="0" x2="120" y2="400" strokeWidth="0.75" />
                  <line x1="380" y1="0" x2="380" y2="400" strokeWidth="0.75" />
                  <line x1="0" y1="300" x2="500" y2="300" strokeWidth="0.75" />
                  <line x1="250" y1="50" x2="250" y2="350" strokeWidth="0.75" strokeDasharray="4,8" />
                  <circle cx="250" cy="200" r="6" stroke="rgba(201, 168, 76, 0.6)" strokeWidth="0.75" />
                  <circle cx="250" cy="200" r="100" strokeWidth="0.5" strokeDasharray="2,6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET DASHBOARD STRIP */}
      <section className="dashboard-strip">
        <div className="container">
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="dashboard-label">Max Risk / Trade</div>
              <div className="dashboard-val" data-target="1.5">1.5%</div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-label">Minimum Risk Reward</div>
              <div className="dashboard-val" data-target="3">3:1</div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-label">Average Hold Period</div>
              <div className="dashboard-val">2–5 Days</div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-label">Framework</div>
              <div className="dashboard-val">Momentum</div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-label">Market Focus</div>
              <div className="dashboard-val">Stage 2 Leadership</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY VSC EXISTS */}
      <section id="philosophy">
        <div className="container">
          <div className="tag fade-up">Framework Rationale</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Why VSC <span className="italic">Exists</span></h2>
          
          <div className="grid-about fade-up">
            <div className="about-text">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.3, color: "var(--text-primary)", marginBottom: "30px" }}>
                There is a gap between passive investing and speculative trading.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.8" }}>
                VSC exists to bridge that gap. We help you understand how markets operate, learn a repeatable framework, and enable you to make decisions with logic rather than prediction.
              </p>
              <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontStyle: "italic", borderLeft: "2px solid var(--accent-gold)", paddingLeft: "20px", marginTop: "30px", color: "var(--accent-gold-light)", lineHeight: 1.6 }}>
                "Stay actively involved while maintaining full control and transparency over your capital through a disciplined, risk-first approach."
              </blockquote>
            </div>
            
            <div className="about-cards-grid">
              <div className="why-card" style={{ gridColumn: "span 3" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <svg className="icon-svg" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM3 11h18M9 11v10M15 11v10" /></svg>
                  <h3>Market Structure</h3>
                </div>
                <p>Mapping institutional footprints and mapping where large blocks of capital are deploying.</p>
              </div>

              <div className="why-card" style={{ gridColumn: "span 3" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <svg className="icon-svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <h3>Capital Preservation</h3>
                </div>
                <p>The ultimate edge. Focus on survivability during hostile market regimes.</p>
              </div>

              <div className="why-card" style={{ gridColumn: "span 2" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <svg className="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  <h3>Risk Management</h3>
                </div>
                <p>Pre-defining mathematical boundaries on every setup before taking position.</p>
              </div>

              <div className="why-card" style={{ gridColumn: "span 2" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <svg className="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                  <h3>Execution Discipline</h3>
                </div>
                <p>Consistency in checklist execution, removing emotional hesitation or over-trading.</p>
              </div>

              <div className="why-card" style={{ gridColumn: "span 2" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <svg className="icon-svg" viewBox="0 0 24 24"><path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z" /><path d="M12 6v6l4 2" /></svg>
                  <h3>Long-Term Decision Making</h3>
                </div>
                <p>Applying probabilistic thinking to build sustainable capital compounding over years.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE STUDY */}
      <section id="what-we-study" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="tag fade-up">Research Focus</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>What We Study</h2>
          <div className="grid-3 fade-up" style={{ gap: "24px" }}>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM3 11h18M9 11v10M15 11v10" /></svg>
              <h4 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", color: "var(--accent-gold)" }}>Market Structure</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Understand where capital is flowing and identify supply-demand imbalances.</p>
            </div>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="m3 16 4-4 4 4M13 8l4-4 4 4M3 20h18" /></svg>
              <h4 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", color: "var(--accent-gold)" }}>Relative Strength</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Identify sector and industry group leaders showing relative outperformance before the crowd.</p>
            </div>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19" /></svg>
              <h4 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", color: "var(--accent-gold)" }}>Sector Rotation</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Track emerging institutional themes, moving from defensive positions to momentum leaders.</p>
            </div>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              <h4 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", color: "var(--accent-gold)" }}>Risk Management</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Protect capital systematically with strict sizing models and defined exit protocols.</p>
            </div>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              <h4 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", color: "var(--accent-gold)" }}>Momentum</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Focus exclusively on stocks showing institutional velocity and high-conviction momentum.</p>
            </div>
            <div className="visual-card">
              <svg className="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
              <h4 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px", color: "var(--accent-gold)" }}>Execution Discipline</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Turn qualitative research into repeatable outcomes by sticking to rules, not feelings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: EXECUTION FRAMEWORK */}
      <section id="framework">
        <div className="container">
          <div className="tag fade-up">Operational Model</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Execution Framework</h2>
          
          <div className="framework-grid fade-up">
            <div className="framework-connector-line"></div>
            
            <div className="framework-card">
              <div className="framework-card-num">01</div>
              <div style={{ marginBottom: "20px" }}>
                <svg className="icon-svg" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h4 style={{ fontFamily: "var(--font-ui)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "14px", marginBottom: "15px" }}>SCAN</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Setup Identification. High-relative-strength screening and volume-backed breakout alerts mapping the institutional footprint.</p>
            </div>

            <div className="framework-card">
              <div className="framework-card-num">02</div>
              <div style={{ marginBottom: "20px" }}>
                <svg className="icon-svg" viewBox="0 0 24 24"><path d="m9 12 2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 style={{ fontFamily: "var(--font-ui)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "14px", marginBottom: "15px" }}>VALIDATE</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Entry Discipline. Price action confirmation. The setup must trigger our entry checklist before any position is initiated.</p>
            </div>

            <div className="framework-card">
              <div className="framework-card-num">03</div>
              <div style={{ marginBottom: "20px" }}>
                <svg className="icon-svg" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 style={{ fontFamily: "var(--font-ui)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "14px", marginBottom: "15px" }}>EXECUTE</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Exit Framework. Pre-defined hard stop-loss orders are placed immediately. Standard entry sizing based on risk tolerances.</p>
            </div>

            <div className="framework-card">
              <div className="framework-card-num">04</div>
              <div style={{ marginBottom: "20px" }}>
                <svg className="icon-svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h4 style={{ fontFamily: "var(--font-ui)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "14px", marginBottom: "15px" }}>MANAGE</h4>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Portfolio Protection. Implementation of trailing stops, partial profit taking, and dynamic adjustments based on market regime changes.</p>
            </div>
          </div>

          <div className="grid-4 fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", marginTop: "40px" }}>
            <div className="metric-box">
              <div className="metric-num">2-5</div>
              <div className="stat-label">Hold Days</div>
            </div>
            <div className="metric-box">
              <div className="metric-num">1.5%</div>
              <div className="stat-label">Max Risk</div>
            </div>
            <div className="metric-box">
              <div className="metric-num">3:1</div>
              <div className="stat-label">Min RR</div>
            </div>
            <div className="metric-box">
              <div className="metric-num">0</div>
              <div className="stat-label">Leverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHO THIS FRAMEWORK FITS */}
      <section id="who" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="tag fade-up">Designed For</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Who This Framework <span className="italic">Fits</span></h2>
          <div className="grid-2 for-grid fade-up">
            <div className="card green">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", marginBottom: "20px", color: "var(--success)" }}>Good Fit</h3>
              <ul>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="check">✔</span> Serious learners</li>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="check">✔</span> Working professionals</li>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="check">✔</span> Business owners</li>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="check">✔</span> Long-term market participants</li>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="check">✔</span> Process-driven individuals</li>
              </ul>
            </div>
            <div className="card red">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", marginBottom: "20px", color: "var(--loss)" }}>Not A Fit</h3>
              <ul>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="cross">✗</span> Tip seekers</li>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="cross">✗</span> Guaranteed-return hunters</li>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="cross">✗</span> Lottery mindset traders</li>
                <li style={{ fontSize: "13px", marginBottom: "12px" }}><span className="cross">✗</span> Shortcut seekers</li>
              </ul>
            </div>
          </div>
          <div className="fade-up" style={{ marginTop: "40px", textAlign: "center", border: "1px solid var(--border)", padding: "30px" }}>
            <p style={{ color: "var(--text-primary)", fontSize: "13px" }}>If the characteristics above align with your approach, consider applying to discuss fit and process.</p>
          </div>
        </div>
      </section>

      {/* MARKET ENVIRONMENT SECTION */}
      <section id="environment" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="tag fade-up">Market Regime</div>
          <h2 className="fade-up" style={{ marginBottom: "20px" }}>Current Market <span className="italic">Environment</span></h2>
          <p className="fade-up" style={{ maxWidth: "600px", fontSize: "13.5px", color: "var(--text-secondary)", marginBottom: "40px" }}>
            Active tracking of systemic risk, sector rotation, and momentum conditions. This dashboard is updated at every major shift in market dynamics.
          </p>
          
          <div className="market-env-card fade-up">
            <div className="market-env-item">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)" }}>Market Regime</div>
              <div className="market-env-val neutral" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", marginTop: "5px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-gold)", display: "inline-block" }}></span>
                Selective Themes
              </div>
            </div>
            <div className="market-env-item">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)" }}>Leadership Themes</div>
              <div className="market-env-val" style={{ fontSize: "13px", marginTop: "5px", lineHeight: "1.5" }}>
                Defence, Capital Goods,<br />AI Proxy, Financials
              </div>
            </div>
            <div className="market-env-item">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)" }}>Risk Level</div>
              <div className="market-env-val" style={{ color: "var(--accent-gold-light)", fontSize: "16px", marginTop: "5px" }}>
                Medium Risk
              </div>
            </div>
            <div className="market-env-item">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)" }}>Last Updated</div>
              <div className="market-env-val" style={{ fontSize: "15px", marginTop: "5px", color: "var(--text-secondary)" }}>
                June 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLIENT FEEDBACK */}
      <section id="feedback">
        <div className="container">
          <div className="tag fade-up">Social Proof</div>
          <h2 className="fade-up" style={{ marginBottom: "60px" }}>Client <span className="italic">Feedback</span></h2>
          
          <div className="testimonials-marquee fade-up">
            <div className="testimonials-marquee-content">
              <div className="visual-card testimonial-item-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">ST</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>Shivam Thakur</div>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Market Participant</div>
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: 0 }}>
                  "VSC's framework replaced chaos with structure. The transition from trading social media noise to executing a defined momentum checklist has completely reframed my approach to capital preservation."
                </p>
              </div>

              <div className="visual-card testimonial-item-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">SE</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>Sai Eshwar</div>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Working Professional</div>
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: 0 }}>
                  "The focus on institutional footprints and sector rotation provides a logical basis for every setup. It eliminates emotional guesswork, allowing consistent execution around my professional schedule."
                </p>
              </div>

              <div className="visual-card testimonial-item-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">HC</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>Hema Chandra</div>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Business Owner</div>
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: 0 }}>
                  "Treating trading as a business requires mathematical risk control. VSC's sizing models and predefined exits have made drawdowns predictable, manageable, and stress-free."
                </p>
              </div>

              {/* Cloned cards for seamless loop */}
              <div className="visual-card testimonial-item-card" aria-hidden="true">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">ST</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>Shivam Thakur</div>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Market Participant</div>
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: 0 }}>
                  "VSC's framework replaced chaos with structure. The transition from trading social media noise to executing a defined momentum checklist has completely reframed my approach to capital preservation."
                </p>
              </div>

              <div className="visual-card testimonial-item-card" aria-hidden="true">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">SE</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>Sai Eshwar</div>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Working Professional</div>
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: 0 }}>
                  "The focus on institutional footprints and sector rotation provides a logical basis for every setup. It eliminates emotional guesswork, allowing consistent execution around my professional schedule."
                </p>
              </div>

              <div className="visual-card testimonial-item-card" aria-hidden="true">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">HC</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "14px", color: "var(--text-primary)" }}>Hema Chandra</div>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Business Owner</div>
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: 0 }}>
                  "Treating trading as a business requires mathematical risk control. VSC's sizing models and predefined exits have made drawdowns predictable, manageable, and stress-free."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LATEST MARKET LETTER */}
      <section id="insights" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="tag fade-up">Execution Insights</div>
          <h2 className="fade-up" style={{ marginBottom: "40px" }}>Latest Market Letter</h2>
          <p className="fade-up" style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "60px", maxWidth: "600px", lineHeight: "1.7" }}>
            Monthly reviews detailing market structures, setup performance, and execution adjustments. Transparency is our baseline.
          </p>

          <div className="market-letter-card fade-up" style={{ marginBottom: "60px" }}>
            <div className="market-letter-cover">
              <svg className="market-letter-cover-svg" viewBox="0 0 400 150">
                <path d="M 0,120 Q 80,100 160,50 T 320,10 T 400,20" fill="none" stroke="var(--accent-gold)" strokeWidth="2" />
                <circle cx="320" cy="10" r="4" fill="var(--success)" />
                <circle cx="160" cy="50" r="4" fill="var(--accent-gold)" />
              </svg>
              <div style={{ position: "absolute", left: "40px", top: "40px", fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#fff", textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>MAY 2026</div>
            </div>
            <div className="market-letter-info" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "30px" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent-gold)", marginBottom: "5px" }}>Active Snapshot</div>
                <h3 style={{ fontSize: "20px", fontWeight: 300, marginBottom: "10px", color: "var(--text-primary)" }}>Execution Review & Geopolitical Resilience</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", maxWidth: "600px", lineHeight: "1.6" }}>A comprehensive analysis of AI Proxy sectors, Defence leadership, and the risk adjustments that generated outperformance in May.</p>
              </div>
              <button className="btn btn-gold" onClick={() => openLetter("MAY")} style={{ whiteSpace: "nowrap" }}>Open Market Letter →</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: COMPLIANCE BOX */}
      <section id="compliance" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="compliance-box">
            <div className="tag" style={{ justifyContent: "center", marginBottom: "30px" }}>Regulatory Framework</div>
            <p className="compliance-text">
              "VSC Capital & Advisory is currently in the process of applying for SEBI Research Analyst (RA) registration. Until registration is granted, all content, execution setups, and communications are strictly for educational and research purposes only. Nothing on this platform constitutes personalized investment advice or a solicitation to buy or sell any securities."
            </p>
            <div style={{ marginTop: "30px", fontSize: "10px", color: "var(--accent-gold)", fontFamily: "var(--font-ui)", letterSpacing: "2px" }}>
              MSME REGISTERED: UDYAM-AP-17-0067701 (NIC: 66190)
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: STRATEGIC DISCUSSION CTA */}
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

      {/* MARKET LETTER MODAL PORT */}
      <MarketLetterModal
        isOpen={isModalOpen}
        monthKey={selectedMonth}
        onClose={closeLetter}
      />

      <Footer />
    </>
  );
}
