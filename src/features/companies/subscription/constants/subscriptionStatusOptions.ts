/**
 * The full set of statuses a company subscription can be in, for the status-change select.
 *
 * Used by:
 * - UpdateSubscriptionStatusModal (Company Subscription Management page)
 * - updateSubscriptionStatusValidationSchema (constrains allowed `status` values)
 */
export const SUBSCRIPTION_STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Expired', label: 'Expired' },
  { value: 'Cancelled', label: 'Cancelled' },
  { value: 'Pending', label: 'Pending' },
];
