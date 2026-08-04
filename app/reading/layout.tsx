import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Desk | VSC Capital & Advisory",
  description: "Books, annual letters, and talks that shaped the framework — curated, not generated.",
  alternates: { canonical: "/reading" },
};

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
