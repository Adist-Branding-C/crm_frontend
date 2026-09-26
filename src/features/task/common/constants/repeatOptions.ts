import type { LabelValuePair } from '../../../../shared/types/common';
import { RepeatType } from './taskEnums';

export const REPEAT_TYPE_OPTIONS: LabelValuePair[] = [
  { value: RepeatType.NEVER, label: 'Never' },
  { value: RepeatType.DAILY, label: 'Daily' },
  { value: RepeatType.WEEKLY, label: 'Weekly' },
  { value: RepeatType.MONTHLY, label: 'Monthly' },
];

export const WEEK_DAY_OPTIONS: LabelValuePair[] = [
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
  { value: '7', label: 'Sunday' },
];

export const MONTHLY_LAST_DAY_VALUE = 'last';

export const REPEAT_TYPE_BADGE_CLASS: Record<string, string> = {
  [RepeatType.DAILY]: 'badge-recurring-daily',
  [RepeatType.WEEKLY]: 'badge-recurring-weekly',
  [RepeatType.MONTHLY]: 'badge-recurring-monthly',
};