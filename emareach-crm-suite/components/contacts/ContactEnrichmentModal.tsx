'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Check,
  AlertCircle,
  RefreshCw,
  Mail,
  Phone,
  Linkedin,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { BackendContact, EnrichmentResult, backendApi } from '@/lib/api';

interface ContactEnrichmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrichComplete: () => void;
  selectedContacts: BackendContact[];
}

export function ContactEnrichmentModal({
  isOpen,
  onClose,
  onEnrichComplete,
  selectedContacts,
}: ContactEnrichmentModalProps) {
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'email',
    'phone',
    'linkedin_url',
    'website_url',
  ]);
  const [customSerperKey, setCustomSerperKey] = useState('');
  const [enriching, setEnriching] = useState(false);
  const [enrichResult, setEnrichResult] = useState<EnrichmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleStartEnrichment = async () => {
    if (selectedContacts.length === 0) return;
    setEnriching(true);
    setError(null);

    try {
      const res = await backendApi.enrichContacts({
        contact_ids: selectedContacts.map((c) => c.id),
        fields_to_enrich: selectedFields,
        serper_api_key: customSerperKey.trim() || undefined,
      });

      if (res) {
        setEnrichResult(res);
        onEnrichComplete();
      }
    } catch (err: any) {
      setError(err.message || 'Enrichment failed.');
    } finally {
      setEnriching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Enrich Missing Contact Data</h3>
              <p className="text-[11px] text-slate-400">Discover verified channels via targeted Serper web search</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!enrichResult ? (
            <>
              {/* Target Contacts Info */}
              <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-between">
                <span className="text-slate-400">Selected Contacts for Enrichment:</span>
                <span className="font-bold text-indigo-400">{selectedContacts.length} Contact{selectedContacts.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Strict Verification Badge */}
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Zero Fabrication Guarantee</p>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">
                    Only real, verified data found in public business domains and listings is attached. Missing fields remain unmodified.
                  </p>
                </div>
              </div>

              {/* Fields to discover */}
              <div className="space-y-2">
                <label className="font-semibold text-[var(--text-primary)]">Target Attributes to Discover</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleField('email')}
                    className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      selectedFields.includes('email')
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Work Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleField('phone')}
                    className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      selectedFields.includes('phone')
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Direct Phone</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleField('linkedin_url')}
                    className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      selectedFields.includes('linkedin_url')
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>LinkedIn Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleField('website_url')}
                    className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      selectedFields.includes('website_url')
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Company Website</span>
                  </button>
                </div>
              </div>

              {/* Optional Serper Key Override */}
              <div className="space-y-1 pt-1">
                <label className="text-[11px] text-slate-400 block">
                  Serper API Key (Optional Override)
                </label>
                <input
                  type="password"
                  placeholder="Uses Settings API key if blank..."
                  value={customSerperKey}
                  onChange={(e) => setCustomSerperKey(e.target.value)}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                />
              </div>
            </>
          ) : (
            <div className="py-4 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">Enrichment Completed</h4>
                <p className="text-xs text-slate-400 mt-1">{enrichResult.message}</p>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-between max-w-xs mx-auto text-xs">
                <span className="text-slate-400">Enriched Records:</span>
                <span className="font-bold text-emerald-400">{enrichResult.enriched_count}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-[var(--border-color)] bg-[var(--bg-elevated)]">
          {!enrichResult ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-slate-400 hover:text-[var(--text-primary)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartEnrichment}
                disabled={enriching || selectedFields.length === 0}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-medium text-white flex items-center gap-1.5 shadow-sm transition-all"
              >
                {enriching ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Enriching via Serper...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Start AI Enrichment
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEnrichResult(null);
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white shadow-sm transition-all"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
