/**
 * Default page size for the leads table.
 *
 * Used by:
 * - useLeadPagination (initial rowsPerPage state)
 */
export const DEFAULT_ROWS_PER_PAGE = 10;

/**
 * Blank filter-form state for the leads filter panel.
 *
 * Used by:
 * - useLeadFilters (initial state), EnquiriesPage (reset via clearFilters)
 */
export const INITIAL_FILTERS = {
  dateRange: { start: '', end: '' },
  filterByDate: '',
  sourceId: '',
  purposeId: '',
  leadStatus: '',
  followupAdded: '',
  assignedTo: '',
  typeId: '',
  location: '',
  remarks: '',
  additionalFields: {},
};

/**
 * Fixed column definitions for the leads table header.
 *
 * Used by:
 * - EnquiriesPage (merged with per-lead dynamic additional-field columns before
 *   being passed to the table header and EnquiriesRow)
 */
export const COLUMNS = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone', sortable: true },
  { key: 'location', label: 'Location', sortable: true },
  { key: 'assignedTo', label: 'Assigned To', sortable: true },
  { key: 'purpose', label: 'Purpose', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'updatedAt', label: 'Updated At', sortable: true },
  { key: 'nextFollowUp', label: 'Next Follow Up', sortable: true },
];
