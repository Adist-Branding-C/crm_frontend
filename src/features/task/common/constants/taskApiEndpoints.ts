/**
 * Base API paths for the task domain's lookup/reference endpoints.
 *
 * Used by:
 * - taskService (task/shared/services/taskService.ts), for category/staff/lead lookups
 *   consumed by useCategoryOptions/useStaffOptions/useLeadOptions.
 */
export const TASK_API = {
  CATEGORY_DROPDOWN: '/task-category/dropdown',
  STAFF: '/staff',
  LEAD: '/leads',
};
