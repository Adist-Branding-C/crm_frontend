import type { CallTaskFormData } from '../types/index';
import { RepeatType } from '../../common/constants/taskEnums';

/**
 * Blank form values for a new Call Task, used by the calendar's useCalendarAddTask
 * to seed the add-task form for a chosen date.
 *
 * Used by:
 * - useCalendarAddTask (calendar feature).
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
  repeatType: RepeatType.NEVER,
  repeatConfig: undefined,
};
