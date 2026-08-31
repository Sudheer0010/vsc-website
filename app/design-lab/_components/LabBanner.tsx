import Link from "next/link";

const LINKS = [
  { key: "a", href: "/design-lab/a", label: "A — Luminous Editorial" },
  { key: "b", href: "/design-lab/b", label: "B — Cinematic Signal" },
  { key: "c", href: "/design-lab/c", label: "C — Data-Native Future" },
  { key: "home-a", href: "/design-lab/home-a", label: "Home-A — full page" },
  { key: "home-c", href: "/design-lab/home-c", label: "Home-C — full page" },
  { key: "about", href: "/design-lab/about", label: "About — Editorial Signal" },
  { key: "offerings", href: "/design-lab/offerings", label: "Offerings — Cinematic Signal" },
  { key: "research", href: "/design-lab/research", label: "Research — Reading Desk" },
  { key: "research-frameworks", href: "/design-lab/research-frameworks", label: "Research Frameworks — Decision Funnel" },
  { key: "faq", href: "/design-lab/faq", label: "FAQ — Knowledge Desk" },
  { key: "enquire", href: "/design-lab/enquire", label: "Enquire — The Open Line" },
  { key: "advantage", href: "/design-lab/advantage", label: "Advantage — Service Page" },
  {
    key: "framework-market-environment",
    href: "/design-lab/framework-market-environment",
    label: "Framework 01 — v1 (rejected)",
  },
  {
    key: "framework-market-environment-v2",
    href: "/design-lab/framework-market-environment-v2",
    label: "Framework 01 — v2 (editorial grid)",
  },
] as const;

export type LabBannerActive = (typeof LINKS)[number]["key"];

/**
 * Marks every lab page unambiguously as an experiment, not the live site,
 * and links between prototypes for comparison. Intentionally plain — it
 * should look like tooling, not like part of the prototype.
 *
 * Pinned to the bottom, not the top: the real site Navbar is
 * `position: fixed` at the top with a height that varies responsively, so
 * an in-flow banner placed above the page content collides with it at
 * narrow widths. Bottom placement sidesteps that entirely.
 */
export function LabBanner({ active }: { active: LabBannerActive }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[999] w-full border-t border-white/10 bg-[#1a1a1a] px-4 py-2.5 text-[13px] text-white/80">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2">
        <span className="font-mono">
          VSC Design Lab — experimental prototype, not production
        </span>
        <nav className="flex flex-wrap items-center gap-1">
          {LINKS.map((d) => {
            const isActive = d.key === active;
            return (
              <Link
                key={d.href}
                href={d.href}
                className={
                  isActive
                    ? "rounded-full bg-white px-3 py-1 font-semibold text-black"
                    : "rounded-full px-3 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                }
              >
                {d.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
