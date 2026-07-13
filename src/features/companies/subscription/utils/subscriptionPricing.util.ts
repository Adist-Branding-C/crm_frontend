/**
 * Subscription pricing is per-staff, per 30-day period - a 60-day term costs 2x a
 * 30-day term for the same staff count, a 40-day term costs 1.33x, etc. Mirrors the
 * backend's calculateSubscriptionTotalPrice (subscription/utils/subscription-pricing.util.ts).
 *
 * Used by:
 * - SubscriptionTotalPreview (live preview while filling any seat-pricing form)
 * - subscriptionFormMapper (create-subscription payload)
 */
export function calculateTotalPrice(staffCount: number, perStaffPrice: number, durationInDays: number): number {
  const total = perStaffPrice * (durationInDays / 30) * staffCount;
  return Math.round(total * 100) / 100;
}
