import { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

const title = "VSC Community | VSC Capital & Advisory";
const description = "A room for market discussion, shared learning and second opinions — no calls, no tips, no noise. Currently in development.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/offerings/inner-circle" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    title,
    description,
    url: "/offerings/inner-circle",
  },
};

export default function InnerCircleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
