"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfirmDialogProvider } from "@/components/ConfirmDialog";
import { Toaster } from "sonner";
import { CalFloatingButtonGuard } from "@/components/CalFloatingButtonGuard";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="emareach-theme"
      >
        <AuthProvider>
          <TooltipProvider>
            <ConfirmDialogProvider>
              <CalFloatingButtonGuard />
              {children}
              <Toaster richColors position="bottom-center" />
            </ConfirmDialogProvider>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
