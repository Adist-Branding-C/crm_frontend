import type { CampaignTaskItem } from './campaignTask.types';

export interface CampaignTaskTableProps {
  data: CampaignTaskItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CampaignTaskItem) => void;
  onDelete: (item: CampaignTaskItem) => void;
  onAdd: () => void;
  addLabel: string;
}
