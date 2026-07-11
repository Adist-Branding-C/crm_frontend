import type { DealAdditionalFieldFormData } from '../types/request';

/**
 * Blank form values for the deal additional-field add/edit panel.
 *
 * Used by:
 * - useDealAdditionalFieldDrawer.ts (useEditDrawer's emptyFormData)
 */
export const ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES: DealAdditionalFieldFormData = {
  fieldName: '',
  fieldType: '',
  inFilter: false,
  inList: false,
  required: false,
};
