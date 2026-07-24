"use client";

import { useState } from "react";
import Link from "next/link";
import { ToolsBottomCta } from "@/components/marketing/ToolsBottomCta";
import { MailCheck, ArrowRight, Loader2, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from "lucide-react";

interface Result {
  email: string;
  formatValid: boolean;
  hasMx: boolean;
  isDisposable: boolean;
  domain?: string;
  verdict: "valid" | "undeliverable" | "disposable" | "invalid";
}

const verdictConfig = {
  valid: {
    label: "Valid & Deliverable",
    description: "Format is correct, domain has MX records, and the address is not disposable.",
    color: "emerald",
    icon: CheckCircle2,
  },
  disposable: {
    label: "Disposable Address",
    description: "This appears to be a temporary/disposable email address. Avoid adding it to outreach lists.",
    color: "amber",
    icon: AlertTriangle,
  },
  undeliverable: {
    label: "Likely Undeliverable",
    description: "The domain has no MX records — email sent to this address will bounce.",
    color: "red",
    icon: XCircle,
  },
  invalid: {
    label: "Invalid Format",
    description: "This is not a valid email address format.",
    color: "red",
    icon: XCircle,
  },
};

export default function EmailValidatorPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleCheck = async () => {
    const e = email.trim();
    if (!e) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/tools/email-validator?email=${encodeURIComponent(e)}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ email: e, formatValid: false, hasMx: false, isDisposable: false, verdict: "invalid" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setEmail(""); setResult(null); };

  const iconColorCls = (color: string) => ({
    emerald: "text-emerald-500",
    amber: "text-amber-500",
    red: "text-red-500",
  })[color] || "text-muted-foreground";

  const borderBgCls = (color: string) => ({
    emerald: "border-emerald-500/20 bg-emerald-500/5",
    amber: "border-amber-500/20 bg-amber-500/5",
    red: "border-red-500/20 bg-red-500/5",
  })[color] || "";

  const labelCls = (color: string) => ({
    emerald: "text-emerald-600 dark:text-emerald-400",
    amber: "text-amber-600 dark:text-amber-400",
    red: "text-red-600 dark:text-red-400",
  })[color] || "";

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Free Tools</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-[12px] text-foreground">Email Address Verifier</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <MailCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              Free · No sign-up
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Email Address Verifier</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Check if an email address has a valid format, if its domain can receive mail, and whether it&apos;s a disposable address.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-1.5">Email Address</label>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="someone@example.com"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              {result && (
                <button onClick={handleReset} className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <button
            onClick={handleCheck}
            disabled={!email.trim() || loading}
            className="w-full py-3 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : "Verify Email"}
          </button>

          {result && (() => {
            const config = verdictConfig[result.verdict];
            const Icon = config.icon;
            return (
              <div className="space-y-4 pt-2">
                <div className={`rounded-2xl border p-5 ${borderBgCls(config.color)}`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColorCls(config.color)}`} />
                    <div>
                      <p className={`text-[14px] font-bold ${labelCls(config.color)}`}>{config.label}</p>
                      <p className="text-[13px] text-muted-foreground mt-1">{config.description}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border overflow-hidden">
                  {[
                    { label: "Email Address", value: result.email },
                    { label: "Format", value: result.formatValid ? "Valid" : "Invalid", pass: result.formatValid },
                    { label: "Domain", value: result.domain || result.email.split("@")[1] || "—" },
                    { label: "Has MX Records", value: result.hasMx ? "Yes" : "No", pass: result.hasMx },
                    { label: "Disposable Address", value: result.isDisposable ? "Yes — avoid" : "No", pass: !result.isDisposable },
                  ].map((row, i, arr) => (
                    <div key={row.label} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? "border-b border-border/60" : ""}`}>
                      <span className="text-[13px] text-muted-foreground">{row.label}</span>
                      <span className={`text-[13px] font-semibold ${
                        row.pass === undefined ? "text-foreground" :
                        row.pass ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
                      }`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-border bg-muted/20 p-4">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">About this check</p>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    This tool checks email format and MX records. It does not perform SMTP verification (no email is sent), so some addresses may still bounce. Domains configured as catch-all can accept any address at SMTP level, which may appear valid even when the exact mailbox is not real. For bulk email list cleaning with deeper validation, EmaReach&apos;s built-in list hygiene tool removes risky and undeliverable addresses automatically.
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <ToolsBottomCta description="EmaReach automatically validates and removes risky emails from your contact lists before every send." />
    </div>
  );
}
