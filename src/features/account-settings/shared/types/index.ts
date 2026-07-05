import type { ReactNode, ChangeEvent } from 'react';

export interface DeleteConfirmModalProps {
  deletingStaff: { name: string; id: number } | null;
  deleteConfirmText: string;
  onDeleteConfirmTextChange: (text: string) => void;
  onConfirmDelete: () => void;
  onClose: () => void;
}

export interface StaffDataItem {
  id: number;
  name: string;
  role: string;
}

export interface StaffFormDrawerFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  assignedStaff: string;
}

export interface StaffFormDrawerProps {
  isOpen: boolean;
  editingStaff: { name: string } | null;
  formData: StaffFormDrawerFormData;
  staffData: StaffDataItem[];
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface StaffItem {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  designation: string;
  status: string;
}

export interface StaffTableProps {
  data: StaffItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: StaffItem) => void;
  onDelete: (item: StaffItem) => void;
  children?: ReactNode;
}
