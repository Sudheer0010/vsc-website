import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { OfferingsRedesign } from "@/app/design-lab/_components/OfferingsRedesign";

export const metadata: Metadata = {
  title: "Design Lab Offerings — Cinematic Signal | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabOfferings() {
  return (
    <>
      <LabBanner active="offerings" />
      <OfferingsRedesign />
    </>
  );
}
