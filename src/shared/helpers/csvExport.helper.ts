import type { CsvColumn } from '../types/csv';

/**
 * Escapes a single value for safe inclusion in a CSV file per RFC 4180.
 * - Converts the value to a string
 * - Doubles any embedded double-quote characters
 * - Wraps the value in double quotes if it contains a comma, double quote, or newline
 */
function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Builds a CSV file from a list of rows and column definitions, then triggers a
 * browser download of it.
 *
 * Used by:
 * - useCampaignExport (campaigns feature's Export button)
 * - CallReasonPage, CallStatusPage, MeetingOutcomePage, TaskCategoryPage
 *
 * Notes:
 * - Every cell value is escaped centrally via escapeCsvValue, so column definitions
 *   should return plain strings/numbers without manual quoting.
 * - Coordinates Blob/URL/anchor-click, so it lives here rather than in utils/
 *   (utils/ is reserved for pure functions with no side effects).
 */
export function exportToCsv<T>(data: T[], columns: CsvColumn<T>[], filename: string): void {
  const csvContent = [
    columns.map((col) => escapeCsvValue(col.header)).join(','),
    ...data.map((row) => columns.map((col) => escapeCsvValue(col.value(row))).join(',')),
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
