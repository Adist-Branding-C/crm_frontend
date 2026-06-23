import type { Schema } from 'yup';
import type { CampaignTaskFormData } from './campaignTask.types';

export interface CampaignTaskFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CampaignTaskFormData;
  onSubmit: (values: CampaignTaskFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  staffOptions: string[];
  campaignOptions: string[];
}
