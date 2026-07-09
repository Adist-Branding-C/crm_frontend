import type {
  LeadStatusItem,
  CreateLeadStatusPayload,
  UpdateLeadStatusPayload,
  CreateLeadStatusResponse,
  LeadStatusResponse,
} from '../types';

export interface UseLeadStatusCrudOptions {
  onError: (error: string | null) => void;
  onDeleteSuccess: (message: string) => void;
  onDropdownClose: () => void;
  refetch: () => Promise<void>;
}

export interface UseLeadStatusFormOptions {
  items: LeadStatusItem[];
  fetchData: (page: number, limit: number, search: string) => Promise<void>;
  createStatus: (payload: CreateLeadStatusPayload) => Promise<CreateLeadStatusResponse>;
  updateStatus: (id: string, payload: UpdateLeadStatusPayload) => Promise<LeadStatusResponse>;
  currentPage: number;
  rowsPerPage: number;
  searchQuery: string;
  resetPage: () => void;
  onError: (error: string | null) => void;
  onDropdownClose: () => void;
}
