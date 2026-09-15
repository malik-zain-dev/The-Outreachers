'use client';

import React, { useState } from 'react';
import { useCRM } from '@/lib/crm-store';
import {
  Search,
  Bell,
  Plus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export function Header({
  onOpenNewDeal,
  onOpenLeadGen,
}: {
  onOpenNewDeal?: () => void;
  onOpenLeadGen?: () => void;
}) {
  const { searchQuery, setSearchQuery, notifications } = useCRM();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-14 border-b border-slate-200 bg-white/95 backdrop-blur-md px-5 flex items-center justify-between sticky top-0 z-20 transition-colors duration-200">
      {/* Search Input */}
      <div className="flex items-center gap-3 w-80 lg:w-96">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search deals, contacts, campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Action buttons & Controls */}
      <div className="flex items-center gap-2.5">
        {/* Backend Connected Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></div>
          <span>Backend Connected</span>
        </div>

        {/* AI Quick Find Lead */}
        <Link
          href="/lead-gen"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-semibold text-indigo-700 transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">AI Lead Gen</span>
        </Link>

        {/* Contacts Link */}
        <Link
          href="/contacts"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-all"
        >
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">Contacts</span>
        </Link>

        {/* Add Deal Button */}
        <Link
          href="/crm"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Deal</span>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-[9px] font-bold text-white flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Outreach Signals & Alerts
                </h4>
                <span className="text-[10px] text-slate-500 font-medium">Live Feed</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex gap-2 text-xs"
                  >
                    {n.type === 'success' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : n.type === 'alert' ? (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-slate-900 text-[11px]">{n.title}</p>
                        <span className="text-[9px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
