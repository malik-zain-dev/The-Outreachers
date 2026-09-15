'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Layers,
  Save,
  Check,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { ContactList, backendApi } from '@/lib/api';

interface ContactListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveComplete: () => void;
  listToEdit?: ContactList | null;
}

export function ContactListModal({
  isOpen,
  onClose,
  onSaveComplete,
  listToEdit,
}: ContactListModalProps) {
  const isEditing = Boolean(listToEdit);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (listToEdit) {
      setName(listToEdit.name || '');
      setDescription(listToEdit.description || '');
    } else {
      setName('');
      setDescription('');
    }
    setError(null);
  }, [listToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('List name is required.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (isEditing && listToEdit) {
        const ok = await backendApi.updateContactList(listToEdit.id, {
          name: name.trim(),
          description: description.trim(),
        });
        if (ok) {
          onSaveComplete();
          onClose();
        } else {
          setError('Failed to update contact list.');
        }
      } else {
        const res = await backendApi.createContactList({
          name: name.trim(),
          description: description.trim(),
        });
        if (res) {
          onSaveComplete();
          onClose();
        } else {
          setError('Failed to create contact list.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {isEditing ? 'Edit Contact List' : 'Create Contact List'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Segment and organize leads for campaigns and deals
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-[11px] font-medium text-slate-400 mb-1 block">
              List Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q4 Healthcare Outreach Leaders"
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-400 mb-1 block">Description (Optional)</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details on how this list was sourced or intended outreach target..."
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
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
              <span>{saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create List'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
