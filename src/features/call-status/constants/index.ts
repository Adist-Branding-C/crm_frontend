import type { FormField } from '../../../shared/types/crud';
import type { CallStatusItem } from '../types';

export const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter call status' },
];

export const columns = [{ key: 'name', label: 'Name' }];

export const INIT_DATA: CallStatusItem[] = [
  { id: 1, name: 'Connected' },
  { id: 2, name: 'Not Connected' },
  { id: 3, name: 'Busy' },
];
