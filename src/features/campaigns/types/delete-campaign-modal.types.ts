export interface DeleteCampaignModalProps {
  isOpen: boolean;
  campaignName: string;
  onConfirm: () => void;
  onClose: () => void;
}
