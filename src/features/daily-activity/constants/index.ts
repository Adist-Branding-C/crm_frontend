import { formatActivityType } from '../utils/activityHelpers';
import type { Filters, StaffOption, ActivityTypeOption } from '../types';

/**
 * Synthetic "All Staff" option prepended to the live-fetched staff list.
 *
 * Used by:
 * - useStaffOptions (default + fallback entry).
 *
 * Notes:
 * - '' means "no actorId filter applied".
 */
export const ALL_STAFF_OPTION: StaffOption = { id: '', name: 'All Staff' };

const ACTIVITY_TYPE_ENUMS = [
  'CREATED',
  'UPDATED',
  'DELETED',
  'ASSIGNED',
  'UNASSIGNED',
  'STATUS_CHANGED',
  'PIPELINE_CHANGED',
  'STAGE_CHANGED',
  'PRIORITY_CHANGED',
  'COMMENT_ADDED',
  'COMMENT_UPDATED',
  'COMMENT_DELETED',
  'FOLLOWUP_CREATED',
  'FOLLOWUP_UPDATED',
  'FOLLOWUP_COMPLETED',
  'CALL_LOGGED',
  'EMAIL_SENT',
  'WHATSAPP_SENT',
  'TASK_CREATED',
  'TASK_COMPLETED',
  'DEAL_CREATED',
  'DEAL_WON',
  'DEAL_LOST',
  'CUSTOM_FIELD_UPDATED',
] as const;

/**
 * Activity-type filter dropdown options, mirroring the backend ActivityType enum.
 *
 * Used by:
 * - DailyActivityPage (passed to ActivityTypeFilter).
 */
export const activityTypes: ActivityTypeOption[] = [
  { value: '', label: 'All' },
  ...ACTIVITY_TYPE_ENUMS.map((value) => ({ value, label: formatActivityType(value) })),
];

/**
 * Default/reset state for the activity filter panel.
 *
 * Used by:
 * - useActivityFilters (initial state and reset target).
 */
export const DEFAULT_FILTERS: Filters = {
  date: '',
  startTime: '',
  endTime: '',
  staff: '',
};

/**
 * Number of page-number buttons shown on either side of the current page in
 * the windowed pagination control.
 *
 * Used by:
 * - useDailyActivityData (computePageNumbers call).
 */
export const PAGE_WINDOW = 2;
