'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCRM } from '@/lib/crm-store';
import { CampaignView } from '@/lib/api';
import { NewCampaignWizard } from '@/components/campaigns/NewCampaignWizard';
import {
  Send,
  Plus,
  Play,
  Pause,
  MailCheck,
  Flame,
  Users,
  Clock,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Sparkles,
  Layers,
  Trash2,
  Calendar,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Activity,
} from 'lucide-react';

export default function CampaignsPage() {
  const router = useRouter();
  const {
    campaigns,
    pauseCampaign,
    resumeCampaign,
    sendCampaignNow,
    deleteCampaign,
    contacts,
  } = useCRM();

  const [showWizard, setShowWizard] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCampaigns = campaigns.filter((c) => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  // Calculate overview totals
  const totalAudience = campaigns.reduce((acc, c) => acc + (c.totalLeads || 0), 0);
  const totalSent = campaigns.reduce((acc, c) => acc + (c.sentCount || 0), 0);
  const activeCount = campaigns.filter((c) => c.status === 'active' || c.status === 'running').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
              <Send className="w-3.5 h-3.5" />
              <span>Contacts → Multi-Recipient Outreach Engine</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Campaign Management & Email Outreach
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Target verified contacts from your CRM database. Compose high-converting personalized messages with live token preview, automated eligibility protection, and real-time delivery queue tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWizard(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Campaign Wizard</span>
            </button>
          </div>
        </div>

        {/* Global KPI bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium">Total Campaigns</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">{campaigns.length}</div>
          </div>
          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100">
            <span className="text-[11px] text-indigo-700 font-semibold">Active / In Progress</span>
            <div className="text-lg font-bold text-indigo-900 mt-0.5">{activeCount}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium">CRM Contacts Available</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">{contacts.length}</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="text-[11px] text-emerald-700 font-semibold">Total Dispatched</span>
            <div className="text-lg font-bold text-emerald-800 mt-0.5">{totalSent}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs">
          {[
            { key: 'all', label: `All (${campaigns.length})` },
            { key: 'running', label: 'Running / Active' },
            { key: 'scheduled', label: 'Scheduled' },
            { key: 'draft', label: 'Drafts' },
            { key: 'paused', label: 'Paused' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => {
            const count =
              tab.key === 'all'
                ? campaigns.length
                : tab.key === 'running'
                ? campaigns.filter((c) => c.status === 'running' || c.status === 'active').length
                : campaigns.filter((c) => c.status === tab.key).length;

            return (
              <button
                key={tab.key}
                onClick={() => setFilterStatus(tab.key)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterStatus === tab.key
                    ? 'bg-white text-indigo-600 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Campaigns Listing */}
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <MailCheck className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No campaigns found in this view</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Launch a new targeted cold email sequence from your verified Contacts database using the wizard.
            </p>
            <button
              onClick={() => setShowWizard(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Start New Campaign
            </button>
          </div>
        ) : (
          filteredCampaigns.map((camp) => {
            const isRunning = camp.status === 'running';
            const isPaused = camp.status === 'paused';
            const isCompleted = camp.status === 'completed';
            const isDraft = camp.status === 'draft';
            const isScheduled = camp.status === 'scheduled';
            const totalRecipients = camp.recipients?.length || camp.totalLeads || 0;
            const deliveredCount = camp.deliveredCount || camp.sentCount || 0;
            const progressPercent = totalRecipients > 0 ? Math.min(100, Math.round((deliveredCount / totalRecipients) * 100)) : 100;

            return (
              <div
                key={camp.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all space-y-4 shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Basic Info */}
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link
                        href={`/campaigns/${camp.id}`}
                        className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors tracking-tight"
                      >
                        {camp.name}
                      </Link>

                      {/* Status Badge */}
                      {isRunning && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                          Running Queue
                        </span>
                      )}
                      {camp.status === 'active' && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Play className="w-2.5 h-2.5 fill-emerald-600" /> Active Sending
                        </span>
                      )}
                      {isPaused && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Pause className="w-2.5 h-2.5 fill-amber-600" /> Paused
                        </span>
                      )}
                      {isCompleted && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                      {isScheduled && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <Calendar className="w-3 h-3" /> Scheduled: {camp.scheduledFor || 'Upcoming'}
                        </span>
                      )}
                      {isDraft && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          <Clock className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </div>

                    {camp.description && (
                      <p className="text-xs text-slate-500 line-clamp-1">{camp.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="text-slate-800 font-medium">{totalRecipients} Contacts</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{camp.timezone}</span>
                      </span>
                      <span>•</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        Sender: {camp.senderEmail || camp.inboxes?.[0] || 'zm89cc8916@gmail.com'}
                      </span>
                    </div>
                  </div>

                  {/* Metric KPIs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[85px]">
                      <span className="text-[10px] text-slate-500 font-medium">Delivered</span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {deliveredCount}/{totalRecipients}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[85px]">
                      <span className="text-[10px] text-slate-500 font-medium">Delivery %</span>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">{camp.deliveredRate}%</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[85px]">
                      <span className="text-[10px] text-slate-500 font-medium">Open %</span>
                      <p className="text-xs font-bold text-indigo-700 mt-0.5">{camp.openRate}%</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[85px]">
                      <span className="text-[10px] text-slate-500 font-medium">Reply %</span>
                      <p className="text-xs font-bold text-purple-700 mt-0.5">{camp.replyRate}%</p>
                    </div>
                  </div>
                </div>

                {/* Dispatch Progress bar if running */}
                {isRunning && (
                  <div className="space-y-1 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                    <div className="flex justify-between text-xs text-indigo-900">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Activity className="w-3.5 h-3.5 animate-spin text-indigo-600" /> Dispatching in background...
                      </span>
                      <span className="font-mono font-bold">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {/* Send Now Button for drafts or paused */}
                    {(isDraft || isScheduled || isPaused) && (
                      <button
                        onClick={() => sendCampaignNow(camp.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Outreach Now</span>
                      </button>
                    )}

                    {/* Pause/Resume buttons */}
                    {isRunning && (
                      <button
                        onClick={() => pauseCampaign(camp.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-colors"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause Sending</span>
                      </button>
                    )}

                    {isPaused && (
                      <button
                        onClick={() => resumeCampaign(camp.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Resume Dispatch</span>
                      </button>
                    )}

                    <button
                      onClick={() => deleteCampaign(camp.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Delete Campaign"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Link
                    href={`/campaigns/${camp.id}`}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <span>Recipient Activity & Sequence Teardown</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New Campaign Wizard Stepper Modal */}
      <NewCampaignWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onCampaignCreated={(campId) => {
          router.push(`/campaigns/${campId}`);
        }}
      />
    </div>
  );
}
