import type { Metadata } from "next";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, ChevronRight, Mail, Sparkles, TrendingUp, Trophy, Users, Zap } from "lucide-react";
import { comparisonsData } from "@/lib/comparisons-data";

export const metadata: Metadata = {
  title: "EmaReach vs Competitors — Full Comparison Hub | EmaReach",
  description:
    "Compare EmaReach with Mailreach, Lemwarm, Warmbox, Folderly, and 9 more. Honest, feature-by-feature breakdowns for teams choosing a modern outbound platform.",
  keywords:
    "EmaReach comparison, EmaReach vs Mailreach, EmaReach vs Lemwarm, warmup tool alternatives, cold email platform comparison 2025",
};

const stats = [
  { value: "13", label: "Live comparisons" },
  { value: "3.2×", label: "Avg reply rate lift" },
  { value: "87%", label: "Teams replace 3+ tools" },
  { value: "10 min", label: "Time to first campaign" },
];

const benefits = [
  {
    icon: Mail,
    title: "Deliverability built in",
    description: "AI-driven warm-up with adaptive limits and real-time reputation guardrails — no separate tool needed.",
  },
  {
    icon: TrendingUp,
    title: "Outbound engine included",
    description: "Full sequencing, A/B testing, and multi-step cadences without bolting on a separate cold email tool.",
  },
  {
    icon: BarChart3,
    title: "Revenue-level analytics",
    description: "Connect first touch to replies, meetings booked, and pipeline — not just open rates and sender scores.",
  },
  {
    icon: Users,
    title: "Built for teams",
    description: "Role-based access, shared reply workflows, and CRM integrations designed for how revenue teams actually operate.",
  },
];

export default function ComparisonsPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-14 lg:pt-24 lg:pb-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-violet-500/4 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-primary/6 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                Comparison hub
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-[11px] font-bold text-foreground/70 uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                13 live head-to-head pages
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.04] mb-6">
              Compare tools.{" "}
              <span
                style={{
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Choose the modern stack.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Honest, feature-by-feature comparisons between EmaReach and the most popular warm-up and deliverability tools — focused on what actually drives meetings, pipeline, and revenue.
            </p>

            <MarketingCtaButtons
              primary={{ href: "/book-demo", label: "Book a demo" }}
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/20 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:px-6">
                <p className="text-3xl font-black text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON CARDS ─────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">Pick your comparison</h2>
            <p className="text-muted-foreground">
              Each page is a full breakdown — features, pain points, migration guide, and honest assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {comparisonsData.map((item) => (
              <article
                key={item.slug}
                className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/35 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                {/* Top accent bar */}
                <div className="h-1 gradient-primary" />

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                      <Zap className="w-3 h-3" />
                      Head-to-head
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150 shrink-0 mt-0.5" />
                  </div>

                  <h2 className="text-lg font-black mb-2 group-hover:text-primary transition-colors duration-200">
                    {item.pageTitle}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.shortTagline}
                  </p>

                  <div className="border-t border-border pt-4 mb-5">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-bold text-foreground/80">Best for: </span>
                      {item.idealFor}
                    </p>
                  </div>

                  {/* Mini feature list */}
                  <div className="space-y-2 mb-6">
                    {["Warm-up + campaigns", "AI personalization", "Reply intelligence"].map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="text-xs text-muted-foreground">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/comparisons/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4"
                  >
                    View full comparison
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EMAREACH ─────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-t border-border bg-muted/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Why EmaReach
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              One platform. The whole stack.
            </h2>
            <p className="text-muted-foreground text-lg">
              Most warm-up tools stop at inbox placement. EmaReach connects deliverability to the rest of your outbound motion — so the same platform that protects your sender score also helps you book meetings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-black text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-violet-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3.5 h-3.5" />
            Ready to switch?
          </span>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-5">
            Stop piecing tools together.{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Ship pipeline instead.
            </span>
          </h2>

          <p className="text-muted-foreground text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            EmaReach replaces your warm-up tool, cold email sender, AI writing tool, and reply inbox — with one platform that tracks the whole journey from first send to booked meeting.
          </p>

          <MarketingCtaButtons
            size="lg"
            primary={{ href: "/book-demo", label: "Talk to the team" }}
            trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
          />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" /> Live in under 10 minutes</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" /> Cancel anytime</span>
          </div>
        </div>
      </section>
    </div>
  );
}
