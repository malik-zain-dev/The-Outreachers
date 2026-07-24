"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/** Segmented control for marketing footer — matches light/dark page styling. */
export function FooterThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-[132px] rounded-lg border border-border/80 bg-muted/40 animate-pulse"
        aria-hidden
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="inline-flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Theme
      </span>
      <div
        className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5 shadow-sm"
        role="group"
        aria-label="Color theme"
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200",
            !isDark
              ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sun className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200",
            isDark
              ? "bg-background text-foreground shadow-sm ring-1 ring-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Moon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Dark
        </button>
      </div>
    </div>
  );
}
