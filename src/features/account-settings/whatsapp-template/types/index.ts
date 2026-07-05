import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface WhatsappTemplateItem {
  id: number;
  templateName: string;
  message: string;
  status: string;
  name?: string;
  content?: string;
}

export interface WhatsappTemplateFormData {
  templateName: string;
  message: string;
  status: string;
}

export interface AddWhatsappTemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: WhatsappTemplateFormData;
  onSubmit: (values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}

export interface WhatsappTemplateActionsProps {
  item: WhatsappTemplateItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WhatsappTemplateItem) => void;
  onDelete: (item: WhatsappTemplateItem) => void;
}

export interface DeleteWhatsappTemplateDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: WhatsappTemplateItem | null;
  deletingItem: WhatsappTemplateItem | null;
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

export interface WhatsappTemplateTableProps {
  data: WhatsappTemplateItem[];
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
  onEdit: (item: WhatsappTemplateItem) => void;
  onDelete: (item: WhatsappTemplateItem) => void;
  onAdd?: () => void;
}

export interface WhatsappTemplateActionMenuProps {
  item: WhatsappTemplateItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WhatsappTemplateItem) => void;
  onDelete: (item: WhatsappTemplateItem) => void;
}

export interface DeleteWhatsappTemplateModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseWhatsappTemplateActionsParams {
  whatsappTemplate: {
    handleAddWhatsappTemplate: (values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => Promise<boolean>;
    handleUpdateWhatsappTemplate: (id: number, values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => Promise<boolean>;
    handleDeleteWhatsappTemplate: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: WhatsappTemplateItem | null;
    closeDrawer: () => void;
  };
}
