"use client";

import React, { useState } from "react";

/**
 * Reusable email signup — spec is TASKS.md Task 1. One fixed proposition
 * ("Market observations and one monthly letter...") carries the pitch on
 * every placement; only the optional context line above it changes. No
 * card chrome by design — it sits flush within whatever section places it,
 * so a quiet homepage band or a framework page gets its background from
 * the surrounding section, not from this component.
 */

export interface EmailCaptureProps {
  /** Short line of supporting text shown above the proposition. Optional. */
  context?: string;
  /** `default`/`minimal` sit flush in page content. `minimal` drops the
   *  fixed proposition and the unsubscribe line for tight embeds.
   *  `footer` is a single compact row for the site footer. `centered-wide`
   *  drops the proposition/unsubscribe line (the caller supplies its own
   *  heading and sub-line) and centers a wide input + primary button —
   *  for sections like the Research page's mid-page Newsletter block. */
  variant?: "default" | "minimal" | "footer" | "centered-wide";
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const BUTTON_CLASS =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-vsc-md bg-growth px-6 py-3 " +
  "font-ui text-[16px] font-semibold tracking-[-0.01em] text-white shadow-lift-growth " +
  "transition-[background-color,transform] duration-200 ease-physical hover:-translate-y-0.5 hover:bg-growth-deep " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

const INPUT_CLASS =
  "h-12 w-full rounded-vsc-md border border-rule bg-canvas-sunk px-4 font-ui text-[16px] text-ink " +
  "placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:bg-surface focus:outline-none " +
  "disabled:opacity-60 sm:w-[380px]";

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function EmailCapture({ context, variant = "default", className = "" }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isFooter = variant === "footer";
  const isMinimal = variant === "minimal";
  const isCenteredWide = variant === "centered-wide";
  const showProposition = !isMinimal && !isCenteredWide;
  const showUnsubscribe = !isFooter && !isMinimal && !isCenteredWide;
  const submitting = status === "submitting";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={className} role="status">
        <p
          className={
            isFooter
              ? "text-[14px] font-medium text-vsc-dark-accent"
              : isCenteredWide
                ? "text-center text-[17px] font-medium text-growth-deep"
                : "text-[17px] font-medium text-growth-deep"
          }
        >
          You&apos;re in. Check your inbox.
        </p>
      </div>
    );
  }

  if (isFooter) {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
          <span className="text-[14px] text-vsc-dark-ink-muted">Market observations and one monthly letter.</span>

          <label htmlFor="email-capture-footer" className="sr-only">Email address</label>
          <input
            id="email-capture-footer"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            className="h-11 min-w-0 flex-1 rounded-vsc-md border border-vsc-dark-hairline bg-vsc-dark-ink/[0.06] px-4 font-ui text-[15px] text-vsc-dark-ink placeholder:text-vsc-dark-ink-muted transition-colors duration-200 focus:border-vsc-dark-accent focus:outline-none disabled:opacity-60 sm:w-[220px] sm:flex-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-11 min-h-0 items-center justify-center gap-2 whitespace-nowrap rounded-vsc-md bg-growth px-4 font-ui text-[14px] font-semibold text-white shadow-lift-growth transition-[background-color,transform] duration-200 ease-physical hover:-translate-y-0.5 hover:bg-growth-deep disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {submitting && <Spinner className="h-3.5 w-3.5" />}
            Subscribe
          </button>
        </form>

        {status === "error" && (
          <p role="alert" className="mt-2 text-[13px] text-clay">
            Something went wrong. Try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {context && <p className="mb-4 text-[15px] font-medium text-ink-muted">{context}</p>}

      {showProposition && (
        <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">
          <span className="mb-1 block font-medium text-ink">
            Market observations and one monthly letter.
          </span>
          How the market is behaving, what it means for process, and where the reading breaks
          down. No tips. No noise.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-3 ${isCenteredWide ? "items-center sm:flex-row sm:justify-center" : "sm:flex-row sm:items-center"} ${showProposition ? "mt-6" : ""}`}
      >
        <label htmlFor="email-capture-input" className="sr-only">Email address</label>
        <input
          id="email-capture-input"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          className={INPUT_CLASS}
        />
        <button type="submit" disabled={submitting} className={BUTTON_CLASS}>
          {submitting && <Spinner className="h-4 w-4" />}
          {isCenteredWide ? "Subscribe →" : "Subscribe"}
        </button>
      </form>

      {status === "error" && (
        <p role="alert" className={`mt-3 text-[14px] text-clay ${isCenteredWide ? "text-center" : ""}`}>
          Something went wrong. Try again.
        </p>
      )}

      {showUnsubscribe && (
        <p className="mt-4 text-[12px] text-ink-faint">
          We respect your attention. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
