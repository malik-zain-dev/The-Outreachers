'use client';

import React, { useState } from 'react';
import { useCRM } from '@/lib/crm-store';
import { X, Plus, DollarSign } from 'lucide-react';

interface NewDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStageId?: string;
}

export function NewDealDialog({
  isOpen,
  onClose,
  defaultStageId,
}: NewDealDialogProps) {
  const { createDeal, activePipeline, contacts } = useCRM();

  const stages = activePipeline?.stages || [];
  const initialStage = defaultStageId || stages[0]?.id || 'stage-1';

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [value, setValue] = useState<number>(15000);
  const [stageId, setStageId] = useState(initialStage);
  const [probability, setProbability] = useState<number>(
    stages.find((s: any) => s.id === initialStage)?.probability || 20
  );
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [source, setSource] = useState('Outbound Campaign');
  const [expectedCloseDate, setExpectedCloseDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [tags, setTags] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    if (!contactId) return;

    const matched = contacts.find((c) => c.id === contactId);
    if (matched) {
      if (matched.company) setCompany(matched.company);
      const name = `${matched.first_name || ''} ${matched.last_name || ''}`.trim();
      if (name) setContactName(name);
      if (matched.email) setContactEmail(matched.email);
      if (matched.title) setContactRole(matched.title);
      if (!title) setTitle(`${matched.company || name} — Enterprise Deal`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;

    setIsSubmitting(true);
    try {
      await createDeal({
        title: title.trim(),
        company: company.trim(),
        contactName: contactName.trim() || 'Lead Decision Maker',
        contactEmail: contactEmail.trim(),
        contactRole: contactRole.trim() || 'Executive',
        contactId: selectedContactId || undefined,
        value: Number(value) || 0,
        stage: stageId,
        probability: Number(probability) || 20,
        priority,
        leadSource: source,
        expectedCloseDate,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        status: 'open',
      });
      onClose();
    } catch (err) {
      console.error('Failed to create deal:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 relative my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Create CRM Opportunity</h3>
              <p className="text-xs text-slate-500">Add an enterprise sales deal to your pipeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Deal Title <span className="text-rose-500">*</span></label>
            <input
              type="text"
              required
              placeholder="e.g. Enterprise Outreach Scaling Contract"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 text-xs"
            />
          </div>

          {/* Contact Picker from CRM Contacts */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Select Verified Contact (Optional link to Contacts Database)
            </label>
            <select
              value={selectedContactId}
              onChange={(e) => handleSelectContact(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 text-xs font-medium"
            >
              <option value="">-- Choose from Contacts or enter manually below --</option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.first_name || ''} {c.last_name || ''} ({c.company || c.email})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company Name <span className="text-rose-500">*</span></label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Contact Name</label>
              <input
                type="text"
                placeholder="e.g. John Smith"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                placeholder="e.g. john@acme.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Job Role</label>
              <input
                type="text"
                placeholder="e.g. VP of Growth"
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pipeline & Initial Stage</label>
              <select
                value={stageId}
                onChange={(e) => setStageId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 text-xs font-medium"
              >
                {stages.map((st: any) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.probability}%)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lead Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 text-xs font-medium"
              >
                <option value="Outbound Campaign">Outbound Campaign</option>
                <option value="AI Lead Generation">AI Lead Generation</option>
                <option value="Website Inbound">Website Inbound</option>
                <option value="Referral">Referral</option>
                <option value="Manual Prospecting">Manual Prospecting</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Deal Value ($)</label>
              <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Win Probability (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={probability}
                onChange={(e) => setProbability(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 text-xs font-bold text-indigo-700"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 text-xs font-medium"
              >
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Expected Close Date</label>
              <input
                type="date"
                value={expectedCloseDate}
                onChange={(e) => setExpectedCloseDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="Enterprise, SaaS, Q4"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold text-white shadow-xs transition-all"
            >
              {isSubmitting ? 'Saving...' : 'Create Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
