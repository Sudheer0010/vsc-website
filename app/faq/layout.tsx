import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | VSC Capital & Advisory",
  description: "Get answers to common questions about VSC Capital, our systematic momentum framework, trading guidelines, risk tolerances, and client engagement.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
