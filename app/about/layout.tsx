import { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

const title = "About | VSC Capital & Advisory";
const description = "Learn about the mission, values, and origin of VSC Capital and our focus on systematic, process-driven market participation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    title,
    description,
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
