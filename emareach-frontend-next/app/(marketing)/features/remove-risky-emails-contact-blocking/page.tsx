import type { Metadata } from "next";
import { RemoveRiskyEmailsContactBlockingPage as RemoveRiskyEmailsContactBlockingContent } from "@/components/features/RemoveRiskyEmailsContactBlockingPage";

export const metadata: Metadata = {
  title: "Remove Risky Emails & Contact Blocking | EmaReach Features",
  description:
    "Background risky-email cleanup with syntax, mail-server, and spam-reputation checks, plus automatic contact blocking and campaign eligibility filtering.",
  keywords: [
    "remove risky emails",
    "contact blocking",
    "email list hygiene",
    "cold email deliverability",
    "EmaReach",
  ],
};

export default function RemoveRiskyEmailsContactBlockingFeaturePage() {
  return <RemoveRiskyEmailsContactBlockingContent />;
}
