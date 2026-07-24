import type { Metadata } from "next";
import { EmailListCleanerToolPage } from "@/components/features/EmailListCleanerToolPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LOGO_URL, OG_IMAGE } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/email-list-cleaner-tool`;

const PAGE_TITLE = "Email List Cleaner Tool Built Into Your Sending Platform | EmaReach";
const PAGE_DESCRIPTION =
  "EmaReach's email list cleaner tool scans contact lists on import, flags risky and invalid addresses automatically, and keeps hygiene ongoing — no separate verification tool required.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "email list cleaner",
    "email list cleaning tool",
    "email verification tool",
    "email list hygiene",
    "clean email list",
    "email address verifier",
    "remove invalid emails",
    "email validation tool",
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "EmaReach — Email List Cleaner Tool" }],
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
  applicationSubCategory: "Email List Cleaning Software",
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
    "Automatic list scanning on CSV import or CRM sync",
    "Risky, invalid, and role-based address flagging",
    "Engagement-based ongoing list hygiene",
    "Domain health monitoring tied to list quality",
    "Built-in inbox warm-up",
    "Bounce and complaint tracking per list and campaign",
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
      name: "What does EmaReach's email list cleaner actually check for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Smart lead detection flags invalid syntax, disposable and risky domains, role-based addresses, and known spam-trap patterns, scanning every list on import.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a separate list verification tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. List cleaning is built directly into EmaReach, so you don't need to export contacts to a third-party verifier and re-import them before sending.",
      },
    },
    {
      "@type": "Question",
      name: "Does list cleaning happen once or continuously?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. Lists are scanned on import, and engagement-based signals continue flagging low-quality contacts over time.",
      },
    },
    {
      "@type": "Question",
      name: "Can I review flagged contacts before removing them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Flagged contacts appear in a review queue with the reason they were flagged, so you decide whether to remove or keep each one.",
      },
    },
  ],
};

export default function EmailListCleanerToolRoute() {
  return (
    <>
      <JsonLd data={[softwareJsonLd, webPageJsonLd, faqJsonLd]} />
      <EmailListCleanerToolPage />
    </>
  );
}
