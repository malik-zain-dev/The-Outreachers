import type { Metadata } from "next";
import { FreeEmailAutoresponderPage } from "@/components/features/FreeEmailAutoresponderPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LOGO_URL, OG_IMAGE } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/free-email-autoresponder`;

const PAGE_TITLE = "Free Email Autoresponder with Built-In Warm-Up | EmaReach";
const PAGE_DESCRIPTION =
  "EmaReach's free email autoresponder runs real multi-step sequences with AI-written follow-ups and built-in inbox warm-up — no credit card required.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "free email autoresponder",
    "email autoresponder",
    "free autoresponder software",
    "automated email tool",
    "free email automation",
    "email sequence tool",
    "autoresponder with warmup",
    "free email marketing automation",
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "EmaReach — Free Email Autoresponder" }],
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
  applicationSubCategory: "Email Autoresponder Software",
  operatingSystem: "Web",
  url: SITE_URL,
  description: PAGE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free plan with real multi-step autoresponder sequences. No credit card required.",
    url: `${SITE_URL}/pricing`,
  },
  featureList: [
    "Free multi-step autoresponder sequences",
    "AI-generated follow-up emails",
    "Built-in inbox warm-up on the free plan",
    "Automatic reply detection and sequence pausing",
    "Unified reply inbox",
    "Delivery and engagement analytics",
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
      name: "Is EmaReach's autoresponder really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can build and run multi-step autoresponder sequences on the free plan with no credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "Does the free plan include inbox warm-up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Warm-up is built into EmaReach from the free tier, so automated sends build sender reputation instead of risking it.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when someone replies to an automated email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The sequence pauses immediately and the reply lands in EmaReach's unified inbox, so no one who has already responded receives another automated follow-up.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI write my autoresponder emails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Describe your goal and audience, and AI drafts each step of the sequence, which you can edit before it goes live.",
      },
    },
  ],
};

export default function FreeEmailAutoresponderRoute() {
  return (
    <>
      <JsonLd data={[softwareJsonLd, webPageJsonLd, faqJsonLd]} />
      <FreeEmailAutoresponderPage />
    </>
  );
}
