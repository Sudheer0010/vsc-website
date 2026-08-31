import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { MarketEnvironmentRedesignV2 } from "@/app/design-lab/_components/MarketEnvironmentRedesignV2";

export const metadata: Metadata = {
  title: "Design Lab Framework 01 v2 — Market Environment | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabFrameworkMarketEnvironmentV2() {
  return (
    <>
      <LabBanner active="framework-market-environment-v2" />
      <MarketEnvironmentRedesignV2 />
    </>
  );
}
