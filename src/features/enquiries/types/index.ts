import type { DateRange } from '../../../shared/types/common';
import type { Lead } from './lead.types';

export type { Lead, LeadType, LeadStatus, LeadSource, LeadPurpose } from './lead.types';

export interface Filters {
  type: string;
  dateRange: DateRange;
  filterByDate: string;
  enquirySource: string;
  enquiryPurpose: string;
  leadStatus: string;
  followupAdded: string;
  createdBy: string;
  assignedTo: string;
  leadType: string;
  location: string;
  remarks: string;
  date: string;
}

export interface EnquiriesFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
  onClose: () => void;
}
