"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, MessageSquare, Send, User, Building2, Phone, Sparkles, Clock, Headphones, Calendar, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const PLAN_NAMES: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  growth: "Growth",
  pro: "Pro",
  scale: "Scale",
  enterprise: "Enterprise",
};

function ContactForm() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan")?.toLowerCase();
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
    phone: "",
  });

  useEffect(() => {
    if (planId && PLAN_NAMES[planId]) {
      setForm((prev) => ({
        ...prev,
        subject: `Inquiry about ${PLAN_NAMES[planId]} plan`,
      }));
    }
  }, [planId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email, subject, and message.");
      return;
    }
    setLoading(true);
    try {
      await api.contact.submit({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        company: form.company.trim() || undefined,
        phone: form.phone.trim() || undefined,
      });
      import("@/lib/marketingAnalytics").then((m) => m.trackContactSubmit());
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "", company: "", phone: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-root {
          --brand: #007ee5;
          --brand-rgb: 0, 126, 229;
          --brand-light: #e8f3ff;
          --brand-dark: #005ab3;
          --accent: #ff6b35;
          --surface: #ffffff;
          --surface-2: #f7f9fc;
          --border: #e2e8f0;
          --text: #0f172a;
          --text-muted: #64748b;
          --radius: 16px;
        }
        .dark .contact-root {
          --brand-light: hsl(199 89% 14%);
          --brand-dark: hsl(199 89% 44%);
          --surface: hsl(222 47% 9%);
          --surface-2: hsl(222 47% 11%);
          --border: hsl(217 33% 22%);
          --text: hsl(210 40% 98%);
          --text-muted: hsl(215 20% 65%);
        }

        .contact-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--brand-light);
          color: var(--brand);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(0,126,229,0.2);
          margin-bottom: 24px;
          letter-spacing: 0.01em;
        }

        .contact-hero-title {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.05;
          color: var(--text);
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }

        .contact-hero-title .accent-word {
          background: linear-gradient(135deg, var(--brand) 0%, #00b4d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-hero-sub {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto;
        }

        .contact-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .stat-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .stat-pill .stat-num {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
        }

        .stat-pill .stat-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .stat-divider {
          width: 1px;
          background: var(--border);
          align-self: stretch;
        }

        /* Form card */
        .form-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 50px -10px rgba(0,126,229,0.08);
          position: relative;
          overflow: hidden;
        }
        .dark .contact-root .form-card {
          box-shadow: 0 8px 24px rgba(0,0,0,0.32), 0 16px 42px rgba(0,126,229,0.12);
        }

        .form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand), #00b4d8, var(--accent));
          border-radius: 24px 24px 0 0;
        }

        .form-card-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-card-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .field-group {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 7px;
          letter-spacing: 0.01em;
        }

        .field-label .optional {
          color: var(--text-muted);
          font-weight: 400;
          font-size: 12px;
          margin-left: 4px;
        }

        .input-wrap {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          width: 16px;
          height: 16px;
          pointer-events: none;
          transition: color 0.2s;
        }

        .styled-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-size: 14px;
          font-family: inherit;
          color: var(--text);
          background: var(--surface-2);
          transition: all 0.2s;
          outline: none;
          box-sizing: border-box;
        }

        .styled-input:focus {
          border-color: var(--brand);
          background: var(--surface);
          box-shadow: 0 0 0 3px rgba(var(--brand-rgb), 0.18);
        }

        .styled-input::placeholder {
          color: var(--text-muted);
          opacity: 0.85;
        }

        .styled-input-no-icon {
          padding-left: 14px;
        }

        .styled-textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-size: 14px;
          font-family: inherit;
          color: var(--text);
          background: var(--surface-2);
          transition: all 0.2s;
          outline: none;
          resize: none;
          box-sizing: border-box;
          line-height: 1.6;
        }

        .styled-textarea:focus {
          border-color: var(--brand);
          background: var(--surface);
          box-shadow: 0 0 0 3px rgba(var(--brand-rgb), 0.18);
        }

        .styled-textarea::placeholder {
          color: var(--text-muted);
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 540px) {
          .two-col { grid-template-columns: 1fr; }
          .form-card { padding: 24px; }
        }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%);
          color: white;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          padding: 13px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(0,126,229,0.35);
          letter-spacing: 0.01em;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,126,229,0.45);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Sidebar cards */
        .sidebar-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .sidebar-card:hover {
          border-color: rgba(var(--brand-rgb), 0.3);
          box-shadow: 0 4px 20px rgba(var(--brand-rgb), 0.12);
        }

        .sidebar-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          flex-shrink: 0;
        }

        .sidebar-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .sidebar-card-desc {
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.65;
        }

        .sidebar-card-desc a {
          color: var(--brand);
          text-decoration: none;
          font-weight: 500;
        }

        .sidebar-card-desc a:hover {
          text-decoration: underline;
        }

        .book-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-top: 16px;
          padding: 11px 20px;
          background: var(--brand);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(var(--brand-rgb), 0.3);
        }

        .book-btn:hover {
          background: var(--brand-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(var(--brand-rgb), 0.45);
        }

        .book-btn.book-btn-orange {
          background: linear-gradient(135deg, #ea580c, #f97316);
          box-shadow: 0 2px 8px rgba(234, 88, 12, 0.35);
        }
        .book-btn.book-btn-orange:hover {
          background: linear-gradient(135deg, #c2410c, #ea580c);
          box-shadow: 0 4px 14px rgba(234, 88, 12, 0.45);
        }
        .dark .contact-root .book-btn.book-btn-orange {
          background: linear-gradient(135deg, #9a3412, #ea580c);
        }

        .trust-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e8f3ff 100%);
          border: 1px solid rgba(0,126,229,0.15);
          border-radius: 12px;
          padding: 14px 18px;
          margin-top: 20px;
        }

        .trust-bar-icon {
          width: 32px;
          height: 32px;
          background: var(--brand);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
        }

        .trust-bar-text {
          font-size: 13px;
          color: #1e40af;
          font-weight: 500;
          line-height: 1.5;
        }
        .dark .contact-root .trust-bar {
          background: linear-gradient(135deg, hsl(199 89% 12%) 0%, hsl(222 47% 10%) 100%);
          border-color: hsl(var(--border));
        }
        .dark .contact-root .trust-bar-text {
          color: hsl(210 40% 88%);
        }

        .section-sep {
          height: 1px;
          background: var(--border);
          margin: 24px 0;
        }

        /* Responsive: page container */
        .contact-page-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }

        .contact-hero {
          text-align: center;
          margin-bottom: 64px;
        }

        @media (max-width: 768px) {
          .contact-page-wrap {
            padding: 40px 20px 60px;
          }
          .contact-hero { margin-bottom: 48px; }
          .contact-hero-badge { font-size: 12px; padding: 5px 12px; margin-bottom: 18px; }
          .contact-hero-title { margin-bottom: 14px; }
          .contact-hero-sub { font-size: 1rem; }
          .contact-stats { gap: 24px; margin-top: 28px; }
          .stat-pill .stat-num { font-size: 1.35rem; }
          .stat-pill .stat-label { font-size: 11px; }
        }

        @media (max-width: 480px) {
          .contact-page-wrap {
            padding: 32px 16px 48px;
          }
          .contact-hero { margin-bottom: 40px; }
          .contact-hero-badge { font-size: 11px; padding: 4px 10px; }
          .contact-stats { gap: 16px; margin-top: 22px; flex-direction: column; align-items: center; }
          .stat-divider { display: none; }
          .stat-pill .stat-num { font-size: 1.25rem; }
        }

        /* Responsive: main grid (form + sidebar) */
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .contact-sidebar { position: static; }
        }

        @media (max-width: 640px) {
          .contact-main-grid { gap: 20px; }
        }

        .contact-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 100px;
        }

        /* Form card responsive */
        @media (max-width: 768px) {
          .form-card { padding: 28px; }
          .form-card-title { font-size: 1.25rem; }
          .form-card-desc { margin-bottom: 22px; }
        }

        @media (max-width: 540px) {
          .two-col { grid-template-columns: 1fr; }
          .form-card { padding: 24px; }
        }

        @media (max-width: 380px) {
          .form-card { padding: 18px; border-radius: 18px; }
          .submit-btn { width: 100%; justify-content: center; }
        }

        .contact-submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        @media (max-width: 380px) {
          .contact-submit-row { flex-direction: column; align-items: stretch; text-align: center; }
        }

        /* Sidebar cards responsive */
        @media (max-width: 1024px) {
          .sidebar-card { padding: 20px; }
        }

        @media (max-width: 480px) {
          .sidebar-card { padding: 18px; border-radius: 16px; }
          .sidebar-icon-wrap { width: 40px; height: 40px; }
          .sidebar-card-title { font-size: 0.95rem; }
          .sidebar-card-desc { font-size: 13px; }
          .trust-bar { padding: 12px 14px; flex-wrap: wrap; }
          .trust-bar-text { font-size: 12px; }
        }

        /* Social proof block responsive */
        .contact-social-proof {
          padding: 20px;
          background: var(--surface);
          border-radius: 20px;
          border: 1.5px solid var(--border);
        }

        @media (max-width: 480px) {
          .contact-social-proof { padding: 16px; border-radius: 16px; }
        }
      `}</style>

      <main className="contact-root min-h-screen bg-gradient-to-b from-primary/[0.07] via-background to-background transition-colors duration-300 dark:from-primary/15">
        <div className="contact-page-wrap">

          {/* Hero */}
          <div className="contact-hero">
            <div className="contact-hero-badge">
              <Sparkles size={13} />
              We're here to help
            </div>
            <h1 className="contact-hero-title">
              Let's <span className="accent-word">talk</span> about<br />
              what you need
            </h1>
            <p className="contact-hero-sub">
              Whether you have a question, need a demo, or are ready to get started — our team responds within 1–2 business days.
            </p>

            <div className="contact-stats">
              <div className="stat-pill">
                <span className="stat-num">{'<'}24h</span>
                <span className="stat-label">Avg. reply time</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <span className="stat-num">98%</span>
                <span className="stat-label">Satisfaction rate</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <span className="stat-num">5K+</span>
                <span className="stat-label">Happy customers</span>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="contact-main-grid">

            {/* Left column */}
            <div>
              {/* Form card */}
              <div className="form-card">
                <div className="form-card-title">
                  <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #007ee5, #00b4d8)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageSquare size={18} color="white" />
                  </div>
                  Send us a message
                </div>
                <p className="form-card-desc">Fill in the details below and we'll get back to you promptly.</p>

                <form onSubmit={handleSubmit}>
                  <div className="two-col">
                    <div className="field-group">
                      <label className="field-label">Full name <span style={{color:'#ef4444'}}>*</span></label>
                      <div className="input-wrap">
                        <User className="input-icon" />
                        <input className="styled-input" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Work email <span style={{color:'#ef4444'}}>*</span></label>
                      <div className="input-wrap">
                        <Mail className="input-icon" />
                        <input className="styled-input" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Subject <span style={{color:'#ef4444'}}>*</span></label>
                    <input className="styled-input styled-input-no-icon" name="subject" type="text" placeholder="What can we help you with?" value={form.subject} onChange={handleChange} required style={{paddingLeft:14}} />
                  </div>

                  <div className="two-col">
                    <div className="field-group">
                      <label className="field-label">Company <span className="optional">(optional)</span></label>
                      <div className="input-wrap">
                        <Building2 className="input-icon" />
                        <input className="styled-input" name="company" type="text" placeholder="Your company" value={form.company} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Phone <span className="optional">(optional)</span></label>
                      <div className="input-wrap">
                        <Phone className="input-icon" />
                        <input className="styled-input" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="field-group" style={{marginBottom:28}}>
                    <label className="field-label">Message <span style={{color:'#ef4444'}}>*</span></label>
                    <textarea className="styled-textarea" name="message" placeholder="Describe your question, use case, or how we can help you best..." value={form.message} onChange={handleChange} rows={5} required />
                  </div>

                  <div className="contact-submit-row">
                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? (
                        <><div className="spinner" /> Sending...</>
                      ) : (
                        <><Send size={16} /> Send message</>
                      )}
                    </button>
                    <span className="text-xs text-muted-foreground">🔒 Your info is safe with us</span>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar">

              <div className="sidebar-card">
                <div className="sidebar-icon-wrap bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-950/70 dark:to-sky-900/40">
                  <Clock size={20} className="text-blue-600 dark:text-sky-400" />
                </div>
                <div className="sidebar-card-title">Response time</div>
                <p className="sidebar-card-desc">
                  We reply within <strong>1–2 business days</strong>. Add <em>"Urgent"</em> to your subject line and we'll prioritize your request.
                </p>
                <div className="trust-bar mt-3.5">
                  <div className="trust-bar-icon bg-blue-600 dark:bg-primary">
                    <span className="text-sm">⚡</span>
                  </div>
                  <p className="trust-bar-text">Most messages are answered within a few hours during business hours.</p>
                </div>
              </div>

              <div className="sidebar-card">
                <div className="sidebar-icon-wrap bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950/60 dark:to-emerald-900/40">
                  <Headphones size={20} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="sidebar-card-title">More ways to reach us</div>
                <p className="sidebar-card-desc">
                  Browse our <a href="/how-it-works">How it works</a> and <a href="/pricing">Pricing</a> pages for detailed product info.<br /><br />
                  Existing customers can use <strong>in-app support</strong> from their dashboard for faster help.
                </p>
              </div>

              <Link
                href="/book-demo"
                className="sidebar-card block bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/40 dark:from-orange-950/50 dark:to-amber-950/40 dark:border-orange-500/20"
              >
                <div className="sidebar-icon-wrap bg-gradient-to-br from-amber-200 to-orange-200 dark:from-orange-900/60 dark:to-amber-900/40">
                  <Calendar size={20} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div className="sidebar-card-title">Prefer a live demo?</div>
                <p className="sidebar-card-desc">
                  See the product in action with a personalized walkthrough tailored to your use case.
                </p>
                <span className="book-btn book-btn-orange inline-flex">
                  Book a demo <ArrowRight size={15} />
                </span>
              </Link>

              {/* Social proof */}
              <div className="contact-social-proof">
                <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide mb-3.5">
                  What customers say
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { text: "The support team is incredibly responsive and helpful.", name: "Sarah K.", role: "CTO" },
                    { text: "Got a demo booked within the hour. Outstanding experience.", name: "James M.", role: "Founder" },
                  ].map((q, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-border bg-muted/40 dark:bg-muted/25"
                    >
                      <p className="text-[13px] text-foreground leading-relaxed mb-2.5">&quot;{q.text}&quot;</p>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--brand)] to-cyan-500 flex items-center justify-center text-[11px] text-white font-bold shrink-0">
                          {q.name[0]}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-foreground">{q.name}</div>
                          <div className="text-[11px] text-muted-foreground">{q.role}</div>
                        </div>
                        <div className="ml-auto text-amber-500 text-xs">★★★★★</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <main className="contact-root min-h-screen bg-gradient-to-b from-primary/[0.07] via-background to-background dark:from-primary/15 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h1 className="font-sans text-3xl font-extrabold text-foreground">Get in touch</h1>
          <p className="text-muted-foreground mt-2">Loading...</p>
        </div>
      </main>
    }>
      <ContactForm />
    </Suspense>
  );
}