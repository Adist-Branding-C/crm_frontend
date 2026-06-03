import type { FormField } from '../../../shared/types/crud';
import type { BranchItem } from '../types';

export const formFields: FormField[] = [
  { name: 'name', label: 'Branch Name', type: 'text', required: true, placeholder: 'Enter branch name' },
];

export const columns = [
  { key: 'name', label: 'Branch Name' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'status', label: 'Status' },
];

export const BRANCH_DATA: BranchItem[] = [
  { id: 1, name: 'Main Branch', createdBy: 'Admin', status: 'Active' },
];
