"use client";

import React, { useState } from "react";
import { NewsletterConfig } from "@/types/newsletter";

interface NewsletterCTAProps {
  newsletterConfig: NewsletterConfig;
}

export function NewsletterCTA({ newsletterConfig }: NewsletterCTAProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      setIsSubmitted(true);
    } catch {
      // Fallback native submission
      form.submit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 border-t border-white/5 select-none animate-fade-in">
      <div className="max-w-[650px] mx-auto text-center flex flex-col items-center">
        
        {/* Label */}
        <span className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase mb-6 block font-semibold">
          {newsletterConfig.label}
        </span>
        
        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl leading-[1.2] text-white font-normal tracking-tight mb-4 max-w-[500px]">
          {newsletterConfig.title}
        </h2>
        
        {/* Submessage */}
        <p className="font-mono text-sm text-text-secondary leading-relaxed mb-10 max-w-[480px]">
          {newsletterConfig.description}
        </p>
        
        {isSubmitted ? (
          <div className="p-8 rounded-xl border border-accent-gold/25 bg-[#0B0F1E] max-w-[500px] w-full text-center">
            <span className="font-mono text-xs text-accent-gold uppercase tracking-widest block mb-2 font-semibold">
              Subscription Confirmed
            </span>
            <p className="font-mono text-sm text-text-secondary leading-relaxed">
              Thank you for subscribing. You&apos;ve been added to our institutional research distribution list.
            </p>
          </div>
        ) : (
          /* Netlify subscription form */
          <form 
            id="newsletter-form" 
            name="newsletter" 
            action="/thank-you"
            method="POST" 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-6 w-full max-w-[500px]"
          >

            <p style={{ display: "none" }}>
              <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
              <input type="hidden" name="form-name" value="newsletter" />
            </p>
            
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email address*" 
              required 
              className="bg-transparent border-b border-white/10 focus:border-accent-gold/45 pb-3 px-1 font-mono text-sm text-white focus:outline-none flex-grow" 
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-gold" 
              style={{ padding: "12px 28px", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
            >
              {isSubmitting ? "Submitting..." : newsletterConfig.buttonText}
            </button>
          </form>
        )}
        
      </div>
    </section>
  );
}

