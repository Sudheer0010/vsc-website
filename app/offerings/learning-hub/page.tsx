"use client";

import React from "react";
import { OfferingsLayout } from "@/components/sections/offerings/OfferingsLayout";
import { DetailHero } from "@/components/sections/offerings/DetailHero";
import { LearningHubSection } from "@/components/sections/offerings/LearningHubSection";

export default function LearningHubPage() {
  return (
    <OfferingsLayout ctaService="learning-hub">
      <DetailHero
        title="Professional Trading Education"
        tagline="VSC Learning Hub"
        description="Build a systematic understanding of markets before risking real capital."
        accentColor="#6F86B7"
        glowColor="rgba(111, 134, 183, 0.06)"
        referenceText="SYS.REF // 10.982.01"
      />
      <LearningHubSection />
    </OfferingsLayout>
  );
}
