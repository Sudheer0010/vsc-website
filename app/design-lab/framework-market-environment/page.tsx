import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { MarketEnvironmentRedesign } from "@/app/design-lab/_components/MarketEnvironmentRedesign";

export const metadata: Metadata = {
  title: "Design Lab Framework 01 — Market Environment | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabFrameworkMarketEnvironment() {
  return (
    <>
      <LabBanner active="framework-market-environment" />
      <MarketEnvironmentRedesign />
    </>
  );
}
