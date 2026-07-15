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
  statusId?: string | number;
  type?: string;
  typeId?: string | number;
  stage?: string;
  priority?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  agent?: string;
  agentId?: string | number;
  createdBy?: string;
  createdAt?: string;
  additionalFields?: { fieldId: string; name: string; value: string }[];
}

export interface DealFormData {
  dealName: string;
  lead: string;
  leadId?: string | number;
  mobile: string;
  amount: string;
  status: string;
  statusId?: string | number;
  type: string;
  typeId?: string | number;
  stage: string;
  priority: string;
  assignedTo: string;
  agentId?: string | number;
  startDate: string;
  endDate: string;
  notes: string;
  additionalFields?: { fieldId: string; value: string }[];
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
  onWhatsApp: (item: DealItem) => void;
  onMessage: (item: DealItem) => void;
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
  dealAdditionalFieldDefs: import('./additionalField').DealAdditionalFieldDef[];
}

export interface DealFormProps {
  editingItem?: DealItem | null;
  validationSchema: import('yup').Schema<Record<string, unknown>>;
  initialValues: import('../../../shared/types/drawers').DealFormData;
  onSubmit: (
    values: import('../../../shared/types/drawers').DealFormData,
    helpers: import('formik').FormikHelpers<import('../../../shared/types/drawers').DealFormData>,
  ) => Promise<void | boolean>;
  isLoading?: boolean;
  error?: string | null;
  onCancel: () => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export interface DealStage {
  id: string;
  name: string;
  label: string;
}

export interface DealStatusFilters {
  dateRange: { start: string; end: string };
  filterByDate: string;
  status: string;
  type: string;
  assignedTo: string;
  additionalFields: Record<string, string>;
}

export interface DealFiltersProps {
  filters: DealStatusFilters;
  onFilterChange: (filters: DealStatusFilters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isLoadingOptions?: boolean;
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
