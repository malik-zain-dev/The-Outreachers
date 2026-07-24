import type { Metadata } from "next";
import { CampaignAutomationSequencesPage as CampaignAutomationSequencesContent } from "@/components/features/CampaignAutomationSequencesPage";

export const metadata: Metadata = {
  title: "Campaign Automation & Sequences | EmaReach Features",
  description:
    "Multi-step email sequences with day delays, A/B variants per step, reply-aware follow-ups, campaign and inbox daily limits, send windows, inbox rotation, workflows on email events, webhooks, compliance checks, and step analytics.",
  keywords: [
    "email sequence",
    "cold email automation",
    "A/B test email",
    "multi-step campaign",
    "send time window",
    "EmaReach",
  ],
};

export default function CampaignAutomationSequencesPage() {
  return <CampaignAutomationSequencesContent />;
}
