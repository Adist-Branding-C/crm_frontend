import type {
  LeadPurposeItem,
  CreateLeadPurposePayload,
  UpdateLeadPurposePayload,
  CreateLeadPurposeResponse,
  LeadPurposeResponse,
} from '../types';

export interface UseLeadPurposeCrudOptions {
  onError: (error: string | null) => void;
  onDeleteSuccess: (message: string) => void;
  onDropdownClose: () => void;
  refetch: () => Promise<void>;
}

export interface UseLeadPurposeFormOptions {
  items: LeadPurposeItem[];
  fetchData: (page: number, limit: number, search: string) => Promise<void>;
  createPurpose: (payload: CreateLeadPurposePayload) => Promise<CreateLeadPurposeResponse>;
  updatePurpose: (id: string, payload: UpdateLeadPurposePayload) => Promise<LeadPurposeResponse>;
  currentPage: number;
  rowsPerPage: number;
  searchQuery: string;
  resetPage: () => void;
  onError: (error: string | null) => void;
  onDropdownClose: () => void;
}
