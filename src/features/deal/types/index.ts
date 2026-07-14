export interface DealItem {
  id: number;
  dealId?: string;
  dealName?: string;
  title?: string;
  lead?: string;
  leadId?: string | number;
  mobile?: string;
  amount?: number;
  status?: string;
  type?: string;
  stage?: string;
  priority?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  agent?: string;
  agentId?: string | number;
  createdBy?: string;
  createdAt?: string;
}

export interface DealFormData {
  dealName: string;
  lead: string;
  leadId?: string | number;
  mobile: string;
  amount: string;
  status: string;
  type: string;
  stage: string;
  priority: string;
  assignedTo: string;
  agentId?: string | number;
  startDate: string;
  endDate: string;
  notes: string;
}

export interface DealResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface DealActionMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  row: DealItem;
  onEdit: (item: DealItem) => void;
  onDelete: (id: number) => void;
}

export interface LeadOption {
  label: string;
  value: string | number;
}

export interface StaffOption {
  label: string;
  value: string | number;
}

export interface UseDealCrudParams {
  pagination: {
    setError: (message: string) => void;
    setIsLoading: (loading: boolean) => void;
    refresh: () => void;
  };
}

export interface UseDealFormSubmitParams {
  editingItem: DealItem | null;
  closeDrawer: () => void;
  handleAddDeal: (values: DealFormData) => Promise<boolean>;
  handleUpdateDeal: (dealId: string, values: DealFormData) => Promise<boolean>;
}

export interface DealStage {
  id: string;
  name: string;
  label: string;
}

export interface DealStatusFilters {
  status: string;
  type: string;
  assignedTo: string;
}

export interface DealFiltersProps {
  filters: DealStatusFilters;
  onFilterChange: (filters: DealStatusFilters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export interface DealSortDropdownProps {
  sortBy: string;
  sortOrder: string;
  onSortChange: (field: string, direction: string) => void;
}

export interface DealListResponse {
  items: DealItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
