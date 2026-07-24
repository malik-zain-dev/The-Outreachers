"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import {
  Inbox,
  ArrowRight,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  RefreshCw,
  Mail,
  Send,
  Tag,
  Clock,
} from "lucide-react";

type Step = "idle" | "generated" | "checking" | "done";

interface Receiver { email: string; provider: string; }
interface PlacementResult { provider: string; email: string; placement: "inbox" | "spam" | "promotions" | "not_found" | "error"; }

interface Session {
  test_id: string;
  marker: string;
  tag: string;
  receivers: Receiver[];
}

const placementConfig = {
  inbox: { label: "Inbox", color: "emerald", icon: CheckCircle2 },
  spam: { label: "Spam / Junk", color: "red", icon: XCircle },
  promotions: { label: "Promotions Tab", color: "amber", icon: AlertTriangle },
  not_found: { label: "Not Delivered Yet", color: "gray", icon: Clock },
  error: { label: "Check Error", color: "gray", icon: AlertTriangle },
};

const providerIcon: Record<string, string> = {
  gmail: "G",
  outlook: "O",
};

const providerLabel: Record<string, string> = {
  gmail: "Gmail",
  outlook: "Outlook / Microsoft 365",
};

export default function InboxPlacementTestPage() {
  const [step, setStep] = useState<Step>("idle");
  const [session, setSession] = useState<Session | null>(null);
  const [results, setResults] = useState<PlacementResult[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleStart = async () => {
    setError("");
    setStep("idle");
    setSession(null);
    setResults([]);
    try {
      const res = await fetch("/api/tools/inbox-placement/start", { method: "POST" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.detail || d.error || "Failed to create test session");
        return;
      }
      const data = await res.json();
      setSession(data);
      setStep("generated");
    } catch {
      setError("Network error — please try again");
    }
  };

  const handleCheck = async () => {
    if (!session) return;
    setStep("checking");
    setError("");
    try {
      const res = await fetch(`/api/tools/inbox-placement/${session.test_id}`);
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.detail || d.error || "Failed to check placement");
        setStep("generated");
        return;
      }
      const data = await res.json();
      setResults(data.results || []);
      setStep("done");
    } catch {
      setError("Network error — please try again");
      setStep("generated");
    }
  };

  const handleReset = () => {
    setStep("idle");
    setSession(null);
    setResults([]);
    setError("");
  };

  const colorCls = (color: string) => ({
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
    red: "border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400",
    amber: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400",
    gray: "border-border bg-muted/30 text-muted-foreground",
  })[color] || "";

  const iconColorCls = (color: string) => ({
    emerald: "text-emerald-500",
    red: "text-red-500",
    amber: "text-amber-500",
    gray: "text-muted-foreground",
  })[color] || "text-muted-foreground";

  const allInbox = results.length > 0 && results.every((r) => r.placement === "inbox");
  const anySpam = results.some((r) => r.placement === "spam");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Free Tools</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-[12px] text-foreground">Inbox Placement Test</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Inbox className="w-5 h-5 text-blue-500" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              Free · No sign-up
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Inbox Placement Test</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Send a real email to our seed addresses, then check whether it lands in inbox, spam, or promotions across Gmail and Outlook. No bots — real mailboxes.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step indicators */}
          <div className="flex items-center gap-0 mb-10">
            {[
              { n: 1, label: "Get seed addresses", active: true },
              { n: 2, label: "Send your email", active: step !== "idle" },
              { n: 3, label: "Check results", active: step === "done" || step === "checking" },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold border-2 transition-all ${
                    s.active
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground bg-background"
                  }`}>
                    {s.n}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium text-center leading-tight ${s.active ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all ${step !== "idle" && i === 0 ? "bg-primary" : step === "done" && i === 1 ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-foreground">{error}</p>
            </div>
          )}

          {/* Step 1: Generate session */}
          {step === "idle" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-muted/20 p-6">
                <h2 className="text-[15px] font-bold text-foreground mb-3">How it works</h2>
                <ol className="space-y-3">
                  {[
                    { icon: Tag, text: "Click below to get unique seed email addresses + a tracking tag" },
                    { icon: Send, text: "Send your real email to those addresses — include the tag in your subject" },
                    { icon: Mail, text: "Wait 30–60 seconds for delivery, then click Check Placement" },
                    { icon: CheckCircle2, text: "See exactly where your email landed: inbox, spam, or promotions" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-[13px] text-muted-foreground leading-snug">{item.text}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <button
                onClick={handleStart}
                className="w-full py-3.5 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                Generate Seed Addresses
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Session generated — show seed addresses + instructions */}
          {(step === "generated" || step === "checking" || step === "done") && session && (
            <div className="space-y-5">

              {/* Seed addresses */}
              <div className="rounded-2xl border border-border bg-background overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border/60 bg-muted/30 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-foreground uppercase tracking-wider">Seed Addresses</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Send your email to ALL of these</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(session.receivers.map((r) => r.email).join(", "), "all-emails")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                  >
                    <Copy className="w-3 h-3" />
                    {copied === "all-emails" ? "Copied!" : "Copy all"}
                  </button>
                </div>
                {session.receivers.map((r) => (
                  <div key={r.email} className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                        r.provider === "gmail" ? "bg-red-500/10 text-red-600" : "bg-blue-500/10 text-blue-600"
                      }`}>
                        {providerIcon[r.provider] || r.provider[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-mono text-[13px] text-foreground">{r.email}</p>
                        <p className="text-[11px] text-muted-foreground">{providerLabel[r.provider] || r.provider}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(r.email, r.email)}
                      className="px-2.5 py-1 rounded-lg border border-border text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      {copied === r.email ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Subject tag */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-primary/20 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <p className="text-[12px] font-bold text-foreground uppercase tracking-wider">Required: Subject Tag</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[13px] text-muted-foreground mb-3">
                    Include this exact tag somewhere in your email subject so we can find your email in the mailbox:
                  </p>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 font-mono text-[14px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-xl px-4 py-2.5">
                      {session.tag}
                    </code>
                    <button
                      onClick={() => copyToClipboard(session.tag, "tag")}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border text-[12px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all flex-shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copied === "tag" ? "Copied!" : "Copy tag"}
                    </button>
                  </div>
                  <p className="text-[12px] text-muted-foreground mt-3">
                    Example subject: <em className="text-foreground">&ldquo;Quick question about your Q2 strategy {session.tag}&rdquo;</em>
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Steps</p>
                <ol className="space-y-2">
                  {[
                    `Copy the seed addresses above`,
                    `Open your email client (Gmail, Outlook, or your cold email tool)`,
                    `Compose a new email with your actual subject + body`,
                    `Add ${session.tag} to your subject line`,
                    `Send to all seed addresses`,
                    `Wait 30–60 seconds, then click Check Placement below`,
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                      <span className="text-[11px] font-bold text-primary bg-primary/10 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Check button */}
              {step !== "done" && (
                <button
                  onClick={handleCheck}
                  disabled={step === "checking"}
                  className="w-full py-3.5 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {step === "checking" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Checking mailboxes...</>
                  ) : (
                    <><Mail className="w-4 h-4" /> Check Inbox Placement</>
                  )}
                </button>
              )}

              {/* Results */}
              {step === "done" && results.length > 0 && (
                <div className="space-y-4">
                  {/* Summary banner */}
                  <div className={`rounded-2xl border p-4 ${allInbox ? "border-emerald-500/20 bg-emerald-500/5" : anySpam ? "border-red-500/20 bg-red-500/5" : "border-amber-500/20 bg-amber-500/5"}`}>
                    <div className="flex items-start gap-3">
                      {allInbox ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : anySpam ? (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-[14px] font-bold ${allInbox ? "text-emerald-600 dark:text-emerald-400" : anySpam ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>
                          {allInbox
                            ? "All inboxes — great deliverability!"
                            : anySpam
                            ? "Spam detected — action needed"
                            : "Mixed results — review below"}
                        </p>
                        <p className="text-[13px] text-muted-foreground mt-1">
                          {allInbox
                            ? "Your email is landing in the primary inbox across all tested providers."
                            : anySpam
                            ? "Your email is being flagged as spam. Check your authentication (SPF/DKIM) and content."
                            : "Some providers may not have received the email yet. Try checking again in a minute."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Per-provider results */}
                  <div className="space-y-3">
                    {results.map((r) => {
                      const config = placementConfig[r.placement] ?? placementConfig.not_found;
                      const Icon = config.icon;
                      return (
                        <div key={r.email} className={`rounded-xl border p-4 flex items-center gap-4 ${colorCls(config.color)}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-black flex-shrink-0 ${
                            r.provider === "gmail" ? "bg-red-500/10 text-red-600" : "bg-blue-500/10 text-blue-600"
                          }`}>
                            {providerIcon[r.provider] || "?"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-foreground">{providerLabel[r.provider] || r.provider}</p>
                            <p className="font-mono text-[11px] text-muted-foreground truncate">{r.email}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Icon className={`w-4 h-4 ${iconColorCls(config.color)}`} />
                            <span className={`text-[13px] font-bold ${iconColorCls(config.color)}`}>{config.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Re-check / reset */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleCheck}
                      className="flex-1 py-2.5 rounded-xl border border-border text-[13px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Check again
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 py-2.5 rounded-xl border border-border text-[13px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                    >
                      New test
                    </button>
                  </div>
                </div>
              )}

              {/* Reset link (when generated/checking) */}
              {step !== "done" && (
                <button onClick={handleReset} className="w-full text-center text-[12px] text-muted-foreground hover:text-foreground transition-colors py-1">
                  Start over
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* What affects placement */}
      <section className="py-12 sm:py-16 border-t border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[15px] font-bold text-foreground mb-5">What determines inbox placement?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "SPF / DKIM / DMARC", body: "Missing or misconfigured authentication is the #1 reason cold emails land in spam." },
              { title: "Domain warm-up age", body: "New domains sent to immediately almost always hit spam. Warm up first." },
              { title: "Email content", body: "Spam trigger words, high link density, and big images all hurt inbox placement." },
              { title: "Sender reputation", body: "If your domain or IP is on a blacklist, even perfect content won't make it." },
              { title: "Send volume & cadence", body: "Sending 500 emails per day on a fresh inbox signals mass blasting to filters." },
              { title: "Subject line", body: "ALL CAPS, excessive exclamation marks, and obvious spam words filter you immediately." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-[13px] font-bold text-foreground mb-1">{item.title}</p>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            EmaReach runs inbox placement tests automatically for every campaign — so you know before you send at scale.
          </p>
          <MarketingCtaButtons
            size="sm"
            trackLabels={{ primary: "book_demo", secondary: "hero_start_trial" }}
          />
          <Link
            href="/tools"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            More free tools
          </Link>
        </div>
      </section>
    </div>
  );
}
