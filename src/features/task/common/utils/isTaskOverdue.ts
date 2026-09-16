import { STATUS_COMPLETED } from '../../../../shared/constants/statuses';

/**
 * Determines whether a task has passed its scheduled date/time and is still
 * open. Completed (and only completed - the task status domain is strictly
 * Pending | Completed) tasks are never flagged even when their schedule is in
 * the past.
 *
 * @param scheduledDate - 'YYYY-MM-DD' as returned by the backend task mappers.
 * @param scheduledTime - 24h 'HH:mm[[:ss]]' as returned by the backend task
 *   mappers; when empty the task is judged at start-of-day.
 * @param status        - task status value ('Pending' | 'Completed').
 *
 * Used by:
 * - UnifiedTaskRow (task table Status cell)
 * - TaskCard (kanban card)
 */
export function isTaskOverdue(scheduledDate: string, scheduledTime: string, status: string): boolean {
  if (!scheduledDate || status === STATUS_COMPLETED) return false;

  const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime || '00:00'}`);
  if (isNaN(scheduledDateTime.getTime())) return false;

  return scheduledDateTime.getTime() < Date.now();
}