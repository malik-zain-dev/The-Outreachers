import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | EmaReach AI",
  description: "Sign in to your EmaReach AI account to manage campaigns, contacts, and cold email outreach.",
  robots: { index: true, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
