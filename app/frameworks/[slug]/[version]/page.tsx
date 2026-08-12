import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PaperGrain } from "@/components/sections/offerings/OfferingsBackground";
import { frameworkLibrary } from "@/data/frameworks";
import { frameworkHref, currentVersion } from "@/lib/framework-urls";
import { ArrowLeft } from "lucide-react";

interface VersionPageProps {
  params: Promise<{ slug: string; version: string }>;
}

/**
 * Only past versions get a static page here — the current version lives
 * at the clean /frameworks/[slug] URL and requesting it here redirects
 * there rather than duplicating it. Nothing generates today because every
 * framework only has one version so far (Architecture doc §6: "Superseded
 * versions live at /v1, /v2 and remain reachable forever" — there's
 * nothing superseded yet, so there's nothing to pre-render yet either).
 */
export function generateStaticParams() {
  return frameworkLibrary.flatMap((fw) =>
    fw.versions
      .filter((v) => !currentVersion(fw) || v.version !== currentVersion(fw)!.version)
      .map((v) => ({ slug: fw.slug, version: `v${v.version}` }))
  );
}

function resolve(slug: string, versionParam: string) {
  const fw = frameworkLibrary.find((f) => f.slug === slug);
  if (!fw) return null;
  const versionNum = Number(versionParam.replace(/^v/, ""));
  const entry = fw.versions.find((v) => v.version === versionNum);
  if (!entry) return null;
  return { fw, entry };
}

export async function generateMetadata({ params }: VersionPageProps): Promise<Metadata> {
  const { slug, version } = await params;
  const found = resolve(slug, version);
  if (!found) return {};
  return {
    title: `${found.fw.title} (Version ${found.entry.version}, superseded) | VSC Capital & Advisory`,
    description: `Superseded version of ${found.fw.title}. ${found.entry.changeNote}`,
    // Superseded content canonicalizes to the current version, not itself —
    // this page and the live one are the same framework, and only one
    // should be the canonical target for search.
    alternates: { canonical: frameworkHref(found.fw) },
  };
}

export default async function FrameworkVersionPage({ params }: VersionPageProps) {
  const { slug, version } = await params;
  const found = resolve(slug, version);
  if (!found) notFound();

  const { fw, entry } = found;
  const current = currentVersion(fw);
  if (current && entry.version === current.version) {
    redirect(frameworkHref(fw));
  }

  return (
    <div className="relative min-h-screen w-full bg-canvas overflow-x-hidden text-ink">
      <PaperGrain />

      <main className="relative z-10 w-full pb-24 pt-32 md:pt-40">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href={frameworkHref(fw)}
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors hover:text-growth"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to {fw.title}
          </Link>

          <div className="mb-6 rounded-xl border border-rule bg-canvas-sunk px-6 py-4">
            <p className="font-mono text-xs font-semibold text-ink-soft">
              Superseded — Version {entry.version}{entry.year ? ` · ${entry.year}` : ""}
            </p>
            <p className="mt-1 font-mono text-xs text-ink-faint">
              This version is kept reachable for citation.{" "}
              <Link href={frameworkHref(fw)} className="text-growth link-underline">
                Read the current version →
              </Link>
            </p>
          </div>

          <h1 className="mb-4 font-display text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
            {fw.title}
          </h1>

          <p className="mb-8 max-w-[60ch] text-[18px] leading-relaxed text-ink-soft">
            {fw.desc}
          </p>

          <div className="border-t border-rule pt-6">
            <h2 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-gold">
              What this version was
            </h2>
            <p className="max-w-[60ch] font-mono text-sm leading-relaxed text-ink-soft">
              {entry.changeNote}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
