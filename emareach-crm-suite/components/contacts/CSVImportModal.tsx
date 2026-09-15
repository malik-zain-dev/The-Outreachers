'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  Check,
  AlertCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { backendApi, ContactList, CSVUploadResponse, CSVImportResult } from '@/lib/api';

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
  lists: ContactList[];
}

const TARGET_FIELDS = [
  { key: 'first_name', label: 'First Name', aliases: ['first name', 'firstname', 'first', 'fname', 'given name'] },
  { key: 'last_name', label: 'Last Name', aliases: ['last name', 'lastname', 'last', 'lname', 'surname'] },
  { key: 'email', label: 'Work / Personal Email', aliases: ['email', 'email address', 'mail', 'work email', 'contact email'] },
  { key: 'phone', label: 'Direct Phone', aliases: ['phone', 'mobile', 'telephone', 'tel', 'phone number', 'direct phone'] },
  { key: 'company', label: 'Company Name', aliases: ['company', 'company name', 'organization', 'org', 'business', 'employer'] },
  { key: 'title', label: 'Job Title / Role', aliases: ['title', 'job title', 'role', 'position', 'designation', 'headline'] },
  { key: 'industry', label: 'Industry Vertical', aliases: ['industry', 'vertical', 'sector', 'domain'] },
  { key: 'location', label: 'Location / City / Country', aliases: ['location', 'city', 'country', 'state', 'region', 'address'] },
  { key: 'linkedin_url', label: 'LinkedIn Profile URL', aliases: ['linkedin', 'linkedin url', 'profile', 'linkedin profile'] },
  { key: 'website_url', label: 'Company Website', aliases: ['website', 'company website', 'url', 'domain', 'web'] },
];

export function CSVImportModal({
  isOpen,
  onClose,
  onImportComplete,
  lists,
}: CSVImportModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<CSVUploadResponse | null>(null);

  // Mapping state: { [csvHeader]: targetKey }
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});

  // Destination & Duplicate Strategy
  const [targetListType, setTargetListType] = useState<'existing' | 'new' | 'none'>('none');
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [newListName, setNewListName] = useState<string>('');
  const [duplicateStrategy, setDuplicateStrategy] = useState<'update' | 'skip' | 'keep_both'>('update');

  // Execution
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<CSVImportResult | null>(null);

  if (!isOpen) return null;

  // Auto-detect columns on successful upload
  const autoMapFields = (headers: string[]) => {
    const initialMap: Record<string, string> = {};
    headers.forEach((header) => {
      const cleanH = header.trim().toLowerCase();
      for (const target of TARGET_FIELDS) {
        if (target.aliases.includes(cleanH) || target.key === cleanH || cleanH.includes(target.key)) {
          initialMap[header] = target.key;
          break;
        }
      }
      if (!initialMap[header]) {
        initialMap[header] = 'ignore';
      }
    });
    setFieldMapping(initialMap);
  };

  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setUploadError(null);
    setUploading(true);

    try {
      const res = await backendApi.uploadContactsFile(uploadedFile);
      if (res) {
        setParsedData(res);
        autoMapFields(res.available_fields);
        setStep(2);
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload and parse CSV file.');
    } finally {
      setUploading(false);
    }
  };

  const handleExecuteImport = async () => {
    if (!parsedData) return;
    setImporting(true);

    try {
      const res = await backendApi.importCSVContacts({
        contacts_data: parsedData.contacts_data,
        field_mapping: fieldMapping,
        list_id: targetListType === 'existing' ? selectedListId : undefined,
        list_name: targetListType === 'new' ? newListName : undefined,
        duplicate_strategy: duplicateStrategy,
      });

      if (res) {
        setImportResult(res);
        setStep(4);
        onImportComplete();
      }
    } catch (e: any) {
      setUploadError(e.message || 'Error executing import.');
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFile(null);
    setParsedData(null);
    setFieldMapping({});
    setImportResult(null);
    setUploadError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-3xl rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Import Contacts from CSV / Excel</h3>
              <p className="text-[11px] text-slate-400">Add prospects with custom column mapping and duplicate resolution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-between px-8 py-2.5 bg-[var(--bg-elevated)] border-b border-[var(--border-color)] text-xs">
          <div className={`flex items-center gap-1.5 font-medium ${step >= 1 ? 'text-indigo-400' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</span>
            <span>Upload File</span>
          </div>
          <div className="w-8 h-px bg-[var(--border-color)]" />
          <div className={`flex items-center gap-1.5 font-medium ${step >= 2 ? 'text-indigo-400' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</span>
            <span>Map Columns</span>
          </div>
          <div className="w-8 h-px bg-[var(--border-color)]" />
          <div className={`flex items-center gap-1.5 font-medium ${step >= 3 ? 'text-indigo-400' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</span>
            <span>List & Options</span>
          </div>
          <div className="w-8 h-px bg-[var(--border-color)]" />
          <div className={`flex items-center gap-1.5 font-medium ${step === 4 ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>4</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {uploadError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* STEP 1: Upload File */}
          {step === 1 && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-[var(--border-color)] hover:border-indigo-500 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[var(--bg-elevated)] transition-all cursor-pointer"
                onClick={() => document.getElementById('csv-file-input')?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600/10 text-indigo-400 flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-semibold text-[var(--text-primary)]">
                  Click to upload or drag & drop your spreadsheet
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                  Supported formats: CSV, XLSX, XLS. Max file size: 25MB.
                </p>
                <input
                  id="csv-file-input"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>

              {uploading && (
                <div className="flex items-center justify-center gap-2 py-4 text-xs text-indigo-400">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Parsing spreadsheet headers and analyzing rows...</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Map Columns */}
          {step === 2 && parsedData && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">Map CSV Columns to Contact Attributes</h4>
                  <p className="text-[11px] text-slate-400">Total rows discovered: <span className="text-indigo-400 font-bold">{parsedData.total_rows}</span></p>
                </div>
                <button
                  onClick={() => autoMapFields(parsedData.available_fields)}
                  className="px-2.5 py-1 rounded bg-[var(--bg-elevated)] hover:bg-[var(--border-color)] text-[11px] text-indigo-400 border border-[var(--border-color)] flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Auto-Detect
                </button>
              </div>

              <div className="border border-[var(--border-color)] rounded-lg overflow-hidden max-h-72 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-color)] text-slate-400 text-[11px]">
                    <tr>
                      <th className="py-2 px-3 font-semibold">CSV Column Header</th>
                      <th className="py-2 px-3 font-semibold">Sample Value (Row 1)</th>
                      <th className="py-2 px-3 font-semibold">Target CRM Field</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {parsedData.available_fields.map((header) => {
                      const sampleVal = parsedData.preview[0]?.[header] ?? '—';
                      return (
                        <tr key={header} className="hover:bg-[var(--bg-elevated)] transition-colors">
                          <td className="py-2 px-3 font-medium text-[var(--text-primary)]">{header}</td>
                          <td className="py-2 px-3 text-slate-400 truncate max-w-xs">{String(sampleVal)}</td>
                          <td className="py-2 px-3">
                            <select
                              value={fieldMapping[header] || 'ignore'}
                              onChange={(e) => setFieldMapping({ ...fieldMapping, [header]: e.target.value })}
                              className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded px-2 py-1 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                            >
                              <option value="ignore">— Skip / Do Not Import —</option>
                              <optgroup label="Standard Contact Fields">
                                {TARGET_FIELDS.map((tf) => (
                                  <option key={tf.key} value={tf.key}>
                                    {tf.label}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Custom Fields">
                                <option value={`custom_${header}`}>Save as Custom Field ({header})</option>
                              </optgroup>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STEP 3: Destination List & Duplicate Strategy */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-semibold text-[var(--text-primary)]">Contact List Assignment</label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTargetListType('none')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      targetListType === 'none'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <p className="font-semibold text-[11px]">No Specific List</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Add to global CRM contacts pool only</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetListType('existing')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      targetListType === 'existing'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <p className="font-semibold text-[11px]">Add to Existing List</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Append to an existing audience list</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetListType('new')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      targetListType === 'new'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <p className="font-semibold text-[11px]">Create New List</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Create a new named list for this batch</p>
                  </button>
                </div>

                {targetListType === 'existing' && (
                  <div className="pt-2">
                    <label className="text-[11px] text-slate-400 mb-1 block">Select Destination List</label>
                    <select
                      value={selectedListId}
                      onChange={(e) => setSelectedListId(e.target.value)}
                      className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">— Select an existing list —</option>
                      {lists.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name} ({l.contact_count || l.contact_ids?.length || 0} contacts)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {targetListType === 'new' && (
                  <div className="pt-2">
                    <label className="text-[11px] text-slate-400 mb-1 block">New List Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Q4 Healthcare Outreach Leaders"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}
              </div>

              {/* Duplicate Strategy */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                <label className="font-semibold text-[var(--text-primary)]">Duplicate Record Handling</label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDuplicateStrategy('update')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      duplicateStrategy === 'update'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <p className="font-semibold text-[11px]">Non-Destructive Update</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Fill empty fields on matching contacts</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDuplicateStrategy('skip')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      duplicateStrategy === 'skip'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <p className="font-semibold text-[11px]">Skip Existing</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Keep existing record untouched</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDuplicateStrategy('keep_both')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      duplicateStrategy === 'keep_both'
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : 'border-[var(--border-color)] bg-[var(--bg-elevated)] text-slate-400'
                    }`}
                  >
                    <p className="font-semibold text-[11px]">Keep Both</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Create separate new contact</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Summary */}
          {step === 4 && importResult && (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">CSV Import Completed Successfully</h4>
                <p className="text-xs text-slate-400 mt-1">{importResult.message}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)]">
                  <p className="text-[10px] text-slate-400">New Contacts Added</p>
                  <p className="text-base font-bold text-emerald-400">{importResult.imported}</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)]">
                  <p className="text-[10px] text-slate-400">Merged / Updated</p>
                  <p className="text-base font-bold text-indigo-400">{importResult.updated}</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)]">
                  <p className="text-[10px] text-slate-400">Duplicates Skipped</p>
                  <p className="text-base font-bold text-amber-400">{importResult.skipped}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[var(--border-color)] bg-[var(--bg-elevated)]">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-slate-300 hover:bg-[var(--bg-surface)] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step < 4 ? (
              <>
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-slate-400 hover:text-[var(--text-primary)] transition-colors"
                >
                  Cancel
                </button>
                {step === 2 && (
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    Next: Destination & Rules
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {step === 3 && (
                  <button
                    onClick={handleExecuteImport}
                    disabled={importing || (targetListType === 'existing' && !selectedListId) || (targetListType === 'new' && !newListName.trim())}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-medium text-white flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    {importing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Importing Contacts...
                      </>
                    ) : (
                      <>
                        Start Import
                        <Check className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  handleReset();
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
    </div>
  );
}
