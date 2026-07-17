import type { DealAdditionalFieldFormData } from '../types/request';

/**
 * Blank form shape for the deal additional-field create/edit form.
 *
 * Used by:
 * - DealAdditionalFieldPage (Formik `initialValues` in "add" mode, via useDealAdditionalFieldDrawer)
 */
export const ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES: DealAdditionalFieldFormData = {
  fieldName: '',
  fieldType: '',
  inFilter: false,
  inList: false,
  required: false,
  dropdownValues: [],
  currentDropdownValue: '',
};
