'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/lib/theme-context';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLeadGenWorkspace = pathname === '/lead-gen';

  return (
    <ThemeProvider>
      {isLeadGenWorkspace ? (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col min-w-0 transition-colors duration-200">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      ) : (
        <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 p-5 overflow-y-auto">{children}</main>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
