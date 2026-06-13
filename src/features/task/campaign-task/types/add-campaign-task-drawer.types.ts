import type { Schema } from 'yup';
import type { CampaignTaskFormData } from './campaignTask.types';

export interface AddCampaignTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CampaignTaskFormData;
  onSubmit: (values: CampaignTaskFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  staffOptions: string[];
  campaignOptions: string[];
}
