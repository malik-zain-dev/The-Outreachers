import type { Metadata } from "next";
import { EmailBlastSoftwarePage } from "@/components/features/EmailBlastSoftwarePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LOGO_URL, OG_IMAGE } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/email-blast-software`;

const PAGE_TITLE = "Email Blast Software with Deliverability Protection | EmaReach";
const PAGE_DESCRIPTION =
  "EmaReach is email blast software that segments your list, writes copy with AI, and rotates sends across warmed-up inboxes so bulk email actually reaches the inbox.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "email blast software",
    "bulk email software",
    "mass email software",
    "email blast tool",
    "bulk email sender",
    "email broadcast software",
    "mass email marketing",
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "EmaReach — Email Blast Software" }],
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
  applicationSubCategory: "Email Blast Software",
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
    "One-click bulk email sending with scheduling",
    "Multi-inbox rotation to distribute blast volume",
    "List segmentation by engagement, tags, and custom fields",
    "AI-generated blast copy and subject line variants",
    "Built-in inbox warm-up on every sending identity",
    "Real-time opens, clicks, replies, and bounce tracking",
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
      name: "What is email blast software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Email blast software lets you send a single email to a large list of contacts at once. EmaReach adds deliverability protection and segmentation on top of basic bulk sending.",
      },
    },
    {
      "@type": "Question",
      name: "Will a large blast hurt my domain reputation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with EmaReach. Blast volume rotates across warmed-up inboxes with paced sending, so no single domain absorbs the full risk of a large send.",
      },
    },
    {
      "@type": "Question",
      name: "Can I segment my list before blasting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Filter contacts by engagement history, tags, or custom fields so your blast reaches the right audience.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI write my email blast for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Describe the offer or announcement and AI drafts subject lines and full email copy, with A/B variants ready to test.",
      },
    },
  ],
};

export default function EmailBlastSoftwareRoute() {
  return (
    <>
      <JsonLd data={[softwareJsonLd, webPageJsonLd, faqJsonLd]} />
      <EmailBlastSoftwarePage />
    </>
  );
}
