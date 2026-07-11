import * as yup from 'yup';
import { SUBSCRIPTION_STATUS_OPTIONS } from '../constants/subscriptionStatusOptions';

/**
 * Validation schemas for the Company Subscription Management page's forms.
 *
 * Notes:
 * - Frontend validates format/required-ness only; the backend re-validates on submit and is
 *   the source of truth for totalPrice (recomputed server-side from staffCount * perStaffPrice
 *   in every case - these schemas never collect totalPrice as user input).
 */
export const assignSubscriptionValidationSchema = yup.object({
  validFrom: yup.string().required('Start date is required'),
  durationInDays: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Duration is required'),
  staffCount: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Staff count is required'),
  perStaffPrice: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Per-staff price is required'),
  remark: yup.string().trim(),
});

export const editStaffCountValidationSchema = yup.object({
  staffCount: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Staff count is required'),
  perStaffPrice: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Per-staff price is required'),
});

export const updateSubscriptionStatusValidationSchema = yup.object({
  status: yup
    .string()
    .oneOf(SUBSCRIPTION_STATUS_OPTIONS.map((o) => o.value))
    .required('Status is required'),
  remark: yup.string().trim(),
});

export const renewalQueueValidationSchema = yup.object({
  renewalDate: yup.string().required('Renewal date is required'),
  validFrom: yup.string().required('Start date is required'),
  durationInDays: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Duration is required'),
  staffCount: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Staff count is required'),
  perStaffPrice: yup.number().typeError('Enter a number').positive('Must be greater than 0').required('Per-staff price is required'),
  immediate: yup.boolean(),
});
