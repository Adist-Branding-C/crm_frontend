import type { Campaign } from './campaign.types';

export interface CampaignActionMenuProps {
  campaign: Campaign;
  isOpen: boolean;
  onToggle: (id: number | null) => void;
  onDelete: (id: number) => void;
  onEdit: (campaign: Campaign) => void;
}
