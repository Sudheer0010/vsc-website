import { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

const title = "Frequently Asked Questions | VSC Capital & Advisory";
const description = "Get answers to common questions about VSC Capital, our systematic momentum framework, trading guidelines, risk tolerances, and client engagement.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    images: OG_IMAGES,
    type: "website",
    title,
    description,
    url: "/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
