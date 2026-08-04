import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Library | VSC Capital & Advisory",
  description: "A growing collection of research, market letters, investment frameworks and carefully curated resources designed to help investors think independently.",
  alternates: { canonical: "/research" },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
