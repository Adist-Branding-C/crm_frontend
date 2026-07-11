import { exportToCsv } from '../../../../shared/helpers/csvExport.helper';
import type { CsvColumn } from '../../../../shared/types/csv';

interface NameStatusItem {
  name?: string;
  status: boolean;
}

/**
 * Exports a list of {name, status} rows to a downloadable CSV.
 *
 * Used by:
 * - DealStatusPage.tsx
 * - DealTypePage.tsx
 *
 * Notes:
 * - Pure data shaping plus a browser download trigger - no hooks or component state involved,
 *   so it lives in helpers/ rather than a hook, per the component-responsibility standard.
 */
export function exportNameStatusRowsToCsv<T extends NameStatusItem>(items: T[], filename: string): void {
  const columns: CsvColumn<T & { slNo: number }>[] = [
    { header: 'Sl No', value: (row) => row.slNo },
    { header: 'Name', value: (row) => row.name ?? '' },
    { header: 'Status', value: (row) => row.status ? 'Active' : 'Inactive' },
  ];
  const rows = items.map((item, i) => ({ ...item, slNo: i + 1 }));
  exportToCsv(rows, columns, filename);
}
