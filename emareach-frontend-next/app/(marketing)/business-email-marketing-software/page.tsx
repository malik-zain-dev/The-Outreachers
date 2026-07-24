import type { Metadata } from "next";
import { BusinessEmailMarketingSoftwarePage } from "@/components/features/BusinessEmailMarketingSoftwarePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LOGO_URL, OG_IMAGE } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/business-email-marketing-software`;

const PAGE_TITLE = "Business Email Marketing Software for Teams | EmaReach";
const PAGE_DESCRIPTION =
  "EmaReach is business email marketing software with multi-seat workspaces, role-based access, business-wide deliverability, and unified reporting across every team and domain.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "business email marketing software",
    "email marketing software for business",
    "team email marketing platform",
    "enterprise email marketing software",
    "business email automation",
    "multi-user email marketing tool",
    "company email marketing software",
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "EmaReach — Business Email Marketing Software" }],
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
  applicationSubCategory: "Business Email Marketing Software",
  operatingSystem: "Web",
  url: SITE_URL,
  description: PAGE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free trial available. See pricing page for business and team plans.",
    url: `${SITE_URL}/pricing`,
  },
  featureList: [
    "Multi-seat team workspaces with role-based access",
    "Business-wide domain health monitoring and warm-up",
    "Centralized campaign automation across teams",
    "Enterprise-grade list hygiene and smart lead detection",
    "Unified reply inbox across the organization",
    "Business-wide analytics and reporting",
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
      name: "What makes EmaReach a business email marketing software, not just a personal tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EmaReach includes multi-seat workspaces, role-based permissions, business-wide domain health monitoring, and consolidated reporting across teams.",
      },
    },
    {
      "@type": "Question",
      name: "Can multiple team members send from EmaReach at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Each team member can connect their own inbox and run campaigns with scoped access, while admins retain full visibility across the business account.",
      },
    },
    {
      "@type": "Question",
      name: "Does EmaReach support role-based permissions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Admins can scope which team members can view contacts, edit campaigns, or access specific sending inboxes.",
      },
    },
    {
      "@type": "Question",
      name: "Is EmaReach suitable for agencies managing multiple client accounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Agencies can isolate each client's sending identities and contact lists under one business account, with reporting segmented by client.",
      },
    },
  ],
};

export default function BusinessEmailMarketingSoftwareRoute() {
  return (
    <>
      <JsonLd data={[softwareJsonLd, webPageJsonLd, faqJsonLd]} />
      <BusinessEmailMarketingSoftwarePage />
    </>
  );
}
