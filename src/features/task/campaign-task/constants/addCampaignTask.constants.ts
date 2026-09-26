import type { CampaignTaskFormData } from '../types/index';
import { RepeatType } from '../../common/constants/taskEnums';

/**
 * Blank form values for a new Campaign Task, used by the calendar's useCalendarAddTask
 * to seed the add-task form for a chosen date.
 *
 * Used by:
 * - useCalendarAddTask (calendar feature).
 */
export const ADD_CAMPAIGN_TASK_INITIAL_VALUES: CampaignTaskFormData = {
  title: '',
  description: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  campaignId: '',
  priority: '',
  status: '',
  repeatType: RepeatType.NEVER,
  repeatConfig: undefined,
};
