import { marketLetters, sortedMonths } from "@/data/market-letters";
import { letterHref } from "@/lib/letter-urls";

const BASE_URL = "https://vsccapital.in";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS from day one (Architecture doc §10.3) — scoped to Letters, the one
 * content type here with real, dated, permanent-URL content to syndicate.
 */
export async function GET() {
  const items = sortedMonths
    .map((key) => {
      const letter = marketLetters[key];
      const monthName = letter.month.charAt(0) + letter.month.slice(1).toLowerCase();
      const url = `${BASE_URL}${letterHref(key)}`;
      const pubDate = new Date(`${letter.publishedDate}T00:00:00Z`).toUTCString();
      const title = `${monthName} ${letter.year} Market Letter · Letter ${String(letter.letterNumber).padStart(3, "0")}`;
      const description = letter.description || "";

      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>VSC Capital &amp; Advisory — Market Letters</title>
    <link>${BASE_URL}/letters</link>
    <description>Monthly market letters from VSC Capital &amp; Advisory, published in full and never edited after the fact.</description>
    <language>en-in</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
