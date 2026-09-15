/**
 * Email Personalization Engine
 * Safely resolves personalization tokens ({{first_name}}, {{company}}, etc.) with graceful fallbacks.
 */

import { BackendContact } from '../api';

export interface PersonalizationContext {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  company?: string;
  job_title?: string;
  email?: string;
  location?: string;
  industry?: string;
}

export function contactToPersonalizationContext(contact: BackendContact): PersonalizationContext {
  const firstName = contact.first_name?.trim() || 'there';
  const lastName = contact.last_name?.trim() || '';
  const fullName = `${contact.first_name || ''} ${contact.last_name || ''}`.trim() || firstName;
  const company = contact.company?.trim() || 'your team';
  const jobTitle = contact.custom_fields?.title?.trim() || 'leader';
  const location = contact.location || contact.custom_fields?.location?.trim() || '';
  const industry = contact.industry?.trim() || 'your industry';

  return {
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    company,
    job_title: jobTitle,
    email: contact.email || undefined,
    location,
    industry,
  };
}

/**
 * Replace all {{token}} variables with actual values from contact or context
 */
export function resolvePersonalizationTokens(
  template: string,
  contactOrContext: BackendContact | PersonalizationContext
): string {
  if (!template) return '';

  const ctx: PersonalizationContext =
    'custom_fields' in contactOrContext || 'user_id' in contactOrContext
      ? contactToPersonalizationContext(contactOrContext as BackendContact)
      : (contactOrContext as PersonalizationContext);

  let output = template;

  output = output.replace(/\{\{\s*first_name\s*\}\}/gi, ctx.first_name || 'there');
  output = output.replace(/\{\{\s*last_name\s*\}\}/gi, ctx.last_name || '');
  output = output.replace(/\{\{\s*full_name\s*\}\}/gi, ctx.full_name || 'there');
  output = output.replace(/\{\{\s*company\s*\}\}/gi, ctx.company || 'your team');
  output = output.replace(/\{\{\s*job_title\s*\}\}/gi, ctx.job_title || 'leader');
  output = output.replace(/\{\{\s*email\s*\}\}/gi, ctx.email || '');
  output = output.replace(/\{\{\s*location\s*\}\}/gi, ctx.location || '');
  output = output.replace(/\{\{\s*industry\s*\}\}/gi, ctx.industry || 'your space');

  return output;
}

export function renderPersonalizedText(template: string, ctx: PersonalizationContext): string {
  return resolvePersonalizationTokens(template, ctx);
}

/**
 * Process Spintax {Option A|Option B|Option C}
 * Supports seed-based deterministic selection (for previews / consistent runs) or random selection
 */
export function processSpintax(text: string, seed?: number): string {
  if (!text) return '';

  return text.replace(/\{([^{}]+)\}/g, (_, group) => {
    const choices = group.split('|').map((c: string) => c.trim());
    if (choices.length === 0) return '';
    if (seed !== undefined) {
      const index = Math.abs(seed) % choices.length;
      return choices[index];
    }
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  });
}
