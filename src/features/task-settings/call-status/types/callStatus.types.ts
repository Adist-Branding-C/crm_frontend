import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { ApiResponse } from '../../../../shared/types/common';

export type CallStatusApiResponse = ApiResponse<CallStatusItem> & { errors?: Record<string, string[]>; field?: string };

export interface CallStatusItem {
  id: number;
  name: string;
  status?: string;
}

export interface CallStatusFormData {
  name: string;
  status: string;
}

export interface CallStatusTableProps {
  data: CallStatusItem[];
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
  onEdit: (item: CallStatusItem) => void;
  onDelete: (item: CallStatusItem) => void;
  onAdd?: () => void;
}

export interface CallStatusActionsProps {
  item: CallStatusItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallStatusItem) => void;
  onDelete: (item: CallStatusItem) => void;
}

export interface AddCallStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallStatusFormData;
  onSubmit: (values: CallStatusFormData, helpers: FormikHelpers<CallStatusFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
}

export interface EditCallStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallStatusFormData;
  onSubmit: (values: CallStatusFormData, helpers: FormikHelpers<CallStatusFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  editingItem: CallStatusItem | null;
  isEditing?: boolean;
}

export interface DeleteCallStatusDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
