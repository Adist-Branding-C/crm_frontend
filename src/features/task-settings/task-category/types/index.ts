import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { ApiResponse } from '../../../../shared/types/common';

export type TaskCategoryApiResponse = ApiResponse<TaskCategoryItem> & { errors?: Record<string, string[]>; field?: string };

export interface TaskCategoryItem {
  id: number;
  category: string;
  action: string;
}

export interface TaskCategoryFormData {
  category: string;
  action: string;
}

export interface TaskCategoryTableProps {
  data: TaskCategoryItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskCategoryItem) => void;
  onDelete: (item: TaskCategoryItem) => void;
  onAdd?: () => void;
}

export interface TaskCategoryActionsProps {
  item: TaskCategoryItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskCategoryItem) => void;
  onDelete: (item: TaskCategoryItem) => void;
}

export interface AddTaskCategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskCategoryFormData;
  onSubmit: (values: TaskCategoryFormData, helpers: FormikHelpers<TaskCategoryFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
}

export interface EditTaskCategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskCategoryFormData;
  onSubmit: (values: TaskCategoryFormData, helpers: FormikHelpers<TaskCategoryFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  editingItem: TaskCategoryItem | null;
  isEditing?: boolean;
}

export interface DeleteTaskCategoryDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
