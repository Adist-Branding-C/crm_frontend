import type { DealTypeFormData } from '../types/deal-type.types';

export const ADD_DEAL_TYPE_INITIAL_VALUES: DealTypeFormData = {
  name: '',
  status: '',
};

export const DEAL_TYPE_FORM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Enter deal type name' },
  { name: 'status', label: 'Status', type: 'select' as const, required: true, options: [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]},
];
