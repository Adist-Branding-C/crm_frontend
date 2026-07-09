import type { RefObject } from 'react';
import type { Lead } from './index';
import type { Filters } from './index';
import type { Column } from '../../../shared/types/table';
import type { SortConfig } from '../../../shared/types/sort';
import type { PaginationProps } from '../../../shared/types/pagination';

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
  onEditLead: (lead: Lead) => void;
  onDeleteLead: (lead: Lead) => void;
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
  sortDropdownRef: RefObject<HTMLDivElement | null>;
  onSetShowSortDropdown: (v: boolean) => void;
  onCloseSortDropdown: () => void;
  showActionsDropdown: boolean;
  actionsDropdownClosing: boolean;
  actionsDropdownRef: RefObject<HTMLDivElement | null>;
  onSetShowActionsDropdown: (v: boolean) => void;
  onCloseActionsDropdown: () => void;
  onAddLead: () => void;
  selectedCount: number;
  onExportSelected: () => void;
  onChangeStatus: () => void;
  onAssignStaff: () => void;
  onSendFollowUp: () => void;
  onDuplicateLead: () => void;
  onDeleteSelected: () => void;
}

export interface EnquiriesFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export interface EnquiriesPaginationProps extends PaginationProps {}
