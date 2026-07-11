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
    LEAD_DELETED: 'Lead deleted successfully',
    REMARK_ADDED: 'Remark added successfully.',
    REMARK_UPDATED: 'Remark updated successfully.',
    REMARK_DELETED: 'Remark deleted successfully.',
    TASK_CREATED: 'Task created successfully',
    TASK_UPDATED: 'Task updated successfully',
    TASK_DELETED: 'Task deleted successfully',
    DEAL_CREATED: 'Deal created successfully',
    STATUS_UPDATED: (count) => `Status updated for ${count} lead(s)`,
    STAFF_ASSIGNED: (count) => `Staff assigned to ${count} lead(s)`,
    LEADS_DELETED: (count) => `${count} lead(s) deleted successfully`,
};
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
    PARTIAL_SUCCESS: (successCount, failCount) => `${successCount} updated, ${failCount} failed`,
    PARTIAL_ASSIGN: (successCount, failCount) => `${successCount} assigned, ${failCount} failed`,
    PARTIAL_DELETE: (successCount, failCount) => `${successCount} deleted, ${failCount} failed`,
};
//# sourceMappingURL=messages.js.map