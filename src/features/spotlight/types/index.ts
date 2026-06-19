import type { SortConfig } from '../../../shared/types/sort';
import type { Column } from '../../../shared/types/table';
import type { DateRange, LabelValuePair } from '../../../shared/types/common';
import type { SortDirection } from '../../../shared/constants/enums/sortDirection';
import type { PaginationProps } from '../../../shared/types/pagination';

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

export interface SpotlightLeadApi {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  address: string;
  notes: string;
  typeId: number;
  statusId: number;
  sourceId: number;
  purposeId: number;
  agentId: string;
  companyId: string;
  nextFollowUpDate: string | null;
  remark: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  createdByType: string | null;
  updatedBy: string | null;
  updatedByType: string | null;
  deletedBy: string | null;
  status: string;
  type: string;
  source: string;
  purpose: string;
  agentName: string;
}

export interface SpotlightFilters {
  type: string;
  dateRange: DateRange;
  filterByDate: string;
  enquirySource: string;
  enquiryPurpose: string;
  leadStatusId: string;
  followupAdded: string;
  createdBy: string;
  assignedTo: string;
  leadTypeId: string;
  location: string;
  remarks: string;
  date: string;
}

export interface SpotlightFilterOptions {
  leadTypes: LabelValuePair[];
  sources: LabelValuePair[];
  purposes: LabelValuePair[];
  statuses: LabelValuePair[];
  agents: LabelValuePair[];
}

export interface SpotlightFiltersProps {
  filters: SpotlightFilters;
  filterOptions: SpotlightFilterOptions;
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

export interface SpotlightPaginationProps extends PaginationProps {}

export interface SpotlightRequestParams {
  pageNumber?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: string;
  leadStatusId?: string;
  leadTypeId?: string;
  location?: string;
  enquirySource?: string;
  enquiryPurpose?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  dateFilterBy?: string;
}

export interface SpotlightStatistics {
  createdCount: number;
}

export interface SpotlightResponseData {
  items: SpotlightLeadApi[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  statistics: SpotlightStatistics;
}

export interface SpotlightApiResponse {
  status: boolean;
  message: string;
  data: SpotlightResponseData | null;
}
