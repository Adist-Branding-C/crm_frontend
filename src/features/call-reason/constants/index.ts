import type { FormField } from '../../../shared/types/crud';
import type { CallReasonItem } from '../types';

export const formFields: FormField[] = [
  { name: 'name', label: 'Reason', type: 'text', required: true, placeholder: 'Enter call reason' },
];

export const columns = [{ key: 'name', label: 'Reason' }];

export const INIT_DATA: CallReasonItem[] = [];
