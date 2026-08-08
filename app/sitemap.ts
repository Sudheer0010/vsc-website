import type { MetadataRoute } from "next";
import { marketLetters, sortedMonths } from "@/data/market-letters";
import { letterHref } from "@/lib/letter-urls";
import { frameworkLibrary } from "@/data/frameworks";
import { frameworkHref, frameworkVersionHref, currentVersion } from "@/lib/framework-urls";
import { articles } from "@/data/research";

const BASE_URL = "https://vsccapital.in";

/**
 * Generated, not hand-written — the static sitemap.xml this replaced went
 * stale (missing 4 of 11 real routes, and obviously couldn't list letters
 * that didn't have URLs yet). This regenerates from the actual route table
 * and the actual content data every build, so it can't drift again.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/offerings`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/offerings/advantage`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/offerings/inner-circle`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/offerings/learning-hub`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/research`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/start`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/letters`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/notes`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/frameworks`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/reading`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/enquire`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const letterRoutes: MetadataRoute.Sitemap = sortedMonths.map((key) => ({
    url: `${BASE_URL}${letterHref(key)}`,
    lastModified: marketLetters[key].publishedDate,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const frameworkRoutes: MetadataRoute.Sitemap = frameworkLibrary.map((fw) => ({
    url: `${BASE_URL}${frameworkHref(fw)}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Superseded versions only — the current version is the clean URL above.
  const frameworkVersionRoutes: MetadataRoute.Sitemap = frameworkLibrary.flatMap((fw) => {
    const current = currentVersion(fw);
    return fw.versions
      .filter((v) => !current || v.version !== current.version)
      .map((v) => ({
        url: `${BASE_URL}${frameworkVersionHref(fw, v.version)}`,
        changeFrequency: "never" as const,
        priority: 0.3,
      }));
  });

  const noteRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.type === "RESEARCH NOTE" && a.published !== false)
    .map((note) => ({
      url: `${BASE_URL}/notes/${note.slug}`,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  return [
    ...staticRoutes,
    ...letterRoutes,
    ...frameworkRoutes,
    ...frameworkVersionRoutes,
    ...noteRoutes,
  ];
}
