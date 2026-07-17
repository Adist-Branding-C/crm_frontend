import type { RefObject } from 'react';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { CallStatusItem } from './interface';
import type { CallStatusFormData } from './request';

export interface CallStatusActionsProps {
  item: CallStatusItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallStatusItem) => void;
  onDelete: (item: CallStatusItem) => void;
}

export interface CallStatusRowProps {
  item: CallStatusItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallStatusItem) => void;
  onDelete: (item: CallStatusItem) => void;
}

export interface CallStatusFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallStatusFormData;
  onSubmit: (values: CallStatusFormData, helpers: FormikHelpers<CallStatusFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
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

export interface DeleteCallStatusDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
