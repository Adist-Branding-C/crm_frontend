import type { WhatsappTemplateItem } from './whatsapp-template.types';

export interface WhatsappTemplateTableProps {
  data: WhatsappTemplateItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WhatsappTemplateItem) => void;
  onDelete: (item: WhatsappTemplateItem) => void;
}
