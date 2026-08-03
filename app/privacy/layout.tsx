import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VSC Capital & Advisory",
  description: "What VSC Capital & Advisory collects through this site, why, and how to reach us about it.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
