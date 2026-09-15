'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MapPin,
  Globe,
  Linkedin,
  Layers,
  Sparkles,
  Calendar,
  Send,
  KanbanSquare,
  Trash2,
  Edit2,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { BackendContact, ContactList, backendApi } from '@/lib/api';
import Link from 'next/link';

interface ContactDetailDrawerProps {
  contact: BackendContact | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (contact: BackendContact) => void;
  onDelete: (contactId: string) => void;
  onEnrichSingle: (contact: BackendContact) => void;
  lists: ContactList[];
}

export function ContactDetailDrawer({
  contact,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onEnrichSingle,
  lists,
}: ContactDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'deals' | 'activity'>('overview');
  const [historyData, setHistoryData] = useState<any>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (contact && isOpen) {
      setActiveTab('overview');
      // Fetch rich history if available
      setLoadingHistory(true);
      fetch(`/backend-api/contacts/${contact.id}/history`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('emareach_token') || ''}`,
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setHistoryData(data);
        })
        .catch(() => {})
        .finally(() => setLoadingHistory(false));
    }
  }, [contact, isOpen]);

  if (!isOpen || !contact) return null;

  const fullName = `${contact.first_name || ''} ${contact.last_name || ''}`.trim() || 'Unnamed Contact';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-2xl flex flex-col">
          {/* Top Bar */}
          <div className="p-5 border-b border-[var(--border-color)] bg-[var(--bg-elevated)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {(contact.first_name?.[0] || contact.company?.[0] || 'U').toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <span>{fullName}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    contact.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : contact.status === 'unsubscribed'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {contact.status}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {contact.title ? `${contact.title} at ` : ''}{contact.company || 'Independent Lead'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onEdit(contact)}
                title="Edit Contact"
                className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-color)] transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onEnrichSingle(contact)}
                title="Enrich with Serper AI"
                className="p-1.5 rounded-lg text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(contact.id)}
                title="Delete Contact"
                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center border-b border-[var(--border-color)] px-5 bg-[var(--bg-surface)] text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-[var(--text-primary)]'
              }`}
            >
              Overview & Details
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors ${
                activeTab === 'campaigns'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-[var(--text-primary)]'
              }`}
            >
              Campaigns & Lists
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-2.5 px-3 font-medium border-b-2 transition-colors ${
                activeTab === 'activity'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-[var(--text-primary)]'
              }`}
            >
              Activity Timeline
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Quick Action Pills */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/campaigns?contact_id=${contact.id}`}
                    className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-center flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Outreach Campaign</span>
                  </Link>
                  <Link
                    href={`/crm?createDealFor=${contact.id}`}
                    className="py-2 px-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium flex items-center justify-center gap-1.5 transition-all"
                  >
                    <KanbanSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Add to CRM Deal</span>
                  </Link>
                </div>

                {/* Contact Attributes Card */}
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] space-y-3">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Contact Channels & Identity
                  </h4>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Email Address</span>
                      {contact.email ? (
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-indigo-400 hover:underline font-medium flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{contact.email}</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">No email provided</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Direct Phone</span>
                      {contact.phone ? (
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-slate-300 font-medium flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{contact.phone}</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">No phone on file</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">LinkedIn Profile</span>
                      {contact.linkedin_url ? (
                        <a
                          href={contact.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:underline font-medium flex items-center gap-1 truncate"
                        >
                          <Linkedin className="w-3 h-3 text-indigo-400" />
                          <span className="truncate">View Profile</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">No LinkedIn URL</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Company Website</span>
                      {contact.website_url ? (
                        <a
                          href={contact.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline font-medium flex items-center gap-1 truncate"
                        >
                          <Globe className="w-3 h-3 text-cyan-400" />
                          <span className="truncate">{contact.website_url.replace(/^https?:\/\//, '')}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">No website URL</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Company & Geographic Context */}
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] space-y-3">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Company & Location Information
                  </h4>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Company</span>
                      <p className="font-semibold text-[var(--text-primary)]">{contact.company || '—'}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Role / Position</span>
                      <p className="font-semibold text-[var(--text-primary)]">{contact.title || '—'}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Industry Vertical</span>
                      <p className="font-medium text-slate-300">{contact.industry || '—'}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Location</span>
                      <p className="font-medium text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{contact.location || '—'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Source Origin</span>
                    <span className="font-medium text-[var(--text-primary)] capitalize">{contact.source || 'Manual'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Total Emails Sent</span>
                    <span className="font-medium text-[var(--text-primary)]">{contact.sent_count || 0}</span>
                  </div>
                  {contact.last_enriched_at && (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Last Enriched via AI</span>
                      <span className="font-medium text-cyan-400">
                        {new Date(contact.last_enriched_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {contact.created_at && (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Date Created</span>
                      <span className="font-medium text-slate-300">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div className="space-y-4">
                {/* Lists assigned */}
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Contact List Memberships</span>
                  </h4>
                  {contact.lists && contact.lists.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {contact.lists.map((l) => (
                        <span
                          key={l.id}
                          className="px-2.5 py-1 rounded-md bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-[11px] font-medium"
                        >
                          {l.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">Not assigned to any specific contact list.</p>
                  )}
                </div>

                {/* Campaign history */}
                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Campaign Outreach History</span>
                  </h4>
                  {historyData?.campaigns && historyData.campaigns.length > 0 ? (
                    <div className="space-y-2">
                      {historyData.campaigns.map((camp: any) => (
                        <div
                          key={camp.id}
                          className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-between"
                        >
                          <span className="font-medium text-[var(--text-primary)]">{camp.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                            Enrolled
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">No campaigns sent to this contact yet.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-3">
                {historyData?.events && historyData.events.length > 0 ? (
                  <div className="space-y-2">
                    {historyData.events.map((ev: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-[var(--text-primary)] capitalize">{ev.type}</p>
                            <span className="text-[10px] text-slate-400">
                              {ev.timestamp ? new Date(ev.timestamp).toLocaleString() : ''}
                            </span>
                          </div>
                          {ev.subject && <p className="text-slate-400 text-[11px] truncate mt-0.5">{ev.subject}</p>}
                          {ev.campaign_name && (
                            <p className="text-[10px] text-indigo-400 mt-0.5">Campaign: {ev.campaign_name}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>No activity logs recorded yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
