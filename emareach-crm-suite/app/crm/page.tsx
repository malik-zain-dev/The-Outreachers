'use client';

import React, { useState } from 'react';
import { useCRM, PipelineStage, Deal } from '@/lib/crm-store';
import {
  Kanban,
  Table as TableIcon,
  Plus,
  DollarSign,
  TrendingUp,
  Award,
  XCircle,
  Sliders,
  Filter,
  Search,
  Building,
  User,
  ChevronRight,
  Download,
  Clock,
  Layers,
} from 'lucide-react';
import { DealDrawer } from '@/components/crm/DealDrawer';
import { NewDealDialog } from '@/components/crm/NewDealDialog';
import { PipelineConfigModal } from '@/components/crm/PipelineConfigModal';

const DEFAULT_STAGES: PipelineStage[] = [
  { id: 'lead', name: 'New Prospect', order: 1, probability: 10, color: 'blue' },
  { id: 'contacted', name: 'In Sequence', order: 2, probability: 20, color: 'indigo' },
  { id: 'replied', name: 'Replied', order: 3, probability: 35, color: 'cyan' },
  { id: 'qualified', name: 'Qualified', order: 4, probability: 50, color: 'purple' },
  { id: 'meeting', name: 'Meeting Booked', order: 5, probability: 65, color: 'amber' },
  { id: 'proposal', name: 'Proposal Sent', order: 6, probability: 80, color: 'rose' },
  { id: 'won', name: 'Closed Won', order: 7, probability: 100, color: 'emerald', is_won_stage: true },
  { id: 'lost', name: 'Closed Lost', order: 8, probability: 0, color: 'slate', is_lost_stage: true },
];

export default function CRMPage() {
  const {
    deals,
    pipelines,
    currentPipeline,
    setCurrentPipeline,
    updateDealStage,
    selectedDeal,
    setSelectedDeal,
    getPipelineForecast,
    searchQuery,
    setSearchQuery,
  } = useCRM();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isNewDealOpen, setIsNewDealOpen] = useState<boolean>(false);
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);

  const forecast = getPipelineForecast ? getPipelineForecast() : { openPipelineValue: 0, weightedPipelineValue: 0, wonRevenue: 0, lostRevenue: 0 };

  // Active pipeline stages
  const stages = (currentPipeline?.stages && currentPipeline.stages.length > 0)
    ? currentPipeline.stages
    : DEFAULT_STAGES;

  // Filter deals
  const filteredDeals = deals.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      d.title.toLowerCase().includes(q) ||
      (d.company && d.company.toLowerCase().includes(q)) ||
      (d.contactName && d.contactName.toLowerCase().includes(q)) ||
      (d.contactEmail && d.contactEmail.toLowerCase().includes(q));

    const matchesPriority = filterPriority === 'all' || d.priority === filterPriority;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'open' && d.status === 'open') ||
      (filterStatus === 'won' && d.status === 'won') ||
      (filterStatus === 'lost' && d.status === 'lost');

    // Pipeline match: if deal has pipeline_id and active pipeline is selected
    const matchesPipeline =
      !currentPipeline || !d.pipeline_id || d.pipeline_id === currentPipeline.id;

    return matchesSearch && matchesPriority && matchesStatus && matchesPipeline;
  });

  const totalFilteredValue = filteredDeals.reduce((acc, d) => acc + (d.value || 0), 0);

  // Helper to match deal to a stage column
  const getDealsForStage = (stage: PipelineStage) => {
    return filteredDeals.filter((d) => {
      if (stage.is_won_stage && d.status === 'won') return true;
      if (stage.is_lost_stage && d.status === 'lost') return true;
      return (
        d.stage_id === stage.id ||
        d.stage === stage.id ||
        d.stage.toLowerCase() === stage.name.toLowerCase()
      );
    });
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('text/plain', dealId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedDealId(dealId);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStageId !== stageId) {
      setDragOverStageId(stageId);
    }
  };

  const handleDragLeave = () => {
    setDragOverStageId(null);
  };

  const handleDrop = async (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    setDragOverStageId(null);
    const dealId = e.dataTransfer.getData('text/plain') || draggedDealId;
    if (!dealId) return;

    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;

    const prevStage = deal.stage;
    const isWon = Boolean(targetStage.is_won_stage);
    const isLost = Boolean(targetStage.is_lost_stage);
    const newStatus = isWon ? 'won' : isLost ? 'lost' : 'open';

    await updateDealStage(dealId, targetStage.id, prevStage, targetStage.name);
    setDraggedDealId(null);
  };

  // Stage color mapper
  const getStageStyles = (colorName?: string) => {
    switch (colorName) {
      case 'emerald':
        return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' };
      case 'purple':
        return { text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' };
      case 'cyan':
        return { text: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200' };
      case 'amber':
        return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' };
      case 'rose':
        return { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' };
      case 'blue':
        return { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' };
      default:
        return { text: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' };
    }
  };

  const handleExportCSV = () => {
    const headers = ['Title', 'Company', 'Contact Name', 'Email', 'Value', 'Stage', 'Probability', 'Priority', 'Status'];
    const rows = filteredDeals.map((d) => [
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.company.replace(/"/g, '""')}"`,
      `"${d.contactName.replace(/"/g, '""')}"`,
      `"${d.contactEmail || ''}"`,
      d.value,
      `"${d.stage}"`,
      `${d.probability}%`,
      `"${d.priority}"`,
      `"${d.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `the_outreachers_crm_deals_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const wonDealsCount = deals.filter((d) => d.status === 'won').length;
  const closedDealsCount = deals.filter((d) => d.status === 'won' || d.status === 'lost').length;
  const winRate = closedDealsCount > 0 ? Math.round((wonDealsCount / closedDealsCount) * 100) : 0;

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header & Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>CRM Deals & Sales Pipeline</span>
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {filteredDeals.length} Opportunities (${totalFilteredValue.toLocaleString()})
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live MongoDB pipeline stages, automated email sync, weighted revenue forecasting, and activity tracking
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Pipeline Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <select
                value={currentPipeline?.id || (pipelines[0]?.id ?? '')}
                onChange={(e) => {
                  const p = pipelines.find((item) => item.id === e.target.value);
                  if (p) setCurrentPipeline(p);
                }}
                className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer"
              >
                {pipelines.map((p) => (
                  <option key={p.id} value={p.id} className="bg-white text-slate-900">
                    {p.name} {p.is_default ? '★' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Configure Pipeline Button */}
            <button
              onClick={() => setIsConfigOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 transition-all shadow-xs"
              title="Configure stages, probability, and ordering"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              <span>Configure Stages</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-300">
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Kanban</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
              title="Export CSV"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Create Deal */}
            <button
              onClick={() => setIsNewDealOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Deal</span>
            </button>
          </div>
        </div>

        {/* Financial Forecasting & Health Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Open Pipeline</span>
              <DollarSign className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl font-black text-slate-900">
              ${(forecast?.openPipelineValue || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-indigo-700 font-semibold">{deals.filter((d) => d.status === 'open').length}</span> active deals in flight
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Weighted Forecast</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl font-black text-indigo-700">
              ${(forecast?.weightedPipelineValue || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Prob-adjusted expected revenue
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Closed Won</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-emerald-700">
              ${(forecast?.wonRevenue || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-700 font-semibold">{wonDealsCount} won</span> ({winRate}% win rate)
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Closed Lost</span>
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-xl font-black text-rose-700">
              ${(forecast?.lostRevenue || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {deals.filter((d) => d.status === 'lost').length} deals lost
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search deals, company, or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Deals</option>
                <option value="open">Open Only</option>
                <option value="won">Closed Won</option>
                <option value="lost">Closed Lost</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium">Priority:</span>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="text-slate-500 text-[11px] font-medium">
            Drag cards between columns to transition stages and log deal history
          </div>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-3.5 overflow-x-auto pb-4 items-start select-none">
          {stages.map((stage) => {
            const stageDeals = getDealsForStage(stage);
            const stageTotalValue = stageDeals.reduce((acc, d) => acc + (d.value || 0), 0);
            const stageStyles = getStageStyles(stage.color);
            const isDragOver = dragOverStageId === stage.id;

            return (
              <div
                key={stage.id}
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage)}
                className={`w-72 flex-shrink-0 rounded-xl p-3 border transition-all flex flex-col space-y-2.5 ${
                  isDragOver
                    ? 'bg-indigo-50/60 border-indigo-500 shadow-md'
                    : 'bg-slate-100/70 border-slate-200'
                }`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${stageStyles.text}`}>
                      {stage.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {stageDeals.length}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-black text-slate-900">
                      ${stageTotalValue.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium">
                      {stage.probability}% prob
                    </span>
                  </div>
                </div>

                {/* Deal Cards Container */}
                <div className="space-y-2.5 min-h-[160px]">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal.id)}
                      onClick={() => setSelectedDeal(deal)}
                      className={`bg-white rounded-lg p-3 border transition-all cursor-grab active:cursor-grabbing group hover:border-indigo-400 hover:shadow-md space-y-2 relative ${
                        deal.status === 'won'
                          ? 'border-emerald-300 bg-emerald-50/30'
                          : deal.status === 'lost'
                          ? 'border-rose-300 bg-rose-50/30 opacity-75'
                          : 'border-slate-200'
                      }`}
                    >
                      {/* Priority and Status Badges */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border ${
                              deal.priority === 'urgent'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : deal.priority === 'high'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {deal.priority}
                          </span>
                          {deal.status === 'won' && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              WON
                            </span>
                          )}
                          {deal.status === 'lost' && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                              LOST
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-black text-slate-900">
                          ${(deal.value || 0).toLocaleString()}
                        </span>
                      </div>

                      {/* Title and Company */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {deal.title}
                        </h4>
                        {deal.company && (
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                            <Building className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{deal.company}</span>
                          </div>
                        )}
                      </div>

                      {/* Contact and Probability Bar */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <div className="flex items-center gap-1 max-w-[120px] truncate">
                          <User className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{deal.contactName || 'No Contact'}</span>
                        </div>
                        <span className="font-bold text-emerald-700">
                          {deal.probability}% Prob
                        </span>
                      </div>
                    </div>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="h-28 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center text-[11px] text-slate-400">
                      <span>No opportunities</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">Drop deals here</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Opportunity</th>
                  <th className="p-3.5">Company</th>
                  <th className="p-3.5">Primary Contact</th>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">Value</th>
                  <th className="p-3.5">Probability</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Expected Close</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDeals.map((deal) => (
                  <tr
                    key={deal.id}
                    onClick={() => setSelectedDeal(deal)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 font-bold text-slate-900">
                      <div>{deal.title}</div>
                      {deal.source && (
                        <span className="text-[10px] text-slate-500 font-normal">
                          Source: {deal.source}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">{deal.company || '—'}</td>
                    <td className="p-3.5 text-slate-700">
                      <div>{deal.contactName || '—'}</div>
                      {deal.contactEmail && (
                        <div className="text-[10px] text-slate-500 font-mono">{deal.contactEmail}</div>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase text-[10px] font-bold">
                        {deal.stage}
                      </span>
                    </td>
                    <td className="p-3.5 font-black text-slate-900">
                      ${(deal.value || 0).toLocaleString()}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">
                      {deal.probability || 0}%
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-md uppercase text-[10px] font-bold border ${
                          deal.priority === 'urgent'
                            ? 'text-rose-700 bg-rose-50 border-rose-200'
                            : deal.priority === 'high'
                            ? 'text-amber-700 bg-amber-50 border-amber-200'
                            : 'text-slate-700 bg-slate-100 border-slate-200'
                        }`}
                      >
                        {deal.priority}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                          deal.status === 'won'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : deal.status === 'lost'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {deal.status || 'open'}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono">{deal.expectedCloseDate || '—'}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDeal(deal);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Deal Drawer for deep CRM operations */}
      {selectedDeal && (
        <DealDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}

      {/* New Deal Creation Modal */}
      <NewDealDialog isOpen={isNewDealOpen} onClose={() => setIsNewDealOpen(false)} />

      {/* Pipeline & Stage Configuration Modal */}
      <PipelineConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
    </div>
  );
}
