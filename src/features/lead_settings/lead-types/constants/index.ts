import type { FormField, Column } from '../../../../shared/types/crud';
import type { LeadTypeItem } from '../types';

export const formFields: FormField[] = [
  { name: 'type', label: 'Lead Type', type: 'text', required: true, placeholder: 'Enter lead type' },
];

export const columns: Column<LeadTypeItem>[] = [
  { key: 'addedBy', label: 'Added By' },
  { key: 'type', label: 'Lead Type' },
];

export const LEAD_TYPE_DATA: LeadTypeItem[] = [
  { id: 1, addedBy: 'You', type: 'Seminar Saudi' },
  { id: 2, addedBy: 'You', type: 'Seminar UAE' },
  { id: 3, addedBy: 'You', type: 'Seminar Qatar' },
];
