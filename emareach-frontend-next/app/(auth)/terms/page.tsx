import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | EmaReach AI",
  description: "Terms of Service for EmaReach AI cold email and deliverability platform.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-28 pb-20">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: February 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">1. Acceptance</h2>
          <p>
            By accessing or using EmaReach AI (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">2. Use of Service</h2>
          <p>
            You agree to use the Service only for lawful purposes and in compliance with applicable laws, including anti-spam and data protection regulations. You are responsible for the content you send and for maintaining the security of your account.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">3. Account and Data</h2>
          <p>
            You must provide accurate registration information. You are responsible for safeguarding your password and for all activity under your account. We process personal data in accordance with our Privacy Policy.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">4. Subscription and Payment</h2>
          <p>
            Paid plans are billed according to the pricing selected at signup. You may cancel in accordance with our cancellation policy. Refunds are handled as described in our Refund Policy.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">5. Limitation of Liability</h2>
          <p>
            The Service is provided &quot;as is.&quot; We are not liable for indirect, incidental, or consequential damages arising from your use of the Service.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">6. Changes</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.
          </p>
        </section>
      </div>

      <p className="mt-12 pt-8 border-t border-border">
        <Link href="/" className="text-primary hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
