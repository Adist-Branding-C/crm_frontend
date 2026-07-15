import type { DealStatusFormData } from '../types/request';

/**
 * Blank form values for the deal status add/edit drawer.
 *
 * Used by:
 * - useDealStatusDrawer.ts (useAddEditForm's emptyFormData)
 */
export const ADD_DEAL_STATUS_INITIAL_VALUES: DealStatusFormData = {
  name: '',
  stage: '',
  status: '' as unknown as boolean,
};

export const DEAL_STATUS_STAGE_OPTIONS = [
  { value: 'Win', label: 'Win' },
  { value: 'Lose', label: 'Lose' },
  { value: 'In Progress', label: 'In Progress' },
];

export const DEAL_STATUS_STATUS_OPTIONS = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];

/**
 * Field config for the deal status add/edit drawer's generic AdminForm renderer.
 *
 * Used by:
 * - AddDealStatusDrawer.tsx (legacy — replaced by DealStatusForm.tsx)
 */
export const DEAL_STATUS_FORM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Enter deal status name' },
  { name: 'stage', label: 'Stage', type: 'select' as const, required: true, options: DEAL_STATUS_STAGE_OPTIONS },
  { name: 'status', label: 'Status', type: 'select' as const, required: true, options: DEAL_STATUS_STATUS_OPTIONS },
];
