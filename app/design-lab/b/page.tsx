import type { Metadata } from "next";
import { LabBanner } from "@/app/design-lab/_components/LabBanner";
import { DirectionB } from "@/app/design-lab/_components/DirectionB";

export const metadata: Metadata = {
  title: "Design Lab B — Cinematic Signal | VSC",
  robots: { index: false, follow: false },
};

export default function DesignLabB() {
  return (
    <>
      <LabBanner active="b" />
      <DirectionB />
    </>
  );
}
