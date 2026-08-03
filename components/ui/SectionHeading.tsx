import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
  alignment?: "left" | "center";
  useMotion?: boolean;
  motionProps?: any;
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  alignment = "left",
  useMotion = false,
  motionProps,
  className,
  ...props
}: SectionHeadingProps) {
  const alignClass = alignment === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  if (useMotion) {
    const defaultAnim = {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.25, ease: "easeOut" }
    };
    const anim = motionProps || defaultAnim;

    return (
      <div className={cn("flex flex-col mb-12 select-none", alignClass, className)} {...props}>
        <motion.span className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-gold uppercase mb-4 block font-semibold" {...anim}>
          {eyebrow}
        </motion.span>
        <motion.h2 
          className="font-display text-3xl md:text-[38px] text-ink font-normal leading-[1.2]" 
          {...anim}
          transition={{ ...anim.transition, delay: 0.05 }}
        >
          {heading}
        </motion.h2>
        {description && (
          <motion.p 
            className="font-mono text-sm leading-relaxed text-ink-soft max-w-[650px] mt-4"
            {...anim}
            transition={{ ...anim.transition, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    );
  }

  // Non-motion (GSAP / Static)
  return (
    <div className={cn("flex flex-col mb-12 select-none", alignClass, className)} {...props}>
      <div className="tag fade-up">{eyebrow}</div>
      <h2 className="fade-up leading-[1.2]" style={{ marginBottom: description ? "20px" : "60px" }}>
        {heading}
      </h2>
      {description && (
        <p className="fade-up font-mono text-sm leading-relaxed text-ink-soft max-w-[600px] mb-[40px]">
          {description}
        </p>
      )}
    </div>
  );
}
