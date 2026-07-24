import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How does AI email generation actually work?",
    answer:
      "You describe your offer and target audience. Our AI drafts a full multi-step sequence — subject lines, body copy, and follow-ups — in seconds. It uses industry, role, and company context to write copy that sounds personal, not templated. Spam trigger detection and readability scoring are built in. You review and edit any step before you launch.",
    tag: "AI writing",
  },
  {
    question: "Can I connect my own domain and Gmail inbox?",
    answer:
      "Yes. Connect Gmail via OAuth in one click — no app passwords or IMAP setup required. You can also add custom domains using our DNS wizard. Multiple inboxes and domains are supported on all plans, each with independent warm-up schedules and sending limits.",
    tag: "Setup",
  },
  {
    question: "How long does warm-up take, and how does it work?",
    answer:
      "Warm-up typically takes 2–4 weeks depending on domain age and starting volume. EmaReach automates the entire process: we send realistic emails between a network of warmed inboxes, building your sender reputation gradually. You'll see your deliverability score improve in real time inside the dashboard.",
    tag: "Deliverability",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes — 7 days on the Starter plan, no credit card required. You get full access to AI sequences, warm-up, analytics, and all integrations during the trial. Cancel in one click anytime from your account settings.",
    tag: "Billing",
  },
  {
    question: "What integrations do you support?",
    answer:
      "Gmail and Google Workspace for sending, CSV for lead imports, and two-way CRM sync with HubSpot and Salesforce. We also offer a full REST API and webhook support for custom integrations. Zapier is coming soon.",
    tag: "Integrations",
  },
  {
    question: "How do you guarantee emails land in the inbox?",
    answer:
      "We combine four layers: domain warm-up, human-like sending patterns, spam-safe copy generation, and real-time reputation monitoring. Most customers reach 90%+ inbox placement within 2 weeks. Our analytics surface bounce rates, spam folder rates, and blocklist detections so you can act on issues before they compound.",
    tag: "Deliverability",
  },
  {
    question: "Can I scale to multiple team members and domains?",
    answer:
      "Absolutely. Team accounts support role-based permissions so SDRs only see what they need. You can add unlimited sending domains and inbox accounts (limits vary by plan). Auto-rotation distributes sends across all inboxes automatically.",
    tag: "Teams",
  },
];

const TAG_COLORS: Record<string, string> = {
  "AI writing": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Setup": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "Deliverability": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Billing": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "Integrations": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Teams": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

export function FeaturesFAQ() {
  return (
    <section className="py-20 lg:py-28 bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
            FAQ
          </span>
          <h2
            className="font-black leading-tight tracking-tight text-foreground mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.025em" }}
          >
            Common questions,
            <br />
            <span className="text-muted-foreground font-medium">straight answers.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* Accordion */}
        <div className="rounded-2xl border border-border overflow-hidden bg-card">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-border last:border-0 px-0"
              >
                <AccordionTrigger className="px-6 py-5 text-left font-bold text-foreground text-[15px] hover:no-underline hover:bg-muted/30 transition-colors duration-150 group">
                  <div className="flex items-start gap-3 text-left flex-1 mr-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${
                        TAG_COLORS[faq.tag] || "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {faq.tag}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground font-medium leading-relaxed text-[15px] border-t border-border/50 pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom link */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-sm mb-3">
            Still have questions? We&apos;re happy to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
          >
            Contact our team
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
