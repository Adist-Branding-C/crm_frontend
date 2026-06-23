import type { AgentItem } from './agent.types';

export interface AgentTableProps {
  data: AgentItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  pageNumber: number;
  onPageChange: (page: number) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: AgentItem) => void;
  onDelete: (item: AgentItem) => void;
}
