import type { CsvColumn } from '../types/csv';

/**
 * Builds a CSV file from a list of rows and column definitions, then triggers a
 * browser download of it.
 *
 * Used by:
 * - useCampaignExport (campaigns feature's Export button)
 *
 * Notes:
 * - This exact build-CSV-and-download workflow is currently duplicated by hand
 *   across many of the reports/sub-pages/*.tsx pages. This shared version is the
 *   canonical implementation going forward; migrating those existing call sites
 *   onto it is separate, out-of-scope follow-up work.
 * - Coordinates Blob/URL/anchor-click, so it lives here rather than in utils/
 *   (utils/ is reserved for pure functions with no side effects).
 * - Column `value()` functions should return the raw field value — this helper
 *   quotes/escapes it as needed (RFC 4180 style). Do not pre-quote values in a
 *   column definition, or the output will be double-escaped.
 */
function escapeCsvField(value: string | number): string {
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCsv<T>(data: T[], columns: CsvColumn<T>[], filename: string): void {
  const csvContent = [
    columns.map((col) => escapeCsvField(col.header)).join(','),
    ...data.map((row) => columns.map((col) => escapeCsvField(col.value(row))).join(',')),
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
