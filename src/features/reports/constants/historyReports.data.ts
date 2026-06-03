import { ImportExportStatus } from '../../../shared/constants/enums';

import type { Column } from '../../../shared/types/table';

// LeadImportHistory

export interface ImportRow {
  id: number;
  dateTime: string;
  fileName: string;
  total: number;
  duplicate: number;
  invalid: number;
  imported: number;
  status: ImportExportStatus;
  [key: string]: string | number;
}

export const importHistoryData: ImportRow[] = [
  { id: 1, dateTime: '2024-01-25 10:30 AM', fileName: 'contacts_import_25Jan', total: 500, duplicate: 12, invalid: 5, imported: 483, status: ImportExportStatus.COMPLETED },
  { id: 2, dateTime: '2024-01-25 09:15 AM', fileName: 'leads_import_24Jan', total: 250, duplicate: 8, invalid: 2, imported: 240, status: ImportExportStatus.COMPLETED },
  { id: 3, dateTime: '2024-01-24 04:45 PM', fileName: 'bulk_contacts', total: 1000, duplicate: 45, invalid: 20, imported: 935, status: ImportExportStatus.COMPLETED },
  { id: 4, dateTime: '2024-01-24 02:20 PM', fileName: 'jan24_import', total: 150, duplicate: 3, invalid: 1, imported: 146, status: ImportExportStatus.FAILED },
  { id: 5, dateTime: '2024-01-23 11:00 AM', fileName: 'contacts_jan23', total: 300, duplicate: 15, invalid: 8, imported: 277, status: ImportExportStatus.COMPLETED },
  { id: 6, dateTime: '2024-01-23 10:00 AM', fileName: 'new_leads_import', total: 75, duplicate: 2, invalid: 0, imported: 73, status: ImportExportStatus.GENERATING },
  { id: 7, dateTime: '2024-01-22 05:30 PM', fileName: 'weekly_import', total: 450, duplicate: 20, invalid: 10, imported: 420, status: ImportExportStatus.COMPLETED },
  { id: 8, dateTime: '2024-01-22 03:15 PM', fileName: 'contacts_backup', total: 600, duplicate: 30, invalid: 15, imported: 555, status: ImportExportStatus.COMPLETED },
  { id: 9, dateTime: '2024-01-21 09:45 AM', fileName: 'jan21_import', total: 200, duplicate: 5, invalid: 3, imported: 192, status: ImportExportStatus.FAILED },
  { id: 10, dateTime: '2024-01-20 04:00 PM', fileName: 'contact_list', total: 350, duplicate: 18, invalid: 7, imported: 325, status: ImportExportStatus.COMPLETED },
];

export const importHistoryColumns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: ' SL No', label: '#', sortable: false },
  { key: 'dateTime', label: 'Date and Time', sortable: true },
  { key: 'fileName', label: 'File Name', sortable: true },
  { key: 'total', label: 'Total Records', sortable: true },
  { key: 'duplicate', label: 'Duplicate Records', sortable: true },
  { key: 'invalid', label: 'Invalid Records', sortable: true },
  { key: 'imported', label: 'Imported Records', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
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

// ImportHistoryDetail
export interface DetailRow {
  id: number;
  name: string;
  phone: string;
  email?: string;
  reason?: string;
  createdAt: string;
  meta: string;
  [key: string]: string | number | undefined;
}

export const importedData: DetailRow[] = [
  { id: 1, name: 'John Doe', phone: '+1 1234567890', email: 'john@example.com', reason: '', createdAt: '2024-01-25', meta: 'Source: Website' },
  { id: 2, name: 'Jane Smith', phone: '+91 9876543210', email: 'jane@test.com', reason: '', createdAt: '2024-01-25', meta: 'Source: Referral' },
  { id: 3, name: 'Mike Johnson', phone: '+1 5551234567', email: 'mike@company.com', reason: '', createdAt: '2024-01-24', meta: 'Source: Website' },
  { id: 4, name: 'Sarah Williams', phone: '+91 9988776655', email: 'sarah@example.com', reason: '', createdAt: '2024-01-24', meta: 'Source: Facebook' },
  { id: 5, name: 'Rahul Sharma', phone: '+91 9876543211', email: 'rahul@test.com', reason: '', createdAt: '2024-01-23', meta: 'Source: Website' },
];

export const duplicateData: DetailRow[] = [
  { id: 1, name: 'Duplicate User', phone: '+1 1234567890', email: 'dup1@example.com', reason: 'Duplicate Phone Number', createdAt: '2024-01-25', meta: 'Source: Website' },
  { id: 2, name: 'Existing Contact', phone: '+91 9876543210', email: 'existing@test.com', reason: 'Phone already exists', createdAt: '2024-01-25', meta: 'Source: Referral' },
];

export const failedData: DetailRow[] = [
  { id: 1, name: 'Invalid User', phone: '+1 0000000000', email: 'invalid@test.com', reason: 'Invalid Phone Number', createdAt: '2024-01-24', meta: 'Source: Website' },
  { id: 2, name: 'No Email', phone: '+91 1234567890', email: '', reason: 'Missing required field', createdAt: '2024-01-24', meta: 'Source: Facebook' },
  { id: 3, name: 'Bad Email', phone: '+91 5555555555', email: 'not-an-email', reason: 'Invalid email format', createdAt: '2024-01-23', meta: 'Source: Website' },
];

export const statsData = {
  total: 500,
  imported: 483,
  duplicates: 12,
  failed: 5
};

export const importDetailColumns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: ' SL No', label: '#', sortable: false },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone Number', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'reason', label: 'Reason', sortable: true },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'meta', label: 'Meta Data', sortable: true },
];
