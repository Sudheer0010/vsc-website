import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { ResearchRedesign } from "@/app/design-lab/_components/ResearchRedesign";

export const metadata: Metadata = {
  title: "Design Lab Research — Reading Desk | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabResearch() {
  return (
    <>
      <LabBanner active="research" />
      <ResearchRedesign />
    </>
  );
}
