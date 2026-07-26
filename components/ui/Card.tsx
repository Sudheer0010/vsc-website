import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "green" | "red" | "visual" | "why" | "testimonial";
  children: React.ReactNode;
}

export function Card({ variant = "default", className, children, ...props }: CardProps) {
  let baseClass = "card";
  
  if (variant === "visual") {
    baseClass = "visual-card";
  } else if (variant === "why") {
    baseClass = "why-card";
  } else if (variant === "testimonial") {
    baseClass = "visual-card testimonial-item-card";
  } else if (variant === "green") {
    baseClass = "card green";
  } else if (variant === "red") {
    baseClass = "card red";
  }

  return (
    <div className={cn(baseClass, className)} {...props}>
      {children}
    </div>
  );
}
