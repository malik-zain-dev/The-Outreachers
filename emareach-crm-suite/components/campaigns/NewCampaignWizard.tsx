'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Sparkles,
  Users,
  Mail,
  Send,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Eye,
  Info,
  Layers,
  Wand2,
  CheckSquare,
  Square,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useCRM, ContactView } from '../../lib/crm-store';
import { evaluateRecipientEligibility, RecipientEligibilitySummary } from '../../lib/campaign-engine/recipient-eligibility';
import { resolvePersonalizationTokens, processSpintax } from '../../lib/campaign-engine/personalizer';

interface NewCampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated?: (campaignId: string) => void;
}

const TEMPLATES = [
  {
    name: '🎯 Scaled Outbound Meeting Booker',
    subject: "Quick question regarding {{company}}'s outbound growth",
    body: "Hi {{first_name}},\n\nI noticed that {{company}} is rapidly expanding in the {{industry}} space.\n\nWe specialize in automated cold outreach systems that consistently book 15-25 qualified enterprise sales conversations per month without deliverability issues.\n\nWould you have 5 minutes available this week for a brief teardown of what we're seeing work in your sector?\n\nBest regards,\nZain Malik",
  },
  {
    name: '⚡ Executive Deliverability Teardown',
    subject: 'Idea for {{company}} — cold outreach inbox placement',
    body: "Hi {{first_name}},\n\nReaching out directly as you lead operations at {{company}}.\n\nMost sales teams lose up to 40% of their pipeline to spam filters without realizing it. We built a dedicated infrastructure that guarantees 99%+ inbox placement with automated reply categorization.\n\nWould you be open to seeing a 2-minute video breakdown of how this applies to {{company}}?\n\nBest,\nZain",
  },
  {
    name: '🤝 Strategic Partnership & Integration',
    subject: 'Partnership inquiry: {{company}} + The Outreachers',
    body: "Hello {{first_name}},\n\nI've been following {{company}}'s recent product milestones in {{industry}}.\n\nWe're currently exploring strategic integration partners for our outbound automation suite and felt {{company}} would be an ideal fit for mutual customer expansion.\n\nAre you open to connecting briefly on Thursday or Friday?\n\nCheers,\nZain Malik",
  },
];

const TIMEZONES = [
  { label: 'Asia/Karachi (PKT +05:00)', value: 'Asia/Karachi' },
  { label: 'UTC (Universal Coordinated)', value: 'UTC' },
  { label: 'America/New_York (EST -05:00)', value: 'America/New_York' },
  { label: 'America/Los_Angeles (PST -08:00)', value: 'America/Los_Angeles' },
  { label: 'Europe/London (GMT +00:00)', value: 'Europe/London' },
  { label: 'Asia/Dubai (GST +04:00)', value: 'Asia/Dubai' },
];

export function NewCampaignWizard({ isOpen, onClose, onCampaignCreated }: NewCampaignWizardProps) {
  const { contacts, mailboxes, createCampaignWithRecipients } = useCRM();

  // Wizard Navigation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Campaign Details
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [senderEmail, setSenderEmail] = useState('zm89cc8916@gmail.com');
  const [timezone, setTimezone] = useState('Asia/Karachi');

  // Step 2: Recipient Selection (Contacts)
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [contactSearchQuery, setContactSearchQuery] = useState('');
  const [contactFilterIndustry, setContactFilterIndustry] = useState('All');

  // Step 3: Email Content
  const [subject, setSubject] = useState("Quick question regarding {{company}}'s outbound growth");
  const [body, setBody] = useState(
    "Hi {{first_name}},\n\nI noticed {{company}} is active in the {{industry}} space.\n\nWe help companies automate personalized outreach sequences to book 15-25 qualified sales meetings every month.\n\nWould you be open to a quick 5-minute chat?\n\nBest regards,\nZain Malik"
  );
  const [enableSpintax, setEnableSpintax] = useState(false);

  // Step 4: Preview State
  const [previewContactIndex, setPreviewContactIndex] = useState(0);

  // Step 5: Schedule & Launch
  const [scheduleType, setScheduleType] = useState<'immediate' | 'scheduled' | 'draft'>('immediate');
  const [scheduledDateTime, setScheduledDateTime] = useState('2026-09-15T09:00');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered contacts in Step 2
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        contactSearchQuery === '' ||
        `${c.first_name || ''} ${c.last_name || ''}`.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
        (c.email || '').toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
        (c.company || '').toLowerCase().includes(contactSearchQuery.toLowerCase());

      const matchesIndustry =
        contactFilterIndustry === 'All' || c.industry === contactFilterIndustry;

      return matchesSearch && matchesIndustry;
    });
  }, [contacts, contactSearchQuery, contactFilterIndustry]);

  // Selected Contacts Object List
  const selectedContacts = useMemo(() => {
    return contacts.filter((c) => selectedContactIds.includes(c.id));
  }, [contacts, selectedContactIds]);

  // Eligibility Summary
  const eligibility: RecipientEligibilitySummary = useMemo(() => {
    return evaluateRecipientEligibility(selectedContacts);
  }, [selectedContacts]);

  // Distinct industries for filter
  const industries = useMemo(() => {
    const set = new Set<string>();
    contacts.forEach((c) => {
      if (c.industry) set.add(c.industry);
    });
    return ['All', ...Array.from(set)];
  }, [contacts]);

  // Auto-select all contacts initially if none selected
  React.useEffect(() => {
    if (isOpen && selectedContactIds.length === 0 && contacts.length > 0) {
      setSelectedContactIds(contacts.map((c) => c.id));
    }
  }, [isOpen, contacts]);

  if (!isOpen) return null;

  const toggleSelectContact = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAllFiltered = () => {
    const filteredIds = filteredContacts.map((c) => c.id);
    const combined = Array.from(new Set([...selectedContactIds, ...filteredIds]));
    setSelectedContactIds(combined);
  };

  const handleDeselectAll = () => {
    setSelectedContactIds([]);
  };

  const insertToken = (token: string, target: 'subject' | 'body') => {
    if (target === 'subject') {
      setSubject((prev) => `${prev} {{${token}}}`);
    } else {
      setBody((prev) => `${prev} {{${token}}}`);
    }
  };

  const handleApplyTemplate = (tmpl: typeof TEMPLATES[0]) => {
    setSubject(tmpl.subject);
    setBody(tmpl.body);
  };

  const handleFinalSubmit = async () => {
    if (!name.trim()) {
      setCurrentStep(1);
      return;
    }
    if (eligibility.eligibleCount === 0) {
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createCampaignWithRecipients({
        name: name.trim(),
        description: description.trim() || undefined,
        senderEmail,
        scheduleType,
        scheduledTime: scheduleType === 'scheduled' ? scheduledDateTime : undefined,
        timezone,
        subject,
        body,
        enableSpintax,
        selectedContactIds,
      });

      if (onCampaignCreated) {
        onCampaignCreated(created.id);
      }
      onClose();
    } catch (err) {
      console.error('Failed to create campaign:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview helper
  const previewContact = eligibility.eligible[previewContactIndex] || eligibility.eligible[0];
  const resolvedPreviewSubject = previewContact
    ? enableSpintax
      ? processSpintax(resolvePersonalizationTokens(subject, previewContact), previewContactIndex)
      : resolvePersonalizationTokens(subject, previewContact)
    : subject;

  const resolvedPreviewBody = previewContact
    ? enableSpintax
      ? processSpintax(resolvePersonalizationTokens(body, previewContact), previewContactIndex)
      : resolvePersonalizationTokens(body, previewContact)
    : body;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Create Email Outreach Campaign
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium border border-indigo-200">
                  Step {currentStep} of 5
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Contacts Database → Multi-Recipient Personalization → Outbound Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between text-xs overflow-x-auto gap-2">
          {[
            { step: 1, label: '1. Details' },
            { step: 2, label: '2. Select Contacts' },
            { step: 3, label: '3. Compose' },
            { step: 4, label: '4. Preview' },
            { step: 5, label: '5. Launch' },
          ].map((item) => (
            <div
              key={item.step}
              onClick={() => {
                if (item.step < currentStep || (currentStep === 1 && name.trim())) {
                  setCurrentStep(item.step as any);
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                currentStep === item.step
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold'
                  : currentStep > item.step
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 font-medium'
                  : 'text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === item.step
                    ? 'bg-indigo-600 text-white'
                    : currentStep > item.step
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {currentStep > item.step ? '✓' : item.step}
              </div>
              <span className="whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Body Content by Step */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-800 bg-white">
          {/* STEP 1: Details */}
          {currentStep === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto py-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Campaign Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Enterprise Outbound - SaaS Founders"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Campaign Objective / Internal Description
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Cold outreach targeted at verified decision makers in Pakistan & US SaaS to book demo calls."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Sender Mailbox
                  </label>
                  <select
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    {mailboxes.length > 0 ? (
                      mailboxes.map((mb) => (
                        <option key={mb.id} value={mb.email}>
                          {mb.email} ({mb.sender_type || 'Gmail'})
                        </option>
                      ))
                    ) : (
                      <option value="zm89cc8916@gmail.com">
                        zm89cc8916@gmail.com (Connected Gmail)
                      </option>
                    )}
                  </select>
                  <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> High Deliverability Reputation Score (98%)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Sending Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <strong>Strict Architectural Rule:</strong> Campaigns pull recipients exclusively from your <strong>Contacts Database</strong>. In Step 2, you will select verified contacts. Missing or duplicate email addresses will be automatically handled.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Select Contacts */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {/* Eligibility Metrics Summary Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-xs text-slate-500">Total Selected</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {eligibility.totalSelected}
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-xs text-emerald-800 font-semibold">Eligible for Dispatch</div>
                  <div className="text-lg font-bold text-emerald-700 mt-0.5">
                    {eligibility.eligibleCount}
                  </div>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                  <div className="text-xs text-rose-800 font-semibold">No / Invalid Email</div>
                  <div className="text-lg font-bold text-rose-700 mt-0.5">
                    {eligibility.noEmailCount}
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-xs text-amber-800 font-semibold">Duplicate Protection</div>
                  <div className="text-lg font-bold text-amber-700 mt-0.5">
                    {eligibility.duplicateCount}
                  </div>
                </div>
              </div>

              {eligibility.noEmailCount > 0 && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {eligibility.noEmailCount} contact(s) lack a valid email address and will be safely excluded from outreach.
                  </span>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search contacts by name, email, or company..."
                      value={contactSearchQuery}
                      onChange={(e) => setContactSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <select
                    value={contactFilterIndustry}
                    onChange={(e) => setContactFilterIndustry(e.target.value)}
                    className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        Industry: {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSelectAllFiltered}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors border border-slate-300"
                  >
                    Select All ({filteredContacts.length})
                  </button>
                  <button
                    onClick={handleDeselectAll}
                    className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-medium transition-colors border border-slate-200"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              {/* Contacts Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-72 overflow-y-auto bg-white">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 sticky top-0">
                    <tr>
                      <th className="p-3 w-10">
                        <input
                          type="checkbox"
                          checked={
                            filteredContacts.length > 0 &&
                            filteredContacts.every((c) => selectedContactIds.includes(c.id))
                          }
                          onChange={(e) => {
                            if (e.target.checked) handleSelectAllFiltered();
                            else handleDeselectAll();
                          }}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                        />
                      </th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Company & Role</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3 text-right">Eligibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredContacts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">
                          No contacts found matching criteria in Contacts Database.
                        </td>
                      </tr>
                    ) : (
                      filteredContacts.map((contact) => {
                        const isSelected = selectedContactIds.includes(contact.id);
                        const hasEmail = Boolean(contact.email && contact.email.includes('@'));

                        return (
                          <tr
                            key={contact.id}
                            onClick={() => toggleSelectContact(contact.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? 'bg-indigo-50/70 hover:bg-indigo-50' : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                              />
                            </td>
                            <td className="p-3 font-semibold text-slate-900">
                              {contact.first_name || ''} {contact.last_name || ''}
                              {!contact.first_name && !contact.last_name && (
                                <span className="text-slate-400 font-normal">No name provided</span>
                              )}
                            </td>
                            <td className="p-3">
                              <div className="text-slate-800 font-medium">{contact.company || 'Direct'}</div>
                              <div className="text-[11px] text-slate-500">
                                {contact.custom_fields?.title || contact.industry || 'Lead'}
                              </div>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-indigo-600 font-medium">
                              {contact.email || <span className="text-rose-600 font-sans">Missing</span>}
                            </td>
                            <td className="p-3 text-right">
                              {hasEmail ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                                  <CheckCircle2 className="w-3 h-3" /> Ready
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-semibold">
                                  <AlertCircle className="w-3 h-3" /> No Email
                                </span>
                              )}
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

          {/* STEP 3: Compose Email */}
          {currentStep === 3 && (
            <div className="space-y-5">
              {/* Template quick-picker */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Cold Outreach Templates:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleApplyTemplate(tmpl)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium transition-colors border border-slate-300 shadow-2xs"
                    >
                      {tmpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personalization Tokens insertion bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Insert Token:</span>
                {['first_name', 'last_name', 'company', 'industry', 'job_title', 'location'].map((tok) => (
                  <button
                    key={tok}
                    onClick={() => insertToken(tok, 'body')}
                    className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded text-xs font-mono font-medium transition-colors"
                  >
                    +{`{{${tok}}}`}
                  </button>
                ))}
                <label className="ml-auto flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={enableSpintax}
                    onChange={(e) => setEnableSpintax(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                  />
                  <span>Enable Spintax variation <code className="text-indigo-600 font-semibold">{`{Hi|Hey}`}</code></span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Subject Line</span>
                  <button
                    onClick={() => insertToken('company', 'subject')}
                    className="text-indigo-600 hover:underline text-[11px] font-semibold"
                  >
                    + Add {'{{company}}'}
                  </button>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Email Body (Plain Text & Dynamic Tokens)
                </label>
                <textarea
                  rows={8}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-sans focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Multi-Recipient Preview */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Previewing personalized email as received by:
                  </span>
                </div>
                {eligibility.eligibleCount > 0 ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={previewContactIndex}
                      onChange={(e) => setPreviewContactIndex(Number(e.target.value))}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                    >
                      {eligibility.eligible.map((contact, idx) => (
                        <option key={contact.id} value={idx}>
                          #{idx + 1}: {contact.first_name || 'Contact'} ({contact.company || contact.email})
                        </option>
                      ))}
                    </select>
                    <span className="text-xs text-slate-500 font-medium">
                      ({previewContactIndex + 1} of {eligibility.eligibleCount})
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-rose-600 font-medium">No eligible contacts selected.</span>
                )}
              </div>

              {/* Rendered Email Mockup */}
              {previewContact ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="border-b border-slate-200 pb-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 w-16 font-medium">From:</span>
                      <span className="text-slate-900 font-semibold">{senderEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 w-16 font-medium">To:</span>
                      <span className="text-indigo-700 font-mono font-medium">
                        {previewContact.first_name} {previewContact.last_name} &lt;{previewContact.email}&gt;
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 w-16 font-medium">Subject:</span>
                      <span className="text-slate-900 font-bold">{resolvedPreviewSubject}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed pt-2">
                    {resolvedPreviewBody}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-400">
                  Please select at least 1 contact with a valid email in Step 2 to preview.
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Review & Send / Schedule */}
          {currentStep === 5 && (
            <div className="space-y-6 max-w-2xl mx-auto py-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Campaign Verification Summary
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-500">Campaign Name</span>
                    <span className="text-slate-900 font-bold">{name}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-500">Target Recipients</span>
                    <span className="text-emerald-700 font-bold">
                      {eligibility.eligibleCount} verified contacts
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-500">Excluded (No Email / Duplicates)</span>
                    <span className="text-amber-700 font-semibold">
                      {eligibility.noEmailCount + eligibility.duplicateCount} contacts
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-500">Sending Mailbox</span>
                    <span className="text-slate-900 font-mono font-medium">{senderEmail}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-500">Timezone</span>
                    <span className="text-slate-900 font-medium">{timezone}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Dispatch Mode
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    onClick={() => setScheduleType('immediate')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      scheduleType === 'immediate'
                        ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <Send className="w-4 h-4 text-indigo-600" />
                      <span>Send Now</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Immediately initiate queue and dispatch to all eligible contacts.
                    </p>
                  </div>

                  <div
                    onClick={() => setScheduleType('scheduled')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      scheduleType === 'scheduled'
                        ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span>Schedule</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Set automated launch time with timezone synchronization.
                    </p>
                  </div>

                  <div
                    onClick={() => setScheduleType('draft')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      scheduleType === 'draft'
                        ? 'bg-indigo-50 border-indigo-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span>Save as Draft</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Store in campaign workspace without sending yet.
                    </p>
                  </div>
                </div>
              </div>

              {scheduleType === 'scheduled' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-xs font-semibold text-slate-800">
                    Schedule Launch Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledDateTime}
                    onChange={(e) => setScheduledDateTime(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as any) : prev))}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 rounded-xl text-xs font-semibold transition-colors border border-slate-300 shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex items-center gap-3">
            {currentStep < 5 ? (
              <button
                type="button"
                disabled={
                  (currentStep === 1 && !name.trim()) ||
                  (currentStep === 2 && eligibility.eligibleCount === 0)
                }
                onClick={() => setCurrentStep((prev) => (prev < 5 ? ((prev + 1) as any) : prev))}
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting || eligibility.eligibleCount === 0}
                onClick={handleFinalSubmit}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : scheduleType === 'immediate' ? (
                  <>
                    <Send className="w-4 h-4" /> Launch Outreach Now
                  </>
                ) : scheduleType === 'scheduled' ? (
                  <>
                    <Calendar className="w-4 h-4" /> Confirm & Schedule
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" /> Save Campaign Draft
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
