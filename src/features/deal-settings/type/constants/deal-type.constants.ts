import type { DealTypeFormData } from '../types/request';

/**
 * Blank form values for the deal type add/edit drawer.
 *
 * Used by:
 * - useDealTypeDrawer.ts (useAddEditForm's emptyFormData)
 */
export const ADD_DEAL_TYPE_INITIAL_VALUES: DealTypeFormData = {
  name: '',
  status: '' as unknown as boolean,
};

/**
 * Field config for the deal type add/edit drawer's generic AdminForm renderer.
 *
 * Used by:
 * - AddDealTypeDrawer.tsx
 */
export const DEAL_TYPE_FORM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Enter deal type name' },
  { name: 'status', label: 'Status', type: 'select' as const, required: true, options: [
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ]},
];
