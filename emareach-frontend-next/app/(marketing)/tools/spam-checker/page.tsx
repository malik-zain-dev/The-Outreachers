"use client";

import { useState } from "react";
import Link from "next/link";
import { ToolsBottomCta } from "@/components/marketing/ToolsBottomCta";
import { TriangleAlert, ArrowRight, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

const SPAM_WORDS = [
  "free","guarantee","guaranteed","winner","winning","congratulations","cash","prize","urgent","act now",
  "limited time","offer expires","don't delete","special promotion","click here","order now","buy now",
  "risk-free","no risk","no credit check","no fees","no hidden","no obligation","100%","!!!","$$$",
  "earn money","make money","extra income","work from home","be your own boss","financial freedom",
  "double your","triple your","amazing","incredible","unbelievable","miracle","revolutionary",
  "as seen on","lose weight","cheap","discount","bargain","best price","lowest price","save big",
  "save up to","clearance","limited offer","once in a lifetime","exclusive deal","bonus","gift",
  "spam","unsubscribe","removal","opt in","opt out","subscribe","click below","visit website",
  "dear friend","dear homeowner","dear member","to be removed","if you no longer","while supplies last",
  "call now","contact us now","do it today","get it now","order today","supplies are limited",
  "this is not spam","you have been selected","you are a winner","you have been chosen",
];

const GENERIC_SUBJECTS = [
  "test",
  "hello",
  "hi",
  "quick question",
  "follow up",
  "checking in",
];

interface Result {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  foundWords: string[];
  capsRatio: number;
  exclamations: number;
  linkCount: number;
  subjectLength: number;
  issues: string[];
  suggestions: string[];
}

function analyze(subject: string, body: string): Result {
  const combined = (subject + " " + body).toLowerCase();
  const foundWords = SPAM_WORDS.filter((w) => combined.includes(w));

  const capsRatio = body.length > 0
    ? (body.replace(/[^A-Za-z]/g, "").split("").filter((c) => c === c.toUpperCase() && c !== c.toLowerCase()).length) /
      Math.max(body.replace(/[^A-Za-z]/g, "").length, 1)
    : 0;

  const exclamations = (combined.match(/!/g) || []).length;
  const linkCount = (body.match(/https?:\/\//gi) || []).length;
  const subjectLength = subject.trim().length;
  const bodyLength = body.trim().length;
  const wordCount = (body.trim().match(/\b[\w'-]+\b/g) || []).length;
  const isGenericSubject = GENERIC_SUBJECTS.includes(subject.trim().toLowerCase());

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (foundWords.length > 0) {
    issues.push(`${foundWords.length} spam trigger word${foundWords.length > 1 ? "s" : ""} detected`);
    suggestions.push("Replace spam words with specific, value-focused language");
  }
  if (capsRatio > 0.3) {
    issues.push(`High CAPS ratio (${Math.round(capsRatio * 100)}%) — looks like shouting`);
    suggestions.push("Use sentence case — excessive caps trigger spam filters");
  }
  if (exclamations > 2) {
    issues.push(`${exclamations} exclamation marks found — spam filters flag excessive punctuation`);
    suggestions.push("Use at most one exclamation mark in the entire email");
  }
  if (linkCount > 3) {
    issues.push(`${linkCount} links detected — high link density is a spam signal`);
    suggestions.push("Keep links to 1–2 per email, preferably just one clear CTA");
  }
  if (subjectLength > 60) {
    issues.push(`Subject line is ${subjectLength} characters — optimal is under 50`);
    suggestions.push("Shorten subject to 6–10 words for best open rates");
  }
  if (subjectLength > 0 && /re:|fwd:/i.test(subject)) {
    issues.push('Subject contains "Re:" or "Fwd:" — misleading openers hurt deliverability');
    suggestions.push("Avoid fake reply/forward prefixes in cold email subjects");
  }
  if (subjectLength > 0 && subjectLength < 4) {
    issues.push(`Subject is too short (${subjectLength} chars) — may look low quality or automated`);
    suggestions.push("Use a specific 4-10 word subject with clear intent");
  }
  if (isGenericSubject) {
    issues.push("Subject is too generic — this reduces trust and reply intent");
    suggestions.push("Use a specific subject tied to recipient context or value");
  }
  if (bodyLength > 0 && bodyLength < 40) {
    issues.push("Email body is too short — looks like a test message");
    suggestions.push("Add clear context, value, and one CTA in 50-120 words");
  }
  if (bodyLength > 0 && wordCount < 8) {
    issues.push("Very low word count in body — content may feel incomplete");
    suggestions.push("Expand the message with one benefit and one concrete ask");
  }

  let score = 100;
  score -= foundWords.length * 6;
  score -= capsRatio > 0.3 ? 15 : capsRatio > 0.2 ? 8 : 0;
  score -= exclamations > 2 ? 10 : exclamations > 1 ? 5 : 0;
  score -= linkCount > 3 ? 12 : linkCount > 2 ? 6 : 0;
  score -= subjectLength > 60 ? 5 : 0;
  score -= subjectLength > 0 && subjectLength < 4 ? 8 : 0;
  score -= isGenericSubject ? 8 : 0;
  score -= bodyLength > 0 && bodyLength < 40 ? 15 : 0;
  score -= bodyLength > 0 && wordCount < 8 ? 10 : 0;
  score = Math.max(0, Math.min(100, score));

  const grade: Result["grade"] =
    score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 45 ? "D" : "F";

  return { score, grade, foundWords, capsRatio, exclamations, linkCount, subjectLength, issues, suggestions };
}

const gradeColor: Record<string, string> = {
  A: "text-emerald-600 dark:text-emerald-400",
  B: "text-blue-600 dark:text-blue-400",
  C: "text-amber-600 dark:text-amber-400",
  D: "text-orange-600 dark:text-orange-400",
  F: "text-red-600 dark:text-red-400",
};

const gradeBg: Record<string, string> = {
  A: "bg-emerald-500/10 border-emerald-500/30",
  B: "bg-blue-500/10 border-blue-500/30",
  C: "bg-amber-500/10 border-amber-500/30",
  D: "bg-orange-500/10 border-orange-500/30",
  F: "bg-red-500/10 border-red-500/30",
};

export default function SpamCheckerPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const handleCheck = () => {
    if (!subject.trim() && !body.trim()) return;
    setResult(analyze(subject, body));
  };

  const handleReset = () => {
    setSubject("");
    setBody("");
    setResult(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              Free Tools
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-[12px] text-foreground">Spam Score Checker</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <TriangleAlert className="w-5 h-5 text-amber-500" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              Free · No sign-up
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Spam Score Checker</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Paste your email subject and body to detect spam trigger words, risky patterns, and get an instant deliverability score.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-1.5">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Quick question about your outreach strategy"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-1.5">
              Email Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Paste your full email body here..."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCheck}
              disabled={!subject.trim() && !body.trim()}
              className="flex-1 py-3 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:shadow-primary/40 hover:brightness-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:brightness-100"
            >
              Check Spam Score
            </button>
            {result && (
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>

          {result && (
            <div className="space-y-5 pt-2">
              {/* Score */}
              <div className={`rounded-2xl border p-6 ${gradeBg[result.grade]}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                      Spam Score
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      {result.score >= 90
                        ? "Excellent — safe to send"
                        : result.score >= 75
                        ? "Good — minor tweaks recommended"
                        : result.score >= 60
                        ? "Fair — review the issues below"
                        : result.score >= 45
                        ? "Poor — significant risk of spam filters"
                        : "Critical — likely to be flagged as spam"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-5xl font-black ${gradeColor[result.grade]}`}>{result.grade}</span>
                    <p className={`text-[13px] font-bold ${gradeColor[result.grade]}`}>{result.score}/100</p>
                  </div>
                </div>
                <div className="w-full bg-border/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      result.grade === "A" ? "bg-emerald-500" :
                      result.grade === "B" ? "bg-blue-500" :
                      result.grade === "C" ? "bg-amber-500" :
                      result.grade === "D" ? "bg-orange-500" : "bg-red-500"
                    }`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Spam Words", value: result.foundWords.length, bad: result.foundWords.length > 0 },
                  { label: "CAPS Ratio", value: `${Math.round(result.capsRatio * 100)}%`, bad: result.capsRatio > 0.2 },
                  { label: "Exclamations", value: result.exclamations, bad: result.exclamations > 2 },
                  { label: "Links", value: result.linkCount, bad: result.linkCount > 3 },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-muted/30 p-3 text-center">
                    <p className={`text-xl font-bold ${stat.bad ? "text-red-500" : "text-emerald-500"}`}>{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Issues */}
              {result.issues.length > 0 && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <p className="text-[12px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-widest mb-3">Issues Found</p>
                  <ul className="space-y-2">
                    {result.issues.map((issue) => (
                      <li key={issue} className="flex items-start gap-2 text-[13px] text-foreground">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Spam words */}
              {result.foundWords.length > 0 && (
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Spam Trigger Words Detected</p>
                  <div className="flex flex-wrap gap-2">
                    {result.foundWords.map((word) => (
                      <span key={word} className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[12px] font-medium">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-[12px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">Suggestions</p>
                  <ul className="space-y-2">
                    {result.suggestions.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[13px] text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.issues.length === 0 && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-[13px] text-foreground font-medium">No spam issues detected — your email looks clean.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <ToolsBottomCta description="EmaReach checks your copy in real-time as you write — so you never send a risky email." />
    </div>
  );
}
