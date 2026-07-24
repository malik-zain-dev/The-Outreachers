import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Emareach – AI Email Marketing Platform",
  description:
    "Simple, transparent pricing for AI email marketing. Create campaigns, personalize at scale, automate follow-ups, and track conversions — start free, no credit card required.",
  keywords: "AI email marketing pricing, email campaign tool cost, Emareach plans, email automation",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
