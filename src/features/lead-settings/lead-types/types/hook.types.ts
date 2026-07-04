import type {
  LeadTypeItem,
  CreateLeadTypePayload,
  UpdateLeadTypePayload,
  CreateLeadTypeResponse,
  LeadTypeResponse,
} from '../types';

export interface UseLeadTypesCrudOptions {
  onError: (error: string | null) => void;
  onDeleteSuccess: (message: string) => void;
  onDropdownClose: () => void;
  refetch: () => Promise<void>;
}

export interface UseLeadTypesFormOptions {
  items: LeadTypeItem[];
  fetchData: (page: number, limit: number, search: string) => Promise<void>;
  createType: (payload: CreateLeadTypePayload) => Promise<CreateLeadTypeResponse>;
  updateType: (id: string, payload: UpdateLeadTypePayload) => Promise<LeadTypeResponse>;
  currentPage: number;
  rowsPerPage: number;
  searchQuery: string;
  resetPage: () => void;
  onError: (error: string | null) => void;
  onDropdownClose: () => void;
}
