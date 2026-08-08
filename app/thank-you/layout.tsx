import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | VSC Capital & Advisory",
  description: "Thank you for reaching out. Your strategic discussion enquiry has been successfully received.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
