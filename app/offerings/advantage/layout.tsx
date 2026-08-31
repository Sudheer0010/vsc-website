import { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

const title = "VSC Advantage | VSC Capital & Advisory";
const description = "A structured review of how you choose trades, size risk and learn from past decisions — process review, not portfolio management.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/offerings/advantage" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    title,
    description,
    url: "/offerings/advantage",
  },
};

export default function AdvantageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
