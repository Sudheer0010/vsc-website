import Link from "next/link";
import { PaperGrain, AmbientLightPool } from "@/components/sections/offerings/OfferingsBackground";

export const metadata = {
  title: "Page Not Found | VSC Capital & Advisory",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />
      <AmbientLightPool color="rgba(15, 122, 64, 0.02)" className="left-[70%] top-[25%] scale-[1.2]" />

      <main className="relative z-10 flex w-full items-center justify-center pb-28 pt-40 md:pb-36 md:pt-48">
        <div className="container max-w-[1200px]">
          <div className="mx-auto flex max-w-[650px] flex-col items-center text-center select-none">
            <span className="mb-6 block font-mono text-xs font-semibold uppercase tracking-widest text-ink-faint">
              404
            </span>

            <h1 className="mb-6 font-display text-5xl font-normal leading-tight text-ink sm:text-6xl md:text-7xl">
              Page not found.
            </h1>

            <p className="mb-16 max-w-[500px] font-mono text-sm leading-relaxed text-ink-soft">
              The page you&apos;re looking for doesn&apos;t exist, or has moved.
            </p>

            <div className="flex w-full flex-col items-center border-t border-rule pt-10 text-center">
              <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-ink-faint">
                Continue Exploring
              </span>

              <ul className="flex flex-col gap-4 font-mono text-sm">
                <li>
                  <Link href="/" className="text-ink-soft transition-colors duration-200 hover:text-accent-gold">
                    &rarr; Home
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="text-ink-soft transition-colors duration-200 hover:text-accent-gold">
                    &rarr; Read the research
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-ink-soft transition-colors duration-200 hover:text-accent-gold">
                    &rarr; Frequently Asked Questions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
