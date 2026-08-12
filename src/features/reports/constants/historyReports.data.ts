import { ImportExportStatus } from '../../../shared/constants/enums';

import type { Column } from '../../../shared/types/table';

// LeadImportHistory - column definitions only; row data comes from the real
// API (useImportHistoryData / useImportHistoryDetail) now. No "Duplicate
// Records" column/tab - duplicate-phone detection isn't implemented.
export const importHistoryColumns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: ' SL No', label: '#' },
  { key: 'dateTime', label: 'Date and Time' },
  { key: 'fileName', label: 'File Name' },
  { key: 'total', label: 'Total Records' },
  { key: 'invalid', label: 'Failed Records' },
  { key: 'imported', label: 'Imported Records' },
  { key: 'status', label: 'Status' },
];

// LeadExportHistory
export interface ExportRow {
  id: number;
  dateTime: string;
  fileName: string;
  status: ImportExportStatus;
  [key: string]: string | number;
}

export const exportHistoryData: ExportRow[] = [
  { id: 1, dateTime: '2024-01-25 10:30 AM', fileName: 'leads_export_25Jan2024', status: ImportExportStatus.COMPLETED },
  { id: 2, dateTime: '2024-01-25 09:15 AM', fileName: 'leads_export_24Jan2024', status: ImportExportStatus.COMPLETED },
  { id: 3, dateTime: '2024-01-24 04:45 PM', fileName: 'export_jan24', status: ImportExportStatus.COMPLETED },
  { id: 4, dateTime: '2024-01-24 02:20 PM', fileName: 'leads_backup', status: ImportExportStatus.FAILED },
  { id: 5, dateTime: '2024-01-23 11:00 AM', fileName: 'jan23_export', status: ImportExportStatus.COMPLETED },
  { id: 6, dateTime: '2024-01-23 10:00 AM', fileName: 'leads_23jan', status: ImportExportStatus.GENERATING },
  { id: 7, dateTime: '2024-01-22 05:30 PM', fileName: 'weekly_export', status: ImportExportStatus.COMPLETED },
  { id: 8, dateTime: '2024-01-22 03:15 PM', fileName: 'leads_jan22', status: ImportExportStatus.COMPLETED },
  { id: 9, dateTime: '2024-01-21 09:45 AM', fileName: 'export_file', status: ImportExportStatus.FAILED },
  { id: 10, dateTime: '2024-01-20 04:00 PM', fileName: 'backup_jan20', status: ImportExportStatus.COMPLETED },
];

export const exportHistoryColumns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: ' SL No', label: '#', sortable: false },
  { key: 'dateTime', label: 'Date and Time', sortable: true },
  { key: 'fileName', label: 'File Name', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'download', label: 'Download', sortable: false },
];

// ImportHistoryDetail - column definitions only; rows are the real
// lead_entries data for one import (useImportHistoryDetail). Only Imported
// and Failed tabs exist - no Duplicates tab, same reasoning as above.
export const importDetailColumns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: ' SL No', label: '#' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'source', label: 'Source' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'assignedTo', label: 'Assigned To' },
  { key: 'reason', label: 'Reason' },
  { key: 'createdAt', label: 'Created At' },
];
