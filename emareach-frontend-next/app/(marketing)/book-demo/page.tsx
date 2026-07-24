"use client";

import { useEffect } from "react";
import { Calendar, Sparkles } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";

export default function BookDemoPage() {
  const { resolvedTheme } = useTheme();
  const calTheme = resolvedTheme === "dark" ? "dark" : "light";

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

  return (
    <>
      <style>{`
        .book-demo-root {
          --brand: #007ee5;
          --brand-light: #e8f3ff;
          --text: #0f172a;
          --text-muted: #64748b;
          --border: #e2e8f0;
          --surface: #ffffff;
        }
        .dark .book-demo-root {
          --brand-light: hsl(199 89% 14%);
          --text: hsl(210 40% 98%);
          --text-muted: hsl(215 20% 65%);
          --border: hsl(217 33% 22%);
          --surface: hsl(222 47% 9%);
        }
        .book-demo-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--brand-light);
          color: var(--brand);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(0,126,229,0.2);
          margin-bottom: 24px;
        }
        .book-demo-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text);
          letter-spacing: -0.03em;
          margin-bottom: 12px;
        }
        .book-demo-title .accent {
          background: linear-gradient(135deg, var(--brand) 0%, #00b4d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .book-demo-sub {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 480px;
          margin: 0 auto;
        }
        .cal-wrap {
          margin-top: 20px;
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid var(--border);
          background: var(--surface);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .cal-header {
          padding: 24px 24px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cal-header-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          justify-content: center;
        }
        .cal-header-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .cal-header-sub {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `}</style>
      <main className="book-demo-root min-h-screen bg-gradient-to-b from-primary/[0.07] via-background to-background transition-colors duration-300 dark:from-primary/15">
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div className="book-demo-badge">
              <Sparkles size={13} />
              Product walkthrough
            </div>
            <h1 className="book-demo-title">
              Book a <span className="accent">demo</span>
            </h1>
            <p className="book-demo-sub">
              Pick a time that works for you. We’ll walk you through EmaReach in a 30-minute live session.
            </p>
          </div>

          <div className="cal-wrap">
            <div className="cal-header">
              <div
                style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  background: "linear-gradient(135deg, #ff6b35, #f59e0b)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Calendar size={20} color="white" />
              </div>
              <div className="cal-header-text">
                <div className="cal-header-title">Book a product walkthrough</div>
                <div className="cal-header-sub">30-min live demo with our team</div>
              </div>
            </div>
            <div style={{ height: 600 }}>
              <Cal
                namespace="default"
                calLink="mohammedazizuddin/product-walkthrough"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view", theme: calTheme }}
                calOrigin="https://cal.id"
                embedJsUrl="https://cal.id/embed-link/embed.js"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
