import type { ReactNode, ChangeEvent, Ref } from 'react';

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'color' | 'checkbox' | 'switch' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
}

export interface AdminToolbarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onAdd: () => void;
  addLabel: string;
  showAddButton?: boolean;
  rowsPerPage: number;
onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}



export interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  showRowsSelector?: boolean;
  prevNextOnly?: boolean;
  alwaysShowNav?: boolean;
}

export interface AdminDeleteModalProps {
  isOpen: boolean;
  itemName?: string | undefined;
  itemType?: string;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

export interface AdminTableProps<T extends { id: number | string }> {
  data: T[];
  columns: Column<T>[];
  startIndex: number;
  dropdownOpen: T['id'] | null;
  onToggleDropdown: (id: T['id'] | null) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  renderActions?: (item: T) => ReactNode;
  emptyMessage?: string;
}

export interface DrawerShellProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  bodyRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}

export interface AdminFormDrawerProps {
  isOpen: boolean;
  title: string;
  fields: FormField[];
  formData: Record<string, unknown>;
  onChange: (data: any) => void;
  onSave: () => void;
  onClose: () => void;
  isEditing: boolean;
  error?: string | null;
  onClearError?: () => void;
}
