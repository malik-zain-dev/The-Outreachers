import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | EmaReach AI",
  description: "Refund and cancellation policy for EmaReach AI subscriptions.",
};

export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-28 pb-20">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: February 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">Cancellation</h2>
          <p>
            You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. You will retain access until the end of that period.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">Refunds</h2>
          <p>
            We offer refunds for the first payment within 14 days of the initial purchase if you are not satisfied with the Service. To request a refund, contact us with your account email and reason. Refunds are processed within 5–10 business days to the original payment method.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">No Refund After 14 Days</h2>
          <p>
            After 14 days from the first payment, or for renewal payments, we generally do not offer refunds. Exceptions may be considered on a case-by-case basis for technical issues we could not resolve.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">Contact</h2>
          <p>
            For refund requests or questions, contact us via the <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
          </p>
        </section>
      </div>

      <p className="mt-12 pt-8 border-t border-border">
        <Link href="/" className="text-primary hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
