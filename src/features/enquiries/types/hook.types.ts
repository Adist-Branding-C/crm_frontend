import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { Lead, AdditionalFieldDef } from './index';
import type { Filters } from './index';
import type { SortConfig } from '../../../shared/types/sort';
import type { LabelValuePair } from '../../../shared/types/common';

export interface UseLeadBulkActionsOptions {
  selectedIds: string[];
  onRefresh: () => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
  onClearSelection: Dispatch<SetStateAction<string[]>>;
}

export interface UseLeadListDataReturn {
  leads: Lead[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  fetchLeads: (page: number, limit: number, search: string, extraParams?: Record<string, string | number>) => Promise<void>;
  refreshCurrentPage: () => void;
  deleteLead: (leadId: string) => Promise<boolean>;
  handleLeadSaved: (action: 'created' | 'updated') => void;
}

export interface UseLeadPaginationReturn {
  currentPage: number;
  rowsPerPage: number;
  startIndex: number;
  totalItems: number;
  handleSetCurrentPage: (page: number | ((prev: number) => number)) => void;
  handleRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  resetPage: () => void;
}

export interface UseLeadSearchReturn {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  resetSearch: () => void;
}

export interface UseLeadSortReturn {
  sortConfig: SortConfig;
  handleSort: (key: string) => void;
  handleSortDesc: (key: string) => void;
  handleSortAsc: (key: string) => void;
  resetSort: () => void;
}

export interface UseLeadFiltersReturn {
  filters: Filters;
  showFilters: boolean;
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>;
  setFilters: (filters: Filters) => void;
  setShowFilters: (v: boolean) => void;
  handleApplyFilters: () => void;
}

export interface UseLeadActionMenuReturn {
  openId: string | null;
  buttonRect: DOMRect | null;
  open: (id: string, rect: DOMRect) => void;
  close: () => void;
}

export interface UseLeadRowActionsReturn {
  handleDeleteFromRow: (lead: Lead) => void;
  handleDeleteFromDrawer: (lead: Lead) => void;
}

export interface UseLeadFilterOptionsReturn {
  typeOptions: LabelValuePair[];
  sourceOptions: LabelValuePair[];
  purposeOptions: LabelValuePair[];
  staffOptions: LabelValuePair[];
  statusOptions: LabelValuePair[];
  additionalFields: AdditionalFieldDef[];
  isLoading: boolean;
}

export interface UseLeadBulkActionsReturn {
  showChangeStatusModal: boolean;
  showAssignStaffModal: boolean;
  showDeleteSelectedModal: boolean;
  isProcessingSelected: boolean;
  setShowChangeStatusModal: (v: boolean) => void;
  setShowAssignStaffModal: (v: boolean) => void;
  setShowDeleteSelectedModal: (v: boolean) => void;
  handleChangeStatusClick: () => void;
  handleConfirmChangeStatus: (statusId: string) => Promise<void>;
  handleAssignStaffClick: () => void;
  handleConfirmAssignStaff: (agentId: string) => Promise<void>;
  handleDeleteSelectedClick: () => void;
  handleConfirmDeleteSelected: () => Promise<void>;
  handleExportSelected: () => void;
  handleDuplicateLeadAction: () => void;
}
