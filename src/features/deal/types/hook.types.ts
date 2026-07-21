import type { Dispatch, SetStateAction } from 'react';
import type { DealItem, DealFormData, DealStatusFilters } from './interface';
import type { SortConfig } from '../../../shared/types/sort';
import type { LabelValuePair } from '../../../shared/types/common';
import type { DealAdditionalFieldDef } from './interface';

export interface UseDealListReturn {
  dealList: DealItem[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  totalCount: number;
  totalPages: number;
  fetchDeals: (page: number, limit: number, search: string, extraParams?: Record<string, string | number>) => Promise<void>;
  refreshCurrentPage: () => void;
}

export interface UseDealCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (loading: boolean) => void;
    refresh: () => void;
  };
}

export interface UseDealCrudReturn {
  handleAddDeal: (values: DealFormData) => Promise<boolean>;
  handleUpdateDeal: (dealId: string, values: DealFormData) => Promise<boolean>;
  handleDeleteDeal: (dealId: string) => Promise<boolean>;
}

export interface UseDealFormSubmitParams {
  editingItem: DealItem | null;
  closeDrawer: () => void;
  handleAddDeal: (values: DealFormData) => Promise<boolean>;
  handleUpdateDeal: (dealId: string, values: DealFormData) => Promise<boolean>;
  dealAdditionalFieldDefs: DealAdditionalFieldDef[];
}

export interface UseDealFormSubmitReturn {
  handleAddSubmit: (values: import('../../../shared/types/drawers').DealFormData, helpers: import('formik').FormikHelpers<import('../../../shared/types/drawers').DealFormData>) => Promise<boolean>;
  handleEditSubmit: (values: import('../../../shared/types/drawers').DealFormData, helpers: import('formik').FormikHelpers<import('../../../shared/types/drawers').DealFormData>) => Promise<boolean>;
}

export interface UseDealFiltersReturn {
  filters: DealStatusFilters;
  showFilters: boolean;
  activeFiltersRef: React.MutableRefObject<Record<string, string | number>>;
  setFilters: (filters: DealStatusFilters) => void;
  setShowFilters: (v: boolean) => void;
  handleApplyFilters: () => void;
}

export interface UseDealFilterOptionsReturn {
  statusOptions: LabelValuePair[];
  typeOptions: LabelValuePair[];
  staffOptions: LabelValuePair[];
  isLoading: boolean;
}

export interface UseDealSortReturn {
  sortConfig: SortConfig;
  handleSort: (key: string) => void;
  handleSortDesc: (key: string) => void;
  handleSortAsc: (key: string) => void;
  resetSort: () => void;
}

export interface UseDealPaginationReturn {
  currentPage: number;
  rowsPerPage: number;
  startIndex: number;
  totalItems: number;
  handleSetCurrentPage: (page: number | ((prev: number) => number)) => void;
  handleRowsPerPageChange: (value: number) => void;
  resetPage: () => void;
}

export interface UseDealActionMenuReturn {
  openId: number | null;
  buttonRect: DOMRect | null;
  open: (id: number, rect: DOMRect) => void;
  close: () => void;
}

export interface UseDealSearchReturn {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  resetSearch: () => void;
}

export interface UseDealRowActionsReturn {
  handleDeleteFromRow: (deal: DealItem) => void;
  handleDeleteFromDrawer: (deal: DealItem) => void;
}
