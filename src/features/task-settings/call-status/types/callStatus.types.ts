import type { Schema } from 'yup';

export interface CallStatusItem {
  id: number;
  name: string;
  status?: string;
}

export interface CallStatusFormData {
  name: string;
  status: string;
}

export interface CallStatusResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export interface CallStatusTableProps {
  data: CallStatusItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallStatusItem) => void;
  onDelete: (item: CallStatusItem) => void;
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
  onSubmit: (values: CallStatusFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export interface EditCallStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallStatusFormData;
  onSubmit: (values: CallStatusFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  editingItem: CallStatusItem | null;
}

export interface DeleteCallStatusDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
