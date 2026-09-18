/**
 * Formats a duration stored in hours into a compact "Xd Yh" / "Xh" label for
 * the Task Team Performance report table. Returns an em-dash for missing or
 * non-finite values.
 *
 * Used by:
 * - TeamPerformanceRollupRow
 * - TeamPerformanceStaffRow
 */
export function formatCompactTaskDuration(hours: number | null): string {
  if (hours === null || !Number.isFinite(hours) || hours < 0) return '—';
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainderHours = Math.round(hours % 24);
    return `${days}d ${remainderHours}h`;
  }
  return `${Math.round(hours)}h`;
}
