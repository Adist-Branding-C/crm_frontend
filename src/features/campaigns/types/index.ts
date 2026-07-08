import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { ReactNode } from 'react';

export interface CreatedByInfo {
  id: number | null;
  agentId: string | null;
  name: string | null;
}

export type CreatedByDisplay = CreatedByInfo | string;

export interface Campaign {
  id: number;
  slNo: number;
  name: string;
  type: string;
  totalTasks: number;
  completedTasks: number;
  completedPercent: number;
  createdBy: CreatedByDisplay;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  poolName?: string;
  poolAgents?: string[];
  agents?: string[];
}

export type CampaignFormData = {
  type: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  poolName: string;
  poolAgents: string[];
  agents: string[];
};

export interface Agent {
  id: string;
  name: string;
  designation?: string;
  email?: string;
}

export interface GetCampaignsParams {
  pageNumber: number;
  limit: number;
  search?: string | undefined;
  type?: string | undefined;
  createdBy?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: 'asc' | 'desc' | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}

export type CreateCampaignPayload = {
  type: 'Lead Campaign';
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  agents?: string[];
} | {
  type: 'Data Pool';
  poolName: string;
  poolAgents?: string[];
};

export type UpdateCampaignPayload = {
  type: 'Lead Campaign';
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  agents?: string[];
} | {
  type: 'Data Pool';
  poolName?: string;
  poolAgents?: string[];
};

export interface CampaignTableProps {
  data: Campaign[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (value: number) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onView: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  onAssign: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onAdd?: () => void;
  onExport?: () => void;
  addLabel?: string;
}

export interface CampaignActionsProps {
  campaign: Campaign;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onView: (campaign: Campaign) => void;
  onEdit: (campaign: Campaign) => void;
  onAssign: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

export interface AddCampaignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CampaignFormData;
  onSubmit: (values: CampaignFormData, helpers: FormikHelpers<CampaignFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
}

export interface EditCampaignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CampaignFormData;
  onSubmit: (values: CampaignFormData, helpers: FormikHelpers<CampaignFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  editingItem: Campaign | null;
  isEditing?: boolean;
}

export interface DeleteCampaignDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface AgentMultiSelectProps {
  agents: Agent[];
  selected: string[];
  onChange: (selected: string[]) => void;
  isLoading?: boolean;
  error?: boolean;
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

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
  className?: string;
  width?: string;
}

export type { ReactNode };
