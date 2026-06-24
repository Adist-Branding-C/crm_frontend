import type { CheckoutNoteItem } from './checkoutNote.types';

export interface CheckoutNoteTableProps {
  data: CheckoutNoteItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  pageNumber: number;
  onPageChange: (page: number) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CheckoutNoteItem) => void;
  onDelete: (item: CheckoutNoteItem) => void;
}
