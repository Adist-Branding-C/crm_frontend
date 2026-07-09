import type {
  LeadSourceItem,
  CreateLeadSourcePayload,
  UpdateLeadSourcePayload,
  CreateLeadSourceResponse,
  LeadSourceResponse,
} from '../types';

export interface UseLeadSourceCrudOptions {
  onError: (error: string | null) => void;
  onDeleteSuccess: (message: string) => void;
  onDropdownClose: () => void;
  refetch: () => Promise<void>;
}

export interface UseLeadSourceFormOptions {
  items: LeadSourceItem[];
  fetchData: (page: number, limit: number, search: string) => Promise<void>;
  createSource: (payload: CreateLeadSourcePayload) => Promise<CreateLeadSourceResponse>;
  updateSource: (id: string, payload: UpdateLeadSourcePayload) => Promise<LeadSourceResponse>;
  currentPage: number;
  rowsPerPage: number;
  searchQuery: string;
  resetPage: () => void;
  onError: (error: string | null) => void;
  onDropdownClose: () => void;
}
