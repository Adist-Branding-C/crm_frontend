import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';
import type { CompanyFilters } from '../types';

/**
 * Company Active/Inactive status options for the status filter/select controls.
 *
 * Used by:
 * - CompaniesFilters (status filter dropdown)
 * - CompanyForm (status field)
 */
export const COMPANY_STATUS_OPTIONS = [
  { value: CompanyStatus.ACTIVE, label: 'Active' },
  { value: CompanyStatus.INACTIVE, label: 'Inactive' },
];

/**
 * The "no filters applied" baseline for the company list filter panel - used both as the
 * Formik initialValues when no filters have been applied yet, and as the reset target when
 * the user clears filters.
 *
 * Used by:
 * - CompaniesFilters (Formik initialValues)
 * - useCompanyFilters (clear action, applied-filters ref default)
 */
export const EMPTY_COMPANY_FILTERS: CompanyFilters = {
  status: '',
  subscriptionStatus: '',
  soonExpiring: false,
  minLicensedSeats: '',
  maxLicensedSeats: '',
  minPerStaffPrice: '',
  maxPerStaffPrice: '',
};
