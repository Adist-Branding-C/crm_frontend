export interface SpotlightLead {
  id: number;
  name: string;
  phone: string;
  assignedTo: string;
  purpose: string;
  type: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp: string;
}

export interface SpotlightFilters {
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
import type { SortDirection } from '../../../shared/constants/enums/sortDirection';

export interface SpotlightFiltersProps {
  filters: SpotlightFilters;
  onFilterChange: (filters: SpotlightFilters) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export interface SpotlightTableProps {
  data: SpotlightLead[];
  columns: Column[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  paginatedIds: number[];
  selectedIds: number[];
  onSelectAll: (ids: number[], checked: boolean) => void;
  onSelectRow: (id: number) => void;
  actionMenuOpen: number | null;
  onSetActionMenuOpen: (id: number | null) => void;
  onViewLead: (lead: SpotlightLead) => void;
}

export interface SpotlightToolbarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  sortConfig: SortConfig;
  onSortDirection: (key: string, direction: SortDirection) => void;
  showSortDropdown: boolean;
  onSetShowSortDropdown: (v: boolean) => void;
  showActionsDropdown: boolean;
  onSetShowActionsDropdown: (v: boolean) => void;
  onCloseSortDropdown: () => void;
  onCloseActionsDropdown: () => void;
}

import type { PaginationProps } from '../../../shared/types/pagination';

export interface SpotlightPaginationProps extends PaginationProps {}
