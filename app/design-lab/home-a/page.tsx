import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { HomeA } from "@/app/design-lab/_components/HomeA";

export const metadata: Metadata = {
  title: "Design Lab Home-A — Luminous Editorial | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabHomeA() {
  return (
    <>
      <LabBanner active="home-a" />
      <HomeA />
    </>
  );
}
