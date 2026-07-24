"use client";

import { useState } from "react";
import Link from "next/link";
import { ToolsBottomCta } from "@/components/marketing/ToolsBottomCta";
import { Ban, ArrowRight, Loader2, CheckCircle2, XCircle, RefreshCw, AlertTriangle } from "lucide-react";

interface BlacklistResult { name: string; listed: boolean; }
interface Result {
  target: string;
  isIp: boolean;
  results: BlacklistResult[];
  listedCount: number;
  clean: boolean;
}

export default function BlacklistCheckerPage() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const normalizeTargetInput = (value: string) => {
    const normalized = value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    return normalized.includes("@") ? normalized.split("@").pop() ?? "" : normalized;
  };

  const handleCheck = async () => {
    const t = normalizeTargetInput(target);
    if (!t) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/tools/blacklist-checker?target=${encodeURIComponent(t)}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setTarget(""); setResult(null); };

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Free Tools</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-[12px] text-foreground">Blacklist Checker</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Ban className="w-5 h-5 text-red-500" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              Free · No sign-up
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Blacklist Checker</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Check if a domain or IP address is listed on major email blacklists including Spamhaus, Barracuda, SpamCop, and more.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-1.5">Domain or IP Address</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="e.g. yourdomain.com, name@yourdomain.com, or 1.2.3.4"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              {result && (
                <button onClick={handleReset} className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[12px] text-muted-foreground mt-2">Works for domains, subdomains, and IPv4 addresses.</p>
          </div>
          <button
            onClick={handleCheck}
            disabled={!target.trim() || loading}
            className="w-full py-3 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking blacklists...</> : "Check Blacklists"}
          </button>

          {result && (
            <div className="space-y-4 pt-2">
              {/* Summary */}
              <div className={`rounded-2xl border p-5 ${result.clean ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                <div className="flex items-start gap-3">
                  {result.clean ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`text-[15px] font-bold ${result.clean ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                      {result.clean ? "Not listed on any blacklist" : `Listed on ${result.listedCount} blacklist${result.listedCount > 1 ? "s" : ""}`}
                    </p>
                    <p className="text-[13px] text-muted-foreground mt-1">
                      Checked <strong className="text-foreground">{result.target}</strong> ({result.isIp ? "IP address" : "domain"}) against {result.results.length} blacklists
                    </p>
                    {!result.clean && (
                      <p className="text-[13px] text-muted-foreground mt-2">
                        Being listed can severely impact email deliverability. Request removal from each listed blacklist immediately.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Score bar */}
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest">Reputation Score</span>
                  <span className={`text-[14px] font-bold ${result.clean ? "text-emerald-500" : result.listedCount <= 1 ? "text-amber-500" : "text-red-500"}`}>
                    {result.clean ? "Clean" : result.listedCount <= 1 ? "At Risk" : "Flagged"}
                  </span>
                </div>
                <div className="w-full bg-border/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${result.clean ? "bg-emerald-500" : result.listedCount <= 1 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${Math.max(0, 100 - (result.listedCount / result.results.length) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  {result.results.length - result.listedCount} of {result.results.length} blacklists: clean
                </p>
              </div>

              {/* Results table */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-2.5 bg-muted/50 border-b border-border/60">
                  <span className="col-span-8 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Blacklist</span>
                  <span className="col-span-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Status</span>
                </div>
                {result.results.map((r, i) => (
                  <div key={r.name} className={`grid grid-cols-12 px-4 py-3 items-center ${i < result.results.length - 1 ? "border-b border-border/60" : ""} ${r.listed ? "bg-red-500/3" : ""}`}>
                    <span className="col-span-8 text-[13px] text-foreground font-medium">{r.name}</span>
                    <div className="col-span-4 flex items-center gap-1.5">
                      {r.listed ? (
                        <>
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="text-[12px] font-semibold text-red-600 dark:text-red-400">Listed</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-[12px] font-semibold text-emerald-600 dark:text-emerald-400">Clean</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {!result.clean && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-semibold text-foreground mb-1">How to get delisted</p>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">
                        Visit the delisting page for each blacklist you appear on, follow their removal process, and fix the root cause (compromised account, spam complaints, or sending to spam traps) before requesting removal.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ToolsBottomCta description="EmaReach monitors your sender reputation continuously and alerts you before you end up on a blacklist." />
    </div>
  );
}
