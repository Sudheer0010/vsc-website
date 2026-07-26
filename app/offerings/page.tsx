"use client";

import React from "react";
import { OfferingsLayout } from "@/components/sections/offerings/OfferingsLayout";
import { OfferingsHero } from "@/components/sections/offerings/OfferingsHero";
import { ThreePillarsOverview } from "@/components/sections/offerings/ThreePillarsOverview";

export default function OfferingsGateway() {
  return (
    <OfferingsLayout>
      {/* Hero value proposition */}
      <OfferingsHero />

      {/* Dynamic 3-offering list rows navigation triggers */}
      <ThreePillarsOverview />
    </OfferingsLayout>
  );
}
