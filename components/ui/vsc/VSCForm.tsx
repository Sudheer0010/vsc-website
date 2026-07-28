"use client";

import React, { useState } from "react";
import { VSCButton } from "./VSCButton";

/**
 * VSC Component: VSCForm
 * 
 * 1. Purpose: Provides strategic discussion inquiry interfaces with underlined input fields and formal compliance notices.
 * 2. Atlas Alignment: Expresses Document R-06 (Strategic Discussion Invitation) and Netlify form guardrails.
 * 3. Signature Behaviour: Underlined input fields (`border-b border-white/20`), minimal focus rings, and explicit SEBI compliance disclaimers (*Before We Begin: Research, Education, Disciplined Investing, No Stock Tips*).
 * 4. Emotional Outcome: Signals serious institutional partnership rather than sales lead generation.
 * 5. Accessibility: Explicit <label> elements, aria-required attributes, high contrast text.
 * 6. Performance: Client-side AJAX submission with fallback native POST action.
 */

interface VSCFormProps {
  formName: string;
  actionUrl?: string;
  onSuccess?: () => void;
  className?: string;
}

export function VSCForm({
  formName,
  actionUrl = "/thank-you",
  onSuccess,
  className = "",
}: VSCFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolioSize: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        params.append(key, value);
      }
    }

    if (!params.has("form-name")) {
      params.set("form-name", formName);
    }

    const payloadString = params.toString();

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payloadString,
      });

      if (response.ok) {
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        // Fallback native submit
        if (typeof form.requestSubmit === "function") {
          form.requestSubmit();
        } else {
          form.submit();
        }
      }
    } catch {
      // Fallback submit
      if (typeof form.requestSubmit === "function") {
        form.requestSubmit();
      } else {
        form.submit();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#0B0F1E] border border-accent-gold/40 rounded-xl p-8 sm:p-12 text-center select-none">
        <div aria-hidden="true" className="w-2 h-2 rounded-full bg-accent-gold mx-auto mb-6 opacity-80" />
        <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mb-4">
          Inquiry Received
        </h3>
        <p className="font-mono text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[500px] mx-auto">
          Thank you for initiating a strategic discussion with VSC Capital. Our team will review your inquiry with due process and respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      name={formName}
      method="POST"
      action={actionUrl}
      data-netlify="true"
      onSubmit={handleSubmit}
      className={`bg-[#0B0F1E] border border-white/[0.06] rounded-xl p-6 sm:p-10 flex flex-col gap-6 select-none ${className}`}
    >
      <input type="hidden" name="form-name" value={formName} />

      {/* Compliance Disclaimer Bar */}
      <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-lg font-mono text-[10px] text-white/50 leading-relaxed uppercase tracking-wider">
        <span className="text-accent-gold font-semibold block mb-1">BEFORE WE BEGIN</span>
        Research • Education • Disciplined Investing • Capital Allocation • No Stock Tips
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="form-name-input" className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
            Full Name *
          </label>
          <input
            id="form-name-input"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-transparent border-b border-white/20 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="form-email-input" className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
            Email Address *
          </label>
          <input
            id="form-email-input"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-transparent border-b border-white/20 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="form-phone-input" className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
            Phone Number
          </label>
          <input
            id="form-phone-input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-transparent border-b border-white/20 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="form-portfolio-input" className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
            Portfolio Size / Capital Range
          </label>
          <input
            id="form-portfolio-input"
            type="text"
            name="portfolioSize"
            value={formData.portfolioSize}
            onChange={(e) => setFormData({ ...formData, portfolioSize: e.target.value })}
            className="bg-transparent border-b border-white/20 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="form-message-input" className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
          Strategic Objectives / Message
        </label>
        <textarea
          id="form-message-input"
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="bg-transparent border-b border-white/20 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent-gold transition-colors resize-none"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <VSCButton type="submit" variant="gold" className="w-full sm:w-auto">
          {isSubmitting ? "INITIATING..." : "INITIATE STRATEGIC DISCUSSION"}
        </VSCButton>
      </div>
    </form>
  );
}
