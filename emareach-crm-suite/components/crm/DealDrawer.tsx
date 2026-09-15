'use client';

import React, { useState } from 'react';
import { useCRM, CRMTask, CRMNote, CRMActivity, Deal } from '@/lib/crm-store';
import {
  X,
  Trash2,
  Trophy,
  Ban,
  Building,
  User,
  Calendar,
  DollarSign,
  Plus,
  Clock,
  CheckSquare,
  Square,
  Sparkles,
  PhoneCall,
  Video,
  Mail,
  Send,
  History,
  ListTodo,
  FileText,
  Tag,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

interface DealDrawerProps {
  deal: Deal;
  isOpen?: boolean;
  onClose: () => void;
}

export function DealDrawer({ deal, isOpen = true, onClose }: DealDrawerProps) {
  if (!isOpen || !deal) return null;

  const {
    updateDealStage,
    markDealWon,
    markDealLost,
    addDealActivity,
    addDealTask,
    toggleDealTask,
    addDealNote,
    deleteDeal,
    currentPipeline,
    pipelines,
    sendReply,
    threads,
  } = useCRM();

  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'tasks' | 'notes' | 'email'>('overview');

  // Activity Composer State
  const [activityType, setActivityType] = useState<'call' | 'meeting' | 'email'>('call');
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDesc, setActivityDesc] = useState('');

  // Task Composer State
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  // Note Composer State
  const [noteText, setNoteText] = useState('');

  // Lost Reason Dialog State
  const [showLostDialog, setShowLostDialog] = useState(false);
  const [lossReason, setLossReason] = useState('Price / Budget');
  const [customLossReason, setCustomLossReason] = useState('');

  // Quick reply for connected email thread
  const [replyText, setReplyText] = useState('');

  // Determine active stages from current pipeline
  const activePipeline = pipelines.find((p) => p.id === deal.pipeline_id) || currentPipeline || {
    stages: [
      { id: 'lead', name: 'New Prospect', probability: 10 },
      { id: 'contacted', name: 'In Sequence', probability: 20 },
      { id: 'replied', name: 'Replied', probability: 35 },
      { id: 'qualified', name: 'Qualified', probability: 50 },
      { id: 'meeting', name: 'Meeting Booked', probability: 65 },
      { id: 'proposal', name: 'Proposal Sent', probability: 80 },
      { id: 'won', name: 'Closed Won', probability: 100 },
      { id: 'lost', name: 'Closed Lost', probability: 0 },
    ],
  };

  const stagesList = activePipeline.stages || [];

  // Match associated email thread
  const matchedThread = threads.find(
    (t) =>
      (deal.primary_contact_id && t.contactId === deal.primary_contact_id) ||
      (deal.contactEmail && t.contactEmail.toLowerCase() === deal.contactEmail.toLowerCase())
  );

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle.trim()) return;
    await addDealActivity(deal.id, {
      type: activityType,
      title: activityTitle.trim(),
      description: activityDesc.trim() || undefined,
    });
    setActivityTitle('');
    setActivityDesc('');
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    await addDealTask(deal.id, {
      title: taskTitle.trim(),
      due_date: taskDueDate || undefined,
      priority: taskPriority,
    });
    setTaskTitle('');
    setTaskDueDate('');
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    await addDealNote(deal.id, noteText.trim());
    setNoteText('');
  };

  const handleConfirmLost = async () => {
    const finalReason = lossReason === 'Other' ? customLossReason || 'Other' : lossReason;
    await markDealLost(deal.id, finalReason);
    setShowLostDialog(false);
  };

  const handleSendQuickReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !matchedThread) return;
    sendReply(matchedThread.id, replyText.trim());
    setReplyText('');
  };

  // Helper to check overdue tasks
  const isTaskOverdue = (task: CRMTask) => {
    if (task.completed || !task.due_date) return false;
    const due = new Date(task.due_date).getTime();
    const today = new Date().setHours(0, 0, 0, 0);
    return due < today;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-2xl bg-white border-l border-slate-200 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${
                    deal.priority === 'urgent'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : deal.priority === 'high'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}
                >
                  {deal.priority} Priority
                </span>

                {deal.status === 'won' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Closed Won 🏆
                  </span>
                )}
                {deal.status === 'lost' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-rose-50 text-rose-700 border border-rose-200">
                    Closed Lost
                  </span>
                )}
                {deal.status === 'open' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Open Pipeline
                  </span>
                )}

                <span className="text-xs text-slate-500 font-medium">Assigned to {deal.assignedTo}</span>
              </div>

              <h2 className="text-base font-bold text-slate-900 tracking-tight">{deal.title}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Building className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-semibold text-slate-900">{deal.company}</span>
                <span>•</span>
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{deal.contactName} ({deal.contactRole || 'Decision Maker'})</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this deal?')) {
                    deleteDeal(deal.id);
                    onClose();
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                title="Delete deal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Win/Loss Controls & Value Callout */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Opportunity Value</span>
                <div className="text-base font-extrabold text-emerald-700">
                  ${deal.value.toLocaleString()} {deal.currency}
                </div>
              </div>
              <div className="pl-4 border-l border-slate-200">
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Probability</span>
                <div className="text-sm font-bold text-indigo-700">
                  {deal.probability}% (${((deal.value * deal.probability) / 100).toLocaleString()})
                </div>
              </div>
            </div>

            {deal.status === 'open' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => markDealWon(deal.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Mark Won</span>
                </button>
                <button
                  onClick={() => setShowLostDialog(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 text-xs font-semibold transition-colors"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Mark Lost</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stage Stepper Navigation Bar */}
        <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {stagesList.map((s, idx) => {
              const isCurrent = (deal.stage_id || deal.stage) === s.id;
              const currentIdx = stagesList.findIndex((st) => st.id === (deal.stage_id || deal.stage));
              const isPast = currentIdx >= idx;

              return (
                <button
                  key={s.id}
                  onClick={() => updateDealStage(deal.id, s.id, deal.stage, s.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isPast
                      ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Operational Tabs Header */}
        <div className="flex items-center gap-2 px-5 pt-2 border-b border-slate-200 bg-white text-xs">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'activity', label: `Activity (${deal.activities?.length || 0})`, icon: History },
            { id: 'tasks', label: `Next Actions (${deal.tasks?.length || 0})`, icon: ListTodo },
            { id: 'notes', label: `Notes (${deal.notes?.length || 0})`, icon: Sparkles },
            { id: 'email', label: 'Email Outreach', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-800 bg-white">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Contact Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Associated Primary Contact
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Contact Name:</span>
                    <p className="font-bold text-slate-900 mt-0.5">{deal.contactName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Job Role:</span>
                    <p className="text-slate-700 mt-0.5">{deal.contactRole || 'Decision Maker'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Email Address:</span>
                    <p className="text-indigo-700 font-mono mt-0.5 font-semibold">{deal.contactEmail || 'None'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Company Name:</span>
                    <p className="text-slate-700 font-semibold mt-0.5">{deal.company}</p>
                  </div>
                </div>
              </div>

              {/* Deal Property Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Opportunity Specifics
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Lead Source:</span>
                    <p className="text-slate-800 font-medium mt-0.5">{deal.source || 'Outbound Campaign'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Expected Close Date:</span>
                    <p className="text-slate-800 font-mono mt-0.5">{deal.expectedCloseDate || 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Probability %:</span>
                    <p className="text-indigo-700 font-bold mt-0.5">{deal.probability}%</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Weighted Pipeline Value:</span>
                    <p className="text-emerald-700 font-bold mt-0.5">
                      ${((deal.value * deal.probability) / 100).toLocaleString()}
                    </p>
                  </div>
                  {deal.loss_reason && (
                    <div className="col-span-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                      <span className="text-rose-700 font-semibold">Loss Reason:</span>
                      <p className="text-rose-800 mt-0.5">{deal.loss_reason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {deal.tags && deal.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-slate-500 font-medium">Tags:</span>
                  {deal.tags.map((tg: string) => (
                    <span
                      key={tg}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACTIVITY TIMELINE */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              {/* Log Activity Composer */}
              <form onSubmit={handleAddActivity} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Log CRM Activity</span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { id: 'call', label: 'Call', icon: PhoneCall },
                      { id: 'meeting', label: 'Meeting', icon: Video },
                      { id: 'email', label: 'Email', icon: Mail },
                    ].map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setActivityType(t.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                          activityType === t.id
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                        }`}
                      >
                        <t.icon className="w-3 h-3" />
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Activity title (e.g. Discovery Call with CTO)..."
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500"
                />

                <textarea
                  rows={2}
                  placeholder="Details, key objections, next steps discussed..."
                  value={activityDesc}
                  onChange={(e) => setActivityDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs shadow-xs transition-colors"
                  >
                    Save Activity
                  </button>
                </div>
              </form>

              {/* Timeline Feed */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Chronological History
                </h3>
                {deal.activities && deal.activities.length > 0 ? (
                  deal.activities.map((act: CRMActivity) => (
                    <div
                      key={act.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-600" />
                          {act.title}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {new Date(act.timestamp).toLocaleDateString()} {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {act.description && (
                        <p className="text-slate-600 text-xs pl-4">{act.description}</p>
                      )}
                      <div className="text-[10px] text-slate-400 pl-4">
                        Logged by {act.author_name}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-6">No activity history recorded yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TASKS & NEXT ACTIONS */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              {/* Task Creation Form */}
              <form onSubmit={handleAddTask} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="font-bold text-slate-900">Create Next Action Task</span>

                <input
                  type="text"
                  placeholder="Task title (e.g. Send enterprise contract breakdown)..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">Due Date</label>
                    <input
                      type="date"
                      value={taskDueDate}
                      onChange={(e) => setTaskDueDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 font-medium mb-1">Priority</label>
                    <select
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value as any)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs font-medium"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs shadow-xs transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              </form>

              {/* Tasks List */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Upcoming & Completed Tasks
                </h3>
                {deal.tasks && deal.tasks.length > 0 ? (
                  deal.tasks.map((task: CRMTask) => {
                    const overdue = isTaskOverdue(task);
                    return (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                          task.completed
                            ? 'bg-slate-100 border-slate-200 opacity-60'
                            : overdue
                            ? 'bg-rose-50 border-rose-200'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleDealTask(deal.id, task.id, !task.completed)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {task.completed ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                          <div>
                            <p
                              className={`text-xs font-semibold ${
                                task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                              }`}
                            >
                              {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                              {task.due_date && (
                                <span className={overdue ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                                  {overdue ? `⚠ Overdue (Due: ${task.due_date})` : `Due: ${task.due_date}`}
                                </span>
                              )}
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-500 font-medium">Assigned: {task.assigned_to}</span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                            task.priority === 'urgent'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : task.priority === 'high'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-400 text-center py-6">No next action tasks defined.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <form onSubmit={handleAddNote} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="font-bold text-slate-900">Add Collaborative Note</span>
                <textarea
                  rows={3}
                  placeholder="Record insights, customer feedback, budget constraints..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs shadow-xs transition-colors"
                  >
                    Save Note
                  </button>
                </div>
              </form>

              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Internal Notes
                </h3>
                {deal.notes && deal.notes.length > 0 ? (
                  deal.notes.map((n: CRMNote) => (
                    <div
                      key={n.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-bold text-slate-900">{n.author_name}</span>
                        <span className="font-mono">{n.created_at ? new Date(n.created_at).toLocaleDateString() : 'Today'}</span>
                      </div>
                      <p className="text-slate-700 text-xs whitespace-pre-wrap leading-relaxed">
                        {n.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-center py-6">No notes added yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: EMAIL OUTREACH HISTORY */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              {matchedThread ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{matchedThread.subject}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Connected Mailbox: {matchedThread.inboxAccount}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      {matchedThread.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {matchedThread.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`p-3 rounded-xl border ${
                          m.sender === 'user'
                            ? 'bg-white border-slate-200 text-slate-900'
                            : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                        }`}
                      >
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                          <span className="font-semibold">{m.senderName}</span>
                          <span>{m.timestamp}</span>
                        </div>
                        <p className="text-xs whitespace-pre-wrap">{m.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply Composer */}
                  <form onSubmit={handleSendQuickReply} className="space-y-2 pt-2 border-t border-slate-200">
                    <textarea
                      rows={2}
                      placeholder="Type a direct reply to lead..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 space-y-2">
                  <Mail className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-slate-700 font-medium">No direct email outreach thread matched for {deal.contactEmail || deal.contactName}.</p>
                  <p className="text-[11px] text-slate-400">
                    Emails dispatched through Campaigns or Inboxes will automatically sync here.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lost Reason Modal */}
      {showLostDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-rose-700 text-sm flex items-center gap-2">
                <Ban className="w-4 h-4" /> Record Opportunity Loss
              </h3>
              <button
                onClick={() => setShowLostDialog(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Please specify the primary loss reason. This will preserve historical data and update pipeline forecasting.
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Loss Reason Category</label>
              <select
                value={lossReason}
                onChange={(e) => setLossReason(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="Price / Budget">Price / Budget</option>
                <option value="Chose Competitor">Chose Competitor</option>
                <option value="No Response / Ghosted">No Response / Ghosted</option>
                <option value="Timing / Postponed">Timing / Postponed</option>
                <option value="Feature / Not a Fit">Feature / Not a Fit</option>
                <option value="Other">Other (Custom Reason)</option>
              </select>
            </div>

            {lossReason === 'Other' && (
              <input
                type="text"
                placeholder="Explain specific reason..."
                value={customLossReason}
                onChange={(e) => setCustomLossReason(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs"
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowLostDialog(false)}
                className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLost}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Confirm Mark Lost
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
