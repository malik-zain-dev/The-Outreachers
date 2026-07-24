import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "We booked 23 demos in the first week. I've never seen reply rates like this from cold email. The AI sequences sound genuinely human.",
    name: "Sarah K.",
    role: "Head of Sales",
    company: "Growthly",
    avatar: "SK",
    stars: 5,
    metric: "23 demos / week 1",
    color: "from-sky-500 to-blue-600",
  },
  {
    quote:
      "Setup took 8 minutes. The AI-written sequences outperformed everything our team wrote manually — by a factor of 3.",
    name: "Marcus T.",
    role: "Founder",
    company: "DevPipe",
    avatar: "MT",
    stars: 5,
    metric: "3× reply rate",
    color: "from-violet-500 to-purple-600",
  },
  {
    quote:
      "92% inbox delivery isn't a marketing claim — we audited it. EmaReach is the real deal for cold outreach at scale.",
    name: "Priya N.",
    role: "RevOps Lead",
    company: "Stackr",
    avatar: "PN",
    stars: 5,
    metric: "92% inbox rate",
    color: "from-emerald-500 to-teal-600",
  },
  {
    quote:
      "Warm-up was the missing piece. After 2 weeks our domains went from 40% spam to 95% inbox. Unbelievable difference.",
    name: "James L.",
    role: "Growth Lead",
    company: "Launchpad",
    avatar: "JL",
    stars: 5,
    metric: "40% → 95% inbox",
    color: "from-amber-500 to-orange-600",
  },
  {
    quote:
      "The unified inbox changed how my team works. Everyone sees replies in one place — no more lost leads in 5 different accounts.",
    name: "Ana R.",
    role: "VP Sales",
    company: "RevFlow",
    avatar: "AR",
    stars: 5,
    metric: "0 missed replies",
    color: "from-rose-500 to-pink-600",
  },
  {
    quote:
      "A/B testing on sequence steps made us realize our subject lines were killing us. Fixed it in a day. Open rate went from 28% to 61%.",
    name: "Tom W.",
    role: "SDR Manager",
    company: "Closr",
    avatar: "TW",
    stars: 5,
    metric: "28% → 61% opens",
    color: "from-indigo-500 to-blue-700",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function FeaturesTestimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest mb-4 border border-amber-500/20">
            <Star className="w-3 h-3 fill-amber-500" />
            Rated 4.9/5 by 600+ users
          </span>
          <h2
            className="font-black leading-tight tracking-tight text-foreground mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.025em" }}
          >
            Real results. Real teams.
          </h2>
          <p className="text-muted-foreground text-lg">
            Sales teams using EmaReach see measurable lift in inbox rates and replies within the first week.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Top: stars + metric */}
              <div className="flex items-center justify-between mb-4">
                <StarRow count={t.stars} />
                <span
                  className="text-[11px] font-black px-2.5 py-1 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${
                      i % 3 === 0
                        ? "hsl(199 89% 48%), hsl(217 91% 60%)"
                        : i % 3 === 1
                        ? "hsl(270 76% 55%), hsl(292 84% 61%)"
                        : "hsl(142 76% 36%), hsl(160 84% 39%)"
                    })`,
                    color: "white",
                  }}
                >
                  {t.metric}
                </span>
              </div>

              {/* Quote */}
              <p className="text-foreground font-medium leading-relaxed mb-5 text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-black text-xs flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Source badges */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-3 text-xs text-muted-foreground">
          {["G2", "Capterra", "Product Hunt"].map((source) => (
            <span
              key={source}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card font-medium"
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {source} — 4.9/5
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
