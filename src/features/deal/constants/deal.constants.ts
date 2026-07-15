import type { CsvColumn } from '../../../shared/types/csv';
import type { DealFormData, DealItem } from '../types';

export const INITIAL_DEAL_FILTERS = {
  dateRange: { start: '', end: '' },
  filterByDate: '',
  status: '',
  type: '',
  assignedTo: '',
  additionalFields: {},
};

export const ADD_DEAL_INITIAL_VALUES: DealFormData = {
  dealName: '',
  lead: '',
  mobile: '',
  amount: '',
  status: '',
  type: '',
  stage: '',
  priority: '',
  assignedTo: '',
  startDate: '',
  endDate: '',
  notes: '',
};

export const DEAL_STATUS_OPTIONS = [
  { value: 'New', label: 'New' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Proposal', label: 'Proposal' },
  { value: 'Negotiation', label: 'Negotiation' },
  { value: 'Closed Won', label: 'Closed Won' },
  { value: 'Closed Lost', label: 'Closed Lost' },
];

export const DEAL_PRIORITY_OPTIONS = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Critical', label: 'Critical' },
];

export const DEAL_STAGE_OPTIONS = [
  { value: 'Lead', label: 'Lead' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Demo', label: 'Demo' },
  { value: 'Proposal', label: 'Proposal' },
  { value: 'Negotiation', label: 'Negotiation' },
  { value: 'Closed', label: 'Closed' },
];

export const DEAL_TYPE_OPTIONS = [
  { value: 'New Business', label: 'New Business' },
  { value: 'Existing Business', label: 'Existing Business' },
  { value: 'Renewal', label: 'Renewal' },
  { value: 'Upsell', label: 'Upsell' },
];

export const DEAL_CSV_COLUMNS: CsvColumn<DealItem>[] = [
  { header: 'Deal Id', value: (d) => d.dealId ?? '' },
  { header: 'Deal Name', value: (d) => `"${d.dealName ?? ''}"` },
  { header: 'Lead', value: (d) => `"${d.lead ?? ''}"` },
  { header: 'Amount', value: (d) => d.amount ?? '' },
  { header: 'Status', value: (d) => d.status ?? '' },
  { header: 'Type', value: (d) => d.type ?? '' },
  { header: 'Start Date', value: (d) => d.startDate ?? '' },
  { header: 'End Date', value: (d) => d.endDate ?? '' },
  { header: 'Agent', value: (d) => d.agent ?? '' },
  { header: 'Created By', value: (d) => d.createdBy ?? '' },
  { header: 'Created At', value: (d) => d.createdAt ?? '' },
];
