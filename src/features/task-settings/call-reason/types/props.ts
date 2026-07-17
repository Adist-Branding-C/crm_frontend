import type { RefObject } from 'react';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { CallReasonItem } from './interface';
import type { CallReasonFormData } from './request';

export interface CallReasonActionsProps {
  item: CallReasonItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallReasonItem) => void;
  onDelete: (item: CallReasonItem) => void;
}

export interface CallReasonRowProps {
  item: CallReasonItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallReasonItem) => void;
  onDelete: (item: CallReasonItem) => void;
}

export interface CallReasonFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallReasonFormData;
  onSubmit: (values: CallReasonFormData, helpers: FormikHelpers<CallReasonFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
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

export interface DeleteCallReasonDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
