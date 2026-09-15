'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Search,
  Plus,
  UploadCloud,
  Sparkles,
  Layers,
  Filter,
  Trash2,
  Mail,
  Phone,
  Linkedin,
  Globe,
  MoreHorizontal,
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Edit2,
  Send,
  KanbanSquare,
  AlertCircle,
  ShieldCheck,
  CheckSquare,
  Square,
  ArrowUpDown,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { backendApi, BackendContact, ContactList } from '@/lib/api';
import { CSVImportModal } from '@/components/contacts/CSVImportModal';
import { ContactFormDialog } from '@/components/contacts/ContactFormDialog';
import { ContactDetailDrawer } from '@/components/contacts/ContactDetailDrawer';
import { ContactEnrichmentModal } from '@/components/contacts/ContactEnrichmentModal';
import { ContactListModal } from '@/components/contacts/ContactListModal';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<BackendContact[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [lists, setLists] = useState<ContactList[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListId, setSelectedListId] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filterHasEmail, setFilterHasEmail] = useState<boolean | undefined>(undefined);
  const [filterHasPhone, setFilterHasPhone] = useState<boolean | undefined>(undefined);
  const [filterHasLinkedin, setFilterHasLinkedin] = useState<boolean | undefined>(undefined);
  const [filterHasWebsite, setFilterHasWebsite] = useState<boolean | undefined>(undefined);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // Selected rows for bulk operations
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  // Modals state
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isEnrichmentModalOpen, setIsEnrichmentModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<BackendContact | null>(null);
  const [listToEdit, setListToEdit] = useState<ContactList | null>(null);

  // Drawer state
  const [selectedDrawerContact, setSelectedDrawerContact] = useState<BackendContact | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Reset all filters
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedListId('');
    setSelectedSource('');
    setSelectedStatus('');
    setFilterHasEmail(undefined);
    setFilterHasPhone(undefined);
    setFilterHasLinkedin(undefined);
    setFilterHasWebsite(undefined);
    setPage(1);
  }, []);

  // Load Lists
  const loadLists = useCallback(async () => {
    try {
      const data = await backendApi.fetchContactLists();
      setLists(data);
    } catch (e) {
      console.error('Failed to load contact lists:', e);
    }
  }, []);

  // Load Contacts
  const loadContacts = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * pageSize;
      const res = await backendApi.fetchContacts({
        skip,
        limit: pageSize,
        search: searchQuery.trim() || undefined,
        list_id: selectedListId || undefined,
        source: selectedSource || undefined,
        status: selectedStatus || undefined,
        has_email: filterHasEmail,
        has_phone: filterHasPhone,
        has_linkedin: filterHasLinkedin,
        has_website: filterHasWebsite,
      });

      setContacts(res.contacts);
      setTotalCount(res.total);
    } catch (e) {
      console.error('Failed to load contacts:', e);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchQuery, selectedListId, selectedSource, selectedStatus, filterHasEmail, filterHasPhone, filterHasLinkedin, filterHasWebsite]);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Helper for tri-state presence toggle (All -> Yes -> No -> All)
  const cyclePresenceFilter = (
    currentVal: boolean | undefined,
    setter: React.Dispatch<React.SetStateAction<boolean | undefined>>
  ) => {
    setPage(1);
    if (currentVal === undefined) {
      setter(true);
    } else if (currentVal === true) {
      setter(false);
    } else {
      setter(undefined);
    }
  };

  // Bulk Selection Handlers
  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedListId ||
    selectedSource ||
    selectedStatus ||
    filterHasEmail !== undefined ||
    filterHasPhone !== undefined ||
    filterHasLinkedin !== undefined ||
    filterHasWebsite !== undefined
  );

  const handleSelectAll = () => {
    if (selectedContactIds.length === contacts.length) {
      setSelectedContactIds([]);
    } else {
      setSelectedContactIds(contacts.map((c) => c.id));
    }
  };

  const toggleSelectContact = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedContactIds.length} contact(s)?`)) return;
    try {
      const ok = await backendApi.bulkActionContacts({
        action: 'delete',
        contact_ids: selectedContactIds,
      });
      if (ok) {
        setSelectedContactIds([]);
        loadContacts();
      }
    } catch (e) {
      console.error('Bulk delete failed:', e);
    }
  };

  const handleBulkAddToList = async (listId: string) => {
    if (!listId || selectedContactIds.length === 0) return;
    try {
      const ok = await backendApi.bulkActionContacts({
        action: 'add_to_list',
        contact_ids: selectedContactIds,
        list_id: listId,
      });
      if (ok) {
        setSelectedContactIds([]);
        loadContacts();
        loadLists();
      }
    } catch (e) {
      console.error('Bulk add to list failed:', e);
    }
  };

  const handleBulkStatusChange = async (status: string) => {
    if (!status || selectedContactIds.length === 0) return;
    try {
      const ok = await backendApi.bulkActionContacts({
        action: 'change_status',
        contact_ids: selectedContactIds,
        status,
      });
      if (ok) {
        setSelectedContactIds([]);
        loadContacts();
      }
    } catch (e) {
      console.error('Bulk status change failed:', e);
    }
  };

  // Single Contact Action Handlers
  const handleOpenEdit = (contact: BackendContact) => {
    setContactToEdit(contact);
    setIsContactFormOpen(true);
  };

  const handleOpenCreate = () => {
    setContactToEdit(null);
    setIsContactFormOpen(true);
  };

  const handleOpenDrawer = (contact: BackendContact) => {
    setSelectedDrawerContact(contact);
    setIsDrawerOpen(true);
  };

  const handleDeleteSingle = async (contactId: string) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      const ok = await backendApi.deleteContact(contactId);
      if (ok) {
        if (selectedDrawerContact?.id === contactId) {
          setIsDrawerOpen(false);
        }
        loadContacts();
      }
    } catch (e) {
      console.error('Delete failed:', e);
    }
  };

  const handleEnrichSingle = (contact: BackendContact) => {
    setSelectedContactIds([contact.id]);
    setIsEnrichmentModalOpen(true);
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Quick metrics calculations
  const activeContactsCount = contacts.filter((c) => c.status === 'active').length;
  const enrichedContactsCount = contacts.filter((c) => Boolean(c.last_enriched_at) || Boolean(c.linkedin_url && c.email)).length;

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-10">
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[var(--text-primary)]">Contacts Management</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {totalCount} Total Contacts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Central CRM customer data layer connecting AI Lead Generation, CSV imports, Campaigns & Deals
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsCSVModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5 shadow-sm transition-all"
          >
            <UploadCloud className="w-3.5 h-3.5 text-indigo-400" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => {
              setListToEdit(null);
              setIsListModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-color)] border border-[var(--border-color)] text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>New List</span>
          </button>

          <button
            onClick={() => setIsEnrichmentModalOpen(true)}
            disabled={selectedContactIds.length === 0}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600/30 to-indigo-600/30 hover:from-cyan-600/50 hover:to-indigo-600/50 disabled:opacity-40 border border-cyan-500/30 text-xs font-medium text-cyan-300 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enrich ({selectedContactIds.length})</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, company, job title, phone, or location..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* List selector */}
            <select
              value={selectedListId}
              onChange={(e) => {
                setSelectedListId(e.target.value);
                setPage(1);
              }}
              className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Lists ({lists.length})</option>
              {lists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.contact_count || l.contact_ids?.length || 0})
                </option>
              ))}
            </select>

            {/* Source filter */}
            <select
              value={selectedSource}
              onChange={(e) => {
                setSelectedSource(e.target.value);
                setPage(1);
              }}
              className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Sources</option>
              <option value="ai_lead_gen">AI Lead Gen</option>
              <option value="csv_import">CSV Import</option>
              <option value="manual">Manual Entry</option>
              <option value="enrichment">Enriched Data</option>
            </select>

            {/* Status filter */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="unsubscribed">Unsubscribed</option>
              <option value="bounced">Bounced</option>
              <option value="blocked">Blocked</option>
            </select>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 hover:underline px-2 py-1 bg-indigo-50 border border-indigo-200 rounded-md transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Presence Filter Pills (Tri-State: All -> Yes -> No -> All) */}
        <div className="flex items-center gap-1.5 pt-1 border-t border-[var(--border-color)] flex-wrap text-xs">
          <span className="text-[10px] text-slate-500 font-medium mr-1">Data Presence:</span>
          
          <button
            type="button"
            title="Cycle: All -> Has Email -> No Email"
            onClick={() => cyclePresenceFilter(filterHasEmail, setFilterHasEmail)}
            className={`px-2 py-0.5 rounded-md text-[10px] border flex items-center gap-1 transition-all ${
              filterHasEmail === true
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold shadow-xs'
                : filterHasEmail === false
                ? 'bg-rose-50 text-rose-700 border-rose-300 font-semibold shadow-xs'
                : 'bg-[var(--bg-elevated)] text-slate-600 border-[var(--border-color)] hover:text-slate-900'
            }`}
          >
            <Mail className="w-2.5 h-2.5" />
            <span>Email: {filterHasEmail === true ? 'Yes' : filterHasEmail === false ? 'No' : 'All'}</span>
          </button>

          <button
            type="button"
            title="Cycle: All -> Has Phone -> No Phone"
            onClick={() => cyclePresenceFilter(filterHasPhone, setFilterHasPhone)}
            className={`px-2 py-0.5 rounded-md text-[10px] border flex items-center gap-1 transition-all ${
              filterHasPhone === true
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold shadow-xs'
                : filterHasPhone === false
                ? 'bg-rose-50 text-rose-700 border-rose-300 font-semibold shadow-xs'
                : 'bg-[var(--bg-elevated)] text-slate-600 border-[var(--border-color)] hover:text-slate-900'
            }`}
          >
            <Phone className="w-2.5 h-2.5" />
            <span>Phone: {filterHasPhone === true ? 'Yes' : filterHasPhone === false ? 'No' : 'All'}</span>
          </button>

          <button
            type="button"
            title="Cycle: All -> Has LinkedIn -> No LinkedIn"
            onClick={() => cyclePresenceFilter(filterHasLinkedin, setFilterHasLinkedin)}
            className={`px-2 py-0.5 rounded-md text-[10px] border flex items-center gap-1 transition-all ${
              filterHasLinkedin === true
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold shadow-xs'
                : filterHasLinkedin === false
                ? 'bg-rose-50 text-rose-700 border-rose-300 font-semibold shadow-xs'
                : 'bg-[var(--bg-elevated)] text-slate-600 border-[var(--border-color)] hover:text-slate-900'
            }`}
          >
            <Linkedin className="w-2.5 h-2.5" />
            <span>LinkedIn: {filterHasLinkedin === true ? 'Yes' : filterHasLinkedin === false ? 'No' : 'All'}</span>
          </button>

          <button
            type="button"
            title="Cycle: All -> Has Website -> No Website"
            onClick={() => cyclePresenceFilter(filterHasWebsite, setFilterHasWebsite)}
            className={`px-2 py-0.5 rounded-md text-[10px] border flex items-center gap-1 transition-all ${
              filterHasWebsite === true
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold shadow-xs'
                : filterHasWebsite === false
                ? 'bg-rose-50 text-rose-700 border-rose-300 font-semibold shadow-xs'
                : 'bg-[var(--bg-elevated)] text-slate-600 border-[var(--border-color)] hover:text-slate-900'
            }`}
          >
            <Globe className="w-2.5 h-2.5" />
            <span>Website: {filterHasWebsite === true ? 'Yes' : filterHasWebsite === false ? 'No' : 'All'}</span>
          </button>
        </div>
      </div>

      {/* Bulk Action Bar (Visible when rows selected) */}
      {selectedContactIds.length > 0 && (
        <div className="p-2.5 rounded-lg bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-between gap-3 text-xs animate-in fade-in duration-100">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-indigo-400">{selectedContactIds.length} contact(s) selected</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Add to List dropdown */}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleBulkAddToList(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded px-2 py-1 text-xs text-[var(--text-primary)]"
            >
              <option value="" disabled>+ Add to List...</option>
              {lists.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>

            {/* Change Status */}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleBulkStatusChange(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded px-2 py-1 text-xs text-[var(--text-primary)]"
            >
              <option value="" disabled>Change Status...</option>
              <option value="active">Set Active</option>
              <option value="unsubscribed">Set Unsubscribed</option>
              <option value="blocked">Set Blocked</option>
            </select>

            {/* Bulk Enrich */}
            <button
              onClick={() => setIsEnrichmentModalOpen(true)}
              className="px-2.5 py-1 rounded bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-medium flex items-center gap-1 hover:bg-cyan-600/30"
            >
              <Sparkles className="w-3 h-3" />
              <span>Enrich Selected</span>
            </button>

            {/* Bulk Delete */}
            <button
              onClick={handleBulkDelete}
              className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-medium flex items-center gap-1 hover:bg-rose-500/20"
            >
              <Trash2 className="w-3 h-3" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Contacts Data Table */}
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border-color)] text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4 w-10 text-center">
                  <button
                    onClick={handleSelectAll}
                    className="p-1 hover:text-[var(--text-primary)]"
                  >
                    {selectedContactIds.length > 0 && selectedContactIds.length === contacts.length ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 font-semibold">Contact / Company</th>
                <th className="py-3 px-4 font-semibold">Channels</th>
                <th className="py-3 px-4 font-semibold">Role & Vertical</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">List Segments</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border-color)]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-indigo-400" />
                    <span>Loading verified contacts...</span>
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] text-slate-500 flex items-center justify-center mx-auto">
                      <Users className="w-6 h-6" />
                    </div>
                    {hasActiveFilters ? (
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">No contacts found</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                          Try adjusting or clearing your search or active filters to view results.
                        </p>
                        <div className="pt-3">
                          <button
                            onClick={handleClearFilters}
                            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium shadow-sm transition-colors"
                          >
                            Clear Filters
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">No contacts yet</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                          Import a CSV spreadsheet, find leads with Serper AI, or add a contact manually to get started.
                        </p>
                        <div className="flex items-center justify-center gap-2 pt-3">
                          <button
                            onClick={() => setIsCSVModalOpen(true)}
                            className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors"
                          >
                            Upload CSV
                          </button>
                          <Link
                            href="/lead-gen"
                            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium shadow-sm transition-colors"
                          >
                            Discover AI Leads
                          </Link>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => {
                  const isSelected = selectedContactIds.includes(contact.id);
                  const fullName = `${contact.first_name || ''} ${contact.last_name || ''}`.trim() || 'Unnamed Contact';

                  return (
                    <tr
                      key={contact.id}
                      className={`hover:bg-[var(--bg-elevated)] transition-colors ${
                        isSelected ? 'bg-indigo-600/5' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleSelectContact(contact.id)}
                          className="p-1 hover:text-[var(--text-primary)]"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                          )}
                        </button>
                      </td>

                      {/* Contact & Company */}
                      <td className="py-3 px-4">
                        <div
                          onClick={() => handleOpenDrawer(contact)}
                          className="cursor-pointer group"
                        >
                          <p className="font-semibold text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">
                            {fullName}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                            {contact.company || '—'}
                          </p>
                        </div>
                      </td>

                      {/* Channels (Email, Phone, LinkedIn, Website) */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {contact.email ? (
                            <a
                              href={`mailto:${contact.email}`}
                              title={contact.email}
                              className="p-1 rounded bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1 text-slate-600" title="No Email">
                              <Mail className="w-3.5 h-3.5 opacity-30" />
                            </span>
                          )}

                          {contact.phone ? (
                            <a
                              href={`tel:${contact.phone}`}
                              title={contact.phone}
                              className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1 text-slate-600" title="No Phone">
                              <Phone className="w-3.5 h-3.5 opacity-30" />
                            </span>
                          )}

                          {contact.linkedin_url ? (
                            <a
                              href={contact.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                              title={contact.linkedin_url}
                              className="p-1 rounded bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1 text-slate-600" title="No LinkedIn Profile">
                              <Linkedin className="w-3.5 h-3.5 opacity-30" />
                            </span>
                          )}

                          {contact.website_url ? (
                            <a
                              href={contact.website_url}
                              target="_blank"
                              rel="noreferrer"
                              title={contact.website_url}
                              className="p-1 rounded bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          ) : null}
                        </div>
                      </td>

                      {/* Title & Industry */}
                      <td className="py-3 px-4">
                        <p className="font-medium text-[var(--text-primary)] text-[11px] truncate max-w-[180px]">
                          {contact.title || '—'}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[180px]">
                          {contact.industry || '—'}
                        </p>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4 text-slate-300 text-[11px]">
                        {contact.location ? (
                          <span className="truncate block max-w-[140px]">{contact.location}</span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>

                      {/* List segments */}
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[160px]">
                          {contact.lists && contact.lists.length > 0 ? (
                            contact.lists.slice(0, 2).map((l) => (
                              <span
                                key={l.id}
                                className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-medium truncate max-w-[100px]"
                              >
                                {l.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-[10px]">—</span>
                          )}
                          {contact.lists && contact.lists.length > 2 && (
                            <span className="text-[9px] text-slate-400">+{contact.lists.length - 2}</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            contact.status === 'active'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                              : contact.status === 'unsubscribed'
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {contact.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenDrawer(contact)}
                            title="View Full Profile"
                            className="p-1 rounded text-slate-400 hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(contact)}
                            title="Edit Contact"
                            className="p-1 rounded text-slate-400 hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSingle(contact.id)}
                            title="Delete"
                            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-4 py-3 border-t border-[var(--border-color)] bg-[var(--bg-elevated)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing <span className="font-semibold text-[var(--text-primary)]">{totalCount === 0 ? 0 : (page - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-[var(--text-primary)]">{Math.min(page * pageSize, totalCount)}</span> of{' '}
            <span className="font-semibold text-[var(--text-primary)]">{totalCount}</span> contacts
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-[11px]">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded px-2 py-0.5 text-xs text-[var(--text-primary)]"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] disabled:opacity-40 hover:bg-[var(--border-color)] transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-medium text-[var(--text-primary)]">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] disabled:opacity-40 hover:bg-[var(--border-color)] transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Slide-over Drawer */}
      <CSVImportModal
        isOpen={isCSVModalOpen}
        onClose={() => setIsCSVModalOpen(false)}
        onImportComplete={() => {
          loadContacts();
          loadLists();
        }}
        lists={lists}
      />

      <ContactFormDialog
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        onSaveComplete={() => {
          loadContacts();
          loadLists();
        }}
        contactToEdit={contactToEdit}
        lists={lists}
      />

      <ContactListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onSaveComplete={() => {
          loadLists();
          loadContacts();
        }}
        listToEdit={listToEdit}
      />

      <ContactEnrichmentModal
        isOpen={isEnrichmentModalOpen}
        onClose={() => setIsEnrichmentModalOpen(false)}
        onEnrichComplete={() => {
          loadContacts();
        }}
        selectedContacts={contacts.filter((c) => selectedContactIds.includes(c.id))}
      />

      <ContactDetailDrawer
        contact={selectedDrawerContact}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onEdit={(contact) => {
          setIsDrawerOpen(false);
          handleOpenEdit(contact);
        }}
        onDelete={(id) => {
          handleDeleteSingle(id);
        }}
        onEnrichSingle={(contact) => {
          handleEnrichSingle(contact);
        }}
        lists={lists}
      />
    </div>
  );
}
