import * as yup from 'yup';

const optionalNonNegativeNumber = yup
  .number()
  .transform((value, originalValue) => (originalValue === '' ? undefined : value))
  .min(0, 'Must be 0 or greater');

/**
 * Validation schema for the company list filter panel (status, plan status, licensed-seats
 * range, per-staff-price range, soon-expiring toggle).
 *
 * Used by:
 * - CompaniesFilters (Company Management page)
 *
 * Notes:
 * - All fields are optional - an empty filter just means "no constraint on this field".
 * - maxLicensedSeats/maxPerStaffPrice validate against their own minimum via yup.ref, so a
 *   max entered lower than its min surfaces a field error instead of silently querying an
 *   empty result set.
 */
export const companyFiltersValidationSchema = yup.object({
  status: yup.string(),
  subscriptionStatus: yup.string(),
  soonExpiring: yup.boolean(),
  minLicensedSeats: optionalNonNegativeNumber,
  maxLicensedSeats: optionalNonNegativeNumber.min(yup.ref('minLicensedSeats'), 'Max must be greater than or equal to Min'),
  minPerStaffPrice: optionalNonNegativeNumber,
  maxPerStaffPrice: optionalNonNegativeNumber.min(yup.ref('minPerStaffPrice'), 'Max must be greater than or equal to Min'),
});
