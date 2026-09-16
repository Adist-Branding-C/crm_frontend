import {
  ACTIVITY_PRIORITY_TONES,
  ACTIVITY_TYPE_META,
} from '../constants/taskActivity.data';
import type { TaskActivityType } from '../types';

const STATUS_TONES: Record<string, string> = {
  Completed: 'completed',
  Pending: 'pending',
};

/**
 * Maps a task priority string to the report-priority pill tone class suffix.
 * Unknown values fall back to the neutral Low tone so no priority can render
 * unstyled.
 *
 * Used by:
 * - TaskActivityRow
 */
export function getActivityPriorityTone(priority: string): string {
  return ACTIVITY_PRIORITY_TONES[priority] ?? 'low';
}

/**
 * Maps a task type to its badge tone class suffix.
 *
 * Used by:
 * - TaskActivityRow
 */
export function getActivityTypeTone(type: TaskActivityType): string {
  return ACTIVITY_TYPE_META[type] ?? 'neutral';
}

/**
 * Maps the report status (current stage name or raw task status) to a badge
 * tone class suffix. Stage names are workflow-specific and unknown ahead of
 * time, so only the portable Pending/Completed statuses get a distinct tint
 * and everything else falls back to the plain badge style.
 *
 * Used by:
 * - TaskActivityRow
 */
export function getActivityStatusTone(status: string | null): string {
  if (!status) return '';
  return STATUS_TONES[status] ?? '';
}

/**
 * Produces the up-to-first-N tag labels plus a "+N more" count for any
 * overflow, so long tag lists render truncated instead of wrapping.
 *
 * Used by:
 * - TaskActivityRow
 */
export function getVisibleTags(tags: string[], max = 2): {
  visible: string[];
  overflowCount: number;
} {
  const visible = tags.slice(0, max);
  return { visible, overflowCount: tags.length - visible.length };
}