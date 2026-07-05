import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface EmailTemplateItem {
  id: number;
  templateName: string;
  title?: string;
  subject: string;
  htmlContent?: string;
  content: string;
  htmlCode?: string;
  isDefault?: boolean;
  status: string;
}

export interface EmailTemplateFormData {
  templateName: string;
  subject: string;
  content: string;
  status: string;
}

export interface AddEmailTemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: EmailTemplateFormData;
  onSubmit: (values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}

export interface EmailTemplateActionsProps {
  item: EmailTemplateItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: EmailTemplateItem) => void;
  onDelete: (item: EmailTemplateItem) => void;
}

export interface DeleteEmailTemplateDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: EmailTemplateItem | null;
  deletingItem: EmailTemplateItem | null;
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

export interface EmailTemplateTableProps {
  data: EmailTemplateItem[];
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
  onEdit: (item: EmailTemplateItem) => void;
  onDelete: (item: EmailTemplateItem) => void;
  onAdd?: () => void;
}

export interface EmailTemplateActionMenuProps {
  item: EmailTemplateItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: EmailTemplateItem) => void;
  onDelete: (item: EmailTemplateItem) => void;
}

export interface DeleteEmailTemplateModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseEmailTemplateActionsParams {
  emailTemplate: {
    handleAddEmailTemplate: (values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => Promise<boolean>;
    handleUpdateEmailTemplate: (id: number, values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => Promise<boolean>;
    handleDeleteEmailTemplate: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: EmailTemplateItem | null;
    closeDrawer: () => void;
  };
}
