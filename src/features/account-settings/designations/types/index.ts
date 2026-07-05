import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface DesignationItem {
  id: number;
  designationName: string;
  name?: string;
  description: string;
  status: string;
}

export interface DesignationFormData {
  designationName: string;
  description: string;
  status: string;
}

export interface AddDesignationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: DesignationFormData;
  onSubmit: (values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
}

export interface DesignationActionsProps {
  item: DesignationItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DesignationItem) => void;
  onDelete: (item: DesignationItem) => void;
}

export interface DeleteDesignationDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: DesignationItem | null;
  deletingItem: DesignationItem | null;
  onDependencyError?: () => void;
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

// Legacy types for existing files
export interface DesignationActionMenuProps {
  item: DesignationItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DesignationItem) => void;
  onDelete: (item: DesignationItem) => void;
}

export interface DesignationTableProps {
  data: DesignationItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  pageNumber: number;
  onPageChange: (page: number) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DesignationItem) => void;
  onDelete: (item: DesignationItem) => void;
}

export interface DeleteDesignationModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseDesignationActionsParams {
  designation: {
    handleAddDesignation: (values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => Promise<boolean>;
    handleUpdateDesignation: (id: number, values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => Promise<boolean>;
    handleDeleteDesignation: (id: number) => Promise<boolean>;
    dependencyError: boolean;
    clearDependencyError: () => void;
  };
  drawer: {
    editingItem: DesignationItem | null;
    closeDrawer: () => void;
  };
}

export interface DesignationsTableProps {
  data: DesignationItem[];
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
  onEdit: (item: DesignationItem) => void;
  onDelete: (item: DesignationItem) => void;
  onAdd?: () => void;
}
