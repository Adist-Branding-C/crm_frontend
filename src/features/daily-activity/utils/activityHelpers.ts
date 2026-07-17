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

export function formatRelatedLead(
  entityId: string,
  name: string | null,
  phone: string | null,
): string {
  if (phone && name) return `${phone} | ${name}`;
  if (phone) return phone;
  return name ?? entityId;
}

export function formatTimestamp(isoString: string): string {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return 'Unknown time';
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

export function getBadge(entityType: string): string {
  return entityType.charAt(0).toUpperCase() + entityType.slice(1);
}

/**
 * Computes a windowed page-number sequence with 'ellipsis' gap markers, e.g.
 * [1, 'ellipsis', 4, 5, 6, 'ellipsis', 20] for a large page count.
 *
 * Used by:
 * - useDailyActivityData (feeds ActivityPagination's numbered page buttons).
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
