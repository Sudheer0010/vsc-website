import { Metadata } from "next";

const title = "Privacy Policy | VSC Capital & Advisory";
const description = "What VSC Capital & Advisory collects through this site, why, and how to reach us about it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
