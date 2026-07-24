"use client";

import { useState } from "react";
import Link from "next/link";
import { ToolsBottomCta } from "@/components/marketing/ToolsBottomCta";
import { FlaskConical, ArrowRight, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from "lucide-react";

const SPAM_SUBJECT_WORDS = [
  "free","guarantee","winner","cash","prize","urgent","act now","limited time",
  "offer expires","order now","buy now","risk-free","no risk","earn money","make money",
  "extra income","work from home","incredible","unbelievable","miracle","cheap","discount",
  "clearance","limited offer","bonus","gift","you have been selected","you are a winner",
  "congratulations","100%","!!!","$$$","click here","special promotion",
];

const POWER_WORDS = [
  "quick","how","why","what","secret","mistake","tip","guide","strategy","result",
  "proven","exclusive","behind the scenes","data","study","insight","honest",
];

const GENERIC_SUBJECTS = [
  "test",
  "hello",
  "hi",
  "follow up",
  "checking in",
  "quick question",
];

interface Analysis {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  length: number;
  wordCount: number;
  spamWords: string[];
  capsRatio: number;
  hasQuestion: boolean;
  hasNumber: boolean;
  hasPersonalization: boolean;
  hasPowerWord: boolean;
  hasEmoji: boolean;
  emojiCount: number;
  exclamations: number;
  issues: string[];
  positives: string[];
  suggestions: string[];
}

function analyzeSubject(subject: string): Analysis {
  const lower = subject.toLowerCase();
  const length = subject.length;
  const wordCount = subject.trim().split(/\s+/).filter(Boolean).length;
  const spamWords = SPAM_SUBJECT_WORDS.filter((w) => lower.includes(w));
  const letters = subject.replace(/[^A-Za-z]/g, "");
  const caps = letters.split("").filter((c) => c === c.toUpperCase() && c !== c.toLowerCase()).length;
  const capsRatio = letters.length > 0 ? caps / letters.length : 0;
  const hasQuestion = subject.includes("?");
  const hasNumber = /\d/.test(subject);
  const hasPersonalization = /\{[^}]+\}|\bname\b|\bfirst\b|\byour\b|\byou\b/i.test(subject);
  const hasPowerWord = POWER_WORDS.some((w) => lower.includes(w));
  const emojiMatches = subject.match(/\p{Emoji}/gu) || [];
  const hasEmoji = emojiMatches.length > 0;
  const emojiCount = emojiMatches.length;
  const exclamations = (subject.match(/!/g) || []).length;
  const isGenericSubject = GENERIC_SUBJECTS.includes(subject.trim().toLowerCase());

  const issues: string[] = [];
  const positives: string[] = [];
  const suggestions: string[] = [];

  if (length === 0) {
    issues.push("Subject line is empty");
  } else if (length < 20) {
    issues.push("Subject line is very short — may lack context");
    suggestions.push("Aim for 30–50 characters to give enough context without truncating");
  } else if (length > 60) {
    issues.push(`Subject is ${length} chars — may be truncated on mobile (Gmail shows ~60 chars)`);
    suggestions.push("Trim to under 50 characters for best mobile rendering");
  } else {
    positives.push(`Good length: ${length} characters`);
  }

  if (spamWords.length > 0) {
    issues.push(`${spamWords.length} spam trigger word${spamWords.length > 1 ? "s" : ""} detected`);
    suggestions.push("Replace spam words with specific, concrete language");
  }
  if (isGenericSubject) {
    issues.push("Subject is too generic and may reduce open rate");
    suggestions.push("Make the subject specific to the recipient or clear value");
  }

  if (capsRatio > 0.5) {
    issues.push("Excessive CAPS — looks like shouting and triggers spam filters");
    suggestions.push("Use sentence case or title case — not ALL CAPS");
  } else if (capsRatio > 0.3) {
    issues.push("High CAPS ratio — consider toning it down");
  }

  if (exclamations > 1) {
    issues.push(`${exclamations} exclamation marks — one or fewer is recommended`);
    suggestions.push("Remove extra exclamation marks for a more professional tone");
  }

  if (hasQuestion) positives.push("Contains a question — drives curiosity");
  if (hasNumber) positives.push("Contains a number — specific numbers boost open rates");
  if (hasPowerWord) positives.push("Contains a power word — drives engagement");
  if (hasPersonalization) positives.push("Uses personalization — increases relevance");
  if (hasEmoji && emojiCount === 1) positives.push("Single emoji — adds visual interest without overdoing it");
  if (hasEmoji && emojiCount > 2) {
    issues.push(`${emojiCount} emojis — too many can look spammy`);
    suggestions.push("Keep emoji to 1 per subject line maximum");
  }

  if (wordCount < 3) suggestions.push("Add more context — 5–9 words tend to perform best");
  if (!hasQuestion && !hasNumber && !hasPowerWord) suggestions.push("Try adding a number, question, or power word to boost curiosity");

  let score = 60;
  score += Math.min(20, positives.length * 5);
  score -= spamWords.length * 8;
  score -= isGenericSubject ? 10 : 0;
  score -= capsRatio > 0.5 ? 15 : capsRatio > 0.3 ? 8 : 0;
  score -= exclamations > 1 ? 8 : 0;
  score -= length > 60 ? 5 : length < 20 && length > 0 ? 5 : 0;
  score -= hasEmoji && emojiCount > 2 ? 5 : 0;
  score = Math.max(0, Math.min(100, score));

  const grade: Analysis["grade"] =
    score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 45 ? "D" : "F";

  return { score, grade, length, wordCount, spamWords, capsRatio, hasQuestion, hasNumber, hasPersonalization, hasPowerWord, hasEmoji, emojiCount, exclamations, issues, positives, suggestions };
}

const gradeColor: Record<string, string> = {
  A: "text-emerald-600 dark:text-emerald-400",
  B: "text-blue-600 dark:text-blue-400",
  C: "text-amber-600 dark:text-amber-400",
  D: "text-orange-600 dark:text-orange-400",
  F: "text-red-600 dark:text-red-400",
};

const gradeBg: Record<string, string> = {
  A: "border-emerald-500/30 bg-emerald-500/5",
  B: "border-blue-500/30 bg-blue-500/5",
  C: "border-amber-500/30 bg-amber-500/5",
  D: "border-orange-500/30 bg-orange-500/5",
  F: "border-red-500/30 bg-red-500/5",
};

const gradeBar: Record<string, string> = {
  A: "bg-emerald-500",
  B: "bg-blue-500",
  C: "bg-amber-500",
  D: "bg-orange-500",
  F: "bg-red-500",
};

const gradeLabel: Record<string, string> = {
  A: "Excellent — high likelihood of a strong open rate",
  B: "Good — solid subject, minor improvements possible",
  C: "Average — review issues for meaningful gains",
  D: "Below average — significant improvement needed",
  F: "Poor — likely to be filtered or ignored",
};

export default function SubjectLineAnalyzerPage() {
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);

  const handleAnalyze = () => {
    if (!subject.trim()) return;
    setResult(analyzeSubject(subject));
  };

  const handleReset = () => { setSubject(""); setResult(null); };

  return (
    <div className="min-h-screen">
      <section className="py-16 sm:py-20 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/tools" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Free Tools</Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-[12px] text-foreground">Subject Line Analyzer</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-pink-500" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              Free · No sign-up
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Subject Line Analyzer</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Score your email subject line for spam triggers, length, tone, personalization, and get actionable tips to boost open rates.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-foreground mb-1.5">
              Subject Line
              {subject && <span className="ml-2 text-muted-foreground font-normal">{subject.length} chars</span>}
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={subject}
                onChange={(e) => { setSubject(e.target.value); if (result) setResult(analyzeSubject(e.target.value)); }}
                placeholder="e.g. Quick question about your Q2 outreach"
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              {result && (
                <button onClick={handleReset} className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[12px] text-muted-foreground mt-1.5">Target: 30–50 characters · 5–9 words · Sentence or title case</p>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!subject.trim()}
            className="w-full py-3 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Analyze Subject Line
          </button>

          {result && (
            <div className="space-y-5 pt-2">
              {/* Score */}
              <div className={`rounded-2xl border p-6 ${gradeBg[result.grade]}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Subject Score</p>
                    <p className="text-[13px] text-muted-foreground">{gradeLabel[result.grade]}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-5xl font-black ${gradeColor[result.grade]}`}>{result.grade}</span>
                    <p className={`text-[13px] font-bold ${gradeColor[result.grade]}`}>{result.score}/100</p>
                  </div>
                </div>
                <div className="w-full bg-border/50 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-700 ${gradeBar[result.grade]}`} style={{ width: `${result.score}%` }} />
                </div>
              </div>

              {/* Stat pills */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { label: "Chars", value: result.length },
                  { label: "Words", value: result.wordCount },
                  { label: "Spam", value: result.spamWords.length, bad: result.spamWords.length > 0 },
                  { label: "CAPS%", value: `${Math.round(result.capsRatio * 100)}`, bad: result.capsRatio > 0.3 },
                  { label: "Emoji", value: result.emojiCount },
                  { label: "!", value: result.exclamations, bad: result.exclamations > 1 },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-muted/30 p-2.5 text-center">
                    <p className={`text-lg font-bold ${s.bad ? "text-red-500" : "text-foreground"}`}>{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Signal checks */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-muted/50 border-b border-border/60">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Signals</p>
                </div>
                {[
                  { label: "Contains a question", pass: result.hasQuestion, tip: "Questions drive curiosity" },
                  { label: "Contains a number", pass: result.hasNumber, tip: "Specificity improves opens" },
                  { label: "Uses personalization", pass: result.hasPersonalization, tip: "e.g. {first_name} or 'your'" },
                  { label: "Contains a power word", pass: result.hasPowerWord, tip: "e.g. secret, quick, proven" },
                  { label: "No spam trigger words", pass: result.spamWords.length === 0 },
                  { label: "Healthy CAPS ratio", pass: result.capsRatio <= 0.3 },
                  { label: "Good length (20–60 chars)", pass: result.length >= 20 && result.length <= 60 },
                ].map((row, i, arr) => (
                  <div key={row.label} className={`flex items-center justify-between px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-border/60" : ""}`}>
                    <div className="flex items-center gap-2">
                      {row.pass ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                      )}
                      <span className="text-[13px] text-foreground">{row.label}</span>
                    </div>
                    {row.tip && <span className="text-[11px] text-muted-foreground hidden sm:block">{row.tip}</span>}
                  </div>
                ))}
              </div>

              {/* Issues */}
              {result.issues.length > 0 && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <p className="text-[12px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-widest mb-3">Issues</p>
                  <ul className="space-y-2">
                    {result.issues.map((issue) => (
                      <li key={issue} className="flex items-start gap-2 text-[13px] text-foreground">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Positives */}
              {result.positives.length > 0 && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-[12px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">What&apos;s working</p>
                  <ul className="space-y-2">
                    {result.positives.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13px] text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <p className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Suggestions</p>
                  <ul className="space-y-2">
                    {result.suggestions.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[13px] text-foreground">
                        <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Spam words */}
              {result.spamWords.length > 0 && (
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Spam Words in Subject</p>
                  <div className="flex flex-wrap gap-2">
                    {result.spamWords.map((w) => (
                      <span key={w} className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[12px] font-medium">{w}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ToolsBottomCta description="EmaReach scores your subject line live as you write — with AI suggestions to maximize opens." />
    </div>
  );
}
