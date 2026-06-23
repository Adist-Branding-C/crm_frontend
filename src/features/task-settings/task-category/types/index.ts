import type { Schema } from 'yup';

export interface TaskCategoryItem {
  id: number;
  category: string;
  action: string;
}

export interface TaskCategoryFormData {
  category: string;
  action: string;
}

export interface TaskCategoryResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface TaskCategoryTableProps {
  data: TaskCategoryItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskCategoryItem) => void;
  onDelete: (item: TaskCategoryItem) => void;
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
  onSubmit: (values: TaskCategoryFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export interface EditTaskCategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskCategoryFormData;
  onSubmit: (values: TaskCategoryFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  editingItem: TaskCategoryItem | null;
}

export interface DeleteTaskCategoryDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
