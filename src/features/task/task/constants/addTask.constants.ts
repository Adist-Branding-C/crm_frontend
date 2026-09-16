import { RepeatType } from '../../common/constants/taskEnums';

/**
 * Blank form values for a new Task, used by the calendar's useCalendarAddTask to seed
 * the add-task form for a chosen date.
 *
 * Used by:
 * - useCalendarAddTask (calendar feature).
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
  repeatType: RepeatType.NEVER,
  repeatConfig: undefined as { dayOfWeek?: number; dayOfMonth?: number | 'last' } | undefined,
};
