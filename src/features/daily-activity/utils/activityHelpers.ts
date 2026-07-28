import type { PageNumberEntry } from '../types';

export function formatActivityType(activityType: string): string {
  return activityType
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function calculateTimeAgo(createdAt: string): string {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  // Server timestamps should never be in the future, but clock skew or stale
  // data can still produce a negative diff. Use the magnitude so those cases
  // show an honest elapsed time instead of every one of them collapsing into
  // "Just now" (which made distinct old records visually indistinguishable).
  const minutes = Math.floor(Math.abs(diffMs) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export function formatTimestamp(isoString: string): string {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return 'Unknown time';
  
  const month = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  const year = d.getFullYear();
  
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  return `${month} ${day}, ${year}, ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

export function getBadge(entityType: string): string {
  return entityType.charAt(0).toUpperCase() + entityType.slice(1);
}

// Mirrors the backend's LEAD_FIELD_LABELS / DEAL_FIELD_LABELS - field names
// are shared/unambiguous across both entities (e.g. only one of them ever
// changes at once), so a single map covers the activity feed regardless of
// which entity the change belongs to.
const CHANGE_FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  dealName: 'Deal name',
  phone: 'Phone',
  email: 'Email',
  agentId: 'Assigned agent',
  purposeId: 'Purpose',
  typeId: 'Type',
  statusId: 'Status',
  sourceId: 'Source',
  location: 'Location',
  address: 'Address',
  notes: 'Notes',
  note: 'Note',
  nextFollowUpDate: 'Next follow-up date',
  amount: 'Amount',
  currency: 'Currency',
  mobile: 'Mobile',
  startDate: 'Start date',
  endDate: 'End date',
  leadId: 'Lead',
};

export function getChangeFieldLabel(fieldName: string): string {
  return CHANGE_FIELD_LABELS[fieldName] ?? fieldName;
}

/**
 * Computes a windowed page-number sequence with 'ellipsis' gap markers, e.g.
 * [1, 'ellipsis', 4, 5, 6, 'ellipsis', 20] for a large page count.
 *
 * Used by:
 * - DailyActivityPage (feeds ActivityPagination's numbered page buttons).
 *
 * Notes:
 * - Always includes page 1 and the last page, plus `window` pages on either
 *   side of `currentPage`.
 */
export function computePageNumbers(
  currentPage: number,
  totalPages: number,
  window: number,
): PageNumberEntry[] {
  if (totalPages <= 1) return totalPages === 1 ? [1] : [];

  const pages = new Set<number>([1, totalPages]);
  for (let i = currentPage - window; i <= currentPage + window; i++) {
    if (i >= 1 && i <= totalPages) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: PageNumberEntry[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) result.push('ellipsis');
    result.push(page);
    previous = page;
  }
  return result;
}
