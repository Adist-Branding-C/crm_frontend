import type { Dispatch, SetStateAction } from 'react';
import type { Lead } from './index';
import type { Filters } from './index';
import type { SortConfig } from '../../../shared/types/sort';

export interface UseLeadBulkActionsOptions {
  selectedIds: number[];
  onRefresh: () => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
  onClearSelection: Dispatch<SetStateAction<number[]>>;
}

export interface UseLeadToastReturn {
  toastMessage: string;
  toastType: 'success' | 'error';
  showToast: boolean;
  showToastMessage: (message: string, type: 'success' | 'error') => void;
  setShowToast: (v: boolean) => void;
  clearToast: () => void;
}

export interface UseLeadCrudReturn {
  leads: Lead[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  deleteTargetLead: Lead | null;
  isDeleting: boolean;
  fetchLeads: (page: number, limit: number, search: string, extraParams?: Record<string, string | number>) => Promise<void>;
  handleDeleteClick: (lead: Lead) => void;
  handleConfirmDelete: () => Promise<void>;
  handleCloseDelete: () => void;
  refreshCurrentPage: () => void;
}

export interface UseLeadPaginationReturn {
  searchQuery: string;
  currentPage: number;
  rowsPerPage: number;
  startIndex: number;
  totalItems: number;
  setSearchQuery: (v: string) => void;
  handleSetCurrentPage: (page: number | ((prev: number) => number)) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  resetPage: () => void;
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
  clearFilters: () => void;
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
  handleSendFollowUp: () => void;
  handleDuplicateLeadAction: () => void;
}
