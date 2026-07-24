"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Network,
  Coins,
  Mail,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  BarChart2,
  Globe,
  Star,
  Quote,
  Sparkles,
  DollarSign,
  Lock,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Nav ─────────────��────────────────────────���────────────────────────────
function RYNNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Earnings", href: "#earnings" },
    { label: "FAQ", href: "#faq" },
  ];


  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/rent" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
            <Network className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm leading-tight text-foreground">
            Rent Your<br />Network
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/rent/login">Sign in</Link>
          </Button>
          <Button size="sm" className="shadow-md shadow-primary/20" asChild>
            <Link href="/rent/signup">
              Start earning
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b px-4 pb-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/rent/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/rent/signup">Start earning free</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
const FLOATING_EMAILS = [
  { email: "outreach@growthhq.io", niche: "SaaS", credits: 15, delay: "0s", x: "-left-4 sm:left-0", y: "top-20" },
  { email: "leads@agencypro.com", niche: "Agencies", credits: 12, delay: "1.5s", x: "-right-4 sm:right-0", y: "top-32" },
  { email: "sales@ecomboost.co", niche: "E-commerce", credits: 20, delay: "3s", x: "-left-2 sm:left-8", y: "bottom-24" },
  { email: "hello@b2bsaas.dev", niche: "Startups", credits: 8, delay: "2s", x: "-right-2 sm:right-4", y: "bottom-16" },
];

function FloatingEmailCard({
  email, niche, credits, delay, x, y,
}: { email: string; niche: string; credits: number; delay: string; x: string; y: string }) {
  return (
    <div
      className={cn(
        "absolute hidden lg:flex items-center gap-2.5 bg-card/90 backdrop-blur-sm border rounded-xl px-3 py-2.5 shadow-lg shadow-black/5 animate-float select-none pointer-events-none",
        x, y
      )}
      style={{ animationDelay: delay }}
    >
      <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white shrink-0">
        <Mail className="w-3.5 h-3.5" />
      </div>
      <div>
        <p className="text-xs font-medium text-foreground leading-none">{email}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{niche}</p>
      </div>
      <div className="ml-2 flex items-center gap-0.5 text-amber-500">
        <Coins className="w-3 h-3" />
        <span className="text-xs font-semibold">{credits}</span>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-purple-500/[0.06] blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-amber-400/[0.06] blur-3xl" />
      </div>

      {/* Floating email cards */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block max-w-6xl mx-auto w-full left-1/2 -translate-x-1/2">
        {FLOATING_EMAILS.map((c) => (
          <FloatingEmailCard key={c.email} {...c} />
        ))}
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-card/80 backdrop-blur-sm text-xs font-medium text-muted-foreground mb-6 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        Passive income from your email network
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl animate-slide-up">
        Your emails are{" "}
        <span className="gradient-text">worth more</span>{" "}
        than you think
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-slide-up delay-100">
        List your email accounts, let others rent them for outreach, and earn
        credits with zero ongoing effort. The email marketplace built for
        growth-minded professionals.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 animate-slide-up delay-200">
        <Button size="lg" className="h-12 px-7 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all" asChild>
          <Link href="/rent/signup">
            Start earning free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="h-12 px-7 text-base hover:scale-[1.02] transition-all" asChild>
          <Link href="/rent/signup">
            See how it works
          </Link>
        </Button>
      </div>

      {/* Trust hint */}
      <p className="mt-5 text-xs text-muted-foreground animate-fade-in delay-300 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
        Free to join · No credit card required · Instant setup
      </p>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "3,400+", label: "Emails listed" },
  { value: "18K+", label: "Credits earned" },
  { value: "850+", label: "Active renters" },
  { value: "99.9%", label: "Uptime" },
];

function StatsSection() {
  return (
    <section className="py-12 border-y bg-[hsl(var(--marketing-band))]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold gradient-text">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ──────────────────────────────────────────────────────────
const EARNER_STEPS = [
  {
    icon: Mail,
    title: "List your emails",
    desc: "Add any email account you own — set your niche, description, and credits per use.",
  },
  {
    icon: Globe,
    title: "Go live in seconds",
    desc: "Your listing appears on the marketplace instantly. Pause or adjust anytime.",
  },
  {
    icon: Coins,
    title: "Earn while you sleep",
    desc: "Every time someone rents your email, credits land in your account automatically.",
  },
];

const RENTER_STEPS = [
  {
    icon: Users,
    title: "Browse the marketplace",
    desc: "Filter by niche, domain, or cost. Find the perfect email for your outreach.",
  },
  {
    icon: Zap,
    title: "Rent in one click",
    desc: "Spend credits to access any listing. No contracts, no minimums.",
  },
  {
    icon: TrendingUp,
    title: "Supercharge your reach",
    desc: "Use rented accounts to diversify your sending and improve deliverability.",
  },
];

function HowItWorksSection() {
  const [tab, setTab] = useState<"earn" | "rent">("earn");
  const steps = tab === "earn" ? EARNER_STEPS : RENTER_STEPS;

  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Two ways to use the network</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Whether you want to earn passively or expand your outreach, we&apos;ve got you covered.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted p-1 rounded-xl gap-1">
            <button
              onClick={() => setTab("earn")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                tab === "earn"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Coins className="w-4 h-4 inline mr-2 -mt-0.5" />
              For earners
            </button>
            <button
              onClick={() => setTab("rent")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                tab === "rent"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ShoppingBagIcon className="w-4 h-4 inline mr-2 -mt-0.5" />
              For renters
            </button>
          </div>
        </div>

        {/* Steps: circles row + cards in one relative container so alignment is guaranteed */}
        <div className="relative">
          {/* Single continuous line from circle-1 center to circle-3 center */}
          <div
            className="hidden md:block absolute h-px bg-gradient-to-r from-primary/50 via-primary/25 to-primary/50 pointer-events-none"
            style={{ top: 16, left: "calc(100% / 6)", right: "calc(100% / 6)" }}
          />

          {/* Circles row — grid-cols-3 (no gap) so each cell is exactly 1/3 wide */}
          <div className="hidden md:grid grid-cols-3 mb-5">
            {steps.map(({ title }, i) => (
              <div key={title} className="flex justify-center">
                <div className="relative z-10 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary/25">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="relative rounded-2xl border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-md shadow-primary/20">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="absolute top-4 right-4 text-3xl font-black text-muted/20 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// tiny inline icon to avoid import collision
function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// ─── Features ────────────────────────────────────────────────────────��─────
const FEATURES = [
  {
    icon: Zap,
    title: "Instant setup",
    desc: "Add an email and go live in under 60 seconds. No verification delays, no waiting.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    icon: Coins,
    title: "Passive credit income",
    desc: "Set your price, forget about it. Credits accumulate every time your email is rented.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: Lock,
    title: "You stay in control",
    desc: "Pause, resume, or remove any listing at any time. Your data, your rules.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    icon: Globe,
    title: "Niche-filtered marketplace",
    desc: "SaaS, agencies, e-commerce — renters find exactly what they need by industry.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/40",
  },
  {
    icon: BarChart2,
    title: "Full earnings dashboard",
    desc: "Track every rental, view your transaction history, and monitor your credit balance.",
    color: "text-primary",
    bg: "bg-primary/5",
  },
  {
    icon: RefreshCcw,
    title: "Spend or save credits",
    desc: "Use earned credits to rent other emails, or simply build your balance over time.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/40",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 bg-[hsl(var(--marketing-band))]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to earn
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Built for professionals who want to monetize their email reputation without the hassle.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="rounded-2xl border bg-card p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-primary/20 transition-all duration-300 group cursor-default"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", bg)}>
                <Icon className={cn("w-5 h-5", color)} />
              </div>
              <h3 className="font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Earnings Calculator ─────────────────────────��──────────────────────────
function EarningsSection() {
  const [emails, setEmails] = useState(3);
  const [dailyLimit, setDailyLimit] = useState(10);

  // 1 credit per use, dailyLimit uses/day, 30 days/month
  const perEmailMonthly = dailyLimit * 30;
  const monthly = emails * perEmailMonthly;

  return (
    <section id="earnings" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Earnings potential</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">See what you could earn</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Every email earns <strong>1 credit</strong> each time it&apos;s used in warmup — up to your daily limit. Adjust to estimate your monthly credits.
          </p>
        </div>

        <div className="rounded-3xl border bg-card overflow-hidden shadow-xl shadow-black/5">
          <div className="grid md:grid-cols-2">
            {/* Sliders */}
            <div className="p-8 space-y-8 border-b md:border-b-0 md:border-r">
              {/* Emails listed */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Emails listed</label>
                  <span className="text-sm font-bold text-primary">{emails}</span>
                </div>
                <input
                  type="range" min={1} max={20} step={1} value={emails}
                  onChange={(e) => setEmails(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>1</span><span>20</span>
                </div>
              </div>

              {/* Daily limit per email */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Daily limit per email</label>
                  <span className="text-sm font-bold text-primary">{dailyLimit} / day</span>
                </div>
                <input
                  type="range" min={1} max={20} step={1} value={dailyLimit}
                  onChange={(e) => setDailyLimit(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>1</span><span>20 (max)</span>
                </div>
              </div>

              {/* Fixed credit badge */}
              <div className="flex items-center gap-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-4 py-3">
                <span className="text-xl">🪙</span>
                <div className="text-sm">
                  <span className="font-semibold text-amber-700 dark:text-amber-300">1 credit</span>
                  <span className="text-muted-foreground"> earned per warmup use — fixed rate, no guessing.</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/5 to-purple-500/5 space-y-4">
              <p className="text-sm text-muted-foreground font-medium">Estimated monthly credits</p>
              <div className="relative">
                <p className="text-6xl font-black gradient-text tabular-nums">{monthly.toLocaleString()}</p>
                <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-amber-400 animate-float" />
              </div>
              <p className="text-xs text-muted-foreground">
                {emails} email{emails !== 1 ? "s" : ""} × {dailyLimit}/day × 30 days × 1 credit
              </p>
              <div className="grid grid-cols-3 gap-3 w-full mt-2">
                {[
                  { label: "Emails", val: emails },
                  { label: "Uses/day each", val: dailyLimit },
                  { label: "Per use", val: "1 cr" },
                ].map(({ label, val }) => (
                  <div key={label} className="rounded-xl bg-card border p-2 text-center">
                    <p className="text-lg font-bold">{val}</p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full" asChild>
                <Link href="/rent/signup">
                  Start earning now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────���─────────────────────────────
const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Founder, SalesPilot",
    initials: "AM",
    color: "from-blue-500 to-cyan-400",
    quote:
      "Listed 8 of my warmed-up inboxes and started earning credits within the first day. The setup was literally 3 minutes. This is the most passive thing I've ever done.",
    rating: 5,
  },
  {
    name: "Sofia Reyes",
    role: "Growth Lead, Launchpad Agency",
    initials: "SR",
    color: "from-purple-500 to-pink-400",
    quote:
      "We rent emails from the marketplace to diversify our cold outreach. Our reply rates went up because we're not over-relying on the same sending domains.",
    rating: 5,
  },
  {
    name: "Tom Wills",
    role: "B2B Sales Consultant",
    initials: "TW",
    color: "from-emerald-500 to-teal-400",
    quote:
      "I had a bunch of old business email accounts sitting idle. Now they generate credits for me every month. The credits marketplace idea is genuinely clever.",
    rating: 5,
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-[hsl(var(--marketing-band))]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Loved by earners & renters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ name, role, initials, color, quote, rating }) => (
            <div
              key={name}
              className="rounded-2xl border bg-card p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-primary/30" />
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">{quote}</p>
              <div className="flex items-center gap-3 pt-2 border-t">
                <div className={cn("w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0", color)}>
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Comparison ────────────────��─────────────────────────────────────���─────
const COMPARISON = [
  { label: "Setup time", ryn: "< 1 minute", others: "Hours / Days" },
  { label: "Earning model", ryn: "Passive credits", others: "Requires active work" },
  { label: "Contracts required", ryn: "None", others: "Often required" },
  { label: "Pause anytime", ryn: "Yes, instantly", others: "Usually locked-in" },
  { label: "Niche filtering", ryn: "Built-in", others: "Manual & tedious" },
  { label: "Credit marketplace", ryn: "Native exchange", others: "N/A" },
];

function ComparisonSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why us</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            A smarter way to monetize your network
          </h2>
        </div>
        <div className="rounded-2xl border overflow-hidden">
          <div className="grid grid-cols-3 bg-muted/60 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="px-5 py-3">Feature</div>
            <div className="px-5 py-3 text-primary font-bold text-sm normal-case tracking-normal text-center">Rent Your Network</div>
            <div className="px-5 py-3 text-center">Others</div>
          </div>
          {COMPARISON.map(({ label, ryn, others }, i) => (
            <div
              key={label}
              className={cn(
                "grid grid-cols-3 border-t text-sm",
                i % 2 === 0 ? "bg-card" : "bg-muted/20"
              )}
            >
              <div className="px-5 py-3.5 text-muted-foreground">{label}</div>
              <div className="px-5 py-3.5 text-center font-medium text-foreground flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                {ryn}
              </div>
              <div className="px-5 py-3.5 text-center text-muted-foreground">{others}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────��───────────────────────────────���──────
const FAQS = [
  {
    q: "What kind of emails can I list?",
    a: "Any business or professional email address you own or have legitimate access to. Simply add the address, describe it, set your niche, and price it. No domain restrictions.",
  },
  {
    q: "How do I actually earn credits?",
    a: "Every time another user rents your email listing from the marketplace, the credits you set as your price are transferred to your balance automatically — no action needed from you.",
  },
  {
    q: "Can I use this separately from my main EmaReach account?",
    a: "Yes. Rent Your Network is a fully separate portal with its own email/password login. Your main EmaReach account and RYN account are completely independent.",
  },
  {
    q: "What can I spend credits on?",
    a: "You can use your earned credits to rent other users' email listings from the marketplace — giving you access to more email diversity for your own outreach.",
  },
  {
    q: "Is there a limit to how many emails I can list?",
    a: "No limit. List as many email accounts as you own. Each gets its own listing, pricing, and stats.",
  },
  {
    q: "Can I pause or remove a listing?",
    a: "Absolutely. You can pause any listing at any time, which hides it from the marketplace while keeping your stats. You can also permanently remove it whenever you want.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 bg-[hsl(var(--marketing-band))]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Questions answered</h2>
        </div>
        <div className="space-y-2">
          {FAQS.map(({ q, a }, i) => (
            <div key={q} className="rounded-xl border bg-card overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-medium pr-4">{q}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────���────
function FinalCTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 gradient-primary opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)]" />

          {/* Floating decoration */}
          <div className="absolute top-6 right-8 opacity-20">
            <Coins className="w-24 h-24 text-white animate-float" />
          </div>
          <div className="absolute bottom-4 left-10 opacity-10">
            <Network className="w-32 h-32 text-white animate-float" style={{ animationDelay: "2s" }} />
          </div>

          <div className="relative px-8 py-14 sm:px-14 text-white text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium mb-6">
              <DollarSign className="w-3.5 h-3.5" />
              Free to join — start earning in minutes
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Ready to put your<br />email network to work?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Join thousands of professionals already earning credits from their email accounts.
              Setup is free and takes less than a minute.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-white text-primary hover:bg-white/90 hover:scale-[1.02] transition-all shadow-xl"
                asChild
              >
                <Link href="/rent/signup">
                  Create free account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-12 px-8 text-base text-white hover:bg-white/15 hover:scale-[1.02] transition-all border border-white/30"
                asChild
              >
                <Link href="/rent/login">Sign in</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
              {["No credit card", "Unlimited listings", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-3 h-3" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────���────────
function RYNFooter() {
  return (
    <footer className="border-t py-10 px-4 bg-[hsl(var(--marketing-band))]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white">
            <Network className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold">Rent Your Network</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <Link href="/rent/login" className="hover:text-foreground transition-colors">Sign in</Link>
          <Link href="/rent/signup" className="hover:text-foreground transition-colors">Sign up</Link>
          <Link href="/" className="hover:text-foreground transition-colors">EmaReach</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} EmaReach. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────���───────────
export default function RYNLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <RYNNav />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <EarningsSection />
      <TestimonialsSection />
      <ComparisonSection />
      <FAQSection />
      <FinalCTASection />
      <RYNFooter />
    </div>
  );
}
