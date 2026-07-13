import type { FormikHelpers } from 'formik';
import type { CampaignTaskItem } from './entity';
import type { CampaignTaskFormData } from './request';

export interface UseCampaignTaskFormSubmitParams {
  editingItem: CampaignTaskItem | null;
  closeDrawer: () => void;
  handleAddCampaignTask: (values: CampaignTaskFormData, helpers: FormikHelpers<CampaignTaskFormData>) => Promise<boolean>;
  handleUpdateCampaignTask: (id: number, values: CampaignTaskFormData, helpers: FormikHelpers<CampaignTaskFormData>) => Promise<boolean>;
}
