'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '@/lib/crm-store';
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
  Zap,
  Save,
  RotateCw,
  ExternalLink,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const { addNotification } = useCRM();

  const [serperKey, setSerperKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [zerobounceKey, setZerobounceKey] = useState('');

  const [showSerper, setShowSerper] = useState(false);
  const [showGroq, setShowGroq] = useState(false);

  const [serperTesting, setSerperTesting] = useState(false);
  const [serperStatus, setSerperStatus] = useState<'untested' | 'valid' | 'invalid'>('untested');

  const [groqTesting, setGroqTesting] = useState(false);
  const [groqStatus, setGroqStatus] = useState<'untested' | 'valid' | 'invalid'>('untested');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedSerper = localStorage.getItem('emareach_serper_key');
      if (savedSerper) {
        setSerperKey(savedSerper);
        setSerperStatus('valid');
      }
      const savedGroq = localStorage.getItem('emareach_groq_key');
      if (savedGroq) setGroqKey(savedGroq);
      const savedZero = localStorage.getItem('emareach_zerobounce_key');
      if (savedZero) setZerobounceKey(savedZero);
    } catch (e) {}
  }, []);

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (serperKey.trim()) {
        localStorage.setItem('emareach_serper_key', serperKey.trim());
      }
      if (groqKey.trim()) {
        localStorage.setItem('emareach_groq_key', groqKey.trim());
      }
      if (zerobounceKey.trim()) {
        localStorage.setItem('emareach_zerobounce_key', zerobounceKey.trim());
      }
      addNotification('API Keys Saved', 'Your Serper and Groq API keys are saved for live search.', 'success');
    } catch (e) {
      console.error(e);
    }
  };

  const handleTestSerper = async () => {
    if (!serperKey.trim()) {
      alert('Please enter your Serper API Key first.');
      return;
    }
    setSerperTesting(true);
    setSerperStatus('untested');
    try {
      const res = await fetch('/api/integrations/test-serper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: serperKey.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSerperStatus('valid');
        localStorage.setItem('emareach_serper_key', serperKey.trim());
        addNotification('Serper API Connected', 'Google Search live scraper is verified and ready!', 'success');
      } else {
        setSerperStatus('invalid');
        alert(data.message || 'Serper API connection failed. Please check your key.');
      }
    } catch (err: any) {
      setSerperStatus('invalid');
      alert(`Serper connection error: ${err.message}`);
    } finally {
      setSerperTesting(false);
    }
  };

  const handleTestGroq = async () => {
    if (!groqKey.trim()) return;
    setGroqTesting(true);
    setGroqStatus('untested');
    try {
      const res = await fetch('/api/integrations/test-groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: groqKey.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGroqStatus('valid');
        localStorage.setItem('emareach_groq_key', groqKey.trim());
        addNotification('Groq AI Connected', 'Llama 3.3 70B extraction engine verified!', 'success');
      } else {
        setGroqStatus('invalid');
        alert(data.message || 'Groq API connection failed.');
      }
    } catch (e: any) {
      setGroqStatus('invalid');
      alert(`Groq connection error: ${e.message}`);
    } finally {
      setGroqTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-indigo-600" />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            API Integrations & Real-World Keys
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Configure Serper.dev for live Google scraping and Groq AI for automated B2B lead enrichment.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSaveKeys} className="space-y-6">
        {/* Serper.dev Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Serper.dev Google Search API</h3>
                <p className="text-xs text-slate-500">
                  Required for real-world live scraping of executive LinkedIn profiles and company websites
                </p>
              </div>
            </div>

            <a
              href="https://serper.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <span>Get Free Key (2,500 Searches)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Serper API Key (X-API-KEY)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showSerper ? 'text' : 'password'}
                  placeholder="e.g. 7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p"
                  value={serperKey}
                  onChange={(e) => {
                    setSerperKey(e.target.value);
                    setSerperStatus('untested');
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowSerper(!showSerper)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showSerper ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleTestSerper}
                disabled={serperTesting || !serperKey.trim()}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 disabled:opacity-50 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                {serperTesting ? (
                  <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                ) : serperStatus === 'valid' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : null}
                <span>Test Live Google Search</span>
              </button>
            </div>
            {serperStatus === 'valid' && (
              <p className="text-[11px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified! Real Google search scraping is active on /lead-gen</span>
              </p>
            )}
          </div>
        </div>

        {/* Groq AI Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Groq AI (Llama 3.3 70B Engine)</h3>
                <p className="text-xs text-slate-500">
                  Parses real search results, generates corporate emails, and extracts decision maker summaries
                </p>
              </div>
            </div>

            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-600 hover:text-purple-700"
            >
              <span>Groq Console</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Groq API Key
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showGroq ? 'text' : 'password'}
                  placeholder="gsk_..."
                  value={groqKey}
                  onChange={(e) => {
                    setGroqKey(e.target.value);
                    setGroqStatus('untested');
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowGroq(!showGroq)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showGroq ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleTestGroq}
                disabled={groqTesting || !groqKey.trim()}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 disabled:opacity-50 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                {groqTesting ? (
                  <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                ) : groqStatus === 'valid' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : null}
                <span>Test Groq AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* ZeroBounce Card (Optional) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">ZeroBounce SMTP Email Validator (Optional)</h3>
              <p className="text-xs text-slate-500">
                Verifies SMTP inbox deliverability in real-time to avoid email bounces
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              ZeroBounce API Key
            </label>
            <input
              type="password"
              placeholder="e.g. 5a6b7c8d9e..."
              value={zerobounceKey}
              onChange={(e) => setZerobounceKey(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save All API Integrations</span>
          </button>
        </div>
      </form>
    </div>
  );
}
