import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Hub | VSC Capital & Advisory",
  description: "Accelerate your trading education with structured modules on breakout execution setups and trend tracking systems.",
};

export default function LearningHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
