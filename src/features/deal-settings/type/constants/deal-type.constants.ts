import type { DealTypeFormData } from '../types/request';

/**
 * Blank form values for the deal type add/edit drawer.
 *
 * Used by:
 * - DealTypePage.tsx (Formik initialValues for the add drawer)
 */
export const ADD_DEAL_TYPE_INITIAL_VALUES: DealTypeFormData = {
  name: '',
  status: '' as unknown as boolean,
};

export const DEAL_TYPE_STATUS_OPTIONS = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];
