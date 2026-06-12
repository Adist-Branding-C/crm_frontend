import type { DealStatusItem } from './deal-status.types';

export interface DealStatusTableProps {
  data: DealStatusItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  addLabel: string;
  rowsPerPage: number;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startIndex: number;
  dropdownOpen: number | null;
  onToggleDropdown: (key: number | null) => void;
  onEdit: (item: DealStatusItem) => void;
  onDelete: (item: DealStatusItem) => void;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}
