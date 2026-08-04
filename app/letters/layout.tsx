import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Letter Archive | VSC Capital & Advisory",
  description: "Every monthly market letter, in order, unedited after publication. Corrections are appended and dated, never silently changed.",
  alternates: { canonical: "/letters" },
};

export default function LettersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
