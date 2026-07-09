import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { StaffOption, LeadOption } from '../../shared/types/genericTaskForm.types';
import { ApiResponse } from '../../../../shared/types/common';

// export interface CampaignTaskItem {
//   id: number;
//   title: string;
//   description: string;
//   scheduledDate: string;
//   scheduledTime: string;
//   assignedTo: string;
//   leadId?: string;
//   priority: string;
//   status: string;
// }


export interface CampaignTaskItem {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  category?: {
    id: number;
    name: string;
  } | null;
  assignedTo?: {
    id: number;
    name: string;
  } | null;
  lead?: {
    id: number;
    name: string;
  } | null;
  priority: string;
  status: string;
}
export interface CampaignTaskFormData {
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  leadId: string;
  priority: string;
  status: string;
}

export type CampaignTaskApiResponse = ApiResponse<CampaignTaskItem> & { errors?: Record<string, string[]>; field?: string };

export interface CampaignTaskTableProps {
  data: CampaignTaskItem[];
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
  onEdit: (item: CampaignTaskItem) => void;
  onDelete: (item: CampaignTaskItem) => void;
  onAdd?: () => void;
  staffOptions: StaffOption[];
  leadOptions: LeadOption[];
}

export interface CampaignTaskActionsProps {
  item: CampaignTaskItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CampaignTaskItem) => void;
  onDelete: (item: CampaignTaskItem) => void;
}

export interface AddCampaignTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CampaignTaskFormData;
  onSubmit: (values: CampaignTaskFormData, helpers: FormikHelpers<CampaignTaskFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  staffOptions: StaffOption[];
  staffLoading?: boolean;
  leadOptions: LeadOption[];
  leadLoading?: boolean;
}

export interface EditCampaignTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CampaignTaskFormData;
  onSubmit: (values: CampaignTaskFormData, helpers: FormikHelpers<CampaignTaskFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  editingItem: CampaignTaskItem | null;
  isEditing?: boolean;
  staffOptions: StaffOption[];
  staffLoading?: boolean;
  leadOptions: LeadOption[];
  leadLoading?: boolean;
}

export interface DeleteCampaignTaskDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

// ---- Submit Handler Types ----
export interface SubmitHandlerConfig<T> {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: T | null;
  deletingItem: T | null;
}

export interface FetchHandlers {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  setPageNumber: (page: number) => void;
  setSearchQuery: (q: string) => void;
  refresh: () => void;
}

export interface ToastHandlers {
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}
