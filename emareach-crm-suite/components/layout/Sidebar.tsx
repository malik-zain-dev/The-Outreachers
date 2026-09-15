'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Sparkles,
  KanbanSquare,
  Send,
  Inbox,
  Mailbox,
  Zap,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Executive Cockpit', href: '/', icon: LayoutDashboard },
  { label: 'Contacts', href: '/contacts', icon: Users, badge: 'Database' },
  { label: 'AI Lead Generation', href: '/lead-gen', icon: Sparkles, badge: 'Serper AI' },
  { label: 'CRM Pipeline & Deals', href: '/crm', icon: KanbanSquare, badge: 'Pipeline' },
  { label: 'Campaign Engine', href: '/campaigns', icon: Send, badge: 'Active' },
  { label: 'Unified Smart Inbox', href: '/inbox', icon: Inbox, badge: 'Live' },
  { label: 'Mailboxes & Warmup', href: '/mailboxes', icon: Mailbox },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 min-h-screen bg-white border-r border-slate-200 flex flex-col justify-between p-3.5 relative z-30 transition-colors duration-200">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 px-2.5 py-3 mb-4 border-b border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-xs">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-slate-900">The Outreachers</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                CRM
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Outreach Operations</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          <div className="px-2.5 pb-1.5 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
            Platform Modules
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status & User info */}
      <div className="pt-3 border-t border-slate-200 space-y-2">
        {/* Live Mailbox Deliverability pill */}
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] text-slate-800 font-medium">Warmup Engine</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">98.4% Health</span>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[10px] text-white shadow-xs">
            ZM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-slate-900 truncate">Zain Malik</p>
            <p className="text-[9px] text-slate-500 truncate">Outreach Operator</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        </div>
      </div>
    </aside>
  );
}
