'use client';

import React from 'react';
import Link from 'next/link';
import { useCRM } from '@/lib/crm-store';
import {
  TrendingUp,
  DollarSign,
  Users,
  Send,
  MailCheck,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Inbox,
  AlertTriangle,
} from 'lucide-react';

export default function DashboardPage() {
  const { deals, campaigns, mailboxes, threads, leads } = useCRM();

  // Metrics calculations
  const totalPipelineValue = deals
    .filter((d) => d.stage !== 'lost')
    .reduce((acc, d) => acc + d.value, 0);

  const wonDealsValue = deals
    .filter((d) => d.stage === 'won')
    .reduce((acc, d) => acc + d.value, 0);

  const activeCampaignsCount = campaigns.filter((c) => c.status === 'active').length;
  const totalEmailsSent = campaigns.reduce((acc, c) => acc + c.sentCount, 0);
  const averageOpenRate = (
    campaigns.reduce((acc, c) => acc + c.openRate, 0) / (campaigns.length || 1)
  ).toFixed(1);
  const averageReplyRate = (
    campaigns.reduce((acc, c) => acc + c.replyRate, 0) / (campaigns.length || 1)
  ).toFixed(1);

  const hotRepliesCount = threads.filter((t) => t.category === 'interested').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-indigo-50/80 via-white to-cyan-50/50 border border-indigo-100 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-[11px] font-semibold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>The Outreachers • Executive Operations</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Executive Sales Operations Cockpit
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Real-time monitoring across multi-mailbox warmup, automated lead enrichment, sequence deliverability, and live pipeline stage conversions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/lead-gen"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discover AI Leads</span>
            </Link>
            <Link
              href="/campaigns"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs transition-all"
            >
              <Send className="w-3.5 h-3.5 text-indigo-600" />
              <span>Create Campaign</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pipeline */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Active Pipeline</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-extrabold text-slate-900">
              ${totalPipelineValue.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% from last week</span>
            </div>
          </div>
        </div>

        {/* Deliverability & Open Rate */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Avg. Open Rate</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
              <MailCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-extrabold text-slate-900">{averageOpenRate}%</span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>98.6% Deliverability</span>
            </div>
          </div>
        </div>

        {/* Reply Rate & Hot Leads */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Avg. Reply Rate</span>
            <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-extrabold text-slate-900">{averageReplyRate}%</span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-cyan-700 font-semibold">
              <span>{hotRepliesCount} Hot Meeting Inquiries</span>
            </div>
          </div>
        </div>

        {/* Mailbox Sending Quotas */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Mailbox Health Status</span>
            <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-100 text-purple-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl font-extrabold text-slate-900">5 Active</span>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium">
              <span>140 / 205 Sent Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Active Pipeline & Live Outreach Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Summary Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Deals Pipeline Snapshot */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-wide">
                  Top Pipeline Opportunities
                </h3>
                <p className="text-xs text-slate-500">High-intent enterprise deals in progress</p>
              </div>
              <Link
                href="/crm"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
              >
                <span>View Full CRM Kanban</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {deals.slice(0, 4).map((deal) => (
                <Link
                  key={deal.id}
                  href="/crm"
                  className="block p-3 rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-xs text-indigo-700">
                        {deal.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {deal.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {deal.contactName} • {deal.contactRole} ({deal.company})
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900">
                        ${deal.value.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5 justify-end">
                        <span
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-md uppercase border ${
                            deal.stage === 'meeting'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : deal.stage === 'proposal'
                              ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                              : deal.stage === 'qualified'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {deal.stage.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Active Campaigns Quick Status */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Outreach Sequences</h3>
                <p className="text-xs text-slate-500">Live multi-step email deliverability</p>
              </div>
              <Link
                href="/campaigns"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Manage Campaigns</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{camp.name}</h4>
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-md uppercase border ${
                          camp.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {camp.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {camp.sentCount} of {camp.totalLeads} prospects contacted • {camp.stepsCount} Sequence Steps
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500">Open Rate</p>
                      <p className="font-bold text-emerald-600">{camp.openRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500">Click Rate</p>
                      <p className="font-bold text-cyan-600">{camp.clickRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500">Reply Rate</p>
                      <p className="font-bold text-indigo-600">{camp.replyRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Real-time Live Signal Feed & Mailbox Health Radar */}
        <div className="space-y-6">
          {/* Urgent Replies Inbox Peek */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Live Inbox Activity</h3>
              </div>
              <Link
                href="/inbox"
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View Inbox
              </Link>
            </div>

            <div className="space-y-2">
              {threads.slice(0, 3).map((t) => (
                <Link
                  key={t.id}
                  href="/inbox"
                  className="block p-3 rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{t.contactName}</span>
                    <span className="text-[9px] text-slate-400">{t.timestamp}</span>
                  </div>
                  <p className="text-[10px] text-indigo-600 font-medium">{t.company}</p>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    "{t.lastMessageSnippet}"
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Mailbox Warmup & Health Radar */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Mailbox Health & SPF/DKIM</h3>
              <Link
                href="/mailboxes"
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Configure
              </Link>
            </div>

            <div className="space-y-2">
              {mailboxes.map((mb) => (
                <div
                  key={mb.id}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="text-xs font-semibold text-slate-900 truncate">{mb.email}</p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500">
                      <span>{(mb as any).sent_today ?? (mb as any).sentToday ?? 13}/{(mb as any).daily_limit ?? (mb as any).dailyLimit ?? 50} sent</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-medium">SPF/DKIM Valid</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600">{(mb as any).warmup_progress ?? (mb as any).warmupScore ?? 100}%</span>
                    <p className="text-[9px] text-slate-400">Warmup</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
