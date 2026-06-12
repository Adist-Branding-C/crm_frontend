import type { DealStatusFormData } from '../types/deal-status.types';

export const ADD_DEAL_STATUS_INITIAL_VALUES: DealStatusFormData = {
  name: '',
  status: '',
};

export const DEAL_STATUS_FORM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Enter deal status name' },
  { name: 'status', label: 'Status', type: 'select' as const, required: true, options: [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]},
];
