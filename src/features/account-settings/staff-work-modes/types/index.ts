import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface WorkModeItem {
  id: number;
  workModeName?: string;
  name?: string;
  description?: string;
  status?: string;
}

export interface WorkModeFormData {
  workModeName: string;
  description: string;
  status: string;
}

export interface AddWorkModeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: WorkModeFormData;
  onSubmit: (values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
}

export interface WorkModeActionsProps {
  item: WorkModeItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WorkModeItem) => void;
  onDelete: (item: WorkModeItem) => void;
}

export interface DeleteWorkModeDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: WorkModeItem | null;
  deletingItem: WorkModeItem | null;
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

// Legacy types (kept for old components)
export interface DeleteWorkModeModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseWorkModeActionsParams {
  workMode: {
    handleAddWorkMode: (values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => Promise<boolean>;
    handleUpdateWorkMode: (id: number, values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => Promise<boolean>;
    handleDeleteWorkMode: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: WorkModeItem | null;
    closeDrawer: () => void;
  };
}

export interface WorkModeActionMenuProps {
  item: WorkModeItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WorkModeItem) => void;
  onDelete: (item: WorkModeItem) => void;
}

export interface WorkModeTableProps {
  data: WorkModeItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  pageNumber: number;
  onPageChange: (page: number) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WorkModeItem) => void;
  onDelete: (item: WorkModeItem) => void;
}

export interface StaffWorkModesTableProps {
  data: WorkModeItem[];
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
  onEdit: (item: WorkModeItem) => void;
  onDelete: (item: WorkModeItem) => void;
  onAdd?: () => void;
}
