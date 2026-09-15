'use client';

import React, { useState } from 'react';
import { useCRM, PipelineStage, Pipeline } from '@/lib/crm-store';
import {
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  AlertCircle,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface PipelineConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_OPTIONS = [
  { id: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
  { id: 'cyan', label: 'Cyan', class: 'bg-cyan-500' },
  { id: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { id: 'emerald', label: 'Emerald', class: 'bg-emerald-500' },
  { id: 'amber', label: 'Amber', class: 'bg-amber-500' },
  { id: 'rose', label: 'Rose', class: 'bg-rose-500' },
  { id: 'blue', label: 'Blue', class: 'bg-blue-500' },
];

export function PipelineConfigModal({ isOpen, onClose }: PipelineConfigModalProps) {
  const { pipelines, activePipeline, createPipeline, updatePipeline } = useCRM();

  const [currentPipeline, setCurrentPipeline] = useState<Pipeline | null>(activePipeline || pipelines[0] || null);
  const [pipelineName, setPipelineName] = useState<string>(activePipeline?.name || 'Standard Sales Pipeline');
  const [stages, setStages] = useState<PipelineStage[]>(activePipeline?.stages || []);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [newPipelineName, setNewPipelineName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleAddStage = () => {
    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      name: 'New Custom Stage',
      order: stages.length + 1,
      probability: 50,
      color: 'indigo',
    };
    setStages([...stages, newStage]);
  };

  const handleUpdateStage = (id: string, field: keyof PipelineStage, value: any) => {
    setStages(
      stages.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleDeleteStage = (id: string) => {
    if (stages.length <= 2) {
      setErrorMsg('A pipeline must maintain at least 2 active stages.');
      return;
    }
    setStages(stages.filter((s) => s.id !== id));
    setErrorMsg('');
  };

  const handleMoveStage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stages.length) return;

    const updated = [...stages];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Recalculate order indices
    const reordered = updated.map((s, i) => ({ ...s, order: i + 1 }));
    setStages(reordered);
  };

  const handleSavePipeline = async () => {
    if (!pipelineName.trim()) {
      setErrorMsg('Pipeline name cannot be blank.');
      return;
    }
    if (!currentPipeline) {
      setErrorMsg('No active pipeline selected.');
      return;
    }
    setIsSaving(true);
    setErrorMsg('');
    try {
      await updatePipeline(currentPipeline.id, {
        name: pipelineName.trim(),
        stages: stages.map((s, idx) => ({ ...s, order: idx + 1 })),
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update pipeline settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateNewPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPipelineName.trim()) return;
    try {
      const created = await createPipeline({
        name: newPipelineName.trim(),
        stages: [
          { id: `stage-${Date.now()}-1`, name: 'Discovery / Outreached', order: 1, probability: 10, color: 'blue' },
          { id: `stage-${Date.now()}-2`, name: 'Demo / Pitch', order: 2, probability: 50, color: 'indigo' },
          { id: `stage-${Date.now()}-3`, name: 'Contract / Proposal', order: 3, probability: 80, color: 'purple' },
          { id: `stage-${Date.now()}-4`, name: 'Closed Won', order: 4, probability: 100, color: 'emerald', is_won_stage: true },
        ],
      });
      if (created) {
        setCurrentPipeline(created);
        setPipelineName(created.name);
        setStages(created.stages);
        setIsCreatingNew(false);
        setNewPipelineName('');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating pipeline');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Sales Pipeline Configuration</h2>
              <p className="text-xs text-slate-500">
                Configure opportunity stages, conversion probability %, and Kanban column ordering
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pipeline Selector / Creator Bar */}
        <div className="px-6 py-3 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-semibold">Active Pipeline:</span>
            <select
              value={currentPipeline?.id || activePipeline?.id || ''}
              onChange={(e) => {
                const target = pipelines.find((p) => p.id === e.target.value);
                if (target) setCurrentPipeline(target);
              }}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:border-indigo-500"
            >
              {pipelines.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.is_default ? '(Default)' : ''}
                </option>
              ))}
            </select>
          </div>

          {!isCreatingNew ? (
            <button
              onClick={() => setIsCreatingNew(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Create New Pipeline</span>
            </button>
          ) : (
            <form onSubmit={handleCreateNewPipeline} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="New Pipeline Name..."
                value={newPipelineName}
                onChange={(e) => setNewPipelineName(e.target.value)}
                className="px-3 py-1 bg-white border border-indigo-500 rounded-lg text-slate-900 text-xs"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-2 py-1 text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-800 bg-white">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Pipeline Name</label>
            <input
              type="text"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Pipeline Stages ({stages.length})
              </h3>
              <button
                onClick={handleAddStage}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Stage</span>
              </button>
            </div>

            {/* Stages List */}
            <div className="space-y-2">
              {stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col gap-0.5">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveStage(idx, 'up')}
                      className="p-1 hover:bg-slate-200 disabled:opacity-20 text-slate-500 hover:text-slate-900 rounded"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      disabled={idx === stages.length - 1}
                      onClick={() => handleMoveStage(idx, 'down')}
                      className="p-1 hover:bg-slate-200 disabled:opacity-20 text-slate-500 hover:text-slate-900 rounded"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="w-5 font-mono text-slate-400 font-bold">#{idx + 1}</span>

                  {/* Stage Name Input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={stage.name}
                      onChange={(e) => handleUpdateStage(stage.id, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-indigo-500 text-xs"
                    />
                  </div>

                  {/* Probability % */}
                  <div className="flex items-center gap-1 w-28">
                    <span className="text-slate-500">Prob:</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={stage.probability}
                      onChange={(e) => handleUpdateStage(stage.id, 'probability', Number(e.target.value))}
                      className="w-14 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center text-indigo-700 font-mono text-xs font-bold"
                    />
                    <span className="text-slate-500">%</span>
                  </div>

                  {/* Color Selector */}
                  <select
                    value={stage.color || 'indigo'}
                    onChange={(e) => handleUpdateStage(stage.id, 'color', e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:outline-none font-medium"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>

                  {/* Delete Stage */}
                  <button
                    onClick={() => handleDeleteStage(stage.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete stage"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={isSaving}
            onClick={handleSavePipeline}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
          >
            {isSaving ? 'Saving to Database...' : 'Save Pipeline Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
}
