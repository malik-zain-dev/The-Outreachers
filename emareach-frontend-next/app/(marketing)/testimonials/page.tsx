import type { Metadata } from "next";
import { MarketingCtaButtons } from "@/components/marketing/MarketingCtaButtons";
import { Star, CheckCircle2, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Stories | EmaReach – Cold Email That Lands in the Inbox",
  description:
    "Real results from sales teams and founders: emails that land in the inbox, higher reply rates, and better deliverability.",
  keywords:
    "EmaReach testimonials, customer stories, cold email success, sales outreach reviews, inbox placement",
};

const caseStudies = [
  {
    company: "Scalebase",
    industry: "B2B SaaS",
    challenge:
      "Bootstrapped startup with no sales team. Cold emails were landing in spam and we couldn't afford to burn our domain.",
    solution:
      "Used EmaReach's domain warm-up and AI personalization. Set up 5-touch sequences with smart delays.",
    results: [
      { metric: "Reply rate", before: "2%", after: "12%+", label: "6x increase" },
      { metric: "Pipeline", before: "$0", after: "$500K", label: "in 90 days" },
    ],
    quote:
      "EmaReach helped us go from 0 to $50K MRR in 6 months using only cold email. The domain warm-up saved us from spam folder disaster.",
    author: "Michael Chen",
    role: "Founder & CEO, Scalebase",
  },
  {
    company: "Velocity Marketing",
    industry: "Marketing Agency",
    challenge:
      "Managing 12 client campaigns with deliverability issues. Showing ROI to clients was difficult.",
    solution:
      "Migrated all clients to EmaReach with separate warm-up tracks and inbox rotation. Built custom analytics per client.",
    results: [
      {
        metric: "Deliverability",
        before: "72%",
        after: "96%",
        label: "+24%",
      },
      {
        metric: "Client retention",
        before: "60%",
        after: "95%",
        label: "+35%",
      },
    ],
    quote:
      "Before EmaReach we lost 2 clients due to spam. Now we manage 12+ with zero deliverability problems. The ROI dashboard makes reporting easy.",
    author: "Sarah Martinez",
    role: "CEO, Velocity Marketing",
  },
  {
    company: "Vertex Systems",
    industry: "Enterprise Software",
    challenge:
      "SDR team spending 60% of time on manual follow-ups. Reply rates declining. Needed to scale without hiring.",
    solution:
      "Deployed EmaReach across 12 SDRs with 7-touch sequences, inbox rotation, and AI personalization.",
    results: [
      {
        metric: "Reply rate",
        before: "5%",
        after: "15%",
        label: "3x improvement",
      },
      {
        metric: "Meetings booked",
        before: "40/mo",
        after: "180/mo",
        label: "4.5x increase",
      },
    ],
    quote:
      "Our SDRs went from 60% time on follow-ups to focusing on closing. Reply rates tripled and we booked 4.5x more meetings without adding headcount.",
    author: "David Park",
    role: "VP Sales, Vertex Systems",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "VP of Sales",
    company: "Vertex Systems",
    content:
      "EmaReach AI transformed our entire outreach strategy. We've seen a 3x increase in response rates and our team saves 20+ hours per week. The AI-generated emails are indistinguishable from hand-written ones.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Founder & CEO",
    company: "Scalebase",
    content:
      "As a startup founder, I wear many hats. EmaReach AI handles our entire outbound sales process. The domain warmup feature alone has saved us from deliverability nightmares.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Nexus Analytics",
    content:
      "The analytics dashboard is incredible. We can see exactly what's working and optimize in real-time. Our email campaigns have never performed better.",
    avatar: "ER",
  },
  {
    name: "David Park",
    role: "Sales Manager",
    company: "Pinnacle Enterprise",
    content:
      "We've tried every cold email tool out there. EmaReach AI is hands down the best. The AI personalization and deliverability features are unmatched.",
    avatar: "DP",
  },
  {
    name: "Jennifer Martinez",
    role: "Head of Growth",
    company: "FlowStack",
    content:
      "The ROI speaks for itself. Within 3 months, we've generated 5x more qualified leads than our previous solution. The platform is intuitive and powerful.",
    avatar: "JM",
  },
  {
    name: "Robert Williams",
    role: "Business Development Lead",
    company: "Meridian Consulting",
    content:
      "EmaReach AI's automation has been a game-changer. We can now focus on closing deals instead of writing emails. The warmup feature ensures our emails always land in the inbox.",
    avatar: "RW",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Customer Stories</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Loved by sales teams and founders
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground">
              See how teams use EmaReach to boost reply rates and save time.
            </p>
          </div>

          {/* Case Studies - detailed success stories */}
          <div className="space-y-12 max-w-6xl mx-auto mb-20">
            <h2 className="text-2xl font-bold text-center mb-10">
              Detailed success stories
            </h2>
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="rounded-2xl border-2 border-border bg-card p-8 lg:p-10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {study.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{study.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      {study.industry}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-destructive">Challenge</span>
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Solution
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                  {study.results.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border"
                    >
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">{r.metric}:</span>
                      <span className="text-muted-foreground line-through">
                        {r.before}
                      </span>
                      <span className="text-primary font-bold">
                        → {r.after}
                      </span>
                      <span className="text-xs font-medium text-green-700 dark:text-green-400">
                        ({r.label})
                      </span>
                    </div>
                  ))}
                </div>
                <blockquote className="pl-4 border-l-4 border-primary/30 italic text-foreground">
                  &ldquo;{study.quote}&rdquo;
                </blockquote>
                <p className="mt-3 text-sm font-semibold">{study.author}</p>
                <p className="text-xs text-muted-foreground">{study.role}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-center mb-10">
            What our customers say
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 lg:p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                <p className="text-lg text-foreground mb-6 leading-relaxed flex-grow">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground">
              Join 5,000+ companies already scaling their email outreach
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                95%+
              </div>
              <div className="text-sm lg:text-base text-muted-foreground">
                Deliverability Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                10M+
              </div>
              <div className="text-sm lg:text-base text-muted-foreground">
                Emails Sent Monthly
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                5,000+
              </div>
              <div className="text-sm lg:text-base text-muted-foreground">
                Active Companies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to join our success stories?
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10">
              Start transforming your email outreach today with EmaReach AI.
            </p>
            <MarketingCtaButtons
              primary={{ href: "/book-demo", label: "Book a demo" }}
              trackLabels={{ primary: "book_demo", secondary: "testimonials_start_trial" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
