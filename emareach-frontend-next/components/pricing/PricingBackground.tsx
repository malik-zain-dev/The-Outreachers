"use client";

/**
 * Calm, single-accent ambient background.
 * The marketing layout (.marketing-root) already paints an ambient mesh,
 * so this stays restrained: one primary aurora at the top, a faint masked
 * grid for texture, and a clean bottom fade. No competing colored orbs.
 */
export function PricingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top aurora — single brand accent */}
      <div
        className="absolute -top-[22%] left-1/2 h-[min(80vh,820px)] w-[min(170vw,1500px)] -translate-x-1/2 rounded-[100%]
          bg-[radial-gradient(ellipse_at_center,hsl(199_89%_48%/0.14),transparent_58%)]
          dark:bg-[radial-gradient(ellipse_at_center,hsl(199_89%_52%/0.22),transparent_58%)] blur-3xl"
        aria-hidden
      />

      {/* Faint grid — quiet structure, masked to the top */}
      <div
        className="absolute inset-0 opacity-[0.5] dark:opacity-[0.25]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)/0.045) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)/0.045) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 80%)",
        }}
        aria-hidden
      />

      {/* Bottom fade into background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(var(--background))] to-transparent"
        aria-hidden
      />
    </div>
  );
}
