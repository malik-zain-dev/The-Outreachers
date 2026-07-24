import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Flame,
  Inbox,
  Lock,
  MailCheck,
  MessageSquare,
  RefreshCw,
  Send,
  ShieldCheck,
  ShieldOff,
  Sparkles,
  TrendingUp,
  Users,
  Users2,
  X,
  Zap,
} from "lucide-react";

const instantlyComplaints = [
  {
    title: "Closed-loop warmup pool",
    body: "Instantly's warmup network sends emails between 200,000+ strangers' inboxes. Gmail and Outlook have already fingerprinted the pattern. You're not building reputation — you're sharing risk with everyone else on the platform.",
    icon: RefreshCw,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
  {
    title: "Pool contamination risk",
    body: "When one sender in Instantly's pool gets flagged, ESP algorithms score the whole cluster. Your inbox can inherit reputation damage from thousands of senders you've never heard of.",
    icon: ShieldOff,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    title: "Warmup stops when you cancel",
    body: "Any 'reputation' built inside Instantly's network evaporates the moment you stop paying. It never belonged to your domain — it belonged to their platform.",
    icon: Lock,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    title: "Reply management is a mess",
    body: "Hot leads show up in your Gmail, not Instantly. You're manually forwarding replies, missing follow-up windows, and piecing together intent signals from multiple inboxes.",
    icon: Inbox,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "AI writing feels bolted on",
    body: "Instantly's AI writing is a thin layer on top of sequences. Personalization options are limited and you often end up copy-pasting from ChatGPT anyway — another tool in the stack.",
    icon: Sparkles,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Pricing scales against you",
    body: "As you add inboxes, contacts, and seats, Instantly's bill climbs fast. Add a separate warmup tool plus an AI writer and you're paying $300–$500/mo for a stack that still doesn't talk to itself.",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

const featureTable: { label: string; emareach: string; instantly: string; emareachWins: boolean }[] = [
  {
    label: "Email warm-up",
    emareach: "Real inbox network — genuine opens, replies, threads",
    instantly: "Closed-loop pool (200K+ shared inboxes)",
    emareachWins: true,
  },
  {
    label: "Pool contamination risk",
    emareach: "None — your domain, your signals only",
    instantly: "High — shared pool across all users",
    emareachWins: true,
  },
  {
    label: "Warmup after cancellation",
    emareach: "Reputation stays with your domain",
    instantly: "Stops immediately on cancel",
    emareachWins: true,
  },
  {
    label: "AI email writing",
    emareach: "Native — generates full emails from prospect data",
    instantly: "Basic AI, often needs external tools",
    emareachWins: true,
  },
  {
    label: "Reply inbox",
    emareach: "Unified inbox — all replies in one place",
    instantly: "Replies land in Gmail, not the platform",
    emareachWins: true,
  },
  {
    label: "Campaign sequences",
    emareach: "Multi-step with conditions and auto-pause on reply",
    instantly: "Multi-step sequences",
    emareachWins: false,
  },
  {
    label: "Domain health monitoring",
    emareach: "Per-domain health, warnings, ramp controls",
    instantly: "Basic sender score dashboard",
    emareachWins: true,
  },
  {
    label: "Smart lead detection",
    emareach: "Flags risky emails before they enter campaigns",
    instantly: "Manual list cleaning required",
    emareachWins: true,
  },
  {
    label: "Platform pricing model",
    emareach: "One plan — warmup, campaigns, AI all included",
    instantly: "Stacked add-ons as you scale",
    emareachWins: true,
  },
];

const migrationSteps = [
  {
    step: "01",
    title: "Export your Instantly data",
    body: "Download your prospect lists, sequences, and templates from Instantly. EmaReach accepts standard CSV imports — no custom format required.",
  },
  {
    step: "02",
    title: "Connect your inboxes",
    body: "Add your Gmail or SMTP inboxes. EmaReach detects your domain setup and starts warm-up automatically — your existing domain history carries over.",
  },
  {
    step: "03",
    title: "Import contacts & rebuild sequences",
    body: "Upload your prospect lists and recreate your sequences in the EmaReach campaign editor. Use AI Write to improve your copy in the process.",
  },
  {
    step: "04",
    title: "Go live — warmup keeps running",
    body: "Launch campaigns while EmaReach's real inbox warm-up runs in the background. No tool switching. No manual sync. Monitor everything from one dashboard.",
  },
];

const testimonials = [
  {
    quote:
      "We were burning domains on Instantly's warmup pool without knowing it. Switched to EmaReach and our inbox placement went from 40% to over 80% in three weeks.",
    name: "Daniel K.",
    role: "Head of Sales, B2B SaaS",
    initials: "DK",
  },
  {
    quote:
      "The hidden cost of Instantly was insane — warmup tool, AI writer, reply management, all separate. EmaReach is one bill, one login, and actually works.",
    name: "Maria L.",
    role: "Founder, Growth Agency",
    initials: "ML",
  },
  {
    quote:
      "Positive replies used to disappear into Gmail. EmaReach's unified inbox means we catch every warm lead the same day it lands.",
    name: "Tom R.",
    role: "VP Outbound, Series B startup",
    initials: "TR",
  },
];

const faqItems = [
  {
    q: "Why are people looking for an Instantly alternative?",
    a: "The most common reasons: Instantly's warmup network is a closed pool of 200,000+ shared inboxes — a pattern Gmail and Outlook have already fingerprinted. Teams also cite reply management gaps (replies land in Gmail, not the platform), AI writing that feels bolted on, and pricing that compounds as you scale inboxes and seats.",
  },
  {
    q: "Is EmaReach a direct Instantly alternative?",
    a: "Yes. EmaReach covers everything Instantly does — multi-step campaign sequences, multi-inbox rotation, A/B testing, and analytics — plus adds built-in real-network warm-up, a unified reply inbox, native AI writing from prospect data, and smart lead detection. It's a complete replacement, not a partial one.",
  },
  {
    q: "How is EmaReach's warmup different from Instantly's?",
    a: "Instantly uses a closed-loop pool: automated scripts email between strangers' inboxes on the same platform. EmaReach's warm-up uses a real inbox network — genuine opens, replies, and natural threads from real people. This creates engagement signals that ESP algorithms interpret as authentic, not automated pool behavior.",
  },
  {
    q: "Will switching to EmaReach hurt my current deliverability?",
    a: "No. Your domain reputation is tied to your domain, not to Instantly. Moving your inboxes to EmaReach doesn't reset any reputation — it starts building it cleanly from day one, away from Instantly's shared pool risk. If you've already experienced pool contamination, EmaReach's warmup helps rehabilitate it.",
  },
  {
    q: "How long does migration from Instantly take?",
    a: "Most teams complete the migration in under 48 hours. Export your lists from Instantly (CSV), connect inboxes to EmaReach, import contacts, and rebuild sequences in the campaign editor — the AI writing assistant speeds up that last step significantly.",
  },
  {
    q: "Is EmaReach more expensive than Instantly?",
    a: "EmaReach includes warmup, campaigns, AI writing, and reply inbox under one plan. Instantly typically requires add-ons or separate tools for full feature parity. Teams that switch usually reduce their total outbound stack cost by 30–60%.",
  },
  {
    q: "Can I run campaigns on EmaReach while I'm still on Instantly?",
    a: "Yes. You can run EmaReach in parallel with Instantly during transition — start with a subset of inboxes, validate results, then fully migrate. There is no lock-in period and no data portability restriction.",
  },
  {
    q: "Does EmaReach support the same inboxes as Instantly?",
    a: "EmaReach supports Gmail, Google Workspace, and all SMTP-compatible inboxes — the same inbox types Instantly supports. Multi-inbox rotation and per-inbox daily caps work the same way.",
  },
];

const emareachWins = [
  "Real inbox warm-up — no shared pool, no contamination risk",
  "Unified reply inbox — catch every hot lead the same day",
  "Native AI writing from prospect data — no third tool needed",
  "Smart lead detection — risky emails flagged before send",
  "Domain health monitoring with per-inbox ramp controls",
  "One plan — warmup + campaigns + AI included",
  "Reputation stays with your domain after you cancel",
];

export function InstantlyAlternativePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-violet-500/4 to-transparent" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[800px] w-[800px] rounded-full bg-gradient-to-bl from-primary/6 to-transparent blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="text-foreground/70">Instantly Alternative</span>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-[1fr_400px] xl:gap-16">
            {/* Left: copy */}
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <Zap className="h-3.5 w-3.5" />
                  Instantly alternative
                </span>
              </div>

              <h1 className="mb-5 text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
                The best{" "}
                <span
                  style={{
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  Instantly alternative
                </span>{" "}
                for cold email
              </h1>

              <p className="mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                If you&apos;re searching for an Instantly alternative, you&apos;re probably dealing with one of these: closed-loop warmup that ESPs have already flagged, replies disappearing into Gmail, or a tool stack that keeps getting more expensive.
              </p>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground">
                EmaReach fixes all three — real inbox warm-up, unified reply management, and AI writing native to the platform. One subscription. No stacking.
              </p>

              <div className="mb-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Most common reason to switch</p>
                  <p className="text-sm font-medium leading-relaxed text-foreground">Instantly&apos;s warmup pool is shared with 200K+ strangers — and Gmail has fingerprinted it.</p>
                </div>
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">EmaReach difference</p>
                  <p className="text-sm font-medium leading-relaxed text-foreground">Real inbox network. Your domain, your signals. Reputation stays with you after you cancel.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book-demo"
                  className="gradient-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-200 hover:brightness-110 active:brightness-95"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border px-8 py-4 text-sm font-bold text-foreground/90 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                >
                Try for Free
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                {["14-day free trial", "No credit card required", "Live in under 10 minutes", "Cancel anytime"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-green-500" />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: sticky scorecard */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-border bg-card/60 p-7 shadow-xl shadow-black/5 backdrop-blur-sm">
                <div className="mb-5 flex items-center gap-2">
                  <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-xl">
                    <TrendingUp className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-bold text-foreground">Why teams switch to EmaReach</p>
                </div>

                <ul className="space-y-3">
                  {emareachWins.map((win) => (
                    <li key={win} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/15">
                        <Check className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="text-foreground/85 leading-relaxed">{win}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border pt-5">
                  <Link
                    href="/book-demo"
                    className="gradient-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-primary-foreground transition-all duration-200 hover:brightness-110"
                  >
                    Book a demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PEOPLE LEAVE INSTANTLY ── */}
      <section className="border-y border-border bg-muted/20 py-14 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              Why teams leave Instantly
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              The real reasons people search for an Instantly alternative
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              These aren&apos;t edge cases. They&apos;re the friction points that show up in every migration conversation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {instantlyComplaints.map((item) => (
              <article
                key={item.title}
                className={`flex items-start gap-4 rounded-2xl border ${item.border} bg-card p-5 transition-colors duration-200 hover:shadow-md`}
              >
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div>
                  <h3 className="mb-1.5 text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            EmaReach is built specifically to eliminate each of these — not as bolt-on features, but as core architecture.
          </p>
        </div>
      </section>

      {/* ── FEATURE TABLE ── */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
              <BarChart3 className="h-3.5 w-3.5" />
              Head-to-head
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              EmaReach vs Instantly — feature by feature
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A practical comparison based on what teams actually care about when switching platforms.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-12 border-b border-border bg-muted/40">
              <div className="col-span-4 p-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Capability
              </div>
              <div className="col-span-4 p-4">
                <div className="gradient-primary inline-flex items-center gap-2 rounded-lg px-3 py-1.5">
                  <Zap className="h-3.5 w-3.5 text-primary-foreground" />
                  <span className="text-xs font-black uppercase tracking-wider text-primary-foreground">EmaReach</span>
                </div>
              </div>
              <div className="col-span-4 p-4">
                <span className="text-sm font-bold text-muted-foreground">Instantly</span>
              </div>
            </div>

            {featureTable.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-12 border-b border-border last:border-b-0 transition-colors duration-150 hover:bg-muted/20 ${i % 2 === 0 ? "" : "bg-muted/10"}`}
              >
                <div className="col-span-4 flex items-start p-4">
                  <span className="text-sm font-bold text-foreground">{row.label}</span>
                </div>
                <div className="col-span-4 border-l border-primary/10 bg-primary/[0.02] p-4">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/15">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-sm leading-relaxed text-foreground/85">{row.emareach}</span>
                  </div>
                </div>
                <div className="col-span-4 border-l border-border p-4">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted">
                      {row.emareachWins ? (
                        <X className="h-2.5 w-2.5 text-muted-foreground" />
                      ) : (
                        <Check className="h-2.5 w-2.5 text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-sm leading-relaxed text-muted-foreground">{row.instantly}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Based on publicly available product documentation and customer-reported gaps.
          </p>
        </div>
      </section>

      {/* ── THE WARMUP TRAP CALLOUT ── */}
      <section className="border-y border-destructive/20 bg-gradient-to-r from-destructive/5 via-orange-500/5 to-amber-500/5 py-6">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3 sm:items-center">
              <div className="mt-0.5 flex-shrink-0 rounded-lg bg-destructive/15 p-2 sm:mt-0">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  The full story on why Instantly&apos;s warmup pool is a closed-loop trap
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  How shared pools get fingerprinted by Gmail and Outlook — and what real warmup looks like.
                </p>
              </div>
            </div>
            <Link
              href="/the-warmup-trap"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-5 py-2.5 text-sm font-semibold text-destructive transition-all duration-200 hover:border-destructive/50 hover:bg-destructive/20"
            >
              Read the breakdown
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET WITH EMAREACH ── */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              What you get instead
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              EmaReach: the Instantly alternative built on real deliverability
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Large left card */}
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-emerald-500/5 p-8 shadow-sm lg:col-span-7 lg:min-h-[300px]">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  <Flame className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black">Real inbox warm-up. Not a pool of strangers.</h3>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  EmaReach&apos;s warmup uses a real inbox network to generate genuine opens, replies, and threads. No
                  closed loops. No shared risk. Your domain builds reputation through behavior that inbox providers
                  can&apos;t fingerprint as synthetic — because it isn&apos;t.
                </p>
              </div>
              <Link
                href="/features/deliverability-warmup"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
              >
                How our warmup works <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Right column: 2 small cards */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <MessageSquare className="mb-3 h-6 w-6 text-violet-500" />
                <h4 className="font-black">Unified reply inbox</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every reply lands in EmaReach — not scattered across 10 Gmail tabs. Mark leads, route to reps, and
                  never miss a warm response again.
                </p>
              </div>
              <div className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Sparkles className="mb-3 h-6 w-6 text-blue-500" />
                <h4 className="font-black">AI writing — native, not bolted on</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Generate personalized first lines and full sequences from prospect data inside the sequence editor. No
                  tab switching, no copy-pasting from ChatGPT.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Send,
                title: "Campaign sequences",
                body: "Multi-step sequences with auto-pause on reply, time-based delays, and A/B subject line testing.",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                icon: ShieldCheck,
                title: "Domain health monitoring",
                body: "Per-inbox warmup progress, low-engagement warnings, and ramp-up tier controls in one view.",
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
              },
              {
                icon: BarChart3,
                title: "Deliverability analytics",
                body: "Open rates, reply rates, and spam placement data per campaign, per inbox, per sequence step.",
                color: "text-amber-500",
                bg: "bg-amber-500/10",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                <div className={`mb-4 inline-flex rounded-xl ${card.bg} p-3`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <h4 className="mb-2 font-black">{card.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="border-y border-border bg-muted/15 py-14 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              What teams say after switching from Instantly
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <article key={t.name} className="relative overflow-hidden rounded-3xl border border-border bg-card p-7">
                <div className="pointer-events-none absolute right-4 top-4 select-none text-6xl font-black leading-none text-primary/8">
                  &ldquo;
                </div>
                <p className="mb-5 text-base leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-full">
                    <span className="text-sm font-bold text-primary-foreground">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MIGRATION GUIDE ── */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
              <Clock className="h-3.5 w-3.5" />
              Migration guide
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Switch from Instantly to EmaReach in 4 steps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No forced downtime. No risky cutover. Most teams are fully live within 48 hours.
            </p>
          </div>

          <div className="relative">
            <div className="absolute hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:top-9 lg:block" style={{ left: "calc(12.5% + 20px)", right: "calc(12.5% + 20px)" }} />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {migrationSteps.map((step) => (
                <article
                  key={step.step}
                  className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="gradient-primary mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black text-primary-foreground shadow-lg shadow-primary/25">
                    {step.step}
                  </div>
                  <h3 className="mb-3 text-base font-black text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl">
              <Clock className="h-4 w-4 text-primary-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Average migration time: <strong className="text-foreground">under 48 hours</strong> from first login to first campaign running
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO IS EMAREACH FOR ── */}
      <section className="border-y border-border bg-muted/15 py-14 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
                <Users className="h-3.5 w-3.5" />
                Who EmaReach is for
              </span>
              <h2 className="mb-5 text-3xl font-black tracking-tight sm:text-4xl">
                The teams that get the most from switching
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                EmaReach is purpose-built for teams that have outgrown single-purpose tools and need warmup, outreach, and
                replies working together — not duct-taped.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Zap,
                    label: "Founders & first SDRs",
                    desc: "Build sender reputation and run campaigns from day one — without a second tool or a second bill.",
                  },
                  {
                    icon: Users2,
                    label: "SDR and RevOps teams",
                    desc: "Centralize inbox health, ramp controls, and reply routing across 5–50+ mailboxes in one platform.",
                  },
                  {
                    icon: BarChart3,
                    label: "Agencies & multi-client ops",
                    desc: "Isolate mailboxes per client, manage warmup health per domain, and report from a unified dashboard.",
                  },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors duration-200 hover:border-primary/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <p.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-bold text-foreground">{p.label}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: key metrics */}
            <div className="space-y-4">
              <div className="rounded-3xl border border-border bg-card p-7">
                <div className="mb-6 flex items-center gap-2">
                  <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-xl">
                    <TrendingUp className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-bold text-foreground">What improves after switching</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "2×+", label: "Inbox placement lift vs pool warmup" },
                    { value: "48h", label: "Average migration time" },
                    { value: "1", label: "Platform for the full stack" },
                    { value: "0", label: "Pool contamination risk" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 to-primary/3 p-4 text-center"
                    >
                      <p className="mb-1 text-2xl font-black leading-none text-foreground">{m.value}</p>
                      <p className="text-[11px] leading-tight text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">Also evaluating other options?</p>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">See how EmaReach stacks up against other platforms too.</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "vs Saleshandy", href: "/comparisons/saleshandy" },
                    { label: "vs Lemwarm", href: "/comparisons/lemwarm" },
                    { label: "vs Mailreach", href: "/comparisons/mailreach" },
                    { label: "All comparisons", href: "/comparisons" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              FAQ
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Instantly alternative — questions answered
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Straight answers to the objections we hear most from teams evaluating EmaReach as their Instantly replacement.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-bold text-foreground transition-colors duration-150 hover:bg-muted/30">
                  <span>{item.q}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <div className="border-t border-border/50 px-6 pb-6 pt-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden border-t border-border py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-violet-500/8 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
            <Zap className="h-3.5 w-3.5" />
            Make the switch today
          </span>

          <h2 className="mb-5 text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            Stop sharing your domain reputation{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              with 200,000 strangers.
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            EmaReach replaces Instantly with real inbox warm-up, unified reply management, and AI writing — all under one
            plan. Your domain. Your signals. Your reputation.
          </p>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-demo"
              className="gradient-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-9 py-4 text-base font-bold text-primary-foreground shadow-2xl shadow-primary/30 transition-all duration-200 hover:brightness-110 active:brightness-95 sm:w-auto"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-border px-9 py-4 text-base font-bold text-foreground/90 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary sm:w-auto"
            >
              Try for Free
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            {["14-day free trial", "No credit card required", "Export your data anytime", "Cancel any time"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green-500" />{t}
              </span>
            ))}
          </div>

          <div className="mt-12 border-t border-border/50 pt-8">
            <p className="mb-4 text-sm text-muted-foreground">Compare EmaReach with other platforms too</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/comparisons" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4">
                View all comparisons <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-border">·</span>
              <Link href="/comparisons/instantly" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
                EmaReach vs Instantly (full head-to-head) <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
