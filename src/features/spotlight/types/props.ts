import type { SortConfig } from '../../../shared/types/sort';
import type { Column } from '../../../shared/types/table';
import type { PaginationProps } from '../../../shared/types/pagination';
import type { SortDirection } from '../../../shared/constants/enums/sortDirection';
import type { UpdateLeadPayload } from '../../enquiries/types/request';
import type {
  SpotlightLead,
  SpotlightFilters,
  SpotlightFilterOptions,
} from './interface';

export interface SpotlightFiltersProps {
  filters: SpotlightFilters;
  filterOptions: SpotlightFilterOptions;
  isLoading: boolean;
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
  onToggleMenu: (id: number, open: boolean) => void;
  onViewLead: (lead: SpotlightLead) => void;
  loading: boolean;
  fieldOptions: SpotlightFilterOptions;
  onFieldSave: (leadId: string, payload: UpdateLeadPayload) => Promise<boolean>;
}

export interface SpotlightTableRowProps {
  row: SpotlightLead;
  isSelected: boolean;
  isMenuOpen: boolean;
  onSelectRow: (id: number) => void;
  onToggleMenu: (open: boolean) => void;
  onViewLead: (row: SpotlightLead) => void;
  fieldOptions: SpotlightFilterOptions;
  onFieldSave: (leadId: string, payload: UpdateLeadPayload) => Promise<boolean>;
}

export interface SpotlightToolbarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  sortConfig: SortConfig;
  onSelectSort: (key: string, direction: SortDirection) => void;
  showSortDropdown: boolean;
  onToggleSortDropdown: () => void;
  onExport: () => void;
  isExporting: boolean;
}

export interface SpotlightPaginationProps extends PaginationProps {}
