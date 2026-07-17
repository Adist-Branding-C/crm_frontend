import { exportToCsv } from '../../../../shared/helpers/csvExport.helper';
import type { CsvColumn } from '../../../../shared/types/csv';
import type { DealStatusItem } from '../types/interface';

/**
 * Exports a list of deal status rows to a downloadable CSV.
 *
 * Used by:
 * - DealStatusPage.tsx
 *
 * Notes:
 * - Converts backend values (boolean status, uppercase stage enum) to display labels
 *   before writing to CSV so the exported file is human-readable.
 */
export function exportDealStatusRowsToCsv(items: DealStatusItem[], filename: string): void {
  const columns: CsvColumn<DealStatusItem & { slNo: number }>[] = [
    { header: 'Sl No', value: (row) => row.slNo },
    { header: 'Name', value: (row) => row.name ?? '' },
    { header: 'Stage', value: (row) => {
      if (row.stage === 'WIN') return 'Win';
      if (row.stage === 'LOSE') return 'Lose';
      if (row.stage === 'IN_PROGRESS') return 'In Progress';
      return row.stage || '-';
    }},
    { header: 'Status', value: (row) => row.status ? 'Active' : 'Inactive' },
  ];
  const rows = items.map((item, i) => ({ ...item, slNo: i + 1 }));
  exportToCsv(rows, columns, filename);
}
