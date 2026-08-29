import type { Metadata } from "next";
import Link from "next/link";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";

export const metadata: Metadata = {
  title: "Design Lab | VSC",
  robots: { index: false, follow: false },
};

const DIRECTIONS = [
  {
    href: "/design-lab/a",
    name: "A — Luminous Editorial",
    desc: "Investment-research publication feel: Newsreader serif, asymmetric composition, luminous green/cream gradient fields.",
  },
  {
    href: "/design-lab/b",
    name: "B — Cinematic Signal",
    desc: "Full-bleed deep emerald/ink, animated topographic contour fields, scroll-linked atmosphere, one luminous green break.",
  },
  {
    href: "/design-lab/c",
    name: "C — Data-Native Future",
    desc: "Hand-authored WebGL plasma hero, monospace-forward structure, unconventional spatial gate layout.",
  },
];

export default function DesignLabIndex() {
  return (
    <>
      <LabBanner active="a" />
      <main className="mx-auto max-w-[900px] px-6 py-20 sm:py-28">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0F7A40]">
          VSC Design Lab
        </span>
        <h1 className="mt-4 text-[36px] font-bold tracking-tight text-[#161D18] sm:text-[46px]">
          Three visual directions, same content.
        </h1>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-[#3D4741]">
          Each prototype below reuses the same real VSC copy and the same interactive exposure
          instrument. Everything else — layout, typography, background, motion — is a separate
          exploration. Pick a direction to open it full-page.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {DIRECTIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="block rounded-2xl border border-[#161D18]/10 p-6 transition-colors hover:border-[#0F7A40]"
            >
              <h2 className="text-[18px] font-semibold text-[#161D18]">{d.name}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-[#3D4741]">{d.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
