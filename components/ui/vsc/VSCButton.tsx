"use client";

import React from "react";
import Link from "next/link";

/**
 * VSC Component: VSCButton
 * 
 * 1. Purpose: Clean, restrained button component that disappears into the experience so ideas remain prominent.
 * 2. Atlas Alignment: Expresses Principle VII ("Respect the reader") and Chapter 0 Mindset ("We compete for understanding, not attention").
 * 3. Signature Behaviour: Restrained typography and subtle hairline border transitions; never uses loud neon gradients or urgent sales triggers.
 * 4. Emotional Outcome: Provides quiet, dignified navigation without pressure or urgency.
 * 5. Accessibility: Full keyboard focus ring (`ring-2 ring-accent-gold/50`), minimum 44px touch target.
 * 6. Performance: Zero JS animation overhead; pure CSS transition (180ms).
 */

interface VSCButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

export function VSCButton({
  children,
  href,
  onClick,
  variant = "outline",
  className = "",
  type = "button",
}: VSCButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 disabled:opacity-50 select-none py-3.5 px-7 rounded-lg";

  const variantStyles = {
    gold: "bg-accent-gold text-bg-dark hover:bg-accent-gold/90 border border-accent-gold",
    outline: "bg-transparent text-white border border-white/20 hover:border-accent-gold hover:text-accent-gold",
    ghost: "bg-transparent text-text-secondary hover:text-white border border-transparent",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}
