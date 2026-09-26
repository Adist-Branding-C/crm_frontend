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
  onConfirm: (staffId: string, reassignOpenTasks: boolean) => void;
  onClose: () => void;
}

export interface ReassignLeadTasksModalProps {
  isOpen: boolean;
  taskCount: number | null;
  fromName?: string | undefined;
  toName?: string | undefined;
  onReassignWithTasks: () => void;
  onReassignLeadOnly: () => void;
  onCancel: () => void;
}

export interface AssignCampaignModalProps {
  isOpen: boolean;
  selectedCount: number;
  isProcessing: boolean;
  onConfirm: (campaignId: string) => void;
  onClose: () => void;
}
