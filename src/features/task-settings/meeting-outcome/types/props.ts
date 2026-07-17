import type { RefObject } from 'react';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { MeetingOutcomeItem } from './interface';
import type { MeetingOutcomeFormData } from './request';

export interface MeetingOutcomeActionsProps {
  item: MeetingOutcomeItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: MeetingOutcomeItem) => void;
  onDelete: (item: MeetingOutcomeItem) => void;
}

export interface MeetingOutcomeRowProps {
  item: MeetingOutcomeItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: MeetingOutcomeItem) => void;
  onDelete: (item: MeetingOutcomeItem) => void;
}

export interface MeetingOutcomeFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: MeetingOutcomeFormData;
  onSubmit: (values: MeetingOutcomeFormData, helpers: FormikHelpers<MeetingOutcomeFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
}

export interface AddMeetingOutcomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: MeetingOutcomeFormData;
  onSubmit: (values: MeetingOutcomeFormData, helpers: FormikHelpers<MeetingOutcomeFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
}

export interface EditMeetingOutcomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: MeetingOutcomeFormData;
  onSubmit: (values: MeetingOutcomeFormData, helpers: FormikHelpers<MeetingOutcomeFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  editingItem: MeetingOutcomeItem | null;
  isEditing?: boolean;
}

export interface MeetingOutcomeTableProps {
  data: MeetingOutcomeItem[];
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
  onEdit: (item: MeetingOutcomeItem) => void;
  onDelete: (item: MeetingOutcomeItem) => void;
  onAdd?: () => void;
}

export interface DeleteMeetingOutcomeDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
