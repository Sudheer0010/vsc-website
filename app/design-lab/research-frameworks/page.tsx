import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { FrameworkFunnelExplorer } from "@/app/design-lab/_components/FrameworkFunnelExplorer";

export const metadata: Metadata = {
  title: "Design Lab Framework Library — Decision Funnel | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabResearchFrameworks() {
  return (
    <>
      <LabBanner active="research-frameworks" />
      <main className="relative w-full bg-canvas">
        <FrameworkFunnelExplorer />
      </main>
    </>
  );
}
