import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface BranchItem {
  id: number
  name?: string
  branchName?: string
  description?: string
  status?: string
}

export interface BranchFormData {
  name: string
  description: string
  status: string
}

export interface AddBranchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: BranchFormData;
  onSubmit: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
}

export interface EditBranchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: BranchFormData;
  onSubmit: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string | null;
  editingItem: BranchItem | null;
  isEditing?: boolean;
}

export interface BranchActionsProps {
  item: BranchItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: BranchItem) => void;
  onDelete: (item: BranchItem) => void;
}

export interface DeleteBranchDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: BranchItem | null;
  deletingItem: BranchItem | null;
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

export interface ParsedApiError {
  message: string;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface BranchTableProps {
  data: BranchItem[];
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
  onEdit: (item: BranchItem) => void;
  onDelete: (item: BranchItem) => void;
  onAdd?: () => void;
}

export interface BranchActionMenuProps {
  item: BranchItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: BranchItem) => void;
  onDelete: (item: BranchItem) => void;
}

export interface DeleteBranchModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseBranchActionsParams {
  branch: {
    handleAddBranch: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean>;
    handleUpdateBranch: (id: number, values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean>;
    handleDeleteBranch: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: BranchItem | null;
    closeDrawer: () => void;
  };
}
