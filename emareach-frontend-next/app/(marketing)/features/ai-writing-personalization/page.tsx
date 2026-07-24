import type { Metadata } from "next";
import { AIWritingPersonalizationPage as AIWritingPersonalizationContent } from "@/components/features/AIWritingPersonalizationPage";

export const metadata: Metadata = {
  title: "AI Writing & Personalization | EmaReach Features",
  description:
    "Spintax, merge fields, AI Campaign Studio, per-contact LLM variation, warmup AI, and prompt templates—built into EmaReach for cold email that scales. See features, FAQ, and how teams personalize outbound.",
  keywords: [
    "cold email AI",
    "email spintax",
    "merge fields",
    "AI email personalization",
    "outbound AI",
    "EmaReach",
  ],
};

export default function AIWritingPersonalizationPage() {
  return <AIWritingPersonalizationContent />;
}
