import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { AboutRedesign } from "@/app/design-lab/_components/AboutRedesign";

export const metadata: Metadata = {
  title: "Design Lab About — Editorial Signal | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabAbout() {
  return (
    <>
      <LabBanner active="about" />
      <AboutRedesign />
    </>
  );
}
