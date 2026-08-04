import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Framework Library | VSC Capital & Advisory",
  description: "The systematic frameworks behind the research desk's decisions — versioned, dated, and honest about what changed and why.",
  alternates: { canonical: "/frameworks" },
};

export default function FrameworksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
