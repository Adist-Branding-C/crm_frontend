import type { CampaignTaskItem, CampaignTaskFormData } from './campaignTask.types';

export interface UseCampaignTaskActionsParams {
  campaignTask: {
    handleAdd: (values: CampaignTaskFormData) => Promise<boolean>;
    handleUpdate: (id: number, values: CampaignTaskFormData) => Promise<boolean>;
    handleDelete: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: CampaignTaskItem | null;
    closeAddDrawer: () => void;
    closeEditDrawer: () => void;
    closeDeleteDialog: () => void;
  };
}
