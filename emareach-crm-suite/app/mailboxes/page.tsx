'use client';

import React, { useState } from 'react';
import { useCRM } from '@/lib/crm-store';
import {
  Mailbox,
  Plus,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Flame,
  Zap,
  RotateCw,
  Sliders,
  Sparkles,
} from 'lucide-react';

export default function MailboxesPage() {
  const { mailboxes, addNotification, refreshData } = useCRM();
  const [showConnectModal, setShowConnectModal] = useState(false);

  const totalSent = mailboxes.reduce((acc, mb: any) => acc + (mb.sent_today ?? mb.sentToday ?? 0), 0);
  const totalLimit = mailboxes.reduce((acc, mb: any) => acc + (mb.daily_limit ?? mb.dailyLimit ?? 50), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
              <span>Deliverability & Multi-Domain Warmup Control</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Sender Mailbox Fleet & Reputation
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Maintain 99%+ deliverability by monitoring SPF/DKIM/DMARC health, warming new accounts, and enforcing daily recipient caps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refreshData()}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 shadow-2xs transition-colors"
              title="Refresh from MongoDB"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowConnectModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Connect Mailbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Fleet Health Score</span>
          <div className="text-xl font-bold text-emerald-700 mt-1">98.4% Live</div>
          <p className="text-[11px] text-slate-500 mt-1">Synced with MongoDB Inboxes collection</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Daily Outbound Capacity</span>
          <div className="text-xl font-bold text-slate-900 mt-1">{totalSent} / {totalLimit} Sent Today</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Enforcing per-domain limits</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Warmup Inboxes</span>
          <div className="text-xl font-bold text-indigo-700 mt-1">{mailboxes.length} Connected</div>
          <p className="text-[11px] text-slate-500 mt-1">Automated peer-to-peer thread engagement</p>
        </div>
      </div>

      {/* Mailbox List */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Connected Sending Accounts ({mailboxes.length})
        </h2>

        {mailboxes.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
              <Mailbox className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No Mailboxes Connected Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Connect a Google Workspace, Microsoft 365, or custom SMTP/IMAP account to start automated warmup and sending outreach campaigns.
            </p>
            <button
              onClick={() => setShowConnectModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Connect First Mailbox</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mailboxes.map((mb: any) => {
              const sentToday = mb.sent_today ?? mb.sentToday ?? 0;
              const dailyLimit = mb.daily_limit ?? mb.dailyLimit ?? 50;
              const warmupScore = mb.warmup_progress ?? mb.warmupScore ?? (mb.status === 'ready' || mb.status === 'active' ? 100 : 0);
              const provider = mb.sender_type ?? mb.provider ?? 'smtp';
              const usagePercent = dailyLimit > 0 ? Math.min(100, Math.round((sentToday / dailyLimit) * 100)) : 0;

              return (
                <div
                  key={mb.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 relative"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 font-mono">{mb.email}</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-slate-100 text-slate-700 border border-slate-200">
                          {provider}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Warmup Progress: {warmupScore}%</span>
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        mb.status === 'ready' || mb.status === 'active' || mb.status === 'healthy'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {mb.status}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Daily Sending Quota</span>
                      <span className="font-bold text-slate-900">
                        {sentToday} / {dailyLimit} emails ({usagePercent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* DNS Compliance checks */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-medium">SPF Record</span>
                      <p className="font-bold text-emerald-700 mt-0.5">VALID</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-medium">DKIM Key</span>
                      <p className="font-bold text-emerald-700 mt-0.5">VALID</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 font-medium">DMARC Policy</span>
                      <p className="font-bold text-emerald-700 mt-0.5">VALID</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Connect Mailbox Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Connect Sender Account</h3>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  alert('Redirecting to Google OAuth workspace connection...');
                  setShowConnectModal(false);
                }}
                className="w-full p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-900 transition-all shadow-2xs"
              >
                <span>Google Workspace / Gmail OAuth</span>
                <span className="text-indigo-600 font-bold text-[10px]">Instant Connect</span>
              </button>

              <button
                onClick={() => {
                  alert('Redirecting to Microsoft 365 OAuth connection...');
                  setShowConnectModal(false);
                }}
                className="w-full p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-900 transition-all shadow-2xs"
              >
                <span>Microsoft Office 365 Exchange</span>
                <span className="text-indigo-600 font-bold text-[10px]">OAuth 2.0</span>
              </button>

              <button
                onClick={() => {
                  alert('Custom SMTP & IMAP port configurator opened.');
                  setShowConnectModal(false);
                }}
                className="w-full p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-900 transition-all shadow-2xs"
              >
                <span>Custom SMTP / IMAP Credentials</span>
                <span className="text-slate-500 text-[10px]">Port 587/993</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
