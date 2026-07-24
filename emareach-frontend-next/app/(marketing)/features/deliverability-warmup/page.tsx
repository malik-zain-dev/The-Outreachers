import type { Metadata } from "next";
import { DeliverabilityWarmupPage as DeliverabilityWarmupContent } from "@/components/features/DeliverabilityWarmupPage";

export const metadata: Metadata = {
  title: "Deliverability & Warm-up | EmaReach Features",
  description:
    "Pool-based inbox warm-up with paced sends and receiver engagement (inbox, read, reply, spam rescue), warmup progress, per-inbox daily caps (max 50), optional campaign ramp-up tiers, templates with spintax and AI Write, low-engagement warnings, and domain health context.",
  keywords: [
    "email warm up",
    "inbox reputation",
    "deliverability",
    "sender reputation",
    "domain health",
    "EmaReach",
  ],
};

export default function DeliverabilityWarmupPage() {
  return <DeliverabilityWarmupContent />;
}
