import type { Metadata } from "next";
import { UnifiedInboxRepliesPage as UnifiedInboxRepliesContent } from "@/components/features/UnifiedInboxRepliesPage";

export const metadata: Metadata = {
  title: "Unified Inbox & Replies | EmaReach Features",
  description:
    "Unified campaign and mailbox conversations in one reply workspace with threaded context, filters, unread counts, tags, stars, AI Reply, AI Write, compose mail, and fast triage actions.",
  keywords: [
    "unified inbox",
    "sales inbox",
    "reply management",
    "inbox collaboration",
    "ai reply",
    "EmaReach",
  ],
};

export default function UnifiedInboxRepliesPage() {
  return <UnifiedInboxRepliesContent />;
}
