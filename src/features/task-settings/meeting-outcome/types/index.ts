import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface MeetingOutcomeItem {
  id: number;
  name: string;
  status?: string;
}

export interface MeetingOutcomeFormData {
  name: string;
  status: string;
}

export interface MeetingOutcomeResponse {
  status: boolean;
  message: string;
  data?: unknown;
  errors?: Record<string, string[]>;
  field?: string;
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

export interface MeetingOutcomeActionsProps {
  item: MeetingOutcomeItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: MeetingOutcomeItem) => void;
  onDelete: (item: MeetingOutcomeItem) => void;
}

export interface AddMeetingOutcomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: MeetingOutcomeFormData;
  onSubmit: (values: MeetingOutcomeFormData, helpers: FormikHelpers<MeetingOutcomeFormData>) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing?: boolean;
}

export interface EditMeetingOutcomeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: MeetingOutcomeFormData;
  onSubmit: (values: MeetingOutcomeFormData, helpers: FormikHelpers<MeetingOutcomeFormData>) => Promise<void>;
  isLoading: boolean;
  error: string;
  editingItem: MeetingOutcomeItem | null;
  isEditing?: boolean;
}

export interface DeleteMeetingOutcomeDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
