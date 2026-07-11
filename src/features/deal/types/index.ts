import type { FormikHelpers } from 'formik';

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
  statusId?: number;
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

export interface MenuPosition {
  top: number;
  left: number;
  openUpward: boolean;
}

export interface LeadOption {
  label: string;
  value: string | number;
}

export interface StaffOption {
  label: string;
  value: string | number;
}

export interface DeleteDealModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseDealActionsParams {
  deal: {
    handleAddDeal: (values: DealFormData, helpers: FormikHelpers<DealFormData>) => Promise<boolean>;
    handleUpdateDeal: (dealId: string, values: DealFormData, helpers: FormikHelpers<DealFormData>) => Promise<boolean>;
    handleDeleteDeal: (dealId: string) => Promise<boolean>;
  };
  drawer: {
    editingItem: DealItem | null;
    closeDrawer: () => void;
  };
}

export interface DealStage {
  id: string;
  name: string;
  label: string;
}

export interface DealFilters {
  search?: string;
  stage?: string;
  status?: string;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface DealListResponse {
  items: DealItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
