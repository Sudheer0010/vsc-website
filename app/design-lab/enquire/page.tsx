import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { EnquireRedesign } from "@/app/design-lab/_components/EnquireRedesign";

export const metadata: Metadata = {
  title: "Design Lab Enquire — The Open Line | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabEnquire() {
  return (
    <>
      <LabBanner active="enquire" />
      <EnquireRedesign />
    </>
  );
}
