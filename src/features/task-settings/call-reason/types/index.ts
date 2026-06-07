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
}

export interface CallReasonTableProps {
  data: CallReasonItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallReasonItem) => void;
  onDelete: (item: CallReasonItem) => void;
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
  onSubmit: (values: CallReasonFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export interface EditCallReasonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallReasonFormData;
  onSubmit: (values: CallReasonFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  editingItem: CallReasonItem | null;
}

export interface DeleteCallReasonDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
