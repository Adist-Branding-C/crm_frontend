import type { CallTaskFormData } from '../types/index';

/**
 * Blank form values for the Add Call Task drawer, and the fallback used by
 * `CallTaskMapper.toFormValues` when there's no editing item yet.
 *
 * Used by:
 * - CallTaskPage (Add drawer initial values)
 * - useCallTaskDrawer (via CallTaskMapper.toFormValues)
 */
export const ADD_CALL_TASK_INITIAL_VALUES: CallTaskFormData = {
  title: '',
  description: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  leadId: '',
  priority: '',
  status: '',
};
