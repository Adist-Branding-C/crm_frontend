import { STATUS_OPTIONS } from '../../../task/common/constants/statusOptions';
import { PRIORITY_OPTIONS } from '../../../task/common/constants/priorityOptions';
import type { LabelValuePair } from '../../../../shared/types/common';
import type {
  TaskActivityDateField,
  TaskActivityType,
} from '../types';

/**
 * Static option sources and display metadata for the Task Work / Activity
 * report's filter panel and row badges.
 *
 * Used by:
 * - TaskActivityReport (filter selects)
 * - TaskActivityRow (type / priority / status badge tones)
 *
 * Notes:
 * - Status options reuse the task feature's shared STATUS_OPTIONS (Pending /
 *   Completed); the backend matches the filter against the task's current
 *   stage name OR its raw status, so these are the only portable statuses
 *   across companies.
 * - Priority options reuse the shared PRIORITY_OPTIONS.
 * - ACTIVITY_DEFAULT_EXPORT_FILENAME doubles as the fallback when the
 *   backend's Content-Disposition header is missing on Excel export.
 */
export const ACTIVITY_DATE_FIELD_OPTIONS: LabelValuePair[] = [
  { value: 'created_at', label: 'Created' },
  { value: 'due_date', label: 'Due' },
  { value: 'completed_at', label: 'Completed' },
];

export const ACTIVITY_DEFAULT_DATE_FIELD: TaskActivityDateField = 'created_at';

export const ACTIVITY_TYPE_OPTIONS: { value: TaskActivityType; label: string }[] = [
  { value: 'one_time', label: 'One-time' },
  { value: 'recurring', label: 'Recurring' },
];

export const ACTIVITY_STATUS_OPTIONS: LabelValuePair[] = STATUS_OPTIONS;

export const ACTIVITY_PRIORITY_OPTIONS: LabelValuePair[] = PRIORITY_OPTIONS;

export const ACTIVITY_DEFAULT_EXPORT_FILENAME = 'task-activity-report.xlsx';

export const ACTIVITY_PRIORITY_TONES: Record<string, string> = {
  High: 'high',
  Medium: 'medium',
  Low: 'low',
};

export const ACTIVITY_TYPE_META: Record<TaskActivityType, string> = {
  one_time: 'neutral',
  recurring: 'accent',
};