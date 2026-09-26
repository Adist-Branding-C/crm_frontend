/**
 * Toast copy shown after a successful lead/remark/task/deal mutation.
 *
 * Used by:
 * - EnquiriesPage (lead create/update/delete, bulk status/staff/delete),
 *   LeadDetailDrawer (remark and task create/update/delete, deal create)
 */
export const SUCCESS_MESSAGES = {
  LEAD_CREATED: 'Lead created successfully',
  LEAD_UPDATED: 'Lead updated successfully',
  LEAD_UPDATED_WITH_TASKS: (taskCount: number | undefined) =>
    taskCount ? `Lead updated successfully. ${taskCount} open task(s) reassigned.` : 'Lead updated successfully',
  LEAD_DELETED: 'Lead deleted successfully',
  REMARK_ADDED: 'Remark added successfully.',
  REMARK_UPDATED: 'Remark updated successfully.',
  REMARK_DELETED: 'Remark deleted successfully.',
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  DEAL_CREATED: 'Deal created successfully',
  STATUS_UPDATED: (count: number) => `Status updated for ${count} lead(s)`,
  STAFF_ASSIGNED: (count: number) => `Staff assigned to ${count} lead(s)`,
  STAFF_ASSIGNED_WITH_TASKS: (count: number, taskCount: number) =>
    `Staff assigned to ${count} lead(s). ${taskCount} open task(s) reassigned.`,
  LEADS_DELETED: (count: number) => `${count} lead(s) deleted successfully`,
  LEAD_RESTORED: 'Lead restored successfully',
  LEADS_RESTORED: (count: number) => `${count} lead(s) restored successfully`,
  LEADS_ASSIGNED_TO_CAMPAIGN: (count: number) => `${count} lead(s) assigned to campaign`,
} as const;

/**
 * Toast/inline copy shown when a lead/remark/task/deal/activity request fails.
 *
 * Used by:
 * - EnquiriesPage, LeadDetailDrawer, AddLeadDrawer, EnquiriesFilters and the
 *   enquiries data hooks (useLeadListData, useLeadRemarks, useLeadTasks,
 *   useLeadActivities, useLeadBulkActions)
 *
 * Notes:
 * - EXPORT_NOT_AVAILABLE/DUPLICATE_NOT_AVAILABLE are shown for toolbar actions
 *   the backend doesn't implement yet.
 */
export const ERROR_MESSAGES = {
  FETCH_LEADS: 'Failed to fetch leads',
  DELETE_LEAD: 'Failed to delete lead',
  UPDATE_LEAD: 'Failed to update lead. Please try again.',
  FETCH_ACTIVITIES: 'Failed to load activities.',
  FETCH_REMARKS: 'Failed to load remarks.',
  ADD_REMARK: 'Failed to add remark.',
  UPDATE_REMARK: 'Failed to update remark.',
  DELETE_REMARK: 'Failed to delete remark.',
  FETCH_TASKS: 'Failed to load tasks',
  ADD_TASK: 'Failed to add task',
  UPDATE_TASK: 'Failed to update task',
  DELETE_TASK: 'Failed to delete task',
  FETCH_DEALS: 'Failed to fetch deals',
  CREATE_DEAL: 'Failed to create deal',
  LOAD_FORM_OPTIONS: 'Failed to load form options. Please try again.',
  EXPORT_NOT_AVAILABLE: 'Export API not available',
  DUPLICATE_NOT_AVAILABLE: 'Duplicate Lead API not available',
  SELECT_AT_LEAST_ONE: 'Please select at least one lead',
  PARTIAL_SUCCESS: (successCount: number, failCount: number) => `${successCount} updated, ${failCount} failed`,
  PARTIAL_ASSIGN: (successCount: number, failCount: number) => `${successCount} assigned, ${failCount} failed`,
  PARTIAL_DELETE: (successCount: number, failCount: number) => `${successCount} deleted, ${failCount} failed`,
  RESTORE_LEAD: 'Failed to restore lead',
  PARTIAL_RESTORE: (successCount: number, failCount: number) => `${successCount} restored, ${failCount} failed`,
  ASSIGN_CAMPAIGN_FAILED: 'Failed to assign leads to campaign. Please try again.',
} as const;

export const REASSIGN_TASKS_PROMPT = {
  TITLE: 'Reassign open tasks?',
  WITH_COUNT: (taskCount: number, fromName: string, toName: string) =>
    `This lead has ${taskCount} open task(s) assigned to ${fromName}. Move them to ${toName} as well?`,
  WITHOUT_COUNT: (fromName: string, toName: string) =>
    `Move this lead's open tasks assigned to ${fromName} to ${toName} as well?`,
  SCOPE_NOTE: 'Completed tasks and tasks assigned to other people are not changed.',
  FALLBACK_FROM: 'the current assignee',
  FALLBACK_TO: 'the new assignee',
  CONFIRM_WITH_TASKS: 'Reassign lead & tasks',
  CONFIRM_LEAD_ONLY: 'Reassign lead only',
  CANCEL: 'Cancel',
  CLOSE: 'Close',
  BULK_CHECKBOX: "Also reassign each lead's open tasks from its current assignee",
} as const;
