import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { ApiResponse } from '../../../../shared/types/common';

export interface CallReasonItem {
  id: number;
  name: string;
  status?: string;
}

export interface CallReasonFormData {
  name: string;
  status: string;
}

export interface CallReason {
  id: number;
  name: string;
  status: string;
}

export interface CallReasonTableProps {
  data: CallReasonItem[];
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
  onEdit: (item: CallReasonItem) => void;
  onDelete: (item: CallReasonItem) => void;
  onAdd?: () => void;
}

export interface CallReasonActionsProps {
  item: CallReasonItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallReasonItem) => void;
  onDelete: (item: CallReasonItem) => void;
}

export interface AddCallReasonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallReasonFormData;
  onSubmit: (values: CallReasonFormData, helpers: FormikHelpers<CallReasonFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
}

export interface EditCallReasonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallReasonFormData;
  onSubmit: (values: CallReasonFormData, helpers: FormikHelpers<CallReasonFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  editingItem: CallReasonItem | null;
  isEditing?: boolean;
}

export interface DeleteCallReasonDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: CallReasonItem | null;
  deletingItem: CallReasonItem | null;
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

export type CallReasonApiResponse = ApiResponse<CallReason> & { errors?: Record<string, string[]>; field?: string };
