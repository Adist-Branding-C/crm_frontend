import type { SortConfig } from '../../../shared/types/sort';
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

export interface EnquiriesToolbarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  sortConfig: SortConfig;
  onSortDesc: (key: string) => void;
  onSortAsc: (key: string) => void;
  showSortDropdown: boolean;
  sortDropdownClosing: boolean;
  sortDropdownRef: React.RefObject<HTMLDivElement | null>;
  onSetShowSortDropdown: (v: boolean) => void;
  onCloseSortDropdown: () => void;
  showActionsDropdown: boolean;
  actionsDropdownClosing: boolean;
  actionsDropdownRef: React.RefObject<HTMLDivElement | null>;
  onSetShowActionsDropdown: (v: boolean) => void;
  onCloseActionsDropdown: () => void;
  onAddLead: () => void;
}
