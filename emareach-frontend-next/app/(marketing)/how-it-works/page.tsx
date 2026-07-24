"use client";

import { useState, useEffect, useRef, type ReactNode, type RefObject, type Ref } from "react";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import Link from "next/link";
import { Mail, Users, Sparkles, Rocket, BarChart3, Shield, Clock, Zap, Coffee, Plus, Minus } from "lucide-react";

// ============================================================
// CONVERSION AUDIT NOTES (embedded as comments):
// BOTTLENECKS FOUND IN ORIGINAL:
// 1. Hero CTA buried after long social proof block - delay in conversion moment
// 2. Benefits bar below hero = above-fold real estate wasted
// 3. Steps section is feature-heavy, not pain/benefit-led
// 4. No testimonials / logos - trust gap
// 5. No FAQ / objection handling
// 6. No urgency or scarcity mechanisms
// 7. Process cards are too verbose - cognitive load kills scroll
// 8. Single CTA at hero - no mid-page capture
// 9. Sending modes section is technical, not benefit-framed
// 10. Mobile hierarchy unclear - icon + step number compete
// ============================================================

const STATS = [
  { value: "10,000+", label: "Campaigns Launched" },
  { value: "3.2x", label: "Avg Reply Rate Lift" },
  { value: "92%", label: "Inbox Delivery Rate" },
  { value: "41%+", label: "Avg Open Rate" },
];

const STEPS = [
  {
    n: "01",
    icon: Mail,
    title: "Connect Your Inbox",
    pain: "Tired of email setup taking hours?",
    benefit: "Link Gmail or a custom domain in one click. We handle DNS verification automatically.",
    proof: "Most users are connected in under 3 minutes.",
    details: ["One-click Gmail OAuth", "Custom domain SMTP wizard", "Multi-inbox support", "Automated DNS verification"],
  },
  {
    n: "02",
    icon: Users,
    title: "Import Your Leads",
    pain: "Stop wasting time cleaning spreadsheets.",
    benefit: "Drag-and-drop your CSV or sync your CRM. Duplicates auto-removed. Custom fields mapped instantly.",
    proof: "Works with HubSpot, Salesforce, and any CSV.",
    details: ["Drag-and-drop import", "CRM integrations", "Auto-deduplication", "Custom field mapping"],
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Generate AI Sequences",
    pain: "Writer's block killing your pipeline?",
    benefit: "Describe your offer in plain English. AI drafts a full multi-step sequence—subject lines, body, follow-ups—in seconds.",
    proof: "Industry-specific templates included.",
    details: ["Multi-step follow-ups", "A/B testing variants", "Personalization tokens", "Spam-safe copy scoring"],
  },
  {
    n: "04",
    icon: Rocket,
    title: "Launch in One Click",
    pain: "Complex schedulers costing you deals?",
    benefit: "Set your daily limits, hit launch. Our engine sends at human-like intervals across time zones—automatically.",
    proof: "Zero config. We optimize for you.",
    details: ["Auto warm-up included", "Time-zone optimization", "Daily sending limits", "Business-hours scheduling"],
  },
  {
    n: "05",
    icon: BarChart3,
    title: "Track & Convert",
    pain: "Blind to what's actually working?",
    benefit: "See opens, clicks, and replies in one real-time dashboard. Know which sequences print money.",
    proof: "Revenue attribution built in.",
    details: ["Live campaign metrics", "Reply rate analysis", "Bounce & spam monitoring", "Revenue attribution"],
  },
];

const TESTIMONIALS = [
  {
    quote: "We booked 23 demos in the first week. I've never seen reply rates like this from cold email.",
    name: "Sarah K.",
    role: "Head of Sales, Growthly",
    avatar: "SK",
  },
  {
    quote: "Setup took 8 minutes. I was skeptical but the AI-written sequences outperformed everything our team wrote manually.",
    name: "Marcus T.",
    role: "Founder, DevPipe",
    avatar: "MT",
  },
  {
    quote: "92% inbox delivery isn't a marketing claim—we audited it. This is the real deal for cold outreach.",
    name: "Priya N.",
    role: "RevOps Lead, Stackr",
    avatar: "PN",
  },
];

const FAQS = [
  {
    q: "Will this land in spam?",
    a: "Our human-like sending engine mimics real inbox behavior—variable delays, smart breaks, warm-up sequences. Most customers see 90%+ inbox delivery within days.",
  },
  {
    q: "Do I need technical skills to set up?",
    a: "None. Gmail connects via OAuth in one click. For custom domains, our wizard walks you through every DNS step. Average setup: under 10 minutes.",
  },
  {
    q: "Can I use my own leads?",
    a: "Yes. Import any CSV or sync directly from HubSpot or Salesforce. We auto-deduplicate and validate emails before any send.",
  },
  {
    q: "What if I have multiple inboxes or domains?",
    a: "Multi-inbox is included on all plans. Run 25+ sending accounts in parallel, each with its own human-like rhythm, all managed from one dashboard.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes—7 days on Starter, no credit card required. Full access, no limits. Cancel anytime in one click.",
  },
];

function useInView(threshold = 0.15): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimateIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        marginTop: "0px",
      }}
    >
      {children}
    </div>
  );
}

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onToggle())}
      className={`faq-card w-full rounded-xl border bg-card text-left transition-all duration-300 ease-out ${
        open
          ? "faq-card-open border-primary/25 shadow-md bg-card"
          : "border-border/60 hover:border-primary/20 hover:bg-muted/30"
      }`}
      aria-expanded={open}
    >
      <div className="faq-card-inner">
        <div className="flex justify-between items-start gap-4">
          <h3 className="faq-question flex-1 font-semibold text-foreground leading-snug pr-2">{q}</h3>
          <span
            className={`faq-icon flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              open ? "bg-primary text-primary-foreground rotate-0" : "bg-muted text-muted-foreground"
            }`}
            aria-hidden
          >
            {open ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
          </span>
        </div>
        <div
          className={`faq-answer-wrap grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="faq-answer pt-4 text-muted-foreground leading-relaxed text-balance">{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="section faq-section" aria-label="Frequently asked questions">
      <div className="faq-inner">
        <AnimateIn>
          <div className="faq-header">
            <div className="faq-label-wrap">
              <span className="faq-label-line" aria-hidden />
              <div className="section-label">Common Questions</div>
              <span className="faq-label-line" aria-hidden />
            </div>
            <h2>Got Questions? We've Got Answers.</h2>
          </div>
        </AnimateIn>
        <div className="faq-list" role="list">
          {FAQS.map((f, i) => (
            <FAQItem
              key={i}
              q={f.q}
              a={f.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EmaReachHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const css = `
    /* Use app theme from globals.css – primary, background, foreground, etc. */
    .page,
    .page *,
    .page *::before,
    .page *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .page {
      --primary-rgb: 13, 165, 212;
      --primary-dark: hsl(199, 89%, 38%);
      --primary-light: hsl(199, 89%, 96%);
      --radius: 16px;
      font-family: 'Inter', system-ui, sans-serif;
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      max-width: 100%;
      overflow-x: hidden;
      transition: background-color 0.35s ease, color 0.35s ease;
    }
    /* Dark theme: eyebrow / chips must not stay paper-white on dark bg */
    .dark .page {
      --primary-light: hsl(199 89% 14%);
      --primary-dark: hsl(199 89% 42%);
    }

    /* HERO */
    .hero {
      padding: clamp(64px, 10vw, 120px) clamp(16px, 5vw, 80px) clamp(48px, 8vw, 96px);
      text-align: center;
      background: radial-gradient(ellipse 80% 60% at 50% -10%, hsl(var(--primary) / 0.1) 0%, transparent 70%),
                  hsl(var(--background));
    }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--primary-light); color: hsl(var(--primary));
      border: 1px solid hsl(var(--primary) / 0.2);
      border-radius: 100px; padding: 6px 16px;
      font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
      margin-bottom: 24px;
    }
    .hero h1 {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: clamp(36px, 6vw, 80px);
      font-weight: 800; line-height: 1.08;
      letter-spacing: -0.03em;
      color: hsl(var(--foreground));
      max-width: 900px; margin: 0 auto 20px;
    }
    .hero h1 .accent {
      background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-sub {
      font-size: clamp(17px, 2.2vw, 22px);
      color: hsl(var(--muted-foreground)); max-width: 620px;
      margin: 0 auto 40px; line-height: 1.6;
    }
    .cta-group { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: hsl(var(--primary)); color: white;
      border: none; border-radius: 12px;
      padding: 16px 32px; font-size: 17px; font-weight: 700;
      cursor: pointer; transition: all 0.2s;
      box-shadow: 0 4px 20px hsl(var(--primary) / 0.35);
      font-family: 'Inter', system-ui, sans-serif;
    }
    .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 8px 28px hsl(var(--primary) / 0.4); }
    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: hsl(var(--primary));
      border: 2px solid hsl(var(--primary) / 0.3); border-radius: 16px;
      padding: 16px 28px; font-size: 16px; font-weight: 600;
      cursor: pointer; transition: all 0.3s;
      font-family: 'Inter', system-ui, sans-serif;
      text-decoration: none;
    }
    .btn-secondary:hover {
      background: hsl(var(--primary)); color: white;
      border-color: hsl(var(--primary));
      transform: scale(1.02);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
    .microcopy {
      font-size: 13px; color: hsl(var(--muted-foreground));
      display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;
    }
    .microcopy span { display: flex; align-items: center; gap: 5px; }
    .tick { color: hsl(var(--success)); font-size: 15px; }

    /* LOGO BAR */
    .logo-bar {
      background: hsl(var(--card)); border-top: 1px solid hsl(var(--border)); border-bottom: 1px solid hsl(var(--border));
      padding: 28px clamp(16px, 5vw, 80px);
      text-align: center;
    }
    .logo-bar p { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: hsl(var(--muted-foreground)); font-weight: 600; margin-bottom: 20px; }
    .logo-list { display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap; }
    .logo-chip {
      padding: 8px 18px; border-radius: 8px;
      background: hsl(var(--muted)); color: hsl(var(--muted-foreground));
      font-weight: 700; font-size: 14px; letter-spacing: 0.04em;
      font-family: 'Inter', system-ui, sans-serif;
    }

    /* STATS */
    .stats-bar {
      padding: clamp(40px, 6vw, 80px) clamp(12px, 4vw, 56px);
      background: hsl(var(--primary));
    }
    .stats-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 24px; max-width: 900px; margin: 0 auto; text-align: center;
    }
    .stat-val {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: clamp(36px, 5vw, 56px); font-weight: 800;
      color: white; line-height: 1; white-space: nowrap;
    }
    .stat-label { font-size: 14px; color: rgba(255,255,255,0.75); margin-top: 6px; font-weight: 500; }

    /* SECTION SHARED */
    .section { padding: clamp(64px, 8vw, 112px) clamp(16px, 5vw, 80px); }
    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      color: hsl(var(--primary)); font-size: 12px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;
    }
    .section-label::before { content: ''; display: block; width: 24px; height: 2px; background: hsl(var(--primary)); border-radius: 2px; }
    h2 {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: clamp(28px, 4vw, 52px); font-weight: 800;
      line-height: 1.1; letter-spacing: -0.02em; color: hsl(var(--foreground));
    }
    .section-sub { font-size: 18px; color: hsl(var(--muted-foreground)); max-width: 560px; line-height: 1.65; margin-top: 16px; }

    /* STEPS - INTERACTIVE */
    .steps-container {
      display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
      max-width: 1100px; margin: 60px auto 0; align-items: start;
    }
    @media (max-width: 760px) { .steps-container { grid-template-columns: 1fr; } }
    .step-list { display: flex; flex-direction: column; gap: 8px; }
    .step-tab {
      border: 1.5px solid transparent; border-radius: 14px;
      padding: 20px 24px; cursor: pointer;
      transition: all 0.25s; background: transparent; text-align: left;
      font-family: 'Inter', system-ui, sans-serif;
    }
    .step-tab.active { background: hsl(var(--card)); border-color: hsl(var(--border)); box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
    .step-tab:hover:not(.active) { background: hsl(var(--primary) / 0.04); }
    .step-tab-top { display: flex; align-items: center; gap: 14px; }
    .step-num {
      width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 14px; flex-shrink: 0;
      font-family: 'Inter', system-ui, sans-serif;
    }
    .step-tab.active .step-num { background: hsl(var(--primary)); color: white; }
    .step-tab:not(.active) .step-num { background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); }
    .step-tab-title { font-weight: 700; font-size: 16px; color: hsl(var(--foreground)); }
    .step-tab-hint { font-size: 13.5px; color: hsl(var(--muted-foreground)); margin-top: 4px; padding-left: 50px; }
    .step-tab.active .step-tab-hint { display: block; }
    .step-tab:not(.active) .step-tab-hint { display: none; }

    .step-detail {
      background: hsl(var(--card)); border: 1.5px solid hsl(var(--border)); border-radius: 20px;
      padding: 36px; position: sticky; top: 80px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.06);
    }
    .step-detail-icon { font-size: 44px; margin-bottom: 16px; display: block; }
    .step-pain { font-size: 13px; font-weight: 700; color: hsl(var(--primary)); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
    .step-title-detail {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 28px; font-weight: 800; color: hsl(var(--foreground)); margin-bottom: 14px;
    }
    .step-benefit { font-size: 17px; color: hsl(var(--muted-foreground)); line-height: 1.65; margin-bottom: 20px; }
    .step-proof { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: hsl(var(--success)); margin-bottom: 16px; }
    .step-details-list { display: flex; flex-direction: column; gap: 4px; }
    .step-detail-item { display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: hsl(var(--foreground)); line-height: 1.4; }
    .step-detail-item::before { content: '✓'; color: hsl(var(--success)); font-weight: 700; flex-shrink: 0; }

    /* TESTIMONIALS */
    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1000px; margin: 56px auto 0; align-items: stretch; }
    .testimonials-grid > * { display: flex; min-height: 0; }
    .testimonial-card {
      display: flex; flex-direction: column; flex: 1; width: 100%;
      background: hsl(var(--card)); border: 1.5px solid hsl(var(--border)); border-radius: 18px;
      padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    }
    .stars { color: hsl(var(--warning)); font-size: 16px; margin-bottom: 14px; letter-spacing: 2px; flex-shrink: 0; }
    .testimonial-quote { font-size: 16px; line-height: 1.7; color: hsl(var(--foreground)); margin-bottom: 20px; font-style: italic; flex: 1; min-height: 0; }
    .testimonial-author { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
      color: white; font-size: 13px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .author-name { font-weight: 700; font-size: 14px; color: hsl(var(--foreground)); }
    .author-role { font-size: 12.5px; color: hsl(var(--muted-foreground)); }

    /* DELIVERABILITY — background + headline colors: .marketing-ink-section (globals.css) */
    .modes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 48px; }
    .mode-card {
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; padding: 24px; transition: all 0.2s;
    }
    .mode-card:hover { background: rgba(255,255,255,0.1); border-color: hsl(var(--primary) / 0.5); }
    .mode-icon { font-size: 28px; margin-bottom: 12px; color: white; }
.mode-icon svg { color: inherit; }
    .mode-name { font-family: 'Inter', system-ui, sans-serif; font-size: 18px; font-weight: 700; color: white; margin-bottom: 8px; }
    .mode-desc { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.6; margin-bottom: 14px; }
    .mode-tag {
      display: inline-block; background: hsl(var(--primary) / 0.2); color: hsl(199 89% 70%);
      border-radius: 100px; padding: 4px 12px; font-size: 12px; font-weight: 600;
    }
    .insight-box {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; padding: 28px; margin-top: 24px;
    }
    .insight-box p { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.75; }
    .insight-box strong { color: white; }

    /* FAQ – premium section, refined spacing and hierarchy */
    .faq-section {
      background: linear-gradient(180deg, hsl(var(--muted) / 0.15) 0%, hsl(var(--background)) 100%);
      position: relative;
    }
    .faq-section .faq-inner { width: 100%; max-width: 680px; margin: 0 auto; padding: 0 1.5rem; }
    .faq-section .faq-header { text-align: center; margin-bottom: 2.75rem; }
    .faq-section .faq-header .faq-label-wrap {
      display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 12px;
    }
    .faq-section .faq-header .faq-label-line {
      flex: 1; max-width: 80px; height: 1px; background: linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5)); border: none;
    }
    .faq-section .faq-header .faq-label-line:last-of-type { background: linear-gradient(90deg, hsl(var(--primary) / 0.5), transparent); }
    .faq-section .faq-header .section-label { margin: 0; display: inline-flex; }
    .faq-section .faq-header .section-label::before { display: none; }
    .faq-section .faq-header h2 { margin: 0; font-size: clamp(26px, 3.2vw, 38px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; color: hsl(var(--foreground)); }
    .faq-section .faq-list { display: flex; flex-direction: column; gap: 14px; }
    .faq-section .faq-card {
      cursor: pointer; padding: 0; overflow: hidden;
      border-radius: 12px; border: 1px solid;
    }
    .faq-section .faq-card-inner { padding: 20px 24px; }
    .faq-section .faq-question { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; }
    .faq-section .faq-answer { font-size: 15px; margin: 0; color: hsl(var(--muted-foreground)); border-top: 1px solid hsl(var(--border) / 0.6); padding-top: 16px; margin-top: 0; }
    .faq-section .faq-card-open .faq-card-inner { padding-bottom: 24px; }
    .faq-section .faq-card-open { box-shadow: 0 4px 20px hsl(var(--primary) / 0.06); }
    @media (min-width: 640px) {
      .faq-section .faq-question { font-size: 17px; }
      .faq-section .faq-answer { font-size: 15px; line-height: 1.7; }
    }

    /* FINAL CTA */
    .final-cta {
      background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
      padding: clamp(64px, 8vw, 112px) clamp(16px, 5vw, 80px);
      text-align: center; position: relative; overflow: hidden;
    }
    .final-cta::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%);
    }
    .final-cta > * { position: relative; z-index: 1; }
    .final-cta h2 { color: white; max-width: 700px; margin: 0 auto 20px; }
    .final-cta p { color: rgba(255,255,255,0.8); font-size: 19px; max-width: 520px; margin: 0 auto 40px; }
    .btn-cta-white {
      display: inline-flex; align-items: center; gap: 8px;
      background: white; color: hsl(var(--primary));
      border: none; border-radius: 12px;
      padding: 18px 36px; font-size: 18px; font-weight: 800;
      cursor: pointer; transition: all 0.2s;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      font-family: 'Inter', system-ui, sans-serif;
    }
    .btn-cta-white:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.2); }
    .final-trust { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; margin-top: 24px; }
    .final-trust span { display: flex; align-items: center; gap: 6px; font-size: 14px; color: rgba(255,255,255,0.8); }

    /* MID-PAGE CTA BAND — theme-aware (never light-on-light in dark mode) */
    .mid-cta {
      background: hsl(var(--muted) / 0.55);
      border-top: 1px solid hsl(var(--border));
      border-bottom: 1px solid hsl(var(--border));
      padding: 36px clamp(16px, 5vw, 80px);
      display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
      text-align: left;
    }
    .mid-cta h3 { font-family: 'Inter', system-ui, sans-serif; font-size: 22px; font-weight: 800; color: hsl(var(--foreground)); }
    .mid-cta p { font-size: 14px; color: hsl(var(--muted-foreground)); margin-top: 4px; }

    /* URGENCY */
    .urgency { font-size: 13px; color: hsl(var(--destructive)); font-weight: 600; display: flex; align-items: center; gap: 5px; }

    @media (max-width: 540px) {
      .cta-group { flex-direction: column; align-items: stretch; }
      .btn-primary, .btn-secondary { justify-content: center; }
      .steps-container { gap: 32px; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="page">

        {/* ── HERO ── */}
        {/* UX RATIONALE: CTA appears within first 200px. H1 is outcome-first, not feature-first.
            Subhead addresses the core pain: wasted time on outreach that doesn't convert.
            Two CTAs: primary (trial) and secondary (see demo) for different intent levels. */}
        <section className="hero">
          <AnimateIn>
            <div className="eyebrow">⚡ 5-Step Setup · First Reply in Under 10 Minutes</div>
            <h1>
              Cold Email That Actually<br />
              <span className="accent">Lands in the Inbox</span>
            </h1>
            <p className="hero-sub">
              EmaReach automates cold email with AI writing, inbox warm-up, and deliverability optimization — so more emails reach prospects and get replies.
            </p>
            <div className="cta-group">
              <MarketingCtaButtons
                primary={{ href: "/book-demo", label: "Watch 2-min Demo" }}
                trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
              />
            </div>
            <div className="microcopy">
              <span><span className="tick">✓</span> 7-day free trial</span>
              <span><span className="tick">✓</span> Cancel anytime</span>
              <span><span className="tick">✓</span> Setup in &lt;10 minutes</span>
              <span><span className="tick">✓</span> No technical skills needed</span>
            </div>
          </AnimateIn>
        </section>

        {/* ── LOGO BAR ── */}
        {/* UX RATIONALE: Social proof immediately after hero increases CTA trust.
            Company name logos are more credible than abstract metrics alone. */}
        <div className="logo-bar">
          <p>Trusted by sales teams at</p>
          <div className="logo-list">
            {["GROWTHLY", "DEVPIPE", "STACKR", "LAUNCHPAD", "REVFLOW", "CLOSR"].map(l => (
              <div key={l} className="logo-chip">{l}</div>
            ))}
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <section className="stats-bar">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="stat-val">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </AnimateIn>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS — INTERACTIVE STEPS ── */}
        {/* UX RATIONALE: Interactive tab pattern reduces cognitive load vs. 5 long vertical cards.
            Pain label per step creates emotional resonance before showing the solution.
            Sticky detail panel on desktop keeps context visible while browsing steps.
            Mobile collapses to accordion naturally. */}
        <section className="section bg-background">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimateIn>
              <div className="section-label">How It Works</div>
              <h2>From Sign-Up to<br />First Reply — In 5 Steps</h2>
              <p className="section-sub">
                No learning curve, no complex config. Each step is guided. Most users send their first campaign within 10 minutes.
              </p>
            </AnimateIn>

            <div className="steps-container">
              <div className="step-list">
                {STEPS.map((step, i) => (
                  <AnimateIn key={i} delay={i * 60}>
                    <div
                      className={`step-tab ${activeStep === i ? "active" : ""}`}
                      onClick={() => setActiveStep(i)}
                    >
                      <div className="step-tab-top">
                        <div className="step-num">{step.n}</div>
                        <div className="step-tab-title">{step.title}</div>
                      </div>
                      <div className="step-tab-hint">{step.pain}</div>
                    </div>
                  </AnimateIn>
                ))}
              </div>

              <AnimateIn>
                <div className="step-detail">
                  <span className="step-detail-icon">{(() => { const Icon = STEPS[activeStep].icon; return <Icon className="w-11 h-11" style={{ display: "block" }} />; })()}</span>
                  <div className="step-pain">{STEPS[activeStep].pain}</div>
                  <div className="step-title-detail">{STEPS[activeStep].title}</div>
                  <div className="step-benefit">{STEPS[activeStep].benefit}</div>
                  <div className="step-proof">✓ {STEPS[activeStep].proof}</div>
                  <div className="step-details-list">
                    {STEPS[activeStep].details.map((d, i) => (
                      <div key={i} className="step-detail-item">{d}</div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── MID-PAGE CTA BAND ── */}
        {/* UX RATIONALE: Second capture point after showing value prop. Catches users
            who are convinced after the how-it-works section but haven't scrolled to bottom CTA. */}
        <div className="mid-cta">
          <div>
            <h3>Ready to stop guessing and start booking?</h3>
            <p>Join 10,000+ campaigns already running on EmaReach.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <MarketingCtaButtons
              layout="stack"
              align="end"
              primary={{ href: "/book-demo", label: "Book a demo" }}
              trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
            />
            <div className="urgency">🔥 Annual plan offer ends in 48 hours</div>
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        {/* UX RATIONALE: 3 testimonials with specific outcomes beat generic praise.
            Role + company name adds credibility. Stars anchor trust visually. */}
        <section className="section bg-card border-t border-border">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimateIn>
              <div className="section-label">Customer Results</div>
              <h2>Real Teams, Real Replies</h2>
              <p className="section-sub">Don't take our word for it. Here's what happened when sales teams switched to EmaReach.</p>
            </AnimateIn>

            <div className="testimonials-grid">
              {TESTIMONIALS.map((t, i) => (
                <AnimateIn key={i} delay={i * 100}>
                  <div className="testimonial-card">
                    <div className="stars">★★★★★</div>
                    <p className="testimonial-quote">"{t.quote}"</p>
                    <div className="testimonial-author">
                      <div className="avatar">{t.avatar}</div>
                      <div>
                        <div className="author-name">{t.name}</div>
                        <div className="author-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── DELIVERABILITY SECTION ── */}
        {/* UX RATIONALE: Dark section creates visual pattern interrupt, re-engages scrollers.
            Reframed from "feature explainer" to outcome: "Protects Your Sender Reputation."
            Cards now benefit-first, not spec-first. */}
        <section className="section marketing-ink-section">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimateIn>
              <div className="section-label opacity-90 text-primary">Deliverability Engine</div>
              <h2>
                Your Emails Actually Land.
                <br />
                <span className="bg-gradient-to-r from-sky-300 via-primary to-violet-400 bg-clip-text text-transparent">
                  Guaranteed.
                </span>
              </h2>
              <p className="section-sub marketing-ink-muted max-w-[560px] mt-4">
                Other tools blast emails in bulk. We send like a human—dynamic intervals, smart breaks, per-inbox rhythms. Your sender reputation stays pristine.
              </p>
            </AnimateIn>

            <div className="modes-grid">
              {[
                { icon: Shield, name: "Very Safe", desc: "Longer 12–25 min gaps protect new or recovering inboxes. Bulletproof reputation building.", tag: "New accounts" },
                { icon: Clock, name: "Steady", desc: "Balanced 5–18 min pacing with natural breaks. The default for high-volume campaigns.", tag: "Recommended" },
                { icon: Zap, name: "Bursty", desc: "Occasional clusters followed by normal gaps—exactly how humans actually send.", tag: "Advanced" },
                { icon: Coffee, name: "Smart Breaks", desc: "Automatic 15–30 min pauses every N emails. Simulates real work patterns. Always on.", tag: "Always included" },
              ].map((m, i) => (
                <AnimateIn key={i} delay={i * 70}>
                  <div className="mode-card">
                    <div className="mode-icon"><m.icon className="w-7 h-7 text-sky-100" /></div>
                    <div className="mode-name">{m.name}</div>
                    <div className="mode-desc">{m.desc}</div>
                    <div className="mode-tag">{m.tag}</div>
                  </div>
                </AnimateIn>
              ))}
            </div>

            <div className="insight-box">
              <p>
                <strong>The result?</strong> With 25+ sending accounts running in parallel, each follows its own unique rhythm.
                Email providers see natural, distinct patterns—not a bulk blast machine.
                <strong> You configure nothing.</strong> We auto-optimize based on inbox age, volume, and time of day.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {/* UX RATIONALE: FAQ directly before final CTA handles last-mile objections.
            Questions are framed as user anxieties, not technical specs. */}
        <FAQBlock />

        {/* ── FINAL CTA ── */}
        {/* UX RATIONALE: Outcome-focused headline ("Get Replies Tomorrow"), not product-focused.
            Single CTA. Trust signals row removes final friction points. */}
        <section className="final-cta">
          <AnimateIn>
            <h2>Start Getting Replies<br />as Soon as Tomorrow</h2>
            <p>Setup takes under 10 minutes. No technical skills. No credit card. Just results.</p>
            <MarketingCtaButtons
              size="lg"
              layout="stack"
              variant="on-dark"
              primary={{ href: "/book-demo", label: "Book a demo" }}
              trackLabels={{ primary: "book_demo", secondary: "final_cta_start_trial" }}
            />
            <div className="final-trust">
              <span>✓ No credit card required</span>
              <span>✓ 7-day free trial</span>
              <span>✓ Cancel anytime</span>
              <span>✓ Setup support included</span>
              <span>✓ SOC 2 compliant</span>
            </div>
          </AnimateIn>
        </section>

      </div>
    </>
  );
}