import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';

export interface AgentItem {
  id: number;
  staff_id?: string;
  fullName?: string;
  name?: string;
  email: string;
  phone?: string;
  phone_number?: string;
  phoneNumber?: string;
  mobile?: string;
  designationId?: string;
  designation_id?: number | string;
  designation?: { id: number; designationName: string } | null;
  departmentId?: string;
  department_id?: number | string;
  department?: { id: number; name: string } | null;
  status: string;
}

export interface AgentFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  designationId: string;
  departmentId: string;
  status: string;
}

export interface DesignationOption {
  label: string;
  value: string;
}

export interface DepartmentOption {
  label: string;
  value: string;
}

export interface AddAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: AgentFormData;
  onSubmit: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  designationOptions: DesignationOption[];
  onFetchDesignations: () => void;
  departmentOptions: DepartmentOption[];
  onFetchDepartments: () => void;
}

export interface EditAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: AgentFormData;
  onSubmit: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => void | Promise<unknown>;
  isLoading: boolean;
  error: string;
  editingItem: AgentItem | null;
  isEditing?: boolean;
  designationOptions: DesignationOption[];
  onFetchDesignations: () => void;
  departmentOptions: DepartmentOption[];
  onFetchDepartments: () => void;
}

export interface AgentActionsProps {
  item: AgentItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: AgentItem) => void;
  onDelete: (item: AgentItem) => void;
}

export interface DeleteAgentDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface SubmitHandlerConfig {
  onAddSuccess: () => void;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
  editingItem: AgentItem | null;
  deletingItem: AgentItem | null;
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

export interface UseAgentDrawerReturn {
  showDrawer: boolean;
  editingItem: AgentItem | null;
  openAddDrawer: () => void;
  openEditDrawer: (item: AgentItem) => void;
  closeDrawer: () => void;
  drawerInitialValues: AgentFormData;
}

export interface AgentSubmitHandlers {
  handleAddSubmit: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean | undefined>;
  handleEditSubmit: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean | undefined>;
}

export interface AgentTableProps {
  data: AgentItem[];
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
  onEdit: (item: AgentItem) => void;
  onDelete: (item: AgentItem) => void;
  onAdd?: () => void;
}

export interface AgentActionMenuProps {
  item: AgentItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: AgentItem) => void;
  onDelete: (item: AgentItem) => void;
}

export interface DeleteAgentModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface UseAgentActionsParams {
  agent: {
    handleAddAgent: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean>;
    handleUpdateAgent: (id: string, values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => Promise<boolean>;
    handleDeleteAgent: (id: string) => Promise<boolean>;
  };
  drawer: {
    editingItem: AgentItem | null;
    closeDrawer: () => void;
  };
}
