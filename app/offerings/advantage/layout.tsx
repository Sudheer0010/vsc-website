import { Metadata } from "next";

const title = "VSC Advantage | VSC Capital & Advisory";
const description = "Align your capital structure with professional portfolio guidance, growth strategies, and mathematical risk management.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/offerings/advantage" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/offerings/advantage",
  },
};

export default function AdvantageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
