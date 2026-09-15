import { ContactView } from "../crm-store";

export interface RecipientEligibilitySummary {
  totalSelected: number;
  eligible: ContactView[];
  ineligibleNoEmail: ContactView[];
  duplicateEmails: ContactView[];
  eligibleCount: number;
  noEmailCount: number;
  duplicateCount: number;
}

/**
 * Validates whether an email is formatted properly
 */
export function isValidEmail(email?: string): boolean {
  if (!email) return false;
  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmed);
}

/**
 * Analyzes a list of selected contacts and groups them into:
 * - Eligible contacts with unique, valid emails
 * - Ineligible contacts (missing or invalid email)
 * - Duplicate contacts (contacts sharing an email with an already processed contact)
 */
export function evaluateRecipientEligibility(contacts: ContactView[]): RecipientEligibilitySummary {
  const eligible: ContactView[] = [];
  const ineligibleNoEmail: ContactView[] = [];
  const duplicateEmails: ContactView[] = [];
  const seenEmails = new Set<string>();

  for (const contact of contacts) {
    const rawEmail = contact.email?.trim().toLowerCase();

    if (!rawEmail || !isValidEmail(rawEmail)) {
      ineligibleNoEmail.push(contact);
      continue;
    }

    if (seenEmails.has(rawEmail)) {
      duplicateEmails.push(contact);
    } else {
      seenEmails.add(rawEmail);
      eligible.push(contact);
    }
  }

  return {
    totalSelected: contacts.length,
    eligible,
    ineligibleNoEmail,
    duplicateEmails,
    eligibleCount: eligible.length,
    noEmailCount: ineligibleNoEmail.length,
    duplicateCount: duplicateEmails.length,
  };
}
