import type { DealTaskFormData } from '../types/index';

/**
 * Blank form values for the Add Deal Task drawer, and the fallback used by
 * `DealTaskMapper.toFormValues` when there's no editing item yet.
 *
 * Used by:
 * - DealTaskPage (Add drawer initial values)
 * - useDealTaskDrawer (via DealTaskMapper.toFormValues)
 */
export const ADD_DEAL_TASK_INITIAL_VALUES: DealTaskFormData = {
  title: '',
  description: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  leadId: '',
  priority: '',
  status: '',
};
