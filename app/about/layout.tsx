import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | VSC Capital & Advisory",
  description: "Learn about the mission, values, and origin of VSC Capital and our focus on systematic, process-driven market participation.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
