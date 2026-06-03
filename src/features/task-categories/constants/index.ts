import type { FormField } from '../../../shared/types/crud';
import type { TaskCategoryItem } from '../types';

export const formFields: FormField[] = [
  { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'Enter category' },
  { name: 'action', label: 'Action', type: 'text', required: true, placeholder: 'Enter action' },
];

export const columns = [
  { key: 'category', label: 'Category' },
  { key: 'action', label: 'Action' },
];

export const INIT_DATA: TaskCategoryItem[] = [
  { id: 1, category: 'Meeting', action: 'Default' },
  { id: 2, category: 'Call', action: 'Default' },
  { id: 3, category: 'Sales', action: 'Default' },
];
