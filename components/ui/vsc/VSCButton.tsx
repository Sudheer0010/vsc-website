"use client";

import React from "react";
import Link from "next/link";

/**
 * VSCButton
 *
 * Sentence case at 16px, not 11px uppercase letterspaced to death. Tiny
 * screaming caps read as a luxury-brand tic; a button should read as a
 * sentence you could say out loud.
 *
 * Accessibility: 48px minimum target, focus ring inherited from the global
 * focus-visible rule so it can never drift out of sync with the tokens.
 */

interface VSCButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** `gold` is a deprecated alias for `growth`, kept for un-migrated pages. */
  variant?: "growth" | "gold" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const VARIANTS: Record<string, string> = {
  growth: "bg-growth text-white shadow-lift-growth hover:bg-growth-deep hover:-translate-y-0.5",
  gold: "bg-growth text-white shadow-lift-growth hover:bg-growth-deep hover:-translate-y-0.5",
  outline:
    "bg-surface text-ink border border-rule-strong hover:border-growth hover:text-growth hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink-soft hover:bg-growth-tint hover:text-growth-deep",
};

export function VSCButton({
  children,
  href,
  onClick,
  variant = "outline",
  className = "",
  type = "button",
  disabled = false,
}: VSCButtonProps) {
  const classes = [
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-vsc-md px-6 py-3",
    "font-ui text-[16px] font-semibold tracking-[-0.01em]",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-physical",
    "disabled:opacity-50",
    VARIANTS[variant] ?? VARIANTS.outline,
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
