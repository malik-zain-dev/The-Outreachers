import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Zap, Shield, ArrowRight } from "lucide-react";
import { FooterThemeToggle } from "@/components/layout/FooterThemeToggle";

const navLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Why Choose EmaReach", href: "/why-us" },
    { label: "Try for Free", href: "/signup" },
  ],
  Resources: [
    { label: "Resources & Guides", href: "/resources" },
    { label: "Blog & tips", href: "/blog" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  Comparisons: [
    { label: "EmaReach vs Instantly", href: "/comparisons/instantly" },
    { label: "EmaReach vs Smartlead", href: "/comparisons/smartlead" },
    { label: "EmaReach vs Lemlist", href: "/comparisons/lemlist" },
    { label: "EmaReach vs Saleshandy", href: "/comparisons/saleshandy" },
  ],
  Legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Refund policy", href: "/refund" },
  ],
  Company: [
    { label: "Aikaptan", href: "https://www.aikaptan.com/", external: true },
    { label: "Book demo", href: "/book-demo" },
    { label: "Sign in", href: "/login" },
  ],
};

const trustBadges = [
  { icon: Zap, label: "Lightning-fast setup" },
  { icon: Shield, label: "99.9% uptime SLA" },
  { icon: Mail, label: "95%+ deliverability" },
];

type FooterProps = {
  /** When true, shows Light/Dark control (intended for marketing site). */
  showThemeToggle?: boolean;
};

export const Footer = ({ showThemeToggle = false }: FooterProps) => {
  return (
    <footer
      className="relative border-t border-border/60 bg-gradient-to-b from-muted/25 to-background transition-colors duration-300"
      role="contentinfo"
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,_hsl(var(--primary)/0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* CTA Banner */}
      <div className="relative z-10 border-b border-border bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Start for free today</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Ready to close more deals with cold email?
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              No credit card required · 7-day free trial · Cancel anytime
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-primary/10 hover:border-primary hover:scale-[1.02] transition-all duration-200"
            >
              Try for Free
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-10 lg:gap-12 mb-10">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="EmaReach"
                width={120}
                height={40}
                className="h-10 w-auto object-contain dark:hidden"
                unoptimized
              />
              <Image
                src="/logo-dark.png"
                alt="EmaReach"
                width={120}
                height={40}
                className="hidden h-10 w-auto object-contain dark:block"
                unoptimized
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              EmaReach AI is an AI-powered cold email platform to help you scale campaigns, avoid spam, and close more deals — on autopilot.
            </p>
            {/* Trust badges */}
            <div className="flex flex-col gap-2 mt-1">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="w-3 h-3" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(navLinks).map(([section, links]) => (
            <div key={section} className="flex flex-col">
              <h4 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-widest">
                {section}
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {links.map((link) =>
                  "external" in link && link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link href={link.href} className="hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} EmaReach. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-end">
            {showThemeToggle ? <FooterThemeToggle /> : null}
          </div>
        </div>
      </div>
    </footer>
  );
};
