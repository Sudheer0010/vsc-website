"use client";

import React from "react";
import { OfferingsLayout } from "@/components/sections/offerings/OfferingsLayout";
import { DetailHero } from "@/components/sections/offerings/DetailHero";
import { InnerCircleSection } from "@/components/sections/offerings/InnerCircleSection";

export default function InnerCirclePage() {
  return (
    <OfferingsLayout ctaService="inner-circle">
      <DetailHero
        title="Institutional Research Membership"
        tagline="Inner Circle"
        description="Gain direct access to quantitative audits, macro theme reviews, and codebase parameters."
        accentColor="#5D8B73"
        glowColor="rgba(93, 139, 115, 0.06)"
        referenceText="REF // INNER.CIRCLE.2026"
      />
      <InnerCircleSection />
    </OfferingsLayout>
  );
}
