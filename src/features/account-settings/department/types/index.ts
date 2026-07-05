import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface DepartmentItem {
  id: number
  departmentName?: string
  name?: string
  description?: string
  status?: string
}

export interface DepartmentFormData {
  departmentName: string
  description: string
  status: string
}

export interface AddDepartmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: DepartmentFormData;
  onSubmit: (values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
}

export interface EditDepartmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: DepartmentFormData;
  onSubmit: (values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string | null;
  editingItem: DepartmentItem | null;
  isEditing?: boolean;
}

export interface DepartmentActionsProps {
  item: DepartmentItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DepartmentItem) => void;
  onDelete: (item: DepartmentItem) => void;
}

export interface DeleteDepartmentDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  onDependencyError?: () => void;
  editingItem: DepartmentItem | null;
  deletingItem: DepartmentItem | null;
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

export interface DepartmentTableProps {
  data: DepartmentItem[];
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
  onEdit: (item: DepartmentItem) => void;
  onDelete: (item: DepartmentItem) => void;
  onAdd?: () => void;
}

export interface DepartmentActionMenuProps {
  item: DepartmentItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DepartmentItem) => void;
  onDelete: (item: DepartmentItem) => void;
}

export interface DeleteDepartmentModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseDepartmentActionsParams {
  department: {
    handleAddDepartment: (values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => Promise<boolean>;
    handleUpdateDepartment: (id: number, values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => Promise<boolean>;
    handleDeleteDepartment: (id: number) => Promise<boolean>;
    dependencyError: boolean;
    clearDependencyError: () => void;
  };
  drawer: {
    editingItem: DepartmentItem | null;
    closeDrawer: () => void;
  };
}
