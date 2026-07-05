import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface CheckoutNoteItem {
  id: number
  title?: string
  note?: string
  status?: string
}

export interface CheckoutNoteFormData {
  title: string
  note: string
  status: string
}

export interface AddCheckoutNoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CheckoutNoteFormData;
  onSubmit: (values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
}

export interface CheckoutNoteActionsProps {
  item: CheckoutNoteItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CheckoutNoteItem) => void;
  onDelete: (item: CheckoutNoteItem) => void;
}

export interface DeleteCheckoutNoteDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: CheckoutNoteItem | null;
  deletingItem: CheckoutNoteItem | null;
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
export interface CheckoutNoteActionMenuProps {
  item: CheckoutNoteItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CheckoutNoteItem) => void;
  onDelete: (item: CheckoutNoteItem) => void;
}

export interface DeleteCheckoutNoteModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseCheckoutNoteActionsParams {
  checkoutNote: {
    handleAddCheckoutNote: (values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => Promise<boolean>;
    handleUpdateCheckoutNote: (id: number, values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => Promise<boolean>;
    handleDeleteCheckoutNote: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: CheckoutNoteItem | null;
    closeDrawer: () => void;
  };
}

export interface CheckoutNoteTableProps {
  data: CheckoutNoteItem[];
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
  onEdit: (item: CheckoutNoteItem) => void;
  onDelete: (item: CheckoutNoteItem) => void;
  onAdd?: () => void;
}
