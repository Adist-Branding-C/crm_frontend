import type {
  LeadAdditionalItem,
  CreateLeadAdditionalPayload,
  UpdateLeadAdditionalPayload,
  CreateLeadAdditionalResponse,
  LeadAdditionalResponse,
} from '../types';

export interface UseLeadAdditionalCrudOptions {
  onError: (error: string | null) => void;
  onDeleteSuccess: (message: string) => void;
  onDropdownClose: () => void;
  refetch: () => Promise<void>;
}

export interface UseLeadAdditionalFormOptions {
  items: LeadAdditionalItem[];
  fetchData: (page: number, limit: number, search: string) => Promise<void>;
  createField: (payload: CreateLeadAdditionalPayload) => Promise<CreateLeadAdditionalResponse>;
  updateField: (id: string, payload: UpdateLeadAdditionalPayload) => Promise<{ status: boolean; message: string }>;
  currentPage: number;
  rowsPerPage: number;
  searchQuery: string;
  resetPage: () => void;
  onError: (error: string | null) => void;
  onDropdownClose: () => void;
}
