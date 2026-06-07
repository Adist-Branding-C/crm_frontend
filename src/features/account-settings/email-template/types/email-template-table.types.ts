import type { EmailTemplateItem } from './emailTemplate.types';

export interface EmailTemplateTableProps {
  data: EmailTemplateItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: EmailTemplateItem) => void;
  onDelete: (item: EmailTemplateItem) => void;
}
