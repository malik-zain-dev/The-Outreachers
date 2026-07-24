import type { Metadata } from "next";
import { AnalyticsReportingPage as AnalyticsReportingContent } from "@/components/features/AnalyticsReportingPage";

export const metadata: Metadata = {
  title: "Analytics & Reporting | EmaReach Features",
  description:
    "Period-over-period email analytics, daily timelines, CSV export, sending by hour and inbox, best send time by open rate, campaign and per-template stats, activity feed, message history, and dashboard roll-ups—grounded in your real sends.",
  keywords: [
    "email analytics",
    "cold email reporting",
    "open rate",
    "reply rate",
    "email deliverability metrics",
    "EmaReach",
  ],
};

export default function AnalyticsReportingPage() {
  return <AnalyticsReportingContent />;
}
