import type { CsvColumn } from '../../../shared/types/csv';
import type { SpotlightLeadApi } from '../types';


export const INITIAL_FILTERS = {
  dateRange: { start: '', end: '' },
  filterByDate: '',
  enquirySource: '',
  enquiryPurpose: '',
  leadStatusId: '',
  assignedTo: '',
  leadTypeId: '',
  location: '',
  remarks: '',
};


export const DATE_FILTER_OPTIONS = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'updatedAt', label: 'Updated Date' },
  { value: 'nextFollowUpDate', label: 'Follow Up Date' },
];


export const COLUMNS = [
  { key: 'action', label: 'Action' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone', sortable: false },
  { key: 'assignedTo', label: 'Assigned To', sortable: false },
  { key: 'purpose', label: 'Purpose', sortable: false },
  { key: 'type', label: 'Type', sortable: false },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'source', label: 'Source', sortable: false },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'updatedAt', label: 'Updated At', sortable: true },
  { key: 'nextFollowUp', label: 'Next Follow Up', sortable: false },
];


export const SPOTLIGHT_CSV_COLUMNS: CsvColumn<SpotlightLeadApi>[] = [
  { header: 'Name', value: (l) => l.name },
  { header: 'Phone', value: (l) => l.phone },
  { header: 'Assigned To', value: (l) => l.assignedStaff?.name ?? '' },
  { header: 'Purpose', value: (l) => l.purpose?.purpose ?? '' },
  { header: 'Type', value: (l) => l.type?.type ?? '' },
  { header: 'Status', value: (l) => l.status?.status ?? '' },
  { header: 'Source', value: (l) => l.source?.source ?? '' },
  { header: 'Location', value: (l) => l.location ?? '' },
  { header: 'Created At', value: (l) => l.createdAt },
  { header: 'Updated At', value: (l) => l.updatedAt },
  { header: 'Next Follow Up', value: (l) => l.nextFollowUpDate ?? '' },
];
