import type { Metadata } from "next";
import Link from "next/link";
import {
  GitFork,
  Server,
  ShieldCheck,
  GaugeCircle,
  Boxes,
  Lock,
  Check,
  X,
  ArrowRight,
  Star,
  Terminal,
  Scale,
  Globe,
  Radar,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, LOGO_URL, OG_IMAGE } from "@/lib/seo";
import { GITHUB_URL } from "@/components/layout/Header";

const PAGE_URL = `${SITE_URL}/open-source-email-marketing-tool`;

const PAGE_TITLE = "Production-Level Open-Source Email Marketing Tool | EmaReach";
const PAGE_DESCRIPTION =
  "EmaReach is a production-level, open-source email marketing tool you can self-host — AI writing, sequences, warm-up, deliverability, enrichment, and analytics. Every feature the paid platforms charge for, MIT licensed, no per-seat pricing, no sending limits.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "production level email marketing tool open source",
    "production ready open source email marketing tool",
    "open source email marketing tool",
    "open source email marketing software",
    "self-hosted email marketing tool",
    "open source cold email tool",
    "open source email outreach platform",
    "MIT licensed email marketing",
    "self-hostable email platform",
    "open source Instantly alternative",
    "EmaReach",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "EmaReach — Production-Level Open-Source Email Marketing Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// ─── Content ──────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: GaugeCircle,
    title: "Deliverability at scale",
    desc: "Inbox rotation, warm-up, SPF/DKIM/DMARC, and reputation monitoring built for real send volume — not a demo.",
  },
  {
    icon: Server,
    title: "Self-hostable infrastructure",
    desc: "Run it on your own servers and domains. Own your data, your sending, and your reputation end to end.",
  },
  {
    icon: ShieldCheck,
    title: "Security & compliance",
    desc: "Opt-outs, consent tracking, and data control you can audit in the code — because the code is open.",
  },
  {
    icon: Boxes,
    title: "Full feature parity",
    desc: "AI writing, multi-step sequences, enrichment, verification, unified inbox, and analytics — all included.",
  },
  {
    icon: Scale,
    title: "No per-seat, no send caps",
    desc: "MIT licensed. Add your whole team and scale sends without a metered bill punishing your growth.",
  },
  {
    icon: Radar,
    title: "The 'aware' layer",
    desc: "A social-first step that earns recognition before touchpoint two — the lever behind inbox placement and replies.",
  },
];

const PARITY = [
  "AI writing & per-contact personalization",
  "Multi-step automated sequences",
  "Warm-up & inbox rotation",
  "SPF / DKIM / DMARC setup",
  "Unified inbox & reply management",
  "Lead discovery & enrichment",
  "Email verification & list hygiene",
  "Risky-contact blocking",
  "Opens, clicks, replies & placement analytics",
  "Security, opt-outs & compliance",
];

const COMPARISON: Array<{ label: string; oss: boolean; saas: string }> = [
  { label: "Read & audit the source", oss: true, saas: "Closed, opaque" },
  { label: "Self-host on your infra", oss: true, saas: "Vendor cloud only" },
  { label: "Own your data & sending", oss: true, saas: "Locked to platform" },
  { label: "Per-seat / per-send pricing", oss: false, saas: "Metered, climbs fast" },
  { label: "Extend & customize freely", oss: true, saas: "Wait for the roadmap" },
  { label: "No vendor lock-in", oss: true, saas: "Migration is painful" },
];

const STEPS = [
  { n: "01", title: "Clone the repo", desc: "Pull EmaReach from GitHub — MIT licensed, no strings, no trial wall." },
  { n: "02", title: "Deploy your way", desc: "Self-host on your own servers and domains, or use the managed hosted version." },
  { n: "03", title: "Connect & send", desc: "Wire your inboxes, warm up, and run production campaigns with full deliverability tooling." },
];

const FAQS = [
  {
    q: "Is EmaReach a production-level open-source email marketing tool?",
    a: "Yes. EmaReach is a production-ready, open-source (MIT licensed) email marketing and outbound platform. It ships the deliverability, warm-up, sequencing, enrichment, and analytics you need to run real campaigns at scale — not a stripped-down demo — and you can self-host it on your own infrastructure.",
  },
  {
    q: "Can I self-host the email marketing tool?",
    a: "Yes. You can clone the repository and deploy EmaReach on your own servers and domains, so you own your data, sending, and reputation end to end. A managed hosted version is also available if you'd rather not run the infrastructure yourself.",
  },
  {
    q: "How does an open-source email marketing tool compare to closed SaaS platforms?",
    a: "EmaReach offers full feature parity with the paid platforms — AI writing, sequences, warm-up, deliverability, enrichment, verification, and analytics — plus a social-first 'aware' layer none of them ship. Because it's open source, there's no per-seat or per-send pricing, no vendor lock-in, and you can read, audit, and extend the code.",
  },
  {
    q: "What license is EmaReach released under?",
    a: "EmaReach is MIT licensed, so you're free to use, modify, self-host, and extend it — including for commercial use.",
  },
  {
    q: "Is there a hosted version if I don't want to self-host?",
    a: "Yes. If you'd prefer not to manage infrastructure, you can use the hosted version and still get the full production-level feature set. Book a quick call to get set up.",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EmaReach — Open-Source Email Marketing Tool",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Open-Source Email Marketing Software",
  operatingSystem: "Web, Self-hosted",
  url: PAGE_URL,
  description: PAGE_DESCRIPTION,
  license: "https://opensource.org/licenses/MIT",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free and open source (MIT). Self-host at no cost, or use the hosted version.",
    url: `${SITE_URL}/pricing`,
  },
  featureList: PARITY,
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
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OpenSourceEmailMarketingToolPage() {
  return (
    <>
      <JsonLd data={[softwareJsonLd, webPageJsonLd, faqJsonLd]} />

      <div className="min-h-screen overflow-x-hidden">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60 bg-background">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.55]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.05) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[460px] rounded-full pointer-events-none opacity-15 dark:opacity-25 blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(16,185,129,0.55) 0%, transparent 70%)" }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 pt-16 pb-14 lg:pt-24 lg:pb-20 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-muted/50 text-foreground/80 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] mb-8">
              <GitFork className="w-3.5 h-3.5" />
              MIT licensed · Self-hostable · Production-ready
            </div>
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.6rem] font-black tracking-[-0.03em] leading-[1.02] text-foreground">
              The production-level{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                open-source email marketing tool
              </span>
            </h1>
            <p className="mt-7 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              EmaReach is a production-ready, open-source email marketing platform you can self-host. Every feature the
              paid tools charge for — AI writing, sequences, warm-up, deliverability, enrichment, and analytics — with no
              per-seat pricing, no sending limits, and no vendor lock-in.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto">
                <button className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[0.95rem] text-background bg-foreground hover:bg-foreground/90 transition-all duration-200 hover:-translate-y-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  Star on GitHub
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/signup" className="group w-full sm:w-auto">
                <button className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[0.95rem] text-foreground bg-background border-2 border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-200">
                  <Terminal className="w-4 h-4" />
                  Use the hosted version
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* What production-level means */}
        <section className="py-16 lg:py-24 relative overflow-hidden marketing-band">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-[0.12em]">
                What &ldquo;production-level&rdquo; means
              </span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05] text-foreground">
                Open source that&rsquo;s built to actually ship email.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                A lot of &ldquo;open-source email&rdquo; projects are toys. EmaReach is a production-grade tool: the
                deliverability, security, and scale you need to run real campaigns — with the source in the open.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-[15px] font-black text-foreground mb-1.5 leading-snug">{p.title}</h3>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature parity */}
        <section className="py-16 lg:py-24 relative overflow-hidden bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-foreground/80 text-[11px] font-black uppercase tracking-[0.12em]">
                Full feature parity
              </span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05] text-foreground">
                Everything the paid platforms charge for.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                This open-source email marketing tool isn&rsquo;t a lite version. It ships the complete outbound stack —
                and adds the social-first &ldquo;aware&rdquo; layer none of the closed platforms have.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {PARITY.map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-[14px] font-semibold text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open source vs closed SaaS */}
        <section className="py-16 lg:py-24 relative overflow-hidden marketing-band">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-foreground/80 text-[11px] font-black uppercase tracking-[0.12em]">
                Open source vs closed SaaS
              </span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05] text-foreground">
                Own it. Don&rsquo;t rent it.
              </h2>
            </div>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto] bg-muted/50 border-b border-border text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                <div className="py-3 px-4">Capability</div>
                <div className="py-3 px-4 text-center w-28 sm:w-36 text-emerald-600 dark:text-emerald-400">EmaReach (OSS)</div>
                <div className="py-3 px-4 text-center w-28 sm:w-36">Closed SaaS</div>
              </div>
              {COMPARISON.map((row) => (
                <div key={row.label} className="grid grid-cols-[1fr_auto_auto] border-b border-border/60 last:border-b-0 items-center">
                  <div className="py-3.5 px-4 text-[13.5px] font-semibold text-foreground">{row.label}</div>
                  <div className="py-3.5 px-4 w-28 sm:w-36 flex justify-center">
                    {row.oss ? (
                      <Check className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[12px] font-bold text-emerald-600 dark:text-emerald-400">
                        <Check className="w-4 h-4" /> None
                      </span>
                    )}
                  </div>
                  <div className="py-3.5 px-4 w-28 sm:w-36 flex justify-center text-center">
                    <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                      <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <span className="hidden sm:inline">{row.saas}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deploy in 3 steps */}
        <section className="py-16 lg:py-24 relative overflow-hidden bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-foreground/80 text-[11px] font-black uppercase tracking-[0.12em]">
                <Globe className="w-3.5 h-3.5" />
                Get to production
              </span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05] text-foreground">
                Self-host in three steps.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {STEPS.map((s) => (
                <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7">
                  <span className="text-4xl font-black text-foreground/10">{s.n}</span>
                  <h3 className="mt-3 text-lg font-black text-foreground mb-2 leading-snug">{s.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 relative overflow-hidden marketing-band">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 text-foreground/80 text-[11px] font-black uppercase tracking-[0.12em]">
                FAQ
              </span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.05] text-foreground">
                Production-level, open-source, answered.
              </h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 open:border-emerald-500/30">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-[15px] font-bold text-foreground pr-4">{f.q}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--background) / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background) / 1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10 py-20 lg:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-background/20 bg-background/10 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] mb-6">
              <Lock className="w-3.5 h-3.5" />
              MIT · Self-hostable · No limits
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.02]">
              The open-source email marketing tool that ships to production.
            </h2>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto">
                <button className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[0.95rem] bg-background text-foreground hover:bg-background/90 transition-all duration-200 hover:-translate-y-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  Star on GitHub
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/signup" className="w-full sm:w-auto">
                <button className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-[0.95rem] bg-transparent text-background border-2 border-background/30 hover:border-background/60 hover:bg-background/5 transition-all duration-200">
                  Get set up on a call
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
