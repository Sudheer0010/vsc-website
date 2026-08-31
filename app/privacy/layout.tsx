import { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

const title = "Privacy Policy | VSC Capital & Advisory";
const description = "What VSC Capital & Advisory collects through this site, why, and how to reach us about it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    title,
    description,
    url: "/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
