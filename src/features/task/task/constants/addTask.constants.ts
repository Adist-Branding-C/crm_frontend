/**
 * Blank form values for the Add Task drawer, and the fallback used by
 * `TaskMapper.toFormValues` when there's no editing item yet.
 *
 * Used by:
 * - TaskPage (Add drawer initial values)
 * - TaskMapper.toFormValues
 */
export const ADD_TASK_INITIAL_VALUES = {
  title: '',
  description: '',
  categoryId: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  leadId: '',
  priority: '',
  status: '',
};
