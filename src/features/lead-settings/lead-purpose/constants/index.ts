import type { FormField } from '../../../../shared/types/crud';
import type { Column } from '../../../../shared/types/crud';
import type { LeadPurposeItem } from '../types';

export const formFields: FormField[] = [
  { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter title' },
];

export const columns: Column<LeadPurposeItem>[] = [
  { key: 'title', label: 'Title' },
];
