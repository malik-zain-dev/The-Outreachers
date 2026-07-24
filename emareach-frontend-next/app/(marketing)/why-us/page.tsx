import type { Metadata } from "next";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import Link from "next/link";
import {
  CheckCircle2,
  Zap,
  Shield,
  Target,
  Mail,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  Send,
  BarChart3,
  RefreshCw,
  Lock,
  ThumbsUp,
  Play,
  Star,
  ChevronDown,
  AlertCircle,
  Building2,
  Briefcase,
  Rocket,
  Megaphone,
  CheckCheck,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why EmaReach | Cold Email That Lands in the Inbox",
  description:
    "The cold email platform built to land emails in the inbox. AI writing, inbox warm-up, and deliverability optimization — so more emails reach prospects and get replies.",
  keywords: "cold email deliverability, inbox placement, email warmup, AI email personalization",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const painPoints = [
  {
    icon: XCircle,
    text: "You hit send. Nobody replies. Your email landed in their Promotions tab — or worse, spam.",
  },
  {
    icon: XCircle,
    text: "You bought a new domain. Within 2 weeks it's flagged. You start over. Again.",
  },
  {
    icon: XCircle,
    text: 'Your "personalized" sequences use the same template as everyone else in their inbox.',
  },
  {
    icon: XCircle,
    text: "You spend more time managing tools than actually closing deals.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect Your Inbox",
    description:
      "Link Gmail via OAuth or any SMTP provider. We automatically start your warmup — zero config required.",
    time: "2 minutes",
  },
  {
    number: "02",
    title: "Build Your Campaign",
    description:
      "Upload contacts, pick an AI-written template, set your follow-up sequence. The AI personalizes each email individually.",
    time: "5 minutes",
  },
  {
    number: "03",
    title: "Watch Replies Come In",
    description:
      "EmaReach sends with human-like timing, rotates senders, respects limits. You get the replies. We handle the rest.",
    time: "Ongoing",
  },
];

const primaryBenefits = [
  {
    eyebrow: "Domain Protection",
    headline: "Stop burning domains. Start building reputation.",
    body: "Our warmup system gradually builds sender trust so your first campaign doesn't also be your last. Track progress in real-time, set automatic daily limits, and rotate across multiple domains safely — all from one dashboard.",
    bullets: [
      "Track warmup progress day by day",
      "Automatic daily send limits",
      "Rotate multiple domains safely",
    ],
    mockupLabel: "Warmup Dashboard",
    gradient: "from-green-500/20 to-emerald-500/10",
    accent: "text-green-500",
    border: "border-green-500/20",
    flip: false,
  },
  {
    eyebrow: "AI Personalization",
    headline: "Emails that read like you wrote each one at 7 AM.",
    body: "No more 'Dear [FIRSTNAME]' disasters. Our AI researches your prospects and writes copy that sounds like you — because you actually reviewed it. Get opens and replies, not eye-rolls.",
    bullets: [
      "Researches prospects automatically",
      "Writes in your voice, not generic GPT",
      "You review before anything sends",
    ],
    mockupLabel: "AI Email Writer",
    gradient: "from-purple-500/20 to-pink-500/10",
    accent: "text-primary",
    border: "border-primary/20",
    flip: true,
  },
];

const supportingFeatures = [
  {
    icon: BarChart3,
    title: "Analytics that matter",
    description:
      "Opens, clicks, replies — the metrics that tell you if your campaigns work. No vanity numbers.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Target,
    title: "Contacts & templates",
    description:
      "Dynamic placeholders that work. Manage contacts without spreadsheet hell.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Compliance baked in",
    description:
      "DKIM signing, unsubscribe checks, link limits, proper headers. Inbox bodyguards, included.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

const testimonials = [
  {
    quote:
      "Went from 12% to 67% open rate in 3 weeks. Our domain was basically toast before EmaReach.",
    author: "Sarah K.",
    role: "SDR Lead",
    company: "Growth-stage SaaS",
    tag: "Sales Team",
    stars: 5,
  },
  {
    quote:
      "Three client domains warmed up, zero spam issues, all running simultaneously. Saved us hours every week.",
    author: "Mark T.",
    role: "Founder",
    company: "B2B Agency",
    tag: "Agency",
    stars: 5,
  },
  {
    quote:
      "We 3x'd our booked meetings in 60 days without hiring an SDR. The AI copy actually converts.",
    author: "Priya L.",
    role: "CEO",
    company: "Early-stage startup",
    tag: "Founder",
    stars: 5,
  },
];

const personas = [
  {
    icon: Building2,
    label: "Sales Teams",
    headline: "Scale without throttling",
    description:
      "Run multi-inbox sequences at scale. Rotate senders, protect your primary domain, and never miss a follow-up.",
  },
  {
    icon: Briefcase,
    label: "Agencies",
    headline: "Manage all clients in one place",
    description:
      "Multiple client domains, one dashboard. Warmup, send, track, and report — without context-switching.",
  },
  {
    icon: Rocket,
    label: "Founders",
    headline: "Validate ICP without an SDR",
    description:
      "Run targeted outbound fast. AI writes it, warmup protects it, analytics prove it.",
  },
  {
    icon: Megaphone,
    label: "Marketers",
    headline: "Build outbound as a channel",
    description:
      "Not a one-off blast — a repeatable pipeline engine. Sequences, analytics, and deliverability in one platform.",
  },
];

const trustBadges = [
  "Human-like sending patterns",
  "DKIM & proper headers",
  "Unsubscribe compliance",
  "Link limits enforced",
  "Spam-word awareness",
  "Daily send caps",
];

const faqs = [
  {
    question: "Will this get my domain blacklisted?",
    answer:
      "The opposite. Our warmup system and sending limits are specifically designed to protect your domain reputation. Most tools burn domains by sending too fast, too uniform, too early. We build sender reputation gradually — the way inbox providers expect.",
  },
  {
    question: "Is the AI personalization actually good, or is it obvious GPT output?",
    answer:
      "It pulls real data about your prospects and writes in your voice — not a generic template. You review every email before anything sends. Our users consistently report replies like 'how did you know that?' — which is the goal.",
  },
  {
    question: "How long does warmup take?",
    answer:
      "Usually 2–4 weeks before you're at full send volume. We handle the entire ramp automatically — you just set your target volume and watch the progress tracker. No manual work required.",
  },
  {
    question: "Does it work with Gmail and Outlook?",
    answer:
      "Yes. OAuth for Gmail (secure, no passwords stored), SMTP for Outlook and everything else. Most users are set up in under 5 minutes.",
  },
  {
    question: "What happens when I hit my send limit?",
    answer:
      "We pause — not skip. Your sequence resumes the next day automatically. No dropped leads, no manual reschedules. Your contacts move through the sequence at the right pace.",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function SectionLabel({
  icon: Icon,
  text,
  className = "",
}: {
  icon: React.ElementType;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4 ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{text}</span>
    </div>
  );
}

function DashboardMockup({ label }: { label: string }) {
  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="text-xs text-muted-foreground ml-2 font-medium">{label}</span>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 w-24 bg-primary/20 rounded-full" />
          <div className="h-6 w-16 bg-primary/15 rounded-lg" />
        </div>
        {[85, 62, 91, 48, 77].map((pct, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <div className="h-2 rounded-full bg-muted" style={{ width: `${30 + i * 12}%` }} />
              <span className="text-xs text-muted-foreground font-mono">{pct}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Opens", "Clicks", "Replies"].map((label, i) => (
            <div key={i} className="rounded-lg bg-muted/60 p-2.5 text-center">
              <div className="text-lg font-bold text-foreground">
                {["67%", "24%", "12%"][i]}
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Pain-led headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.08] tracking-tight text-foreground"
            >
              Stop landing in spam.
              <br />
              <span className="gradient-text">Start landing in inboxes.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              EmaReach automates cold email with AI writing, inbox warm-up, and deliverability optimization — so more emails reach prospects and get replies.
            </p>

            {/* CTAs */}
            <MarketingCtaButtons
              size="lg"
              primary={{ href: "/book-demo", label: "Watch 2-min demo" }}
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
              className="mb-6"
            />

            {/* Micro-reassurances */}
            <p className="text-sm text-muted-foreground/70">
              Free plan includes 100 emails/day · Setup takes under 5 minutes · No credit card
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. SOCIAL PROOF BAR ─────────────────────────────────────────────── */}
      <section className="py-10 border-y border-border bg-card/50" aria-label="Trusted by">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            Trusted by growing sales teams, agencies, and founders
          </p>
          {/* Placeholder logo row */}
          <div className="flex items-center justify-center gap-8 lg:gap-14 flex-wrap mb-10 opacity-60">
            {["Acme Corp", "Bolt Inc", "Forge", "Meridian", "Waverly"].map((name) => (
              <div
                key={name}
                className="text-lg font-bold tracking-tight text-muted-foreground/70 font-mono"
              >
                {name}
              </div>
            ))}
          </div>

          {/* Pull-quote */}
          <div className="max-w-2xl mx-auto text-center border border-border rounded-2xl bg-background p-6 shadow-sm">
            <div className="flex justify-center">
              <StarRating count={5} />
            </div>
            <p className="mt-3 text-base text-foreground font-medium leading-relaxed">
              &ldquo;Went from 12% to 41% open rate in 3 weeks. Our domain was basically toast
              before EmaReach.&rdquo;
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              — <strong>Sarah K.</strong>, SDR Lead · Growth-stage SaaS
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. PAIN SECTION ─────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 bg-muted/30"
        aria-labelledby="pain-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto">
            <SectionLabel icon={AlertCircle} text="Sound familiar?" />
            <h2
              id="pain-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 leading-tight"
            >
              Cold email is broken for most teams.
              <br />
              <span className="text-muted-foreground font-normal">It doesn&apos;t have to be.</span>
            </h2>

            <div className="space-y-4">
              {painPoints.map((pain, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card"
                >
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-base text-foreground">{pain.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 p-5 rounded-xl border border-primary/30 bg-primary/5">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-base font-semibold text-foreground">
                EmaReach fixes all four of these. Here&apos;s how.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        aria-labelledby="how-it-works-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <SectionLabel icon={Zap} text="How it works" />
            <h2
              id="how-it-works-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              Up and running in under 5 minutes
            </h2>
            <p className="text-muted-foreground text-lg">
              No complex setup. No devs needed. Connect, build, and send in three steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-0.5 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />

            {steps.map((step, i) => (
              <div
                key={i}
                className="relative p-6 lg:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <span className="font-bold text-primary text-lg">{step.number}</span>
                </div>
                <div className="inline-block px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-3">
                  {step.time}
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <MarketingCtaButtons
              primary={{ href: "/book-demo", label: "Book a demo" }}
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            />
          </div>
        </div>
      </section>

      {/* ── 5. PRIMARY BENEFITS ─────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 bg-muted/30"
        aria-labelledby="benefits-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <SectionLabel icon={Sparkles} text="What you get" />
            <h2
              id="benefits-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              Built differently, for inbox placement
            </h2>
            <p className="text-muted-foreground text-lg">
              Every feature exists for one reason: your email lands where it&apos;s supposed to.
            </p>
          </div>

          {/* Primary benefit rows */}
          <div className="space-y-16 max-w-6xl mx-auto">
            {primaryBenefits.map((benefit, i) => (
              <div
                key={i}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  benefit.flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Visual */}
                <div className={`rounded-2xl p-1 bg-gradient-to-br ${benefit.gradient} border ${benefit.border}`}>
                  <DashboardMockup label={benefit.mockupLabel} />
                </div>

                {/* Copy */}
                <div>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${benefit.accent}`}>
                    {benefit.eyebrow}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                    {benefit.headline}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    {benefit.body}
                  </p>
                  <ul className="space-y-3">
                    {benefit.bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Supporting features grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mt-16">
            {supportingFeatures.map((item, i) => (
              <div
                key={i}
                className="group p-6 lg:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        aria-labelledby="testimonials-heading"
      >
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <SectionLabel icon={Star} text="Customer results" />
            <h2
              id="testimonials-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              Real results from real teams
            </h2>
            <p className="text-muted-foreground text-lg">
              Not metrics. Outcomes. Here&apos;s what teams like yours actually experienced.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 lg:p-8 rounded-2xl border border-border bg-card flex flex-col hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <StarRating count={t.stars} />
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {t.tag}
                  </span>
                </div>
                <p className="text-base text-foreground leading-relaxed flex-grow mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 bg-muted/30"
        aria-labelledby="who-its-for-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <SectionLabel icon={Users} text="Who it's for" />
            <h2
              id="who-its-for-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              Built for teams who need outreach that converts
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {personas.map((p, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {p.label}
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                  {p.headline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. DELIVERABILITY TRUST STRIP ───────────────────────────────────── */}
      <section
        className="py-16 border-y border-border bg-card/50"
        aria-label="Deliverability features"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Deliverability isn&apos;t a feature.
              <span className="gradient-text"> It&apos;s the whole product.</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Every part of EmaReach is engineered around one outcome: your email lands in the inbox.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {trustBadges.map((label, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground/60 italic">
              Not sure what all of these mean? Good — that means we&apos;re handling them for you.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ─────────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 bg-muted/30"
        aria-labelledby="faq-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <SectionLabel icon={CheckCheck} text="FAQ" />
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              Questions we hear before every signup
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-200 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-base list-none gap-4">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ───────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        aria-label="Call to action"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="relative p-8 lg:p-14 rounded-3xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm shadow-xl shadow-primary/5 text-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                  Your next campaign can hit the inbox.
                  <br />
                  <span className="gradient-text">This one might not.</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-2">
                  Let&apos;s fix that.
                </p>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                  Join teams who send cold email that gets opened, read, and replied to — not
                  filtered, flagged, and forgotten.
                </p>

                <MarketingCtaButtons
                  size="lg"
                  primary={{ href: "/book-demo", label: "Book a demo" }}
                  trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
                  className="mb-4"
                />

                {/* Micro-reassurances */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                  {[
                    "No credit card",
                    "Free warmup included",
                    "Cancel anytime",
                    "Setup in 5 min",
                  ].map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground/60">
                  Sending at scale?{" "}
                  <Link href="/contact" className="underline underline-offset-2 hover:text-foreground transition-colors">
                    Talk to a human →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}