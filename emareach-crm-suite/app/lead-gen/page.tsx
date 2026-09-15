'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCRM } from '@/lib/crm-store';
import { LeadProspect } from '@/lib/api';
import { LeadDetailDrawer } from '@/components/lead-gen/LeadDetailDrawer';
import { MapLocationSelector } from '@/components/lead-gen/MapLocationSelector';
import {
  StructuredLocation,
  StructuredSearchCriteria,
  normalizeLocationString,
} from '@/lib/lead-engine/location-types';
import { parseNaturalLanguageCriteria } from '@/lib/lead-engine/query-generator';
import { executeMultiStrategySearch } from '@/lib/lead-engine/search-orchestrator';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Building,
  MapPin,
  Linkedin,
  Mail,
  Phone,
  Globe,
  Plus,
  ArrowLeft,
  SlidersHorizontal,
  Key,
  ExternalLink,
  Search,
  AlertTriangle,
  Layers,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Activity,
  Filter,
  RefreshCw,
  LayoutGrid,
  Table as TableIcon,
  HelpCircle,
  Zap,
  Sliders,
  Check,
  Tag,
  ShieldCheck,
  X,
  Sun,
  Moon,
  ShieldAlert,
  FileSpreadsheet,
  Download,
  Award,
  Users,
} from 'lucide-react';

const INDUSTRY_LIST = [
  'Healthcare & Medical Practices',
  'HealthTech & Digital Health',
  'Biomedical & Life Sciences',
  'B2B SaaS & Cloud Software',
  'Software Development & IT Services',
  'FinTech & Digital Banking',
  'Cybersecurity & InfoSec',
  'Supply Chain & Logistics',
  'Marketing & Growth Agencies',
  'Education & EdTech',
  'Manufacturing & Industrial Tech',
];

const JOB_TITLE_LIST = [
  'Physician / Medical Doctor (MD / DO)',
  'Medical Director / Chief Medical Officer',
  'Founder / Chief Executive Officer (CEO)',
  'Co-Founder / Managing Partner',
  'Chief Revenue Officer (CRO)',
  'VP of Sales & Business Development',
  'Chief Technology Officer (CTO)',
  'Head of Growth & Outbound',
  'Executive Director / Practice Manager',
];

const COMPANY_SIZE_LIST = [
  '1–10 Employees (Solo / Boutique)',
  '10–20 Employees (Small Medical Practice / Clinic)',
  '21–50 Employees (Growing Medical Group)',
  '51–200 Employees (Mid-Market HealthTech)',
  '200+ Employees (Enterprise)',
];

interface StrategyExecutionLog {
  strategyId: string;
  strategyName: string;
  query: string;
  page: number;
  rawResultsCount: number;
  candidatesCount: number;
  validAddedCount: number;
  rejectedCount: number;
  duplicatesCount: number;
  durationMs: number;
  error?: string;
}

interface RejectedCandidateLog {
  id: string;
  name: string;
  title: string;
  company: string;
  detectedLocation: string;
  rejectionReason: string;
  query: string;
}

export default function LeadGenWorkspacePage() {
  const router = useRouter();
  const {
    leads,
    contacts,
    addLeadToContacts,
    batchAddLeadsToContacts,
    checkIfInContacts,
    addNotification,
  } = useCRM();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  // Mode Selection: 'manual' | 'guided'
  const [searchMode, setSearchMode] = useState<'manual' | 'guided'>('guided');

  // Manual Mode State (Starts completely empty)
  const [manualPrompt, setManualPrompt] = useState('');

  // Guided Mode State (Starts empty, user searches or picks a preset)
  const [selectedLocation, setSelectedLocation] = useState<StructuredLocation | null>(null);

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([
    INDUSTRY_LIST[0],
  ]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    JOB_TITLE_LIST[2], // 'Founder / Chief Executive Officer (CEO)'
  ]);
  const [selectedSize, setSelectedSize] = useState<string>(COMPANY_SIZE_LIST[0]);
  const [keywords, setKeywords] = useState('');
  const [excludedKeywords, setExcludedKeywords] = useState('jobs, recruiting, intern, careers');
  const [targetCompany, setTargetCompany] = useState('');

  // Search Budget & Depth
  const [targetLeadCount, setTargetLeadCount] = useState<number>(20);
  const [searchBudget, setSearchBudget] = useState<number>(5);

  // Execution & Live Diagnostics State
  const [serperKey, setSerperKey] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResults, setSearchResults] = useState<LeadProspect[]>([]);
  const [executionLogs, setExecutionLogs] = useState<StrategyExecutionLog[]>([]);
  const [rejectedCandidates, setRejectedCandidates] = useState<RejectedCandidateLog[]>([]);
  const [showRejectionsDrawer, setShowRejectionsDrawer] = useState(false);
  const [showLogsDrawer, setShowLogsDrawer] = useState(false);
  const [diagnostics, setDiagnostics] = useState<{
    totalQueriesRun?: number;
    totalRawFetched?: number;
    totalCandidatesExtracted?: number;
    passedLocationCount?: number;
    passedSizeCount?: number;
    decisionMakersCount?: number;
    totalRejected?: number;
    totalDuplicatesFiltered?: number;
    totalDurationMs?: number;
  }>({});

  // View & Filter State
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedLeadForDrawer, setSelectedLeadForDrawer] = useState<LeadProspect | null>(null);

  // Local Filter Toolbar
  const [filterSearch, setFilterSearch] = useState('');
  const [filterScoreMin, setFilterScoreMin] = useState<number>(0);
  const [filterEmailOnly, setFilterEmailOnly] = useState(false);
  const [filterPhoneOnly, setFilterPhoneOnly] = useState(false);
  const [filterLinkedInOnly, setFilterLinkedInOnly] = useState(false);
  const [filterContactState, setFilterContactState] = useState<'all' | 'in_contacts' | 'not_added'>('all');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('emareach_serper_key');
      if (saved) setSerperKey(saved);
    } catch (e) {}
  }, []);

  const handleDiscover = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!serperKey.trim()) {
      setErrorMessage('Please enter your Serper API Key in the top status bar or in Settings to perform live Google searches.');
      return;
    }

    setIsSearching(true);
    setExecutionLogs([]);
    setRejectedCandidates([]);

    try {
      localStorage.setItem('emareach_serper_key', serperKey.trim());

      // Assemble structured search criteria
      let criteria: StructuredSearchCriteria;

      if (searchMode === 'manual') {
        if (!manualPrompt.trim()) {
          setErrorMessage('Please describe the leads you are looking for in the search prompt.');
          setIsSearching(false);
          return;
        }
        const groqKey = localStorage.getItem('emareach_groq_key') || '';
        criteria = await parseNaturalLanguageCriteria(manualPrompt.trim(), groqKey);
      } else {
        if (!selectedLocation) {
          setErrorMessage('Please select or search for a target geographic location before starting Guided Search.');
          setIsSearching(false);
          return;
        }
        criteria = {
          mode: 'guided',
          location: selectedLocation,
          industries: selectedIndustries,
          jobTitles: selectedRoles.length > 0 ? selectedRoles : [JOB_TITLE_LIST[2]],
          companySize: {
            label: selectedSize,
            min: selectedSize.includes('1–10') ? 1 : selectedSize.includes('10–20') ? 10 : selectedSize.includes('21–50') ? 21 : 51,
            max: selectedSize.includes('1–10') ? 10 : selectedSize.includes('10–20') ? 20 : selectedSize.includes('21–50') ? 50 : 200,
          },
          targetCompany: targetCompany.trim() || undefined,
          keywords: keywords.trim() || undefined,
          excludedKeywords: excludedKeywords.trim() || undefined,
          strictLocation: true,
          strictCompanySize: true,
          strictIndustry: true,
          strictJobTitle: true,
        };
      }

      // Execute live search pipeline via /api/lead-gen/live server route (bypasses browser CORS & uses node fetch)
      const res = await fetch('/api/lead-gen/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: searchMode,
          manualPrompt: searchMode === 'manual' ? manualPrompt.trim() : undefined,
          structuredCriteria: criteria,
          serperApiKey: serperKey.trim(),
          groqApiKey: localStorage.getItem('emareach_groq_key') || undefined,
          targetCount: targetLeadCount || 20,
          searchBudget: searchBudget || 5,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.message || 'Search execution failed on Serper engine.');
      }

      const discoveredProspects = data.prospects || [];
      setSearchResults(discoveredProspects);
      setExecutionLogs(data.strategiesExecuted || []);
      setRejectedCandidates(data.rejectedCandidates || []);
      setDiagnostics(data.diagnostics || {});

      if (discoveredProspects.length > 0) {
        addNotification(
          'Lead Discovery Complete',
          `Discovered ${discoveredProspects.length} qualified leads in ${criteria.location.displayName}.`,
          'success'
        );
      } else {
        addNotification(
          'No Leads Found',
          `0 leads found matching ${criteria.location.displayName}. Try broadening criteria or changing target keywords.`,
          'info'
        );
      }
    } catch (err: any) {
      console.error('Lead Gen Discovery Error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred during search execution.');
      addNotification('Search Execution Failed', err.message || 'Error occurred.', 'alert');
    } finally {
      setIsSearching(false);
    }
  };

  const handleBatchAdd = async () => {
    const unadded = filteredResults.filter(
      (l) => !checkIfInContacts(l.email, l.linkedinUrl)
    );
    if (unadded.length === 0) {
      addNotification('All Leads Already Added', 'All filtered leads are already in your Contacts database.', 'info');
      return;
    }
    await batchAddLeadsToContacts(unadded);
    addNotification('Contacts Enrolled', `${unadded.length} verified leads saved to CRM Contacts database.`, 'success');
  };

  const handleExportCSV = () => {
    if (filteredResults.length === 0) return;
    const headers = ['First Name', 'Last Name', 'Title', 'Company', 'Location', 'Email', 'Phone', 'LinkedIn', 'Score'];
    const rows = filteredResults.map((l) => [
      `"${l.firstName}"`,
      `"${l.lastName}"`,
      `"${l.title}"`,
      `"${l.company}"`,
      `"${l.location}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.linkedinUrl || ''}"`,
      l.confidenceScore || 90,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `the_outreachers_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter application on current results
  const filteredResults = useMemo(() => {
    return searchResults.filter((lead) => {
      if (filterSearch.trim()) {
        const q = filterSearch.toLowerCase();
        const match =
          lead.firstName.toLowerCase().includes(q) ||
          lead.lastName.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q) ||
          lead.title.toLowerCase().includes(q) ||
          lead.location.toLowerCase().includes(q) ||
          (lead.email && lead.email.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filterScoreMin > 0 && (lead.confidenceScore || 0) < filterScoreMin) return false;
      if (filterEmailOnly && (!lead.email || !lead.email.includes('@'))) return false;
      if (filterPhoneOnly && !lead.phone) return false;
      if (filterLinkedInOnly && !lead.linkedinUrl) return false;

      const inContacts = checkIfInContacts(lead.email, lead.linkedinUrl);
      if (filterContactState === 'in_contacts' && !inContacts) return false;
      if (filterContactState === 'not_added' && inContacts) return false;

      return true;
    });
  }, [
    searchResults,
    filterSearch,
    filterScoreMin,
    filterEmailOnly,
    filterPhoneOnly,
    filterLinkedInOnly,
    filterContactState,
    contacts,
  ]);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Serper Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            id="lead-gen-back-btn"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-300 rounded-xl transition-all shadow-2xs cursor-pointer group"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>AI Lead Generation</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                Multi-Strategy Discovery
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Geographically validated discovery engine with multi-strategy search & strict validation
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Serper API Key Quick Input */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs shadow-2xs">
            <Key className="w-3.5 h-3.5 text-indigo-600" />
            <input
              type="password"
              placeholder="Serper API Key..."
              value={serperKey}
              onChange={(e) => setSerperKey(e.target.value)}
              className="bg-transparent text-xs text-slate-900 focus:outline-none w-28 md:w-36 font-mono"
            />
          </div>

          {/* Search Strategy Execution Logs */}
          <button
            onClick={() => setShowLogsDrawer(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-2xs"
          >
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>Search Logs ({executionLogs.length})</span>
          </button>

          {/* Traceable Rejections Button */}
          {rejectedCandidates.length > 0 && (
            <button
              onClick={() => setShowRejectionsDrawer(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all shadow-2xs"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{rejectedCandidates.length} Filtered Mismatches</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Search Configuration & Criteria Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-5 shadow-xs">
            {/* Search Mode Tab Switcher */}
            <div className="p-1 rounded-xl flex border bg-slate-100 border-slate-200">
              <button
                type="button"
                onClick={() => setSearchMode('guided')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  searchMode === 'guided'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Guided Search</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('manual')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  searchMode === 'manual'
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Manual AI Search</span>
              </button>
            </div>

            {/* GUIDED SEARCH CONTROLS */}
            {searchMode === 'guided' && (
              <div className="space-y-4 text-xs">
                {/* Location Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold flex items-center gap-1.5 text-indigo-700 uppercase text-[11px] tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Target Geographic Location</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">Strict Filtering Active</span>
                  </div>
                  <MapLocationSelector
                    selectedLocation={selectedLocation}
                    onSelectLocation={(loc) => setSelectedLocation(loc)}
                  />
                </div>

                {/* Industry Vertical Picker */}
                <div>
                  <label className="block font-bold mb-1.5 text-slate-800 uppercase text-[11px] tracking-wider">
                    Target Industry & Vertical
                  </label>
                  <select
                    value={selectedIndustries[0]}
                    onChange={(e) => setSelectedIndustries([e.target.value])}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none bg-white border-slate-300 text-slate-900 focus:border-indigo-500"
                  >
                    {INDUSTRY_LIST.map((ind) => (
                      <option key={ind} value={ind} className="bg-white text-slate-900">
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Decision Maker Roles */}
                <div>
                  <label className="block font-bold mb-1.5 text-slate-800 uppercase text-[11px] tracking-wider">
                    Target Decision-Maker Roles
                  </label>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto p-2 rounded-xl border border-slate-200 bg-slate-50">
                    {JOB_TITLE_LIST.map((role) => {
                      const isChecked = selectedRoles.includes(role);
                      return (
                        <label
                          key={role}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer text-[11px]"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedRoles([...selectedRoles, role]);
                              } else {
                                setSelectedRoles(selectedRoles.filter((r) => r !== role));
                              }
                            }}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
                          />
                          <span className={isChecked ? 'text-indigo-700 font-semibold' : 'text-slate-600'}>
                            {role}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Company Size Constraint */}
                <div>
                  <label className="block font-bold mb-1.5 text-slate-800 uppercase text-[11px] tracking-wider">
                    Company Headcount Range
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none bg-white border-slate-300 text-slate-900 focus:border-indigo-500"
                  >
                    {COMPANY_SIZE_LIST.map((size) => (
                      <option key={size} value={size} className="bg-white text-slate-900">
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* MANUAL AI NATURAL LANGUAGE SEARCH */}
            {searchMode === 'manual' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1.5 text-indigo-700 uppercase text-[11px] tracking-wider">
                    Describe Target Audience (Natural Language)
                  </label>
                  <textarea
                    rows={6}
                    value={manualPrompt}
                    onChange={(e) => setManualPrompt(e.target.value)}
                    placeholder="Describe the leads you're looking for (e.g., Healthcare clinic owners and medical directors in Minnesota with 10 to 20 staff)..."
                    className="w-full p-3.5 rounded-xl border text-xs leading-relaxed transition-all focus:outline-none bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 shadow-2xs"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Our AI automatically extracts location anchors, target titles, industries, and size constraints from your prompt.
                  </p>
                </div>
              </div>
            )}

            {/* Search Depth & Execution Budget Controls */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 text-[10px] font-bold uppercase mb-1">
                  Target Leads Count
                </label>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={targetLeadCount}
                  onChange={(e) => setTargetLeadCount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border font-bold text-center bg-white border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-600 text-[10px] font-bold uppercase mb-1">
                  Search Budget (Queries)
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border font-bold text-center bg-white border-slate-300 text-slate-900"
                />
              </div>
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Launch Discovery Button */}
            <button
              onClick={handleDiscover}
              disabled={isSearching}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Discovering & Validating Geographic Leads...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-white" />
                  <span>Run Location-Aware Lead Discovery</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Search Results, Real-Time Diagnostics & Table/Card View (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Live Progress & Validation Diagnostics Bar */}
          {isSearching && (
            <div className="p-4 rounded-2xl border animate-pulse space-y-3 bg-indigo-50 border-indigo-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>
                    Searching {searchMode === 'guided' ? selectedLocation?.displayName || 'Target Region' : 'Target Region'}...
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Real Serper API Query Pipeline</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <div className="text-[10px] text-slate-500">Location Filter</div>
                  <div className="font-bold text-indigo-700">Enforcing State</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <div className="text-[10px] text-slate-500">Headcount</div>
                  <div className="font-bold text-purple-700">10–20 Range</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <div className="text-[10px] text-slate-500">Industry</div>
                  <div className="font-bold text-emerald-700">Healthcare</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <div className="text-[10px] text-slate-500">Decision Makers</div>
                  <div className="font-bold text-slate-900">MD / Founders</div>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary & Toolbar */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-slate-900">
                {filteredResults.length} Verified Leads
              </span>
              {diagnostics.totalRejected ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                  {diagnostics.totalRejected} foreign/mismatched rejected
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              {/* Batch Add to Contacts */}
              <button
                onClick={handleBatchAdd}
                disabled={filteredResults.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-2xs disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Filtered to Contacts</span>
              </button>

              {/* Export CSV */}
              <button
                onClick={handleExportCSV}
                disabled={filteredResults.length === 0}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors border border-slate-300 shadow-2xs"
                title="Export CSV"
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              {/* View Toggle */}
              <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewMode === 'cards' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    viewMode === 'table' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards View */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredResults.map((lead) => {
                const isSaved = checkIfInContacts(lead.email, lead.linkedinUrl);
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadForDrawer(lead)}
                    className="p-4 rounded-2xl border border-slate-200 bg-white transition-all cursor-pointer group hover:border-indigo-400 shadow-xs hover:shadow-sm space-y-3 relative"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 truncate">
                        <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {lead.firstName} {lead.lastName}
                        </h3>
                        <p className="text-[11px] text-indigo-700 font-semibold truncate">
                          {lead.title}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {lead.confidenceScore || 90}% Match
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-700">
                      <div className="flex items-center gap-1.5 truncate">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold truncate">{lead.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{lead.location}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        {lead.email && (
                          <span className="text-[10px] text-slate-500 font-mono truncate max-w-[130px]">
                            {lead.email}
                          </span>
                        )}
                      </div>

                      {isSaved ? (
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>In Contacts</span>
                        </span>
                      ) : (
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            await addLeadToContacts(lead);
                            addNotification('Contact Added', `${lead.firstName} added to MongoDB.`, 'success');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold transition-all shadow-xs"
                        >
                          + Add Contact
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredResults.length === 0 && (
                <div className="col-span-2 py-16 text-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-500 space-y-2">
                  <MapPin className="w-8 h-8 text-indigo-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-800">
                    {searchResults.length === 0
                      ? 'Ready for Lead Discovery'
                      : 'No leads match the current filters.'}
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                    {searchResults.length === 0
                      ? 'Configure your target location and industry on the left, then click "Run Location-Aware Lead Discovery" to search live Google & LinkedIn profiles via Serper.'
                      : 'Try adjusting your search terms or filter criteria above.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Title</th>
                      <th className="p-3.5">Company</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Match %</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredResults.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLeadForDrawer(lead)}
                        className="hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <td className="p-3.5 font-bold text-slate-900">
                          {lead.firstName} {lead.lastName}
                        </td>
                        <td className="p-3.5 text-indigo-700 font-medium">{lead.title}</td>
                        <td className="p-3.5 text-slate-800 font-medium">{lead.company}</td>
                        <td className="p-3.5 text-slate-500">{lead.location}</td>
                        <td className="p-3.5 text-indigo-600 font-mono text-[11px] font-medium">
                          {lead.email}
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-emerald-700">
                            {lead.confidenceScore || 90}%
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLeadForDrawer(lead);
                            }}
                            className="text-indigo-600 hover:text-indigo-700 font-semibold"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredResults.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          <p className="text-xs font-bold text-slate-800">
                            {searchResults.length === 0 ? 'Ready for Lead Discovery' : 'No leads match the current filters'}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {searchResults.length === 0
                              ? 'Click "Run Location-Aware Lead Discovery" to search live Google & LinkedIn results with Serper API.'
                              : 'Adjust your filter keywords or match score threshold.'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filtered Rejections Traceability Drawer / Modal */}
      {showRejectionsDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>Geographic & Headcount Rejection Audit ({rejectedCandidates.length})</span>
              </div>
              <button
                onClick={() => setShowRejectionsDrawer(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              The engine strictly filtered out these search candidates because they did not match your target geographic area ({selectedLocation?.displayName || 'Target Location'}) or requested headcount.
            </p>
            <div className="flex-1 overflow-y-auto space-y-2 text-xs">
              {rejectedCandidates.map((rej, idx) => (
                <div
                  key={`${rej.id}-${idx}`}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{rej.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                      {rej.rejectionReason}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    {rej.title} at <span className="text-slate-800 font-semibold">{rej.company}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Detected Location: <span className="text-slate-700 font-medium">{rej.detectedLocation}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowRejectionsDrawer(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Strategy Execution Logs Drawer */}
      {showLogsDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Activity className="w-5 h-5" />
                <span>Search Strategy Queries & Execution Metrics</span>
              </div>
              <button
                onClick={() => setShowLogsDrawer(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 text-xs">
              {executionLogs.map((log, idx) => (
                <div
                  key={`${log.strategyId}-${idx}`}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-700">{log.strategyName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Page {log.page} ({log.durationMs}ms)
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-700 bg-white border border-slate-200 p-2 rounded-lg break-all">
                    {log.query}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-600 pt-1">
                    <span>Raw SERP: {log.rawResultsCount}</span>
                    <span className="text-emerald-700 font-semibold">Valid Added: {log.validAddedCount}</span>
                    <span className="text-rose-700">Rejected: {log.rejectedCount}</span>
                    <span className="text-amber-700">Duplicates: {log.duplicatesCount}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowLogsDrawer(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Detail Drawer */}
      {selectedLeadForDrawer && (
        <LeadDetailDrawer
          lead={selectedLeadForDrawer}
          onClose={() => setSelectedLeadForDrawer(null)}
          onAddToContacts={async (lead) => {
            await addLeadToContacts(lead);
            addNotification('Contact Added', `${lead.firstName} added to MongoDB.`, 'success');
          }}
          isInContacts={checkIfInContacts(
            selectedLeadForDrawer.email,
            selectedLeadForDrawer.linkedinUrl
          )}
        />
      )}
    </div>
  );
}
