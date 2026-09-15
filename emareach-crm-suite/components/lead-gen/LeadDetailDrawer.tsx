'use client';

import React from 'react';
import {
  X,
  Mail,
  Phone,
  Building,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  UserCheck,
  Plus,
  Linkedin,
  Globe,
  Tag,
} from 'lucide-react';
import { LeadProspect } from '@/lib/api';

interface LeadDetailDrawerProps {
  lead: LeadProspect | null;
  isOpen?: boolean;
  onClose: () => void;
  onAddToContacts: (lead: LeadProspect) => void;
  isInContacts?: boolean;
}

export function LeadDetailDrawer({
  lead,
  isOpen = true,
  onClose,
  onAddToContacts,
  isInContacts = false,
}: LeadDetailDrawerProps) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col justify-between animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            {lead.firstName[0]}
            {lead.lastName ? lead.lastName[0] : ''}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {lead.firstName} {lead.lastName}
              </h2>
              {isInContacts ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  <span>In Contacts</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Discovered Lead</span>
                </span>
              )}
            </div>
            <p className="text-xs text-indigo-600 font-semibold">{lead.title}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{lead.company}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
        {/* Quality Score & Deliverability */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">ICP Relevance Score</span>
            <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lead.confidenceScore}% Qualified</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Email Deliverability</span>
            <div className="flex items-center gap-1.5 text-indigo-700 font-extrabold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span className="capitalize">{lead.emailVerification} Verified</span>
            </div>
          </div>
        </div>

        {/* Public Contact Channels */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            <span>Public Contact Channels</span>
          </h3>

          <div className="space-y-2">
            {/* Email */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-600" />
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">Corporate Email</span>
                  <span className="font-mono text-slate-900 text-xs font-semibold">{lead.email}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified
              </span>
            </div>

            {/* Phone */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-600" />
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">Phone Number</span>
                  <span className="font-mono text-slate-900 text-xs">
                    {lead.phone || 'Not publicly listed in SERP snippet'}
                  </span>
                </div>
              </div>
              {lead.phone ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Public Listing
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-medium">None</span>
              )}
            </div>

            {/* LinkedIn */}
            {lead.linkedinUrl && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">LinkedIn Profile</span>
                    <a
                      href={lead.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium truncate block max-w-xs hover:underline"
                    >
                      {lead.linkedinUrl}
                    </a>
                  </div>
                </div>
                <a
                  href={lead.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Website */}
            {lead.websiteUrl && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Company Website</span>
                    <a
                      href={lead.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 hover:text-indigo-600 truncate block max-w-xs font-medium hover:underline"
                    >
                      {lead.websiteUrl}
                    </a>
                  </div>
                </div>
                <a
                  href={lead.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Executive Summary & Role Context
          </h3>
          <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-normal">
            {lead.summary}
          </p>
        </div>

        {/* Company & Market Intel */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Company & Market Intel
          </h3>
          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Industry</span>
              <span className="font-semibold text-slate-900">{lead.industry}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Company Size</span>
              <span className="font-semibold text-slate-900">{lead.companySize}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Location</span>
              <span className="font-semibold text-slate-900">{lead.location}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Discovery Source</span>
              <span className="font-semibold text-slate-900">{lead.sourceType || 'Google Serper'}</span>
            </div>
          </div>
        </div>

        {/* Source Query */}
        {lead.sourceQuery && (
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] space-y-1">
            <span className="text-slate-500 font-bold uppercase text-[9px] block">
              Discovery Google Query
            </span>
            <span className="font-mono text-slate-800 block font-medium">{lead.sourceQuery}</span>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold"
        >
          Close
        </button>

        <button
          onClick={() => onAddToContacts(lead)}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all shadow-xs ${
            isInContacts
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isInContacts ? (
            <>
              <UserCheck className="w-4 h-4" />
              <span>Update Contact in Database</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Contacts Database</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
