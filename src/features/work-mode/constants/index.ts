import type { FormField } from '../../../shared/types/crud';
import type { WorkModeItem } from '../types';

export const formFields: FormField[] = [
  { name: 'name', label: 'Work Mode', type: 'text', required: true, placeholder: 'Enter work mode' },
];

export const columns = [{ key: 'name', label: 'Work Mode' }];

export const WORK_MODE_DATA: WorkModeItem[] = [
  { id: 1, name: 'Office' },
  { id: 2, name: 'Remote' },
];
