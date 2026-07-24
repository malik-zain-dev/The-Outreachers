import type { Metadata } from "next";
import { EmailMarketingToolPage } from "@/components/features/EmailMarketingToolPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LOGO_URL, OG_IMAGE } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/email-marketing-tool`;

const PAGE_TITLE = "Email Marketing Tool with AI Writing & Warm-Up | EmaReach";
const PAGE_DESCRIPTION =
  "EmaReach is the email marketing tool that writes campaigns with AI, keeps your list clean, warms up your inbox automatically, and reports on real inbox placement — not just opens.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "email marketing tool",
    "email marketing software",
    "AI email marketing tool",
    "email campaign software",
    "email marketing platform",
    "business email marketing software",
    "email marketing automation",
    "email deliverability tool",
    "email list cleaner",
    "email blast software",
    "EmaReach",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "EmaReach — Email Marketing Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EmaReach",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Email Marketing Software",
  operatingSystem: "Web",
  url: SITE_URL,
  description: PAGE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free trial available. See pricing page for paid plans.",
    url: `${SITE_URL}/pricing`,
  },
  featureList: [
    "AI-generated email marketing campaigns and sequences",
    "Built-in inbox warm-up and deliverability monitoring",
    "Smart lead detection and email list cleaning",
    "Unified reply inbox across all campaigns",
    "Real-time opens, clicks, replies, and inbox placement analytics",
    "Multi-inbox rotation and domain health tracking",
  ],
  publisher: {
    "@type": "Organization",
    name: "EmaReach",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL },
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}/#webpage`,
  url: PAGE_URL,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EmaReach's email marketing tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EmaReach is an AI-powered email marketing tool that combines campaign creation, automated sequences, inbox warm-up, list hygiene, and reply management in one platform.",
      },
    },
    {
      "@type": "Question",
      name: "Does EmaReach write the emails for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Describe your offer, audience, and goal, and EmaReach's AI drafts full campaigns, subject lines, and follow-up sequences that you can edit before sending.",
      },
    },
    {
      "@type": "Question",
      name: "Can I clean my email list before sending?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Smart lead detection scans contact lists and flags risky, invalid, or role-based addresses before they enter a campaign, protecting sender reputation automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — see the pricing page for current free-tier limits on contacts, sends, and warm-up. Paid plans unlock higher volume, more inboxes, and advanced analytics.",
      },
    },
  ],
};

export default function EmailMarketingToolRoute() {
  return (
    <>
      <JsonLd data={[softwareJsonLd, webPageJsonLd, faqJsonLd]} />
      <EmailMarketingToolPage />
    </>
  );
}
