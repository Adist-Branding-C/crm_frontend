import type { RefObject } from 'react';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { TaskCategoryItem } from './interface';
import type { TaskCategoryFormData } from './request';

export interface TaskCategoryActionsProps {
  item: TaskCategoryItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskCategoryItem) => void;
  onDelete: (item: TaskCategoryItem) => void;
}

export interface TaskCategoryRowProps {
  item: TaskCategoryItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskCategoryItem) => void;
  onDelete: (item: TaskCategoryItem) => void;
}

export interface TaskCategoryFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskCategoryFormData;
  onSubmit: (values: TaskCategoryFormData, helpers: FormikHelpers<TaskCategoryFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
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

export interface DeleteTaskCategoryDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
