import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Here | VSC Capital & Advisory",
  description: "New to VSC? A short, complete path through what the desk believes and what it's published.",
  alternates: { canonical: "/start" },
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
