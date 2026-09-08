import { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

const title = "VSC Learn | VSC Capital & Advisory";
const description = "Accelerate your trading education with structured modules on breakout execution setups and trend tracking systems.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/offerings/learning-hub" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    title,
    description,
    url: "/offerings/learning-hub",
  },
};

export default function LearningHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
