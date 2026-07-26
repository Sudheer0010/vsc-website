import React from "react";
import { motion } from "framer-motion";

export function DiscussionForm() {
  const animProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.2, ease: "easeOut" }
  } as const;

  return (
    <div className="lg:col-span-8 flex flex-col w-full">
      {/* Flat Integrated Form (Tinted bg panel `#090D18`, generous 48-64px padding) */}
      <motion.div 
        className="w-full bg-[#090D18] rounded-xl p-8 sm:p-12 text-left"
        {...animProps}
        transition={{ ...animProps.transition, delay: 0.05 }}
      >
        
        {/* Compliance Disclaimer Notice (Above Form Fields) */}
        <div className="border-l border-accent-gold/45 pl-6 py-1.5 mb-10 select-none">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-3 font-semibold">BEFORE WE BEGIN</span>
          <div className="flex flex-col gap-1 font-mono text-[11px] text-white/40 leading-relaxed">
            <div>Research.</div>
            <div>Education.</div>
            <div>Disciplined investing.</div>
            <div>No stock tips.</div>
            <div>No guaranteed returns.</div>
          </div>
        </div>

        <form 
          id="vsc-form" 
          name="enquiry" 
          method="POST" 
          data-netlify="true" 
          netlify-honeypot="bot-field" 
          className="flex flex-col gap-8"
        >
          <p style={{ display: "none" }}>
            <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
          </p>

          {/* Name + Phone (2 Columns on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-wider text-white/30 pl-1 font-semibold">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full bg-transparent border-b border-white/10 focus:border-accent-gold/45 pb-3 px-1 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
                placeholder="Full Name*" 
                required 
              />
            </div>

            <div className="flex flex-col gap-5">
              <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-wider text-white/30 pl-1 font-semibold">Phone / WhatsApp</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className="w-full bg-transparent border-b border-white/10 focus:border-accent-gold/45 pb-3 px-1 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
                placeholder="Phone / WhatsApp*" 
                required 
              />
            </div>
          </div>

          {/* Email (Full Width) */}
          <div className="flex flex-col gap-5">
            <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-white/30 pl-1 font-semibold">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="w-full bg-transparent border-b border-white/10 focus:border-accent-gold/45 pb-3 px-1 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
              placeholder="Email Address" 
            />
          </div>

          {/* Capital + Experience (2 Columns on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <label htmlFor="capital" className="font-mono text-[10px] uppercase tracking-wider text-white/30 pl-1 font-semibold">Current Investment Capital</label>
              <select 
                id="capital" 
                name="capital" 
                className="w-full bg-[#060810]/40 border-b border-white/10 focus:border-accent-gold/45 pb-3 px-1 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
                required 
                defaultValue=""
              >
                <option value="" disabled>Select Capital Range*</option>
                <option value="₹1L–₹5L">₹1L – ₹5L</option>
                <option value="₹5L–₹25L">₹5L – ₹25L</option>
                <option value="₹25L–₹1Cr">₹25L – ₹1Cr</option>
                <option value="₹1Cr+">₹1Cr+</option>
              </select>
            </div>

            <div className="flex flex-col gap-5">
              <label htmlFor="exp" className="font-mono text-[10px] uppercase tracking-wider text-white/30 pl-1 font-semibold">Your Experience</label>
              <select 
                id="exp" 
                name="experience" 
                className="w-full bg-[#060810]/40 border-b border-white/10 focus:border-accent-gold/45 pb-3 px-1 font-mono text-sm text-white focus:outline-none transition-colors duration-200" 
                defaultValue=""
              >
                <option value="" disabled>Trading Experience</option>
                <option value="Beginner">Beginner (&lt; 1 Year)</option>
                <option value="Intermediate">Intermediate (1-3 Years)</option>
                <option value="Advanced">Advanced (3+ Years)</option>
              </select>
            </div>
          </div>

          {/* Goal (Full Width) */}
          <div className="flex flex-col gap-5">
            <label htmlFor="goal" className="font-mono text-[10px] uppercase tracking-wider text-white/30 pl-1 font-semibold">What are you hoping to achieve?</label>
            <textarea 
              id="goal" 
              name="goal" 
              className="w-full bg-transparent border-b border-white/10 focus:border-accent-gold/45 pb-3 px-1 font-mono text-sm text-white focus:outline-none transition-colors duration-200 min-h-[80px]" 
              placeholder="Your Primary Goal" 
            />
          </div>

          {/* CTA Submit Button with top margin */}
          <button 
            type="submit" 
            className="btn btn-gold w-full mt-6 py-3.5 text-xs font-mono tracking-wider uppercase" 
          >
            Start Your VSC Journey →
          </button>
        </form>
      </motion.div>
    </div>
  );
}
