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
  Save,
  Check,
} from 'lucide-react';
import { BackendContact, ContactList, backendApi } from '@/lib/api';

interface ContactFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveComplete: () => void;
  contactToEdit?: BackendContact | null;
  lists: ContactList[];
}

export function ContactFormDialog({
  isOpen,
  onClose,
  onSaveComplete,
  contactToEdit,
  lists,
}: ContactFormDialogProps) {
  const isEditing = Boolean(contactToEdit);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [status, setStatus] = useState<BackendContact['status']>('active');
  const [source, setSource] = useState('manual');
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contactToEdit) {
      setFirstName(contactToEdit.first_name || '');
      setLastName(contactToEdit.last_name || '');
      setEmail(contactToEdit.email || '');
      setPhone(contactToEdit.phone || '');
      setCompany(contactToEdit.company || '');
      setTitle(contactToEdit.title || '');
      setIndustry(contactToEdit.industry || '');
      setLocation(contactToEdit.location || '');
      setLinkedinUrl(contactToEdit.linkedin_url || '');
      setWebsiteUrl(contactToEdit.website_url || '');
      setStatus(contactToEdit.status || 'active');
      setSource(contactToEdit.source || 'manual');
      setSelectedListIds(contactToEdit.lists?.map((l) => l.id) || contactToEdit.list_ids || []);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setTitle('');
      setIndustry('');
      setLocation('');
      setLinkedinUrl('');
      setWebsiteUrl('');
      setStatus('active');
      setSource('manual');
      setSelectedListIds([]);
    }
    setError(null);
  }, [contactToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() && !firstName.trim() && !lastName.trim() && !company.trim()) {
      setError('Please provide at least a name, email, or company.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload: Partial<BackendContact> = {
      first_name: firstName.trim() || undefined,
      last_name: lastName.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      company: company.trim() || undefined,
      title: title.trim() || undefined,
      industry: industry.trim() || undefined,
      location: location.trim() || undefined,
      linkedin_url: linkedinUrl.trim() || undefined,
      website_url: websiteUrl.trim() || undefined,
      status,
      source,
      list_ids: selectedListIds,
    };

    try {
      if (isEditing && contactToEdit) {
        const ok = await backendApi.updateContact(contactToEdit.id, payload);
        if (ok) {
          onSaveComplete();
          onClose();
        } else {
          setError('Failed to update contact.');
        }
      } else {
        const res = await backendApi.createContact(payload);
        if (res) {
          onSaveComplete();
          onClose();
        } else {
          setError('Failed to create contact.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const toggleList = (listId: string) => {
    setSelectedListIds((prev) =>
      prev.includes(listId) ? prev.filter((id) => id !== listId) : [...prev, listId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {isEditing ? 'Edit Contact Profile' : 'Create New Contact'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isEditing ? 'Update contact record attributes and list memberships' : 'Add an individual business lead to the CRM'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              {error}
            </div>
          )}

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Zain"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Malik"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Contact Details Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>Work / Personal Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>Direct Phone</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Company & Role Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span>Company Name</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Outreachers Labs"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-slate-400" />
                <span>Job Title / Role</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Chief Executive Officer"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Industry & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Industry Vertical</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. B2B SaaS"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Location / City</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Minneapolis, MN, USA"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Online Profiles */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-indigo-400" />
                <span>LinkedIn Profile URL</span>
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>Company Website URL</span>
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Status & Source */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Contact Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              >
                <option value="active">Active (Eligible for outreach)</option>
                <option value="pending">Pending</option>
                <option value="unsubscribed">Unsubscribed (Suppressed)</option>
                <option value="bounced">Bounced</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1 block">Lead Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
              >
                <option value="manual">Manual Entry</option>
                <option value="ai_lead_gen">AI Lead Generation</option>
                <option value="csv_import">CSV Import</option>
                <option value="enrichment">Enriched Web Data</option>
              </select>
            </div>
          </div>

          {/* Contact Lists Selection */}
          {lists.length > 0 && (
            <div className="pt-2 border-t border-[var(--border-color)]">
              <label className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Assign to Contact Lists</span>
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1">
                {lists.map((l) => {
                  const isSelected = selectedListIds.includes(l.id);
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => toggleList(l.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] border flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40 font-medium'
                          : 'bg-[var(--bg-elevated)] text-slate-400 border-[var(--border-color)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      <span>{l.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-slate-400 hover:text-[var(--text-primary)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-medium text-white flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Contact'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
