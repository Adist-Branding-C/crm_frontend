import type { Filters } from '../types';

/**
 * Default (empty) filter state for the Followup Required page.
 *
 * Used by:
 * - useFollowupData, to seed both the draft and applied filter state.
 * - FollowupFilters "Clear" action, to reset the panel back to this shape.
 */
export const INITIAL_FILTERS: Filters = {
  type: '',
  status: '',
  source: '',
  assignedTo: '',
  dateRange: { start: '', end: '' },
};

/**
 * Column definitions for the Followup Required table.
 *
 * Used by:
 * - FollowupTable, to render the header row and drive per-column sortability.
 */
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

/**
 * Options for the "Sort By" dropdown on the Followup Required toolbar.
 *
 * Used by:
 * - FollowupToolbar, to render the sortable-field list; each `key` maps to
 *   the backend's `sort_by` values via SORT_KEY_TO_API in useFollowupData.
 */
export const SORT_OPTIONS = [
  { key: 'createdAt', label: 'Created Date' },
  { key: 'nextFollowUp', label: 'Next Follow Up' },
  { key: 'name', label: 'Name' },
];
