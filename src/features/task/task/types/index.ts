import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { ApiResponse } from '../../../../shared/types/common';
import type { CategoryOption, StaffOption, LeadOption } from '../../shared/types/genericTaskForm.types';

// ---- Domain Types ----
// export interface TaskItem {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   categoryId?: string;
//   scheduledDate: string;
//   scheduledTime: string;
//   assignedBy: string;
//   assignedTo: string;
//   leadId?: string;
//   priority: string;
//   status: string;
  
// }



export interface TaskItem {
  id: number;
  title: string;
  description: string;
  category?: {
    id: number;
    name: string;
  } | null;
  scheduledDate: string;
  scheduledTime: string;
  assignedBy: string;
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

export interface TaskFormData {
  title: string;
  description: string;
  categoryId: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  leadId: string;
  priority: string;
  status: string;
}

export type TaskApiResponse = ApiResponse<TaskItem> & { errors?: Record<string, string[]>; field?: string };

// ---- Table Types ----
export interface TaskTableProps {
  data: TaskItem[];
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
  onEdit: (item: TaskItem) => void;
  onDelete: (item: TaskItem) => void;
  onAdd?: () => void;
}

// ---- Action Menu Types ----
export interface TaskActionsProps {
  item: TaskItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskItem) => void;
  onDelete: (item: TaskItem) => void;
}

export interface TaskRowProps {
  item: TaskItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskItem) => void;
  onDelete: (item: TaskItem) => void;
}

// ---- Drawer Types ----
export interface AddTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskFormData;
  onSubmit: (values: TaskFormData, helpers: FormikHelpers<TaskFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  categoryOptions: CategoryOption[];
  staffOptions: StaffOption[];
  leadOptions: LeadOption[];
  leadLoading?: boolean;
}

export interface EditTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskFormData;
  onSubmit: (values: TaskFormData, helpers: FormikHelpers<TaskFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  editingItem: TaskItem | null;
  isEditing?: boolean;
  categoryOptions: CategoryOption[];
  staffOptions: StaffOption[];
  leadOptions: LeadOption[];
  leadLoading?: boolean;
}

// ---- Delete Dialog Types ----
export interface DeleteTaskDialogProps {
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
