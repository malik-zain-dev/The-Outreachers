import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Flame,
  FlaskConical,
  Gauge,
  Mail,
  MessageSquare,
  Network,
  ShieldCheck,
  Target,
  TrendingUp,
  TriangleAlert,
  Users,
  Wrench,
  ChevronRight,
  Star,
  Inbox,
  BarChart2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfrastructureCalculator } from "./infrastructure-calculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/cold-email-deliverability`;

export const metadata: Metadata = {
  title: "Cold Email Deliverability Guide: Infrastructure, Warmup & Inbox Placement | EmaReach",
  description:
    "Learn how EmaReach achieves consistent cold email inbox placement. Infrastructure setup, domain warmup timelines, list hygiene, content best practices, and engagement signals — the complete deliverability playbook.",
  keywords: [
    "cold email deliverability",
    "cold email inbox placement",
    "email warmup",
    "cold email infrastructure",
    "email deliverability guide",
    "SPF DKIM DMARC setup",
    "cold outreach best practices",
    "domain warmup strategy",
    "cold email list hygiene",
    "email reputation management",
    "B2B cold email system",
    "sending domain setup",
    "EmaReach deliverability",
    "cold email spam avoid",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Cold Email Deliverability Guide: Infrastructure, Warmup & Inbox Placement | EmaReach",
    description:
      "The complete cold email deliverability playbook: domain infrastructure, warmup timelines, list hygiene, content rules, and engagement signals — exactly how EmaReach does it.",
    url: PAGE_URL,
    type: "article",
    siteName: "EmaReach",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Email Deliverability Guide | EmaReach",
    description:
      "Infrastructure-first cold email deliverability: domain warmup, SPF/DKIM/DMARC setup, list hygiene, and engagement signals. The EmaReach playbook.",
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Achieve Cold Email Deliverability at Scale",
  description:
    "A step-by-step playbook covering cold email infrastructure setup, domain warmup, list hygiene, content best practices, and deliverability testing.",
  url: PAGE_URL,
  author: { "@type": "Organization", name: "EmaReach", url: SITE_URL },
  publisher: { "@type": "Organization", name: "EmaReach", url: SITE_URL },
  step: [
    { "@type": "HowToStep", name: "Set up sending infrastructure", text: "Configure root domains, subdomains, and inboxes at safe scale ratios." },
    { "@type": "HowToStep", name: "Authenticate with SPF, DKIM, DMARC", text: "Set up email authentication records before sending a single email." },
    { "@type": "HowToStep", name: "Warm up each inbox gradually", text: "Ramp from 5-10 emails/day over 7+ days before full volume." },
    { "@type": "HowToStep", name: "Verify and clean your list", text: "Remove bounces, verify emails, and segment by engagement." },
    { "@type": "HowToStep", name: "Write plain-text, human-like emails", text: "Short messages with a single CTA outperform HTML blasts every time." },
    { "@type": "HowToStep", name: "Track engagement signals", text: "Replies, thread continuations, and stars are the strongest inbox signals." },
    { "@type": "HowToStep", name: "Test before every launch", text: "Verify SPF/DKIM/DMARC pass and run inbox placement checks before each sequence." },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does cold email warmup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A safe warmup takes 21-28 days, starting at 5-10 emails/day and gradually increasing. Rushing warmup is the #1 cause of domain burns.",
      },
    },
    {
      "@type": "Question",
      name: "How many inboxes do I need for cold email at scale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EmaReach recommends 2-3 inboxes per sending domain, 5-6 sending domains per root domain, and a daily cap of 40 emails per inbox. Use the infrastructure calculator to size your setup.",
      },
    },
    {
      "@type": "Question",
      name: "What causes cold emails to land in spam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Main causes: missing SPF/DKIM/DMARC authentication, high bounce rates from unverified lists, sending too many emails too quickly, spam trigger words in content, and low engagement signals on new domains.",
      },
    },
    {
      "@type": "Question",
      name: "What is the safest daily email limit per inbox?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "35-40 emails per inbox per day is the safe cap after warmup. Exceeding this creates sudden volume spikes that trigger spam filters.",
      },
    },
  ],
};

const STATS = [
  { value: "35–40", label: "Safe emails/inbox/day", icon: Mail },
  { value: "7+ days", label: "Recommended warmup", icon: TrendingUp },
  { value: "<2%", label: "Target bounce rate", icon: BarChart2 },
  { value: "SPF+DKIM+DMARC", label: "Auth required before day 1", icon: Lock },
];

const behaviorRules = [
  "We spread sends across 8-10 hours",
  "We randomize delays between each email",
  "We mimic realistic human sending behavior",
  "We avoid sudden volume spikes per inbox",
];

const technicalStack = [
  { title: "SPF", body: "We configure SPF so mailbox providers can verify sending authorization." },
  { title: "DKIM", body: "We sign outbound mail with DKIM to improve trust and alignment." },
  { title: "DMARC", body: "We enforce DMARC policy so your domain has a clear trust model." },
  { title: "Custom tracking domain", body: "We route tracking through branded domains to avoid spammy link patterns." },
  { title: "Separate tracking domain", body: "We isolate tracking reputation from core sending reputation." },
];

const warmupSignals = [
  "Replies (not just sends)",
  "Marking messages as important",
  "Manual spam rescue signals where needed",
  "Natural back-and-forth conversation behavior",
];

const failureOutcomes = [
  "Open rates can collapse to around 2%",
  "Messages start landing in spam or promotions",
  "Domains burn quickly and lose trust",
  "More domains cannot fix weak reputation systems",
];

const listQualityChecks = [
  "Remove hard bounces before every campaign send",
  "Verify emails with ZeroBounce or similar before import",
  "Never send to scraped or unverified cold lists",
  "Re-verify stale lists older than 6 months",
  "Keep bounce rate under 2% to protect domain reputation",
  "Segment by engagement — suppress contacts with zero opens after 3 touches",
];

const listQualityRisks = [
  { label: "Bounce rate > 5%", outcome: "Immediate domain trust hit — providers flag the sending pattern" },
  { label: "Spam trap hits", outcome: "Can trigger blacklisting across major email filters" },
  { label: "Low open rate on bad lists", outcome: "Poisons your overall domain engagement score" },
];

const contentStyleRules = [
  { title: "Plain text first", body: "Emails that look like they came from a real person outperform HTML newsletters for cold outreach every time." },
  { title: "3–5 lines per message", body: "Short, confident messages signal intent. Long walls of text read like marketing blasts and trigger spam filters." },
  { title: "One clear ask per email", body: "A single low-friction call-to-action drives more replies than listing multiple options or CTAs." },
  { title: "Avoid spam trigger words", body: "Terms like 'free', 'guarantee', 'act now', or excessive punctuation pattern-match to bulk spam and hurt placement." },
  { title: "Personalization that lands", body: "First name, company, and a single relevant context signal (industry, role, recent news) makes each email feel 1:1." },
];

const engagementSignals = [
  { signal: "Direct reply received", impact: "High", why: "The strongest positive spam signal — a reply tells every provider the email was welcomed." },
  { signal: "Thread continuation", impact: "High", why: "Multi-turn conversations build domain trust over time and compound inbox placement." },
  { signal: "Marked as important / starred", impact: "Medium", why: "Indicates positive intent from the recipient — boosts sender reputation with Gmail especially." },
  { signal: "Link click", impact: "Low–Medium", why: "Relevant but weaker than a reply. Don't optimize for clicks over replies — it trains the wrong behavior." },
  { signal: "Unsubscribe", impact: "Negative", why: "High unsubscribe signals list-fit problems. Keep it under 0.5% to avoid algorithmic penalties." },
];

const testingChecklist = [
  { step: "Verify SPF, DKIM, and DMARC all pass before first send", tag: "Required" },
  { step: "Run a spam score check on your email content and HTML", tag: "Required" },
  { step: "Test inbox placement across Gmail, Outlook, and corporate filters", tag: "Required" },
  { step: "Send to a seed list covering major email providers", tag: "Recommended" },
  { step: "Monitor open rates in the first 48 hours as an early placement indicator", tag: "Recommended" },
  { step: "Run a re-test after any major sequence or content change", tag: "Recommended" },
];

const startSafe = [
  "Start with 5-10 domains",
  "Use 2-3 inboxes per domain",
  "Warm up for 2-3 weeks before scale",
  "Begin at 20-30 emails per inbox/day",
  "Increase volume only when placement is stable",
];

const faqs = [
  {
    q: "How long does cold email warmup take?",
    a: "A safe warmup takes 21-28 days, starting at 5-10 emails/day and gradually increasing. Rushing warmup is the #1 cause of domain burns.",
  },
  {
    q: "How many inboxes do I need at scale?",
    a: "EmaReach recommends 2-3 inboxes per sending domain, 5-6 sending domains per root, and a daily cap of 40 emails per inbox. Use the infrastructure calculator above to size your exact setup.",
  },
  {
    q: "What causes cold emails to land in spam?",
    a: "Main causes: missing SPF/DKIM/DMARC, high bounce rates from unverified lists, sending too fast on new domains, spam-trigger words in content, and low engagement signals.",
  },
  {
    q: "What is the safest daily email limit per inbox?",
    a: "35-40 emails per inbox per day is the safe cap after a full warmup. Exceeding this creates sudden volume spikes that trigger spam filters across all major providers.",
  },
  {
    q: "Can EmaReach handle our entire cold email infrastructure?",
    a: "Yes. EmaReach sets up, manages, and monitors your full sending infrastructure — domains, inboxes, warmup, authentication, and deliverability testing — so your team can focus on pipeline, not plumbing.",
  },
];

const TOC = [
  { href: "#mindset", label: "The Mindset" },
  { href: "#infrastructure", label: "Infrastructure Calculator" },
  { href: "#sending-rules", label: "Sending Rules & Tech" },
  { href: "#warmup", label: "Warmup Process" },
  { href: "#list-quality", label: "List Quality" },
  { href: "#content", label: "Email Content" },
  { href: "#engagement", label: "Engagement Signals" },
  { href: "#testing", label: "Deliverability Testing" },
  { href: "#why-teams-fail", label: "Why Teams Fail" },
  { href: "#faq", label: "FAQ" },
];

export default function ColdEmailDeliverabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={[pageJsonLd, faqJsonLd]} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-10 lg:pt-14 lg:pb-14 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">EmaReach</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Cold Email Deliverability Playbook</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
            <Brain className="w-3.5 h-3.5" />
            EmaReach Playbook
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] max-w-4xl">
            Cold Email Deliverability:
            <br />
            <span className="gradient-text">The System That Lands.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Most teams burn domains chasing volume. At EmaReach, we engineer reputation first —
            and scale from a foundation that lasts. This is the exact infrastructure-first framework
            we run for every customer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="gradient-primary text-base px-7 py-5 h-auto font-semibold">
              <Link href="/book-demo">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              No lock-in. Setup in days, not weeks.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Core principle</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "System > Copy", color: "border-blue-500/25 bg-blue-500/8 text-blue-600 dark:text-blue-400" },
                { label: "Reputation > Volume", color: "border-emerald-500/25 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400" },
                { label: "Longevity > Spikes", color: "border-violet-500/25 bg-violet-500/8 text-violet-600 dark:text-violet-400" },
              ].map(({ label, color }) => (
                <span key={label} className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${color}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Stats Band ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-border bg-foreground dark:bg-card">
        {/* subtle grid texture */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_70%)]" />

        <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y divide-white/8 lg:divide-y-0 lg:divide-x lg:divide-white/10">
            {[
              {
                value: "35–40",
                unit: "/ inbox / day",
                label: "Safe daily send cap",
                sub: "Per mailbox after warmup",
                icon: Mail,
                gradient: "from-sky-400 to-blue-500",
              },
              {
                value: "7+",
                unit: "days",
                label: "Warmup before scale",
                sub: "Minimum ramp period",
                icon: TrendingUp,
                gradient: "from-emerald-400 to-teal-500",
              },
              {
                value: "<2%",
                unit: "bounce",
                label: "Hard reputation limit",
                sub: "Exceed this and domains burn",
                icon: BarChart2,
                gradient: "from-amber-400 to-orange-500",
              },
              {
                value: "3-layer",
                unit: "auth",
                label: "SPF · DKIM · DMARC",
                sub: "Required before day one",
                icon: Lock,
                gradient: "from-violet-400 to-purple-500",
              },
            ].map(({ value, unit, label, sub, icon: Icon, gradient }) => (
              <div key={label} className="group flex flex-col gap-4 px-6 py-7 lg:px-8 lg:py-8">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="flex items-baseline gap-1.5 flex-wrap">
                    <span className={`text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                      {value}
                    </span>
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{unit}</span>
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-white/90 leading-snug">{label}</p>
                  <p className="mt-0.5 text-xs text-white/40 leading-snug">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 1. The Mindset ────────────────────────────────────── */}
      <section id="mindset" className="pt-12 pb-16 lg:pt-16 lg:pb-24 scroll-mt-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 1</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Most teams are playing the wrong game.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <div className="flex items-center gap-2 text-red-500 font-semibold text-sm uppercase tracking-wide mb-4">
                <TriangleAlert className="w-4 h-4" />
                What most teams think
              </div>
              <p className="text-3xl font-bold text-foreground leading-snug mb-3">&ldquo;Send more = get more replies.&rdquo;</p>
              <p className="text-sm text-muted-foreground">The result: burned domains, 2% open rates, and campaigns that die in weeks.</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-4">
                <ShieldCheck className="w-4 h-4" />
                How we run it at EmaReach
              </div>
              <p className="text-3xl font-bold text-foreground leading-snug mb-3">
                Infrastructure + reputation drives outcomes.
              </p>
              <p className="text-sm text-muted-foreground">Build the system right once, and it compounds — month after month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Infrastructure Calculator ──────────────────────── */}
      <section id="infrastructure" className="py-16 lg:py-24 bg-muted/30 border-y border-border scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 2</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Infrastructure calculator for cold email scale
            </h2>
            <p className="text-muted-foreground text-lg">
              Enter your target daily send volume. We calculate root domains, sending domains, and inbox count using a fixed cap of five subdomains per root and safe per-inbox limits.
            </p>
          </div>
          <InfrastructureCalculator />
        </div>
      </section>

      {/* ── Mini CTA ──────────────────────────────────────────── */}
      <section className="py-8 border-b border-border bg-primary/5">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-base">Want this infrastructure running for your team?</p>
              <p className="text-muted-foreground text-sm mt-0.5">We handle the entire setup — domains, inboxes, warmup, and monitoring.</p>
            </div>
            <Button asChild className="gradient-primary px-6 py-2.5 h-auto font-semibold shrink-0">
              <Link href="/book-demo">
                Book a demo <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── 3–4. Sending Rules & Tech ─────────────────────────── */}
      <section id="sending-rules" className="py-16 lg:py-24 scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 3 — 4</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What we enforce on every single send.
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                <Clock3 className="w-4 h-4" />
                Sending behavior we enforce
              </div>
              <ul className="space-y-3">
                {behaviorRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-foreground">
                    <Target className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
                Sending 500 emails in one burst is a high-risk spam pattern.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                <Wrench className="w-4 h-4" />
                Technical backbone at EmaReach
              </div>
              <div className="space-y-3">
                {technicalStack.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border/60 p-4">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                If this layer is missing, inbox placement drops no matter how good the copy is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Warmup ─────────────────────────────────────────── */}
      <section id="warmup" className="py-16 lg:py-24 bg-muted/30 border-y border-border scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 5</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Our most critical outbound system</h2>
            <p className="text-muted-foreground text-lg">
              New inboxes start with zero trust. We ramp carefully and build real interaction signals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Warmup ramp-up timeline
              </p>
              <div className="space-y-3">
                {[
                  { phase: "Day 1-7", volume: "5-10 emails/day", pct: "25" },
                  { phase: "Day 8-14", volume: "15-20 emails/day", pct: "50" },
                  { phase: "Day 15-21", volume: "25-30 emails/day", pct: "75" },
                  { phase: "Day 7+", volume: "35-40 emails/day", pct: "100" },
                ].map((item) => (
                  <div key={item.phase} className="rounded-xl border border-border/60 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{item.phase}</p>
                      <p className="text-primary font-semibold text-sm">{item.volume}</p>
                    </div>
                    <div className="h-1.5 rounded-full bg-primary/10 overflow-hidden">
                      <div className="h-full rounded-full bg-primary/60 transition-all" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-semibold mb-4 flex items-center gap-2">
                <Network className="w-4 h-4 text-primary" />
                Warmup signals we track
              </p>
              <ul className="space-y-3">
                {warmupSignals.map((signal) => (
                  <li key={signal} className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-primary/15 bg-primary/5 p-4 text-sm text-muted-foreground">
                Tools help, but realistic behavior is what builds domain trust over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. List Quality ───────────────────────────────────── */}
      <section id="list-quality" className="py-16 lg:py-24 scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 6</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              A bad list will burn a good domain.
            </h2>
            <p className="text-muted-foreground text-lg">
              Your sending infrastructure can be perfect — and a dirty list will still destroy your reputation within a campaign.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                <Users className="w-4 h-4" />
                What we verify before every send
              </div>
              <ul className="space-y-3">
                {listQualityChecks.map((check) => (
                  <li key={check} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm">{check}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold mb-4">
                <TriangleAlert className="w-4 h-4" />
                What happens when you skip verification
              </div>
              <div className="space-y-3">
                {listQualityRisks.map((risk) => (
                  <div key={risk.label} className="rounded-xl border border-red-500/15 bg-red-500/5 p-4">
                    <p className="font-semibold text-sm text-foreground">{risk.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{risk.outcome}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
                Verification is not optional. Unverified imports are the #1 cause of sudden bounce spikes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Content Style ──────────────────────────────────── */}
      <section id="content" className="py-16 lg:py-24 bg-muted/30 border-y border-border scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 7</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Write like a person. Deliver like infrastructure.
            </h2>
            <p className="text-muted-foreground text-lg">
              Spam filters read your copy. So do recipients. The rules below apply to both.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {contentStyleRules.map((rule) => (
              <div key={rule.title} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="font-semibold">{rule.title}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{rule.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> What works
              </p>
              <p className="text-base font-semibold leading-snug">
                &ldquo;Hey [First Name], saw you&apos;re scaling your SDR team — wanted to share how [Company] is handling reply rates right now. Worth a quick call?&rdquo;
              </p>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-500/80 mb-3 flex items-center gap-1.5">
                <TriangleAlert className="w-3.5 h-3.5" /> What doesn&apos;t
              </p>
              <p className="text-base font-semibold leading-snug">
                &ldquo;GUARANTEED results! Our FREE platform helps 10,000+ companies drive MASSIVE ROI. Click here to schedule a demo, download our whitepaper, and start your free trial TODAY!!!&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Engagement ─────────────────────────────────────── */}
      <section id="engagement" className="py-16 lg:py-24 scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 8</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              A reply is the most powerful deliverability signal.
            </h2>
            <p className="text-muted-foreground text-lg">
              Every reply tells mailbox providers this email was wanted. We track engagement at every stage of the funnel — not just opens.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-3 border-b border-border bg-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Signal</span>
              <span>Impact</span>
              <span>Why it matters</span>
            </div>
            {engagementSignals.map((row, i) => (
              <div
                key={row.signal}
                className={`grid grid-cols-3 px-5 py-4 text-sm items-start gap-4 ${i < engagementSignals.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
                  {row.signal}
                </span>
                <span className={`font-semibold ${row.impact === "High" ? "text-emerald-600" : row.impact === "Negative" ? "text-red-500" : "text-amber-600"}`}>
                  {row.impact}
                </span>
                <span className="text-muted-foreground">{row.why}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="font-semibold mb-1 flex items-center gap-2">
              <Inbox className="w-4 h-4 text-primary" />
              EmaReach tracks reply threads, not just sends
            </p>
            <p className="text-sm text-muted-foreground">
              Our reply-detection system monitors inboxes for responses, logs conversation threads, and feeds engagement data back into your sending cadence automatically — so active threads never get interrupted by automated follow-ups.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. Testing ────────────────────────────────────────── */}
      <section id="testing" className="py-16 lg:py-24 bg-muted/30 border-y border-border scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 9</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Never launch blind. Test before every sequence.
            </h2>
            <p className="text-muted-foreground text-lg">
              EmaReach includes built-in deliverability testing — no third-party integrations required to verify placement before you scale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testingChecklist.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <FlaskConical className="w-4 h-4 text-primary" />
                  <span
                    className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                      item.tag === "Required"
                        ? "bg-red-500/10 text-red-600 dark:text-red-400"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <p className="text-sm font-medium leading-snug">{item.step}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-primary font-semibold mb-3">
              <CheckCircle2 className="w-4 h-4" />
              What EmaReach&apos;s built-in testing covers
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="rounded-xl border border-border/60 p-4">
                <p className="font-semibold text-foreground mb-1">Domain authentication check</p>
                <p>Validates SPF, DKIM, and DMARC records are properly configured and passing before any campaign launches.</p>
              </div>
              <div className="rounded-xl border border-border/60 p-4">
                <p className="font-semibold text-foreground mb-1">Inbox placement probe</p>
                <p>Sends test messages to seed inboxes across major providers and reports where mail lands — inbox, spam, or promotions.</p>
              </div>
              <div className="rounded-xl border border-border/60 p-4">
                <p className="font-semibold text-foreground mb-1">Warmup domain mail test</p>
                <p>Runs a pre-flight check on newly warmed domains to confirm they&apos;re ready for live outbound volume before scaling.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10–12. Why Teams Fail ─────────────────────────────── */}
      <section id="why-teams-fail" className="py-16 lg:py-24 scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">Chapter 10 — 12</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The mistakes that kill campaigns — and the mindset that fixes them.
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold mb-4">
                <Flame className="w-4 h-4" />
                Why teams still fail
              </div>
              <ul className="space-y-3">
                {failureOutcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <TriangleAlert className="w-4 h-4 mt-1 text-red-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-2 text-primary font-semibold mb-6">
                <Gauge className="w-4 h-4" />
                The EmaReach operator mindset
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-500/80 mb-1 flex items-center gap-1">
                  <TriangleAlert className="w-3 h-3" /> Wrong question
                </p>
                <p className="text-lg font-semibold">&ldquo;How many emails can I send?&rdquo;</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Right question
                </p>
                <p className="text-lg font-semibold">&ldquo;How long can I keep this domain alive?&rdquo;</p>
              </div>
              <p className="text-muted-foreground text-sm">
                The game is protecting domain health while scaling predictable outbound. Longevity compounds — short-term volume doesn&apos;t.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Starter Playbook CTA ───────────────────────────────── */}
      <section
        className="py-16 lg:py-24 border-t border-[hsl(var(--marketing-band-border))] bg-[hsl(var(--marketing-band))]"
        aria-labelledby="starter-playbook-heading"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 md:mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
              Your starter playbook
            </span>
            <h2
              id="starter-playbook-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3"
            >
              Ready to run this yourself?
              <br />
              Here&apos;s exactly where to start.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Follow these five steps in order. Don&apos;t skip the warmup. Don&apos;t rush the scale.
            </p>
          </div>

          <ol className="grid list-none gap-4 p-0 m-0 sm:grid-cols-2 lg:grid-cols-5">
            {startSafe.map((item, i) => (
              <li
                key={item}
                className="flex min-h-[120px] flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
                aria-label={`Step ${i + 1}: ${item}`}
              >
                <span className="text-3xl font-bold tabular-nums leading-none text-primary" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 text-sm font-medium leading-snug text-foreground sm:text-[15px]">
                  {item}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11 rounded-lg bg-foreground px-6 py-4 text-base font-semibold text-background shadow-sm hover:bg-foreground/90"
            >
              <Link href="/book-demo">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden />
              </Link>
            </Button>
            <p className="text-sm leading-relaxed text-muted-foreground flex items-start gap-2.5 max-w-md">
              <Building2 className="w-5 h-5 shrink-0 text-muted-foreground mt-0.5" aria-hidden />
              <span>We set up, manage, and protect your entire sending infrastructure.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="py-16 lg:py-24 border-t border-border scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Common questions about cold email deliverability
            </h2>
            <p className="text-muted-foreground text-lg">
              Answers to the most frequently asked questions about our infrastructure, warmup process, and sending best practices.
            </p>
          </div>
          <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-card px-6 py-5">
                <p className="font-semibold text-foreground mb-2 flex items-start gap-2">
                  <Star className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {q}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-bold text-xl mb-1">Still have questions?</p>
              <p className="text-muted-foreground text-sm">Our team handles setup, warmup, and monitoring — just tell us your volume target.</p>
            </div>
            <Button asChild size="lg" className="gradient-primary px-7 py-5 h-auto font-semibold shrink-0">
              <Link href="/book-demo">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
