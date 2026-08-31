import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { FAQRedesign } from "@/app/design-lab/_components/FAQRedesign";

export const metadata: Metadata = {
  title: "Design Lab FAQ — Knowledge Desk | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabFAQ() {
  return (
    <>
      <LabBanner active="faq" />
      <FAQRedesign />
    </>
  );
}
