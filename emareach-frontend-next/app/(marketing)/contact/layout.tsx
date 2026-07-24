import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | EmaReach – Cold Email That Lands in the Inbox",
  description: "Get in touch — support, partnerships, or questions about EmaReach. We reply within 1–2 business days.",
  keywords: "contact EmaReach, support, cold email",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
