import type { Metadata } from "next";
import { ColdEmailWarmupToolPage } from "@/components/features/ColdEmailWarmupToolPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LOGO_URL, OG_IMAGE } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/cold-email-warmup-tool`;

const PAGE_TITLE = "Cold Email Tool with Built-In Warm-Up | EmaReach";
const PAGE_DESCRIPTION =
  "EmaReach is the cold email tool with built-in warm-up — automate outreach sequences, warm up inboxes automatically, and personalize emails with AI. One platform. No extra subscriptions.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "cold email tool",
    "cold email software",
    "cold email tool with warmup",
    "cold email warmup tool",
    "email warmup tool",
    "built-in email warmup",
    "cold email platform",
    "cold email outreach tool",
    "best cold email software",
    "cold email automation",
    "AI cold email tool",
    "email deliverability tool",
    "B2B cold email software",
    "cold outreach tool",
    "inbox warmup software",
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "EmaReach — Cold Email Tool with Built-In Warm-Up" }],
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
  applicationSubCategory: "Cold Email Software",
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
    "Built-in email warm-up with real inbox network",
    "Multi-step cold email campaign sequences",
    "AI-powered email writing and personalization",
    "Multi-inbox rotation and domain health monitoring",
    "Unified reply inbox",
    "Smart lead detection and risky email removal",
    "Deliverability analytics and placement tracking",
    "Campaign ramp-up tiers",
  ],
  publisher: {
    "@type": "Organization",
    name: "EmaReach",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
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
      name: "What makes EmaReach different from other cold email tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most cold email platforms require a separate warmup tool — two subscriptions, two dashboards. EmaReach builds warmup directly into the cold email platform. Your inbox reputation builds continuously as campaigns run, without any manual configuration or extra cost.",
      },
    },
    {
      "@type": "Question",
      name: "Does EmaReach have built-in email warm-up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EmaReach includes a built-in email warm-up feature that uses a real inbox network to generate genuine opens, replies, and threads. Warm-up runs in the background while campaigns are active, so your domain reputation grows as your outreach scales.",
      },
    },
    {
      "@type": "Question",
      name: "Is EmaReach a cold email tool or a warmup tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. EmaReach is a full cold email platform with warm-up built in as a first-class feature — not an add-on. You get campaign sequences, AI writing, reply management, analytics, and domain warmup under one subscription.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use EmaReach for cold outreach with a brand new domain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. For new domains, we recommend enabling warm-up first and letting it run for 2–4 weeks before scaling campaign volume. EmaReach's ramp-up tiers let you start campaigns early with a conservative daily cap that increases as warm-up progresses.",
      },
    },
    {
      "@type": "Question",
      name: "What cold email features does EmaReach include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EmaReach includes multi-step campaign sequences, AI-powered email writing and personalization, A/B subject line testing, multi-inbox rotation, unified reply inbox, smart lead detection, deliverability analytics, domain health monitoring, and built-in email warm-up — all in one platform.",
      },
    },
    {
      "@type": "Question",
      name: "How does EmaReach compare to Instantly or Smartlead for cold email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike Instantly and Smartlead, EmaReach includes built-in warm-up using a real inbox network rather than an artificial closed-loop pool. This means your warm-up signals are genuine and not flagged by email providers. EmaReach also includes AI writing natively — no add-on required.",
      },
    },
    {
      "@type": "Question",
      name: "What inboxes does EmaReach support for cold email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EmaReach supports Gmail (personal and Google Workspace) and any SMTP-compatible inbox. You can connect multiple inboxes and rotate sending across them to distribute volume and protect per-inbox domain health.",
      },
    },
    {
      "@type": "Question",
      name: "Does EmaReach help with cold email deliverability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EmaReach includes domain health monitoring, smart lead detection to remove risky email addresses before they enter campaigns, campaign-level inbox placement tracking, per-inbox warm-up progress, and deliverability warnings — giving you full visibility into deliverability before problems compound.",
      },
    },
  ],
};

export default function ColdEmailWarmupToolRoute() {
  return (
    <>
      <JsonLd data={[softwareJsonLd, webPageJsonLd, faqJsonLd]} />
      <ColdEmailWarmupToolPage />
    </>
  );
}
