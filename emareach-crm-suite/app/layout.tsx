import type { Metadata } from 'next';
import './globals.css';
import { CRMProvider } from '@/lib/crm-store';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'The Outreachers — AI Lead Generation & Cold Outreach CRM',
  description: 'Enterprise B2B Cold Outreach, AI Lead Generation, Multi-Mailbox Warmup & Integrated Sales Pipeline',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
        <CRMProvider>
          <AppShell>{children}</AppShell>
        </CRMProvider>
      </body>
    </html>
  );
}
