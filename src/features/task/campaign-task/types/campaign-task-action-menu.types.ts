import type { CampaignTaskItem } from './campaignTask.types';

export interface CampaignTaskActionMenuProps {
  item: CampaignTaskItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CampaignTaskItem) => void;
  onDelete: (item: CampaignTaskItem) => void;
}
