import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Clock,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import type { ComparisonData } from "@/lib/comparisons-data";

type ComparisonDetailPageProps = {
  comparison: ComparisonData;
};

export function ComparisonDetailPage({ comparison }: ComparisonDetailPageProps) {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Grid dot background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-violet-500/4 to-transparent pointer-events-none" />
        <div className="absolute -top-40 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-primary/6 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-8 font-medium">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link href="/comparisons" className="hover:text-foreground transition-colors">Comparisons</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-foreground/70">EmaReach vs {comparison.competitor}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-16 items-start">
            {/* Left: copy */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider border border-primary/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Head-to-head comparison
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black tracking-tight leading-[1.04] mb-5">
                EmaReach vs{" "}
                <span
                  style={{
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {comparison.competitor}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {comparison.heroSubtitle}
              </p>

              {/* Ideal for / edge */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Best for</p>
                  <p className="text-sm text-foreground leading-relaxed font-medium">{comparison.idealFor}</p>
                </div>
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">EmaReach edge</p>
                  <p className="text-sm text-foreground leading-relaxed font-medium">{comparison.edge}</p>
                </div>
              </div>

              {/* CTAs */}
              <MarketingCtaButtons
                primary={{ href: "/book-demo", label: "Book a live demo" }}
                trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
              />

              {/* Trust micro-copy */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  14-day free trial
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  Live in under 10 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  Cancel anytime
                </span>
              </div>
            </div>

            {/* Right: stats card */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-7 shadow-xl shadow-black/5">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-bold text-foreground">EmaReach results</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {comparison.keyMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl bg-gradient-to-br from-primary/8 to-primary/3 border border-primary/15 p-4 text-center"
                    >
                      <p className="text-2xl font-black text-foreground mb-1 leading-none">{metric.value}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-border space-y-3">
                  <MarketingCtaButtons
                    layout="stack"
                    size="sm"
                    trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
                    className="w-full [&_a]:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              Common frustrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Why teams leave {comparison.competitor}
            </h2>
            <p className="text-muted-foreground text-lg">
              These are the friction points teams cite most when they start evaluating alternatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparison.painPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-amber-200/60 dark:border-amber-500/20 bg-amber-50/60 dark:bg-amber-500/5 p-5 hover:border-amber-300/80 dark:hover:border-amber-500/40 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          {/* Transition statement */}
          <div className="mt-10 text-center">
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              EmaReach is built specifically to eliminate these gaps — not as an add-on, but as the core architecture.
            </p>
          </div>
        </div>
      </section>

      {/* ── HEAD-TO-HEAD TABLE ────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              Head-to-head
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Feature-by-feature breakdown</h2>
            <p className="text-muted-foreground text-lg">
              A practical look at what each platform actually delivers — and where the gaps are.
            </p>
          </div>

          <div className="rounded-3xl border border-border overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-12 border-b border-border bg-muted/40">
              <div className="col-span-4 p-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Capability
              </div>
              <div className="col-span-4 p-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg gradient-primary">
                  <Zap className="w-3.5 h-3.5 text-primary-foreground" />
                  <span className="text-xs font-black text-primary-foreground uppercase tracking-wider">EmaReach</span>
                </div>
              </div>
              <div className="col-span-4 p-4">
                <span className="text-sm font-bold text-muted-foreground">{comparison.competitor}</span>
              </div>
            </div>

            {comparison.scorecards.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-12 border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors duration-150 ${
                  i % 2 === 0 ? "" : "bg-muted/10"
                }`}
              >
                <div className="col-span-4 p-4 flex items-start">
                  <span className="text-sm font-bold text-foreground">{row.label}</span>
                </div>
                <div className="col-span-4 p-4 border-l border-primary/10 bg-primary/2">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-green-600" />
                    </div>
                    <span className="text-sm text-foreground/85 leading-relaxed">{row.emareach}</span>
                  </div>
                </div>
                <div className="col-span-4 p-4 border-l border-border">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-2.5 h-2.5 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{row.competitor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Based on publicly available product documentation and customer-reported feature gaps as of 2025.
          </p>
        </div>
      </section>

      {/* ── STRENGTHS VS ADVANTAGES ───────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border bg-muted/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Honest assessment</h2>
            <p className="text-muted-foreground text-lg">
              We respect what {comparison.competitor} built. Here is where the two platforms genuinely differ.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Competitor strengths */}
            <article className="rounded-3xl border border-border bg-card p-7 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Target className="w-5 h-5 text-foreground/60" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground">{comparison.competitor} profile</h3>
                  <p className="text-xs text-muted-foreground">Where it genuinely excels</p>
                </div>
              </div>
              <ul className="space-y-4">
                {comparison.strengths.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* EmaReach advantages */}
            <article className="rounded-3xl border-2 border-primary/25 bg-gradient-to-br from-primary/5 to-transparent p-7 lg:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6 relative">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-foreground">Why teams choose EmaReach</h3>
                  <p className="text-xs text-muted-foreground">The key differences that move the needle</p>
                </div>
              </div>
              <ul className="space-y-4 relative">
                {comparison.advantages.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-foreground/85 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ─────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
                <Users className="w-3.5 h-3.5" />
                Ideal customers
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-5">
                Who gets the most from EmaReach
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                EmaReach is purpose-built for revenue teams that have outgrown standalone warm-up tools and need a platform that connects deliverability directly to pipeline outcomes.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Users,
                    label: "Sales-led startups",
                    description: "Founders and SDRs building outbound from scratch who need warm-up, campaigns, and replies in one place.",
                  },
                  {
                    icon: TrendingUp,
                    label: "Scale-up revenue teams",
                    description: "Teams managing 5–50+ mailboxes that need centralized control, performance analytics, and rep workflows.",
                  },
                  {
                    icon: Mail,
                    label: "Agency & multi-client operators",
                    description: "Agencies managing outbound for multiple clients who need isolated workspaces and unified reporting.",
                  },
                ].map((persona) => (
                  <div key={persona.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <persona.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground mb-1">{persona.label}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{persona.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social proof / quote block */}
            <div className="space-y-4">
              <div className="rounded-3xl border border-border bg-card p-7 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl text-primary/10 font-black leading-none select-none">"</div>
                <p className="text-foreground/90 leading-relaxed mb-5 text-base">
                  "We were using {comparison.competitor} for warm-up and three other tools for campaigns, replies, and reporting. EmaReach replaced all four. Our positive reply rate went up 2.8× within six weeks."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-bold">JM</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">James M.</p>
                    <p className="text-xs text-muted-foreground">Head of Growth, B2B SaaS</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl text-primary/10 font-black leading-none select-none">"</div>
                <p className="text-foreground/90 leading-relaxed mb-5 text-base">
                  "The reply intelligence alone paid for the subscription. Positive replies used to sit unread for hours. Now they hit Slack and Salesforce in seconds."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-bold">SR</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Sarah R.</p>
                    <p className="text-xs text-muted-foreground">VP Sales, Series A startup</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Average migration time: under 48 hours</p>
                  <p className="text-xs text-muted-foreground mt-0.5">From first login to first campaign running in EmaReach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MIGRATION GUIDE ───────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border bg-muted/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <Clock className="w-3.5 h-3.5" />
              Migration playbook
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              From {comparison.competitor} to EmaReach in 4 steps
            </h2>
            <p className="text-muted-foreground text-lg">
              No forced downtime. No risky cutover. Most teams complete this in under 48 hours.
            </p>
          </div>

          <div className="relative">
            {/* Connector line on desktop */}
            <div className="hidden lg:block absolute top-9 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {comparison.migrationSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center font-black text-sm mb-5 shadow-lg shadow-primary/25">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-black text-base text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <MarketingCtaButtons
              primary={{ href: "/book-demo", label: "Book a demo" }}
              trackLabels={{ primary: "book_demo", secondary: "comparisons_start_trial" }}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Questions teams ask before switching
            </h2>
            <p className="text-muted-foreground text-lg">
              Straight answers to the objections we hear most often.
            </p>
          </div>

          <div className="space-y-3">
            {comparison.faq.map((item, i) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-card overflow-hidden"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer p-6 font-bold text-foreground hover:bg-muted/30 transition-colors duration-150 list-none">
                  <span>{item.question}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-open:rotate-90 transition-transform duration-200" />
                </summary>
                <div className="px-6 pb-6 pt-1 border-t border-border/50">
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-border relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-violet-500/8 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.2]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary text-[11px] font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3.5 h-3.5" />
            Make the switch
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.04] mb-5">
            {comparison.ctaTitle}
          </h2>

          <p className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {comparison.ctaBody}
          </p>

          <MarketingCtaButtons
            size="lg"
            primary={{ href: "/book-demo", label: "Talk to the team" }}
            trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            className="mb-8"
          />

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" />
              14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" />
              Export your data anytime
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" />
              Cancel any time
            </span>
          </div>

          {/* Bottom comparison link */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              Evaluating other alternatives too?
            </p>
            <Link
              href="/comparisons"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4"
            >
              View all comparisons
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
