import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { DirectionA } from "@/app/design-lab/_components/DirectionA";

export const metadata: Metadata = {
  title: "Design Lab A — Luminous Editorial | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabA() {
  return (
    <>
      <LabBanner active="a" />
      <DirectionA />
    </>
  );
}
