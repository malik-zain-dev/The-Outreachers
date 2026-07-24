import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a demo | EmaReach – Cold Email That Lands in the Inbox",
  description: "See EmaReach in action: the cold email platform built to land emails in the inbox. 30-minute product walkthrough with our team.",
  keywords: "book demo EmaReach, product walkthrough, cold email demo",
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
