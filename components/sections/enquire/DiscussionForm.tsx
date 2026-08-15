"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";

/**
 * Three required fields — name, email, phone — not five. Investment
 * capital and trading experience are gone entirely: a required wealth
 * bracket on a first contact form reads as lead-qualification, not
 * conversation, and it's the one thing the reassurance copy alongside this
 * form was quietly working against.
 *
 * The open question moves to the front and gets asked before anything
 * else, so the first thing this form does is listen rather than collect.
 */
export function DiscussionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    setSubmitError(null);

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

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      // Show inline thank-you state on the page
      setIsSubmitted(true);
    } catch {
      // Entered values stay in the (uncontrolled) fields — the form stays
      // mounted so the visitor can just fix things and press submit again.
      setSubmitError(
        "Something went wrong sending your inquiry. Please try again, or email sudheer@vsccapital.in directly."
      );
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
          className="w-full bg-surface border border-rule rounded-2xl p-8 sm:p-10 shadow-lift-3 text-left flex flex-col items-start"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-6 h-6 text-accent-gold" />
          </div>

          <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase font-bold mb-2 block">
            INQUIRY RECEIVED
          </span>

          <h3 className="font-display text-3xl sm:text-4xl text-ink font-normal mb-4">
            Thank you.
          </h3>

          <p className="font-mono text-xs sm:text-sm text-ink-soft leading-relaxed mb-8 max-w-[500px]">
            Your inquiry has been logged with our research desk. I review every submission personally within 24 business hours.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-rule w-full">
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-mono text-xs text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-rule bg-canvas-sunk"
            >
              &larr; Submit Another Inquiry
            </button>

            <Link
              href="/"
              className="font-mono text-xs font-semibold text-white bg-accent-gold hover:bg-accent-gold-light transition-colors px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5"
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
        className="w-full bg-surface border border-rule rounded-2xl p-6 sm:p-8 md:p-10 shadow-lift-3 text-left"
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

          {/* What brings you here — first, and the only optional field.
              Answering before being asked who you are is the point. */}
          <div className="flex flex-col gap-2">
            <label htmlFor="goal" className="font-mono text-[10px] uppercase tracking-wider text-ink-faint font-semibold">
              What brings you here?
            </label>
            <textarea
              id="goal"
              name="goal"
              className="w-full bg-transparent border-b border-rule focus:border-accent-gold pb-2 font-mono text-sm text-ink focus:outline-none transition-colors duration-200 min-h-[60px]"
              placeholder="A specific question, or just curiosity — whatever's on your mind. Optional."
            />
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-wider text-ink-faint font-semibold">Your Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-transparent border-b border-rule focus:border-accent-gold pb-2 font-mono text-sm text-ink focus:outline-none transition-colors duration-200"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-ink-faint font-semibold">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-transparent border-b border-rule focus:border-accent-gold pb-2 font-mono text-sm text-ink focus:outline-none transition-colors duration-200"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-wider text-ink-faint font-semibold">Phone / WhatsApp*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full bg-transparent border-b border-rule focus:border-accent-gold pb-2 font-mono text-sm text-ink focus:outline-none transition-colors duration-200"
              placeholder="+91 98765 43210"
              required
            />
          </div>

          {/* Inline error state — visible only after a failed submission */}
          {submitError && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-clay/30 bg-clay-tint px-4 py-3"
            >
              <AlertCircle className="w-4 h-4 text-clay flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-mono text-xs text-clay leading-relaxed">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="btn btn-gold w-full mt-4 py-3.5 text-xs font-mono tracking-wider uppercase font-semibold hover:bg-accent-gold/90 transition-colors"
          >
            {isSubmitting ? "Sending..." : submitError ? "Retry →" : "Enquire →"}
          </button>

          <p className="font-mono text-[10.5px] text-ink-faint text-center -mt-2">
            By submitting, you agree to our{" "}
            <Link href="/privacy" className="text-ink-muted underline hover:text-accent-gold transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </motion.div>
    </div>
  );
}
