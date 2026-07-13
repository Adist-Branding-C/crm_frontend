/**
 * Adds `days` days to an ISO/date-input string and returns the result as an ISO string.
 *
 * Used by:
 * - subscriptionFormMapper (computing validUpto from validFrom + durationInDays)
 */
export function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/**
 * Renders a subscription's validUpto date as a human "N days remaining" / "Expired N days ago" label.
 * `status` takes priority over the date math - a subscription marked Expired/Cancelled (e.g. via a
 * manual status change or a "spot cancel") is never valid regardless of how much of its validUpto
 * window is technically still in the future.
 *
 * Used by:
 * - SubscriptionOverviewCard
 */
export function getDaysRemainingLabel(validUpto: string, status: string): string {
  if (status === 'Expired') return 'Expired';
  if (status === 'Cancelled') return 'Cancelled';

  const diffDays = Math.ceil((new Date(validUpto).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays > 0) return `${diffDays} day${diffDays === 1 ? '' : 's'} remaining`;
  if (diffDays === 0) return 'Expires today';
  return `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`;
}
