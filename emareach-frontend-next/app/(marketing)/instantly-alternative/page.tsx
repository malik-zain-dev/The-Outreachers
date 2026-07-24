import type { Metadata } from "next";
import { InstantlyAlternativePage } from "@/components/features/InstantlyAlternativePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LOGO_URL, OG_IMAGE } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/instantly-alternative`;

const PAGE_TITLE = "Best Instantly Alternative | EmaReach";
const PAGE_DESCRIPTION =
  "Looking for the best Instantly alternative? EmaReach replaces Instantly with real inbox warm-up (no shared pool), unified reply inbox, native AI writing, and one plan that covers everything. Switch in under 48 hours.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Instantly alternative",
    "Instantly.ai alternative",
    "best Instantly alternative",
    "switch from Instantly",
    "Instantly competitor",
    "Instantly replacement",
    "cold email tool alternative to Instantly",
    "EmaReach vs Instantly",
    "Instantly cold email alternative",
    "alternatives to Instantly",
    "better than Instantly",
    "Instantly pricing alternative",
    "cold email software",
    "email warmup tool",
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "EmaReach — Best Instantly Alternative" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
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

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EmaReach",
  alternateName: ["EmaReach AI", "EmaReach cold email"],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Cold Email Software",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "EmaReach is a cold email platform with built-in real inbox warm-up, AI personalization, unified reply inbox, and full campaign automation — the leading Instantly alternative.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free trial available. See pricing page for paid plans.",
    url: `${SITE_URL}/pricing`,
  },
  featureList: [
    "Real inbox warm-up network (no shared pool)",
    "Multi-step cold email campaign sequences",
    "Native AI email writing and personalization",
    "Unified reply inbox across all mailboxes",
    "Smart lead detection and risky email filtering",
    "Domain health monitoring and ramp-up controls",
    "Multi-inbox rotation",
    "Deliverability analytics per campaign and inbox",
  ],
  publisher: {
    "@type": "Organization",
    name: "EmaReach",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why are people looking for an Instantly alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common reasons: Instantly's warmup network is a closed pool of 200,000+ shared inboxes — a pattern Gmail and Outlook have already fingerprinted. Teams also cite reply management gaps (replies land in Gmail, not the platform), AI writing that feels bolted on, and pricing that compounds as you scale inboxes and seats.",
      },
    },
    {
      "@type": "Question",
      name: "Is EmaReach a direct Instantly alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. EmaReach covers everything Instantly does — multi-step campaign sequences, multi-inbox rotation, A/B testing, and analytics — plus adds built-in real-network warm-up, a unified reply inbox, native AI writing from prospect data, and smart lead detection. It's a complete replacement, not a partial one.",
      },
    },
    {
      "@type": "Question",
      name: "How is EmaReach's warmup different from Instantly's warmup pool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instantly uses a closed-loop pool: automated scripts email between strangers' inboxes on the same platform. EmaReach's warm-up uses a real inbox network — genuine opens, replies, and natural threads from real people. This creates engagement signals that ESP algorithms interpret as authentic, not automated pool behavior that has already been fingerprinted.",
      },
    },
    {
      "@type": "Question",
      name: "Will switching from Instantly to EmaReach hurt my deliverability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your domain reputation is tied to your domain, not to Instantly. Moving your inboxes to EmaReach doesn't reset any reputation — it starts building it cleanly from day one, away from Instantly's shared pool risk. If your domain has already experienced pool contamination, EmaReach's warm-up helps rehabilitate it.",
      },
    },
    {
      "@type": "Question",
      name: "How long does migration from Instantly take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most teams complete the migration in under 48 hours. Export your lists from Instantly (CSV), connect inboxes to EmaReach, import contacts, and rebuild sequences in the campaign editor — EmaReach's AI writing assistant speeds up that last step significantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is EmaReach cheaper than Instantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EmaReach includes warm-up, campaigns, AI writing, and reply inbox under one plan. Instantly typically requires add-ons or separate tools for full feature parity. Teams that switch usually reduce their total outbound stack cost by 30–60%.",
      },
    },
    {
      "@type": "Question",
      name: "Does EmaReach support the same inboxes as Instantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EmaReach supports Gmail, Google Workspace, and all SMTP-compatible inboxes — the same inbox types Instantly supports. Multi-inbox rotation and per-inbox daily caps work the same way.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to Instantly warmup if I cancel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instantly's warmup stops immediately when you cancel — any reputation built inside their network evaporates because it belongs to their platform, not your domain. With EmaReach, warm-up builds genuine domain reputation that stays with your domain permanently, independent of your subscription.",
      },
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Instantly Alternatives",
  description: "Top alternatives to Instantly.ai for cold email outreach with built-in warm-up",
  numberOfItems: 1,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "EmaReach",
      description:
        "The #1 Instantly alternative — real inbox warm-up, unified reply inbox, native AI writing, and full campaign sequences in one platform.",
      url: SITE_URL,
    },
  ],
};

export default function InstantlyAlternativeRoute() {
  return (
    <>
      <JsonLd data={[webPageJsonLd, softwareJsonLd, faqJsonLd, itemListJsonLd]} />
      <InstantlyAlternativePage />
    </>
  );
}
