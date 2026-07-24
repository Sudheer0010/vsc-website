"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Enquire() {
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="grid-overlay"></div>
        <div className="container">
          <div className="fade-up">
            <h1>Strategic Discussion</h1>
            <p style={{ maxWidth: "700px", marginTop: "30px", fontSize: "16px", color: "var(--text-secondary)" }}>
              Let's have a conversation about your capital goals, risk philosophy, and whether VSC is the right fit for your approach.
            </p>
          </div>
        </div>
      </section>

      {/* APPLICATION SECTION */}
      <section id="apply">
        <div className="container">
          <div className="grid-2" style={{ gap: "80px" }}>
            <div className="fade-up">
              <div className="tag">Application Form</div>
              <h2 style={{ marginBottom: "30px" }}>Enquire <span className="italic">Now</span></h2>
              <p style={{ marginBottom: "25px" }}>Fill out the form below and we'll schedule a strategic discussion. This conversation is about alignment — understanding your goals and assessing if there's a good fit.</p>
              <div style={{ marginBottom: "30px" }}>
                <h4 style={{ fontSize: "14px", marginBottom: "15px" }}>What happens next?</h4>
                <ul style={{ listStyle: "none", fontSize: "13px" }}>
                  <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>→</span> You submit your details
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>→</span> We connect via WhatsApp
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>→</span> Schedule 1:1 discussion
                  </li>
                  <li style={{ marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--accent-gold)" }}>→</span> Discuss fit and framework
                  </li>
                </ul>
              </div>
            </div>

            <div className="fade-up">
              <div className="card">
                <div className="form-warning">
                  <strong>Important:</strong> We do not provide tips or personalized investment advice. All research is for educational and rule-based system discussion only.
                </div>
                <form id="vsc-form" name="enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you">
                  <input type="hidden" name="form-name" value="enquiry" />
                  <p style={{ display: "none" }}>
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                  </p>
                  <input type="text" id="name" name="name" className="form-input" placeholder="Full Name*" required />
                  <input type="tel" id="phone" name="phone" className="form-input" placeholder="Phone / WhatsApp*" required />
                  <input type="email" id="email" name="email" className="form-input" placeholder="Email Address" />
                  
                  <select id="capital" name="capital" className="form-input" required defaultValue="">
                    <option value="" disabled>Select Capital Range*</option>
                    <option value="₹1L–₹5L">₹1L – ₹5L</option>
                    <option value="₹5L–₹25L">₹5L – ₹25L</option>
                    <option value="₹25L–₹1Cr">₹25L – ₹1Cr</option>
                    <option value="₹1Cr+">₹1Cr+</option>
                  </select>
                  
                  <select id="exp" name="experience" className="form-input" defaultValue="">
                    <option value="" disabled>Trading Experience</option>
                    <option value="Beginner">Beginner (&lt; 1 Year)</option>
                    <option value="Intermediate">Intermediate (1-3 Years)</option>
                    <option value="Advanced">Advanced (3+ Years)</option>
                  </select>
                  
                  <textarea id="goal" name="goal" className="form-input" placeholder="Your Primary Goal" style={{ height: "100px" }}></textarea>
                  <button type="submit" className="btn btn-gold" style={{ width: "100%" }}>Submit Enquiry →</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
