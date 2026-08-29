import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { HomeC } from "@/app/design-lab/_components/HomeC";

export const metadata: Metadata = {
  title: "Design Lab Home-C — Data-Native Future | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabHomeC() {
  return (
    <>
      <LabBanner active="home-c" />
      <HomeC />
    </>
  );
}
