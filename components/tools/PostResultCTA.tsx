import Link from "next/link";
import { EmailCapture } from "@/components/ui/vsc/EmailCapture";

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbEFHnQKWEKq2I8azp3S";

/**
 * Post-result acquisition block for calculator pages.
 *
 * Every caller places this inside its own "ready" result branch, never
 * alongside the empty/no-input state — so it only ever appears once a
 * calculator has actually produced a number, and never gates or delays
 * that number. `EmailCapture` is the same shared component the footer and
 * every framework page already use; this just embeds it with a calculator-
 * specific heading instead of duplicating a signup form.
 */
export function PostResultCTA({
  showPortfolioCheck = false,
  className = "",
}: {
  /** Only calculators where a portfolio-wide check is contextually relevant. */
  showPortfolioCheck?: boolean;
  className?: string;
}) {
  return (
    <div className={`rounded-vsc-lg border border-growth/25 bg-growth-wash p-4 sm:p-5 ${className}`}>
      <p className="text-[14.5px] font-semibold text-ink">Want the market context behind the numbers?</p>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
        Get the VSC Market Letter — how the market is behaving and what it means for process, once a month.
      </p>

      <div className="mt-3.5">
        <EmailCapture variant="minimal" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-growth/15 pt-3.5">
        <a
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center text-[13.5px] font-semibold text-growth hover:text-growth-deep lg:min-h-0"
        >
          Follow VSC on WhatsApp &rarr;
        </a>
        {showPortfolioCheck && (
          <Link
            href="/enquire?portfolio=1"
            className="inline-flex min-h-11 items-center text-[13.5px] font-semibold text-growth hover:text-growth-deep lg:min-h-0"
          >
            Get a free Portfolio Strength Check &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
