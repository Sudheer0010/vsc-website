import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.2 }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[95vh] flex items-center pt-32 pb-24 overflow-hidden select-none bg-[radial-gradient(circle_at_20%_45%,rgba(201,168,76,0.02),transparent_45%)]"
    >
      <div className="container relative z-10 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column (typography & copy) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-accent-gold uppercase mb-8 block font-bold"
              variants={itemVariants}
            >
              WELCOME TO VSC CAPITAL
            </motion.span>
            
            <motion.h1 
              className="font-display text-4xl sm:text-5xl md:text-[58px] leading-[1.1] text-white font-normal tracking-tight mb-5"
              variants={itemVariants}
            >
              A Smarter Way to Build and Protect Capital.
            </motion.h1>
            
            <motion.h2 
              className="font-display text-xl sm:text-2xl text-accent-gold/85 font-light mb-12 italic"
              variants={itemVariants}
            >
              Invest with Process. Not Predictions.
            </motion.h2>
            
            {/* 3 Institutional Pillars */}
            <motion.div 
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 font-mono text-xs sm:text-sm text-white/50 tracking-wider uppercase mb-12 border-y border-white/5 py-5 w-full"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                <span>Independent Research</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                <span>Disciplined Decisions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                <span>Protected Capital</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4 items-center"
              variants={itemVariants}
            >
              <Button variant="gold" href="/offerings" className="px-8 py-3.5 text-xs font-mono tracking-wider uppercase font-semibold">
                Explore Our Framework →
              </Button>
              <Button variant="outline" href="/blog" className="px-8 py-3.5 text-xs font-mono tracking-wider uppercase font-semibold">
                Research Library
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right Column (Editorial cover photo) */}
          <div className="lg:col-span-5 w-full flex justify-end">
            <motion.div 
              className="relative w-full max-w-[390px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 bg-[#0B0F1E] shadow-[0_25px_60px_rgba(0,0,0,0.6)] group"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
              <Image 
                src="/vsc_annual_report_hero.png" 
                alt="VSC Capital Research Environment - Workspace preparation and institutional tools"
                fill
                priority
                sizes="(max-w-lg) 100vw, 390px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
