import { exportToCsv } from '../../../../shared/helpers/csvExport.helper';
import type { CsvColumn } from '../../../../shared/types/csv';
import type { DealAdditionalField } from '../types/interface';

const DEAL_ADDITIONAL_FIELD_CSV_COLUMNS: CsvColumn<DealAdditionalField & { slNo: number }>[] = [
  { header: 'Sl No', value: (row) => row.slNo },
  { header: 'Field', value: (row) => row.field },
  { header: 'Type', value: (row) => row.type },
  { header: 'In Filter', value: (row) => String(row.inFilter) },
  { header: 'In List', value: (row) => String(row.inList) },
  { header: 'Required', value: (row) => String(row.required) },
];

/**
 * Exports the deal additional-field list to a downloadable CSV.
 *
 * Used by:
 * - DealAdditionalFieldPage.tsx
 *
 * Notes:
 * - Pure data shaping plus a browser download trigger - no hooks or component state involved,
 *   so it lives in helpers/ rather than a hook, per the component-responsibility standard.
 */
export function exportDealAdditionalFieldsToCsv(items: DealAdditionalField[]): void {
  const rows = items.map((item, i) => ({ ...item, slNo: i + 1 }));
  exportToCsv(rows, DEAL_ADDITIONAL_FIELD_CSV_COLUMNS, 'deal-additional-fields.csv');
}
