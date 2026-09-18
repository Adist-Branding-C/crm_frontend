import type { DealTaskFormData } from '../types/index';
import { RepeatType } from '../../common/constants/taskEnums';

/**
 * Blank form values for a new Deal Task, used by the calendar's useCalendarAddTask
 * to seed the add-task form for a chosen date.
 *
 * Used by:
 * - useCalendarAddTask (calendar feature).
 */
export const ADD_DEAL_TASK_INITIAL_VALUES: DealTaskFormData = {
  title: '',
  description: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  dealId: '',
  priority: '',
  status: '',
  repeatType: RepeatType.NEVER,
  repeatConfig: undefined,
};
