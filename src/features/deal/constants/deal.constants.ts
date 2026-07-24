import type { CsvColumn } from '../../../shared/types/csv';
import type { DealFormData, DealItem } from '../types';

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


export const DEFAULT_EXPORT_FILENAME = 'Deals.xlsx';
