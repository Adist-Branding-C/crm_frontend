/**
 * Formats a breach delay in hours into the compact late wording used by the
 * SLA Breach & Escalation report: sub-hour delays render in minutes, longer
 * delays in hours with one decimal only when needed.
 *
 * Used by:
 * - SlaBreachRow (SLA Breach & Escalation report)
 */
export function formatBreachDelay(hours: number | null | undefined): string {
  if (hours === null || hours === undefined) return '—';
  if (hours < 1) {
    return `${Math.max(1, Math.round(hours * 60))} min late`;
  }
  const wholeHours = hours % 1 === 0 ? hours.toFixed(0) : hours.toFixed(1);
  return `${wholeHours} hrs late`;
}