import type { LabelValuePair } from '../../../../shared/types/common';

export const REPEAT_TYPE_OPTIONS: LabelValuePair[] = [
  { value: 'Never', label: 'Never' },
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' },
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
  Daily: 'badge-recurring-daily',
  Weekly: 'badge-recurring-weekly',
  Monthly: 'badge-recurring-monthly',
};