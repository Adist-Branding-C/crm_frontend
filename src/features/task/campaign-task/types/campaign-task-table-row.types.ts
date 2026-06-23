import type { CampaignTaskItem } from './campaignTask.types';

export interface CampaignTaskTableRowProps {
  item: CampaignTaskItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CampaignTaskItem) => void;
  onDelete: (item: CampaignTaskItem) => void;
}
