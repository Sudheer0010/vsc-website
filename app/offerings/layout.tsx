import { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

const title = "Offerings | VSC Capital & Advisory";
const description = "Three ways to work with VSC: VSC Learn, a VSC Advantage process review, and the VSC Community discussion room.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/offerings" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    title,
    description,
    url: "/offerings",
  },
};

export default function OfferingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
