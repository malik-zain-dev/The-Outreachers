import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  Calendar,
  CheckCircle2,
  Clock3,
  Flame,
  Gauge,
  Inbox,
  Layers3,
  MailCheck,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users2,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeaturesCta } from "./FeaturesCta";
import { FeaturesTestimonials } from "./FeaturesTestimonials";

/** Warmup & deliverability features implemented in EmaReach (backend + app). */
const productCapabilities = [
  {
    title: "Real opens",
    description:
      "Emails are opened by actual inbox users - not simulated signals.",
    icon: Inbox,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Real replies",
    description:
      "Receive genuine replies that build conversation history and trust.",
    icon: MailCheck,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    border: "hover:border-blue-500/40",
  },
  {
    title: "Natural threads",
    description:
      "Emails evolve into real threads, mimicking authentic communication patterns.",
    icon: Layers3,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Distributed network",
    description:
      "No closed-loop systems. Real inbox diversity across environments.",
    icon: Users2,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
];

const keyMetrics = [
  {
    label: "Core angle",
    value: "Real conversations",
    note: "Most tools simulate activity. EmaReach creates real inbox interactions.",
    icon: Flame,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "No simulation",
    value: "No bots",
    note: "No synthetic opens, no fake replies, no closed warmup loops.",
    icon: ShieldAlert,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Trusted signals",
    value: "Opens + replies + threads",
    note: "Inbox providers trust behavior, not vanity dashboard activity.",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Outcome",
    value: "Durable deliverability",
    note: "Built for long-term inbox trust, not short-term warmup optics.",
    icon: TrendingUp,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const commonProblems = [
  "Fake opens that look good on dashboards but do not build trust.",
  "Simulated replies that are predictable and easy to detect.",
  "Closed warmup loops and network patterns inbox providers can ignore.",
  "Pattern-based activity that does not match natural conversation behavior.",
];

const workflowSteps = [
  {
    step: "01",
    text: "Connect Gmail or SMTP inboxes. Set per-inbox daily limit (up to 50) and enable auto-warmup where your plan allows.",
  },
  {
    step: "02",
    text: "Optional: create warm-up templates (or use AI Write) with spintax and sender/receiver merge fields; preview before use.",
  },
  {
    step: "03",
    text: "Let the platform run paced warm-up traffic to the receiver pool. Monitor progress, stats, and any warning states on the Warmup page.",
  },
  {
    step: "04",
    text: "Turn on campaign ramp-up on an inbox if you want outreach volume to climb in tiers from the daily goal instead of immediately using the full cap.",
  },
  {
    step: "05",
    text: "Pair with domain health and campaign limits so cold sends stay aligned with reputation—not just one inbox in isolation.",
  },
];

const teamOutcomes = [
  {
    team: "Founders & first mailboxes",
    result:
      "Build sender reputation before scaling sequences—without operating a second warm-up tool.",
    icon: Zap,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    team: "SDR & RevOps",
    result:
      "Standard caps, ramp, and warnings reduce “one bad week” domain damage across many reps.",
    icon: Users2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    team: "Agencies",
    result:
      "Per-inbox limits and progress tracking across clients—same mechanics, isolated mailboxes.",
    icon: Flame,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const platformDetails = [
  {
    title: "Call-out the industry pattern",
    description:
      "Most warmup tools simulate engagement using controlled networks or bots. These signals are predictable and increasingly ignored by inbox providers.",
    icon: ShieldAlert,
  },
  {
    title: "Real inbox network",
    description:
      "EmaReach connects your inbox to real users generating genuine opens, replies, and threads - the signals inbox providers actually trust.",
    icon: Users2,
  },
  {
    title: "Behavior over activity",
    description:
      "Inbox providers do not trust activity. They trust behavior. Real behavior is impossible to fake at scale.",
    icon: CheckCircle2,
  },
  {
    title: "Built for deliverability depth",
    description:
      "Distributed inbox diversity creates authentic engagement patterns instead of controlled, repetitive warmup footprints.",
    icon: BarChart3,
  },
];

const comparisonRows: { label: string; basic: string; emareach: string }[] = [
  {
    label: "Opens",
    basic: "Fake opens",
    emareach: "Real opens",
  },
  {
    label: "Replies",
    basic: "No real replies",
    emareach: "Genuine replies",
  },
  {
    label: "Interaction patterns",
    basic: "Predictable patterns",
    emareach: "Natural conversations",
  },
  {
    label: "Network model",
    basic: "Closed networks",
    emareach: "Distributed inbox network",
  },
];

const pillarCards = [
  {
    title: "No bots. No simulation.",
    subtitle: "Foundation",
    body: "Most warmup tools simulate activity. EmaReach creates real inbox interactions that look and behave naturally.",
    icon: ShieldCheck,
    accent: "from-violet-500/30 to-purple-500/20",
  },
  {
    title: "Real inboxes. Real interactions.",
    subtitle: "Signal quality",
    body: "Your emails do not just get sent - they get opened, replied to, and threaded by real inboxes.",
    icon: MailCheck,
    accent: "from-blue-500/30 to-cyan-500/20",
  },
  {
    title: "Signals that actually matter.",
    subtitle: "Deliverability outcome",
    body: "Built for long-term deliverability - not vanity warmup metrics that break when real sending starts.",
    icon: TrendingUp,
    accent: "from-emerald-500/30 to-teal-500/20",
  },
];

const faqItems = [
  {
    q: "What is email warm-up in EmaReach?",
    a: "It is automated, neutral traffic between your connected sending inboxes and a pool of receiver accounts—with opens/replies designed to look realistic. It runs alongside per-inbox daily limits and progress tracking toward a ready state.",
  },
  {
    q: "How is warm-up different from campaigns?",
    a: "Campaigns are your real outbound sequences to your contacts. Warm-up is separate peer-to-peer traffic to build and maintain sender reputation. Both respect daily limits and sending discipline.",
  },
  {
    q: "What does campaign ramp-up do?",
    a: "When enabled on an inbox, your effective campaign daily cap scales up in tiers over time as a fraction of your inbox daily goal—so you do not jump straight to the full cap on day one.",
  },
  {
    q: "Can I write my own warm-up emails?",
    a: "Yes. You can create warm-up templates with subject and body, use spintax, and merge fields for sender and receiver. AI-assisted generation is available where your plan and settings allow.",
  },
  {
    q: "What do warning states mean?",
    a: "If recent warm-up activity shows persistently low opens or replies, the product can flag the inbox so you can investigate DNS, content, or provider issues before scaling cold email.",
  },
  {
    q: "Is warm-up available on every plan?",
    a: "Warmup is a feature gated by plan in the product. Check pricing or your account limits for access.",
  },
];

function WarmupFlowMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-emerald-500/20 to-cyan-500/25 opacity-70 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">Warm-up flow</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            Paced
          </span>
        </div>
        <div className="grid gap-0 p-4 sm:grid-cols-3 sm:gap-2">
          <div className="rounded-xl border border-border/80 bg-muted/30 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your inbox</p>
            <p className="mt-2 font-mono text-xs text-foreground">sales@…</p>
            <p className="mt-2 text-[0.65rem] text-muted-foreground">Warming · progress</p>
          </div>
          <div className="flex items-center justify-center py-2 sm:py-0">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <RefreshCw className="h-4 w-4 text-primary" />
              <span>Neutral mail</span>
            </div>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/30 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Personal Network</p>
            <p className="mt-2 text-[0.65rem] text-muted-foreground">Inbox · read · reply</p>
            <p className="mt-2 text-[0.65rem] text-emerald-600 dark:text-emerald-400">Not spam</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-700 dark:text-violet-300">
            Daily cap
          </span>
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 font-medium text-blue-700 dark:text-blue-300">
            Human-like gaps
          </span>
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-800 dark:text-amber-200">
            Optional ramp
          </span>
        </div>
      </div>
    </div>
  );
}

function MidPageCta() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-emerald-500/10 to-cyan-500/10" />
      <div className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 shadow-xl sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Upgrade from artificial warmup to real engagement</h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Start building inbox trust with signals that actually improve deliverability.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Start warmup
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeliverabilityWarmupPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Deliverability &amp; warm-up
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Most warmup is artificial.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  Ours isn&apos;t.
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-emerald-500/60" />
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Unlike traditional warmup tools that rely on artificial engagement, EmaReach connects your inbox to real
              users generating genuine opens, replies, and threads - the signals inbox providers actually trust.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Your emails do not just get sent - they get interacted with by real inboxes.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book-demo"
                className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
              >
                Start warmup
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
              Try for Free
              </Link>
            </div>
          </div>

          <WarmupFlowMock />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyMetrics.map((metric) => (
              <article
                key={metric.label}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                <div className={`mb-3 inline-flex rounded-xl ${metric.bg} p-2.5 ${metric.color}`}>
                  <metric.icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-base font-bold text-foreground">{metric.value}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WARMUP TRAP CALLOUT */}
      <section className="border-y border-destructive/20 bg-gradient-to-r from-destructive/5 via-orange-500/5 to-amber-500/5 py-5">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="mt-0.5 sm:mt-0 flex-shrink-0 rounded-lg bg-destructive/15 p-2">
                <ShieldAlert className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  Why &ldquo;unlimited warmup&rdquo; from Instantly &amp; Saleshandy is a closed-loop trap
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Most warmup tools share your domain reputation with 100,000+ strangers. Here&apos;s the full breakdown.
                </p>
              </div>
            </div>
            <Link
              href="/the-warmup-trap"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-5 py-2.5 text-sm font-semibold text-destructive transition-all duration-200 hover:bg-destructive/20 hover:border-destructive/50 whitespace-nowrap"
            >
              Read the breakdown
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Core messaging angle
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Most tools simulate activity. We create real conversations.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Inbox providers do not trust activity - they trust behavior.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pillarCards.map((p) => (
              <article
                key={p.title}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-40`} />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.subtitle}</p>
                  <h3 className="mt-1 text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FULL PRODUCT GRID */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Feature breakdown
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Signals that actually improve deliverability</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Real behavior is impossible to fake at scale. That&apos;s why we don&apos;t try to.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {productCapabilities.map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 ${item.border} hover:-translate-y-0.5 hover:shadow-lg`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className={`mb-4 inline-flex rounded-xl ${item.iconBg} p-3 ${item.iconColor}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">Deep dive</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From pool mechanics to your templates</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-emerald-500/5 p-8 shadow-sm lg:col-span-7 lg:min-h-[280px]">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <Inbox className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold">Problem -&gt; contrast -&gt; solution</h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Most warmup tools simulate engagement using controlled networks or bots. These signals are predictable -
                  and increasingly ignored by inbox providers. EmaReach uses a real inbox network where emails are opened,
                  replied to, and threaded naturally.
                </p>
              </div>
              <p className="mt-6 text-sm font-medium text-primary">
                <Link href="/features/campaign-automation-sequences" className="inline-flex items-center gap-1 hover:underline">
                  Then layer campaign sequences <ArrowRight className="h-4 w-4" />
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <TrendingUp className="mb-3 h-6 w-6 text-amber-500" />
                <h4 className="font-semibold">Looks good on dashboard</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fake opens and pattern loops can inflate warmup dashboards without creating durable inbox trust.
                </p>
              </div>
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Braces className="mb-3 h-6 w-6 text-violet-500" />
                <h4 className="font-semibold">Builds real trust</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Real opens, genuine replies, and natural threads generate the behavior mailbox providers rely on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Artificial vs real engagement</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              No bots. No simulation. Real inboxes. Real interactions.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Topic</span>
              <span className="text-center text-muted-foreground">Artificial</span>
              <span className="text-center text-primary">EmaReach</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-0 border-b border-border px-4 py-4 text-sm last:border-0 sm:px-6"
              >
                <span className="font-medium text-foreground">{row.label}</span>
                <span className="text-center text-muted-foreground">{row.basic}</span>
                <span className="text-center font-medium text-foreground">{row.emareach}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN + PLATFORM */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Trust layer
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Inbox providers don&apos;t trust activity - they trust behavior.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">What breaks warmup trust</h3>
              <ul className="space-y-4">
                {commonProblems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-muted-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">How EmaReach fixes it</h3>
              <div className="space-y-3">
                {platformDetails.map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-xl border border-border/60 bg-muted/30 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WORKFLOW + TEAMS */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">Micro-copy</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for long-term deliverability - not vanity metrics.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">Signals that actually matter</h3>
              <ol className="space-y-0">
                {workflowSteps.map((item, i) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-2 ring-primary/20">
                        {item.step}
                      </div>
                      {i < workflowSteps.length - 1 && <div className="my-1 w-px flex-1 bg-border" />}
                    </div>
                    <p className="pb-6 pt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold">Real behavior at scale</h3>
              <div className="space-y-4">
                {teamOutcomes.map((item) => (
                  <div
                    key={item.team}
                    className="flex gap-4 rounded-xl border border-border/60 bg-muted/30 p-5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.team}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.result}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-border/60 bg-muted/20 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Related</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/features/ai-writing-personalization"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    AI writing &amp; personalization
                  </Link>
                  <Link
                    href="/features/analytics-reporting"
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary/40"
                  >
                    Analytics &amp; reporting
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesTestimonials />

      {/* FAQ */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Warm-up &amp; deliverability questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-border bg-card px-4 shadow-sm sm:px-6">
            {faqItems.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border/80">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <MidPageCta />

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-cyan-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <MailCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Inbox placement</span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Upgrade from artificial warmup to{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              real engagement
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Start building inbox trust with signals that actually improve deliverability.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Start warmup
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              Try for Free
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users2 className="h-4 w-4" />
            Founders, SDR teams, agencies, and RevOps—same controls, your domains.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
