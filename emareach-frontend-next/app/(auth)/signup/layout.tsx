import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up free | EmaReach AI",
  description:
    "Create your EmaReach AI account. Start a free trial with no credit card — AI cold email, inbox warm-up, and deliverability tools included.",
  robots: { index: true, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
