import * as yup from 'yup';
import { SUBSCRIPTION_STATUS_OPTIONS } from '../constants/subscriptionStatusOptions';

/**
 * Validation schema for assigning a company's first subscription.
 *
 * Used by:
 * - AssignSubscriptionForm (Company Subscription Management page)
 *
 * Notes:
 * - Frontend validates format/required-ness only; the backend re-validates on submit and is
 *   the source of truth for totalPrice (recomputed server-side from staffCount * perStaffPrice -
 *   this schema never collects totalPrice as user input).
 */
export const assignSubscriptionValidationSchema = yup.object({
  validFrom: yup.string().required('Start date is required'),
  durationInDays: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Duration is required'),
  staffCount: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Staff count is required'),
  perStaffPrice: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Per-staff price is required'),
  remark: yup.string().trim(),
});

/**
 * Validation schema for updating an existing subscription's seat count and per-seat price.
 *
 * Used by:
 * - EditStaffCountModal (Company Subscription Management page)
 *
 * Notes:
 * - Frontend validates format/required-ness only; the backend recomputes and is the source of
 *   truth for totalPrice (staffCount * perStaffPrice) - this schema never collects totalPrice.
 */
export const editStaffCountValidationSchema = yup.object({
  staffCount: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Staff count is required'),
  perStaffPrice: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Per-staff price is required'),
});

/**
 * Validation schema for changing a subscription's status (e.g. Active/Cancelled) and remark.
 *
 * Used by:
 * - UpdateSubscriptionStatusModal (Company Subscription Management page)
 *
 * Notes:
 * - `status` is constrained to the values in SUBSCRIPTION_STATUS_OPTIONS so the form can't submit
 *   a status the backend doesn't recognize.
 */
export const updateSubscriptionStatusValidationSchema = yup.object({
  status: yup
    .string()
    .oneOf(SUBSCRIPTION_STATUS_OPTIONS.map((o) => o.value))
    .required('Status is required'),
  remark: yup.string().trim(),
});

/**
 * Validation schema for creating/editing a scheduled renewal-queue entry.
 *
 * Used by:
 * - RenewalQueueFormModal (Company Subscription Management page)
 *
 * Notes:
 * - Frontend validates format/required-ness only; the backend recomputes and is the source of
 *   truth for totalPrice (staffCount * perStaffPrice) - this schema never collects totalPrice.
 */
export const renewalQueueValidationSchema = yup.object({
  renewalDate: yup.string().required('Renewal date is required'),
  validFrom: yup.string().required('Start date is required'),
  durationInDays: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Duration is required'),
  staffCount: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Staff count is required'),
  perStaffPrice: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Per-staff price is required'),
  immediate: yup.boolean(),
});
