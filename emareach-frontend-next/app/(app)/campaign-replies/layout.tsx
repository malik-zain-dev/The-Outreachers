import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How we read campaign replies | EmaReach AI",
  description:
    "Transparent explanation of how EmaReach reads only campaign-related Gmail replies to notify you when contacts respond. Your personal emails are never accessed.",
  keywords:
    "campaign replies, Gmail, EmaReach AI, privacy, email notifications",
};

export default function CampaignRepliesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
