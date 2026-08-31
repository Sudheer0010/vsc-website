import { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

const title = "Strategic Discussion | VSC Capital & Advisory";
const description = "Begin a strategic discussion with VSC to map your capital goals, risk boundaries, and trading processes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/enquire" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    title,
    description,
    url: "/enquire",
  },
};

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
