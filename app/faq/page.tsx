"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function FAQ() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="grid-overlay"></div>
        <div className="container">
          <div className="fade-up">
            <h1>Frequently Asked Questions</h1>
            <p style={{ maxWidth: "700px", marginTop: "30px", fontSize: "16px", color: "var(--text-secondary)" }}>
              Clear answers about our systematic framework, operational rules, risk-first approach, and offerings.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq-page">
        <div className="container">
          <div className="grid-2-faq">
            {/* GENERAL & TRADING */}
            <div className="fade-up">
              <div className="category-title">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="category-icon" style={{ flexShrink: 0 }}>
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                  <polyline points="12 22 12 12 22 8.5" />
                  <polyline points="12 12 2 8.5" />
                  <polyline points="12 2 12 12" />
                </svg>
                <span>General</span>
              </div>
              
              <details>
                <summary>
                  <span>What is VSC Capital?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>VSC Capital & Advisory is an MSME-registered research and investor education firm. We focus on momentum-based execution frameworks, systematic trading, and disciplined capital representation.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>Who is VSC for?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>VSC is for serious learners, working professionals, business owners, and long-term market participants who want to approach markets through a process-driven, rule-based execution framework.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>What makes VSC different?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>Unlike typical advisory services, we do not provide stock tips, guarantees, or short-term predictions. We focus entirely on teaching repeatable decision-making, strict risk management, and transparency.</p>
                </div>
              </details>

              <div className="category-title" style={{ marginTop: "60px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="category-icon" style={{ flexShrink: 0 }}>
                  <path d="M6 3v18M6 7h4v8H6zM14 3v18M14 10h4v6h-4z" />
                </svg>
                <span>Trading</span>
              </div>

              <details>
                <summary>
                  <span>Is trading gambling?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>No, systematic trading is a highly disciplined business characterized by a defined process, strict risk management, a repeatable mathematical edge, calculated position sizing, and capital preservation. In contrast, gambling is outcome-driven, emotional, with uncontrolled risk, and operated without a structured process or edge.</p>
                  
                  <div className="comparison-grid">
                    <div className="comparison-box">
                      <div className="comparison-title" style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}>Trading Business</div>
                      <ul className="comparison-list">
                        <li className="comparison-item">Defined process</li>
                        <li className="comparison-item">Defined risk</li>
                        <li className="comparison-item">Repeatable edge</li>
                        <li className="comparison-item">Position sizing</li>
                        <li className="comparison-item">Capital preservation</li>
                      </ul>
                    </div>
                    <div className="comparison-box" style={{ borderColor: "rgba(248, 113, 113, 0.3)" }}>
                      <div className="comparison-title" style={{ color: "var(--loss)", fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}>Gambling</div>
                      <ul className="comparison-list">
                        <li className="comparison-item">Outcome driven</li>
                        <li className="comparison-item">No process</li>
                        <li className="comparison-item">No edge</li>
                        <li className="comparison-item">Emotional decisions</li>
                        <li className="comparison-item">Uncontrolled risk</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>
                  <span>Can trading be learned?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>Yes. Just like any professional skill, rule-based trading can be mastered through structured study of market dynamics, disciplined execution, and adherence to proven risk management rules.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>Why do most traders lose?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>Most traders lose due to lack of a repeatable framework, uncontrolled risk (emotional trading or over-leveraging), and failure to preserve capital. They focus on catching the next big stock instead of building a robust process.</p>
                </div>
              </details>
            </div>

            {/* SERVICES, RISK & EDUCATION */}
            <div className="fade-up">
              <div className="category-title">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="category-icon" style={{ flexShrink: 0 }}>
                  <path d="M4 20h16M4 17h16M6 17v-8M10 17v-8M14 17v-8M18 17v-8M3 9l9-6 9 6" />
                </svg>
                <span>Services</span>
              </div>

              <details>
                <summary>
                  <span>Do you provide stock tips?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>No. We never provide stock tips, advisory recommendations, or personalized buy/sell calls. All our research is strictly for educational purposes and rule-based system discussion.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>Do you manage money?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>No, we do not manage client funds or offer Portfolio Management Services (PMS). VSC is an educational and research-driven firm; all capital is managed by clients in their own accounts.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>Do you guarantee returns?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>Absolutely not. We do not guarantee any returns. Markets are probabilistic, and anyone promising guaranteed returns is operating with a lottery mindset. We focus purely on maximizing the mathematical edge and keeping risk tightly capped.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>What happens during a strategic discussion?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>It is a 1:1 conversation focusing on alignment. We discuss your capital goals, risk philosophy, and expectations to determine if our structured execution framework aligns with your approach.</p>
                </div>
              </details>

              <div className="category-title" style={{ marginTop: "60px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="category-icon" style={{ flexShrink: 0 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
                <span>Risk</span>
              </div>

              <details>
                <summary>
                  <span>How do you think about risk?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>Risk is our primary consideration. We define our exact risk—typically capped at 1% to 1.5% of trade capital—before committing a single rupee. We maintain a strict hard stop-loss on every execution.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>What is capital preservation?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>Capital preservation is the ultimate edge. It means protecting your trading bankroll during adverse market regimes so that you survive to participate when high-conviction momentum conditions return.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>How much capital should someone start with?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>We recommend a minimum deployable capital of ₹1L to properly utilize position-sizing models and build a diversified exposure without over-allocating to a single setup.</p>
                </div>
              </details>

              <div className="category-title" style={{ marginTop: "60px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="category-icon" style={{ flexShrink: 0 }}>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  <path d="M6 8h2M6 12h2M16 8h2M16 12h2" />
                </svg>
                <span>Education</span>
              </div>

              <details>
                <summary>
                  <span>Do I need prior experience?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>No, prior experience is not strictly necessary. We have structured modules ranging from market foundations for beginners to advanced breakout execution setups.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>Is this suitable for beginners?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>Yes, beginners who are willing to learn with a serious, process-driven attitude and avoid shortcuts will find it an ideal starting point to build correct habits.</p>
                </div>
              </details>

              <details>
                <summary>
                  <span>Is this suitable for investors or traders?</span>
                  <span className="accordion-icon">+</span>
                </summary>
                <div className="accordion-content">
                  <p>It is suitable for both. The core principles of breakout structures, momentum, trend tracking, and risk management apply across all active market participation strategies.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
