import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "primary" | "secondary" | "link";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "gold",
  href,
  className,
  children,
  style,
  ...props
}: ButtonProps) {
  let baseClass = "btn";
  if (variant === "gold") {
    baseClass = "btn btn-gold";
  } else if (variant === "outline") {
    baseClass = "btn btn-outline";
  } else if (variant === "ghost") {
    baseClass = "btn btn-ghost";
  } else if (variant === "primary") {
    baseClass = "hero-btn-primary";
  } else if (variant === "secondary") {
    baseClass = "hero-btn-secondary";
  } else if (variant === "link") {
    baseClass = "nav-cta";
  }

  if (href) {
    return (
      <Link href={href} className={cn(baseClass, className)} style={style}>
        {children}
      </Link>
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <button className={cn(baseClass, className)} style={style} {...(props as any)}>
      {children}
    </button>
  );
}
