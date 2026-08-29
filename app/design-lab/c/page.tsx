import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { DirectionC } from "@/app/design-lab/_components/DirectionC";

export const metadata: Metadata = {
  title: "Design Lab C — Data-Native Future | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabC() {
  return (
    <>
      <LabBanner active="c" />
      <DirectionC />
    </>
  );
}
