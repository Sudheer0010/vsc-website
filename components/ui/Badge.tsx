import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hero" | "tag";
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  let baseClass = "tag";
  if (variant === "hero") {
    baseClass = "hero-badge";
  } else if (variant === "tag") {
    baseClass = "tag";
  }

  return (
    <div className={cn(baseClass, className)} {...props}>
      {children}
    </div>
  );
}
