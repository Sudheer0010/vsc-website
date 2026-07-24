"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ThankYou() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className="grid-overlay"></div>
        <div className="container">
          <div className="fade-up" style={{ maxWidth: "750px", margin: "0 auto", textAlign: "center" }}>
            <div className="tag" style={{ marginBottom: "20px" }}>Enquiry Received</div>
            <h1 style={{ marginBottom: "25px" }}>Thank You for Your <span className="italic">Enquiry</span></h1>
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "40px", lineHeight: "1.6" }}>
              Your details have been submitted successfully. We appreciate your interest in VSC Capital & Advisory and will review your submission promptly.
            </p>
            <div className="card" style={{ textAlign: "left", marginBottom: "40px", borderLeft: "3px solid var(--accent-gold)" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "15px", color: "#fff" }}>What to Expect Next:</h4>
              <ul style={{ listStyle: "none", fontSize: "14px", color: "var(--text-secondary)" }}>
                <li style={{ marginBottom: "12px", paddingLeft: "24px", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>✓</span>
                  <strong>Submission Recorded:</strong> Your response is logged securely via Netlify Forms.
                </li>
                <li style={{ marginBottom: "12px", paddingLeft: "24px", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>✓</span>
                  <strong>Review & Assessment:</strong> We analyze your capital goals and risk profile to confirm alignment.
                </li>
                <li style={{ marginBottom: 0, paddingLeft: "24px", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>✓</span>
                  <strong>Direct Contact:</strong> A representative will contact you via email or phone for a strategic discussion.
                </li>
              </ul>
            </div>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" className="btn btn-gold">Return to Homepage →</Link>
              <Link href="/offerings" className="btn btn-ghost" style={{ border: "1px solid var(--border)" }}>Explore Offerings</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
