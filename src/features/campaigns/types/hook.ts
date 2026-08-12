import type { Campaign } from './interface';

export type CampaignSortField = 'createdAt' | 'name' | 'progress';

export interface CampaignFilters {
  type?: string | undefined;
  agentId?: string | undefined;
  createdBy?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: Campaign | null;
  deletingItem: Campaign | null;
}

export interface FetchHandlers {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  setPageNumber: (page: number) => void;
  setSearchQuery: (q: string) => void;
  refresh: () => void;
  campaignList: Campaign[];
}

export interface ToastHandlers {
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}
