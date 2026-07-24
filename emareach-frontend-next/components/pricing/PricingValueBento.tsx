"use client";

import { Sparkles, Zap, RefreshCw, BarChart3, MessageCircle, Layers } from "lucide-react";

const STATS = [
  { value: "10×", label: "More conversions" },
  { value: "3×", label: "Average campaign ROI" },
  { value: "100%", label: "Personalized emails" },
  { value: "5 min", label: "To first campaign" },
] as const;

const ITEMS = [
  {
    title: "AI Campaign Studio",
    body: "Describe your offer and audience — AI generates your full email sequence, subject lines, and follow-ups in minutes.",
    icon: Sparkles,
  },
  {
    title: "Personalized at scale",
    body: "Every email is uniquely crafted for each contact using AI variations and dynamic fields — at any volume.",
    icon: Zap,
  },
  {
    title: "Automated follow-ups",
    body: "Multi-step sequences run on autopilot. Never lose a lead to a missed follow-up again.",
    icon: RefreshCw,
  },
  {
    title: "Real-time analytics",
    body: "Track campaign performance, conversions, and ROI in one unified dashboard — know exactly what drives revenue.",
    icon: BarChart3,
  },
  {
    title: "Unified reply inbox",
    body: "All campaign responses land in one shared inbox — respond faster, close more deals, never miss a hot lead.",
    icon: MessageCircle,
  },
  {
    title: "One subscription, no add-ons",
    body: "AI writing, sequences, personalization, and analytics — everything your email marketing needs, in one bill.",
    icon: Layers,
  },
] as const;

export function PricingValueBento() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="pricing-value-heading">
      {/* Section header */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Included in every plan</p>
        <h2 id="pricing-value-heading" className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Everything you need to grow with email marketing.
        </h2>
        <p className="mx-auto mt-3 text-lg text-muted-foreground">
          AI campaigns, personalization, automation, and analytics — included on every plan, nothing bolted on later.
        </p>
      </div>

      {/* Stats row */}
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm sm:grid-cols-4 sm:divide-x divide-border/60">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center border-b border-border/60 px-4 py-6 text-center last:border-b-0 sm:border-b-0"
          >
            <span className="text-3xl font-black tabular-nums tracking-tight text-foreground sm:text-4xl">
              {stat.value}
            </span>
            <span className="mt-1.5 text-xs font-medium text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Feature grid — mono accent, quiet cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.15)] hover:-translate-y-0.5"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
