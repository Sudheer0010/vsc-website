import { Metadata } from "next";

const title = "Offerings | VSC Capital & Advisory";
const description = "Explore VSC Capital offerings including the Learning Hub, VSC Advantage portfolio guidance, and the Inner Circle execution room.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/offerings" },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/offerings",
  },
};

export default function OfferingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
