"use client";

import React from "react";
import { OfferingsLayout } from "@/components/sections/offerings/OfferingsLayout";
import { DetailHero } from "@/components/sections/offerings/DetailHero";
import { AdvantageSection } from "@/components/sections/offerings/AdvantageSection";

export default function AdvantagePage() {
  return (
    <OfferingsLayout ctaService="advantage">
      <DetailHero
        title="Professional Portfolio Advisory"
        tagline="VSC Advantage"
        description="Align your capital structure with concrete growth and mathematical risk gates."
        accentColor="#C9A84C"
        glowColor="rgba(201, 168, 76, 0.06)"
        referenceText="REF // ADVISORY.SYSTEM"
      />
      <AdvantageSection />
    </OfferingsLayout>
  );
}
