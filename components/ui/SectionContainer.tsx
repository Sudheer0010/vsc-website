import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  bg?: "primary" | "secondary";
  children: React.ReactNode;
  containerClassName?: string;
}

export function SectionContainer({
  id,
  bg = "primary",
  className,
  containerClassName,
  children,
  style,
  ...props
}: SectionContainerProps) {
  const inlineStyle = {
    ...(bg === "secondary" ? { background: "var(--bg-secondary)" } : {}),
    ...style,
  };

  return (
    <section
      id={id}
      className={cn("vsc-section", className)}
      style={inlineStyle}
      {...props}
    >
      <div className={cn("container", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
