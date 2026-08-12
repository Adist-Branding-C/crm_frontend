export interface ChangeStatusModalProps {
  isOpen: boolean;
  selectedCount: number;
  isProcessing: boolean;
  onConfirm: (statusId: string) => void;
  onClose: () => void;
}

export interface AssignStaffModalProps {
  isOpen: boolean;
  selectedCount: number;
  isProcessing: boolean;
  onConfirm: (staffId: string) => void;
  onClose: () => void;
}

export interface AssignCampaignModalProps {
  isOpen: boolean;
  selectedCount: number;
  isProcessing: boolean;
  onConfirm: (campaignId: string) => void;
  onClose: () => void;
}
