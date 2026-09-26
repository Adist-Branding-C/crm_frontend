import type { RecurringTaskComplianceRow } from '../types';

export function formatExpectedActual(row: RecurringTaskComplianceRow): string {
  return `${row.expectedOccurrences} / ${row.actualOccurrences}`;
}

export function getComplianceTone(rate: number): 'green' | 'yellow' | 'red' {
  if (rate >= 90) return 'green';
  if (rate >= 70) return 'yellow';
  return 'red';
}

export function isRecurrenceStale(
  lastGeneratedAt: string | null | undefined,
  recurrenceIntervalHours: number | null | undefined,
): boolean {
  if (!lastGeneratedAt) return true;
  if (recurrenceIntervalHours == null || recurrenceIntervalHours <= 0) return false;
  const last = new Date(lastGeneratedAt);
  if (isNaN(last.getTime())) return true;
  return Date.now() - last.getTime() > recurrenceIntervalHours * 3_600_000;
}
