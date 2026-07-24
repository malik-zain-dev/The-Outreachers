import type { Metadata } from "next";
import {
  FeaturesHero,
  FeaturesGrid,
  FeatureSpotlight,
  IntegrationsSection,
  SecurityComplianceSection,
  FeaturesTestimonials,
  FeaturesFAQ,
  FeaturesCta,
} from "@/components/features";

export const metadata: Metadata = {
  title: "Features | EmaReach – Cold Email That Lands in the Inbox",
  description:
    "The cold email platform built for deliverability: AI writing, inbox warm-up, multi-account sending, and analytics — so your cold emails get opened and replied to.",
  keywords:
    "AI email generator, cold email automation, email warmup, follow-up sequences, cold email features, inbox placement",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <FeaturesHero />
      <FeaturesGrid />
      <FeatureSpotlight />
      <IntegrationsSection />
      <SecurityComplianceSection />
      <FeaturesTestimonials />
      <FeaturesFAQ />
      <FeaturesCta />
    </div>
  );
}
