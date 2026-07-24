import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Check, Sparkles, Star } from "lucide-react";

const TRUST_CHIPS = [
  "Free plan, no card",
  "7-day Starter trial",
  "Cancel anytime",
] as const;

const AVATARS = [
  "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80",
  "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=80",
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80",
  "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=80",
] as const;

type Props = {
  singlePlanId?: string;
};

export function PricingHero({ singlePlanId }: Props) {
  return (
    <header className="relative overflow-hidden pt-12 pb-9 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
      {/* Ambient spotlight anchored behind the headline — gives the hero depth
          instead of sitting on a flat wash. Purely decorative. */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 flex justify-center" aria-hidden>
        <div className="h-[420px] w-[min(90vw,760px)] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(199_89%_48%/0.18),transparent_62%)] blur-2xl dark:bg-[radial-gradient(ellipse_at_center,hsl(199_89%_55%/0.26),transparent_62%)]" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-4 -z-10 h-64 w-64 -translate-x-[140%] rounded-full bg-[radial-gradient(circle,hsl(270_76%_55%/0.12),transparent_65%)] blur-2xl" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link for single plan */}
        {singlePlanId && (
          <div className="mb-8 flex">
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              View all plans
            </Link>
          </div>
        )}

        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow — refined glass badge instead of bare label */}
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] py-1.5 pl-2.5 pr-4 text-[11px] font-bold uppercase tracking-[0.16em] text-primary shadow-sm shadow-primary/5 backdrop-blur-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                <Sparkles className="h-3 w-3" aria-hidden />
              </span>
              Simple, transparent pricing
            </span>
          </div>

          {/* Headline — the thesis: flat, all-inclusive pricing */}
          <h1 className="text-balance text-4xl font-black leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            {singlePlanId ? (
              "Subscribe to this plan"
            ) : (
              <>
                One plan. Everything included.
                <br className="hidden sm:block" />{" "}
                <span className="relative inline-block">
                  {/* Soft glow behind the accent line for a premium finish */}
                  <span
                    className="pointer-events-none absolute inset-0 -z-10 translate-y-1 bg-[linear-gradient(100deg,hsl(199_89%_48%),hsl(217_91%_60%)_48%,hsl(270_76%_55%))] opacity-25 blur-2xl"
                    aria-hidden
                  />
                  <span className="bg-[linear-gradient(100deg,hsl(199_89%_48%),hsl(217_91%_60%)_48%,hsl(270_76%_55%))] bg-clip-text text-transparent">
                    No per-inbox surprises.
                  </span>
                </span>
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {singlePlanId
              ? "Same pricing and features as our main page. Choose billing and subscribe below."
              : "AI campaigns, personalization, automation, and analytics in every plan. Start free — no credit card required."}
          </p>

          {/* Trust + social proof — one refined bar with a subtle surface */}
          <div className="mt-8 flex justify-center">
            <div className="flex flex-col items-center gap-x-6 gap-y-4 rounded-2xl border border-border/60 bg-card/50 px-5 py-3.5 shadow-sm shadow-foreground/[0.03] backdrop-blur-sm sm:flex-row">
              {/* Trust chips */}
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                {TRUST_CHIPS.map((label) => (
                  <li key={label} className="flex items-center gap-1.5 text-foreground/80">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15">
                      <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3.5} aria-hidden />
                    </span>
                    <span className="font-medium">{label}</span>
                  </li>
                ))}
              </ul>

              {/* Divider on desktop */}
              <span className="hidden h-6 w-px bg-border sm:block" aria-hidden />

              {/* Social proof */}
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {AVATARS.map((src) => (
                    <Avatar key={src} className="h-6 w-6 border-2 border-card shadow-sm ring-1 ring-border/40">
                      <AvatarImage src={src} alt="" />
                    </Avatar>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">4.9</span>
                  <span className="text-sm font-medium text-muted-foreground">/ 5,000+ businesses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
