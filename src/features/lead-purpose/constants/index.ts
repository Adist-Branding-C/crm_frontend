import type { FormField, Column } from '../../../shared/types/crud';
import type { LeadPurposeItem } from '../types';

export const formFields: FormField[] = [
  { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter title' },
];

export const columns: Column<LeadPurposeItem>[] = [{ key: 'title', label: 'Title' }];

export const LEAD_PURPOSE_DATA: LeadPurposeItem[] = [
  { id: 1, title: '12th Pass' },
  { id: 2, title: 'Graduate' },
];
