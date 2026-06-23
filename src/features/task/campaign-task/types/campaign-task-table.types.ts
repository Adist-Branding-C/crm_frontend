import type { CampaignTaskItem } from './campaignTask.types';

export interface CampaignTaskTableProps {
  data: CampaignTaskItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CampaignTaskItem) => void;
  onDelete: (item: CampaignTaskItem) => void;
  onAdd: () => void;
  addLabel: string;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
}
