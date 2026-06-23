import type { FormField } from '../../../../shared/types/crud';
import type { TaskCategoryItem } from '../types';

export const formFields: FormField[] = [
  { name: 'name', label: 'Category Name', type: 'text', required: true, placeholder: 'Enter task category' },
];

export const columns = [{ key: 'name', label: 'Category Name' }];

export const INIT_DATA: TaskCategoryItem[] = [
  { id: 1, name: 'Follow-up' },
  { id: 2, name: 'Call' },
  { id: 3, name: 'Meeting' },
  { id: 4, name: 'Email' },
  { id: 5, name: 'Demo' },
];
