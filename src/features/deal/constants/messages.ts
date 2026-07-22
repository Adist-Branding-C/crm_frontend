export const SUCCESS_MESSAGES = {
  DEAL_CREATED: 'Deal created successfully.',
  DEAL_UPDATED: 'Deal updated successfully.',
  DEAL_DELETED: 'Deal deleted successfully.',
  DEALS_DELETED: (count: number) => `${count} deal(s) deleted successfully.`,
  STATUS_UPDATED: (count: number) => `Status updated for ${count} deal(s).`,
  STAFF_ASSIGNED: (count: number) => `Staff assigned to ${count} deal(s).`,
};

export const ERROR_MESSAGES = {
  CREATE_DEAL: 'Failed to create deal. Please try again.',
  UPDATE_DEAL: 'Failed to update deal. Please try again.',
  DELETE_DEAL: 'Failed to delete deal. Please try again.',
  FETCH_DEALS: 'Failed to fetch deals. Please try again.',
  LOAD_FORM_OPTIONS: 'Failed to load form options. Please refresh the page.',
  SELECT_AT_LEAST_ONE: 'Please select at least one deal.',
  EXPORT_NOT_AVAILABLE: 'Export is not available yet.',
  PARTIAL_SUCCESS: (success: number, fail: number) =>
    `Updated ${success} deal(s). Failed to update ${fail} deal(s).`,
  PARTIAL_DELETE: (success: number, fail: number) =>
    `Deleted ${success} deal(s). Failed to delete ${fail} deal(s).`,
};
