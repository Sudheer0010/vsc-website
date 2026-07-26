import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VSC Advantage | VSC Capital & Advisory",
  description: "Align your capital structure with professional portfolio advisory, growth strategies, and mathematical risk management.",
};

export default function AdvantageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
