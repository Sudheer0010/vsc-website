"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import { Dialog } from "@/components/ui/vsc/Dialog";
import { StepRule } from "@/components/ui/vsc/StepRule";
import { VSCButton } from "@/components/ui/vsc/VSCButton";

/**
 * PortfolioAnalysisModal — the "Free Portfolio Strength Analysis" offer.
 *
 * Step 1 is the pitch; Step 2 is the intake form, submitted to the
 * `portfolio-analysis` Netlify form (separate from the general `enquiry`
 * form — see public/__forms.html for the static detection blueprint). The
 * single source of truth for open/closed lives in EnquireExperience, which
 * also handles the first-visit auto-open, session dismissal, and the
 * `source`/`utm` attribution passed in as props; this component owns its
 * two-step-plus-success flow and the submission itself.
 *
 * FormData is built by hand rather than via `new FormData(form)` because a
 * few fields are conditional (file XOR pasted text) and a few are trimmed —
 * not because native form-field collection wouldn't work.
 */

const DIMENSIONS = ["Concentration", "Sector exposure", "Position sizing", "Liquidity", "Downside risk"];

const PORTFOLIO_SIZES = ["₹1L–₹5L", "₹5L–₹25L", "₹25L–₹1Cr", "₹1Cr+"];

type ShareMethod = "upload" | "paste" | "later" | "";

const SHARE_METHODS: { value: ShareMethod; label: string }[] = [
  { value: "upload", label: "Upload a file" },
  { value: "paste", label: "Paste my holdings" },
  { value: "later", label: "I'll send it later" },
];

const ACCEPTED_FILE_EXTENSIONS = [".csv", ".xls", ".xlsx", ".pdf", ".jpg", ".jpeg", ".png"];
const ACCEPTED_FILE_ATTR = ACCEPTED_FILE_EXTENSIONS.join(",");
const MAX_FILE_BYTES = 8 * 1024 * 1024;

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  portfolioSize: string;
  holdingsCount: string;
  shareMethod: ShareMethod;
  portfolioFile: File | null;
  portfolioText: string;
}

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  portfolioSize: "",
  holdingsCount: "",
  shareMethod: "",
  portfolioFile: null,
  portfolioText: "",
};

type TouchedField = keyof Omit<FormState, "portfolioFile" | "phone"> | "portfolioFile";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export interface PortfolioAnalysisModalProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  /** "homepage" for ?portfolio=1 entries, "enquire" for everything else. */
  source: "homepage" | "enquire";
  utm: { source: string; medium: string; campaign: string };
}

export function PortfolioAnalysisModal({ open, onClose, returnFocusRef, source, utm }: PortfolioAnalysisModalProps) {
  const [step, setStep] = useState<"offer" | "form">("offer");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<TouchedField, boolean>>>({});
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Every open starts fresh at the offer. Adjusted during render (React's
  // recommended pattern for resetting state on a prop change) rather than
  // in an effect, to avoid an extra commit.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setStep("offer");
      setForm(EMPTY_FORM);
      setTouched({});
      setFileError(null);
      setIsSubmitting(false);
      setIsSubmitted(false);
      setSubmitError(null);
    }
  }

  const holdingsError = (() => {
    const trimmed = form.holdingsCount.trim();
    if (!trimmed) return "Enter the number of holdings.";
    const n = Number(trimmed);
    if (!Number.isInteger(n) || n < 0) return "Enter a valid number.";
    return null;
  })();

  const errors: Record<TouchedField, string | null> = {
    fullName: form.fullName.trim() ? null : "Enter your full name.",
    email: !form.email.trim() ? "Enter your email." : !isValidEmail(form.email) ? "Enter a valid email address." : null,
    portfolioSize: form.portfolioSize ? null : "Select a portfolio size.",
    holdingsCount: holdingsError,
    shareMethod: form.shareMethod ? null : "Choose how you'd like to share your portfolio.",
    portfolioFile: form.shareMethod === "upload" && !form.portfolioFile ? "Choose a file to upload." : null,
    portfolioText:
      form.shareMethod === "paste" && !form.portfolioText.trim()
        ? "Paste your holdings, or choose a different option."
        : null,
  };

  const isFormValid = !fileError && Object.values(errors).every((msg) => msg === null);

  const markTouched = (field: TouchedField) => setTouched((t) => ({ ...t, [field]: true }));

  const handleShareMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ShareMethod;
    setForm((f) => ({
      ...f,
      shareMethod: value,
      portfolioFile: value === "upload" ? f.portfolioFile : null,
      portfolioText: value === "paste" ? f.portfolioText : "",
    }));
    setFileError(null);
    markTouched("shareMethod");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = "." + (file.name.split(".").pop() ?? "").toLowerCase();
    if (!ACCEPTED_FILE_EXTENSIONS.includes(extension)) {
      setFileError("Use a CSV, Excel, PDF, JPG or PNG file.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError("File is larger than 8 MB.");
      e.target.value = "";
      return;
    }

    setFileError(null);
    setForm((f) => ({ ...f, portfolioFile: file }));
    markTouched("portfolioFile");
  };

  const removeFile = () => {
    setForm((f) => ({ ...f, portfolioFile: null }));
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setTouched({
      fullName: true,
      email: true,
      portfolioSize: true,
      holdingsCount: true,
      shareMethod: true,
      portfolioFile: true,
      portfolioText: true,
    });

    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("form-name", "portfolio-analysis");
      formData.append("bot-field", "");
      formData.append("full_name", form.fullName.trim());
      formData.append("email", form.email.trim());
      formData.append("phone", form.phone.trim());
      formData.append("portfolio_size", form.portfolioSize);
      formData.append("holdings_count", form.holdingsCount.trim());
      formData.append("share_method", form.shareMethod);
      if (form.shareMethod === "upload" && form.portfolioFile) {
        formData.append("portfolio_file", form.portfolioFile);
      }
      if (form.shareMethod === "paste") {
        formData.append("portfolio_text", form.portfolioText.trim());
      }
      formData.append("source", source);
      formData.append("referrer", document.referrer);
      formData.append("utm_source", utm.source);
      formData.append("utm_medium", utm.medium);
      formData.append("utm_campaign", utm.campaign);

      // No manual Content-Type: the body may carry a file, and fetch sets
      // the correct multipart boundary itself when given a FormData body.
      const response = await fetch("/__forms.html", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your portfolio details. Please try again, or email sudheer@vsccapital.in directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelId="portfolio-analysis-heading"
      returnFocusRef={returnFocusRef}
      panelClassName="relative w-full max-w-[880px] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-vsc-lg border border-rule bg-canvas shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-canvas text-ink-soft transition-colors duration-200 hover:border-growth hover:text-growth sm:right-5 sm:top-5"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {step === "offer" ? (
          <motion.div
            key="offer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12"
          >
            {/* LEFT — copy + action */}
            <div className="p-6 pr-12 sm:p-9 sm:pr-14 lg:col-span-7">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-growth">
                Complimentary VSC review
              </span>

              <h2
                id="portfolio-analysis-heading"
                className="font-editorial mt-4 text-[clamp(26px,5vw,38px)] italic leading-[1.12] text-ink"
              >
                Get your portfolio checked. Free.
              </h2>

              <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
                See how your portfolio looks across concentration, sector exposure, position sizing, liquidity and
                downside risk.
              </p>

              <p className="mt-4 max-w-[46ch] text-[15.5px] font-medium leading-relaxed text-ink">
                Know what&apos;s strong. See where risk may be hiding.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <VSCButton variant="growth" onClick={() => setStep("form")} className="w-full sm:w-auto">
                  <span className="inline-flex items-center gap-2">
                    Get my free analysis <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </VSCButton>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] font-mono text-[13px] text-ink-faint transition-colors hover:text-ink-soft"
                >
                  Not now
                </button>
              </div>

              <p className="mt-6 border-t border-rule pt-4 text-[12px] text-ink-faint">
                Structured portfolio diagnostic. No buy/sell calls.
              </p>
            </div>

            {/* RIGHT — restrained diagnostic visual */}
            <div className="border-t border-rule bg-canvas-sunk px-6 py-7 sm:px-9 sm:py-9 lg:col-span-5 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-3">
                <StepRule size="sm" />
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Five dimensions
                </span>
              </div>

              <ol className="mt-5 flex flex-col">
                {DIMENSIONS.map((dimension, i) => (
                  <li
                    key={dimension}
                    className={`flex items-center gap-4 py-3 ${i > 0 ? "border-t border-rule" : ""}`}
                  >
                    <span className="font-mono text-[11px] text-growth">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[14px] font-medium text-ink">{dimension}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
            className="p-6 pr-12 sm:p-9 sm:pr-14"
          >
            {isSubmitted ? (
              <div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-growth" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-growth">
                    Request received
                  </span>
                </div>

                <h2
                  id="portfolio-analysis-heading"
                  className="font-editorial mt-4 text-[clamp(24px,4.5vw,32px)] italic leading-[1.12] text-ink"
                >
                  Portfolio received.
                </h2>

                <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Your request is now with the VSC desk. We&apos;ll review what you&apos;ve shared and get back to
                  you by email.
                </p>

                <div className="mt-7 border-t border-rule pt-6">
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 font-mono text-[13px] text-growth transition-colors hover:text-growth-deep"
                  >
                    Read the research <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep("offer")}
                  className="inline-flex min-h-[32px] items-center gap-1.5 font-mono text-[12px] text-ink-faint transition-colors hover:text-growth"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back
                </button>

                <span className="mt-4 block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-growth">
                  Portfolio strength analysis
                </span>

                <h2
                  id="portfolio-analysis-heading"
                  className="mt-2 text-[22px] font-semibold leading-snug text-ink sm:text-[26px]"
                >
                  A few details, and the desk gets to work.
                </h2>

                <form noValidate onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor="pa-name" className="text-[14px] font-semibold text-ink">
                        Full name
                      </label>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-growth">Required</span>
                    </div>
                    <input
                      type="text"
                      id="pa-name"
                      name="full_name"
                      value={form.fullName}
                      onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                      onBlur={() => markTouched("fullName")}
                      aria-invalid={Boolean(touched.fullName && errors.fullName)}
                      aria-describedby={touched.fullName && errors.fullName ? "pa-name-error" : undefined}
                      className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none"
                      placeholder="Full name"
                    />
                    {touched.fullName && errors.fullName && (
                      <p id="pa-name-error" role="alert" className="text-[12.5px] text-clay">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor="pa-email" className="text-[14px] font-semibold text-ink">
                        Email
                      </label>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-growth">Required</span>
                    </div>
                    <input
                      type="email"
                      id="pa-email"
                      name="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      onBlur={() => markTouched("email")}
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={touched.email && errors.email ? "pa-email-error" : undefined}
                      className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none"
                      placeholder="email@example.com"
                    />
                    {touched.email && errors.email && (
                      <p id="pa-email-error" role="alert" className="text-[12.5px] text-clay">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor="pa-phone" className="text-[14px] font-semibold text-ink">
                        Phone / WhatsApp
                      </label>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Optional</span>
                    </div>
                    <input
                      type="tel"
                      id="pa-phone"
                      name="phone"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor="pa-size" className="text-[14px] font-semibold text-ink">
                          Approximate portfolio size
                        </label>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-growth">Required</span>
                      </div>
                      <select
                        id="pa-size"
                        name="portfolio_size"
                        value={form.portfolioSize}
                        onChange={(e) => setForm((f) => ({ ...f, portfolioSize: e.target.value }))}
                        onBlur={() => markTouched("portfolioSize")}
                        aria-invalid={Boolean(touched.portfolioSize && errors.portfolioSize)}
                        aria-describedby={touched.portfolioSize && errors.portfolioSize ? "pa-size-error" : undefined}
                        className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink transition-colors duration-200 focus:border-growth focus:outline-none"
                      >
                        <option value="" disabled>
                          Select a range
                        </option>
                        {PORTFOLIO_SIZES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      {touched.portfolioSize && errors.portfolioSize && (
                        <p id="pa-size-error" role="alert" className="text-[12.5px] text-clay">
                          {errors.portfolioSize}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <label htmlFor="pa-holdings" className="text-[14px] font-semibold text-ink">
                          Number of holdings
                        </label>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-growth">Required</span>
                      </div>
                      <input
                        type="number"
                        id="pa-holdings"
                        name="holdings_count"
                        min={0}
                        inputMode="numeric"
                        value={form.holdingsCount}
                        onChange={(e) => setForm((f) => ({ ...f, holdingsCount: e.target.value }))}
                        onBlur={() => markTouched("holdingsCount")}
                        aria-invalid={Boolean(touched.holdingsCount && errors.holdingsCount)}
                        aria-describedby={
                          touched.holdingsCount && errors.holdingsCount ? "pa-holdings-error" : undefined
                        }
                        className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none"
                        placeholder="e.g. 12"
                      />
                      {touched.holdingsCount && errors.holdingsCount && (
                        <p id="pa-holdings-error" role="alert" className="text-[12.5px] text-clay">
                          {errors.holdingsCount}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <label htmlFor="pa-share-method" className="text-[14px] font-semibold text-ink">
                        How would you like to share your portfolio?
                      </label>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-growth">Required</span>
                    </div>
                    <select
                      id="pa-share-method"
                      name="share_method"
                      value={form.shareMethod}
                      onChange={handleShareMethodChange}
                      onBlur={() => markTouched("shareMethod")}
                      aria-invalid={Boolean(touched.shareMethod && errors.shareMethod)}
                      aria-describedby={touched.shareMethod && errors.shareMethod ? "pa-share-error" : undefined}
                      className="w-full border-b-2 border-rule bg-transparent py-2.5 font-ui text-[16px] text-ink transition-colors duration-200 focus:border-growth focus:outline-none"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {SHARE_METHODS.map((method) => (
                        <option key={method.value} value={method.value}>
                          {method.label}
                        </option>
                      ))}
                    </select>
                    {touched.shareMethod && errors.shareMethod && (
                      <p id="pa-share-error" role="alert" className="text-[12.5px] text-clay">
                        {errors.shareMethod}
                      </p>
                    )}
                  </div>

                  {form.shareMethod === "upload" && (
                    <div className="flex flex-col gap-2 rounded-vsc-sm border border-rule bg-canvas-sunk p-4">
                      {form.portfolioFile ? (
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate text-[14px] text-ink">{form.portfolioFile.name}</span>
                          <div className="flex shrink-0 items-center gap-3">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="font-mono text-[12px] text-ink-muted transition-colors hover:text-growth"
                            >
                              Replace
                            </button>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="font-mono text-[12px] text-ink-muted transition-colors hover:text-clay"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex min-h-[40px] w-fit items-center gap-2 rounded-vsc-sm border border-rule-strong px-4 font-mono text-[12.5px] font-semibold text-ink transition-colors hover:border-growth hover:text-growth"
                        >
                          Choose file
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={ACCEPTED_FILE_ATTR}
                        onChange={handleFileChange}
                        className="sr-only"
                        aria-describedby={fileError ? "pa-file-error" : "pa-file-note"}
                      />
                      {fileError && (
                        <p id="pa-file-error" role="alert" className="text-[12.5px] text-clay">
                          {fileError}
                        </p>
                      )}
                      {touched.portfolioFile && errors.portfolioFile && !fileError && (
                        <p role="alert" className="text-[12.5px] text-clay">
                          {errors.portfolioFile}
                        </p>
                      )}
                      <p id="pa-file-note" className="text-[12px] leading-snug text-ink-faint">
                        CSV, Excel, PDF, JPG or PNG · up to 8 MB. Please remove PAN, account numbers or other
                        personal identifiers before uploading.
                      </p>
                    </div>
                  )}

                  {form.shareMethod === "paste" && (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="pa-holdings-text" className="sr-only">
                        Your holdings
                      </label>
                      <textarea
                        id="pa-holdings-text"
                        name="portfolio_text"
                        rows={5}
                        value={form.portfolioText}
                        onChange={(e) => setForm((f) => ({ ...f, portfolioText: e.target.value }))}
                        onBlur={() => markTouched("portfolioText")}
                        aria-invalid={Boolean(touched.portfolioText && errors.portfolioText)}
                        aria-describedby={
                          touched.portfolioText && errors.portfolioText ? "pa-text-error" : "pa-text-note"
                        }
                        placeholder={"RELIANCE — 12%\nHDFCBANK — 10%\nBEL — 8%\nCASH — 15%"}
                        className="w-full rounded-vsc-sm border border-rule bg-canvas-sunk p-3 font-ui text-[14.5px] leading-relaxed text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-growth focus:outline-none"
                      />
                      {touched.portfolioText && errors.portfolioText && (
                        <p id="pa-text-error" role="alert" className="text-[12.5px] text-clay">
                          {errors.portfolioText}
                        </p>
                      )}
                      <p id="pa-text-note" className="text-[12px] text-ink-faint">
                        Approximate weights or quantities are enough.
                      </p>
                    </div>
                  )}

                  {form.shareMethod === "later" && (
                    <p className="text-[13px] leading-relaxed text-ink-faint">
                      No problem — the desk will follow up by email to collect your portfolio details.
                    </p>
                  )}

                  {submitError && (
                    <div role="alert" className="flex items-start gap-3 rounded-vsc-sm border border-clay/30 bg-clay-tint px-4 py-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                      <p className="text-[13.5px] leading-relaxed text-clay">{submitError}</p>
                    </div>
                  )}

                  <div className="mt-1">
                    <VSCButton
                      type="submit"
                      variant="growth"
                      disabled={isSubmitting || !isFormValid}
                      className="w-full sm:w-auto sm:px-8"
                    >
                      <span className="inline-flex items-center gap-2">
                        {isSubmitting ? "Sending…" : submitError ? "Retry" : "Send to the desk"}
                        {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                      </span>
                    </VSCButton>
                    <p className="mt-3 text-[12px] text-ink-faint">
                      The research desk reviews every request before any next step.
                    </p>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
