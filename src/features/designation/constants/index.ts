import type { FormField } from '../../../shared/types/crud';
import type { DesignationItem } from '../types';

export const formFields: FormField[] = [
  { name: 'name', label: 'Designation', type: 'text', required: true, placeholder: 'Enter designation name' },
];

export const columns = [{ key: 'name', label: 'Designation' }];

export const DESIGNATION_DATA: DesignationItem[] = [
  { id: 1, name: 'Manager' },
  { id: 2, name: 'Team Lead' },
];
