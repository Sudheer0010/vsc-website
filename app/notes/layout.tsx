import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Insights | VSC Capital & Advisory",
  description: "Observational and educational notes — separate from the dated market letters and the versioned frameworks.",
  alternates: { canonical: "/notes" },
};

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
