import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { CustomPipelineFormData } from './interface';

export interface CustomPipelineFormConfig {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CustomPipelineFormData;
  onSubmit: (
    values: CustomPipelineFormData,
    helpers: FormikHelpers<CustomPipelineFormData>,
  ) => void | Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

export interface CustomPipelineFormStatus {
  isLoading: boolean;
  error: string;
  onClearError: () => void;
}

export interface CustomPipelineFormProps {
  form: CustomPipelineFormConfig;
  status: CustomPipelineFormStatus;
}
