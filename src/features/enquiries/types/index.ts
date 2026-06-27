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

export interface LeadApiItem {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  location: string | null;
  agent: string | null;
  assignedTo: string | null;
  purpose: string | null;
  type: string | null;
  status: string | null;
  source: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  nextFollowUpDate: string | null;
}

export interface PaginationInfo {
  pageNumber: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LeadListData {
  items: LeadApiItem[];
  pagination: PaginationInfo;
}

export interface LeadListResponse {
  status: boolean;
  message: string;
  data: LeadListData;
}

export interface ApiResponse {
  status: boolean;
  message: string;
}

export interface UpdateLeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  agentId?: string;
  purposeId?: string;
  typeId?: string;
  statusId?: string;
  sourceId?: string;
  nextFollowUp?: string;
  notes?: string;
  location?: string;
  address?: string;
}

export interface CreateLeadPayload {
  name: string;
  phone: string;
  email: string;
  agentId: string;
  purposeId: string;
  typeId: string;
  statusId: string;
  sourceId: string;
  nextFollowUp: string;
  notes: string;
  location: string;
  address: string;
}

export interface CreateLeadResponse {
  status: boolean;
  message: string;
  data: {
    leadId: string;
  };
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
  onApplyFilters: () => void;
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
