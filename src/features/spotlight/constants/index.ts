export const INITIAL_FILTERS = {
  type: '',
  dateRange: { start: '', end: '' },
  filterByDate: '',
  enquirySource: '',
  enquiryPurpose: '',
  leadStatusId: '',
  followupAdded: '',
  createdBy: '',
  assignedTo: '',
  leadTypeId: '',
  location: '',
  remarks: '',
  date: '',
};

export const DATE_FILTER_OPTIONS = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'updatedAt', label: 'Updated Date' },
  { value: 'nextFollowUpDate', label: 'Follow Up Date' },
];

export const COLUMNS = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone', sortable: true },
  { key: 'assignedTo', label: 'Assigned To', sortable: true },
  { key: 'purpose', label: 'Purpose', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'updatedAt', label: 'Updated At', sortable: true },
  { key: 'nextFollowUp', label: 'Next Follow Up', sortable: true },
];
