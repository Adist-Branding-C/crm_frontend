import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { ApiResponse } from '../../../../shared/types/common';
import type { StaffOption, LeadOption } from '../../shared/types/genericTaskForm.types';

// export interface DealTaskItem {
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

export interface DealTaskItem {
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

export interface DealTaskFormData {
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  leadId: string;
  priority: string;
  status: string;
}

export type DealTaskApiResponse = ApiResponse<DealTaskItem> & { errors?: Record<string, string[]>; field?: string };

export interface DealTaskTableProps {
  data: DealTaskItem[];
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
  onEdit: (item: DealTaskItem) => void;
  onDelete: (item: DealTaskItem) => void;
  onAdd?: () => void;
  staffOptions: StaffOption[];
  leadOptions: LeadOption[];
}

export interface DealTaskActionsProps {
  item: DealTaskItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DealTaskItem) => void;
  onDelete: (item: DealTaskItem) => void;
}

export interface AddDealTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: DealTaskFormData;
  onSubmit: (values: DealTaskFormData, helpers: FormikHelpers<DealTaskFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  staffOptions: StaffOption[];
  staffLoading?: boolean;
  leadOptions: LeadOption[];
  leadLoading?: boolean;
}

export interface EditDealTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: DealTaskFormData;
  onSubmit: (values: DealTaskFormData, helpers: FormikHelpers<DealTaskFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  editingItem: DealTaskItem | null;
  isEditing?: boolean;
  staffOptions: StaffOption[];
  staffLoading?: boolean;
  leadOptions: LeadOption[];
  leadLoading?: boolean;
}

export interface DeleteDealTaskDialogProps {
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
