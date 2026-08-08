import { Metadata } from "next";

const title = "Inner Circle | VSC Capital & Advisory";
const description = "Execute high-probability setups, share observation logs, and join the premium momentum execution room.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/offerings/inner-circle" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/offerings/inner-circle",
  },
};

export default function InnerCircleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
