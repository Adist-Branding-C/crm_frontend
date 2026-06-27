import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface CallReasonItem {
  id: number;
  name: string;
  status?: string;
}

export interface CallReasonFormData {
  name: string;
  status: string;
}

export interface CallReasonResponse {
  status: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
  field?: string;
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
  onSubmit: (values: CallReasonFormData, helpers: FormikHelpers<CallReasonFormData>) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing?: boolean;
}

export interface EditCallReasonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallReasonFormData;
  onSubmit: (values: CallReasonFormData, helpers: FormikHelpers<CallReasonFormData>) => Promise<void>;
  isLoading: boolean;
  error: string;
  editingItem: CallReasonItem | null;
  isEditing?: boolean;
}

export interface DeleteCallReasonDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
