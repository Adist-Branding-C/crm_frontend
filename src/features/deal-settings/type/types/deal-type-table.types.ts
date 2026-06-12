import type { DealTypeItem } from './deal-type.types';

export interface DealTypeTableProps {
  data: DealTypeItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
  addLabel: string;
  rowsPerPage: number;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startIndex: number;
  dropdownOpen: number | null;
  onToggleDropdown: (key: number | null) => void;
  onEdit: (item: DealTypeItem) => void;
  onDelete: (item: DealTypeItem) => void;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}
