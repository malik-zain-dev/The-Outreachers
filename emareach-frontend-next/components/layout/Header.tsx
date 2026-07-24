"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Zap,
  PenLine,
  Workflow,
  ShieldCheck,
  BarChart3,
  Inbox,
  Users,
  MailX,
  Lock,
  BookOpen,
  FileText,
  Star,
  HelpCircle,
  MessageSquare,
  BriefcaseBusiness,
  Megaphone,
  UserRoundSearch,
  Rocket,
  Radar,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/** Public GitHub repo — open-source home of EmaReach. Placeholder; update when repo is public. */
export const GITHUB_URL = "https://github.com/emareach/emareach";

/** Social Kaptan — the social-first engagement platform that powers the "aware" (context-first) step. */
export const SOCIAL_KAPTAN_URL = "https://www.socialkaptan.com/";

/** GitHub mark (inline so it renders identically in light/dark without an external request). */
function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.71 5.41-5.28 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

const featuresDropdownItems = [
  { name: "AI Writing & Personalization", path: "/features/ai-writing-personalization", icon: PenLine, description: "Generate tailored cold emails at scale" },
  { name: "Campaign Automation", path: "/features/campaign-automation-sequences", icon: Workflow, description: "Multi-step sequences on autopilot" },
  { name: "Deliverability & Warm-up", path: "/features/deliverability-warmup", icon: ShieldCheck, description: "Land in inbox, not spam" },
  { name: "Analytics & Reporting", path: "/features/analytics-reporting", icon: BarChart3, description: "Track opens, clicks & replies" },
  { name: "Unified Inbox & Replies", path: "/features/unified-inbox-replies", icon: Inbox, description: "Manage all replies in one place" },
  { name: "Smart Leads & Discovery", path: "/features/smart-lead", icon: Users, description: "Find & verify your ideal prospects" },
  { name: "Remove Risky Emails", path: "/features/remove-risky-emails-contact-blocking", icon: MailX, description: "Block bad addresses automatically" },
  { name: "Security & Compliance", path: "/features/security-compliance", icon: Lock, description: "Enterprise-grade data protection" },
];

const useCasesDropdownItems = [
  { name: "SDR (Sales Development Representative)", path: "/use-cases/sdr", icon: UserRoundSearch, description: "Book more meetings with less manual work" },
  { name: "BDR (Business Development Representative)", path: "/use-cases/bdr", icon: Users, description: "Scale targeted outbound and follow-ups" },
  { name: "Account Executives", path: "/use-cases/account-executives", icon: BriefcaseBusiness, description: "Fill pipeline with high-intent conversations" },
  { name: "Sales Teams", path: "/use-cases/sales-teams", icon: Users, description: "Unify outreach, replies, and analytics" },
  { name: "Startup Founders", path: "/use-cases/startup-founders", icon: Rocket, description: "Validate ICP and close early customers faster" },
  { name: "SaaS Founders", path: "/use-cases/saas-founders", icon: Rocket, description: "Build repeatable outbound revenue systems" },
  { name: "Lead Generation Agencies", path: "/use-cases/lead-generation-agencies", icon: Users, description: "Run multi-client outreach at scale" },
  { name: "Growth Marketers", path: "/use-cases/growth-marketers", icon: Megaphone, description: "Turn cold email into a predictable channel" },
];

const comparisonsDropdownItems = [
  { name: "EmaReach vs Instantly", path: "/comparisons/instantly", icon: Rocket, description: "Fast outreach with safer scale" },
  { name: "EmaReach vs Saleshandy", path: "/comparisons/saleshandy", icon: BarChart3, description: "Volume sending with safety guardrails" },
  { name: "EmaReach vs Mailreach", path: "/comparisons/mailreach", icon: BarChart3, description: "Warm-up + full outbound execution" },
  { name: "EmaReach vs Lemwarm", path: "/comparisons/lemwarm", icon: ShieldCheck, description: "Beyond warm-up to pipeline growth" },
  { name: "EmaReach vs Warmup Inbox", path: "/comparisons/warmup-inbox", icon: Inbox, description: "Inbox placement + campaign workflows" },
  { name: "EmaReach vs Warmy.io", path: "/comparisons/warmy-io", icon: Zap, description: "Deliverability and GTM operations" },
  { name: "EmaReach vs InboxAlly", path: "/comparisons/inboxally", icon: MailX, description: "Sender trust + response outcomes" },
  { name: "EmaReach vs Folderly", path: "/comparisons/folderly", icon: Lock, description: "Technical insights to sales results" },
];

/** Why EmaReach menu: lead with positioning + product story, then resources. */
const whyEmareachDropdownItems = [
  { name: "Why us", path: "/why-us", icon: Star, description: "What makes EmaReach different" },
  { name: "How it works", path: "/how-it-works", icon: HelpCircle, description: "See EmaReach in action step by step" },
  { name: "Blog", path: "/blog", icon: FileText, description: "Cold email tips, guides & playbooks" },
  { name: "Resources", path: "/resources", icon: BookOpen, description: "Buyer's guides, reviews & comparisons" },
  { name: "Testimonials", path: "/testimonials", icon: Star, description: "Stories from real customers" },
  { name: "Contact", path: "/contact", icon: MessageSquare, description: "Talk to our team" },
];

type DropdownKey = "features" | "solutions" | "whyEmareach" | null;

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, clearDemoUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileWhyEmareachOpen, setMobileWhyEmareachOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDemoUser = user?.id === "demo-user";
  const isContactPage = pathname === "/contact";
  const isFeaturesPath = pathname.startsWith("/features");
  const isUseCasesPath = pathname === "/use-cases" || pathname.startsWith("/use-cases/");
  const isComparisonsPath = pathname === "/comparisons" || pathname.startsWith("/comparisons/");
  const isSolutionsPath = isUseCasesPath || isComparisonsPath;
  const isWhyEmareachPath =
    pathname === "/why-us" ||
    pathname === "/testimonials" ||
    pathname === "/contact" ||
    pathname === "/how-it-works" ||
    pathname === "/blog" ||
    pathname === "/resources" ||
    pathname.startsWith("/resources/");

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (isDemoUser) {
      e.preventDefault();
      clearDemoUser();
      router.push("/login");
    }
  };

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 12);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileFeaturesOpen(false);
    setMobileSolutionsOpen(false);
    setMobileWhyEmareachOpen(false);
  };

  const openMenu = (key: DropdownKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const closeMenuWithDelay = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimeoutRef.current = null;
    }, 140);
  };

  const DropdownTrigger = ({
    label,
    dropdownKey,
    isActive,
  }: {
    label: string;
    dropdownKey: DropdownKey;
    isActive: boolean;
  }) => (
    <button
      type="button"
      onClick={() => setOpenDropdown((prev) => (prev === dropdownKey ? null : dropdownKey))}
      aria-expanded={openDropdown === dropdownKey}
      aria-haspopup="menu"
      className={`relative inline-flex items-center gap-1 px-3 py-2 text-[14px] font-semibold rounded-lg transition-all duration-200
        ${isActive ? "text-primary" : "text-foreground/75 hover:text-foreground"}
      `}
    >
      <span className="relative z-10">{label}</span>
      <ChevronDown
        className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${
          openDropdown === dropdownKey ? "rotate-180" : ""
        }`}
      />
      {isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />
      )}
      <span
        className={`absolute inset-0 rounded-lg bg-muted/80 transition-opacity duration-150 ${
          openDropdown === dropdownKey ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );

  return (
    <header
      role="banner"
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/92 dark:bg-background/90 backdrop-blur-xl border-b border-border/80 shadow-[0_1px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_1px_28px_rgba(0,0,0,0.4)]"
          : "bg-background/75 dark:bg-background/70 backdrop-blur-md border-b border-border/60"
      }`}
    >
      {/* Open-source announcement bar */}
      <div className="bg-foreground text-background text-center py-2 px-4 text-[11px] sm:text-[12.5px] font-mono font-medium tracking-tight relative z-[60]">
        <span className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            <span className="hidden sm:inline">
              EmaReach is 100% open source — every feature the paid platforms sell, in one repo.{" "}
            </span>
            <span className="sm:hidden">Open source. Every feature, in one repo. </span>
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity"
            >
              Star on GitHub →
            </Link>
          </span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="flex items-center justify-between h-[68px] sm:h-[76px] lg:h-20"
        >
          {/* ── LEFT: Logo + nav dropdowns ── */}
          <div className="flex items-center gap-3 lg:gap-7">
            <Link href="/" className="flex items-center shrink-0" aria-label="EmaReach – go to homepage">
              <Image
                src="/logo.png"
                alt="EmaReach"
                width={240}
                height={95}
                sizes="240px"
                priority
                className="block h-12 sm:h-14 w-auto object-contain dark:hidden"
              />
              <Image
                src="/logo-dark.png"
                alt="EmaReach"
                width={240}
                height={95}
                sizes="240px"
                className="hidden h-12 sm:h-14 w-auto object-contain dark:block"
              />
            </Link>

            {/* Desktop nav dropdowns */}
            <div className="hidden lg:flex items-center gap-0.5">

              {/* Features Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openMenu("features")}
                onMouseLeave={closeMenuWithDelay}
              >
                <DropdownTrigger label="Features" dropdownKey="features" isActive={isFeaturesPath} />
                {openDropdown === "features" && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full pt-3 w-[560px] z-50"
                    onMouseEnter={() => openMenu("features")}
                    onMouseLeave={closeMenuWithDelay}
                  >
                    <div className="rounded-2xl border border-border/80 bg-background shadow-2xl overflow-hidden">
                      <div className="px-5 pt-4 pb-2 border-b border-border/60">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                          Platform Features
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-0.5 p-3">
                        {featuresDropdownItems.map((item) => {
                          const Icon = item.icon;
                          const isItemActive = pathname === item.path;
                          return (
                            <Link
                              key={item.name}
                              href={item.path}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className={`flex items-start gap-3 rounded-xl px-3.5 py-3 transition-all duration-150 group ${
                                isItemActive ? "bg-primary/10 text-primary" : "hover:bg-muted/80 text-foreground"
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isItemActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
                                }`}
                              >
                                <Icon
                                  className={`w-4 h-4 ${
                                    isItemActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                                  }`}
                                />
                              </span>
                              <span>
                                <span
                                  className={`block text-[13px] font-semibold leading-snug ${
                                    isItemActive ? "text-primary" : "text-foreground"
                                  }`}
                                >
                                  {item.name}
                                </span>
                                <span className="block text-[12px] text-muted-foreground mt-0.5 leading-snug">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="px-5 py-3 border-t border-border/60 bg-muted/30 flex items-center justify-between">
                        <span className="text-[12px] text-muted-foreground">The open-source outbound platform</span>
                        <Link
                          href="/features"
                          onClick={() => setOpenDropdown(null)}
                          className="text-[12.5px] font-semibold text-primary hover:underline flex items-center gap-1"
                        >
                          Explore all features
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions: Use cases + Comparisons */}
              <div
                className="relative"
                onMouseEnter={() => openMenu("solutions")}
                onMouseLeave={closeMenuWithDelay}
              >
                <DropdownTrigger label="Solutions" dropdownKey="solutions" isActive={isSolutionsPath} />
                {openDropdown === "solutions" && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full pt-3 w-[min(92vw,640px)] z-50"
                    onMouseEnter={() => openMenu("solutions")}
                    onMouseLeave={closeMenuWithDelay}
                  >
                    <div className="rounded-2xl border border-border/80 bg-background shadow-2xl overflow-hidden">
                      <div className="grid grid-cols-2 divide-x divide-border/60">
                        {/* Use cases */}
                        <div className="p-4 flex flex-col">
                          <div className="mb-3">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Use Cases</p>
                            <p className="text-[12.5px] font-semibold text-foreground mt-1">Role-Based Playbooks</p>
                          </div>
                          <div className="space-y-px flex-1">
                            {useCasesDropdownItems.map((item) => {
                              const isItemActive = pathname === item.path;
                              return (
                                <Link
                                  key={item.name}
                                  href={item.path}
                                  role="menuitem"
                                  onClick={() => setOpenDropdown(null)}
                                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 transition-all duration-150 group ${
                                    isItemActive ? "bg-primary/10" : "hover:bg-muted/70"
                                  }`}
                                >
                                  <span className={`text-[12px] font-semibold leading-snug ${isItemActive ? "text-primary" : "text-foreground"}`}>
                                    {item.name}
                                  </span>
                                  <ArrowRight className={`w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isItemActive ? "text-primary opacity-100" : "text-muted-foreground"}`} />
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-3 pt-3 border-t border-border/60">
                            <Link
                              href="/use-cases"
                              onClick={() => setOpenDropdown(null)}
                              className="text-[11.5px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
                            >
                              Explore all use cases <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>

                        {/* Comparisons */}
                        <div className="p-4 flex flex-col bg-muted/20">
                          <div className="mb-3">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Comparisons</p>
                            <p className="text-[12.5px] font-semibold text-foreground mt-1">EmaReach vs alternatives</p>
                          </div>
                          <div className="space-y-px flex-1">
                            {comparisonsDropdownItems.map((item) => {
                              const isItemActive = pathname === item.path;
                              return (
                                <Link
                                  key={item.name}
                                  href={item.path}
                                  role="menuitem"
                                  onClick={() => setOpenDropdown(null)}
                                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 transition-all duration-150 group ${
                                    isItemActive ? "bg-primary/10" : "hover:bg-muted/70"
                                  }`}
                                >
                                  <span className={`text-[12px] font-semibold leading-snug ${isItemActive ? "text-primary" : "text-foreground"}`}>
                                    {item.name}
                                  </span>
                                  <ArrowRight className={`w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isItemActive ? "text-primary opacity-100" : "text-muted-foreground"}`} />
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-3 pt-3 border-t border-border/60">
                            <Link
                              href="/comparisons"
                              onClick={() => setOpenDropdown(null)}
                              className="text-[11.5px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
                            >
                              Explore all comparisons <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Why EmaReach */}
              <div
                className="relative"
                onMouseEnter={() => openMenu("whyEmareach")}
                onMouseLeave={closeMenuWithDelay}
              >
                <DropdownTrigger label="Why EmaReach" dropdownKey="whyEmareach" isActive={isWhyEmareachPath} />
                {openDropdown === "whyEmareach" && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full pt-3 w-72 z-50"
                    onMouseEnter={() => openMenu("whyEmareach")}
                    onMouseLeave={closeMenuWithDelay}
                  >
                    <div className="rounded-2xl border border-border/80 bg-background shadow-2xl overflow-hidden">
                      <div className="px-4 pt-3 pb-2 border-b border-border/60">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Why EmaReach</p>
                        <p className="text-[12px] text-muted-foreground mt-1 leading-snug">
                          Positioning, product walkthrough, and more
                        </p>
                      </div>
                      <div className="p-2">
                        {whyEmareachDropdownItems.slice(0, 2).map((item) => {
                          const Icon = item.icon;
                          const isItemActive = pathname === item.path;
                          return (
                            <Link
                              key={item.name}
                              href={item.path}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className={`flex items-start gap-3 rounded-xl px-3.5 py-3 transition-all duration-150 group ${
                                isItemActive ? "bg-primary/10" : "hover:bg-muted/80"
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isItemActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
                                }`}
                              >
                                <Icon className={`w-4 h-4 ${isItemActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                              </span>
                              <span>
                                <span className={`block text-[13px] font-semibold leading-snug ${isItemActive ? "text-primary" : "text-foreground"}`}>
                                  {item.name}
                                </span>
                                <span className="block text-[12px] text-muted-foreground mt-0.5 leading-snug">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                        <div className="px-3.5 pt-2 pb-1 border-t border-border/60 mt-1">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Resources</p>
                        </div>
                        {whyEmareachDropdownItems.slice(2).map((item) => {
                          const Icon = item.icon;
                          const isItemActive = pathname === item.path;
                          return (
                            <Link
                              key={item.name}
                              href={item.path}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className={`flex items-start gap-3 rounded-xl px-3.5 py-3 transition-all duration-150 group ${
                                isItemActive ? "bg-primary/10" : "hover:bg-muted/80"
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isItemActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
                                }`}
                              >
                                <Icon className={`w-4 h-4 ${isItemActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                              </span>
                              <span>
                                <span className={`block text-[13px] font-semibold leading-snug ${isItemActive ? "text-primary" : "text-foreground"}`}>
                                  {item.name}
                                </span>
                                <span className="block text-[12px] text-muted-foreground mt-0.5 leading-snug">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Kaptan — context-aware marketing partner */}
              <Link
                href={SOCIAL_KAPTAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 px-3 py-2 text-[14px] font-semibold rounded-lg text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-200"
              >
                <Radar className="w-3.5 h-3.5" />
                Social Kaptan
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Contact + GitHub + Dashboard ── */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/contact"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13.5px] font-semibold transition-colors duration-200 ${
                isContactPage ? "text-primary" : "text-foreground/75 hover:text-foreground hover:bg-muted/70"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Contact
            </Link>

            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 pl-3 pr-2.5 py-2 rounded-lg text-[13.5px] font-semibold text-foreground/85 hover:text-foreground border border-border/70 hover:border-foreground/30 hover:bg-muted/60 transition-all duration-200"
            >
              <GithubMark className="w-4 h-4" />
              GitHub
              <span className="inline-flex items-center gap-1 pl-1.5 ml-0.5 border-l border-border/70 text-[12px] text-muted-foreground group-hover:text-foreground/80">
                <Star className="w-3 h-3 fill-current text-amber-400" />
                Star
              </span>
            </Link>

            {isAuthenticated && (
              <Link href="/dashboard" onClick={handleDashboardClick} className="hidden sm:block">
                <button className="inline-flex items-center gap-1.5 px-4 py-2 text-[13.5px] font-semibold rounded-xl text-primary-foreground gradient-primary shadow-md shadow-primary/25 transition-all duration-200 hover:brightness-105 hover:-translate-y-px active:translate-y-0">
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain touch-pan-y opacity-100"
            : "max-h-0 overflow-hidden opacity-0 pointer-events-none"
        }`}
      >
        <div className="border-t border-border/80 bg-background/95 backdrop-blur-xl min-h-0">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <p className="text-xs text-muted-foreground/80 font-medium tracking-wide uppercase mb-4 px-1">
              The open-source outbound platform
            </p>

            <div className="space-y-0.5">
              {/* Contact */}
              <Link
                href="/contact"
                onClick={closeMobile}
                className={`flex items-center gap-2 py-2.5 px-3 rounded-xl text-[14px] font-medium transition-colors duration-150 ${
                  isContactPage ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Contact
              </Link>

              {/* GitHub */}
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-[14px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/90 transition-colors duration-150"
              >
                <GithubMark className="w-4 h-4" />
                GitHub
                <Star className="w-3 h-3 fill-current text-amber-400 ml-auto" />
              </Link>

              {/* Social Kaptan */}
              <Link
                href={SOCIAL_KAPTAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-[14px] font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors duration-150"
              >
                <Radar className="w-4 h-4" />
                Social Kaptan
              </Link>

              {/* Mobile Features accordion */}
              <button
                type="button"
                onClick={() => setMobileFeaturesOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-[14px] font-medium transition-colors duration-150 ${
                  isFeaturesPath ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                }`}
                aria-expanded={mobileFeaturesOpen}
              >
                <span>Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileFeaturesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileFeaturesOpen && (
                <div className="ml-3 mt-1 space-y-1 border-l border-border/80 pl-3">
                  {featuresDropdownItems.map((item) => {
                    const isItemActive = pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        href={item.path}
                        onClick={closeMobile}
                        className={`flex items-center justify-between py-2 px-3 rounded-lg text-[13.5px] font-medium transition-colors duration-150 ${
                          isItemActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                        }`}
                      >
                        {item.name}
                        {isItemActive && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Mobile Solutions accordion */}
              <button
                type="button"
                onClick={() => setMobileSolutionsOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-[14px] font-medium transition-colors duration-150 ${
                  isSolutionsPath ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                }`}
                aria-expanded={mobileSolutionsOpen}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSolutionsOpen && (
                <div className="ml-3 mt-1 space-y-4 border-l border-border/80 pl-3">
                  <div>
                    <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Use cases · Role-Based Playbooks
                    </p>
                    <div className="space-y-1">
                      {useCasesDropdownItems.map((item) => {
                        const isItemActive = pathname === item.path;
                        return (
                          <Link
                            key={item.name}
                            href={item.path}
                            onClick={closeMobile}
                            className={`block py-2 px-3 rounded-lg transition-colors duration-150 ${
                              isItemActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                            }`}
                          >
                            <span className="block text-[13.5px] font-semibold leading-snug">{item.name}</span>
                            <span className="block text-[12px] text-muted-foreground mt-0.5 leading-snug">{item.description}</span>
                          </Link>
                        );
                      })}
                      <Link
                        href="/use-cases"
                        onClick={closeMobile}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-[13.5px] font-semibold text-primary/90 hover:text-primary hover:bg-primary/10 transition-colors duration-150"
                      >
                        Explore all use cases
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Comparisons</p>
                    <div className="space-y-1">
                      {comparisonsDropdownItems.map((item) => {
                        const isItemActive = pathname === item.path;
                        return (
                          <Link
                            key={item.name}
                            href={item.path}
                            onClick={closeMobile}
                            className={`block py-2 px-3 rounded-lg transition-colors duration-150 ${
                              isItemActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                            }`}
                          >
                            <span className="block text-[13.5px] font-semibold leading-snug">{item.name}</span>
                            <span className="block text-[12px] text-muted-foreground mt-0.5 leading-snug">{item.description}</span>
                          </Link>
                        );
                      })}
                      <Link
                        href="/comparisons"
                        onClick={closeMobile}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-[13.5px] font-semibold text-primary/90 hover:text-primary hover:bg-primary/10 transition-colors duration-150"
                      >
                        Explore all comparisons
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Why EmaReach accordion */}
              <button
                type="button"
                onClick={() => setMobileWhyEmareachOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-[14px] font-medium transition-colors duration-150 ${
                  isWhyEmareachPath ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                }`}
                aria-expanded={mobileWhyEmareachOpen}
              >
                <span>Why EmaReach</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileWhyEmareachOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileWhyEmareachOpen && (
                <div className="ml-3 mt-1 space-y-3 border-l border-border/80 pl-3">
                  <div className="space-y-1">
                    <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Why us · How it works
                    </p>
                    {whyEmareachDropdownItems.slice(0, 2).map((item) => {
                      const isItemActive = pathname === item.path;
                      return (
                        <Link
                          key={item.name}
                          href={item.path}
                          onClick={closeMobile}
                          className={`block py-2 px-3 rounded-lg transition-colors duration-150 ${
                            isItemActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                          }`}
                        >
                          <span className="block text-[13.5px] font-semibold leading-snug">{item.name}</span>
                          <span className="block text-[12px] text-muted-foreground mt-0.5 leading-snug">{item.description}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="space-y-1">
                    <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Resources</p>
                    {whyEmareachDropdownItems.slice(2).map((item) => {
                      const isItemActive = pathname === item.path;
                      return (
                        <Link
                          key={item.name}
                          href={item.path}
                          onClick={closeMobile}
                          className={`flex items-center justify-between py-2 px-3 rounded-lg text-[13.5px] font-medium transition-colors duration-150 ${
                            isItemActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/90"
                          }`}
                        >
                          {item.name}
                          {isItemActive && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="mt-5 pt-4 border-t border-border/70 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={(e) => {
                    handleDashboardClick(e);
                    closeMobile();
                  }}
                  className="w-full"
                >
                  <button className="w-full py-2.5 rounded-xl text-[14px] font-semibold text-primary-foreground gradient-primary shadow-md shadow-primary/25 transition-all duration-200 flex items-center justify-center gap-1.5 hover:brightness-105">
                    Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              ) : (
                <>
                  <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer" onClick={closeMobile} className="w-full">
                    <button className="w-full py-2.5 rounded-xl text-[14px] font-semibold text-background bg-foreground transition-all duration-200 flex items-center justify-center gap-1.5 hover:opacity-90">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      Star on GitHub
                    </button>
                  </Link>
                  <Link href="/login" onClick={closeMobile} className="w-full">
                    <button className="w-full py-2.5 rounded-xl text-[14px] font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200">
                      Sign in
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
