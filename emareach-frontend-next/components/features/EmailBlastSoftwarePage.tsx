import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Gauge,
  MessageSquare,
  Radio,
  RefreshCw,
  Send,
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

const painPoints = [
  {
    problem: "Mass blasts tank domain reputation",
    fix: "Multi-inbox rotation and daily send caps distribute blast volume so no single domain absorbs all the risk.",
    icon: ShieldCheck,
    iconColor: "text-destructive",
    iconBg: "bg-destructive/10",
  },
  {
    problem: "One blast, no segmentation",
    fix: "Segment lists before you send and personalize each blast at scale with AI-written variants per segment.",
    icon: Target,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
  },
  {
    problem: "No idea what happened after send",
    fix: "Real-time open, click, and inbox placement tracking for every blast — not just a delivered count.",
    icon: BarChart3,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
];

const pillarCards = [
  {
    title: "Send blasts that don't burn your domain",
    subtitle: "Protected bulk sending",
    body: "Blast volume is distributed across rotating inboxes with paced sending and warm-up running continuously, so bulk sends don't spike spam complaints.",
    icon: Flame,
    accent: "from-emerald-500/25 to-teal-500/15",
  },
  {
    title: "Segment before you blast",
    subtitle: "Targeted bulk email",
    body: "Filter your list by engagement, tags, or custom fields before sending — a true blast tool, not a spray-and-pray sender.",
    icon: Radio,
    accent: "from-primary/25 to-blue-500/15",
  },
  {
    title: "AI writes the blast, you approve it",
    subtitle: "Fast content creation",
    body: "Draft a full email blast from a short brief, with subject line variants ready for A/B testing before you hit send.",
    icon: Sparkles,
    accent: "from-violet-500/25 to-purple-500/15",
  },
];

const featureGrid = [
  {
    title: "One-click bulk sending",
    description:
      "Send a single email blast to your entire list or a filtered segment in one action, with scheduling built in.",
    icon: Send,
    gradient: "from-primary/20 to-blue-500/15",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    border: "hover:border-primary/40",
  },
  {
    title: "Multi-inbox rotation for volume",
    description:
      "Blast volume rotates across every connected inbox automatically, keeping per-domain send rates within safe thresholds.",
    icon: RefreshCw,
    gradient: "from-indigo-500/20 to-violet-500/15",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
  },
  {
    title: "List segmentation",
    description:
      "Filter contacts by engagement history, tags, or custom fields so every blast reaches the right audience, not your whole database blindly.",
    icon: Target,
    gradient: "from-teal-500/20 to-emerald-500/15",
    iconColor: "text-teal-500",
    iconBg: "bg-teal-500/10",
    border: "hover:border-teal-500/40",
  },
  {
    title: "AI-generated blast copy",
    description:
      "Generate subject lines and full email copy for a blast in seconds, with A/B variants ready to test automatically.",
    icon: Bot,
    gradient: "from-violet-500/20 to-purple-500/15",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Built-in inbox warm-up",
    description:
      "Every sending inbox stays warm continuously, protecting deliverability before and after every blast.",
    icon: Flame,
    gradient: "from-emerald-500/20 to-teal-500/15",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Unified reply inbox",
    description:
      "Replies to any blast land in one inbox, so you can follow up with engaged contacts without digging through a mailbox.",
    icon: MessageSquare,
    gradient: "from-amber-500/20 to-orange-500/15",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    border: "hover:border-amber-500/40",
  },
  {
    title: "Real-time blast analytics",
    description:
      "Track opens, clicks, replies, bounces, and inbox placement per blast — live, as the send goes out.",
    icon: BarChart3,
    gradient: "from-cyan-500/20 to-blue-500/15",
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/40",
  },
  {
    title: "Domain health monitoring",
    description:
      "Catch reputation drops before they compound with per-domain health scores and low-engagement warnings.",
    icon: ShieldCheck,
    gradient: "from-rose-500/20 to-pink-500/15",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    border: "hover:border-rose-500/40",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Import and segment your list",
    text: "Upload contacts via CSV or CRM sync, then filter into the segment you want to reach with this blast.",
  },
  {
    step: "02",
    title: "Draft the blast with AI",
    text: "Generate subject line and body copy from a brief, or write it yourself. A/B variants are ready if you want them.",
  },
  {
    step: "03",
    title: "Choose your sending inboxes",
    text: "EmaReach rotates the blast across your connected, warmed-up inboxes to keep per-domain volume safe.",
  },
  {
    step: "04",
    title: "Send or schedule",
    text: "Blast immediately or schedule for later. Sends are paced automatically to protect deliverability.",
  },
  {
    step: "05",
    title: "Watch results in real time",
    text: "Opens, clicks, replies, and bounces populate live. Replies land in your unified inbox for fast follow-up.",
  },
];

const comparisonRows: { label: string; separate: string; emareach: string }[] = [
  { label: "Sending volume", separate: "Single domain, capped low", emareach: "Rotated across multiple warmed inboxes" },
  { label: "List targeting", separate: "All-or-nothing sends", emareach: "Segment by engagement, tags, fields" },
  { label: "Copywriting", separate: "Manual, from scratch", emareach: "AI-generated with A/B variants" },
  { label: "Deliverability", separate: "No warm-up, high bounce risk", emareach: "Continuous warm-up, paced sending" },
  { label: "Post-send visibility", separate: "Delivered count only", emareach: "Opens, clicks, replies, placement" },
  { label: "Reply handling", separate: "Manual inbox checking", emareach: "Unified inbox, auto-routed" },
];

const teamCards = [
  {
    team: "Marketing teams running promotions",
    result: "Blast product launches and offers to full lists without spiking spam complaints on a single domain.",
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    team: "Newsletter & content publishers",
    result: "Send large-list newsletters reliably, with segment-level engagement data to improve every issue.",
    icon: Users2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    team: "Agencies sending on behalf of clients",
    result: "Rotate blast volume across isolated client sending identities, keeping every account's reputation protected.",
    icon: Gauge,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

const statCards = [
  { value: "92%", label: "Average inbox rate", sub: "even on large-list blasts" },
  { value: "Multi-inbox", label: "Rotation", sub: "spreads volume automatically" },
  { value: "Live", label: "Analytics", sub: "opens, clicks, replies, bounces" },
  { value: "1", label: "Platform for everything", sub: "writing, sending, warm-up, replies" },
];

const faqItems = [
  {
    q: "What is email blast software?",
    a: "Email blast software lets you send a single email to a large list of contacts at once — a newsletter, promotion, or announcement — rather than a one-to-one sequence. EmaReach adds deliverability protection and segmentation on top of basic bulk sending.",
  },
  {
    q: "Will a large blast hurt my domain reputation?",
    a: "Not with EmaReach. Blast volume rotates across your connected, warmed-up inboxes with paced sending, so no single domain absorbs the full spam-complaint risk of a large send.",
  },
  {
    q: "Can I segment my list before blasting?",
    a: "Yes. Filter contacts by engagement history, tags, or custom fields so your blast reaches the right audience instead of your entire database indiscriminately.",
  },
  {
    q: "Can AI write my blast for me?",
    a: "Yes. Describe the offer or announcement and AI drafts subject lines and full email copy, with A/B variants ready to test automatically.",
  },
  {
    q: "What analytics do I get after sending a blast?",
    a: "Real-time opens, clicks, replies, bounces, and inbox placement — tracked per blast, so you know exactly how the send performed, not just how many were delivered.",
  },
  {
    q: "How do I manage replies from a blast sent to thousands of contacts?",
    a: "Every reply lands in EmaReach's unified inbox regardless of list size, so you can follow up with engaged contacts without digging through a mailbox.",
  },
  {
    q: "Does EmaReach support scheduling blasts in advance?",
    a: "Yes. Schedule a blast for a future date and time, and EmaReach handles pacing and inbox rotation automatically when it goes out.",
  },
];

function BlastMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-emerald-500/20 to-violet-500/20 opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-semibold">EmaReach — Email Blast</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
            <span className="text-xs text-muted-foreground">Sending across 8 inboxes</span>
          </div>
        </div>
        <div className="p-5">
          <p className="mb-3 font-mono text-sm font-medium text-foreground">Black Friday Blast — 12,400 contacts</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Sent", value: "9,120" },
              { label: "Opened", value: "51%" },
              { label: "Clicked", value: "1,204" },
              { label: "Bounced", value: "0.4%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/80 bg-muted/20 px-3 py-2 text-center">
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/20 px-4 py-3 text-xs">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">AI-written</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300">Rotating 8 inboxes</span>
          <span className="rounded-full bg-violet-500/10 px-2 py-0.5 font-medium text-violet-700 dark:text-violet-300">Segment: Active last 90d</span>
        </div>
      </div>
    </div>
  );
}

function MidPageCta() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-emerald-500/8 to-violet-500/8" />
      <div className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 shadow-xl sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Blast your whole list without wrecking deliverability
            </h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Multi-inbox rotation, segmentation, and warm-up — built for bulk sends that still land.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Book a demo
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

export function EmailBlastSoftwarePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-500/7 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-violet-500/7 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <Radio className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Email Blast Software
              </span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Email blast software that{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  protects deliverability at scale
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary/60 to-emerald-500/60" />
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              EmaReach lets you blast your entire list — or a targeted segment — with AI-written copy, multi-inbox
              rotation, and warm-up running the whole time. Bulk sending that doesn&apos;t torch your domain.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-sm text-muted-foreground">
              Segment, send, and track — all from one dashboard, with replies landing in one inbox.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book-demo"
                className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                View pricing
              </Link>
            </div>
          </div>

          <BlastMock />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((s) => (
              <article
                key={s.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md text-center"
              >
                <p className="text-3xl font-black text-primary">{s.value}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / PAIN ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              The problem
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Basic blast tools trade reach for reputation
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Sending thousands of emails from one domain in one go is exactly what spam filters watch for.
              Most blast tools don&apos;t account for that at all.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {painPoints.map((p) => (
              <article
                key={p.problem}
                className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className={`mb-4 inline-flex rounded-xl ${p.iconBg} p-3 ${p.iconColor}`}>
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">{p.problem}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.fix}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Core pillars
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything a modern blast tool should include
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Volume, targeting, and copy — working together, not stacked as separate tools.
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

      {/* ── FEATURE GRID ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Feature breakdown
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bulk sending built to actually land
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              No integrations required. No data silos. Everything ships together.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureGrid.map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 ${item.border} hover:-translate-y-0.5 hover:shadow-lg`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className={`mb-4 inline-flex rounded-xl ${item.iconBg} p-2.5 ${item.iconColor}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold leading-snug">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              How it works
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From list to inbox in five steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Every blast follows the same safe, repeatable process.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <ol className="space-y-0">
                {workflowSteps.map((item, i) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-2 ring-primary/20">
                        {item.step}
                      </div>
                      {i < workflowSteps.length - 1 && <div className="my-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-6 pt-1">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex-1 rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-emerald-500/5 p-7 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <Flame className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">Warm-up protects every blast</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Warm-up runs continuously on every connected inbox, so large sends have a trusted domain
                  behind them instead of a cold one.
                </p>
                <Link
                  href="/features/deliverability-warmup"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Learn about our warm-up <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Clock className="mb-3 h-6 w-6 text-amber-500" />
                <h4 className="font-semibold">Automatic send pacing</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Blasts are paced and distributed across inboxes automatically — no manual throttling required
                  to stay within safe sending limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Why EmaReach
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Basic blast tools vs. EmaReach
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Sending a blast is easy. Sending one that lands and converts takes more than a &quot;send to all&quot; button.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/40 px-4 py-3.5 text-sm font-semibold sm:px-6">
              <span className="text-muted-foreground">Capability</span>
              <span className="text-center text-muted-foreground">Basic blast tools</span>
              <span className="text-center text-primary">EmaReach</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 gap-0 border-b border-border px-4 py-4 text-sm last:border-0 sm:px-6"
              >
                <span className="font-medium text-foreground">{row.label}</span>
                <span className="text-center text-muted-foreground">{row.separate}</span>
                <span className="text-center font-medium text-foreground">{row.emareach}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
              Who it&apos;s for
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for anyone sending to a large list at once
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {teamCards.map((item) => (
              <article
                key={item.team}
                className="flex gap-5 rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.team}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.result}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border/60 bg-muted/20 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore features</p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/features/deliverability-warmup", label: "Deliverability & warm-up" },
                { href: "/features/analytics-reporting", label: "Analytics & reporting" },
                { href: "/features/ai-writing-personalization", label: "AI writing & personalization" },
                { href: "/email-list-cleaner-tool", label: "Email list cleaner" },
                { href: "/email-marketing-tool", label: "Email marketing tool" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturesTestimonials />

      <MidPageCta />

      {/* ── FAQ ── */}
      <section className="border-y border-border bg-muted/15 py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">FAQ</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Email blast software questions — answered
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to know about sending bulk email with EmaReach.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full rounded-2xl border border-border bg-card px-4 shadow-sm sm:px-6">
            {faqItems.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border/80">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-violet-500/8 blur-3xl" />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Send your next blast safely
            </span>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Email blast software that{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              protects what it sends
            </span>
          </h2>

          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            Segment your list, write with AI, and send across rotating warmed inboxes — all tracked live,
            all in one platform.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground/90 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              View pricing
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Bulk sending + segmentation + warm-up — one plan.
          </p>
        </div>
      </section>

      <FeaturesCta />
    </div>
  );
}
