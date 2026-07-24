import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | EmaReach AI",
  description: "Privacy Policy for EmaReach AI. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-28 pb-20">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: February 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">1. Information We Collect</h2>
          <p>
            We collect information you provide when registering (email, name, company), usage data related to campaigns and deliverability, and technical data such as IP address and browser type when you use our platform.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">2. How We Use It</h2>
          <p>
            We use your information to provide and improve the Service, to communicate with you, to enforce our Terms, and to comply with legal obligations. We do not sell your personal data to third parties.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your data, including encryption and access controls.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">4. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, delete, or port your data, and to object to or restrict certain processing. Contact us to exercise these rights.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-2">5. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies for authentication, preferences, and analytics. You can manage cookie settings in your browser.
          </p>
        </section>
      </div>

      <p className="mt-12 pt-8 border-t border-border">
        <Link href="/" className="text-primary hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
