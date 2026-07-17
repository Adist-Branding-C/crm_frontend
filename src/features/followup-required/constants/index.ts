import type { Filters } from '../types';

export const INITIAL_FILTERS: Filters = {
  type: '',
  status: '',
  source: '',
  assignedTo: '',
  dateRange: { start: '', end: '' },
};

export const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone', sortable: false },
  { key: 'assignedTo', label: 'Assigned To', sortable: false },
  { key: 'purpose', label: 'Purpose', sortable: false },
  { key: 'type', label: 'Type', sortable: false },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'source', label: 'Source', sortable: false },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'updatedAt', label: 'Updated At', sortable: false },
  { key: 'nextFollowUp', label: 'Next Follow Up', sortable: true },
];

export const SORT_OPTIONS = [
  { key: 'createdAt', label: 'Created Date' },
  { key: 'nextFollowUp', label: 'Next Follow Up' },
  { key: 'name', label: 'Name' },
];
