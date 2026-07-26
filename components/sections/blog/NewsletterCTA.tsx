import React from "react";
import { NewsletterConfig } from "@/types/newsletter";

interface NewsletterCTAProps {
  newsletterConfig: NewsletterConfig;
}

export function NewsletterCTA({ newsletterConfig }: NewsletterCTAProps) {
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
        
        {/* Netlify subscription form */}
        <form 
          id={`${newsletterConfig.formName}-form`} 
          name={newsletterConfig.formName} 
          method="POST" 
          data-netlify="true" 
          netlify-honeypot="bot-field" 
          action={newsletterConfig.action} 
          className="flex flex-col sm:flex-row gap-6 w-full max-w-[500px]"
        >
          <input type="hidden" name="form-name" value={newsletterConfig.formName} />
          <p style={{ display: "none" }}>
            <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
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
            className="btn btn-gold" 
            style={{ padding: "12px 28px", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}
          >
            {newsletterConfig.buttonText}
          </button>
        </form>
        
      </div>
    </section>
  );
}
