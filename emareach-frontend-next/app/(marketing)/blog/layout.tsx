import type { Metadata } from "next";

export const revalidate = 86400; // 1 day

// Title/description/canonical are set per category & page in page.tsx via
// generateMetadata so pagination and category URLs don't share identical SEO.
export const metadata: Metadata = {
  keywords:
    "cold email tips, email deliverability, cold outreach, AI sales email, follow-up sequences, inbox placement",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
