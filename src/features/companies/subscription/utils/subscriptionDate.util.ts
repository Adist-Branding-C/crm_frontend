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
 *
 * Used by:
 * - SubscriptionOverviewCard
 */
export function getDaysRemainingLabel(validUpto: string): string {
  const diffDays = Math.ceil((new Date(validUpto).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays > 0) return `${diffDays} day${diffDays === 1 ? '' : 's'} remaining`;
  if (diffDays === 0) return 'Expires today';
  return `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`;
}
