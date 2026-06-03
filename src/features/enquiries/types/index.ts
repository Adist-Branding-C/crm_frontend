export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  assignedTo: string;
  purpose: string;
  type: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp: string;
}

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

import type { SortConfig } from '../../../shared/types/sort';
import type { Column } from '../../../shared/types/table';
import type { DateRange } from '../../../shared/types/common';

export interface EnquiriesFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export interface EnquiriesTableProps {
  data: Lead[];
  columns: Column[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  paginatedIds: number[];
  selectedIds: number[];
  onSelectAll: (ids: number[], checked: boolean) => void;
  onSelectRow: (id: number) => void;
  actionMenuOpen: number | null;
  actionMenuButtonRect: DOMRect | null;
  onSetActionMenuOpen: (id: number | null) => void;
  onSetActionMenuButtonRect: (rect: DOMRect | null) => void;
  onViewLead: (lead: Lead) => void;
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

import type { PaginationProps } from '../../../shared/types/pagination';

export interface EnquiriesPaginationProps extends PaginationProps {}
