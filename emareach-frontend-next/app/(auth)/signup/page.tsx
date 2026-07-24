"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Sparkles, Check } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLoadingScreen } from "@/components/AuthLoadingScreen";

/** Cal.id booking ("call id") — replaces self-serve signup with a live onboarding call. */
const CAL_LINK = "mohammedazizuddin/product-walkthrough";

const benefits = [
  "See EmaReach set up on your domain, live",
  "Full access to every feature — open source",
  "No credit card, no commitment",
];

export default function SignupPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { resolvedTheme } = useTheme();
  const calTheme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/dashboard?onboarding=1");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({
          namespace: "default",
          embedJsUrl: "https://cal.id/embed-link/embed.js",
        });
        cal("ui", {
          theme: calTheme,
          cssVarsPerTheme: {
            light: { "cal-brand": "#007ee5" },
            dark: {
              "cal-brand": "#007ee5",
              "cal-bg-emphasis": "hsl(222 47% 8%)",
              "cal-bg": "hsl(222 47% 9%)",
              "cal-bg-subtle": "hsl(222 47% 11%)",
              "cal-border-booker": "hsl(217 33% 22%)",
              "cal-text": "hsl(210 40% 98%)",
              "cal-text-emphasis": "hsl(210 40% 100%)",
              "cal-text-subtle": "hsl(215 20% 70%)",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch {
        // ignore calendar init errors
      }
    })();
  }, [calTheme]);

  if (isAuthenticated) {
    return <AuthLoadingScreen message="Loading..." />;
  }

  return (
    <div className="min-h-[calc(100vh-theme(spacing.28))] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-72 w-72 rounded-full bg-primary/[0.07] blur-3xl" />
      </div>

      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[13px] font-semibold text-primary mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Product walkthrough
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
            Get started with a quick call
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            Pick a time and we&rsquo;ll get you set up on EmaReach in a 30-minute live session — no signup form, no busywork.
          </p>
        </div>

        {/* Benefits list */}
        <ul className="mx-auto mb-6 flex max-w-md flex-col gap-2 sm:flex-row sm:justify-center sm:gap-5">
          {benefits.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-3 w-3 text-primary" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* Cal booking */}
        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm">
          <div className="flex items-center gap-3.5 px-6 py-5 border-b border-border/60">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#f59e0b]">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-[1.05rem] font-bold leading-tight text-foreground">Book a product walkthrough</div>
              <div className="text-[13px] text-muted-foreground">30-min live onboarding with our team</div>
            </div>
          </div>
          <div style={{ height: 600 }}>
            <Cal
              namespace="default"
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", theme: calTheme }}
              calOrigin="https://cal.id"
              embedJsUrl="https://cal.id/embed-link/embed.js"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
