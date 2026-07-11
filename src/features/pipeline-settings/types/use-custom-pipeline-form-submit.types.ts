import type { FormikHelpers } from 'formik';
import type { CustomPipelineItem, CustomPipelineFormData } from './interface';

export interface UseCustomPipelineFormSubmitParams {
  editingItem: CustomPipelineItem | null;
  closeDrawer: () => void;
  handleCreateCustomPipeline: (values: CustomPipelineFormData, helpers: FormikHelpers<CustomPipelineFormData>) => Promise<boolean>;
  handleUpdateCustomPipeline: (id: string, values: CustomPipelineFormData, helpers: FormikHelpers<CustomPipelineFormData>) => Promise<boolean>;
}
