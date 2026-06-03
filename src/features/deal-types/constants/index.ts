import type { FormField } from '../../../shared/types/crud';
import type { DealTypeItem } from '../types';

export const formFields: FormField[] = [
  { name: 'type', label: 'Type', type: 'text', required: true, placeholder: 'Enter deal type' },
];

export const columns = [{ key: 'type', label: 'Type' }];

export const DEAL_TYPE_DATA: DealTypeItem[] = [
  { id: 1, type: 'Egypt Registered' },
  { id: 2, type: 'Uzbekistan registered' },
];
