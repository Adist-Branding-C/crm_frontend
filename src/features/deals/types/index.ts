export interface DealItem {
  id: number;
  dealId: string;
  dealName: string;
  lead: string;
  mobile: string;
  amount: number;
  status: string;
  type: string;
  startDate: string;
  endDate: string;
  agent: string;
  createdBy: string;
  createdAt: string;
}

import type { DateRange } from '../../../shared/types/common';

export interface DealFilters {
  status: string;
  type: string;
  dateRange: DateRange;
  assignedTo: string;
}

import type { SortDirection } from '../../../shared/constants/enums/sortDirection';
import type { Column } from '../../../shared/types/table';
import type { SortConfig } from '../../../shared/types/sort';

export interface DealsTableProps {
  data: DealItem[];
  columns: Column[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  paginatedIds: number[];
  selectedIds: number[];
  onSelectAll: (ids: number[], checked: boolean) => void;
  onSelectRow: (id: number) => void;
  actionMenuOpen: number | null;
  onSetActionMenuOpen: (id: number | null) => void;
  onEdit: (deal: DealItem) => void;
  onDelete: (id: number) => void;
}

export interface DealsFiltersProps {
  filters: DealFilters;
  onFilterChange: (filters: DealFilters) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export interface DealsToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  onSortDirection: (key: string, direction: SortDirection) => void;
  showSortDropdown: boolean;
  onSetShowSortDropdown: (v: boolean) => void;
  onExport: () => void;
  onAddDeal: () => void;
}

export interface DealsStatsBarProps {
  totalAmount: number;
  totalCount: number;
}

import type { PaginationProps } from '../../../shared/types/pagination';

export interface DealsPaginationProps extends PaginationProps {}
