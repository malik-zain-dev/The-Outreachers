import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type FeatureDetailPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  useCases: string[];
};

export function FeatureDetailPage({
  eyebrow,
  title,
  description,
  highlights,
  useCases,
}: FeatureDetailPageProps) {
  return (
    <div className="min-h-screen">
      <section className="py-16 lg:py-24 marketing-band-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              {eyebrow}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            <div className="rounded-2xl border border-border bg-card p-7 lg:p-8">
              <h2 className="text-2xl font-semibold mb-5">What you can do</h2>
              <ul className="space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 lg:p-8">
              <h2 className="text-2xl font-semibold mb-5">Ideal for teams that</h2>
              <ul className="space-y-3">
                {useCases.map((item) => (
                  <li key={item} className="text-muted-foreground leading-relaxed">
                    - {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to launch this feature?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start for free or book a demo and we will help you set everything up.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 hover:brightness-105 transition-all duration-200"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold border-2 border-border text-foreground/90 hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              Try for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
