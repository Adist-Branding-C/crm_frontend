/**
 * Formats a duration stored in hours into a compact "days"/"hrs" label for
 * report tables, returning an em-dash placeholder for missing/invalid ages.
 *
 * Used by:
 * - TaskSummaryReport (avg. time to complete)
 * - TaskPipelineDistributionReport (avg./oldest age in stage, incl. chart tooltip)
 *
 * Notes:
 * - Null and non-finite values render as a dash since empty stages carry no age.
 */
export function formatTaskDuration(hours: number | null): string {
  if (hours === null || !Number.isFinite(hours) || hours < 0) return '—';
  if (hours >= 24) {
    const days = hours / 24;
    return `${days % 1 === 0 ? days.toFixed(0) : days.toFixed(1)} days`;
  }
  return `${hours % 1 === 0 ? hours.toFixed(0) : hours.toFixed(1)} hrs`;
}