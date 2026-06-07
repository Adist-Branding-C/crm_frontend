import type { AgentItem } from './agent.types';

export interface AgentTableProps {
  data: AgentItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: string | null;
  onToggleDropdown: (id: string | null) => void;
  onEdit: (item: AgentItem) => void;
  onDelete: (item: AgentItem) => void;
}
