import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  targetVal?: string | number;
  variant?: "dashboard" | "metric" | "simple";
}

export function StatCard({
  label,
  value,
  targetVal,
  variant = "simple",
  className,
  ...props
}: StatCardProps) {
  if (variant === "dashboard") {
    return (
      <div className={cn("dashboard-card", className)} {...props}>
        <div className="dashboard-label">{label}</div>
        <div
          className="dashboard-val"
          {...(targetVal ? { "data-target": targetVal } : {})}
        >
          {value}
        </div>
      </div>
    );
  }

  if (variant === "metric") {
    return (
      <div className={cn("metric-box", className)} {...props}>
        <div className="metric-num">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    );
  }

  return (
    <div className={className} {...props}>
      <span className="font-display text-2xl text-white block">{value}</span>
      <span className="font-mono text-[10px] text-white/30 tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}
