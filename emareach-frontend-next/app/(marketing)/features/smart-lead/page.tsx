import type { Metadata } from "next";
import { SmartLeadPage as SmartLeadContent } from "@/components/features/SmartLeadPage";

export const metadata: Metadata = {
  title: "Smart Leads | EmaReach Features",
  description:
    "ICP-driven prospect discovery: web search via your integration, AI pipeline for companies and people, validated email suggestions, run history, CSV/JSON export, and contact lists for campaigns.",
  keywords: [
    "B2B prospecting",
    "lead discovery",
    "ICP",
    "cold email lists",
    "EmaReach",
  ],
};

export default function SmartLeadFeaturePage() {
  return <SmartLeadContent />;
}
