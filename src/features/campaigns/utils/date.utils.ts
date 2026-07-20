/**
 * Formats an ISO date string for display as "DD Mon YYYY hh:mm AM/PM".
 *
 * Used by:
 * - CampaignRow (Created At column)
 *
 * Notes:
 * - Kept in its own file rather than folded into campaign.utils.ts since date formatting is a
 *   generic concern, not campaign-specific business logic.
 */
export function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).replace(',', '');
}
