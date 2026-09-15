'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useCRM } from '@/lib/crm-store';
import { backendApi, InboxThreadView } from '@/lib/api';
import {
  Inbox,
  Send,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Eye,
  MousePointerClick,
  User,
  Building,
  Plus,
  Filter,
  Search,
  Check,
  Star,
  Archive,
  Trash2,
  Mail,
  RotateCw,
  Mailbox,
  Tag,
  ArrowLeft,
  X,
  ShieldCheck,
  SendHorizontal,
  ChevronRight,
} from 'lucide-react';

export default function UnifiedSmartInboxPage() {
  const {
    threads,
    mailboxes,
    sendReply,
    addLeadToCRM,
    addNotification,
    refreshData,
  } = useCRM();

  const [activeFolder, setActiveFolder] = useState<'all' | 'interested' | 'starred' | 'sent' | 'archive'>('all');
  const [selectedMailboxFilter, setSelectedMailboxFilter] = useState<string>('all');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);

  // Compose State
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composeMailboxId, setComposeMailboxId] = useState('');
  const [isSendingCompose, setIsSendingCompose] = useState(false);

  // Filtered threads
  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          t.contactName.toLowerCase().includes(q) ||
          t.contactEmail.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.lastMessageSnippet.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Mailbox account filter
      if (selectedMailboxFilter !== 'all') {
        if (t.inboxAccount && !t.inboxAccount.toLowerCase().includes(selectedMailboxFilter.toLowerCase())) {
          return false;
        }
      }

      // Folder filter
      if (activeFolder === 'interested') {
        return t.category === 'interested' || t.sentiment === 'positive';
      }
      if (activeFolder === 'sent') {
        return t.category === 'inquiry' || t.messages.some((m) => m.sender === 'user');
      }

      return true;
    });
  }, [threads, searchQuery, selectedMailboxFilter, activeFolder]);

  // Active Selected Thread
  const activeThread = useMemo(() => {
    if (selectedThreadId) {
      const found = threads.find((t) => t.id === selectedThreadId);
      if (found) return found;
    }
    return filteredThreads[0] || null;
  }, [selectedThreadId, threads, filteredThreads]);

  useEffect(() => {
    if (!selectedThreadId && filteredThreads.length > 0) {
      setSelectedThreadId(filteredThreads[0].id);
    }
  }, [filteredThreads, selectedThreadId]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    setIsSendingReply(true);
    try {
      sendReply(activeThread.id, replyText);
      addNotification('Reply Dispatched', `Response sent to ${activeThread.contactEmail}`, 'success');
      setReplyText('');
    } catch (err: any) {
      addNotification('Reply Failed', err.message || 'Error sending reply', 'alert');
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleSendCompose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim() || !composeBody.trim()) return;

    setIsSendingCompose(true);
    try {
      const res = await backendApi.sendComposeEmail({
        to_email: composeTo.trim(),
        subject: composeSubject.trim(),
        body: composeBody.trim(),
        inbox_id: composeMailboxId || undefined,
      });

      addNotification('Email Dispatched', `New outbound email sent to ${composeTo.trim()}`, 'success');
      setShowComposeModal(false);
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      await refreshData();
    } catch (err: any) {
      addNotification('Send Failed', err.message || 'Error sending email', 'alert');
    } finally {
      setIsSendingCompose(false);
    }
  };

  const handleDeleteActiveThread = async () => {
    if (!activeThread) return;
    try {
      await backendApi.deleteEmail(activeThread.id);
      await backendApi.deleteReceivedThread(activeThread.id);
      addNotification('Thread Deleted', 'Conversation removed permanently from MongoDB.', 'info');
      await refreshData();
    } catch (err: any) {
      addNotification('Delete Error', err.message || 'Failed to delete thread', 'alert');
    }
  };

  const handleConvertDeal = () => {
    if (!activeThread) return;
    addLeadToCRM(
      {
        id: `lead-${Date.now()}`,
        firstName: activeThread.contactName.split(' ')[0] || 'Executive',
        lastName: activeThread.contactName.split(' ')[1] || 'Contact',
        title: 'Decision Maker',
        company: activeThread.company,
        industry: 'B2B Enterprise',
        companySize: '50-200 Employees',
        location: 'United States',
        email: activeThread.contactEmail,
        emailVerification: 'valid',
        confidenceScore: 98,
        linkedinUrl: '',
        websiteUrl: '',
        summary: `Qualified inbound prospect from thread "${activeThread.subject}"`,
        technologies: ['Enterprise Cloud'],
      },
      35000
    );
  };

  const unreadCount = threads.filter((t) => t.unread).length;
  const hotCount = threads.filter((t) => t.category === 'interested' || t.sentiment === 'positive').length;

  return (
    <div className="space-y-4 pb-12">
      {/* Top Smart Inbox Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Unified Smart Inbox
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                Live IMAP & Inbound Parse
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live multi-mailbox communications center with automated classification and CRM deal synchronization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refreshData()}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 shadow-2xs transition-colors"
            title="Refresh Inbox"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowComposeModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Compose Email</span>
          </button>
        </div>
      </div>

      {/* 3-Pane CRM Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-230px)] min-h-[640px]">
        {/* Pane 1: Folders & Sender Mailbox Filter (Col 1-2) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs p-3 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3">
            {/* Quick Compose Button */}
            <button
              onClick={() => setShowComposeModal(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <SendHorizontal className="w-4 h-4" />
              <span>New Message</span>
            </button>

            {/* Folder Navigation */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 block">
                Folders
              </span>

              <button
                onClick={() => setActiveFolder('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFolder === 'all'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-slate-500" />
                  <span>All Inboxes</span>
                </div>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveFolder('interested')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFolder === 'interested'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  <span>Hot Leads</span>
                </div>
                {hotCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                    {hotCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveFolder('sent')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFolder === 'sent'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-slate-500" />
                  <span>Outreach Sent</span>
                </div>
              </button>

              <button
                onClick={() => setActiveFolder('starred')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFolder === 'starred'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Starred</span>
                </div>
              </button>

              <button
                onClick={() => setActiveFolder('archive')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFolder === 'archive'
                    ? 'bg-slate-100 text-slate-800 border border-slate-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-slate-500" />
                  <span>Archive</span>
                </div>
              </button>
            </div>

            {/* Mailbox Filter */}
            <div className="pt-3 border-t border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 block">
                Sender Accounts ({mailboxes.length})
              </span>

              <button
                onClick={() => setSelectedMailboxFilter('all')}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all ${
                  selectedMailboxFilter === 'all'
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Mailboxes</span>
                <span className="text-[10px] text-slate-400">{threads.length}</span>
              </button>

              {mailboxes.map((mb) => (
                <button
                  key={mb.id}
                  onClick={() => setSelectedMailboxFilter(mb.email)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all truncate text-left ${
                    selectedMailboxFilter === mb.email
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  title={mb.email}
                >
                  <span className="truncate">{mb.email}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Health Footer */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-[11px] text-slate-500">
            <div className="flex items-center justify-between font-semibold text-slate-700">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Spam Filter:</span>
              </span>
              <span className="text-emerald-700">Healthy</span>
            </div>
            <p className="text-[10px] text-slate-400">0 emails marked spam</p>
          </div>
        </div>

        {/* Pane 2: Conversation List (Col 4-7) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          {/* Search Header */}
          <div className="p-3 border-b border-slate-200 bg-slate-50/50 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations, companies, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 font-medium">
              <span>Showing {filteredThreads.length} conversations</span>
              <span className="capitalize">{activeFolder}</span>
            </div>
          </div>

          {/* Thread Cards List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredThreads.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">No Conversations Found</p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  {searchQuery
                    ? 'No messages matched your search query.'
                    : 'When leads reply to outreach campaigns or inbound emails arrive, they will appear here live.'}
                </p>
              </div>
            ) : (
              filteredThreads.map((thread) => {
                const isSelected = thread.id === activeThread?.id;

                return (
                  <div
                    key={thread.id}
                    onClick={() => setSelectedThreadId(thread.id)}
                    className={`p-3.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-50/70 border-l-4 border-l-indigo-600'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[10px] text-white shrink-0">
                          {thread.contactName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                            <span>{thread.contactName}</span>
                            {thread.unread && (
                              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium truncate">
                            {thread.company}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-400 font-medium shrink-0">
                        {thread.timestamp}
                      </span>
                    </div>

                    <div className="mt-2">
                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {thread.subject}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {thread.lastMessageSnippet}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full uppercase ${
                          thread.category === 'interested' || thread.sentiment === 'positive'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {thread.category || 'inbound'}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px] truncate max-w-[130px]">
                        {thread.inboxAccount}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pane 3: Thread Details & Interactive Reply Desk (Col 8-12) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden">
          {activeThread ? (
            <>
              {/* Thread Header Toolbar */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {activeThread.subject}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase shrink-0">
                      {activeThread.campaignName || 'Campaign'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {activeThread.contactName} ({activeThread.contactEmail}) • {activeThread.company}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleConvertDeal}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    title="Convert into CRM Pipeline Deal"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Push to Deal</span>
                  </button>

                  <button
                    onClick={handleDeleteActiveThread}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Thread Permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message History Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {activeThread.messages.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    No previous messages recorded in this conversation.
                  </div>
                ) : (
                  activeThread.messages.map((msg) => {
                    const isLead = msg.sender === 'lead';

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          isLead ? 'items-start' : 'items-end'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-slate-500">
                          <span className="font-bold text-slate-700">{msg.senderName}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-[88%] p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                            isLead
                              ? 'bg-slate-100 border border-slate-200 text-slate-900 shadow-2xs'
                              : 'bg-indigo-600 text-white shadow-xs'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.body}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* AI Quick Reply Chips & Composer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    AI Reply:
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `Hi ${activeThread.contactName.split(' ')[0]},\n\nSounds fantastic! Thursday at 3 PM EST works perfectly for a quick live walkthrough.\n\nHere is a calendar link to reserve the slot: https://cal.com/zain/15min\n\nLooking forward to speaking!\n\nBest,\nZain`
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-indigo-700 text-[11px] font-medium whitespace-nowrap transition-colors shadow-2xs"
                  >
                    Confirm Demo
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `Hi ${activeThread.contactName.split(' ')[0]},\n\nYes, absolutely! We support dedicated webhook triggers for your CRM with instant payload sync.\n\nHappy to share the specs.\n\nBest,\nZain`
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-indigo-700 text-[11px] font-medium whitespace-nowrap transition-colors shadow-2xs"
                  >
                    Send Tech Specs
                  </button>
                </div>

                <form onSubmit={handleSendReply} className="space-y-2">
                  <textarea
                    rows={3}
                    placeholder={`Reply to ${activeThread.contactEmail}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono truncate max-w-[200px]">
                      From: {activeThread.inboxAccount || 'Connected Mailbox'}
                    </span>
                    <button
                      type="submit"
                      disabled={!replyText.trim() || isSendingReply}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSendingReply ? 'Sending...' : 'Dispatch Reply'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Select a Conversation</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Choose a conversation from the list to inspect thread timeline, generate AI response chips, and reply live.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Compose Email Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <SendHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Compose New Message</span>
              </h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendCompose} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">To (Recipient Email)</label>
                <input
                  type="email"
                  required
                  placeholder="prospect@company.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Sending Account (Mailbox)</label>
                <select
                  value={composeMailboxId}
                  onChange={(e) => setComposeMailboxId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="">Default Active Mailbox</option>
                  {mailboxes.map((mb) => (
                    <option key={mb.id} value={mb.id}>
                      {mb.email} ({mb.sender_type || 'smtp'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Quick question regarding..."
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Message Body</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your email content here..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingCompose}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSendingCompose ? 'Sending...' : 'Send Outbound Email'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

