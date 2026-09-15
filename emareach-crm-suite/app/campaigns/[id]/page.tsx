'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCRM } from '@/lib/crm-store';
import { CampaignRecipientView } from '@/lib/api';
import {
  ArrowLeft,
  Send,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
  Shuffle,
  ShieldCheck,
  Eye,
  Sliders,
  Mail,
  Zap,
  Play,
  Pause,
  AlertCircle,
  Search,
  Filter,
  Users,
  Activity,
  Calendar,
  X,
  FileText,
} from 'lucide-react';

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const {
    campaigns,
    mailboxes,
    sendCampaignNow,
    pauseCampaign,
    resumeCampaign,
    deleteCampaign,
    addNotification,
  } = useCRM();

  const foundCampaign = campaigns.find((c) => c.id === resolvedParams.id);
  const campaign = foundCampaign || (campaigns.length > 0 ? campaigns[0] : null) || {
    id: resolvedParams.id,
    name: '⚡ Live Outreach Campaign',
    status: 'draft' as const,
    totalLeads: 0,
    sentCount: 0,
    deliveredCount: 0,
    failedCount: 0,
    bouncedCount: 0,
    deliveredRate: 100,
    openRate: 0,
    clickRate: 0,
    replyRate: 0,
    bounceRate: 0,
    inboxes: ['zm89cc8916@gmail.com'],
    senderEmail: 'zm89cc8916@gmail.com',
    timezone: 'Asia/Karachi',
    stepsCount: 1,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    recipients: [],
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        delayDays: 0,
        subject: "Quick question regarding {{company}}'s outbound pipeline",
        body: 'Hi {{first_name}},\n\nSaw that {{company}} is rapidly scaling the growth team this quarter.\n\nWe help companies automate personalized cold outreach.\n\nWould you be open to a 5-minute chat?\n\nBest,\nZain',
        enableSpintax: true,
      },
    ],
  };

  // Tabs: 'recipients' | 'sequence' | 'settings'
  const [activeTab, setActiveTab] = useState<'recipients' | 'sequence' | 'settings'>('recipients');

  // Recipient filtering & search
  const [recipientSearch, setRecipientSearch] = useState('');
  const [recipientStatusFilter, setRecipientStatusFilter] = useState<string>('all');
  const [inspectRecipient, setInspectRecipient] = useState<CampaignRecipientView | null>(null);

  // Sequence editor state
  const [steps, setSteps] = useState(campaign.steps || []);
  const [activeStepId, setActiveStepId] = useState<string>(steps[0]?.id || 's1');

  // Filtered recipients
  const recipientsList = campaign.recipients || [];
  const filteredRecipients = recipientsList.filter((r) => {
    const matchesSearch =
      recipientSearch === '' ||
      `${r.firstName || ''} ${r.lastName || ''}`.toLowerCase().includes(recipientSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(recipientSearch.toLowerCase()) ||
      (r.company || '').toLowerCase().includes(recipientSearch.toLowerCase());

    const matchesStatus =
      recipientStatusFilter === 'all' || r.status === recipientStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const isRunning = campaign.status === 'running';
  const isPaused = campaign.status === 'paused';
  const isDraft = campaign.status === 'draft';
  const isScheduled = campaign.status === 'scheduled';
  const isCompleted = campaign.status === 'completed';

  const totalRecipients = recipientsList.length || campaign.totalLeads || 0;
  const deliveredRecipients = recipientsList.filter((r) => r.status === 'delivered').length || campaign.deliveredCount || 0;
  const failedRecipients = recipientsList.filter((r) => r.status === 'failed' || r.status === 'bounced').length || campaign.failedCount || 0;
  const pendingRecipients = recipientsList.filter((r) => r.status === 'pending' || r.status === 'queued').length;

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0] || {
    id: 's1',
    stepNumber: 1,
    delayDays: 0,
    subject: 'Quick question',
    body: 'Hi {{first_name}},\n\nBest,\nZain',
    enableSpintax: true,
  };

  const handleAddStep = () => {
    const newStepNum = steps.length + 1;
    const newStep = {
      id: `step-${Date.now()}`,
      stepNumber: newStepNum,
      delayDays: 3,
      subject: `Follow-up #${newStepNum}: Solving outreach for {{company}}`,
      body: `Hi {{first_name}},\n\nJust wanted to make sure you saw my last note.\n\nBest,\nZain`,
      enableSpintax: true,
    };
    setSteps([...steps, newStep]);
    setActiveStepId(newStep.id);
    addNotification('Sequence Step Added', `Step ${newStepNum} created`, 'info');
  };

  const handleUpdateStep = (field: string, val: any) => {
    setSteps(
      steps.map((s) => (s.id === activeStepId ? { ...s, [field]: val } : s))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/campaigns"
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                {campaign.name}
              </h1>

              {/* Status Badges */}
              {isRunning && (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                  Running Queue
                </span>
              )}
              {campaign.status === 'active' && (
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
                  <Calendar className="w-3 h-3" /> Scheduled
                </span>
              )}
              {isDraft && (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  <Clock className="w-3 h-3" /> Draft
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Sender: <span className="text-slate-800 font-mono font-medium">{campaign.senderEmail || 'zm89cc8916@gmail.com'}</span> • Timezone: {campaign.timezone} • Created: {campaign.createdAt}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {(isDraft || isScheduled || isPaused) && (
            <button
              onClick={() => sendCampaignNow(campaign.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Outreach Now</span>
            </button>
          )}

          {isRunning && (
            <button
              onClick={() => pauseCampaign(campaign.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-all"
            >
              <Pause className="w-4 h-4" />
              <span>Pause Outreach</span>
            </button>
          )}

          {isPaused && (
            <button
              onClick={() => resumeCampaign(campaign.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-all"
            >
              <Play className="w-4 h-4" />
              <span>Resume Outreach</span>
            </button>
          )}

          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this campaign?')) {
                deleteCampaign(campaign.id);
                router.push('/campaigns');
              }
            }}
            className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-300 transition-colors shadow-2xs"
            title="Delete Campaign"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] text-slate-500 font-medium">Total Contacts</div>
          <div className="text-lg font-bold text-slate-900 mt-0.5">{totalRecipients}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Enrolled from Contacts</div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 shadow-xs">
          <div className="text-[11px] text-emerald-700 font-semibold">Delivered</div>
          <div className="text-lg font-bold text-emerald-800 mt-0.5">{deliveredRecipients}</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">{campaign.deliveredRate}% rate</div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 shadow-xs">
          <div className="text-[11px] text-indigo-700 font-semibold">Opened</div>
          <div className="text-lg font-bold text-indigo-800 mt-0.5">{campaign.openRate}%</div>
          <div className="text-[10px] text-indigo-600 font-medium mt-0.5">Live tracking pixel</div>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100 shadow-xs">
          <div className="text-[11px] text-purple-700 font-semibold">Replied</div>
          <div className="text-lg font-bold text-purple-800 mt-0.5">{campaign.replyRate}%</div>
          <div className="text-[10px] text-purple-600 font-medium mt-0.5">Routed to CRM Inbox</div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 shadow-xs">
          <div className="text-[11px] text-rose-700 font-semibold">Failed / Bounced</div>
          <div className="text-lg font-bold text-rose-800 mt-0.5">{failedRecipients}</div>
          <div className="text-[10px] text-rose-600 font-medium mt-0.5">Auto-isolated</div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs max-w-fit">
        <button
          onClick={() => setActiveTab('recipients')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'recipients'
              ? 'bg-white text-indigo-600 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Recipient Activity ({recipientsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sequence')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'sequence'
              ? 'bg-white text-indigo-600 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Sequence Steps & Template</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-white text-indigo-600 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Mailbox & Routing Settings</span>
        </button>
      </div>

      {/* TAB 1: RECIPIENT ACTIVITY TRACKER */}
      {activeTab === 'recipients' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search recipients by name, company, email..."
                value={recipientSearch}
                onChange={(e) => setRecipientSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto">
              {[
                { key: 'all', label: `All (${recipientsList.length})` },
                { key: 'delivered', label: 'Delivered' },
                { key: 'sent', label: 'Sent' },
                { key: 'queued', label: 'Queued' },
                { key: 'pending', label: 'Pending' },
                { key: 'failed', label: 'Failed' },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setRecipientStatusFilter(filter.key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    recipientStatusFilter === filter.key
                      ? 'bg-white text-indigo-600 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recipients Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Recipient</th>
                  <th className="p-3.5">Company & Role</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Sent Timestamp</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecipients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-400">
                      No recipients found matching current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRecipients.map((rec) => {
                    const isDelivered = rec.status === 'delivered';
                    const isSent = rec.status === 'sent';
                    const isQueued = rec.status === 'queued';
                    const isFailed = rec.status === 'failed' || rec.status === 'bounced';
                    const isPending = rec.status === 'pending';

                    return (
                      <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">
                          {rec.firstName || ''} {rec.lastName || ''}
                          {!rec.firstName && !rec.lastName && (
                            <span className="text-slate-400 font-normal">Contact</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <div className="text-slate-800 font-medium">{rec.company || 'Direct'}</div>
                          <div className="text-[11px] text-slate-500">{rec.jobTitle || 'Executive'}</div>
                        </td>
                        <td className="p-3.5 font-mono text-indigo-600 text-[11px] font-medium">{rec.email}</td>
                        <td className="p-3.5">
                          {isDelivered && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                              <CheckCircle2 className="w-3 h-3" /> Delivered
                            </span>
                          )}
                          {isSent && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                              <Send className="w-3 h-3" /> Sent
                            </span>
                          )}
                          {isQueued && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-semibold">
                              <Activity className="w-3 h-3 animate-spin text-indigo-600" /> In Dispatch Queue
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px]">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                          {isFailed && (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-semibold">
                                <AlertCircle className="w-3 h-3" /> Failed
                              </span>
                              {rec.errorNote && (
                                <div className="text-[10px] text-rose-600 mt-1 max-w-xs truncate">
                                  {rec.errorNote}
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                          {rec.sentAt || '—'}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setInspectRecipient(rec)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors border border-slate-300 shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>Inspect Email</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SEQUENCE & CONTENT EDITOR */}
      {activeTab === 'sequence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Steps List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Sequence Workflow
              </h3>
              <button
                onClick={handleAddStep}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>

            {steps.map((step, idx) => (
              <div
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  step.id === activeStepId
                    ? 'bg-indigo-50/70 border-indigo-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    Step {step.stepNumber}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {step.delayDays === 0 ? 'Immediately' : `+${step.delayDays} days delay`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 line-clamp-1 font-medium">
                  {step.subject}
                </p>
              </div>
            ))}
          </div>

          {/* Step Detail Editor */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Editing Step {activeStep.stepNumber}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>Delay:</span>
                <input
                  type="number"
                  min={0}
                  value={activeStep.delayDays}
                  onChange={(e) => handleUpdateStep('delayDays', Number(e.target.value))}
                  className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-center text-slate-900 font-bold"
                />
                <span>days</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Subject Line
              </label>
              <input
                type="text"
                value={activeStep.subject}
                onChange={(e) => handleUpdateStep('subject', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Email Body & Dynamic Tokens
              </label>
              <textarea
                rows={10}
                value={activeStep.body}
                onChange={(e) => handleUpdateStep('body', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-sans focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SETTINGS & ROUTING */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl space-y-6 shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Mailbox & Deliverability Routing</h3>
            <p className="text-xs text-slate-500">
              Configured sending identities and reputation monitoring for this campaign.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">
                  {campaign.senderEmail || 'zm89cc8916@gmail.com'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Ready / Active
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-[11px]">
              <div>
                <span className="text-slate-500">SPF / DKIM:</span>
                <p className="text-emerald-700 font-semibold">Verified</p>
              </div>
              <div>
                <span className="text-slate-500">Daily Limit:</span>
                <p className="text-slate-900 font-semibold">100 emails/day</p>
              </div>
              <div>
                <span className="text-slate-500">Warmup:</span>
                <p className="text-indigo-700 font-semibold">100% Warmed</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider mb-1">Sending Timezone</label>
              <input
                type="text"
                disabled
                value={campaign.timezone}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-slate-700 text-xs font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* Recipient Email Inspection Modal */}
      {inspectRecipient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Personalized Email for {inspectRecipient.firstName} {inspectRecipient.lastName}
                </h3>
              </div>
              <button
                onClick={() => setInspectRecipient(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">To:</span>
                <span className="text-indigo-700 font-mono font-medium">{inspectRecipient.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Company:</span>
                <span className="text-slate-900 font-semibold">{inspectRecipient.company || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Dispatch Status:</span>
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
                  {inspectRecipient.status}
                </span>
              </div>
              {inspectRecipient.sentAt && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Sent Timestamp:</span>
                  <span className="text-slate-700 font-mono">{inspectRecipient.sentAt}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Resolved Subject:</span>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold">
                {inspectRecipient.resolvedSubject || activeStep.subject}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Resolved Body:</span>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                {inspectRecipient.resolvedBody || activeStep.body}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectRecipient(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold border border-slate-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
