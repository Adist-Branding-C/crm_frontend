/**
 * Threshold helpers for the Task Team Performance report's colour-coded
 * completion and SLA breach rate cells.
 *
 * Used by:
 * - TeamPerformanceRollupRow
 * - TeamPerformanceStaffRow
 */

export type PerformanceTone = 'green' | 'yellow' | 'red';

export function getCompletionRateTone(rate: number): PerformanceTone {
  if (rate >= 85) return 'green';
  if (rate >= 60) return 'yellow';
  return 'red';
}

export function getSlaBreachRateTone(rate: number): PerformanceTone {
  if (rate < 10) return 'green';
  if (rate <= 25) return 'yellow';
  return 'red';
}
