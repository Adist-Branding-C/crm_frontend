import type { FormField } from '../../../../shared/types/crud';
import type { Column } from '../../../../shared/types/crud';
import type { LeadTypeItem } from '../types';

export const formFields: FormField[] = [
  { name: 'type', label: 'Lead Type', type: 'text', required: true, placeholder: 'Enter lead type' },
];

export const columns: Column<LeadTypeItem>[] = [
  { key: 'addedBy', label: 'Added By' },
  { key: 'type', label: 'Lead Type' },
];
