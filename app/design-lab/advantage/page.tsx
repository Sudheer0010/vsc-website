import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { AdvantageService } from "@/components/sections/offerings/AdvantageService";

export const metadata: Metadata = {
  title: "Design Lab Advantage — Service Page | VSC",
  robots: { index: false, follow: false },
};

/**
 * This prototype shipped. The route stays so the lab index keeps working, but
 * it now renders the production component rather than its own copy — a
 * duplicate would start drifting from the live page the first time either is
 * edited.
 */
export default function DesignLabAdvantage() {
  return (
    <>
      <LabBanner active="advantage" />
      <AdvantageService />
    </>
  );
}
