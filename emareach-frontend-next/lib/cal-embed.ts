const CAL_EMBED_JS = "https://cal.id/embed-link/embed.js";

const CAL_FLOATING_BUTTON_CONFIG = {
  calLink: "mohammedazizuddin/product-walkthrough",
  calOrigin: "https://cal.id",
  config: { layout: "month_view" },
  buttonText: "Book a Demo",
  hideButtonIcon: false,
  buttonPosition: "bottom-right",
  buttonColor: "#4f46e5",
  buttonTextColor: "#ffffff",
} as const;

const CAL_UI_CONFIG = {
  cssVarsPerTheme: {
    light: { "cal-brand": "#007ee5" },
    dark: { "cal-brand": "#fafafa" },
  },
  hideEventTypeDetails: false,
  layout: "month_view",
} as const;

/** Routes where the Cal floating button must not appear (app, auth, rent, etc.). */
const HIDDEN_CAL_FLOATING_PREFIXES = [
  "/dashboard",
  "/inbox",
  "/campaigns",
  "/warmup",
  "/settings",
  "/inboxes",
  "/ai-campaign-studio",
  "/get-started",
  "/domains",
  "/analytics",
  "/tracking",
  "/templates",
  "/alerts",
  "/contacts",
  "/activity",
  "/workspace",
  "/workflows",
  "/tickets",
  "/campaign-replies",
  "/login",
  "/signup",
  "/auth",
  "/verify-email",
  "/reset-password",
  "/forgot-password",
  "/refund",
  "/privacy",
  "/terms",
  "/rent",
  "/mailbox",
] as const;

function getCalWindow(): Window | undefined {
  if (typeof window === "undefined") return undefined;
  return window;
}

export function shouldHideCalFloatingButton(pathname: string | null): boolean {
  if (!pathname || pathname === "/book-demo") return true;
  return HIDDEN_CAL_FLOATING_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function removeCalFloatingButton(): void {
  if (typeof document === "undefined") return;

  document.querySelectorAll(".cal-floating-button").forEach((el) => el.remove());

  try {
    const calNs = getCalWindow()?.Cal?.ns?.default;
    (calNs as ((method: string) => void) | undefined)?.("closeModal");
  } catch {
    // Cal may not be initialized yet.
  }
}

function mountCalFloatingButton(): void {
  const calWindow = getCalWindow();
  if (!calWindow) return;

  const run = () => {
    calWindow.Cal?.ns?.default?.("floatingButton", CAL_FLOATING_BUTTON_CONFIG);
    calWindow.Cal?.ns?.default?.("ui", CAL_UI_CONFIG);
  };

  if (calWindow.Cal?.loaded) {
    run();
    return;
  }

  const inline = `
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "${CAL_EMBED_JS}", "init");
    Cal("init", "default", { origin: "https://cal.id" });
  `;

  const script = document.createElement("script");
  script.id = "cal-floating-button-init";
  script.textContent = inline;
  document.body.appendChild(script);
  script.remove();

  run();
}

export function initCalFloatingButton(): void {
  if (shouldHideCalFloatingButton(
    typeof window !== "undefined" ? window.location.pathname : null
  )) {
    removeCalFloatingButton();
    return;
  }

  mountCalFloatingButton();
}
