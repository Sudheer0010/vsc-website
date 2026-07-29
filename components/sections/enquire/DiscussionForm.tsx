"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function DiscussionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const animProps = {
    initial: { opacity: shouldReduceMotion ? 1 : 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }
  } as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const params = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          params.append(key, value);
        }
      }

      if (!params.has("form-name")) {
        params.set("form-name", "enquiry");
      }

      // Try Netlify forms submission (silently catch 404 in local dev mode)
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }).catch(() => {
        // Local dev fallback
      });

      // Show inline thank-you state on the page
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inline Thank You State (Does not take over the full page)
  if (isSubmitted) {
    return (
      <div className="w-full flex flex-col">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full bg-[#0B0F1E] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left flex flex-col items-start"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-6 h-6 text-accent-gold" />
          </div>

          <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase font-bold mb-2 block">
            INQUIRY RECEIVED
          </span>

          <h3 className="font-display text-3xl sm:text-4xl text-white font-normal mb-4">
            Thank you.
          </h3>

          <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed mb-8 max-w-[500px]">
            Your inquiry has been logged with our research desk. We review every submission personally within 24 business hours.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10 w-full">
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-mono text-xs text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5"
            >
              &larr; Submit Another Inquiry
            </button>

            <Link
              href="/"
              className="font-mono text-xs font-semibold text-bg-dark bg-accent-gold hover:bg-accent-gold/90 transition-colors px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <motion.div 
        className="w-full bg-[#0B0F1E] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left"
        {...animProps}
        transition={{ ...animProps.transition, delay: shouldReduceMotion ? 0 : 0.05 }}
      >
        <form 
          id="vsc-form" 
          name="enquiry" 
          action="/thank-you"
          method="POST" 
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <p style={{ display: "none" }}>
            <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
            <input type="hidden" name="form-name" value="enquiry" />
          </p>

          {/* Row 1: Name + Email (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-wider text-white/40 font-semibold">Your Name*</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full bg-transparent border-b border-white/15 focus:border-accent-gold pb-2 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
                placeholder="Full Name" 
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-white/40 font-semibold">Email Address*</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full bg-transparent border-b border-white/15 focus:border-accent-gold pb-2 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
                placeholder="email@example.com" 
                required
              />
            </div>
          </div>

          {/* Row 2: Phone + Capital (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-wider text-white/40 font-semibold">Phone / WhatsApp*</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className="w-full bg-transparent border-b border-white/15 focus:border-accent-gold pb-2 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
                placeholder="+91 98765 43210" 
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="capital" className="font-mono text-[10px] uppercase tracking-wider text-white/40 font-semibold">Investment Capital*</label>
              <select 
                id="capital" 
                name="capital" 
                className="w-full bg-[#060810]/60 border-b border-white/15 focus:border-accent-gold pb-2 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
                required 
                defaultValue=""
              >
                <option value="" disabled>Select Capital Range</option>
                <option value="₹1L–₹5L">₹1L – ₹5L</option>
                <option value="₹5L–₹25L">₹5L – ₹25L</option>
                <option value="₹25L–₹1Cr">₹25L – ₹1Cr</option>
                <option value="₹1Cr+">₹1Cr+</option>
              </select>
            </div>
          </div>

          {/* Row 3: Experience */}
          <div className="flex flex-col gap-2">
            <label htmlFor="exp" className="font-mono text-[10px] uppercase tracking-wider text-white/40 font-semibold">Trading Experience</label>
            <select 
              id="exp" 
              name="experience" 
              className="w-full bg-[#060810]/60 border-b border-white/15 focus:border-accent-gold pb-2 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
              defaultValue=""
            >
              <option value="" disabled>Select Experience Level</option>
              <option value="Beginner">Beginner (&lt; 1 Year)</option>
              <option value="Intermediate">Intermediate (1-3 Years)</option>
              <option value="Advanced">Advanced (3+ Years)</option>
            </select>
          </div>

          {/* Row 4: Goal */}
          <div className="flex flex-col gap-2">
            <label htmlFor="goal" className="font-mono text-[10px] uppercase tracking-wider text-white/40 font-semibold">What are you hoping to achieve?</label>
            <textarea 
              id="goal" 
              name="goal" 
              className="w-full bg-transparent border-b border-white/15 focus:border-accent-gold pb-2 font-mono text-sm text-white focus:outline-none transition-colors duration-200 min-h-[60px]" 
              placeholder="Your Primary Goal or Query" 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn btn-gold w-full mt-4 py-3.5 text-xs font-mono tracking-wider uppercase font-semibold hover:bg-accent-gold/90 transition-colors" 
          >
            {isSubmitting ? "Submitting..." : "Connect With Us →"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
