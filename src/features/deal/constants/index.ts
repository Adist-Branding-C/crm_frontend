export const DEFAULT_ROWS_PER_PAGE = 10;

export const INITIAL_DEAL_FILTERS = {
  dateRange: { start: '', end: '' },
  filterByDate: '',
  status: '',
  type: '',
  assignedTo: '',
  additionalFields: {} as Record<string, string>,
};
