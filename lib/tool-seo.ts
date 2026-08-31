const BASE_URL = "https://vsccapital.in";

/**
 * BreadcrumbList for a calculator page: Home > Tools > <this tool>.
 *
 * Breadcrumb is the only rich-result schema these pages genuinely qualify
 * for. SoftwareApplication / WebApplication was considered and rejected:
 * Google's software-app rich result needs `offers`, `aggregateRating` or
 * `review`, and these are free tools with no price and no ratings. Supplying
 * those properties would mean inventing them, which breaks the structured
 * data guidelines. The trail below is real — every tool page renders an
 * "All tools" link back to /tools, and the URL hierarchy matches.
 */
export function toolBreadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
      { "@type": "ListItem", position: 3, name, item: `${BASE_URL}${path}` },
    ],
  };
}
